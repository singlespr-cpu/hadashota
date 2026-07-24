# חדשותא — HADASHOTA FINAL V8 FULL

חבילה מלאה לפריסה בתיקיית `HADASHOTA-CLOUDFLARE-DIRECT-UPLOAD` המחוברת ל-Cloudflare Workers + Static Assets.

## מה חדש ב-V8

### ניווט ועיצוב
- סרגל `ראשי / ביטחוני / פוליטי / מדיני / אתרי חדשות / Telegram / רשמי` נשאר קבוע בזמן גלילה.
- לחיצה על לשונית כבר לא מקפיצה את הדף לאזור הסינונים ולכן הסרגל אינו "נעלם" מההקשר.
- עיצוב הסרגל עודכן למראה נקי ומודרני יותר: רקע מטושטש, לשונית פעילה רכה, גבולות וצללים עדינים יותר.
- נוסף כפתור `אודות` בכותרת העליונה עם חלון מידע על פעולת חדשותא.
- נוסף כפתור `יצירת קשר` בכותרת העליונה עם פרטי הקשר והבהרת מדיניות הקישורים/Telegram.
- עיצוב הכותרת הראשית, "האחרונים עכשיו", אזור הסינון וכרטיסי החדשות לוטש למראה פחות מיושן ויותר מערכתי/חדשותי.
- כל רכיבי האתר משתמשים באותה משפחת פונט מערכתית, כולל כפתורים, שדות, חדשות ומבזקים.
- טיפוגרפיית הפיד הוגדלה: כותרות, תקצירים, מקור/זמן וכפתורי סינון.
- נוספו Dark Mode מלא גם לחלונות החדשים ולכפתורי הכותרת.

### אמינות הנתונים
- זמן ההמתנה של הלקוח ל-API הוגדל ל-22 שניות כדי לא לקטוע Worker שעדיין מסיים משיכת מקורות.
- משיכת 20 מקורות בכל shard משתמשת בעד 10 פעולות מקבילות, כך שה-Worker מסיים מהר יותר בלי לאחד את שני ה-shards לבקשה אחת.
- Last Good Data נשמר גם ב-Cloudflare וגם בדפדפן.
- אם כל המקורות נכשלים, ה-Worker מחזיר את ה-shard התקין האחרון במקום למחוק את הפיד.
- אם רענון חדש חזר במצב חמור עם פחות מ-4 מקורות פעילים, הוא אינו מחליף feed תקין שכבר נשמר; מוצגים הנתונים האחרונים ומתבצע retry.
- מקור בודד שנכשל נשאר מבודד ואינו מפיל את ה-API כולו.
- retry אוטומטי מדורג בדפדפן: 5 / 10 / 20 / 30 שניות.
- אם אין עדיין Last Good Data, הממשק מציג מצב `מתחבר למקורות החדשות…` ולא מסך שגיאה חריף.

### כל מה שנשמר מ-V6
- שני shards: `sites` ו-`telegram` — 20 מקורות בכל אחד.
- כותרת חמה עם משקל לטריות, מספר מקורות והעדכון האחרון ב-cluster.
- Desktop: כותרת מרכזית + `האחרונים עכשיו` מאתרי חדשות.
- עדיפות לאתרי חדשות מרכזיים בתחילת הפיד במצב `הכל`.
- Telegram אינו לחיץ; cluster מעורב מפנה לאתר החדשות.
- מובייל: מזג אוויר + שבת בפס קומפקטי.
- Auto Refresh מופעל כברירת מחדל כל 60 שניות.
- תמונות מוצגות רק אם המקור מספק תמונה, ללא fetch נוסף לכל כתבה.
- Dark Mode, SEO, favicon, sitemap, robots, canonical ו-structured data.

## API

- `/api/news?shard=sites`
- `/api/news?shard=telegram`
- `/api/news?shard=sites&force=1`
- `/api/health`
- `/api/health?deep=1`
- `/api/health?deep=telegram`
- `/api/utilities?city=telaviv`

## פריסה

1. מחליפים ב-GitHub את כל התוכן של `HADASHOTA-CLOUDFLARE-DIRECT-UPLOAD` בתוכן החבילה הזאת.
2. מבצעים Commit.
3. Cloudflare המחובר ל-GitHub יבצע Deploy אוטומטי.
4. אין צורך ליצור Worker או Pages חדש.

## קבצים

- `_worker.js` — API, איסוף מקורות, clustering, cache ו-fallback.
- `app.js` — UI, סינון, Last Good Data, רענון, מודלים וכותרת חמה.
- `index.html` — מבנה האתר, חלונות אודות/יצירת קשר ו-SEO.
- `styles.css` — Desktop/Mobile/Dark Mode וכל עיצוב V8.
- `.assetsignore` — החרגת Worker מקבצי Static Assets.
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`
- `site.webmanifest`

## בדיקות שבוצעו

- `node --check` ל-`app.js` ול-`_worker.js`.
- התאמת כל selectors מסוג `#id` ב-JavaScript ל-IDs קיימים ב-HTML.
- אין IDs כפולים ב-HTML.
- איזון מלא של סוגריים ב-CSS.
- 40 מקורות מוגדרים: 20 אתרים + 20 Telegram, ללא ID או URL כפולים.
- בדיקת Worker מדומה: משיכה תקינה נשמרת כ-Last Good; לאחר סימולציה של נפילת כל מקורות האתרים ה-API מחזיר `200` עם הנתונים האחרונים ו-`stale: true` במקום להפיל את הפיד.


## V8 changes
- Every feed story is clickable and opens the exact source, including the exact Telegram message.
- Telegram-only lead and breaking stories now link to their Telegram source message.
- Related cluster reports, including Telegram, expose their source links.
- The central lead headline is smaller and can show up to four lines on desktop (five on mobile).


## V10 changes

- The persistent newsroom navigation is now true primary navigation: category tabs reset source-type filters, source tabs reset category filters, and `ראשי` returns to the full feed.
- Clicking a newsroom tab smoothly lands at the filtered news feed while preserving the sticky header/navigation.
- The feed heading now reflects source tabs too (`אתרי חדשות`, `Telegram`, `רשמי בלבד`).
- Unified typography across navigation, headlines, metadata, cards, modals and controls using a self-contained system font stack (no third-party font dependency).
- Repaired escaped-newline CSS left by the V8 append so V8 source-link/lead-headline rules are valid CSS.
- Nested HTML entities from feeds are decoded twice, removing artifacts such as `&amp;#8226;` from visible previews.
- Added `content-visibility` to long feed cards for smoother rendering on large feeds.


## V10 typography
- Unified Heebo font across the full UI.
- Editorial headline weights: lead 900, story headlines 800, navigation 700, body copy 400.
- Google Fonts preconnect + display=swap with system fallbacks.


## V11
- Mobile Shabbat card now has a dedicated compact line that always shows candle-lighting and havdalah times.
- The Shabbat side receives slightly more width on narrow screens to prevent clipping.
