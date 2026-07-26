# Hadashota V72 QA

## Root routing recovery
- `/` is resolved internally to `/index.html` and returned as HTTP 200.
- `/index.html` is also returned as HTTP 200.
- No `Response.redirect()` remains in the HTML routing path.
- Clean information routes (`/about`, `/contact`, `/privacy`, `/copyright`, `/how-it-works`) map internally to their `.html` assets.
- Static Assets configuration is expected to remain `html_handling: "none"` in the root `wrangler.jsonc`.

## Runtime
- Preserves the V70/V71 JavaScript boot fix: lead snapshot constants are declared before state initialization.
- API/site version bumped to 72.0.0.
- Service Worker version bumped to 72.0.0.
- Asset query versions bumped to 72.0.0.
- News source definitions and news-selection logic were not intentionally changed in this recovery build.

## Expected production checks
1. `curl -I https://hadashota.singles-pr.workers.dev/` -> `200 OK`
2. `curl -I https://hadashota.singles-pr.workers.dev/index.html` -> `200 OK`
3. `/api/health` -> JSON with version `72.0.0`
4. Browser footer -> `גרסה V72 · API V72`
5. Network -> `/api/news?shard=sites...` and `/api/news?shard=telegram...`
