# Keele Health Partners microsite — production pass handoff

**Date:** 6 July 2026
**File changed:** `index.html` (single-file static site, GitHub Pages ready)

---

## What was done in this pass

**1. Branding aligned to Keele's official identity.**
The palette now uses Keele University's official "Keele blue" web colours — indigo `#271E3D`, dark blue `#174872`, and blue `#005D8F` — with heraldic gold as a warm accent, replacing the previous custom teal/orange. All colours live in one place (the `DESIGN TOKENS` block at the top of `index.html`) with Keele-named tokens (`--keele-blue`, `--keele-indigo`, `--keele-gold`, …) so the whole site can be re-themed by editing a few lines. Body text colours were nudged for stronger contrast (WCAG AA).

**2. Content is now data-driven — easy for the web team to extend.**
Partners, news, and case studies are generated from a single, heavily-commented config block (`CONTENT CONFIG · EDIT THIS BLOCK TO ADD CONTENT`, near the end of the file). To add a partner, news item, or case study, copy one line in the relevant array — the section rebuilds itself. No other code changes needed. It stays a single static file (no server, no build step, works on GitHub Pages and by double-clicking locally).

**3. New reusable sections added (only where they didn't already exist).**
- **Partner profiles** — a card grid. A partner appears here automatically once you give it a `profile`. Shows a friendly "coming soon" state while empty.
- **Case studies / success stories** — a card grid with an empty-state placeholder until stories are added.
- *(Partner logo carousel and News already existed — these were kept and wired to the new config rather than duplicated.)*

**4. Accessibility & responsiveness improvements.**
Reduced-motion users now get content shown immediately (no hidden-until-animated content), the auto-scrolling logo marquee stops and becomes scrollable, and the hero video is suppressed. Added a no-JavaScript fallback and a `<noscript>` notice, higher-contrast body text, responsive one-column layouts for the new grids, and preserved the existing skip-link, ARIA labelling and keyboard focus states. Navigation and footer updated to include the new sections.

**5. Approved content is in place.**
The About us, mission, five civic impact goals, and four research areas from Andy Cain's document are used as the live copy. Remaining placeholders are genuinely-missing content (see below), each clearly marked in the page.

---

## Content audit — what to request from Christian & Ben

Legend: ✅ present (approved) · 🟡 partial / placeholder · ❌ missing

| Item | Status | What's needed |
|---|---|---|
| **Mission statement** | ✅ | In place (hero + About us). |
| **About Us copy** | ✅ | In place, from approved document. |
| **Partnership benefits text** | 🟡 | Benefits are implied in About us (joint funding, shared facilities). **No dedicated "why partner with us / what partners gain" copy.** Request a short benefits section if wanted. |
| **Calls to action** | ✅ | "Work with us", "Get in touch", contact CTAs in place. |
| **Partner profiles** | ❌ | Section built and ready. Needs **confirmed partner names, logos, and 1–2 line descriptions**. |
| **News articles** | 🟡 | Three **placeholder** items (styled after Keele Faculty of Health news, as requested). Needs **KHP's own news items** before launch. |
| **Case studies** | ❌ | Section built (empty state showing). Needs **real success stories** (title, partner, summary, optional image/link). |
| **Testimonials** | ❌ | No testimonials content or section yet. **Decide if wanted**; if so, request 2–3 quotes with name/role/organisation. |
| **Contact wording** | 🟡 | Intro copy in place, but **email (`khp@keele.ac.uk`?) and postal/contact details are placeholders**, and the enquiry form is a design placeholder. Needs **real contact details + confirmed form destination** (Microsoft Form embed + submission workflow). |
| **Eligibility requirements** | ❌ | No content or section. Request **who can join / criteria to become a partner**. |
| **Membership information** | ❌ | No content or section. Request **how membership works, tiers/levels, how to apply, any fees/commitments**. |
| **Governance information** | ❌ | No content or section. Request **governance structure, board/steering group, decision-making, accountability**. |

### Other placeholders still needing real content before production launch
- **Team / "Our team"** — currently a single placeholder card. Needs **Christian's full name, role/title, bio, headshot, and email** (the approved document flagged this as a placeholder), plus any further team members.
- **Public partnerships** and **Training & development** — currently generic "coming soon" holding copy (these were empty `---` in the approved document). Confirm or replace with approved copy.
- **KHP logo** — the header/footer currently use a temporary "KHP" text badge. Supply the **official KHP/Keele logo** (SVG preferred).
- **Legal & compliance** — privacy policy, cookie policy, and accessibility statement are placeholder links; the cookie banner is a UI placeholder. A **real consent platform** (e.g. Cookiebot) and the actual policy pages are required before launch.
- **Partner logo images** — drop files into `assets/` and reference them in the config's `logo` field.

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
],
caseStudies: [
  { title: "Story title", partner: "Partner name", tag: "Impact",
    summary: "What happened and the outcome.", url: "…", image: "" }
]
```

Save and refresh — the Partners, Partner profiles, News and Case studies sections update automatically.
