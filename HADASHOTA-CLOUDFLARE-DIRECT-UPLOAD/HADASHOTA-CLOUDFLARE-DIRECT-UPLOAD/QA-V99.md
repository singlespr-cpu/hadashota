# V99 Feed Image Fix
- Fixed the actual V98 feed fallback bug: undefined item/displayTitle inside hydrateSafeMediaSlot.
- Every feed card now carries its own title/preview context into the image resolver.
- Feed prefers the image supplied by the original source item when available.
- Common image aliases are preserved: imageUrl, image, thumbnailUrl, thumbnail, enclosure.url.
- If a source image cannot hotlink/load, the card automatically retries contextual image search.
- If no source image exists, contextual Commons / CC0-PDM fallback is used.
- Wrong-context filtering remains for alternative images.
- Increased feed media budget/query attempts.
- No unrelated site behavior changed.
