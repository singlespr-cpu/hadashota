# QA — חדשותא V70

- Root-cause fixed: lead snapshot constants declared before state initialization.
- app.js syntax: PASS.
- _worker.js syntax: PASS.
- sw.js syntax: PASS.
- index.html loads /app.js?v=70.0.0: PASS.
- No duplicate element IDs: PASS.
- All element IDs referenced by the top-level el map exist in index.html: PASS.
- No wrangler.jsonc included: PASS.
- Worker still defines 24 site/official sources + 21 Telegram sources: PASS.
- /api/news logic unchanged from V69 except version/cache namespace.
