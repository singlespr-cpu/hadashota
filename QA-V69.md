# QA — חדשותא V69

- JavaScript syntax: `app.js`, `_worker.js`, `sw.js` — PASS
- Source registry: 45 unique sources — PASS
  - sites/official: 24
  - Telegram: 21
- Runtime mock `/api/news?shard=sites&force=1`: all 24 configured site sources attempted before retry — PASS
- Runtime mock `/api/news?shard=telegram&force=1`: all 21 Telegram sources attempted before retry — PASS
- Both mocked shards returned usable payloads — PASS
- `/api/health`: V69 + 45/24/21 metadata — PASS
- Deployment safety: `wrangler.jsonc` intentionally absent — PASS
- Version marker: `גרסה V69` + API health marker — PASS
- Old V67/V68 runtime version strings removed — PASS

Important deployment note: `wrangler.jsonc` from V68 must be manually deleted from the GitHub folder because uploading V69 will not delete an old file that is absent from the new ZIP.
