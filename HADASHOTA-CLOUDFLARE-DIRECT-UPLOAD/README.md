# חדשותא — V70 Runtime Boot Fix

V70 מתקנת את התקלה שמנעה מ-app.js להגיע בכלל ל-init().

## שורש התקלה
בתחילת app.js נבנה state שקרא מיד ל-readStoredLeadSnapshot().
הפונקציה השתמשה ב-LEAD_SNAPSHOT_KEY לפני שה-const הוגדר בקובץ, ולכן JavaScript נפל ב-Temporal Dead Zone עוד לפני init() ולפני כל בקשת /api/news.

## מה תוקן
- קבועי lead snapshot הועברו לפני בניית state.
- אין שינוי בתצורת Cloudflare.
- אין wrangler.jsonc בחבילה.
- גרסת assets/cache עודכנה ל-V70.
- API marker עודכן לבדוק V70 בצורה נכונה.
- לוגיקת 45 המקורות נשארה כפי שהייתה ב-V69.

## פריסה
העלו את כל קבצי V70 לאותה תיקייה ב-GitHub.
אם נשאר wrangler.jsonc מ-V68, מחקו אותו ידנית.
