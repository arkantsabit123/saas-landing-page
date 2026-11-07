# SaaS Landing Page

## Conversion-Focused Landing Page for SaaS Product Launches

[![Status](https://img.shields.io/badge/status-v1.0.0%20SCAFFOLD-yellow)](https://github.com/arkantsabit123/saas-landing-page)
[![Astro](https://img.shields.io/badge/Astro-4.x-BC52EE)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Backend-Apps%20Script-4285F4)](https://developers.google.com/apps-script)
[![Google Sheets](https://img.shields.io/badge/Lead%20Store-Google%20Sheets-34A853)](https://www.google.com/sheets/about/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Metrics & Features](#key-metrics--features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Verification](#verification)
- [Documentation](#documentation)
- [Author](#author)
- [License](#license)

---

## Project Overview

A fast, conversion-focused **single-page marketing site** for SaaS product launches — built to validate demand before the product exists. The page presents a clear value proposition, a feature overview, and a frictionless early-access signup form that captures interested prospects **directly into a Google Sheet**, with **no custom backend required**.

The site is delivered as a **static, CDN-hosted build** via Astro and Tailwind CSS, targeting a **100/100 Lighthouse score** across Performance, Accessibility, Best Practices, and SEO. It is designed to load in under one second on mobile, remain fully responsive from 375 px to 1440 px, and convert visitors into leads through a minimal, single-step form.

## Key Metrics & Features

- **9 Sections:** Navbar, Hero, Social Proof, Features, How It Works, Pricing, FAQ, Lead Form, Footer.
- **Single-Step Form:** Name, email, company, message — validated client-side, POSTed to Apps Script.
- **Zero Backend Cost:** Google Sheets + Apps Script free tier, no server to maintain.
- **Static-First:** Astro ships zero JS by default, only the form script hydrates.
- **Fully Responsive:** Mobile (375 px), tablet (768 px), desktop (1440 px).
- **SEO-Ready:** Meta tags, Open Graph, Twitter card, robots.txt, canonical URL.
- **Accessible:** Semantic landmarks, labeled inputs, `aria-live` form status.
- **100% Auto-Verified:** Read-only Python toolchain checks structure, packages, assets, build output, and handoff readiness across 5 phases.

## Architecture

The website is built using a modern, static-first approach:

1. **Framework:** Astro 4 for Static Site Generation (SSG) ensuring ultra-fast load times.
2. **Styling:** Tailwind CSS 3.4 with utility-first classes, purged for production.
3. **Interactivity:** One client-side script (`form.ts`) handles validation and submission — no React, no hydration overhead.
4. **Backend:** Google Apps Script Web App receives JSON, appends rows to Google Sheets.
5. **Verification:** Read-only Python toolchain (`verify_*.py`) checks 5 phases without writing to disk.
6. **Deployment:** Static hosting on Vercel or Netlify with Git-based atomic deploys.

## Tech Stack

| Component | Technology |
| :--- | :--- |
| Framework | Astro 4.x |
| Styling | Tailwind CSS 3.4 |
| Forms | Google Apps Script (Web App) |
| Lead Store | Google Sheets |
| Hosting | Vercel / Netlify (static) |
| Analytics | Google Analytics 4 (optional) |
| Verification | Python 3.9+ toolchain |
| Fonts | System font stack (zero external requests) |

## Project Structure

```
.
├── docs/                  # Blueprint, design system, guides (7 files)
├── public/                # Static assets (favicon, images, robots.txt)
├── src/
│   ├── components/        # Navbar, Hero, Features, LeadForm, ... (10 files)
│   ├── layouts/           # BaseLayout (HTML shell + meta)
│   ├── pages/             # index.astro (single-page composition)
│   ├── scripts/           # form.ts (client-side form logic)
│   └── styles/            # global.css (Tailwind directives)
├── apps-script/           # Code.gs (doPost handler) + appsscript.json
├── screenshots/           # Verification screenshots (after deploy)
├── verification/          # Verification log
├── setup_project.py       # Scaffolder (idempotent, dry-run supported)
├── structure.py           # Tree viewer (read-only)
└── verify_*.py            # Verifiers (core + 5 phases, read-only)
```

## Quick Start

Run this landing page locally in three simple steps:

```bash
# 1. Clone the repository
git clone https://github.com/arkantsabit123/saas-landing-page.git
cd saas-landing-page

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
# Open http://localhost:4321 in your browser
```

To build for production, run `npm run build`. The static files will be generated in the `/dist` folder.

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
PUBLIC_GA_ID=G-XXXXXXXXXX        # optional
```

## Verification

This project ships with a **read-only verification toolchain** that checks structure, packages, assets, build output, and handoff readiness — without ever writing to disk.

```bash
python verify_environment.py     # full verification (core + all phases)
python verify_all.py             # consolidated summary with per-phase verdicts
python structure.py              # structure tree (excludes node_modules, dist, caches)
```

| Phase | Scope | When it passes |
|-------|-------|----------------|
| 1 | Setup | After `npm install` + Apps Script deployed |
| 2 | Build | After all `.astro`, `.ts`, `.css` files are filled in |
| 3 | Quality | After favicon, robots, OG image, hero visual are added |
| 4 | Deployment | After `npm run build` (produces `dist/`) |
| 5 | Handoff | After screenshots + verification log are complete |

## Documentation

For deep-dive technical details, check the `/docs` folder:

- [Blueprint & Architecture](docs/01-blueprint.md)
- [Design System](docs/02-design-system.md)
- [Content Guide](docs/03-content-guide.md)
- [Cheatsheets](docs/04-cheatsheets.md)
- [Deployment Guide](docs/05-deployment-guide.md)
- [Verification Checklist](docs/06-verification-checklist.md)
- [Changelog](docs/07-changelog.md)

## Author

**Arkan Tsabit** — Full Stack Developer & Cloud Data Engineer

- **Portfolio:** [katalogarkan.github.io](https://katalogarkan.github.io)
- **LinkedIn:** [linkedin.com/in/arkan-tsabit-0b12b9407](https://linkedin.com/in/arkan-tsabit-0b12b9407)
- **GitHub:** [github.com/arkantsabit123](https://github.com/arkantsabit123)
- **Email:** arkantsabit025@gmail.com

## License

Licensed under the [MIT License](LICENSE).