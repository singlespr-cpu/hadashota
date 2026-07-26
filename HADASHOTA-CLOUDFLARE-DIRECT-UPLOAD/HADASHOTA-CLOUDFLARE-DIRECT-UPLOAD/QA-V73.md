# Hadashota V73 Cloudflare Fix

## Deployment structure
This ZIP mirrors the repository structure expected by Cloudflare:
- `/wrangler.jsonc`
- `/HADASHOTA-CLOUDFLARE-DIRECT-UPLOAD/*`

## Cloudflare static assets fix
The root configuration uses:
- `not_found_handling: "single-page-application"`
- `run_worker_first` only for API/system routes

This means:
- `/` is served by Static Assets as `index.html` with HTTP 200
- `/index.html` remains accessible
- `/api/*` always runs through `_worker.js`
- `/sw.js`, `/robots.txt`, `/sitemap.xml` also run through the Worker

## Runtime
- API/site version: 73.0.0
- Preserves the JavaScript boot fix
- Preserves the news source set and lead-story logic from V72
