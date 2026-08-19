# כותרת פלוס V141

גרסת Production מלאה של כותרת פלוס, כולל עמוד **מדד ההסלמה** ב־`/escalation`.

## V141 — עיקרי השדרוג
- עיצוב שחור/דרמטי חדש למדד ההסלמה, מותאם במיוחד למובייל.
- מד עגול 0–100 עם אזורים ירוק / צהוב / כתום / אדום והנפשת radar עדינה.
- 12 משפחות סיגנלים משוקללות; מדד הפיצה מוצג כסיגנל ניסיוני בלבד וב־0% משקל.
- הרחבת מקורות רשמיים ו־OSINT: פיקוד העורף, אתר צה״ל, IAA/NOTAM, ADSB.lol, EASA JSON, CENTCOM, U.S. DoD, State Department, White House, UKMTO, U.S. MARAD, IAEA, Brent/FRED, Polymarket ועוד.
- סלוגן כותרת פלוס מוצג מתחת ללוגו גם במובייל.
- SEO מחוזק לעמוד הבית ולעמוד המדד: title/description, canonical, hreflang, Open Graph, Twitter, JSON-LD, sitemap וקישורים פנימיים.

## חשוב
המדד הוא ציון **עוצמת מתיחות** ולא הסתברות למלחמה או תחזית מודיעינית.

## Cloudflare
החבילה כוללת `wrangler.jsonc` בשורש. יש לשמור על `PUSH_HUB`, Cron של פעם בדקה והגדרות Static Assets הקיימות.

גרסה: 142.0.0
