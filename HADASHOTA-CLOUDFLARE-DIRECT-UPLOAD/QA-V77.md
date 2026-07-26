# Hadashota V77 — Stable Sharded Sources

## Main stability fix
The 45 configured sources are collected through six smaller Worker requests instead of two large requests.

### Site/official sources
- sites-1: 8
- sites-2: 8
- sites-3: 8

### Telegram
- telegram-1: 7
- telegram-2: 7
- telegram-3: 7

The browser merges all six responses into the same feed.

## Benefits
- A single slow source no longer delays 20+ other sources.
- Much less work per Worker invocation.
- Lower risk of Cloudflare resource-limit errors such as 1102.
- First successful shard can render progressively while the others finish.
- Requests are staggered by 100 ms to reduce cold-start bursts.
- Cache-first boot from V74 is preserved.
- Telegram/source health fixes from V75 are preserved.
- Image relevance/original-source image preference from V76 is preserved.

## Inventory
- 45 total configured sources
- 24 site/official sources
- 21 Telegram channels

## Expected footer
- גרסה V77 · API V77
