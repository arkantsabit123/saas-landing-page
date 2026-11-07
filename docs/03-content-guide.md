# Content Guide — SaaS Product Launch Landing Page

A practical writing and content reference for the landing page. This guide defines every word, headline, label, and message that appears on the site — so copy can be written, reviewed, and shipped without guessing. It governs **what** the page says; the technical blueprint governs **how** it's built.

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-05 |
| Status | Production Ready |
| Companion Docs | `saas-landing-page.md`, `cheatsheets.md` |
| Applies To | All on-page copy, form labels, meta tags, and system messages |

---

## Purpose of This Guide

This document exists so that:

1. **Copy is written before components are built** — no "lorem ipsum" shipped to production.
2. **Every text element has a rule** — character limits, tone, and required content are defined here.
3. **Non-technical stakeholders can review content** without reading code.
4. **Future edits stay consistent** — anyone updating the page follows the same voice and constraints.

The landing page has one job: **convert a visitor into a waitlist signup.** Every word must serve that goal.

---

## Table of Contents

1. Brand & Voice
2. Audience & Messaging Strategy
3. Page-Wide Copy Rules
4. Section-by-Section Content
5. Form Copy & Microcopy
6. System Messages & States
7. SEO & Metadata Copy
8. Accessibility Copy Rules
9. Content File Locations
10. Writing Checklist
11. Do / Don't Examples
12. Content Governance

---

## 1. Brand & Voice

### 1.1 Brand Personality

| Attribute | We Are | We Are Not |
|-----------|--------|------------|
| Tone | Confident, clear, helpful | Arrogant, jargon-heavy, salesy |
| Energy | Calm and focused | Hyped, exclamation-heavy |
| Persona | A sharp product team | A generic marketing agency |
| Formality | Conversational professional | Stiff corporate / casual slang |

### 1.2 Voice Principles

1. **Clarity over cleverness.** If a shorter, plainer sentence works, use it.
2. **Benefit before feature.** Lead with what the user gets, then how it works.
3. **Specific over vague.** "Loads in under one second" beats "blazingly fast."
4. **One idea per sentence.** No stacking three benefits into one line.
5. **Active voice.** "Capture leads in seconds" — not "Leads are captured…"
6. **Second person.** Talk to "you," not "users" or "customers."
7. **No hype words.** Ban: *revolutionary, game-changing, cutting-edge, disrupt, synergy, leverage, best-in-class.*

### 1.3 Point of View

- **Address the reader as "you."**
- **Refer to the product as "we"** sparingly — prefer direct statements.
- **Avoid "our platform," "our solution," "our tool."** Say what it does.

---

## 2. Audience & Messaging Strategy

### 2.1 Primary Audience

| Attribute | Detail |
|-----------|--------|
| Who | Early-stage SaaS founder / product lead |
| Pain | Needs to validate demand *before* building |
| Goal | Collect waitlist emails fast, with zero backend |
| Objection | "Will this actually work and look professional?" |
| Trigger | Launching a new product in 1–2 weeks |

### 2.2 Value Proposition (Single Sentence)

> **Validate demand for your SaaS with a fast, conversion-focused landing page — and capture leads in seconds, no backend required.**

This sentence is the north star. Every section supports it.

### 2.3 Messaging Hierarchy

| Level | Message | Where It Appears |
|-------|---------|------------------|
| Primary promise | Launch fast, capture leads, no backend | Hero H1 + subheadline |
| Proof | 100/100 Lighthouse, < 1s load | Social proof / features |
| Mechanism | Static-first build, forms → Google Sheets | Features |
| Action | Join the waitlist | CTA button + form |

### 2.4 Objection Handling Map

| Objection | Where Addressed | Copy Tactic |
|-----------|-----------------|-------------|
| "Will it look professional?" | Hero, Social Proof | Polished visuals, testimonial strip |
| "Will it be fast?" | Features | "Static-first", "< 1 second" |
| "Do I need a developer?" | Features | "No backend required" |
| "Is signup painful?" | Form | 4 fields, one step, instant confirm |
| "Is this real?" | Footer, Social Proof | Real logos / real testimonial |

---

## 3. Page-Wide Copy Rules

### 3.1 Global Constraints

| Element | Rule |
|---------|------|
| Sentence length | ≤ 20 words average |
| Paragraph length | ≤ 3 sentences (except FAQ answers) |
| Reading level | Grade 8 or below |
| Contractions | Allowed ("you'll," "we're") |
| Exclamation marks | Max 1 per page (ideally 0) |
| Emoji | Not in copy; icons only |
| Numbers | Use digits (1, 2, 3), not words |
| Currency | Only if pricing shown; use `$` + amount |

### 3.2 Terminology Standard

| Use | Avoid |
|-----|-------|
| landing page | splash page, microsite |
| early access | beta access, sneak peek |
| waitlist | queue, list |
| sign up | register, enroll |
| email address | e-mail, mail |
| free | gratis, complimentary |
| fast | speedy, rapid, lightning |

### 3.3 Capitalization

- **Sentence case** for all headings, buttons, and labels.
- **Title Case** only for the document `<title>` and proper nouns.
- Product name: **Product** (replace with real name; keep consistent everywhere).

### 3.4 Punctuation

- No terminal periods on buttons, labels, or H1/H2 headings.
- Periods required in body paragraphs and FAQ answers.
- Oxford comma: **yes** ("fast, focused, and free").
- Em dashes: use `—` with spaces.

---

## 4. Section-by-Section Content

Each section below specifies: purpose, required copy, character limits, and an approved example.

---

### 4.1 Navbar

**Purpose:** Quick navigation + persistent CTA.

| Element | Copy Rule | Limit | Example |
|---------|-----------|-------|---------|
| Logo text | Product name only | ≤ 20 chars | `Product` |
| Nav links | 2–4 anchor links | ≤ 15 chars each | `Features`, `How it works`, `FAQ` |
| CTA button | Action verb + noun | ≤ 20 chars | `Join the waitlist` |

**Rules:**
- Nav links must match section IDs exactly.
- CTA button uses same copy as hero CTA (consistency).

---

### 4.2 Hero

**Purpose:** Communicate the value proposition in under 5 seconds.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| H1 headline | Benefit-led, ≤ 10 words | ≤ 60 chars | `Launch your SaaS in days, not months` |
| Subheadline | Elaborate on H1, name the mechanism | ≤ 25 words | `Validate demand with a fast, conversion-focused landing page. Capture leads in seconds — no backend required.` |
| Primary CTA | Same action as navbar CTA | ≤ 20 chars | `Join the waitlist` |
| Hero visual | Product screenshot or abstract illustration | — | `hero-visual.webp` |

**H1 Formula (pick one):**
1. **Outcome + timeframe** — "Launch your SaaS in days, not months"
2. **Pain → relief** — "Stop guessing. Start validating."
3. **Direct promise** — "Capture waitlist leads in seconds"

**Subheadline Formula:**
> [What it does] + [How] + [Key differentiator]

Example: "Validate demand with a fast, conversion-focused landing page. Capture leads in seconds — no backend required."

**Rules:**
- H1 must not exceed 10 words.
- Subheadline must mention the mechanism (landing page, forms, or Sheets).
- CTA must be a verb phrase, not "Submit" or "Click here."

---

### 4.3 Social Proof

**Purpose:** Reduce skepticism with real evidence.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section label | Optional small heading | ≤ 30 chars | `Trusted by early-stage teams` |
| Logos | 3–6 real or representative logos | — | SVG logos |
| OR Testimonials | 1–3 short quotes | ≤ 20 words each | "We had 200 signups in week one." — Jane, Founder |

**Rules:**
- Never fabricate testimonials. If none exist, use logo strip or omit section.
- Attribute quotes: name + role (+ company if possible).
- No star ratings unless from a real platform.

---

### 4.4 Features

**Purpose:** Explain what the product/page does, in 3–4 scannable cards.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `Everything you need to launch` |
| Card count | Exactly 3 or 4 | — | — |
| Card title | Benefit or capability | ≤ 5 words | `Lightning fast` |
| Card description | One sentence, specific | ≤ 20 words | `Static-first build with Astro.` |
| Icon | One per card, consistent set | — | Lucide / Heroicons |

**Card Content Template (3 cards):**

| # | Title | Description |
|---|-------|-------------|
| 1 | Lightning fast | Static-first build ships in under one second. |
| 2 | Mobile ready | Responsive at every breakpoint, 375 px to 1440 px. |
| 3 | Lead capture | Forms wired to Google Sheets — no backend required. |

**Rules:**
- Each card answers a different objection (speed, mobile, backend).
- Descriptions are one sentence, ending with a period.
- No card repeats the CTA.

---

### 4.5 How It Works

**Purpose:** Show the 3-step process in plain language.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `How it works` |
| Step count | Exactly 3 | — | — |
| Step title | Verb phrase | ≤ 4 words | `Join the waitlist` |
| Step description | One sentence | ≤ 15 words | `Drop your email and we'll be in touch.` |

**Step Template:**

| # | Title | Description |
|---|-------|-------------|
| 1 | Join the waitlist | Drop your email and we'll be in touch. |
| 2 | Get early access | We'll send your invite before launch. |
| 3 | Start building | Log in and launch your first project. |

**Rules:**
- Steps are sequential (1 → 2 → 3), not parallel.
- Each step title starts with a verb.
- No step describes internal mechanics (keep user-facing).

---

### 4.6 Pricing

**Purpose:** Set expectation or drive waitlist signup.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `Simple, transparent pricing` |
| Tier count | 1 tier (or "waitlist" CTA) | — | — |
| Price | Use `$` + number; add `/mo` if recurring | — | `$0` or `Free` |
| CTA | Match primary CTA | ≤ 20 chars | `Join the waitlist` |

**Rules:**
- If no pricing is set, use a waitlist CTA ("Join the waitlist for early pricing").
- Never show "Contact us" as the only option on a launch page.
- No fake "was $X, now $Y" pricing.

---

### 4.7 FAQ

**Purpose:** Answer the 4–6 most common objections.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `Frequently asked questions` |
| Question count | 4–6 | — | — |
| Question | Real user question, ends with `?` | ≤ 12 words | `Do I need a developer to set this up?` |
| Answer | 1–3 sentences, direct | ≤ 40 words | `No. The form connects to Google Sheets — no code required.` |

**Recommended Questions:**

1. "What is this product?" — one-sentence product definition.
2. "When will it launch?" — specific timeline (e.g., "Q1 2026").
3. "Do I need a developer to set this up?" — "No. The form connects to Google Sheets."
4. "Is my data safe?" — "Yes. Leads are stored in a private Google Sheet."
5. "How much will it cost?" — "Early-access members get pricing at launch."
6. "How do I get support?" — contact email or form.

**Rules:**
- Questions must be phrased as real users ask them.
- Answers must be definitive — never "maybe" or "it depends" without a fallback.
- Accordion behavior: first item open by default (optional).

---

### 4.8 Lead Form

**Purpose:** Capture name, email, company, and message.

See Section 5 (Form Copy & Microcopy) for full field-level detail.

---

### 4.9 Footer

**Purpose:** Provide contact, links, and legal closure.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Copyright | Year + product name | — | `© 2026 Product. All rights reserved.` |
| Contact | Email address | — | `hello@product.example.com` |
| Links | Privacy, Terms, Contact | ≤ 20 chars each | `Privacy` |
| Social | Optional icon links | — | Twitter, LinkedIn |

**Rules:**
- Copyright year must be current (update annually or use dynamic year).
- Contact email must be a real, monitored inbox.
- No dead links — remove if page doesn't exist.

---

## 5. Form Copy & Microcopy

### 5.1 Form Header

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Form H2 | Action-oriented | ≤ 30 chars | `Get early access` |
| Form subtext | Optional reassurance | ≤ 25 words | `Join the waitlist. No spam, ever.` |

### 5.2 Field Labels & Placeholders

| Field | Label | Placeholder | Required |
|-------|-------|-------------|----------|
| name | `Your name` | `Jane Doe` | ✅ |
| email | `Work email` | `you@company.com` | ✅ |
| company | `Company` (optional) | `Acme Inc.` | ❌ |
| message | `What are you building?` (optional) | `We're building a…` | ❌ |

**Rules:**
- Labels are always visible (never placeholder-only).
- Placeholders show a realistic example, not instructions.
- "Work email" signals B2B intent (not "Email address").
- Optional fields marked with `(optional)` in the label.

### 5.3 Helper Text

| Field | Helper text | When to show |
|-------|-------------|--------------|
| email | `We'll only use this to send your early-access invite.` | Below email field, always |
| message | `Optional. Helps us tailor your invite.` | Below textarea |

### 5.4 Submit Button

| Rule | Example |
|------|---------|
| Action verb, outcome-focused | `Request access` |
| Do not use | `Submit`, `Send`, `Go`, `Click here` |
| Character limit | ≤ 20 chars |

**Alternative CTAs:**
- `Join the waitlist`
- `Get early access`
- `Request an invite`

Pick **one** and use it consistently across navbar, hero, and form.

### 5.5 Privacy Microcopy

Required below the submit button:

> `We'll never share your email. Unsubscribe anytime.`

Rules:
- Must be visible before submission (not behind a link).
- Links to Privacy page if one exists; otherwise plain text.

### 5.6 Validation Messages

| Field | Error message |
|-------|---------------|
| name (empty) | `Please enter your name.` |
| name (too short) | `Name must be at least 2 characters.` |
| email (empty) | `Please enter your email.` |
| email (invalid) | `Please enter a valid email address.` |
| company (too long) | `Company name must be under 120 characters.` |
| message (too long) | `Message must be under 1000 characters.` |

**Rules:**
- Error messages appear inline, next to the field.
- Use "Please…" opener for consistency.
- Never expose internal error codes to users.

---

## 6. System Messages & States

### 6.1 Form States

| State | Message | Duration |
|-------|---------|----------|
| Idle | (no message) | — |
| Submitting | `Submitting…` | Until response |
| Success | `Thanks! We'll be in touch soon.` | Persistent |
| Error (network) | `Something went wrong. Please try again.` | Persistent |
| Error (server) | `Submission failed. Please try again later.` | Persistent |

**Rules:**
- Success message replaces the form (or shows above it) — never both.
- `aria-live="polite"` on the status container.
- No emoji in system messages.
- Success copy must set expectations ("We'll be in touch soon" — not "You're in!").

### 6.2 Empty States

| Component | Message |
|-----------|---------|
| No testimonials | (omit section) |
| No logos | (omit section) |
| No FAQ | (omit section) |

**Rule:** Never show an empty container. Omit the section entirely.

### 6.3 Loading States

| Element | Copy |
|---------|------|
| Form submit (disabled) | `Submitting…` |
| Page (Astro static) | (no loading state needed) |

### 6.4 Error Page (404)

| Element | Copy |
|---------|------|
| Heading | `Page not found` |
| Body | `The page you're looking for doesn't exist. Head back to the homepage.` |
| CTA | `Back to home` |

---

## 7. SEO & Metadata Copy

### 7.1 Page `<title>`

| Rule | Value |
|------|-------|
| Length | ≤ 60 chars |
| Format | `[Product] — [Value prop]` |
| Example | `Product — Validate your SaaS idea` |

### 7.2 Meta Description

| Rule | Value |
|------|-------|
| Length | 120–160 chars |
| Must include | Value prop + CTA |
| Example | `A fast, conversion-focused landing page for SaaS product launches. Capture early-access leads in seconds — no backend required.` |

### 7.3 Open Graph

| Tag | Content |
|-----|---------|
| `og:title` | Same as `<title>` |
| `og:description` | Same as meta description |
| `og:image` | `/images/og-image.png` (1200×630) |
| `og:type` | `website` |
| `og:url` | Canonical URL |

### 7.4 Twitter Card

| Tag | Content |
|-----|---------|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Same as `<title>` |
| `twitter:description` | Same as meta description |
| `twitter:image` | Same as `og:image` |

### 7.5 Image Alt Text

| Image | Alt text |
|-------|----------|
| Hero visual | `Product dashboard showing a project board with tasks` |
| Feature icons | (decorative — use `alt=""`) |
| Logo strip | `[Company name] logo` |
| OG image | (no alt needed — used by crawlers) |

**Rules:**
- Alt text describes the *content*, not "image of…".
- Decorative icons use `alt=""` + `aria-hidden="true"`.
- Every content image has descriptive alt text.

---

## 8. Accessibility Copy Rules

| Rule | Why |
|------|-----|
| Labels always visible | Screen readers + cognitive load |
| Error messages inline | Announced via `aria-describedby` |
| `aria-live="polite"` on status | Announces success/failure |
| Link text is descriptive | "Join the waitlist" not "Click here" |
| No color-only meaning | Combine color + text ("Error: …") |
| Sentence case | Easier to scan |
| No all-caps blocks | Harder to read |
| Reading level ≤ grade 8 | Broader accessibility |

### Link Text Rules

| ✅ Good | ❌ Bad |
|---------|--------|
| `Join the waitlist` | `Click here` |
| `Read the privacy policy` | `Learn more` |
| `Contact support` | `Here` |

---

## 9. Content File Locations

| Content Type | File | Editable by |
|--------------|------|-------------|
| Page copy (sections) | `src/components/*.astro` | Developer |
| Form labels & messages | `src/components/LeadForm.astro`, `src/scripts/form.ts` | Developer |
| SEO metadata | `src/layouts/BaseLayout.astro` | Developer |
| FAQ items | `src/components/FAQ.astro` (data array) | Developer |
| Feature cards | `src/components/Features.astro` (data array) | Developer |
| Site config | `astro.config.mjs` (`site` field) | Developer |
| Env vars | `.env` (not committed) | DevOps |

**Rule:** All copy lives in one of these files. No hardcoded strings elsewhere.

### Optional: Content Collections

For easier copy editing, move FAQ / features into Markdown:

```
src/content/
├── features/
│   ├── lightning-fast.md
│   ├── mobile-ready.md
│   └── lead-capture.md
└── faq/
    ├── what-is-this.md
    └── when-launch.md
```

Each `.md` has frontmatter (`title`, `order`, `icon`) + body as description.

---

## 10. Writing Checklist

Run this before shipping any copy change:

```
[ ] H1 ≤ 10 words and leads with a benefit
[ ] Subheadline names the mechanism (landing page / forms / Sheets)
[ ] CTA uses one verb phrase, consistent across page
[ ] Every section has one clear job
[ ] Feature cards answer distinct objections
[ ] FAQ answers are definitive, not "maybe"
[ ] All form labels are visible
[ ] All error messages are specific and inline
[ ] Success message sets expectations
[ ] No banned hype words
[ ] Reading level ≤ grade 8
[ ] Meta description is 120–160 chars
[ ] Every content image has alt text
[ ] Links are descriptive (not "click here")
[ ] No lorem ipsum anywhere
[ ] No placeholder copy ("Coming soon", "TBD") unless intentional
[ ] Copyright year is current
[ ] Contact email is real and monitored
```

---

## 11. Do / Don't Examples

### H1 Headline

| ✅ Do | ❌ Don't |
|-------|----------|
| `Launch your SaaS in days, not months` | `Revolutionary platform for next-gen synergy` |
| `Capture waitlist leads in seconds` | `Submit` |

### Subheadline

| ✅ Do | ❌ Don't |
|-------|----------|
| `Validate demand with a fast, conversion-focused landing page.` | `Our cutting-edge solution leverages best-in-class paradigms.` |

### CTA

| ✅ Do | ❌ Don't |
|-------|----------|
| `Join the waitlist` | `Click here` |
| `Get early access` | `Submit` |
| `Request an invite` | `Go` |

### Feature Card

| ✅ Do | ❌ Don't |
|-------|----------|
| `Lightning fast` / `Static-first build ships in under one second.` | `Blazing speed` / `We use the latest tech.` |

### Form Label

| ✅ Do | ❌ Don't |
|-------|----------|
| `Work email` | `E-mail Address *` |
| `Company (optional)` | `Company Name (if applicable)` |

### Success Message

| ✅ Do | ❌ Don't |
|-------|----------|
| `Thanks! We'll be in touch soon.` | `Success!!!` |
| `You're on the list. Invite coming soon.` | `Form submitted.` |

### Error Message

| ✅ Do | ❌ Don't |
|-------|----------|
| `Please enter a valid email address.` | `Error 422` |
| `Something went wrong. Please try again.` | `Failed.` |

### FAQ Answer

| ✅ Do | ❌ Don't |
|-------|----------|
| `No. The form connects to Google Sheets — no code required.` | `It depends on your use case.` |

### Meta Description

| ✅ Do | ❌ Don't |
|-------|----------|
| `A fast, conversion-focused landing page for SaaS launches. Capture leads in seconds — no backend.` | `Welcome to our website. Learn more about us.` |

---

## 12. Content Governance

### 12.1 Roles

| Role | Responsibility |
|------|----------------|
| Copywriter | Drafts copy per this guide |
| Developer | Implements copy in components |
| Reviewer | Checks against checklist (Section 10) |
| Founder / client | Approves H1, CTA, and offer |

### 12.2 Change Process

1. **Draft** copy change in a branch (`copy/hero-headline`).
2. **Review** against Section 10 checklist.
3. **Approve** by founder (for H1/CTA/offer) or reviewer (for everything else).
4. **Merge** and deploy.
5. **Log** the change in `CHANGELOG.md` under `## Copy`.

### 12.3 Versioning

| Change type | Version bump |
|-------------|--------------|
| H1 / CTA / offer change | Minor (1.x.0) |
| New section added | Minor (1.x.0) |
| Typo fix / microcopy | Patch (1.0.x) |
| Full rewrite | Major (x.0.0) |

### 12.4 Banned Words List

Keep this list in PR reviews. Reject any copy containing:

```
revolutionary, game-changing, cutting-edge, disruptive,
synergy, leverage, paradigm, best-in-class, world-class,
next-gen, innovative, seamless, robust, scalable,
empower, unlock, supercharge, transform, elevate
```

**Replace with:** specific, measurable, user-facing benefits.

---

## Appendix A: Full Copy Template (Copy-Paste Ready)

Use this as the canonical draft for a new landing page. Replace bracketed values.

```
--- NAVBAR ---
Logo: [Product]
Links: Features | How it works | FAQ
CTA: Join the waitlist

--- HERO ---
H1: Launch your SaaS in days, not months
Sub: Validate demand with a fast, conversion-focused landing page.
     Capture leads in seconds — no backend required.
CTA: Join the waitlist

--- SOCIAL PROOF ---
Label: Trusted by early-stage teams
Logos: [Logo 1] [Logo 2] [Logo 3] [Logo 4]

--- FEATURES ---
Heading: Everything you need to launch
1. Lightning fast — Static-first build ships in under one second.
2. Mobile ready — Responsive at every breakpoint, 375 px to 1440 px.
3. Lead capture — Forms wired to Google Sheets — no backend required.

--- HOW IT WORKS ---
Heading: How it works
1. Join the waitlist — Drop your email and we'll be in touch.
2. Get early access — We'll send your invite before launch.
3. Start building — Log in and launch your first project.

--- PRICING ---
Heading: Simple, transparent pricing
Tier: Free during early access
CTA: Join the waitlist

--- FAQ ---
1. What is this product? — [One-sentence definition.]
2. When will it launch? — [Specific timeline, e.g., Q1 2026.]
3. Do I need a developer? — No. The form connects to Google Sheets.
4. Is my data safe? — Yes. Leads are stored in a private Google Sheet.
5. How much will it cost? — Early-access members get pricing at launch.
6. How do I get support? — Email hello@product.example.com.

--- LEAD FORM ---
H2: Get early access
Sub: Join the waitlist. No spam, ever.
Name: Your name (Jane Doe)
Email: Work email (you@company.com)
Company: Company (optional) (Acme Inc.)
Message: What are you building? (optional) (We're building a…)
Button: Request access
Privacy: We'll never share your email. Unsubscribe anytime.
Success: Thanks! We'll be in touch soon.

--- FOOTER ---
© 2026 [Product]. All rights reserved.
hello@product.example.com
Privacy | Terms | Contact

--- SEO ---
Title: [Product] — Validate your SaaS idea
Description: A fast, conversion-focused landing page for SaaS product launches.
             Capture early-access leads in seconds — no backend required.
OG Image: /images/og-image.png
```

---

## Appendix B: Banned Words Quick Reference

| Banned | Replace with |
|--------|--------------|
| revolutionary | new / faster |
| game-changing | [specific outcome] |
| cutting-edge | modern / current |
| seamless | [describe the actual flow] |
| robust | reliable |
| scalable | grows with you |
| empower | help / let |
| unlock | get / access |
| supercharge | speed up |
| transform | change |
| leverage | use |
| best-in-class | [specific benchmark] |

---

## Appendix C: Character Limit Quick Reference

| Element | Max chars |
|---------|-----------|
| `<title>` | 60 |
| Meta description | 160 |
| H1 | 60 (≤ 10 words) |
| Subheadline | 150 (≤ 25 words) |
| Feature title | 30 (≤ 5 words) |
| Feature description | 100 (≤ 20 words) |
| CTA button | 20 |
| Form label | 30 |
| Error message | 60 |
| Success message | 60 |
| Testimonial | 140 |
| FAQ question | 80 |
| FAQ answer | 300 |
| Alt text | 125 |

---
