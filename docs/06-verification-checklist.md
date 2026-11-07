# Verification Checklist — SaaS Product Launch Landing Page

A complete, phase-by-phase verification checklist for confirming the landing page is production-ready. This document turns the blueprint's Appendix B into an actionable, sign-off-able checklist with pass criteria, evidence requirements, and rollback triggers.

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-05 |
| Status | Production Ready |
| Companion Docs | `saas-landing-page.md`, `cheatsheets.md`, `content-guide.md`, `deployment-guide.md`, `design-system.md` |
| Applies To | Pre-launch, pre-handoff, and post-deployment verification |

---

## Purpose of This Guide

This document exists so that:

1. **"Done" has a definition.** The project is complete only when every checkbox is ticked and evidenced.
2. **Verification is repeatable.** Any team member can run the checklist and reach the same verdict.
3. **Failures are caught before clients see them.** No live link is shared until Phase 4 passes.
4. **Sign-off is traceable.** Each phase is signed by a named person with a date.

This checklist is **binary**: every item is PASS or FAIL. No "mostly done."

---

## Table of Contents

1. How to Use This Checklist
2. Verification Roles & Sign-Off
3. Phase 1: Setup Verification
4. Phase 2: Build Verification
5. Phase 3: Quality Verification
6. Phase 4: Deployment Verification
7. Phase 5: Handoff & Documentation Verification
8. Evidence Collection
9. Rollback Triggers
10. Final Sign-Off
11. Appendix A: Verification Log Template
12. Appendix B: Command Reference

---

## 1. How to Use This Checklist

### 1.1 Rules

- **Sequential.** Phases run in order: 1 → 2 → 3 → 4 → 5. Do not skip.
- **Evidence required.** Every PASS needs a screenshot, command output, or URL. "It works on my machine" is not evidence.
- **Binary.** PASS or FAIL. No partial credit.
- **Blocking.** A FAIL blocks the next phase until resolved.
- **Signed.** Each phase ends with a name + date.

### 1.2 Checkbox Legend

| Symbol | Meaning |
|--------|---------|
| `[ ]` | Not yet checked |
| `[x]` | PASS — evidence attached |
| `[!]` | FAIL — fix required (add note) |
| `[-]` | Not applicable (justify) |

### 1.3 Where Evidence Goes

All evidence is stored in `/verification/` in the repo:

```
verification/
├── phase-1-setup/
│   ├── 01-astro-init.txt
│   ├── 02-tailwind-installed.png
│   ├── 03-sheet-schema.png
│   └── 04-apps-script-deployed.png
├── phase-2-build/
│   ├── 01-build-output.txt
│   ├── 02-sections.png
│   ├── 03-form-success.png
│   └── 04-sheet-row.png
├── phase-3-quality/
│   ├── 01-lighthouse-mobile.png
│   ├── 02-lighthouse-desktop.png
│   ├── 03-responsive-375.png
│   ├── 04-responsive-768.png
│   └── 05-responsive-1440.png
├── phase-4-deployment/
│   ├── 01-live-url.png
│   ├── 02-live-form-success.png
│   ├── 03-live-sheet-row.png
│   └── 04-dns-check.txt
└── phase-5-handoff/
    ├── 01-readme.png
    └── 02-case-study.png
```

---

## 2. Verification Roles & Sign-Off

### 2.1 Roles

| Role | Responsibility | Required for |
|------|----------------|--------------|
| **Developer** | Runs Phases 1–4, attaches technical evidence | All phases |
| **Reviewer** | Independent check of Phase 3 (quality) | Phase 3 sign-off |
| **Client / Founder** | Approves Phase 5 (handoff) | Phase 5 sign-off |
| **Project Lead** | Final sign-off on all phases | Phase 5 |

One person may hold multiple roles on a solo project, but Phase 3 should still be a **separate pass** from Phases 1–2 (self-review with fresh eyes).

### 2.2 Sign-Off Block (per phase)

```markdown
### Phase N Sign-Off

| Role | Name | Date | Verdict |
|------|------|------|---------|
| Developer | | | PASS / FAIL |
| Reviewer | | | PASS / FAIL |
```

---

## 3. Phase 1: Setup Verification

**Goal:** Confirm the project scaffold, backend, and configuration are ready before any component is built.

**Blocking:** Phase 2 cannot start until Phase 1 is 100% PASS.

### 3.1 Project Scaffold

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 1.1 | Astro project initialized | `package.json` exists with `astro` dependency; `npm run dev` starts without error | `verification/phase-1-setup/01-astro-init.txt` | [ ] |
| 1.2 | Tailwind integrated | `tailwind.config.mjs` exists; `astro.config.mjs` includes `tailwind()` | `02-tailwind-installed.png` | [ ] |
| 1.3 | Project structure created | All directories from blueprint §7 exist: `src/layouts`, `src/components`, `src/pages`, `src/scripts`, `src/styles`, `public/images`, `apps-script`, `screenshots` | `tree -L 3` output → `03-tree.txt` | [ ] |
| 1.4 | `.env.example` created | File exists with `PUBLIC_APPS_SCRIPT_URL` and `PUBLIC_GA_ID` placeholders | `04-env-example.txt` | [ ] |
| 1.5 | `.gitignore` includes `.env` | `grep "^\.env$" .gitignore` returns a match | `05-gitignore.txt` | [ ] |

### 3.2 Backend Setup

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 1.6 | Google Sheet created | Sheet exists with tab named exactly `Leads` (case-sensitive) | `06-sheet-schema.png` | [ ] |
| 1.7 | Sheet headers correct | Row 1: `timestamp`, `name`, `email`, `company`, `message`, `source` (columns A–F) | Same screenshot | [ ] |
| 1.8 | Apps Script pasted | `Code.gs` contains `doPost` handler matching blueprint §10.2 | `07-apps-script-code.png` | [ ] |
| 1.9 | Web App deployed | Deployment exists with **Execute as: Me**, **Who has access: Anyone** | `08-apps-script-deployed.png` | [ ] |
| 1.10 | URL captured | Web App URL pasted into `.env` as `PUBLIC_APPS_SCRIPT_URL` | `09-env-local.txt` (redact URL) | [ ] |
| 1.11 | Endpoint test (curl) | `curl -X POST` returns `{"status":"ok"}` | `10-curl-response.txt` | [ ] |
| 1.12 | Test row in Sheet | After curl test, new row exists with `source: manual-test` | `11-sheet-test-row.png` | [ ] |

### 3.3 Phase 1 Exit Criteria

- [ ] All 12 items PASS
- [ ] Evidence folder `verification/phase-1-setup/` contains 11+ files
- [ ] Sign-off recorded

**Phase 1 Verdict:** [ ] PASS / [ ] FAIL

---

## 4. Phase 2: Build Verification

**Goal:** Confirm every section and the form work end-to-end on localhost.

**Blocking:** Phase 3 cannot start until Phase 2 is 100% PASS.

### 4.1 Layout & Components

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 2.1 | `BaseLayout.astro` | Contains `<html lang="en">`, `<title>`, meta description, OG tags, favicon link | `01-layout.png` | [ ] |
| 2.2 | Navbar renders | Logo, anchor links, CTA button all visible; sticky on scroll | `02-navbar.png` | [ ] |
| 2.3 | Hero renders | H1 ≤ 10 words, subheadline present, primary CTA visible | `03-hero.png` | [ ] |
| 2.4 | Features renders | Exactly 3 or 4 cards, each with icon + title + description | `04-features.png` | [ ] |
| 2.5 | LeadForm renders | 4 fields (name, email, company, message) + submit button + status element | `05-form.png` | [ ] |
| 2.6 | Footer renders | Copyright + contact email + links | `06-footer.png` | [ ] |
| 2.7 | All sections present | Navbar, Hero, [SocialProof], Features, [HowItWorks], [Pricing], [FAQ], LeadForm, Footer — optional ones may be omitted but if present, must render | Full-page screenshot `07-full-page.png` | [ ] |

### 4.2 Form Functionality

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 2.8 | Client-side validation | Empty submit shows native or custom error; invalid email rejected | `08-validation.png` | [ ] |
| 2.9 | Successful submit | Filled form → success message appears: `Thanks! We'll be in touch soon.` | `09-form-success.png` | [ ] |
| 2.10 | Form reset | After success, form fields are cleared | Same screenshot | [ ] |
| 2.11 | Row in Sheet | New row appears with correct data; `source` = `landing-page` | `10-sheet-row.png` | [ ] |
| 2.12 | Network 200 | DevTools Network tab shows POST to `script.google.com` returning 200 | `11-network-200.png` | [ ] |
| 2.13 | Error state | Stop network (DevTools offline) → submit → error message: `Something went wrong. Please try again.` | `12-form-error.png` | [ ] |

### 4.3 Responsive Layout

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 2.14 | Mobile 375 px | No horizontal scroll; single column; readable | `13-responsive-375.png` | [ ] |
| 2.15 | Tablet 768 px | Feature grid 2-col (or 3-col); nav expanded | `14-responsive-768.png` | [ ] |
| 2.16 | Desktop 1440 px | Max-width container (1152 px); full nav; 3-col features | `15-responsive-1440.png` | [ ] |
| 2.17 | No console errors | DevTools Console clean at all three viewports | `16-console-clean.png` | [ ] |

### 4.4 Phase 2 Exit Criteria

- [ ] All 17 items PASS
- [ ] Evidence folder `verification/phase-2-build/` contains 16+ files
- [ ] Sign-off recorded

**Phase 2 Verdict:** [ ] PASS / [ ] FAIL

---

## 5. Phase 3: Quality Verification

**Goal:** Confirm the site meets performance, accessibility, SEO, and content standards.

**Blocking:** Phase 4 cannot start until Phase 3 is 100% PASS. A Reviewer (separate from the developer) signs off.

### 5.1 Lighthouse (Local Preview)

Run against `npm run preview` (production build), not dev server.

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 3.1 | Performance = 100 | Lighthouse mobile, production build | `01-lighthouse-mobile.png` | [ ] |
| 3.2 | Accessibility = 100 | Same run | Same screenshot | [ ] |
| 3.3 | Best Practices = 100 | Same run | Same screenshot | [ ] |
| 3.4 | SEO = 100 | Same run | Same screenshot | [ ] |
| 3.5 | Desktop Lighthouse = 100 | All four categories on desktop preset | `02-lighthouse-desktop.png` | [ ] |
| 3.6 | Page weight < 500 KB | DevTools Network → total transferred size | `03-page-weight.png` | [ ] |
| 3.7 | TTI < 1.5 s | Lighthouse "Time to Interactive" | In Lighthouse screenshot | [ ] |

### 5.2 Accessibility Audit

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 3.8 | Semantic landmarks | `<header>`, `<main>`, `<footer>`, `<section>` present | `04-landmarks.png` (DOM tree) | [ ] |
| 3.9 | One `<h1>` | `document.querySelectorAll('h1').length === 1` in console | `05-h1-count.png` | [ ] |
| 3.10 | Heading hierarchy | No skipped levels (H1 → H2 → H3) | `06-heading-order.png` | [ ] |
| 3.11 | All inputs labeled | Every `<input>`/`<textarea>` has `<label for>` or `aria-label` | `07-labels.png` | [ ] |
| 3.12 | Contrast ≥ 4.5:1 | Check body text with contrast checker | `08-contrast.png` | [ ] |
| 3.13 | Focus visible | Tab through page — every interactive element shows focus ring | `09-focus-states.png` | [ ] |
| 3.14 | `aria-live` on status | Form status element has `aria-live="polite"` | `10-aria-live.png` | [ ] |
| 3.15 | `lang` attribute | `<html lang="en">` | `11-lang.png` | [ ] |
| 3.16 | Alt text on images | Every content image has descriptive alt; decorative use `alt=""` | `12-alt-text.png` | [ ] |
| 3.17 | Keyboard-only navigation | Full form completion without mouse | Manual test — note in log | [ ] |
| 3.18 | Screen reader test | Form readable + status announced (VoiceOver / NVDA) | `13-screenreader.mp4` (or note) | [ ] |

### 5.3 SEO & Metadata

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 3.19 | `<title>` ≤ 60 chars | Includes product name + value prop | `14-title.png` | [ ] |
| 3.20 | Meta description 120–160 chars | Includes value prop + CTA | `15-meta-desc.png` | [ ] |
| 3.21 | OG tags | `og:title`, `og:description`, `og:image`, `og:type`, `og:url` present | `16-og-tags.png` | [ ] |
| 3.22 | OG image valid | Loads at `/images/og-image.png`, 1200×630 | `17-og-image.png` | [ ] |
| 3.23 | Twitter card | `twitter:card` = `summary_large_image` | `18-twitter-card.png` | [ ] |
| 3.24 | Canonical URL | `<link rel="canonical">` present and correct | `19-canonical.png` | [ ] |
| 3.25 | `robots.txt` | `/robots.txt` accessible; allows crawling | `20-robots.png` | [ ] |
| 3.26 | Favicon | Loads at `/favicon.svg` | `21-favicon.png` | [ ] |
| 3.27 | OG preview | opengraph.xyz preview renders correctly | `22-og-preview.png` | [ ] |

### 5.4 Content Audit

Cross-check against `content-guide.md`.

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 3.28 | No lorem ipsum | `grep -r "lorem\|ipsum\|TODO\|TBD\|coming soon" src/` returns nothing | `23-grep-placeholder.txt` | [ ] |
| 3.29 | No banned words | `grep -ri "revolutionary\|game-changing\|cutting-edge\|leverage\|synergy" src/` returns nothing | `24-grep-banned.txt` | [ ] |
| 3.30 | H1 ≤ 10 words | Count words in H1 | `25-h1-words.txt` | [ ] |
| 3.31 | CTA consistent | Same CTA copy in navbar, hero, form | `26-cta-consistency.png` | [ ] |
| 3.32 | Copy limits respected | Per `content-guide.md` §Appendix C | Manual review note | [ ] |

### 5.5 Security Audit

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 3.33 | `.env` not committed | `git log --all -- .env` returns nothing | `27-git-env-check.txt` | [ ] |
| 3.34 | No secrets in bundle | `grep -r "script.google.com" dist/` returns only the public URL; no other secrets | `28-bundle-secrets.txt` | [ ] |
| 3.35 | HTTPS ready | No `http://` resource references in `dist/` | `29-https-check.txt` | [ ] |
| 3.36 | Sheet restricted | Sheet sharing limited to owner + team | `30-sheet-sharing.png` | [ ] |
| 3.37 | Honeypot field | Hidden field present; bots filling it are silently rejected | `31-honeypot.png` | [ ] |

### 5.6 Phase 3 Exit Criteria

- [ ] All 37 items PASS
- [ ] Evidence folder `verification/phase-3-quality/` contains 30+ files
- [ ] Reviewer signs off independently

**Phase 3 Verdict:** [ ] PASS / [ ] FAIL

---

## 6. Phase 4: Deployment Verification

**Goal:** Confirm the live site (with custom domain if applicable) works identically to local, including the form → Sheet pipeline.

**Blocking:** Phase 5 (handoff) cannot start until Phase 4 is 100% PASS.

### 6.1 Deployment Complete

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 4.1 | Deployed to Vercel/Netlify | Deployment shows "Ready" status | `01-deployment-status.png` | [ ] |
| 4.2 | Live URL loads | URL returns 200; renders fully | `02-live-url.png` | [ ] |
| 4.3 | Env vars in production | `PUBLIC_APPS_SCRIPT_URL` and `PUBLIC_GA_ID` set in host dashboard | `03-env-production.png` | [ ] |
| 4.4 | HTTPS enforced | Padlock visible; `http://` redirects to `https://` | `04-https.png` | [ ] |
| 4.5 | No mixed content | DevTools console clean of mixed-content warnings | `05-mixed-content.png` | [ ] |

### 6.2 Live Form Test (Critical)

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 4.6 | Live form submit | Filled form on **live URL** → success message appears | `06-live-form-success.png` | [ ] |
| 4.7 | Live row in Sheet | New row with `source: landing-page`, timestamp within 1 min of submit | `07-live-sheet-row.png` | [ ] |
| 4.8 | Data accuracy | Name/email/company/message all match submission exactly | Same screenshot | [ ] |
| 4.9 | Network 200 (live) | POST to Apps Script returns 200 | `08-live-network.png` | [ ] |
| 4.10 | Error state (live) | Simulate offline → submit → error message | `09-live-error.png` | [ ] |

### 6.3 Lighthouse (Live URL)

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 4.11 | Perf = 100 (live) | Lighthouse mobile on live URL | `10-lighthouse-live.png` | [ ] |
| 4.12 | A11y = 100 (live) | Same run | Same screenshot | [ ] |
| 4.13 | BP = 100 (live) | Same run | Same screenshot | [ ] |
| 4.14 | SEO = 100 (live) | Same run | Same screenshot | [ ] |

### 6.4 Custom Domain (if configured)

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 4.15 | DNS resolves | `dig domain +short` returns host's IP/CNAME | `11-dns-check.txt` | [ ] |
| 4.16 | Domain serves site | Custom domain loads the deployed site (not parking page) | `12-custom-domain.png` | [ ] |
| 4.17 | SSL provisioned | Valid certificate; no browser warning | `13-ssl.png` | [ ] |
| 4.18 | www redirect | `www.` or apex redirects correctly (per config) | `14-www-redirect.txt` | [ ] |
| 4.19 | Canonical matches | `<link rel="canonical">` points to production domain | `15-canonical-live.png` | [ ] |

### 6.5 Responsive Verification (Live)

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 4.20 | 375 px (live) | No horizontal scroll | `16-live-375.png` | [ ] |
| 4.21 | 768 px (live) | Grid behaves correctly | `17-live-768.png` | [ ] |
| 4.22 | 1440 px (live) | Container max-width respected | `18-live-1440.png` | [ ] |

### 6.6 Phase 4 Exit Criteria

- [ ] All 22 items PASS
- [ ] Evidence folder `verification/phase-4-deployment/` contains 18+ files
- [ ] Sign-off recorded

**Phase 4 Verdict:** [ ] PASS / [ ] FAIL

---

## 7. Phase 5: Handoff & Documentation Verification

**Goal:** Confirm the deliverable is complete: documentation, screenshots, and case study ready for the client and portfolio.

### 7.1 Documentation

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 5.1 | README complete | Contains project description, live URL, repo URL, setup commands | `01-readme.png` | [ ] |
| 5.2 | Case study MD | `saas-landing-page.md` exists with all required frontmatter + body sections | `02-case-study.png` | [ ] |
| 5.3 | Companion docs present | `cheatsheets.md`, `content-guide.md`, `deployment-guide.md`, `design-system.md`, `verification-checklist.md` all exist | `03-docs-list.txt` | [ ] |
| 5.4 | Deployment log filled | `DEPLOYMENT.md` (or section) has entry for this deployment | `04-deployment-log.png` | [ ] |
| 5.5 | Design log filled | `DESIGN_LOG.md` has initial entry | `05-design-log.png` | [ ] |

### 7.2 Screenshots

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 5.6 | All 8 screenshots captured | `01-lighthouse.png` through `08-desktop.png` present per blueprint Appendix A | `screenshots/` folder listing → `06-screenshots-list.txt` | [ ] |
| 5.7 | Screenshots reflect live site | Captured from live URL, not localhost | Visual inspection note | [ ] |
| 5.8 | Screenshots optimized | Each < 500 KB; WebP or optimized PNG | `du -sh screenshots/*` → `07-screenshots-size.txt` | [ ] |

### 7.3 Client Handoff

| # | Task | Pass Criteria | Evidence | Status |
|---|------|---------------|----------|--------|
| 5.9 | Live URL shared | Client received working URL (not vercel.app if custom domain exists) | Email/slack screenshot → `08-handoff-message.png` | [ ] |
| 5.10 | Sheet access shared | Client has owner or editor access to Google Sheet | `09-sheet-access.png` | [ ] |
| 5.11 | Credentials documented | Apps Script URL, host account, DNS — documented in a secure note (not in repo) | Note reference → `10-credentials-location.txt` | [ ] |
| 5.12 | Client sign-off | Client confirms the live site meets expectations | `11-client-signoff.png` | [ ] |

### 7.4 Phase 5 Exit Criteria

- [ ] All 12 items PASS
- [ ] Client approval received
- [ ] Project lead signs off

**Phase 5 Verdict:** [ ] PASS / [ ] FAIL

---

## 8. Evidence Collection

### 8.1 Evidence Naming Convention

```
[phase]-[NN]-[description].[ext]

Examples:
phase-3-quality/01-lighthouse-mobile.png
phase-4-deployment/07-live-sheet-row.png
```

- Zero-padded numbers (`01`, `02`, …).
- Kebab-case descriptions.
- Extensions: `.png` (screenshots), `.txt` (command output), `.json` (API responses), `.mp4` (screen recordings).

### 8.2 Redaction Rules

Before committing evidence:

- **Redact** API keys, deployment IDs (in URLs), sheet IDs, email addresses of test users.
- **Keep** structural info: request shape, response shape, header names.
- Redaction marker: `[REDACTED]`.

### 8.3 Evidence Storage

- Committed to repo under `/verification/` (excluding anything with secrets).
- If a screenshot contains secrets, store it in a private shared drive and reference it in the log.

---

## 9. Rollback Triggers

If any of the following occur **after** deployment, roll back immediately:

| Trigger | Action |
|---------|--------|
| Live form fails (no row in Sheet) | Rollback to previous deployment (see `deployment-guide.md` §10) |
| Lighthouse drops below 90 in any category | Rollback and investigate |
| Sheet contains malformed/spam data | Disable form (remove endpoint env var), redeploy |
| Security incident (env leak, unauthorized sheet access) | Rotate Apps Script URL, redeploy frontend |
| Custom domain serves wrong content | Revert DNS; verify with `dig` |

Rollback is documented in `deployment-guide.md` §10.

---

## 10. Final Sign-Off

Project is **complete** when:

- [ ] Phase 1: PASS
- [ ] Phase 2: PASS
- [ ] Phase 3: PASS (reviewer-signed)
- [ ] Phase 4: PASS
- [ ] Phase 5: PASS (client-signed)
- [ ] All evidence committed to `/verification/`
- [ ] No rollback triggers active
- [ ] Case study published

### Final Sign-Off Block

```markdown
| Phase | Verdict | Signed by | Date |
|-------|---------|-----------|------|
| 1: Setup | | | |
| 2: Build | | | |
| 3: Quality | | | |
| 4: Deployment | | | |
| 5: Handoff | | | |
| **FINAL** | | | |
```

---

## 11. Appendix A: Verification Log Template

Copy to `verification/LOG.md`:

```markdown
# Verification Log — SaaS Landing Page

## Phase 1: Setup

- 1.1 [x] Astro initialized — evidence: 01-astro-init.txt
- 1.2 [x] Tailwind integrated — evidence: 02-tailwind-installed.png
- ...

## Phase 2: Build

- 2.1 [x] BaseLayout — evidence: 01-layout.png
- ...

## Phase 3: Quality

- 3.1 [x] Lighthouse mobile = 100/100/100/100 — evidence: 01-lighthouse-mobile.png
- ...

## Phase 4: Deployment

- 4.1 [x] Deployed — evidence: 01-deployment-status.png
- ...

## Phase 5: Handoff

- 5.1 [x] README — evidence: 01-readme.png
- ...

## Notes / Deviations

- (Any `[-]` item with justification)
- (Any workaround)
- (Any follow-up task)
```

---

## 12. Appendix B: Command Reference

Commands used across phases:

```bash
# Phase 1
npm create astro@latest saas-landing-page -- --template minimal
npx astro add tailwind
tree -L 3
cat .gitignore | grep "^\.env$"

# Phase 2
npm run dev
npm run build
npm run preview

# Phase 3
npx lighthouse http://localhost:4321 --view --preset=desktop
npx lighthouse http://localhost:4321 --view

# Check for placeholder content
grep -ri "lorem\|ipsum\|TODO\|TBD" src/

# Check for banned words
grep -ri "revolutionary\|game-changing\|cutting-edge\|leverage\|synergy" src/

# Check .env not committed
git log --all -- .env

# Page weight
du -sh dist/

# Phase 4
curl -I https://your-live-url.com
dig your-domain.com +short
npx lighthouse https://your-live-url.com --view

# Test live form via curl (redact in evidence)
curl -X POST "$PUBLIC_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Live Test","email":"live@test.com","source":"landing-page"}'

# Screenshot sizes
du -sh screenshots/*
```

---

## 13. Appendix C: Related Documents

| Document | Purpose |
|----------|---------|
| `saas-landing-page.md` | Full technical blueprint |
| `cheatsheets.md` | Build/debug quick reference |
| `content-guide.md` | Copy rules, tone, all on-page text |
| `deployment-guide.md` | Hosting + backend setup |
| `design-system.md` | Design tokens, components, motion |
| `verification-checklist.md` | ← This document |

---

## 14. Appendix D: Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  VERIFICATION QUICK REFERENCE                               │
├─────────────────────────────────────────────────────────────┤
│  PHASE 1: SETUP (12 items)                                  │
│    Scaffold + Tailwind + Sheet + Apps Script + curl test    │
│    Gate: curl returns {"status":"ok"} + row in Sheet        │
│                                                             │
│  PHASE 2: BUILD (17 items)                                  │
│    All sections + form works end-to-end on localhost        │
│    Gate: form submit → success message + Sheet row          │
│                                                             │
│  PHASE 3: QUALITY (37 items)                                │
│    Lighthouse 100/100/100/100 + a11y + SEO + content        │
│    Gate: reviewer signs off independently                   │
│                                                             │
│  PHASE 4: DEPLOYMENT (22 items)                             │
│    Live URL + live form + live Sheet row + live Lighthouse  │
│    Gate: live form submit → Sheet row within 1 minute       │
│                                                             │
│  PHASE 5: HANDOFF (12 items)                                │
│    Docs + screenshots + client access + sign-off            │
│    Gate: client confirms live site                          │
├─────────────────────────────────────────────────────────────┤
│  TOTAL: 100 items                                           │
│  ALL must PASS before project is "Done"                     │
│  Evidence required for every PASS                           │
└─────────────────────────────────────────────────────────────┘
```
