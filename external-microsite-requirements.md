# Keele External AI-Maintained Microsite Requirements

A shared baseline for **fully standalone microsites built and maintained by external AI tooling**
(e.g. Codex, Claude) that live in their own directory on the Keele server but have **no connection
to the main website** beyond sharing the server.

> **Scope — read this first.** This document is **only** for self-contained microsites that are
> developed outside the CMS and share nothing with the main site except the OneTrust, GTM/analytics,
> and branding awareness described here.
>
> It is **NOT** for internal satellite sites such as **Keele Innovation District** or **Events &
> Conferencing**. Those are tightly integrated with the T4 CMS and the k-core templates, styles, and
> build — they inherit the main site's assets and conventions and must follow the repo's normal T4 /
> satellite / scope-leakage rules instead. Do not apply this file to them.

## How to use this file

- Use this only for the external AI-maintained, standalone microsites described in **Scope** above.
- Copy this file into the root of each new microsite repo/project (keep the name, e.g. `microsite-requirements.md`, or rename to `REQUIREMENTS.md`).
- Treat it as the acceptance checklist. A site is "done" when every **MUST** item is satisfied and the checklist at the bottom passes.
- These sites are self-contained: they do **not** inherit the main site's CSS/JS, navigation, or T4 build. Everything below must be built into the microsite itself.
- Where you see `TODO`, replace with the value for that specific site.

---

## 1. Cookie consent — OneTrust (MUST)

Every microsite must load the Keele OneTrust consent solution, exactly as the main site does.

Place this in the `<head>`, as early as practical (before other third-party tags):

```html
<!-- OneTrust Cookies Consent Notice start -->
<!-- Note: autoblocking is not on; OneTrustGroupsUpdated is pushed to dataLayer for GTM -->
<script
  src="https://cdn-ukwest.onetrust.com/scripttemplates/otSDKStub.js"
  type="text/javascript"
  charset="UTF-8"
  data-domain-script="1ccdea98-8961-4ffc-91e0-ae57e6d8c0e3"></script>
<script type="text/javascript">
function OptanonWrapper() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'OneTrustGroupsUpdated' });
}
</script>
<!-- OneTrust Cookies Consent Notice end -->
```

Rules:

- **Do not** load analytics, tracking, marketing, or third-party embeds (GTM, GA4, YouTube, maps, social widgets, fonts-from-CDN, etc.) before consent. Gate non-essential tags behind the appropriate OneTrust category so they only fire after the user consents.
- Confirm the `data-domain-script` ID above is correct for the domain the microsite is served from. The ID shown is the Keele production script; if the microsite is on a different host/subdomain, check with the web team that the same ID and domain config apply.
- Provide a way for users to reopen cookie settings (e.g. a "Cookie settings" link in the footer) using the OneTrust API:
  ```html
  <button type="button" onclick="OneTrust.ToggleInfoDisplay()">Cookie settings</button>
  ```
- For **local development only**, the OneTrust banner can be suppressed to avoid a localhost popup, but it must be present and working on staging and live. Never ship the site with OneTrust removed.

---

## 2. Accessibility (MUST — WCAG 2.2 AA)

Every microsite must meet **WCAG 2.2 AA**. Accessibility is part of the build, not a follow-up.

Non-negotiables:

- **Colour contrast**: text and meaningful UI meet AA contrast (4.5:1 normal text, 3:1 large text/UI components/graphics). Check every state: default, hover, focus, disabled, and text over images/gradients.
- **Keyboard**: everything operable by keyboard alone, in a logical order, with **no keyboard traps**. Visible focus states on all interactive elements (do not remove focus outlines without an equally visible replacement).
- **Semantics & landmarks**: correct heading order (single `<h1>`, no skipped levels), landmark regions (`header`, `nav`, `main`, `footer`), and a "skip to main content" link.
- **Images & media**: meaningful images have descriptive `alt`; decorative images use `alt=""`. Video/audio has captions/transcripts. No auto-playing audio.
- **Forms**: every control has an associated `<label>`; errors are announced and described in text (not colour alone).
- **Motion**: honour `prefers-reduced-motion`; no content that flashes more than 3 times/second.
- **Language & titles**: `<html lang="en">`, a unique, descriptive `<title>` per page.
- **Zoom/reflow**: usable at 200% zoom and 320px width without loss of content or horizontal scrolling.

### Testing with Lighthouse in the agent (preferred)

Run automated checks locally / in the agent before handing over. Automated tools catch roughly a third of issues, so combine with manual keyboard + screen-reader checks.

```bash
# One-off report (HTML + JSON), accessibility category
npx lighthouse "http://localhost:PORT" \
  --only-categories=accessibility \
  --output=html --output=json \
  --output-path=./reports/lighthouse-a11y \
  --chrome-flags="--headless=new"
```

- Target: **Lighthouse Accessibility score of 100** (a green score is a floor, not proof — still do the manual checks above).
- Also run `--only-categories=accessibility,performance,best-practices,seo` and keep the report in `./reports/` for handover.
- Optional deeper coverage: `axe` (`@axe-core/cli`) or `pa11y` for rules Lighthouse doesn't cover.
- Manual pass every site needs: tab through the whole page, test with a screen reader (VoiceOver on macOS), and verify contrast on any text-over-image.

---

## 3. Keele branding (be aware of — not prescriptive)

Be aware of Keele's core brand guidelines. A microsite may have its own look and use its own colours where the design calls for it — this section is **reference and things to check/ask**, not a rulebook. When in doubt, confirm current brand values with the brand/web team.

**Core colours** — for reference (these are the main site values; a microsite is free to differ):

| Token         | Hex       | Typical use |
|---------------|-----------|-------------|
| Keele purple  | `#271E3D` | Primary brand colour — headings, key UI, primary buttons |
| Deep blue     | `#174872` | Secondary / dark accent |
| Mid blue      | `#005D8F` | Tertiary — links, accents |
| Charcoal      | `#2c2c2b` | Body text and headings on light backgrounds |
| Light grey    | `#f1f1f1` | Section backgrounds |
| Yellow        | `#edce28` | Highlight/accent |

> Whatever palette you use (Keele's or the microsite's own), the AA contrast requirement in §2 still applies. Always verify the exact foreground/background pair.

**Typography** (check / ask — not a necessity):

- The main site uses **Montserrat** (weights 400/700, fallback `Arial, Helvetica, sans-serif`) and a serif stack `Palatino, 'Palatino Linotype', 'Palatino LT STD', 'Book Antiqua', Georgia, serif`.
- Prefer keeping the main fonts for consistency, but a microsite may use different fonts if the design calls for it — flag it as a decision to confirm rather than a blocker.
- If you use custom/web fonts, self-host them (avoid Google Fonts CDN for privacy/consent and performance) and use `font-display: swap`.

**Other brand essentials**:

- If using the official Keele logo, use correct clear space and colourways, link it to the relevant Keele destination, and do not recolour or distort it.
- Editorial style: **UK English**, Keele sentence-case for headings and buttons.
- Include a favicon and appropriate `apple-touch-icon`.
- Tone: clear, warm, plain language.

---

## 4. Metadata & page titles (MUST — no T4 to supply these)

These sites are hand-built without T4, so **every page** must set its own metadata. Do not ship a page that reuses another page's title/description or leaves defaults in place.

Each page MUST have:

- `<html lang="en">` and correct `<meta charset="utf-8">` + responsive viewport.
- A **unique, descriptive `<title>`** (page-specific, ending with a consistent suffix, e.g. `… | Keele University`).
- A **unique `<meta name="description">`** relevant to that page's content.
- A canonical URL: `<link rel="canonical" href="…">`.
- Open Graph + Twitter card tags (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`) so shared links preview correctly.
- A deliberate `robots` directive — index public pages, `noindex` holding/private pages.

Minimal per-page `<head>` template:

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TODO page title | Keele University</title>
<meta name="author" content="Keele University">
<meta name="description" content="TODO unique page description.">
<meta name="theme-color" content="#005d8f">
<link rel="canonical" href="TODO absolute URL of this page">
<meta property="og:title" content="TODO page title">
<meta property="og:description" content="TODO unique page description.">
<meta property="og:image" content="TODO absolute URL to share image">
<meta property="og:url" content="TODO absolute URL of this page">
<meta property="og:site_name" content="Keele University">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@KeeleUniversity">
```

Also provide a favicon set (`favicon`, `apple-touch-icon`), and a `sitemap.xml` where appropriate.

**Do not** include a `robots.txt` in standalone microsites that live outside the main CMS repo. Crawling is governed by the root `keele.ac.uk/robots.txt`. Set indexing intent per page with `<meta name="robots">` instead. A subdirectory-level `robots.txt` can override or conflict with the main site policy.

---

## 5. Tag management & analytics — Google Tag Manager (MUST)

Keele delivers Google Analytics (and other tags) **through Google Tag Manager**, not via a standalone `gtag.js`. Each microsite should use the **same GTM container** so analytics, consent, and tag governance stay consistent — GA is configured inside GTM, so you do not add a separate GA snippet or set up a new account.

**Verify before you ship** — confirm with the web team that:
- a) the GTM container ID `GTM-WH5D65B` and OneTrust `data-domain-script` ID above are still current and correct for the microsite's domain; **and**
- b) the existing GTM/GA account can be reused for microsites (i.e. **no separate GTM container or GA property needs setting up**).

Add the GTM head snippet as high as practical in `<head>` (after the OneTrust script from §1, so consent state is available):

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WH5D65B');</script>
<!-- End Google Tag Manager -->
```

Add the GTM `noscript` fallback immediately after the opening `<body>` tag:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WH5D65B"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

Consent behaviour:

- OneTrust is not in autoblocking mode; the `OptanonWrapper` in §1 pushes `OneTrustGroupsUpdated` to the `dataLayer` so GTM can gate tags on consent. Analytics/marketing tags in GTM must be set to fire only for the appropriate consent group — nothing that requires consent should fire before the user accepts.
- Do not add a separate `gtag.js`/GA4 snippet on the page; let GTM own it.
- No PII in dataLayer pushes or event params.

---

## 6. Local development — BrowserSync + `npm run dev` (MUST)

Each project must stand up on its own so anyone can clone it and start working immediately, with live reload.

- Include a `package.json` with **BrowserSync** as a dev dependency and an `npm run dev` script that serves the site and live-reloads on changes.
- `npm install` then `npm run dev` should be all that's needed to get a working local server — no global installs or hidden steps.
- Keep it self-contained: this does not use the main site's Laravel Mix build. A lightweight BrowserSync (optionally with a Sass/asset watch) is fine.
- Document the command in the project README.

Minimal example:

```json
{
  "scripts": {
    "dev": "browser-sync start --server --files \"**/*.html, **/*.css, **/*.js\" --no-notify"
  },
  "devDependencies": {
    "browser-sync": "^3.0.0"
  }
}
```

- If the site compiles Sass/JS, run the watcher and BrowserSync together (e.g. via `npm-run-all`/`concurrently`) behind the same `npm run dev`.
- Remember OneTrust is suppressed on localhost (see §1) — verify consent behaviour on staging/live, not just in `npm run dev`.

---

## 7. Recommended baseline (SHOULD)

Sensible defaults for a standalone site on Keele infrastructure:

- **Responsive**: mobile-first, works from 320px up; test common breakpoints and landscape.
- **Performance**: aim for Lighthouse Performance ≥ 90. Optimise/compress images (prefer AVIF/WebP with fallbacks), lazy-load below-the-fold media, minify CSS/JS, avoid render-blocking third-party scripts.
- **Metadata**: see §4 — every page needs its own unique title/description and social tags.
- **Paths & hosting**: use **root-relative or relative** asset paths appropriate to the microsite's own directory. Do not hard-code `https://www.keele.ac.uk/...` for the microsite's own assets. Confirm the base directory/URL the site will be deployed to and test that all links/assets resolve there.
- **Privacy/legal footer**: link to Keele's privacy notice, cookie policy, accessibility statement, and provide a "Cookie settings" (OneTrust) link.
- **Accessibility statement**: publish or link one (public-sector bodies are expected to).
- **HTTPS & security**: serve over HTTPS; set sensible security headers where you control them (CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy`). If using a CSP, allow the OneTrust, Google Tag Manager, and Google Analytics domains.
- **Analytics**: only via the shared GTM container in §5 — no standalone `gtag.js` or trackers that bypass OneTrust/GTM.
- **Progressive enhancement**: core content and navigation should work without JS where feasible.
- **No dead ends**: 404 page and clear navigation back to relevant Keele content.
- **Browser support**: modern evergreen browsers. IE11 is not supported — do not add IE11 fallbacks.

---

## Done checklist

- [ ] `npm install && npm run dev` starts BrowserSync with live reload; documented in the README.
- [ ] OneTrust script present in `<head>` with the correct `data-domain-script` for the domain.
- [ ] Non-essential/third-party tags are consent-gated (nothing tracks before consent).
- [ ] "Cookie settings" link works and reopens the OneTrust panel.
- [ ] Lighthouse Accessibility = 100; report saved in `./reports/`.
- [ ] Manual keyboard + screen-reader pass done; visible focus everywhere.
- [ ] Contrast verified for every text/UI pair, including text over images and all states.
- [ ] GTM container (`GTM-WH5D65B`) added: head snippet + `noscript` iframe after `<body>`; no standalone GA snippet.
- [ ] Confirmed with the web team that the GTM/OneTrust IDs are current and reusable — no separate container/GA property needed.
- [ ] Consent-gated: analytics/marketing tags do not fire before OneTrust consent (`OneTrustGroupsUpdated` wired).
- [ ] Every page has a unique `<title>`, unique meta description, canonical, and OG/Twitter tags.
- [ ] Brand fonts/colours checked with the team (kept, or a deliberate microsite choice); logo used correctly if present.
- [ ] UK English, sentence-case, favicon, `apple-touch-icon`.
- [ ] Responsive down to 320px and usable at 200% zoom.
- [ ] Correct asset paths for the deploy directory; served over HTTPS.
- [ ] Footer links: privacy, cookie policy, accessibility statement, cookie settings.
