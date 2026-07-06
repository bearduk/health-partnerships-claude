# Keele Health Partners microsite

Standalone static microsite for Keele Health Partners. Single-page site (`index.html`) with no compile step.

**Production URL:** `https://www.keele.ac.uk/health-partners/`

## Local development

```bash
npm install
npm run dev
```

BrowserSync serves the site from the repo root (default `http://localhost:3000`) with live reload on changes to `index.html`, `assets/`, and `sitemap.xml`.

Use `npm run dev:open` to launch your browser automatically.

OneTrust is suppressed on `localhost` — test cookie consent on staging or production.

## Production build

```bash
npm run prod
```

Copies only deployable files into `public/`:

- `index.html`
- `sitemap.xml`
- `assets/` (fonts, icons, images, video)

Internal docs (`README.md`, `HANDOFF.md`, `external-microsite-requirements.md`, reports, etc.) are **not** included.

Preview the production folder locally:

```bash
npm run preview
```

Serves `public/` only. After editing source files, run `npm run prod` again to refresh.

## Deploy

```bash
npm run prod
npm run preview   # optional — verify before upload
./deploy.sh user@host:/path/to/webroot/health-partners/
```

`deploy.sh` rsyncs `./public/` to the server. Run `npm run prod` first or deploy will abort.

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
