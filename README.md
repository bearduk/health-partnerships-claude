# Keele Health Partners microsite

Standalone static microsite for Keele Health Partners. Single-page site (`index.html`) with no build step.

**Production URL:** `https://www.keele.ac.uk/health-partners/`

## Local development

```bash
npm install
npm run dev
```

BrowserSync serves the site (default `http://localhost:3000`) with live reload on changes to `index.html`, `assets/`, and `sitemap.xml`.

Use `npm run dev:open` to launch your browser automatically.

OneTrust is suppressed on `localhost` — test cookie consent on staging or production.

## Deploy

```bash
./deploy.sh user@host:/path/to/webroot/health-partners/
```

`rsync` pushes static files and excludes `node_modules`, `.git`, and dev tooling.

## Production URL configuration

Update the canonical URL, Open Graph tags, and `sitemap.xml` if the deploy path changes. Search `index.html` for:

```
https://www.keele.ac.uk/health-partners/
```

## Pre-deploy checklist

- [ ] Confirm with the web team that OneTrust `data-domain-script` (`1ccdea98-8961-4ffc-91e0-ae57e6d8c0e3`) and GTM (`GTM-WH5D65B`) are current for this domain
- [ ] Verify OneTrust banner and Cookie settings work on staging
- [ ] Verify GTM tags fire only after consent (`OneTrustGroupsUpdated` in dataLayer)
- [ ] Run Lighthouse accessibility audit (target score 100)
- [ ] Confirm asset paths resolve at the deploy directory
- [ ] Do **not** deploy a `robots.txt` — crawling is governed by the main `keele.ac.uk` policy

## Content editing

See [`HANDOFF.md`](HANDOFF.md) for the content config block and outstanding content placeholders.

## Requirements

Compliance baseline: [`external-microsite-requirements.md`](external-microsite-requirements.md)
