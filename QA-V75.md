# Hadashota V75 — Telegram + live sources final fix

## Telegram feed
- A story is included in the Telegram filter when ANY report in its cluster is Telegram.
- The card shown in Telegram mode is projected to an actual Telegram report:
  source name, Telegram URL, timestamp and title come from Telegram.
- The selected 1/3/24 hour window is evaluated against Telegram timestamps, not a newer site report.
- Site and official filters use the same kind-aware projection model.

## Live sources
- A shard response is preserved even when it has zero news items, so its source health list is not discarded.
- If an entire shard has no usable items, the Worker still returns all attempted sources with health status.
- A stale last-good feed can be used for items while current source-health status is overlaid.
- Sources therefore remain visible as healthy/degraded/offline instead of disappearing.

## Source inventory
- Expected total configured sources: 45
- Expected Telegram sources: 21

## Cloudflare
- V73/V74 root routing fix is preserved.
- wrangler.jsonc stays at repository root.
- Deploy command remains: npx wrangler deploy
