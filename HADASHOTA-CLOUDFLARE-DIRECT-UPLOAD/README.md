# חדשותא — HADASHOTA FINAL V25 LAUNCH

גרסת production לפריסה ב-Cloudflare Workers + Static Assets.

## עיקרי V25

- סיפור מרכזי חכם עם סף קשיח של לפחות 3 מקורות שונים.
- אימות הסיפור הראשי נספר רק מדיווחים שהופיעו בחלון זמן של עד 45 דקות סביב אותו אירוע, כדי למנוע ניפוח ממקורות ישנים.
- יציבות לכותרת הראשית: סיפור חדש מחליף את הקיים רק כשהוא חזק משמעותית, כשהקיים מתיישן או כשאירוע טרי ומגובה במקור רשמי פורץ קדימה.
- תג הסיפור הראשי מסביר את קצב האימות, למשל “4 מקורות · תוך 9 דק׳”.
- אזור “האחרונים” ממוין כרונולוגית, עד 20 ידיעות, עם גלילה אוטומטית עדינה בדסקטופ והרחבה ידנית במובייל.
- מרכז התרעות פיקוד העורף עם סינון יישובים, צליל, התראות דפדפן ובדיקת מערכת.
- התאמת יישובים הוקשחה לגבולות מילים כדי להימנע מהתאמות שגויות בין שמות דומים.
- תיקון ניקוי BOM בתשובת ההתרעות ותיקון נרמול רווחים בשמות יישובים.
- שיפור נגישות: התרעת screen reader מופעלת רק בעת שינוי אמיתי בהתרעה ולא בכל בדיקת polling.
- כפתור חזרה למעלה נוסף בפועל לממשק.
- H1 סמוי ונגיש נוסף למסמך.
- תיקון מדד retriesUsed ב-health/stats.
- מט״ח: Yahoo Finance כמקור שוק ראשי, Frankfurter כגיבוי גלובלי ובנק ישראל כגיבוי נוסף.
- מזג אוויר Open-Meteo וזמני שבת Hebcal.
- Last Good Data, retry אוטומטי, פיצול sites/telegram, מצב כהה, PWA והתראות כותרת ראשית.

## רענון ועמידות

- שני shards: `sites` ו-`telegram`.
- Cache חדשות קצר של כ-25 שניות.
- רענון לקוח: 30 שניות בטאב פעיל / 60 שניות ברקע.
- Retry בעת עיכוב: 4 / 8 / 15 / 25 שניות.
- Last Good Data נשמר ב-Cloudflare ובדפדפן.
- עיכוב קל של shard יחיד מוצג כסטטוס קומפקטי; פס צהוב גדול נשמר לעיכוב משמעותי.

## API

- `/api/news?shard=sites`
- `/api/news?shard=telegram`
- `/api/news?shard=sites&force=1`
- `/api/health`
- `/api/health?deep=1`
- `/api/health?deep=telegram`
- `/api/utilities?city=telaviv`
- `/api/alerts`
- `/robots.txt`
- `/sitemap.xml`

## פריסה

1. מעלים את כל תוכן ה-ZIP לשורש הפרויקט המחובר ל-Cloudflare.
2. מבצעים Deploy/Commit כרגיל.
3. אין צורך במפתח API עבור Open-Meteo, Hebcal או Frankfurter.
4. `index.html` מכיל `__SITE_URL__`; ה-Worker מחליף אותו אוטומטית ב-origin האמיתי בזמן הגשת דף הבית.

## הערת בטיחות

מרכז ההתרעות באתר הוא מידע משלים בלבד ואינו תחליף לצופרים, ליישומון פיקוד העורף או להנחיות הרשמיות.


V39: Smart PWA install/home-screen recommendation with Chromium install prompt, iOS Add to Home Screen guidance, install-state detection, snooze memory, and a manual install entry in display preferences.


## V39 Intelligence
- Hot Score לכל סיפור, רמת אימות, התפתחות סיפור וטיימליין.
- מצב רק חשוב, חם עכשיו, תקציר 30 שניות ומה השתנה מאז הביקור האחרון.
- Trending עם מומנטום ולא רק ספירת מילים.
- Health Score לכל מקור, כולל מקורות שאינם זמינים זמנית.
- מקורות רשמיים נוספים: Gov.il, בנק ישראל, הכנסת ורשות שדות התעופה.
- שמירת ההעדפה 'רק חשוב' מקומית במכשיר.


## V39 editorial/legal-safety layer
- Publisher-owned images are not displayed automatically unless a source is explicitly marked reusable.
- Visuals are looked up through Openverse using commercial-compatible open licenses (CC0/PDM/CC BY/CC BY-SA), with attribution metadata retained when available.
- Hadashota synthesizes display headlines from corroborated event facts; source names and direct links remain visible.
- Added /copyright notice-and-takedown page.


## V40 newsroom + media resolver
- Front-page and feed headlines use an upgraded newsroom-style synthesis: punchier phrasing while avoiding simple verbatim mirroring of a publisher headline.
- Media resolver now tries Wikimedia Commons first for named people/places/institutions, then Openverse, with Hebrew-to-English entity/action expansion and category fallbacks.
- Only public-domain / CC0 / CC BY / CC BY-SA results are accepted, and visible attribution metadata is preserved.
- Feed media hydration capacity was increased so substantially more visible stories receive licensed imagery.

## V42 — Fresh Lead + Consensus Newsroom
- הסיפור המרכזי המאומת (3+ מקורות) מוגבל לעד שעתיים מהעדכון האחרון; כותרת ישנה לא נשמרת שעות רק בגלל שהייתה מאומתת.
- אם אין כרגע סיפור טרי עם 3 מקורות, מוצג סיפור מתפתח טרי (2 מקורות / מקור רשמי / הסיפור הטרי והמשמעותי ביותר). התראות Push על החלפת סיפור מרכזי עדיין נשלחות רק לסיפור עם 3+ מקורות.
- חלון איחוד הדיווחים הורחב בזהירות כדי לזהות ניסוחים שונים של אותו אירוע בין אתרים ו-Telegram.
- מנוע הכותרות בוחר ניסוח "מדואיד" שמקבל את מירב התמיכה משאר כותרות האשכול ומלטש אותו, במקום תבניות דרמטיות קבועות.
- מנוע התמונות דורש התאמה חזקה יותר לאדם/אירוע; תמונות מקום/ארכיון מסומנות במפורש כאילוסטרציה.


## V48 FINAL STABLE
- Forced fresh news request on every cold open.
- Fresh refresh on iOS/PWA BFCache restore, return from background, and network reconnect.
- HTML shell is no-store/revalidated so an old installed PWA page is not retained after deploy.
- Local last-good is visual fallback only while the system retries a fresh network load.
- Third-party source images are disabled unless explicitly whitelisted for reuse; open-license media remains enabled.
- Copyright/takedown and privacy pages updated.

## V49 — iPhone Home Screen refresh fix
- iOS standalone/Home Screen mode is explicitly detected with display-mode/navigator.standalone.
- Returning to a suspended Home Screen web app after 3+ seconds performs a full same-origin reload.
- BFCache page restores also force a full reload in standalone mode.
- Reload-loop guard is stored in sessionStorage.
- Normal Safari/desktop behavior remains network-refresh based without forced page reload.

## V50 — Main story corroboration lock
- A one-source story can never become the main story.
- Primary rule: 3+ distinct publishers within the last 60 minutes.
- Only when no such 3-source story exists may the system use a 2-source story.
- Two-source fallback is limited to recent/corroborated stories; older fallback is capped at 3 hours.
- Official status alone no longer bypasses the 2-source minimum.
- Push headline-change notifications remain restricted to 3+ sources.

## V51 — visual layout polish
- Desktop lead story and Latest panel now share the same fixed outer height.
- Lead image reduced to a compact square: 238px desktop, 210px mid-size.
- Main headline capped at four lines with automatic smaller sizing for long titles.
- Summary capped at two lines; sources and intelligence badges are compact.
- “למקור הידיעה” owns a dedicated bottom row and remains visible without scrolling.
- Mobile remains natural auto-height with the existing responsive layout.
- Reviewed global card sizing, touch target sizing and radius consistency.

## V53 — canonical lead hotfix
- Fixed the hero being stuck on “מזהה את הסיפור המרכזי”.
- Automatic desktop/Safari/Home-Screen loads now join the same shared Worker snapshot.
- Only the explicit manual Refresh button bypasses the shared snapshot.
- Lead ranking uses the server snapshot timestamp for deterministic cross-device selection.
- 3+ distinct publishers is the primary main-story rule; if none exists in the last hour, 2+ is allowed.
- A one-source item can never masquerade as a corroborated main story; it is shown only as “עדכון מתפתח עכשיו” so the hero is never blank.
- Push notifications remain 3+ sources only.

## V54 — desktop install button hotfix
- Fixed missing click event bindings for the install modal buttons.
- “התקינו את חדשותא” now calls the browser's native beforeinstallprompt when available.
- Manual “הוספת חדשותא למכשיר” opens the install offer correctly.
- “לא עכשיו” now closes the modal and snoozes it.
- Unsupported desktop browsers show real install/favorites instructions instead of appearing unresponsive.

## V55 — quick brief modal polish
- The “30 seconds to understand what’s happening” modal now shows the 5 items in chronological order (newest first), using the shared server snapshot clock.
- Modal reduced in size and compressed so 5 updates fit without needing internal scrolling in normal cases.
- Bottom “סגירה” button moved to the left side of the footer (RTL-left via flex-end).
- Card spacing, rank badge, metadata chips and source button sizes tightened for a cleaner fit.


## V56 — quick brief fit + backdrop
- Darker blurred backdrop added behind the quick-brief modal for stronger focus.
- Close button kept on the left side and given more inset space so it no longer clips.
- Modal width/height reduced and the 5 update cards compacted further to avoid internal scrolling in common cases.

## V57 — About + information pages
- Rebuilt the About modal with a clear explanation of collection, clustering, corroboration, ranking and source linking.
- Added feature overview: Red Alert, weather, Shabbat times, FX rates, news notifications, 30-second brief and Home Screen installation.
- Rewrote and redesigned About, How It Works, Privacy, Copyright/Takedown and Contact pages into one consistent premium information system.
- Updated old v34 asset references on informational pages to the current release.

## V58 — Smart Newsroom
- “מה חדש בסיפור?” shows the newest distinct developments inside the lead story.
- “למה זה הסיפור?” explains source count, freshness, Hot Score, verification and ranking reasons.
- Automatic Emergency Mode appears while matching Home Front Command alerts are active.
- “מה קורה לידך” uses the selected city to combine live alert state, current weather, local online news mentions and transport-related online reports; it also links to the official Ministry of Transport real-time planner.
- “חדשותא עכשיו” shows connected sources, hot stories and corroborated stories.
- Local transport information is never invented: it is displayed only from currently collected online reports.

## V59 — strict semantic image matching
- Fixed false-positive imagery such as a car for a motorcycle story and a road for an OpenAI/ChatGPT outage.
- Added hard subject constraints for motorcycle/scooter and major technology brands.
- Added explicit OpenAI/ChatGPT, outage, motorcycle, scooter and traffic-accident query concepts.
- Removed the generic “Israel news” image fallback for uncategorized stories.
- Raised media relevance thresholds and changed the media cache namespace so previously cached bad matches are not reused.
- When no semantically credible licensed image exists, the site now prefers its contextual fallback over a misleading photograph.

## V60 — image coverage + source link repair
- Added subject-rescue image queries for OpenAI/ChatGPT and motorcycle/scooter stories while keeping hard semantic mismatch protection.
- Commons searches may now use vector files for technology-brand imagery such as OpenAI logos.
- Lowered relevance thresholds only for strict named/subject concepts; generic stories remain conservative.
- Media cache namespace bumped so previous no-image/bad-image decisions are not reused.
- Added server-side /go resolver for ynet and Walla links.
- ynet/Walla links are validated only when clicked; valid redirected URLs open normally.
- If a publisher URL is genuinely dead/404, the user is sent to that publisher's own search page with the exact headline instead of a 404 page.
