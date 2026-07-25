# חדשותא — HADASHOTA V68 iOS / COLD-EDGE FIX

חדשותא הוא אגרגטור חדשות ישראלי בעברית וב־RTL, המשלב אתרי חדשות, מקורות רשמיים וערוצי Telegram ציבוריים. המערכת מקבצת דיווחים על אותו אירוע, מדרגת סיפורים ומציגה פיד עדכונים, סיפור מרכזי, התרעות חירום, מזג אוויר, זמני שבת, מט״ח ופיצ'רים משלימים.

## פריסה

1. V68 מיועדת ל־Cloudflare Workers + Static Assets ומכילה `wrangler.jsonc` מפורש.
2. `wrangler.jsonc` מגדיר `main: ./_worker.js`, binding בשם `ASSETS` ו־`run_worker_first: true`, כדי שה־API וה־HTML יעברו תמיד דרך ה־Worker.
3. בפריסת GitHub/Workers Builds, Root directory צריך להיות התיקייה שמכילה את `wrangler.jsonc`; deploy command מומלץ: `npx wrangler deploy`.
4. שם ה־Worker בקובץ הוא `hadashota`, בהתאם ל־`hadashota.*.workers.dev`. אם שם הפרויקט בחשבון Cloudflare שונה, יש לעדכן רק את שדה `name`.
5. אין צורך במפתח API עבור Open-Meteo, Hebcal או Frankfurter.
6. `index.html` ועמודי המידע מכילים `__SITE_URL__`; ה־Worker מחליף אותו ב־origin האמיתי בזמן הגשת HTML.
7. להפעלת בדיקת health עמוקה יש להגדיר ב־Cloudflare משתנה סודי בשם `HADASHOTA_DIAGNOSTIC_KEY`. ללא המשתנה, `/api/health?deep=...` חסום בכוונה.

## API

- `/api/news?shard=sites`
- `/api/news?shard=telegram`
- `/api/news?shard=sites&force=1` — רענון מלא עד המקורות מתוך האתר.
- `/api/news?shard=telegram&force=1`
- `/api/utilities?city=telaviv`
- `/api/alerts`
- `/api/media?q=...&category=...`
- `/api/health`
- `/api/health?deep=sites` — דורש מפתח diagnostics.
- `/robots.txt`
- `/sitemap.xml`

## מדיניות הסיפור המרכזי

- ידיעה ממקור יחיד לעולם אינה יכולה להיות הסיפור המרכזי.
- סיפור עם 3 מפרסמים שונים ומעלה מקבל עדיפות כאשר יש דיווחים תומכים מהשעה האחרונה.
- ירידה ל־2 מקורות מותרת רק כאשר snapshot החדשות עצמו מכיל לפחות שעה מלאה של היסטוריה ולא נמצא בה סיפור 3+ מקורות מתאים.
- fallback של 2 מקורות מוגבל לסיפור בן עד 3 שעות וגם כפוף לאותו כלל.
- ספירת מקורות נעשית לפי publisher ייחודי, לא לפי מספר פריטים מאותו אתר/ערוץ.

## Freshness ו־cache ב־V68

- פתיחה קרה מציגה snapshot משותף קצר ואז מבצעת מיד משיכה כפויה אמיתית.
- `force=1` עוקף גם את cache של `/api/news` וגם את cache המשיכות ל־RSS/HTML/Telegram במקור.
- מקסימום 6 משיכות מקורות בו־זמנית.
- תגובת הלקוח ברענון אמיתי היא `no-store`; עותק cache נפרד נכתב ל־Worker snapshot קצר.
- רענון מפורש `force=1` אינו תלוי ב־Sec-Fetch/Origin של הדפדפן; Chrome/Safari iOS לא יכולים להוריד אותו בשקט לרענון cache.
- Cache API אינו משתמש ב־`stale-while-revalidate`; לכן V68 מגדירה TTL מפורש וקצר ללא directive שאינו נתמך.
- Last Good מקומי נשמר רק מתגובה טרייה ואינו יכול להישמר מחדש מתוך stale fallback.
- Last Good מקומי פג אחרי 15 דקות.
- Last Good של ה־Worker נשמר עד שעתיים לצורכי fallback בלבד ומסומן כ־stale כאשר הוא מוחזר.
- freshness מחושב בנפרד ל־sites ול־telegram; shard טרי לא מסתיר shard ישן.
- `sw.js` מוגש ללא cache והרישום משתמש ב־`updateViaCache: "none"`.

## תמונות

- תמונות מקור נשמרות רק עבור source שהוגדר מפורשות עם הרשאת reuse.
- ברירת המחדל היא Wikimedia Commons / Openverse עם מנגנון התאמה סמנטית.
- תמונת fallback שאינה צילום האירוע מסומנת כאילוסטרציה.
- תוצאות media נשמרות 30 דקות בלבד; no-match נשמר 5 דקות.
- תמונות פיד נטענות עם `IntersectionObserver` רק כשהן מתקרבות למסך.

## התרעות

- הלקוח בודק התרעות כל 2 שניות כשהאתר פעיל וכל 5 שניות ברקע.
- ה־Worker משתף תוצאת OREF למשך 2 שניות בכל edge location, כך שמשתמשים רבים אינם גורמים בהכרח לבקשת origin נפרדת בכל poll.
- התרעות חדשותא הן מידע משלים בלבד ואינן תחליף ליישומון פיקוד העורף, לצופרים או להנחיות הרשמיות.
- התראת "סיפור מרכזי" הנוכחית היא Notification מקומית כשהאתר/PWA עדיין פעיל; Push אמיתי כשהאפליקציה סגורה דורש אחסון subscriptions + VAPID + trigger מתוזמן בצד Cloudflare, ולכן אינו מוצג כיכולת קיימת ב־V68.

## אבטחה ונגישות

- CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy ו־COOP מוגדרים ב־HTML.
- diagnostics עמוקים חסומים ללא secret.
- endpoints של diagnostics עמוקים מוגנים ב-secret; רענון החדשות נשאר endpoint קריאה בלבד ואינו משנה מידע בשרת.
- כל הפופאפים משתמשים ב־`aria-modal`, background `inert`, focus trap, Escape והחזרת focus לאלמנט שפתח אותם.
- מערכת המודאלים מותאמת ל־safe areas ול־`100dvh`; תוכן ארוך גולל במקום להיחתך.

## הערה על סנכרון בין מכשירים

V68 מקשיחה את מקור הבעיה הפרקטי של Safari/PWA: local snapshot ישן כבר אינו יכול להישאר לאורך זמן, ופתיחה מבצעת רענון אמיתי עד המקורות. ה־snapshot המשותף הקצר עדיין מבוסס על Cloudflare Cache API, ולכן אין הבטחה ארכיטקטונית ל־state זהה לחלוטין בין data centers שונים. הבטחה גלובלית strong-consistency דורשת binding מתמשך שמוגדר בצד Cloudflare, כגון Durable Object; ZIP סטטי לבדו אינו יכול ליצור binding כזה אוטומטית.


### תיקוני V68 לאייפון / Chrome iOS

- טעינת החדשות פרוגרסיבית: ה־shard הראשון שחוזר מוצג מיד, בלי לחכות ל־shard השני.
- אין יותר deadline שמדלג על מקורות: כל מקור מקבל ניסיון ראשון בכל איסוף; retries מתבצעים רק אחרי השלמת המעבר המלא.
- timeout בצד הלקוח הוא 40 שניות כרשת ביטחון, כדי לאפשר מעבר מלא גם ב־edge קר.
- בקשת `/api/news` מהדפדפן פושטָה: ללא `Cache-Control` מותאם אישית; `cache: no-store` + cache-busting query נשארים.
- הוסר RegExp lookbehind מה־JavaScript של הלקוח לשיפור תאימות WebKit/Chrome iOS.
- מפתח Last Good הועבר ל־v68, כך ש־snapshot מקומי ישן מ־V68 לא יוחזר בטעות אחרי העלאה.

## V68 — שינויים מרכזיים

- תיקון force end-to-end.
- תיקון חילוץ URL מ־RSS: כתובות לא עוברות יותר ניקוי טקסט, ותוקן regex שהיה עלול להשחית `https://` ומילים באנגלית.
- תיקון cache.put של no-store באמצעות response נפרד ל־cache.
- concurrency 6.
- Last Good מוגבל גיל ולא נשמר מ־stale.
- freshness לכל shard.
- כלל 3→2 מפורש גם במצב fallback.
- SW update hardening.
- OREF shared edge cache קצר.
- lazy media hydration.
- CSP + diagnostics protection.
- focus trap + inert לפופאפים.
- הגדלת טקסטים קטנים מדי ב־Quick Brief במובייל.
- גרסת assets/PWA: `68.0.0`.

## סימון גרסה בפרודקשן

בתחתית דף הבית מוצג מספר הגרסה הנוכחי. ב־V68 יוצג `גרסה V68`. בכל release עתידי יש לעדכן את הסימון יחד עם גרסת ה־assets וה־Worker, כך שניתן לבדוק מיד אם Cloudflare כבר מגישה את הפריסה החדשה.


## V68 — FULL SOURCE REFRESH

- כל רענון אמיתי (`force=1`) מבצע ניסיון רשת לכל מקור המוגדר ב-shard, ללא deadline שמדלג על מקורות מאוחרים.
- PASS 1 עובר על כל המקורות פעם אחת; רק לאחר מכן PASS 2 מבצע עד 6 retries למקורות שנכשלו/לא החזירו פריטים.
- רענון אוטומטי בדפדפן הוא כעת רענון אמיתי עד המקורות, ולא קריאה שיכולה להסתפק ב-snapshot cache.
- V68 משתמשת ב-cache namespace חדש כדי שלא להחזיר snapshot שבור/ריק של V67.
- אם רק חלק מהמקורות הצליחו, הפיד הטרי מוצג; סיפור מרכזי עדיין כפוף לכלל האימות של 3 מקורות (או 2 רק בהתאם לכלל השעה).
- זמן ההמתנה בצד הלקוח הוגדל כדי לאפשר מעבר מלא על כל המקורות גם ב-edge קר.
