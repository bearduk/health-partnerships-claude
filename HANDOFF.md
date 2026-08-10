# Keele Health Partners microsite — production pass handoff

**Date:** 6 July 2026 (content pass) · 6 July 2026 (compliance pass) · 10 August 2026 (Ben review content trim)
**Files:** `index.html` (single-file static site), `sitemap.xml`, `assets/`, `README.md`

---

## Technical / compliance status (6 July 2026)

The site is **technically ready for staging** per [`external-microsite-requirements.md`](external-microsite-requirements.md). Content placeholders remain (see below).

| Item | Status |
|---|---|
| OneTrust consent | ✅ Integrated with localhost suppression |
| Google Tag Manager (`GTM-WH5D65B`) | ✅ Head + noscript |
| Cookie settings control | ✅ Footer button (`OneTrust.ToggleInfoDisplay`) |
| Metadata (canonical, OG, Twitter) | ✅ |
| Favicons + share image | ✅ `assets/icons/`, `assets/images/og-share.jpg` |
| Self-hosted fonts | ✅ DM Sans / DM Serif Display in `assets/fonts/` |
| Legal footer links | ✅ Links to keele.ac.uk privacy and accessibility |
| `sitemap.xml` | ✅ |
| `robots.txt` | ✅ Removed — not used in standalone microsites |
| Lighthouse a11y | ✅ Score 100 — see `reports/lighthouse-a11y.report.html` |
| Web team ID confirmation | ⏳ Required before production go-live |

**Before production:** confirm OneTrust and GTM IDs with the web team; test consent on staging.

**Staging gate (temporary):** The site is password-protected (`health`) on staging/production until launch. `noindex, nofollow` is set. Before go-live: remove the staging gate HTML/CSS/JS from `index.html`, restore `<meta name="robots" content="index, follow">`, and run `npm run prod`.

---

## What was done in the content pass

**1. Branding aligned to Keele's official identity.**
The palette now uses Keele University's official "Keele blue" web colours — indigo `#271E3D`, dark blue `#174872`, and blue `#005D8F` — with heraldic gold as a warm accent, replacing the previous custom teal/orange. All colours live in one place (the `DESIGN TOKENS` block at the top of `index.html`) with Keele-named tokens (`--keele-blue`, `--keele-indigo`, `--keele-gold`, …) so the whole site can be re-themed by editing a few lines. Body text colours were nudged for stronger contrast (WCAG AA).

**2. Content is now data-driven — easy for the web team to extend.**
Partners and news are generated from a single, heavily-commented config block (`CONTENT CONFIG · EDIT THIS BLOCK TO ADD CONTENT`, near the end of the file). To add a partner or news item, copy one line in the relevant array — the section rebuilds itself. No other code changes needed. It stays a single static file (no server, no build step, works on GitHub Pages and by double-clicking locally).

**3. Reusable sections.**
- **Partner profiles** — a card grid. A partner appears here automatically once you give it a `profile`.
- **News** — empty-state until real items are added to the config (do not fabricate).
- **Case studies / Team** — removed from the live page until content is confirmed (Ben review, Aug 2026).

**4. Accessibility & responsiveness improvements.**
Reduced-motion users now get content shown immediately (no hidden-until-animated content), the auto-scrolling logo marquee stops and becomes scrollable, and the hero video is suppressed. Added a no-JavaScript fallback and a `<noscript>` notice, higher-contrast body text, responsive one-column layouts for the new grids, and preserved the existing skip-link, ARIA labelling and keyboard focus states. Navigation and footer updated to include the new sections.

**5. Approved content is in place.**
The About us, mission, five civic impact goals, and four research areas from Andy Cain's document are used as the live copy. Remaining placeholders are genuinely-missing content (see below), each clearly marked in the page.

---

## Content audit — what to request from Christian & Ben

Legend: ✅ present (approved) · 🟡 partial / awaiting confirmation · ❌ missing / deferred

| Item | Status | What's needed |
|---|---|---|
| **Mission statement** | ✅ | In place (hero + About us). Keele prominence strengthened in hero kicker/intro. |
| **About Us copy** | ✅ | In place, from approved document. |
| **Partnership benefits text** | ❌ | Deferred — do not add a Benefits section until the project matures. |
| **Calls to action** | ✅ | "Work with us", "Get in touch", contact CTAs in place. |
| **Partners** | 🟡 | Keele University only for now. **Confirmed partner list + logos from Christian** before adding more (do not invent). Config + marquee ready. |
| **Partner profiles** | 🟡 | Keele profile live. Other profiles when Christian confirms partners. |
| **News articles** | 🟡 | Section kept empty with placeholder state. Add real KHP items to `news` array when available — do not fabricate. |
| **Case studies** | ❌ | Section removed until real success stories exist. |
| **Testimonials** | ❌ | Deferred — do not add until the project matures. |
| **Contact wording** | 🟡 | Temporary contact: **Ben Coleman** (`b.coleman@keele.ac.uk`), Development Manager, Impact & Partnerships. Replace with **`khp@keele.ac.uk`** when available. Form removed for now. |
| **Eligibility / Membership / Governance** | ❌ | Deferred — do not add until the project matures. |

### Other items still awaiting confirmation
- **Team / "Our team"** — section removed until bios and photos are ready for launch.
- **Public partnerships** and **Training & development** — generic "coming soon" holding copy. Confirm or replace with approved copy.
- **KHP logo** — header/footer use a temporary "KHP" text badge. Supply the **official KHP logo** when ready (do not invent one).
- **Partner logo images** — drop files into `assets/partners/` and reference them in the config's `logo` field.
- **Contact form** — removed; Microsoft Form embed can return when destination is confirmed.

---

## How to add content (quick reference for the web team)

Open `index.html`, find the `CONTENT CONFIG` block near the bottom, and edit these arrays:

```js
partners: [
  { name: "Organisation name", type: "NHS Trust",
    logo: "assets/partners/example.svg",   // "" = text placeholder
    url: "https://example.org",
    profile: "One or two sentences about the partner." }  // "" = no profile card
],
news: [
  { date: "1 August 2026", tag: "Research",
    title: "Headline", excerpt: "Short summary.", url: "https://…" }
]
```

Save and refresh — the Partners, Partner profiles, and News sections update automatically. Only add confirmed partners and real news items.
