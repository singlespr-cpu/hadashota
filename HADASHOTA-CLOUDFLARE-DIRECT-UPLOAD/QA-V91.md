# כותרת פלוס V91 — Silent Refresh + Performance

## Silent background refresh
- Initial page entry may progressively render as before.
- 30-second automatic refresh runs silently.
- Automatic refresh does not set the manual refresh button to loading.
- Existing content remains visible/clickable throughout the refresh.
- Progressive shard rendering is disabled for background passes.
- One final render occurs only after the six shards settle.

## Main-thread responsiveness
- Background cross-source clustering is chunked and yields to the browser every 14 items.
- Taps, scrolling and links can be processed between chunks.
- Media hydration moved from queueMicrotask to requestIdleCallback/setTimeout.
- A fingerprint prevents a complete DOM rebuild when the news snapshot has not materially changed.

## Reliability
- online/pageshow/visibility refresh listeners now register globally.
  They were previously nested inside beforeinstallprompt and therefore did not
  exist in some browsers.
- Background errors never replace an already populated feed with a loading/error card.
- Retry and foreground recovery passes are silent.

## Preserved
- V90 feed advertising
- V89 important latest
- V88 self healing / cache controls
- V87 stable main story + premium ad
- V86 six-shard root fix
- factual headlines / copyright safe / Telegram / Smart Importance
