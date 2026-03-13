# Adding New Resume Templates

## Quick Steps

1. Place your new `.js` template file in `public/templates/designs/`
2. Run `npm run generate:templates`
3. Add the template entry to the `HARDCODED_CATALOG` array in `src/utils/templateCatalog.ts`
4. Deploy with `npm run deploy:frontend`

## Detailed Workflow

### 1. Create the template file

Save your Web Component `.js` file to:

```
public/templates/designs/gqr-resume-{name}.js
```

The file must follow the existing pattern: an IIFE that defines an `HTMLElement` subclass and registers it via `customElements.define('gqr-resume-{name}', ...)`.

Include a header comment with the template name for the manifest generator to pick up:

```js
/**
 * name: gqr-resume-{name}
 * description: "Short description of the template"
 */
```

### 2. Generate thumbnails and manifest

```bash
npm run generate:templates
```

This runs two scripts in sequence:

- `generate:thumbnails` — Uses Puppeteer to render each template with sample data, takes a screenshot, and saves it as a WebP image in `public/templates/thumbnails/`
- `generate:manifest` — Scans `public/templates/designs/` and generates `public/templates/manifest.json` with all template metadata

To regenerate a single template's thumbnail:

```bash
npm run generate:thumbnails -- {name}
```

For example, `npm run generate:thumbnails -- oak-v1` will only regenerate thumbnails for templates whose ID contains `oak-v1`.

### 3. Update the hardcoded catalog

Open `src/utils/templateCatalog.ts` and add your template to the `HARDCODED_CATALOG` array at the bottom:

```ts
{ id: 'gqr-resume-{name}', name: 'Display Name', category: 'free' },
```

This hardcoded list is the synchronous fallback used while `manifest.json` is loading. The manifest is the primary source at runtime.

### 4. Deploy

```bash
npm run deploy:frontend
```

This builds the app with a fresh `VITE_TEMPLATE_VERSION` timestamp, syncs everything to S3, and invalidates the CloudFront cache.

## How Template Loading Works

- **Browsing**: Template selection pages show static `.webp` thumbnail images. No template JS is downloaded for the grid.
- **Preview/Use**: When a user clicks on a template to preview or use it, only that single template's `.js` file is fetched on demand.
- **Caching**: Templates and thumbnails are served through CloudFront with a 1-year cache TTL. Cache is busted per-deploy via the `VITE_TEMPLATE_VERSION` query parameter (set automatically during `build:prod`).
- **Manifest**: At runtime, the app fetches `/templates/manifest.json` to get the full template list. If the fetch fails, it falls back to the hardcoded catalog in `templateCatalog.ts`.

## File Locations

| What | Path |
|---|---|
| Template JS files | `public/templates/designs/gqr-resume-*.js` |
| Thumbnail images | `public/templates/thumbnails/gqr-resume-*.webp` |
| Manifest | `public/templates/manifest.json` |
| Catalog source | `src/utils/templateCatalog.ts` |
| Thumbnail generator | `scripts/generate-thumbnails.mjs` |
| Manifest generator | `scripts/generate-manifest.mjs` |
