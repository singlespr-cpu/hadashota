# V98 Feed Images

- "כל העדכונים" now uses the same richer image strategy as the lead story.
- First preference remains an original source image only when explicit reusable-license metadata approves it.
- Otherwise each feed item tries multiple person/place/entity/context queries.
- Wikimedia Commons remains first; Openverse fallback remains CC0/Public Domain only.
- Query attempts increased to 18 and media-session budget to 160.
- Negative context matching remains active, so clearly wrong images are still rejected.
- Contextual alternatives are marked as "תמונת המחשה".
- New media cache namespace avoids stale no-image results from V97.
- No other site logic changed.
