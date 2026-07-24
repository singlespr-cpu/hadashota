# חדשותא — HADASHOTA FINAL V6 FULL

חבילה מלאה לפריסה בתיקיית `HADASHOTA-CLOUDFLARE-DIRECT-UPLOAD` המחוברת ל-Cloudflare Workers + Static Assets.

## מה השתנה ב-V6

- API חדשות מפוצל לשני shards: `sites` ו-`telegram`, כדי להקטין עומס ו-subrequests בכל invocation.
- Last Good Data כפול:
  - cache אחרון תקין ב-Cloudflare לכל shard.
  - fallback מקומי בדפדפן (`localStorage`) אם רענון חדש נכשל.
- כשל של מקור בודד מבודד ולא מפיל את כל ה-API.
- timeout מותאם לסוג מקור + retry מוגבל ומבוקר.
- במקרה של עיכוב הנתונים הקיימים נשארים על המסך ומופיעה הודעה: `העדכון מתעכב — מוצגים הנתונים האחרונים`.
- retry אוטומטי מדורג: 5 / 10 / 20 / 30 שניות.
- כותרת ראשית חמה עם דעיכת ניקוד חזקה אחרי 60–90 דקות ומשקל גבוה לדיווח האחרון ב-cluster.
- cluster מעורב Telegram + אתר חדשות תמיד משתמש באתר החדשות כיעד הלחיץ.
- אזור Desktop עליון: כותרת מרכזית + `האחרונים עכשיו` מאתרי חדשות בלבד.
- שלושת הפריטים הראשונים במצב `הכל` מעדיפים אתרי חדשות מרכזיים לפני הפיד המשולב.
- מובייל: מזג האוויר וזמני שבת מוצגים כפס קומפקטי.
- פונטים מוגדלים ו-Dark Mode מלא יותר.
- רענון אוטומטי מופעל כברירת מחדל ל-60 שניות, עם סטטוס/ספירה לאחור ברורים.
- תמונות מוצגות רק כאשר המקור סיפק תמונה; אין placeholder מלאכותי ואין fetch נוסף לכל כתבה.
- Telegram אינו לחיץ כשהוא המקור היחיד.
- תוקן CSS פגום מהגרסה הקודמת שבו הופיעו רצפי `\n` מילוליים.
- `.assetsignore` מחריג רק את `_worker.js` מה-Static Assets.

## API

- `/api/news?shard=sites`
- `/api/news?shard=telegram`
- `/api/news?shard=sites&force=1` — רענון כפוי
- `/api/health`
- `/api/health?deep=1` — בדיקת מקורות אתרים
- `/api/health?deep=telegram` — בדיקת מקורות Telegram
- `/api/utilities?city=telaviv`

## פריסה

1. מחליפים ב-GitHub את **כל התוכן** של `HADASHOTA-CLOUDFLARE-DIRECT-UPLOAD` בתוכן החבילה הזאת.
2. מבצעים Commit.
3. Cloudflare המחובר ל-GitHub יבצע Deploy אוטומטי.
4. אין צורך ליצור Worker/Pages חדש.

## קבצים

- `_worker.js` — API, איסוף מקורות, clustering, cache ו-fallback.
- `app.js` — UI, סינון, Last Good Data בדפדפן, רענון, כותרת חמה.
- `index.html` — מבנה האתר ו-SEO.
- `styles.css` — Desktop/Mobile/Dark Mode.
- `.assetsignore` — החרגת Worker מקבצי Static Assets.
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`
- `site.webmanifest`

## בדיקות לפני ZIP

- JavaScript syntax (`node --check`) ל-`app.js`.
- Worker ESM syntax (`node --check`) ל-`_worker.js`.
- בדיקת IDs ב-HTML מול selectors ב-JavaScript.
- בדיקת איזון סוגריים ב-CSS והסרת `\n` מילוליים.
- בדיקת כפילויות IDs/URLs ברשימת המקורות.
- בדיקת manifest והימצאות icons.
- בדיקת canonical / structured data / robots / sitemap.
