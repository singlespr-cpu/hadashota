# חדשותא — HADASHOTA FINAL V17 LAUNCH

גרסת production סופית לפריסה ב-Cloudflare Workers + Static Assets.

## עיקרי V17

- הכותרת הראשית מאוזנת מול תמונת הידיעה: גודל אדפטיבי לפי אורך הכותרת, ללא טיפוגרפיה ענקית, ופריסה תקינה גם כשאין תמונה.
- ניקוי כפול של HTML/Entities כדי למנוע הצגת שאריות קוד מתוך RSS/Telegram בתוכן הגלוי.
- ניקוי שארית CSS פגומה מגרסה קודמת והקשחת קישורים בכותרת הראשית ל-HTTP/HTTPS בלבד.
- רענון חכם: כל 30 שניות כשהטאב פעיל, וכל 60 שניות ברקע.
- במקרה של Last Good Data, retry אוטומטי עוקף את cache החדשות הקצר ולכן אינו תלוי ברענון ידני כדי להשתחרר.
- הודעת העיכוב מציגה גם את זמן הנתונים האחרונים ומבהירה שהמערכת מנסה שוב אוטומטית.
- התראות דפדפן על החלפת האירוע המרכזי, עם כפתור בכותרת, בתפריט המהיר ובאזור ההעדפות.
- זיהוי יציב יותר של החלפת כותרת ראשית כדי לא לשלוח התראה רק בגלל שינוי ניסוח/מקור מייצג בתוך אותו cluster.
- cache-busting לגרסת 15 כדי למנוע מצב שבו דפדפן ממשיך להריץ app.js/styles.css ישנים אחרי Deploy.
- Service Worker ממוקד בהתראות בלבד, בלי cache של קבצי הממשק שעלול להשאיר גרסה ישנה.
- Manifest משופר להתקנה כ-PWA.
- Focus states ונגיעות נגישות נוספות לפני השקה.

## התראות

ההתראות בגרסה זו הן Web Notifications שמופעלות על ידי המשתמש. כל עוד האתר/ה-PWA פעיל או נמצא ברקע, המערכת יכולה לזהות החלפה של הכותרת הראשית ולהציג התראה.

Push מלא כשהאתר סגור לחלוטין דורש שרת Web Push עם subscriptions ו-VAPID, ולכן אינו נכלל בחבילה העצמאית הזו.

## רענון ועמידות

- שני shards: `sites` ו-`telegram`.
- Cache שרת קצר של כ-25 שניות.
- רענון לקוח: 30 שניות בטאב פעיל / 60 שניות ברקע.
- Retry בעת עיכוב: 4 / 8 / 15 / 25 שניות, עם bypass של cache החדשות הקצר.
- Last Good Data נשמר ב-Cloudflare ובדפדפן.
- רענון חלקי מאוד אינו מחליף feed תקין שכבר נשמר.

## API

- `/api/news?shard=sites`
- `/api/news?shard=telegram`
- `/api/news?shard=sites&force=1`
- `/api/health`
- `/api/health?deep=1`
- `/api/health?deep=telegram`
- `/api/utilities?city=telaviv`
- `/robots.txt`
- `/sitemap.xml`

## פריסה

1. מחליפים ב-GitHub את תוכן תיקיית הפרויקט בתוכן החבילה.
2. מבצעים Commit.
3. Cloudflare המחובר ל-GitHub מבצע Deploy אוטומטי.
4. אין צורך ליצור Worker/Pages חדש.

`index.html` כולל `__SITE_URL__` בכמה תגי SEO. ה-Worker מחליף אותו אוטומטית ב-origin האמיתי בזמן הגשת דף הבית.

## קבצים

- `_worker.js` — API, איסוף מקורות, clustering, cache ו-fallback.
- `app.js` — UI, סינון, Last Good Data, רענון, כותרת ראשית והתראות.
- `index.html` — מבנה, SEO, מודלים ובקרי התראות.
- `styles.css` — Desktop/Mobile/Dark Mode ועיצוב V17.
- `sw.js` — Service Worker להתראות.
- `site.webmanifest` — התקנת PWA.
- `.assetsignore`, favicons ו-Apple Touch icon.
