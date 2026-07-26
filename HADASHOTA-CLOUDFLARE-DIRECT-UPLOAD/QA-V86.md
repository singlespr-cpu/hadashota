# כותרת פלוס V86 — Root Load Fix

## Root cause fixed
V77 introduced six client shards:
- sites-1 / sites-2 / sites-3
- telegram-1 / telegram-2 / telegram-3

But the Worker still normalized every shard except exact "telegram" to "sites".
Therefore all six browser requests were effectively collecting the full sites
set, including the three Telegram requests.

V86 accepts all six real shard names end-to-end.

## Performance safeguards
- Correct source counts: sites 8/8/8, Telegram 7/7/7.
- Worker collection concurrency reduced to 4 per shard.
- Retry budget reduced to 2 per shard.
- Slow origin timeouts reduced to 2.2–2.8 sec.
- Browser API timeout reduced from 45 sec to 12 sec.
- First usable shard still renders progressively immediately.
- New local-cache namespace prevents broken V85 shard snapshots being reused.
- Shard launch stagger reduced to 45 ms.

## Preserved
- V84 factual headlines
- Copyright-safe media
- Smart Importance
- Always Ready behavior
- mobile news-first rail
- promo/admin
