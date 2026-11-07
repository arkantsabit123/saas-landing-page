# Design System — SaaS Product Launch Landing Page

A complete visual and interaction reference for the landing page. This document defines the design tokens, typography, spacing, color palette, component styles, motion rules, and layout grid that make up the site's visual language — so every future page, component, or iteration stays consistent with the original design.

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-05 |
| Status | Production Ready |
| Companion Docs | `saas-landing-page.md`, `cheatsheets.md`, `content-guide.md`, `deployment-guide.md` |
| Framework | Astro 4.x + Tailwind CSS 3.4 |
| Design Philosophy | Performance-first, content-first, mobile-first |

---

## Purpose of This Guide

This document exists so that:

1. **Visual consistency is enforced** — every component pulls from the same token set, not ad-hoc values.
2. **New pages inherit the design** — the system scales beyond the launch page without redesign.
3. **Handoff is unambiguous** — designers and developers share one source of truth.
4. **The 100/100 Lighthouse target is protected** — design decisions are constrained by performance budgets.

This is **not** a brand identity guide. It's an implementation reference for the specific landing page build.

---

## Table of Contents

1. Design Principles
2. Design Tokens
3. Color System
4. Typography
5. Spacing Scale
6. Layout Grid & Containers
7. Border Radius & Elevation
8. Component Library
9. Iconography
10. Imagery & Illustration
11. Motion & Interaction
12. Responsive Design
13. Accessibility in Design
14. Dark Mode (Future)
15. Design Tokens → Tailwind Mapping
16. File Structure
17. Governance

---

## 1. Design Principles

The landing page is designed against five principles, in priority order:

### 1.1 Performance First

Every visual choice must earn its bytes. No web fonts, no heavy illustrations, no CSS-in-JS runtimes. If a design choice would push Lighthouse below 100, it's rejected.

- System fonts only
- WebP images with explicit dimensions
- Tailwind purges all unused CSS
- Total page weight budget: **< 500 KB**

### 1.2 Content First

Design serves the copy. Layout is chosen to make the value proposition scannable, not to show off visual effects.

- One primary message per viewport
- Generous whitespace around headlines
- No carousels, no auto-rotating content
- CTAs are the highest-contrast elements

### 1.3 Mobile First

Base styles target 375 px. Enhancements layer on at `md:` (768 px) and `lg:` (1024 px) breakpoints.

- Single-column on mobile
- Touch targets ≥ 44 × 44 px
- Text never below 16 px
- No hover-only interactions

### 1.4 Accessible by Default

Every component is built accessible first, not retrofitted.

- Contrast ratio ≥ 4.5:1 for body text
- Visible focus states on all interactive elements
- Semantic HTML before ARIA
- Motion respects `prefers-reduced-motion`

### 1.5 Systematized, Not Custom

Every value comes from a token. No `margin: 37px`, no `#3b82f6` typed inline. If a new value is needed, it's added to the token set first.

---

## 2. Design Tokens

Design tokens are the atomic values of the system. In this project, tokens are expressed as **Tailwind utility classes** — there's no separate token file, because Tailwind's default scale *is* the token set (with a few overrides in `tailwind.config.mjs`).

### 2.1 Token Categories

| Category | Source | Example |
|----------|--------|---------|
| Color | Tailwind palette | `bg-blue-600`, `text-slate-900` |
| Typography | Tailwind defaults | `text-4xl`, `font-bold` |
| Spacing | Tailwind default scale | `px-4`, `py-16`, `gap-6` |
| Radius | Tailwind defaults | `rounded-lg`, `rounded-xl` |
| Shadow | Tailwind defaults | `shadow-sm`, `shadow-md` |
| Breakpoints | Tailwind defaults | `sm:`, `md:`, `lg:` |

### 2.2 Custom Tokens (tailwind.config.mjs)

Only three customizations are made to the default theme:

```js
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        'screen-xl': '1200px',
      },
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',  // Primary
          700: '#1d4ed8',  // Hover
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
};
```

**What's customized and why:**

| Token | Custom value | Justification |
|-------|-------------|---------------|
| `fontFamily.sans` | System font stack | Zero network requests for fonts |
| `maxWidth.screen-xl` | `1200px` | Standard content max-width for SaaS pages |
| `colors.brand` | Blue scale (aliases Tailwind blue) | Semantic naming decouples design from palette |

**What's *not* customized:** spacing, radius, shadow, typography scale, breakpoints — all use Tailwind defaults. Customizing these fragments the system.

---

## 3. Color System

### 3.1 Palette

The palette is intentionally minimal. Only three color families are used, each with a specific role.

| Family | Role | Tailwind scale |
|--------|------|----------------|
| **Brand (blue)** | Primary actions, links, focus | `blue-50` → `blue-900` |
| **Neutral (slate)** | Text, backgrounds, borders | `slate-50` → `slate-900` |
| **Semantic** | Success, error, warning | `green`, `red`, `amber` (Tailwind defaults) |

### 3.2 Brand Color Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-50` | `#eff6ff` | Subtle backgrounds, hover on light surfaces |
| `brand-100` | `#dbeafe` | Disabled background tint |
| `brand-500` | `#3b82f6` | Focus rings (alternative) |
| `brand-600` | `#2563eb` | **Primary** — buttons, links, CTA |
| `brand-700` | `#1d4ed8` | **Hover** — button hover state |
| `brand-900` | `#1e3a8a` | Text on light brand backgrounds |

### 3.3 Neutral Color Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `slate-50` | `#f8fafc` | Page background alternative |
| `slate-100` | `#f1f5f9` | Card backgrounds, subtle sections |
| `slate-200` | `#e2e8f0` | Borders, dividers |
| `slate-300` | `#cbd5e1` | Input borders (default) |
| `slate-400` | `#94a3b8` | Placeholder text, disabled icons |
| `slate-500` | `#64748b` | Secondary text (meta, captions) |
| `slate-600` | `#475569` | Body text (secondary) |
| `slate-700` | `#334155` | Body text (primary), subheadlines |
| `slate-900` | `#0f172a` | Headings, primary text |

### 3.4 Semantic Colors

| Role | Token | Usage |
|------|-------|-------|
| Success | `green-600` (`#16a34a`) | Success message text |
| Success bg | `green-50` (`#f0fdf4`) | Success message background |
| Error | `red-600` (`#dc2626`) | Error message text, invalid input border |
| Error bg | `red-50` (`#fef2f2`) | Error message background |
| Warning | `amber-600` (`#d97706`) | Warning text (rare) |

### 3.5 Color Usage Rules

| Rule | Detail |
|------|--------|
| Text on white | Use `slate-700` (body) or `slate-900` (headings) — never `slate-500` for body |
| Links | `brand-600`, underline on hover, `brand-700` on active |
| Primary button | `bg-brand-600` → `hover:bg-brand-700`, `text-white` |
| Secondary button | `border-slate-300`, `text-slate-700`, `hover:bg-slate-50` |
| Focus ring | `ring-2 ring-brand-500 ring-offset-2` |
| Disabled state | `opacity-50 cursor-not-allowed` — never change color |
| Dividers | `border-slate-200` |
| Section backgrounds | White (default) or `slate-50` (alternating) |

### 3.6 Contrast Compliance

All text/background combinations must pass WCAG AA (4.5:1 for body, 3:1 for large text).

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| `slate-900` on white | 17.85:1 | ✅ AAA |
| `slate-700` on white | 10.31:1 | ✅ AAA |
| `slate-600` on white | 7.56:1 | ✅ AAA |
| `slate-500` on white | 4.76:1 | ✅ AA |
| `brand-600` on white | 5.17:1 | ✅ AA |
| `white` on `brand-600` | 5.17:1 | ✅ AA |
| `slate-400` on white | 2.63:1 | ❌ Fail — only for placeholder/disabled |

**Forbidden combinations:**

- `slate-400` or lighter for any readable text
- `brand-500` on white (3.68:1 — fails AA for body)
- Any brand color on `slate-900` background

---

## 4. Typography

### 4.1 Font Stack

**No web fonts.** The site uses the system font stack for zero network cost and instant rendering.

```css
font-family:
  system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue',
  Arial, sans-serif;
```

**Applied globally** via `tailwind.config.mjs` → `fontFamily.sans`.

### 4.2 Type Scale

Based on Tailwind's default scale, constrained to six sizes used on the page:

| Token | Class | Size | Line height | Weight | Usage |
|-------|-------|------|-------------|--------|-------|
| Display | `text-5xl` / `md:text-6xl` | 48 / 60 px | 1.1 | `font-bold` (700) | Hero H1 (desktop) |
| H1 (mobile) | `text-4xl` | 36 px | 1.15 | `font-bold` (700) | Hero H1 (mobile) |
| H2 | `text-3xl` / `md:text-4xl` | 30 / 36 px | 1.2 | `font-bold` (700) | Section headings |
| H3 | `text-xl` | 20 px | 1.3 | `font-semibold` (600) | Card titles |
| Body large | `text-lg` | 18 px | 1.6 | `font-normal` (400) | Hero subheadline |
| Body | `text-base` | 16 px | 1.6 | `font-normal` (400) | Paragraphs, form inputs |
| Caption | `text-sm` | 14 px | 1.5 | `font-normal` (400) | Form help text, footer |
| Micro | `text-xs` | 12 px | 1.5 | `font-medium` (500) | Badges, labels (rare) |

**Never used:** `text-7xl`, `text-8xl`, `text-9xl` — too large for a landing page.

### 4.3 Font Weights

| Token | Class | Weight | Usage |
|-------|-------|--------|-------|
| Normal | `font-normal` | 400 | Body text, descriptions |
| Medium | `font-medium` | 500 | Form labels, nav links |
| Semibold | `font-semibold` | 600 | Buttons, card titles, H3 |
| Bold | `font-bold` | 700 | H1, H2, hero headline |

**Not used:** `font-light` (300) — too thin on mobile; `font-black` (900) — too heavy.

### 4.4 Letter Spacing

| Token | Class | Usage |
|-------|-------|-------|
| Tight | `tracking-tight` | H1, display headings |
| Normal | `tracking-normal` | Everything else |

**Not used:** `tracking-wide`, `tracking-widest` — reserved for uppercase micro-labels, which this page doesn't use.

### 4.5 Line Height

| Token | Class | Usage |
|-------|-------|-------|
| Tight | `leading-tight` (1.25) | Headings only |
| Normal | `leading-normal` (1.5) | UI text |
| Relaxed | `leading-relaxed` (1.625) | Body paragraphs |

### 4.6 Text Color Mapping

| Role | Class | Example |
|------|-------|---------|
| Primary heading | `text-slate-900` | `<h1>` |
| Secondary heading | `text-slate-900` | `<h2>` |
| Body text | `text-slate-700` | Paragraphs |
| Secondary body | `text-slate-600` | Feature descriptions |
| Muted / meta | `text-slate-500` | Copyright, captions |
| Link | `text-brand-600 hover:text-brand-700` | Inline links |
| Placeholder | `placeholder:text-slate-400` | Input placeholders |
| Error | `text-red-600` | Validation messages |

### 4.7 Typography Rules

- **One `<h1>` per page.** No exceptions.
- **Headings never skip levels.** H1 → H2 → H3, never H1 → H3.
- **No heading over 3 lines** on desktop, **4 lines** on mobile — if it wraps more, shorten the copy.
- **Max line length for paragraphs:** 65–75 characters (use `max-w-prose` or `max-w-2xl`).
- **No justified text.** Left-aligned only.
- **No all-caps blocks** longer than 3 words.

---

## 5. Spacing Scale

Based on Tailwind's 4 px base unit. Only a subset is used on the page.

### 5.1 Spacing Tokens

| Token | Class | Pixels | Usage |
|-------|-------|--------|-------|
| 1 | `p-1` / `m-1` | 4 px | Tight inline spacing |
| 2 | `p-2` / `m-2` | 8 px | Icon-to-text gaps |
| 3 | `p-3` / `m-3` | 12 px | Small padding (badges) |
| 4 | `p-4` / `m-4` | 16 px | Standard container padding (mobile) |
| 6 | `p-6` / `m-6` | 24 px | Card padding |
| 8 | `p-8` / `m-8` | 32 px | Large card padding |
| 12 | `py-12` | 48 px | Section padding (mobile) |
| 16 | `py-16` | 64 px | Section padding (tablet) |
| 20 | `py-20` | 80 px | Section padding (desktop) |
| 24 | `py-24` | 96 px | Hero vertical padding (desktop) |

### 5.2 Section Vertical Rhythm

Every top-level `<section>` uses consistent vertical padding:

```html
<section class="py-16 md:py-20 lg:py-24">
```

| Breakpoint | Padding | Result |
|------------|---------|--------|
| Mobile (< 768) | `py-16` (64 px) | Compact |
| Tablet (≥ 768) | `md:py-20` (80 px) | Comfortable |
| Desktop (≥ 1024) | `lg:py-24` (96 px) | Generous |

### 5.3 Component Spacing

| Component | Outer (margin) | Inner (padding) |
|-----------|---------------|-----------------|
| Button | `mt-8` (from preceding text) | `px-6 py-3` |
| Input | `space-y-4` (between fields) | `px-4 py-3` |
| Card | `gap-6` (in grid) | `p-6` |
| Section heading → content | `mb-12` | — |
| Form label → input | `mb-2` | — |

### 5.4 Spacing Rules

- **Never use arbitrary values** like `mt-[37px]`. Use the scale.
- **Stack spacing:** prefer `space-y-*` on parent over repeated `mt-*` on children.
- **Section gaps:** never less than `py-12` between sections, even on mobile.
- **No negative margins** except for decorative overlaps (not used here).

---

## 6. Layout Grid & Containers

### 6.1 Container

The site uses a single centered container pattern:

```html
<div class="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
```

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Max width | 100% | 100% | `max-w-6xl` (1152 px) |
| Horizontal padding | `px-4` (16 px) | `md:px-6` (24 px) | `lg:px-8` (32 px) |
| Centering | `mx-auto` | `mx-auto` | `mx-auto` |

**Alternative:** For the hero section, use `max-w-4xl` to constrain headline width; for the form, `max-w-2xl`.

### 6.2 Grid System

Tailwind's flexbox and CSS Grid utilities are used. Common patterns:

| Pattern | Classes |
|---------|---------|
| Feature grid (3-col) | `grid gap-6 md:grid-cols-3` |
| Feature grid (2-col) | `grid gap-6 md:grid-cols-2` |
| Two-column split | `grid gap-8 md:grid-cols-2` |
| Form layout | `space-y-4` (stacked) |
| Navbar layout | `flex items-center justify-between` |

### 6.3 Breakpoints

Tailwind defaults, unmodified:

| Name | Min width | Target |
|------|-----------|--------|
| `sm` | 640 px | Large phones (rare) |
| `md` | 768 px | Tablets |
| `lg` | 1024 px | Small laptops |
| `xl` | 1280 px | Desktops |
| `2xl` | 1536 px | Large monitors |

**The page uses only `md:` and `lg:`.** `sm:`, `xl:`, `2xl:` are available but not used.

### 6.4 Layout Verification

| Viewport | Behavior |
|----------|----------|
| 375 × 667 | Single column, stacked sections, hamburger nav |
| 768 × 1024 | Feature grid 2-col, nav expanded, container padding 24 px |
| 1440 × 900 | Feature grid 3-col, max-width container (1152 px), nav full |

---

## 7. Border Radius & Elevation

### 7.1 Border Radius Tokens

| Token | Class | Pixels | Usage |
|-------|-------|--------|-------|
| Small | `rounded` | 4 px | Badges, small tags |
| Medium | `rounded-lg` | 8 px | **Buttons**, **inputs** |
| Large | `rounded-xl` | 12 px | **Cards**, **modals** |
| Full | `rounded-full` | 9999 px | Avatars, pills (not used) |

**Rule:** Buttons and inputs share `rounded-lg`. Cards use `rounded-xl`. Never mix radii within a component.

### 7.2 Elevation (Shadows)

The site uses **minimal shadow**. Borders do most of the visual separation.

| Token | Class | Usage |
|-------|-------|-------|
| None | (default) | Most surfaces — use borders instead |
| Subtle | `shadow-sm` | Inputs on focus, hover state for cards |
| Medium | `shadow-md` | Sticky navbar (on scroll), dropdown |
| Large | `shadow-lg` | Modal dialogs (not used on this page) |

**Default card style:** `border border-slate-200 rounded-xl` — **no shadow**.

**On hover (optional):** `hover:shadow-md transition-shadow`.

### 7.3 Border Tokens

| Token | Class | Usage |
|-------|-------|-------|
| Thin | `border` (1 px) | Cards, inputs, dividers |
| Thick | `border-2` | Focus rings, active tabs (not used) |
| Color | `border-slate-200` | Default card border |
| Color | `border-slate-300` | Input border (default) |
| Color | `border-slate-400` | Input hover |
| Color | `border-brand-500` | Input focus |
| Color | `border-red-500` | Input error |

---

## 8. Component Library

Every component below is implemented in `src/components/`. Styles are inlined as Tailwind classes in the `.astro` files.

### 8.1 Button (Primary)

```html
<button class="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
  Join the waitlist
</button>
```

| State | Style |
|-------|-------|
| Default | `bg-brand-600 text-white` |
| Hover | `hover:bg-brand-700` |
| Focus | `ring-2 ring-brand-500 ring-offset-2` |
| Active | `active:bg-brand-800` (optional) |
| Disabled | `opacity-50 cursor-not-allowed` |

**Min height:** 44 px (`py-3` + text). **Min width:** fits content, never below 120 px.

### 8.2 Button (Secondary)

```html
<button class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">
  Learn more
</button>
```

### 8.3 Input (Text)

```html
<input type="text" class="w-full rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
```

| State | Style |
|-------|-------|
| Default | `border-slate-300` |
| Hover | `hover:border-slate-400` |
| Focus | `border-brand-500 ring-2 ring-brand-500/20` |
| Error | `border-red-500 ring-2 ring-red-500/20` |
| Disabled | `bg-slate-50 text-slate-500 cursor-not-allowed` |

### 8.4 Input (Textarea)

Same as text input, plus:

```html
<textarea rows="3" class="...resize-y min-h-[96px]"></textarea>
```

**Rule:** `resize-y` only — never allow horizontal resize (breaks layout).

### 8.5 Form Label

```html
<label class="mb-2 block text-sm font-medium text-slate-700">
  Work email
</label>
```

**Rule:** Labels are always visible (never placeholder-only). Required fields marked with a `<span class="text-red-600">*</span>` or `(required)`.

### 8.6 Form Help Text

```html
<p class="mt-1 text-sm text-slate-500">We'll only use this to send your invite.</p>
```

### 8.7 Form Error Message

```html
<p class="mt-1 text-sm text-red-600" role="alert">Please enter a valid email address.</p>
```

### 8.8 Card (Feature)

```html
<div class="rounded-xl border border-slate-200 p-6">
  <h3 class="text-lg font-semibold text-slate-900">Lightning fast</h3>
  <p class="mt-2 text-slate-600">Static-first build ships in under one second.</p>
</div>
```

| Property | Value |
|----------|-------|
| Background | `bg-white` (default) |
| Border | `border-slate-200` |
| Radius | `rounded-xl` |
| Padding | `p-6` |
| Shadow | None (border only) |
| Hover (optional) | `hover:shadow-md transition-shadow` |

### 8.9 Section Heading Block

```html
<div class="mx-auto max-w-2xl text-center">
  <h2 class="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
    Everything you need to launch
  </h2>
  <p class="mt-4 text-lg text-slate-600">
    A short supporting sentence that elaborates on the heading.
  </p>
</div>
```

### 8.10 Navbar

```html
<header class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
    <a href="/" class="text-lg font-bold text-slate-900">Product</a>
    <div class="hidden items-center gap-6 md:flex">
      <a href="#features" class="text-sm font-medium text-slate-600 hover:text-slate-900">Features</a>
      <a href="#how-it-works" class="text-sm font-medium text-slate-600 hover:text-slate-900">How it works</a>
      <a href="#faq" class="text-sm font-medium text-slate-600 hover:text-slate-900">FAQ</a>
    </div>
    <a href="#lead-form" class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
      Join the waitlist
    </a>
  </nav>
</header>
```

### 8.11 Footer

```html
<footer class="border-t border-slate-200 bg-white">
  <div class="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p class="text-sm text-slate-500">© 2026 Product. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="/privacy" class="text-sm text-slate-500 hover:text-slate-900">Privacy</a>
        <a href="/terms" class="text-sm text-slate-500 hover:text-slate-900">Terms</a>
        <a href="mailto:hello@product.example.com" class="text-sm text-slate-500 hover:text-slate-900">Contact</a>
      </div>
    </div>
  </div>
</footer>
```

### 8.12 Status Message

```html
<p id="form-status" class="text-sm font-medium" aria-live="polite"></p>
```

| State | Class added |
|-------|-------------|
| Idle | (none) |
| Submitting | `text-slate-500` |
| Success | `text-green-600` |
| Error | `text-red-600` |

---

## 9. Iconography

### 9.1 Icon Source

**Lucide** (or Heroicons as fallback) — consistent, open-source SVG icon set.

Install:

```bash
npm install lucide-astro
```

### 9.2 Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| Small | 16 px | Inline with text |
| Default | 20 px | Feature cards, form fields |
| Medium | 24 px | Navbar, primary buttons |
| Large | 32 px | Hero decorative (rare) |

### 9.3 Icon Color

Icons inherit `currentColor`. Wrap in a colored element:

```html
<div class="text-brand-600">
  <Zap size={24} />
</div>
```

### 9.4 Icon Rules

- **Decorative icons:** `aria-hidden="true"` + `alt=""` (if `<img>`)
- **Meaningful icons:** include `aria-label` on the parent
- **Consistent stroke width:** default (2 px) — never mix
- **No emoji as icons.** Use SVG.
- **No icon-only buttons** without an accessible label.

### 9.5 Feature Card Icon Pattern

```html
<div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
  <Zap size={20} aria-hidden="true" />
</div>
```

---

## 10. Imagery & Illustration

### 10.1 Image Formats

| Format | Usage |
|--------|-------|
| SVG | Icons, logos, simple illustrations |
| WebP | Hero visual, screenshots, photos |
| PNG | OG image only (social media requirement) |

**Never used:** JPEG (larger than WebP), GIF (no animations on this page).

### 10.2 Image Dimensions

| Image | Dimensions | File |
|-------|-----------|------|
| Hero visual | 1200 × 800 (2x for 600 px display) | `hero-visual.webp` |
| OG image | 1200 × 630 | `og-image.png` |
| Feature icons | 24 × 24 (SVG, scalable) | `feature-icons/*.svg` |
| Logos (social proof) | Variable, max height 32 px | `logos/*.svg` |

### 10.3 Image Rules

- **Always set `width` and `height` attributes** to prevent layout shift (CLS).
- **Use `loading="lazy"`** on below-fold images.
- **Use `loading="eager"` + `fetchpriority="high"`** on the hero image.
- **Provide `alt` text** on all content images.
- **Compress to < 100 KB** for any raster image.
- **No decorative background images** — use CSS gradients if needed.

### 10.4 Hero Visual Pattern

```html
<img
  src="/images/hero-visual.webp"
  alt="Product dashboard showing a project board with tasks"
  width="1200"
  height="800"
  loading="eager"
  fetchpriority="high"
  class="mx-auto w-full max-w-2xl rounded-xl border border-slate-200"
/>
```

---

## 11. Motion & Interaction

### 11.1 Motion Principles

- **Motion clarifies, never decorates.** No spinning, bouncing, or attention-seeking animations.
- **Fast.** All transitions ≤ 200 ms.
- **Reduced-motion aware.** Respect `prefers-reduced-motion`.
- **No scroll-jacking.** No parallax, no scroll-triggered animations on this page.

### 11.2 Transition Tokens

| Token | Class | Duration | Usage |
|-------|-------|----------|-------|
| Color | `transition-colors` | 150 ms | Buttons, links, inputs |
| Shadow | `transition-shadow` | 150 ms | Card hover |
| Transform | `transition-transform` | 200 ms | Rare (arrow icons) |
| All | `transition` | 150 ms | Fallback (avoid) |

### 11.3 Hover States

| Element | Hover |
|---------|-------|
| Primary button | Background darkens (`bg-brand-700`) |
| Secondary button | Background lightens (`bg-slate-50`) |
| Link | Text darkens + underline |
| Card | Optional `shadow-md` (border stays) |
| Input | Border darkens (`border-slate-400`) |

**No hover-only content.** Every interaction must work on touch.

### 11.4 Focus States

Focus is always visible. Never `outline: none` without a replacement.

```html
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
```

| Element | Focus style |
|---------|-------------|
| Button | Ring (2 px) + offset (2 px) |
| Input | Border color + subtle ring |
| Link | Ring (2 px) + offset (2 px) |

### 11.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Add this to `src/styles/global.css`.

### 11.6 Loading State (Form Submit)

On submit:

1. Button text → `Submitting…`
2. Button gets `disabled opacity-50 cursor-not-allowed`
3. Status message → `Submitting…` in `text-slate-500`

No spinner (avoids extra DOM + CSS). Text change is sufficient feedback.

---

## 12. Responsive Design

### 12.1 Breakpoint Strategy

Mobile-first. Base styles target 375 px. Enhancements layer at `md:` (768 px) and `lg:` (1024 px).

### 12.2 Responsive Patterns

| Pattern | Mobile | Desktop |
|---------|--------|---------|
| Hero H1 | `text-4xl` | `md:text-6xl` |
| Hero subheadline | `text-base` | `md:text-lg` |
| Section padding | `py-16` | `md:py-20 lg:py-24` |
| Container padding | `px-4` | `md:px-6 lg:px-8` |
| Feature grid | 1 column | `md:grid-cols-3` |
| Navbar | Logo + CTA only | Logo + links + CTA |
| Footer | Stacked | Horizontal |

### 12.3 Responsive Rules

- **No horizontal scroll** at any viewport ≥ 320 px.
- **Text ≥ 16 px** on mobile (prevents iOS zoom on input focus).
- **Touch targets ≥ 44 × 44 px.**
- **No fixed widths** on containers — use `max-w-*` + `w-full`.
- **Test at 375, 768, 1024, 1440** before merging.

### 12.4 Responsive Testing Matrix

| Viewport | Device | Check |
|----------|--------|-------|
| 320 × 568 | iPhone SE (old) | No overflow, readable |
| 375 × 667 | iPhone SE / 12 mini | Standard mobile |
| 414 × 896 | iPhone 11 Pro Max | Large phone |
| 768 × 1024 | iPad | 2-col grid |
| 1024 × 768 | iPad landscape | 3-col grid |
| 1440 × 900 | MacBook Air | Full desktop |

---

## 13. Accessibility in Design

### 13.1 Visual Accessibility Checklist

```
[ ] All text ≥ 4.5:1 contrast (body), ≥ 3:1 (large text)
[ ] Focus indicators visible on all interactive elements
[ ] No information conveyed by color alone (add text/icon)
[ ] Touch targets ≥ 44 × 44 px
[ ] Text resizable to 200% without layout break
[ ] No content that flashes > 3 times per second
[ ] Form errors have text, not just red borders
```

### 13.2 Color-Independent Design

| Bad | Good |
|-----|------|
| Red border only for errors | Red border + `⚠` icon + text message |
| Green dot for success | Green text "Saved" (words, not just color) |
| Color-only chart legend | Labels + patterns |

### 13.3 Focus Order

Tab order follows DOM order. Rules:

- **Navbar** → Logo → Nav links → CTA
- **Main** → Hero CTA → Features → Form fields → Submit
- **Footer** → Links → Contact

No `tabindex` greater than 0. No focus traps (except modals, which this page doesn't have).

### 13.4 Screen Reader Considerations

| Element | Requirement |
|---------|-------------|
| Hero H1 | First heading, unique |
| Sections | `<section>` with `aria-labelledby` if heading present |
| Form status | `aria-live="polite"` |
| Error messages | `role="alert"` or `aria-describedby` on the input |
| Decorative icons | `aria-hidden="true"` |
| Form labels | Always visible, associated via `for`/`id` |
| Skip link | Optional but recommended |

### 13.5 Skip Link (Optional)

```html
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white">
  Skip to content
</a>
```

---

## 14. Dark Mode (Future)

Dark mode is **not implemented** in v1.0.0. It's documented here for future planning.

### 14.1 Approach

Use Tailwind's `dark:` variant with `class` strategy (not media query), so users can toggle manually.

```js
// tailwind.config.mjs
export default {
  darkMode: 'class',
  // ...
};
```

### 14.2 Dark Palette (Proposed)

| Role | Light | Dark |
|------|-------|------|
| Page bg | `white` | `slate-950` (`#020617`) |
| Surface | `white` | `slate-900` |
| Border | `slate-200` | `slate-800` |
| Text primary | `slate-900` | `slate-50` |
| Text secondary | `slate-600` | `slate-400` |
| Brand | `brand-600` | `brand-400` |
| Focus ring | `brand-500` | `brand-400` |

### 14.3 Toggle Pattern

```html
<button
  aria-label="Toggle dark mode"
  class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
>
  <Sun class="hidden dark:block" />
  <Moon class="block dark:hidden" />
</button>
```

**When implemented:** bump version to 2.0.0, re-run Lighthouse (dark mode often reduces contrast), and update this document.

---

## 15. Design Tokens → Tailwind Mapping

### 15.1 Complete Token Reference

| Token category | Tailwind class | Value |
|---------------|----------------|-------|
| **Color — brand primary** | `bg-brand-600` | `#2563eb` |
| **Color — brand hover** | `bg-brand-700` | `#1d4ed8` |
| **Color — text primary** | `text-slate-900` | `#0f172a` |
| **Color — text body** | `text-slate-700` | `#334155` |
| **Color — text secondary** | `text-slate-600` | `#475569` |
| **Color — text muted** | `text-slate-500` | `#64748b` |
| **Color — border** | `border-slate-200` | `#e2e8f0` |
| **Color — input border** | `border-slate-300` | `#cbd5e1` |
| **Color — success** | `text-green-600` | `#16a34a` |
| **Color — error** | `text-red-600` | `#dc2626` |
| **Font — family** | `font-sans` | system stack |
| **Font — H1** | `text-4xl md:text-6xl font-bold` | 36 / 60 px |
| **Font — H2** | `text-3xl md:text-4xl font-bold` | 30 / 36 px |
| **Font — H3** | `text-xl font-semibold` | 20 px |
| **Font — body** | `text-base` | 16 px |
| **Font — caption** | `text-sm` | 14 px |
| **Space — section** | `py-16 md:py-20 lg:py-24` | 64 / 80 / 96 px |
| **Space — card padding** | `p-6` | 24 px |
| **Space — button padding** | `px-6 py-3` | 24 / 12 px |
| **Space — input padding** | `px-4 py-3` | 16 / 12 px |
| **Radius — button/input** | `rounded-lg` | 8 px |
| **Radius — card** | `rounded-xl` | 12 px |
| **Shadow — subtle** | `shadow-sm` | — |
| **Transition** | `transition-colors` | 150 ms |
| **Container** | `mx-auto max-w-6xl px-4 md:px-6 lg:px-8` | 1152 px |
| **Breakpoint — tablet** | `md:` | 768 px |
| **Breakpoint — desktop** | `lg:` | 1024 px |

### 15.2 Banned Values

Never use:

| Forbidden | Why |
|-----------|-----|
| `text-2xl` in body copy | Breaks type scale (only H2/H3 use larger) |
| `#hex` inline styles | Bypasses token system |
| `mt-[Npx]` arbitrary values | Breaks spacing rhythm |
| `font-light` | Too thin for accessibility |
| `shadow-2xl` | Too heavy for this aesthetic |
| `rounded-none` on buttons | Inconsistent with system |
| `text-red-500` on white | Fails contrast (use `red-600`) |
| `bg-gray-*` | Use `slate-*` consistently |
| `hover:` only interactions | Must work on touch |
| `!important` | Fix the source, not the symptom |

---

## 16. File Structure

Where design decisions live:

```
saas-landing-page/
├── tailwind.config.mjs          ← Token customizations (colors, fonts, maxWidth)
├── src/
│   ├── styles/
│   │   └── global.css           ← Tailwind directives + base overrides + reduced-motion
│   ├── layouts/
│   │   └── BaseLayout.astro     ← Global font/body classes
│   └── components/
│       ├── Navbar.astro         ← Navbar styles
│       ├── Hero.astro           ← Hero typography + spacing
│       ├── Features.astro       ← Grid + card styles
│       ├── LeadForm.astro       ← Form control styles
│       └── Footer.astro         ← Footer styles
└── public/
    ├── favicon.svg
    └── images/
        ├── hero-visual.webp
        ├── og-image.png
        └── feature-icons/
```

### 16.1 global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

### 16.2 Design Decision Log

New visual decisions go in `DESIGN_LOG.md`:

```markdown
## 2026-11-05 — Initial design system

- Established 6-size type scale
- Chose system fonts over web fonts (perf budget)
- Selected `slate` as sole neutral scale
- Set section padding rhythm: 64 / 80 / 96 px
- Standardized card style: border only, no shadow
```

---

## 17. Governance

### 17.1 Adding a New Component

1. Check if an existing pattern covers the need.
2. If not, define the component in this document first.
3. Get review (designer or lead developer).
4. Implement in `src/components/`.
5. Add to the **Component Library** section of this doc.
6. Update `DESIGN_LOG.md`.

### 17.2 Changing a Token

1. Propose the change in `DESIGN_LOG.md` with rationale.
2. Update `tailwind.config.mjs`.
3. Audit all components for visual regressions.
4. Re-run Lighthouse (contrast, weight, etc.).
5. Bump version of this document.

### 17.3 Design Review Checklist

Before merging any visual change:

```
[ ] Uses existing tokens (no arbitrary values)
[ ] Passes contrast requirements
[ ] Focus states present
[ ] Works at 375, 768, 1440
[ ] No horizontal scroll
[ ] Lighthouse unchanged (100/100/100/100)
[ ] Added to component library (if new)
[ ] Logged in DESIGN_LOG.md (if non-trivial)
```

### 17.4 Versioning

| Change | Version bump |
|--------|--------------|
| New component added | Minor (1.x.0) |
| Token value changed | Minor (1.x.0) |
| Typo / doc fix | Patch (1.0.x) |
| Palette overhaul / rebrand | Major (x.0.0) |

---

## Appendix A: Design Principles Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│  DESIGN PRINCIPLES — in priority order                      │
├─────────────────────────────────────────────────────────────┤
│  1. PERFORMANCE FIRST                                       │
│     System fonts, WebP, no heavy libraries, < 500 KB        │
│                                                             │
│  2. CONTENT FIRST                                           │
│     One message per viewport, generous whitespace           │
│                                                             │
│  3. MOBILE FIRST                                            │
│     375 px base, md:/lg: enhancements, 44 px touch targets  │
│                                                             │
│  4. ACCESSIBLE BY DEFAULT                                   │
│     4.5:1 contrast, visible focus, semantic HTML            │
│                                                             │
│  5. SYSTEMATIZED                                            │
│     Tokens, not ad-hoc values. No arbitrary [Npx].          │
└─────────────────────────────────────────────────────────────┘
```

## Appendix B: Core Classes Cheatsheet

```
Container:      mx-auto max-w-6xl px-4 md:px-6 lg:px-8
Section:        py-16 md:py-20 lg:py-24
H1:             text-4xl md:text-6xl font-bold tracking-tight text-slate-900
H2:             text-3xl md:text-4xl font-bold tracking-tight text-slate-900
Body:           text-base text-slate-700
Secondary:      text-slate-600
Muted:          text-slate-500
Primary btn:    rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
Secondary btn:  rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50
Input:          w-full rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20
Card:           rounded-xl border border-slate-200 p-6
Grid:           grid gap-6 md:grid-cols-3
```
