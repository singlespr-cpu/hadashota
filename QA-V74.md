# Hadashota V74 — fast/reliable news boot

## Fixes
- Isolates Worker shared-news cache to V74 (old code was still using `v=68` cache keys).
- A cached snapshot is returned immediately and marked `servedFromCache`.
- The browser performs exactly one full-source refresh after a cache hit.
- On a cold cache, the first request already scans all configured sources; V74 no longer starts a second full scan immediately afterward.
- Local last-good cache is isolated to V74.
- Client news timeout is 45 seconds.
- Root Cloudflare SPA/static-assets configuration from V73 is preserved.

## Expected behavior
- Warm visit: news should paint quickly from shared snapshot, then refresh from all sources.
- Cold visit: one full collection occurs; no duplicate immediate 45-source collection.
- Manual refresh and scheduled refresh continue to use `force=1` and therefore attempt all sources.
