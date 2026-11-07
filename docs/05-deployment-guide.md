# Deployment Guide — SaaS Product Launch Landing Page

A step-by-step operational guide for taking the landing page from local development to a live, production-ready site with a working lead capture pipeline. This document covers hosting deployment (Vercel / Netlify), Google Apps Script backend setup, custom domain configuration, and post-deployment verification.

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-05 |
| Status | Production Ready |
| Companion Docs | `saas-landing-page.md`, `cheatsheets.md`, `content-guide.md` |
| Applies To | Static hosting (Vercel / Netlify), Google Apps Script, Google Sheets |

---

## Purpose of This Guide

This document exists so that:

1. **Deployment is repeatable** — every new instance of this landing page follows the same steps.
2. **The backend is set up before the frontend goes live** — no broken forms in production.
3. **Verification is explicit** — you know exactly when the deployment is complete.
4. **Troubleshooting is fast** — common failure modes and their fixes are documented.

Deployment is not complete until **a real test lead appears in the Google Sheet from the live URL**.

---

## Table of Contents

1. Pre-Deployment Checklist
2. Backend Setup (Google Apps Script + Sheets)
3. Frontend Build Verification
4. Hosting Deployment (Vercel)
5. Hosting Deployment (Netlify)
6. Custom Domain Configuration
7. Environment Variables in Production
8. Post-Deployment Verification
9. Troubleshooting
10. Rollback & Redeployment
11. Deployment Log Template

---

## 1. Pre-Deployment Checklist

Before touching any hosting platform, confirm the following locally:

```
[ ] npm run build completes without errors
[ ] npm run preview serves the site correctly on localhost
[ ] Form submits successfully to Apps Script (test endpoint via curl)
[ ] Test lead appears in Google Sheet
[ ] .env is in .gitignore (not committed)
[ ] .env.example is committed with placeholder values
[ ] All 9 sections render correctly
[ ] Lighthouse score verified locally (or defer to post-deploy)
[ ] No console errors in browser DevTools
```

### 1.1 Build Command Verification

```bash
# Clean build
rm -rf dist/ .astro/
npm run build

# Expected output:
# ✓ Completed in Xs
# dist/index.html
# dist/_astro/*.css
# dist/_astro/*.js
```

If the build fails, resolve errors before proceeding. Common causes: missing dependencies, TypeScript errors, malformed Astro syntax.

---

## 2. Backend Setup (Google Apps Script + Sheets)

**The backend must be live before the frontend deploys.** The landing page's form POSTs to the Apps Script URL; if that URL is missing or misconfigured, every submission fails silently.

### 2.1 Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name it: `SaaS Landing Page — Leads`
3. Rename the default tab to: `Leads` (case-sensitive — the script references this exact name).
4. Add headers in row 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| timestamp | name | email | company | message | source |

5. **Share settings:** Keep the sheet private. Only the owner and necessary team members should have access. The Apps Script runs as the deploying user and writes to the sheet on their behalf.

### 2.2 Create the Apps Script

1. From the Google Sheet, go to **Extensions → Apps Script**.
2. Delete the default `myFunction` code.
3. Paste the following `Code.gs`:

```js
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.company || '',
      data.message || '',
      data.source || 'landing-page',
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Save the project (`Ctrl+S` / `Cmd+S`).

### 2.3 Configure the Web App Deployment

1. Click **Deploy → New deployment**.
2. Select type: **Web app**.
3. Fill in:
   - **Description:** `Landing page form endpoint v1`
   - **Execute as:** `Me` (the deploying account)
   - **Who has access:** `Anyone` (this maps to `ANYONE_ANONYMOUS` in the manifest — anyone, even unauthenticated, can POST)
4. Click **Deploy**.
5. **Authorize** the script when prompted (Google will ask for permission to access Sheets).
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
7. Save this URL — it becomes `PUBLIC_APPS_SCRIPT_URL` in your environment variables.

> **Critical:** The access setting must be **"Anyone"**, not "Anyone with Google account" or "Only myself." If it's restricted, the browser's `fetch()` call will receive a CORS error or an HTML login page instead of JSON.

### 2.4 Test the Endpoint Before Proceeding

Run this from your terminal **before** deploying the frontend:

```bash
curl -X POST "YOUR_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Deploy Test","email":"deploy@test.com","company":"Test Co","message":"Deployment verification","source":"manual-test"}'
```

**Expected response:**
```json
{"status":"ok"}
```

**Verify:** Open the Google Sheet and confirm a new row appeared with:
- Timestamp: current date/time
- Name: `Deploy Test`
- Email: `deploy@test.com`
- Source: `manual-test`

If the row did not appear, **stop here** and troubleshoot Section 9 before proceeding. Do not deploy the frontend with a broken backend.

---

## 3. Frontend Build Verification

### 3.1 Set Environment Variables Locally

Create `.env` (never commit this file):

```env
PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3.2 Test the Full Flow Locally

```bash
npm run dev
```

1. Open `http://localhost:4321`.
2. Scroll to the lead form.
3. Submit a real test entry.
4. Confirm:
   - Success message appears: `Thanks! We'll be in touch soon.`
   - New row appears in Google Sheet with `source: landing-page`
5. Check browser console for errors (Network tab: the POST should return HTTP 200).

### 3.3 Production Build Preview

```bash
npm run build
npm run preview
```

The preview server runs the exact output that will be deployed. Test the form again here — this confirms the environment variables are embedded correctly in the production build.

---

## 4. Hosting Deployment (Vercel)

Vercel auto-detects Astro projects with zero configuration for static sites. No adapter is required.

### 4.1 Deploy via Git Integration (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel detects Astro automatically. Confirm settings:
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build` (or `astro build`)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Add environment variables:
   - `PUBLIC_APPS_SCRIPT_URL` = your Apps Script URL
   - `PUBLIC_GA_ID` = your GA4 ID (optional)
5. Click **Deploy**.
6. Wait for the build to complete. You'll receive a URL like:
   ```
   https://saas-landing-page-abc123.vercel.app
   ```

**Subsequent deploys:** Every push to the production branch (usually `main`) triggers a new production deployment. Pushes to other branches create preview deployments.

### 4.2 Deploy via Vercel CLI

```bash
# Install CLI globally
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# When asked "Want to override the settings?" choose N
# Vercel auto-detects Astro and uses the correct settings
```

For production deployment:

```bash
vercel --prod
```

### 4.3 Vercel Project Configuration (Optional)

Create `vercel.json` in the project root to add security headers:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## 5. Hosting Deployment (Netlify)

Netlify also auto-detects Astro static sites. No adapter is needed for static deployment.

### 5.1 Deploy via Git Integration

1. Push your code to a Git repository.
2. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site → Import an existing project**.
3. Select your repository.
4. Netlify pre-fills:
   - **Build Command:** `astro build` (or `npm run build`)
   - **Publish directory:** `dist`
5. Add environment variables under **Site settings → Environment variables**:
   - `PUBLIC_APPS_SCRIPT_URL`
   - `PUBLIC_GA_ID` (optional)
6. Click **Deploy site**.
7. Your site is live at `https://random-name-123.netlify.app`.

### 5.2 Deploy via Netlify CLI

```bash
# Install CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize (from project root)
netlify init

# The CLI detects Astro build settings and offers to create netlify.toml
# Confirm build command: astro build
# Confirm publish directory: dist

# Deploy to production
netlify deploy --prod
```

### 5.3 netlify.toml Configuration (Recommended)

Create `netlify.toml` in the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

This ensures consistent builds across environments and adds security headers.

---

## 6. Custom Domain Configuration

### 6.1 Vercel Custom Domain

1. In the Vercel dashboard, open your project.
2. Go to **Settings → Domains**.
3. Click **Add Domain**.
4. Enter your domain (e.g., `product.example.com`).
5. Vercel displays the required DNS records:
   - **Apex domain** (`example.com`): Add an **A record** pointing to Vercel's IP.
   - **Subdomain** (`www.example.com` or `product.example.com`): Add a **CNAME record** pointing to `cname.vercel-dns.com`.
6. Log in to your domain registrar (Namecheap, Cloudflare, GoDaddy, etc.) and add the record.
7. Return to Vercel and click **Verify**. Propagation may take up to 48 hours, but usually completes within minutes.
8. Vercel automatically provisions an SSL certificate once DNS verifies.

**CLI alternative:**
```bash
vercel domains add product.example.com
vercel domains verify product.example.com --project your-project-name
```

### 6.2 Netlify Custom Domain

1. In the Netlify dashboard, open your site.
2. Go to **Domain management → Add domain → Add a domain you already own**.
3. Enter your domain and click **Verify → Add domain**.
4. Choose DNS method:
   - **Netlify DNS** (recommended): Netlify provides nameservers you point to at your registrar. This enables automatic SSL and CDN optimization.
   - **External DNS**: Manually add the CNAME/A records Netlify provides.
5. If using External DNS, copy the provided record values to your registrar.
6. Wait for DNS propagation. Netlify provisions SSL automatically via Let's Encrypt.

### 6.3 DNS Propagation Check

```bash
# Check if DNS has propagated
dig product.example.com +short

# Or use an online tool
# https://www.whatsmydns.net/
```

---

## 7. Environment Variables in Production

### 7.1 Vercel

Set under **Project Settings → Environment Variables**:
- `PUBLIC_APPS_SCRIPT_URL` — available to all environments
- `PUBLIC_GA_ID` — optional

**Important:** After adding or changing environment variables, **redeploy** the project. Vercel does not inject new env vars into existing deployments.

### 7.2 Netlify

Set under **Site configuration → Environment variables**:
- `PUBLIC_APPS_SCRIPT_URL`
- `PUBLIC_GA_ID` (optional)

After changing, trigger a new deploy: **Deploys → Trigger deploy → Deploy site**.

### 7.3 Verify Variables Are Embedded

After deployment, open the live site and inspect the form's network request:

1. Open DevTools → **Network** tab.
2. Submit the form.
3. Find the POST request to `script.google.com`.
4. If the request URL is `undefined` or the request is blocked, the env var was not embedded during build.

**Fix:** Confirm the variable name starts with `PUBLIC_` and redeploy.

---

## 8. Post-Deployment Verification

Run this checklist **on the live URL** after deployment completes.

### 8.1 Page Load

```
[ ] Live URL loads without errors
[ ] All sections render (Navbar, Hero, Features, Form, Footer)
[ ] No mixed-content warnings (HTTPS everywhere)
[ ] Favicon loads
[ ] Images load (no broken paths)
```

### 8.2 Form Submission (Critical)

```
[ ] Fill out the form on the LIVE site
[ ] Click submit
[ ] Success message appears: "Thanks! We'll be in touch soon."
[ ] Open Google Sheet
[ ] New row exists with correct data
[ ] source column = "landing-page"
```

**If this fails, the deployment is not complete.** See Section 9.

### 8.3 Lighthouse Audit

Run Lighthouse on the live URL (mobile):

```bash
npx lighthouse https://your-live-url.com --view --preset=desktop
```

**Expected:**

| Category | Target | Pass? |
|----------|--------|-------|
| Performance | 100 | [ ] |
| Accessibility | 100 | [ ] |
| Best Practices | 100 | [ ] |
| SEO | 100 | [ ] |

If any category is below 100, check:
- Image sizes (WebP, correct dimensions)
- Unused JavaScript
- Missing meta tags
- Contrast issues

### 8.4 Meta Tags Verification

```bash
# View page source
curl -s https://your-live-url.com | grep -E "<title>|og:title|og:image|description"
```

Confirm `<title>`, `<meta name="description">`, and OG tags are present with correct values.

### 8.5 Custom Domain (If Configured)

```
[ ] Domain resolves to the deployed site (not a parking page)
[ ] HTTPS works (padlock icon visible)
[ ] www vs non-www redirects correctly
[ ] Old vercel.app/netlify.app URL still works (optional, or redirect)
```

---

## 9. Troubleshooting

### 9.1 Form Returns CORS Error

**Symptom:** Browser console shows `Access to fetch at '...' from origin '...' has been blocked by CORS policy`.

**Cause:** Apps Script deployment access is not set to "Anyone."

**Fix:**
1. Open Apps Script editor.
2. **Deploy → Manage deployments**.
3. Edit the active deployment.
4. Set **Who has access** to **Anyone**.
5. Click **Deploy**.
6. Test again.

### 9.2 Form Returns HTML Instead of JSON

**Symptom:** `fetch()` receives a login page or HTML redirect instead of `{"status":"ok"}`.

**Cause:** Apps Script is requiring authentication. The access setting is "Anyone with Google account" or "Only myself."

**Fix:** Redeploy with **Who has access: Anyone** (maps to `ANYONE_ANONYMOUS`).

### 9.3 Leads Not Appearing in Sheet

**Symptom:** Form shows success, but no new row in Google Sheet.

**Possible causes & fixes:**

| Cause | Fix |
|-------|-----|
| Sheet tab name is not `Leads` | Rename the tab to exactly `Leads` (case-sensitive) |
| Script error in `doPost` | Open Apps Script → **Executions** → check error logs |
| Script writing to wrong spreadsheet | Ensure the script is bound to the correct Sheet (created via Extensions) |
| Append failed due to permissions | Re-authorize the script (Deploy → authorize) |

### 9.4 Environment Variable is `undefined`

**Symptom:** Form submits to `undefined` or `/undefined`.

**Fix:**
1. Confirm variable name starts with `PUBLIC_` (Astro only exposes these to the client).
2. Confirm variable is set in the hosting platform's dashboard.
3. **Redeploy** after setting the variable — existing deployments don't pick up new env vars.

### 9.5 Build Fails on Hosting Platform

**Symptom:** Deployment fails with build errors, but `npm run build` works locally.

**Common causes:**

| Cause | Fix |
|-------|-----|
| Node version mismatch | Add `.nvmrc` with `20` or set `NODE_VERSION=20` in env |
| Missing dependency | Ensure `package-lock.json` is committed |
| Memory limit | Astro builds are lightweight; check for large assets |
| Case-sensitive imports | macOS is case-insensitive, Linux (hosting) is case-sensitive |

### 9.6 Lighthouse Score Below 100

| Category | Likely Cause | Fix |
|----------|-------------|-----|
| Performance | Large images | Convert to WebP, resize to actual display dimensions |
| Accessibility | Missing labels or contrast | Add `aria-label`, increase contrast ratio |
| Best Practices | Console errors or deprecated APIs | Check DevTools console |
| SEO | Missing meta description or invalid `robots.txt` | Verify `<meta name="description">` and `/robots.txt` |

---

## 10. Rollback & Redeployment

### 10.1 Vercel Rollback

1. Open project → **Deployments**.
2. Find the last known-good deployment.
3. Click **⋯ → Promote to Production**.

### 10.2 Netlify Rollback

1. Open site → **Deploys**.
2. Find the last known-good deploy.
3. Click **Publish deploy**.

### 10.3 Redeploy After Backend Change

If you modify `Code.gs`:

1. Save the script.
2. **Deploy → Manage deployments → Edit**.
3. Set **Version** to **New version**.
4. Click **Deploy**.
5. The Web App URL stays the same — no frontend changes needed.

**Important:** Simply saving `Code.gs` does not update the live Web App. You must create a **new deployment version** for changes to take effect.

---

## 11. Deployment Log Template

Copy this into `DEPLOYMENT.md` or your project wiki after each deployment:

```markdown
## Deployment — YYYY-MM-DD

| Field | Value |
|-------|-------|
| Deployed by | [name] |
| Environment | Production / Staging |
| Host | Vercel / Netlify |
| Live URL | https://... |
| Custom Domain | https://... |
| Git Commit | [hash] |
| Apps Script Version | v1 / v2 |
| Build Time | Xs |
| Lighthouse (Mobile) | P / A / BP / SEO |

### Verification

- [ ] Live URL loads
- [ ] Form submits successfully
- [ ] Test lead appears in Google Sheet
- [ ] Lighthouse 100/100/100/100
- [ ] No console errors
- [ ] Custom domain resolves (if applicable)

### Notes

[Any issues encountered, workarounds, or follow-up tasks]
```

---

## Appendix A: Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  DEPLOYMENT QUICK REFERENCE                                 │
├─────────────────────────────────────────────────────────────┤
│  BACKEND (do first)                                         │
│  1. Create Google Sheet + Leads tab                         │
│  2. Extensions → Apps Script → paste Code.gs                │
│  3. Deploy → Web app → Execute: Me, Access: Anyone          │
│  4. Copy URL → PUBLIC_APPS_SCRIPT_URL                       │
│  5. Test: curl -X POST ... → check Sheet                    │
├─────────────────────────────────────────────────────────────┤
│  FRONTEND                                                   │
│  1. npm run build (must succeed)                            │
│  2. Set PUBLIC_APPS_SCRIPT_URL in host dashboard            │
│  3. Push to Git → host auto-deploys                         │
│  4. Verify live form → Sheet row appears                    │
├─────────────────────────────────────────────────────────────┤
│  HOSTING                                                    │
│  Vercel:  Import Git repo → auto-detect Astro → Deploy      │
│  Netlify: Import Git repo → build: astro build → Deploy     │
│  CLI:     vercel / netlify deploy --prod                    │
├─────────────────────────────────────────────────────────────┤
│  CUSTOM DOMAIN                                              │
│  Vercel: Settings → Domains → Add → follow DNS              │
│  Netlify: Domain management → Add domain → DNS              │
│  Wait for SSL (automatic, ~minutes)                         │
├─────────────────────────────────────────────────────────────┤
│  TROUBLESHOOT                                               │
│  CORS error        → Apps Script access = "Anyone"          │
│  HTML response     → Redeploy with correct access           │
│  No Sheet row      → Check tab name "Leads", Executions log │
│  Env var undefined → Name starts with PUBLIC_, redeploy     │
└─────────────────────────────────────────────────────────────┘
```
