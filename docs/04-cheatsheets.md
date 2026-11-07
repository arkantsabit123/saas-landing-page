# Cheatsheet — SaaS Product Launch Landing Page

A quick-reference companion to the technical blueprint. Everything you need to build, deploy, and maintain the landing page — condensed into one page.

---

## Quick Start

```bash
# 1. Create project
npm create astro@latest saas-landing-page -- --template minimal

# 2. Enter directory
cd saas-landing-page

# 3. Add Tailwind
npx astro add tailwind

# 4. Install deps
npm install

# 5. Start dev server
npm run dev
```

---

## NPM Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server (http://localhost:4321) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run check` | Type and syntax check |

---

## File Scaffolding (One-Liner)

```bash
mkdir -p src/{layouts,components,pages,scripts,styles} public/images/feature-icons apps-script screenshots
touch src/layouts/BaseLayout.astro \
      src/components/{Navbar,Hero,SocialProof,Features,FeatureCard,HowItWorks,Pricing,FAQ,LeadForm,Footer}.astro \
      src/pages/index.astro \
      src/scripts/form.ts \
      src/styles/global.css \
      apps-script/Code.gs \
      apps-script/appsscript.json \
      .env.example .gitignore README.md
```

---

## Environment Variables

```env
# .env.example
PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
PUBLIC_GA_ID=G-XXXXXXXXXX
```

> ⚠️ Only `PUBLIC_*` vars are exposed to the client. Never put secrets here.

---

## Astro Config

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://product.example.com',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
});
```

---

## Google Apps Script Setup

### Steps
1. Open Google Sheet → **Extensions → Apps Script**
2. Paste `Code.gs` → **Save**
3. **Deploy → New deployment → Web app**
4. Execute as: **Me** | Who has access: **Anyone**
5. Copy the Web App URL → paste into `.env` as `PUBLIC_APPS_SCRIPT_URL`

### Code.gs

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

### appsscript.json

```json
{
  "timeZone": "Asia/Jakarta",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE_ANONYMOUS"
  }
}
```

---

## Google Sheet Schema

| Col | Header | Source |
|-----|--------|--------|
| A | timestamp | `new Date()` |
| B | name | Form |
| C | email | Form |
| D | company | Form (optional) |
| E | message | Form (optional) |
| F | source | `landing-page` |

---

## Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | text | ✅ | 2–80 chars |
| email | email | ✅ | RFC 5322 |
| company | text | ❌ | 0–120 chars |
| message | textarea | ❌ | 0–1000 chars |

---

## Client-Side Form Logic (form.ts)

```ts
const form = document.getElementById('lead-form-el') as HTMLFormElement | null;
const status = document.getElementById('form-status');
const endpoint = import.meta.env.PUBLIC_APPS_SCRIPT_URL;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) return form.reportValidity();

  const data = Object.fromEntries(new FormData(form).entries());
  status!.textContent = 'Submitting…';

  try {
    const res = await fetch(endpoint!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source: 'landing-page' }),
    });
    const json = await res.json();
    if (json.status === 'ok') {
      status!.textContent = 'Thanks! We will be in touch.';
      form.reset();
    } else throw new Error(json.message);
  } catch {
    status!.textContent = 'Something went wrong. Please try again.';
  }
});
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | 375 px | 1 col, hamburger nav |
| Tablet | 768 px | 2-col grid |
| Desktop | 1440 px | 1200 px max-width |

### Tailwind Classes Cheatsheet

```
Mobile-first:   base → sm: → md: → lg: → xl:
Grid:           grid grid-cols-1 md:grid-cols-3 gap-6
Container:      mx-auto max-w-6xl px-4
Hero heading:   text-4xl md:text-6xl font-bold tracking-tight
Button:         rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700
Card:           rounded-xl border border-slate-200 p-6
```

---

## Section Order

```
1. Navbar       → logo + links + CTA
2. Hero         → headline ≤10 words, sub ≤25 words, 1 CTA
3. Social Proof → 3–6 logos or 1–3 testimonials
4. Features     → exactly 3 or 4 cards
5. How It Works → exactly 3 steps
6. Pricing      → single tier or waitlist CTA
7. FAQ          → 4–6 Q&A accordion
8. Lead Form    → 4 fields + validation + success/error
9. Footer       → copyright + contact + socials
```

---

## SEO Checklist

```
✅ <title> ≤ 60 chars, includes product name
✅ <meta description> 120–160 chars
✅ og:title, og:description, og:image (1200×630)
✅ Twitter card: summary_large_image
✅ Canonical URL set
✅ <html lang="en">
✅ robots.txt present
✅ One <h1> per page
```

### BaseLayout Meta Template

```astro
<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content="/images/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="https://product.example.com" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

---

## Accessibility Checklist

```
✅ Semantic landmarks: <header>, <main>, <footer>, <section>
✅ One <h1> per page
✅ All inputs have <label> or aria-label
✅ Color contrast ≥ 4.5:1
✅ Visible :focus states
✅ aria-live="polite" on form status
✅ lang attribute on <html>
✅ Alt text on all images
✅ No keyboard traps
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Perf | 100 |
| Lighthouse A11y | 100 |
| Lighthouse BP | 100 |
| Lighthouse SEO | 100 |
| Page weight | < 500 KB |
| TTI | < 1.5 s |
| First paint | < 1 s |

### Performance Tactics
- ✅ Zero JS by default (Astro)
- ✅ WebP images + explicit width/height
- ✅ System font stack (no webfont)
- ✅ Tailwind purges unused CSS
- ✅ Form script loaded as `type="module"`

---

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
# Framework: Astro (auto-detected)
# Build: astro build
# Output: dist
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
# Build: astro build
# Publish: dist
```

### netlify.toml (optional)

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

---

## Debug Commands

```bash
# Local dev
npm run dev

# Build & preview
npm run build && npm run preview

# Type/syntax check
npm run check

# Test Apps Script endpoint
curl -X POST "$PUBLIC_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","source":"landing-page"}'

# Check Lighthouse CLI
npx lighthouse http://localhost:4321 --view

# Check bundle size
du -sh dist/ && find dist -type f -exec du -h {} + | sort -rh | head -20
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error on form | Redeploy Apps Script as "Anyone" |
| 401/403 on POST | Check deployment permissions |
| Leads not in sheet | Verify `Leads` tab exists; check Executions log |
| Lighthouse < 100 | Reduce image size, remove unused JS |
| Mobile broken | Check Tailwind `md:` classes |
| `PUBLIC_*` undefined | Restart dev server (`Ctrl+C` → `npm run dev`) |
| Apps Script returns HTML | Deployment not public → redeploy |
| Sheet append fails | Confirm column headers exist in row 1 |

---

## Security

```
✅ .env in .gitignore
✅ .env.example committed instead
✅ Sheet shared only to owner + team
✅ Apps Script access = "Anyone" (public, monitor logs)
✅ HTTPS enforced by host
✅ Honeypot field to reduce bot spam
```

### Honeypot Field

```astro
<!-- Hidden field — bots fill it, humans don't -->
<input type="text" name="website" tabindex="-1" autocomplete="off"
       class="hidden" aria-hidden="true" />
```

```ts
// In form.ts, reject if filled
if (data.website) return; // silently drop
```

---

## Content Model (Frontmatter)

```yaml
---
title: "SaaS Landing Page — Case Study"
description: "A 100/100 Lighthouse, conversion-focused landing page for a SaaS product launch."
techStack: ["Astro", "Tailwind CSS", "Google Apps Script"]
thumbnail: "/images/og-image.png"
demoUrl: "https://product.example.com"
repoUrl: "https://github.com/you/saas-landing-page"
category: "web-app"
featured: true
date: "2026-11-05"
---
```

---

## Section Component Cheatsheet

| Component | Responsibility |
|-----------|----------------|
| `BaseLayout.astro` | `<html>`, meta tags, fonts, slot |
| `Navbar.astro` | Logo + anchor links + CTA |
| `Hero.astro` | H1 + subheadline + primary CTA |
| `SocialProof.astro` | Logos or testimonials |
| `Features.astro` | Grid of FeatureCards |
| `FeatureCard.astro` | Single feature (icon/title/desc) |
| `HowItWorks.astro` | 3 numbered steps |
| `Pricing.astro` | Single tier or waitlist CTA |
| `FAQ.astro` | Accordion (native `<details>`) |
| `LeadForm.astro` | 4 inputs + submit + status |
| `Footer.astro` | Links + copyright + contact |

---

## Copy Rules

| Element | Constraint |
|---------|------------|
| H1 headline | ≤ 10 words |
| Subheadline | ≤ 25 words |
| Feature title | ≤ 5 words |
| Feature desc | 1–2 sentences |
| CTA text | 2–4 words ("Join the waitlist") |
| Meta description | 120–160 chars |

---

## Verification Phases

| Phase | Tasks | Key Gate |
|-------|-------|----------|
| 1. Setup | 6 | Astro + Tailwind + Sheet + Apps Script ready |
| 2. Build | 6 | All sections + form work end-to-end |
| 3. Quality | 5 | Lighthouse 100/100, a11y pass |
| 4. Deploy | 6 | Live URL + real lead in sheet |

**Total: 23 tasks** → all must be ✅ before delivery.

---

## One-Page Delivery Checklist

```
[ ] Project builds without errors (`npm run build`)
[ ] Dev server runs (`npm run dev`)
[ ] All 9 sections present
[ ] Form submits → row appears in Google Sheet
[ ] Success message shows on form
[ ] Error message shows on network failure
[ ] Lighthouse = 100/100/100/100 (mobile)
[ ] Lighthouse = 100/100/100/100 (desktop)
[ ] Responsive at 375 / 768 / 1440
[ ] No console errors
[ ] Meta tags verified (view-source)
[ ] OG image loads (opengraph.xyz)
[ ] robots.txt accessible
[ ] favicon loads
[ ] .env not committed
[ ] Deployed to Vercel/Netlify
[ ] Custom domain configured (optional)
[ ] Screenshots captured (8 files)
[ ] README has live URL + repo URL
[ ] Case study MD published
```

---

## Useful Links

| Resource | URL |
|----------|-----|
| Astro Docs | https://docs.astro.build |
| Tailwind Docs | https://tailwindcss.com/docs |
| Apps Script Docs | https://developers.google.com/apps-script |
| Lighthouse | https://developer.chrome.com/docs/lighthouse |
| Vercel | https://vercel.com |
| Netlify | https://netlify.com |
| OpenGraph Preview | https://www.opengraph.xyz |

---
