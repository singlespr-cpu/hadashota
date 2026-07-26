# כותרת פלוס V71 — Redirect Recovery

גרסת תיקון שמרנית לפריסה הקיימת ב-Cloudflare.

## מה השתנה
1. נשמר תיקון האתחול של app.js מ-V70.
2. תוקנה לולאת `/ -> /index.html -> /` בשכבת Static Assets.
3. ה-Worker מעביר ל-ASSETS את ה-URL הקנוני שהדפדפן ביקש, בלי לתרגם `/` ל-`/index.html`.
4. אין wrangler.jsonc ואין שינוי בהגדרות Cloudflare/GitHub.

גרסה: 71.0.0
