# HADASHOTA V68 — QA REPORT

## Result
PASS — production package checks completed locally.

## Deployment wiring
- `wrangler.jsonc` exists.
- Worker name: `hadashota`.
- `main`: `./_worker.js`.
- Static assets binding: `ASSETS`.
- `run_worker_first: true`.
- `.assetsignore` excludes `_worker.js` from static assets while Wrangler still uses it as the Worker entry point.

## News collection
- Configured sources: 45.
- Sites/official shard: 24.
- Telegram shard: 21.
- Source IDs: 45/45 unique.
- Source URLs: 45/45 unique.
- Full-pass mock Worker integration: PASS.
- `/api/news?shard=sites&force=1`: HTTP 200 in integration harness.
- `/api/news?shard=telegram&force=1`: HTTP 200 in integration harness.
- `attemptedSources === configuredShardSources`: PASS for both shards.
- Starvation test: PASS. All sources receive a first attempt before any retry begins.
- Retry test: PASS. Up to 6 retries occur only after the full first pass.
- Auto refresh uses `loadNews(true, true)`: PASS.
- Client news timeout: 40 seconds.

## Links
- Ynet RSS candidate selection prefers `/news/article/...`: PASS.
- Walla RSS candidate selection prefers `/item/...`: PASS.

## Lead story
- One-source lead remains prohibited.
- 3+ distinct publishers retain priority.
- 2-source fallback remains gated by the one-hour observation rule.

## Version / diagnostics
- Visible footer marker: `גרסה V68`.
- Footer performs shallow `/api/health` check.
- Healthy Worker displays: `גרסה V68 · API V68`.
- Missing/non-running Worker displays: `גרסה V68 · API לא מחובר`.
- `/api/health` reports Worker version `68.0.0`.

## Static checks
- `app.js`: syntax PASS.
- `_worker.js`: syntax PASS.
- `sw.js`: syntax PASS.
- `wrangler.jsonc`: JSON PASS.
- `site.webmanifest`: JSON PASS.

## Important scope note
The automated integration test uses controlled mock publisher responses so it can prove routing, parsing flow, source coverage and retry ordering. It cannot guarantee that every third-party publisher is reachable at every future moment; the production Worker records per-source health and continues with fresh partial data when individual publishers fail.
