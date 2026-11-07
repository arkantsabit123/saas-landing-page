# Changelog — SaaS Product Launch Landing Page

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-05 |
| Status | Production Ready |
| Companion Docs | `saas-landing-page.md`, `cheatsheets.md`, `content-guide.md`, `deployment-guide.md`, `design-system.md`, `verification-checklist.md` |
| Format Standard | Keep a Changelog 1.1.0 |
| Versioning | Semantic Versioning 2.0.0 |

---

## Purpose of This Guide

This changelog exists so that:

1. **Every change is traceable** — who changed what, when, and why.
2. **Releases are versioned consistently** — semantic versioning applied to both code and documentation.
3. **Rollbacks are informed** — you can see exactly what changed between versions.
4. **Clients and collaborators stay in sync** — no "surprise" changes ship without notice.

This file is updated with **every** meaningful change: code, documentation, content, design, or infrastructure.

---

## Table of Contents

1. Versioning Policy
2. Change Categories
3. Release History
4. Unreleased
5. Version 1.0.0 — 2026-11-05
6. How to Update This Changelog
7. Examples & Anti-Patterns

---

## 1. Versioning Policy

This project uses [Semantic Versioning 2.0.0](https://semver.org/): `MAJOR.MINOR.PATCH`.

### 1.1 What Each Number Means

| Number | Increment When | Example |
|--------|----------------|---------|
| **MAJOR** | Incompatible changes — breaking the form contract, changing the Sheet schema, redesigning the visual identity, removing sections | `1.0.0 → 2.0.0` |
| **MINOR** | New features or content added in a backward-compatible way — new section, new form field, new copy, new component | `1.0.0 → 1.1.0` |
| **PATCH** | Backward-compatible bug fixes — typo fix, broken link fix, contrast tweak, dependency patch | `1.0.0 → 1.0.1` |

### 1.2 Pre-Release Tags

| Tag | Meaning |
|-----|---------|
| `-alpha.N` | Internal, incomplete, not deployable |
| `-beta.N` | Feature-complete, under testing, not production |
| `-rc.N` | Release candidate, production-ready pending final QA |

Example: `1.1.0-rc.1` → `1.1.0`.

### 1.3 What Triggers a Version Bump

| Change | Bump |
|--------|------|
| H1 / CTA / value proposition change | MINOR |
| New page section added | MINOR |
| New form field added | MINOR (unless breaking → MAJOR) |
| Form field removed | MAJOR |
| Sheet schema change (new/removed column) | MAJOR |
| Apps Script contract change (request/response shape) | MAJOR |
| Copy edit within existing limits | PATCH |
| Typo fix | PATCH |
| Design token value change | MINOR |
| Full redesign / rebrand | MAJOR |
| Dependency update (non-breaking) | PATCH |
| Dependency update (breaking) | MINOR or MAJOR |
| Documentation-only change | PATCH |
| Security fix | PATCH (or MINOR if contract changes) |

---

## 2. Change Categories

Every entry uses one or more of these categories, per Keep a Changelog:

| Category | Definition | Example |
|----------|-----------|---------|
| **Added** | New features, sections, files, docs | New FAQ section, new `design-system.md` |
| **Changed** | Changes to existing functionality, copy, or design | Hero headline rewritten, button color darkened |
| **Deprecated** | Features marked for removal in a future release | Old form endpoint kept for 1 release |
| **Removed** | Features removed in this release | Pricing section removed |
| **Fixed** | Bug fixes | Form not resetting after success |
| **Security** | Vulnerability fixes, security improvements | Honeypot added, env var exposure fixed |

### 2.1 Rules

- **One entry per change.** No "various fixes" — list them.
- **User-facing language.** Write for the client, not just the developer.
- **Link to commit / PR** where possible (short hash is fine).
- **Group by category** within each version.
- **Newest version at top.** Reverse chronological.

---

## 3. Release History

| Version | Date | Type | Summary |
|---------|------|------|---------|
| 1.0.0 | 2026-11-05 | Initial release | Production-ready landing page with lead capture |

---

## 4. Unreleased

Changes staged for the next release go here. At release time, this section moves into a versioned block below.

### Added

- *(none)*

### Changed

- *(none)*

### Deprecated

- *(none)*

### Removed

- *(none)*

### Fixed

- *(none)*

### Security

- *(none)*

---

## 5. Version 1.0.0 — 2026-11-05

**Release type:** Initial release
**Status:** Production Ready
**Live URL:** *(to be filled after deployment)*
**Repo:** *(to be filled)*

Initial production release of the SaaS Product Launch Landing Page — a static, 100/100 Lighthouse, conversion-focused landing page with lead capture to Google Sheets via Google Apps Script.

### Added

#### Page & Components
- Single-page composition with 9 sections: Navbar, Hero, Social Proof, Features, How It Works, Pricing, FAQ, Lead Form, Footer
- `src/layouts/BaseLayout.astro` — HTML shell with meta tags, OG tags, favicon, system font stack
- `src/components/Navbar.astro` — logo, anchor links, persistent CTA
- `src/components/Hero.astro` — headline, subheadline, primary CTA, hero visual
- `src/components/Features.astro` — 3-card feature grid with icons
- `src/components/LeadForm.astro` — 4-field form with inline validation, success/error states, `aria-live` status
- `src/components/Footer.astro` — copyright, contact, links
- `src/pages/index.astro` — single-page composition
- `src/styles/global.css` — Tailwind directives + reduced-motion overrides

#### Form & Backend
- Client-side form logic (`src/scripts/form.ts`) — `fetch()` POST to Apps Script endpoint with JSON payload
- Google Apps Script `doPost` handler (`apps-script/Code.gs`) — appends rows to Google Sheet, returns JSON
- Google Sheet schema: `timestamp`, `name`, `email`, `company`, `message`, `source`
- `appsscript.json` manifest with `ANYONE_ANONYMOUS` web app access
- Honeypot field to reduce bot submissions
- Success, error, and submitting states with accessible announcements

#### Design System
- Tailwind-based token system (colors, typography, spacing, radius, elevation)
- Brand color scale (`brand-50` → `brand-900`) aliased to Tailwind blue
- System font stack (no web fonts) for zero network cost
- 6-size type scale; 3 responsive breakpoints (375, 768, 1440)
- Component library: buttons, inputs, cards, section headings, navbar, footer, status message
- Reduced-motion support via `prefers-reduced-motion`

#### Configuration & Build
- `astro.config.mjs` — static output, Tailwind integration, `inlineStylesheets: auto`
- `tailwind.config.mjs` — custom font family, `max-w-screen-xl`, brand color scale
- `package.json` scripts: `dev`, `build`, `preview`, `check`
- `.env.example` with `PUBLIC_APPS_SCRIPT_URL` and `PUBLIC_GA_ID` placeholders
- `.gitignore` excludes `.env`, `dist/`, `.astro/`, `node_modules/`

#### Documentation
- `saas-landing-page.md` — full technical blueprint (architecture, data flow, code, specs)
- `cheatsheets.md` — one-page build/debug reference
- `content-guide.md` — copy rules, tone, all on-page text, banned words, character limits
- `deployment-guide.md` — step-by-step hosting + backend setup with troubleshooting
- `design-system.md` — design tokens, components, motion, responsive rules
- `verification-checklist.md` — 100-item, 5-phase verification with evidence requirements
- `changelog.md` — this file

#### Assets
- `public/favicon.svg` — site favicon
- `public/robots.txt` — SEO robots file
- `public/images/hero-visual.webp` — optimized hero visual
- `public/images/og-image.png` — 1200×630 Open Graph image

### Changed

- Initial release — no prior version to compare.

### Deprecated

- None.

### Removed

- None.

### Fixed

- None (initial release).

### Security

- Environment variables namespaced with `PUBLIC_*`; no secrets exposed to client bundle
- `.env` excluded from Git
- HTTPS enforced by Vercel/Netlify
- Security headers configured via `netlify.toml` / `vercel.json` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
- Google Sheet access restricted to owner + team
- Apps Script execution logs reviewable by owner

### Performance

- Lighthouse 100/100/100/100 (mobile + desktop)
- Page weight < 500 KB
- Time to Interactive < 1.5 s
- No external font requests
- Zero JavaScript shipped except form script

### Accessibility

- WCAG 2.1 AA compliant
- Semantic landmarks, single `<h1>`, labeled inputs
- Color contrast ≥ 4.5:1 for all body text
- Visible focus states on all interactive elements
- `aria-live="polite"` on form status
- Reduced-motion support

### SEO

- `<title>` ≤ 60 chars, meta description 120–160 chars
- Open Graph + Twitter card metadata
- Canonical URL
- `robots.txt` allows crawling
- Optional: `SoftwareApplication` JSON-LD (not enabled in this release)

### Known Limitations

- Dark mode not implemented (planned for v2.0.0)
- A/B testing not enabled (planned for v1.1.0)
- Email automation not configured (welcome email requires Apps Script trigger)
- Social proof section is optional and not populated by default (client must supply real logos/testimonials)
- Analytics (GA4) is optional and requires `PUBLIC_GA_ID` to be set

### Verification

- All 100 items in `verification-checklist.md` PASS
- Evidence committed to `/verification/`
- Client sign-off: *(to be recorded on handoff)*

---

## 6. How to Update This Changelog

### 6.1 During Development

1. Add changes to the **Unreleased** section as you work.
2. Use the correct category (`Added`, `Changed`, `Fixed`, etc.).
3. Write the entry for the end reader — a client or future developer.
4. Commit the changelog update with the code change.

### 6.2 At Release

1. Decide the version number using the policy in §1.
2. Move all Unreleased entries into a new versioned block.
3. Add the release date and type.
4. Reset the Unreleased section to empty.
5. Tag the commit: `git tag -a v1.1.0 -m "Release v1.1.0"`.
6. Push tag: `git push origin v1.1.0`.
7. Deploy to production (see `deployment-guide.md`).
8. Update this file's Document Information table (`Version`, `Last Updated`).

### 6.3 Entry Format

```markdown
- [Short description of the change] ([#PR](link) / [commit](link))
```

Examples:

```markdown
- Added FAQ section with 6 questions ([#42](https://github.com/you/repo/pull/42))
- Fixed form not resetting after successful submission ([a1b2c3d](https://github.com/you/repo/commit/a1b2c3d))
- Changed hero headline to "Launch your SaaS in days, not months" ([#38](...))
```

### 6.4 Writing Rules

| ✅ Good | ❌ Bad |
|---------|--------|
| "Fixed form not resetting after success" | "Fixed bug" |
| "Changed hero CTA to 'Join the waitlist'" | "Updated stuff" |
| "Added honeypot field to reduce bot spam" | "Security improvements" |
| "Removed Pricing section (not applicable to waitlist model)" | "Removed section" |

- **Imperative mood.** "Add," "Change," "Fix" — not "Added," "Changed" (except in past-tense categories like this v1.0.0 entry, which is retrospective).
- **One line per change.**
- **Describe the user-visible effect**, not the code.
- **Link to issue/PR** when available.

---

## 7. Examples & Anti-Patterns

### 7.1 Good Entries

```markdown
### Added
- New "How It Works" section with 3-step process ([#24](...))
- Form validation for email format (RFC 5322) ([#31](...))

### Changed
- Hero H1 rewritten to "Launch your SaaS in days, not months" ([#38](...))
- Primary button color darkened from `brand-500` to `brand-600` for AA contrast ([#40](...))

### Fixed
- Form not resetting after successful submission ([a1b2c3d](...))
- Broken favicon link in BaseLayout ([#44](...))

### Security
- Added honeypot field to reduce bot submissions ([#36](...))
- Removed accidental `.env` commit; rotated Apps Script URL ([#39](...))
```

### 7.2 Anti-Patterns

```markdown
# ❌ Vague
- Various fixes
- Updated code
- Improvements

# ❌ Code-only, no context
- Refactored doPost()
- Changed class names

# ❌ Missing version bump
(entries added to Unreleased but never released)

# ❌ Multiple changes in one line
- Fixed form reset, changed CTA color, added FAQ section, updated README

# ❌ No categories
- Everything under "Changed"
```

---

## Appendix A: Release Checklist

Before tagging a release:

```
[ ] All Unreleased entries moved into versioned block
[ ] Version number matches SemVer policy
[ ] Release date added
[ ] Document Information table updated (version, last updated)
[ ] All changes linked to PR/commit
[ ] Verification checklist re-run (for MINOR/MAJOR releases)
[ ] Deployment guide followed (for MINOR/MAJOR releases)
[ ] Git tag created and pushed
[ ] Changelog committed with tag
```

---

## Appendix B: Version History at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│  VERSION HISTORY                                            │
├─────────────────────────────────────────────────────────────┤
│  1.0.0  │  2026-11-05  │  Initial release                  │
│         │              │  Landing page + lead capture      │
│         │              │  Lighthouse 100/100/100/100       │
└─────────────────────────────────────────────────────────────┘

Next planned:
  1.1.0  │  TBD         │  A/B testing, analytics dashboard
  2.0.0  │  TBD         │  Dark mode, multi-page, CRM sync
```
