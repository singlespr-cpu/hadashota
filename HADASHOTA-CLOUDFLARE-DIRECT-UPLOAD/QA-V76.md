# Hadashota V76 — Image relevance & original-source preference

## Policy
1. Prefer the image explicitly supplied by the original source item/page:
   RSS media/enclosure, JSON-LD image, or Telegram preview.
2. Reject obvious logos, favicons, avatars, placeholders, tracking pixels and tiny assets.
3. If the source image fails to load or is unavailable, use only licensed/open media
   that passes a strict semantic relevance gate.
4. No generic category fallback such as "Israel politics" or "security".
5. For the main story, open-media fallback requires:
   - relevance score >= 62
   - at least 2 semantic token matches
   - non-illustrative exact/specific result
6. Feed cards require score >= 54 and at least 2 matches.
7. If no safe/relevant image exists, show no photo rather than a misleading photo.

## Preserved fixes
- V73 Cloudflare root routing
- V74 fast shared-snapshot news boot
- V75 Telegram/source-list fixes
- 45 configured sources / 21 Telegram
