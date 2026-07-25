# חדשותא V71 — QA

- תיקון runtime boot של V70 נשמר: קבועי lead snapshot מוגדרים לפני יצירת state.
- תיקון redirect loop: `/` נשלח ל-Assets כ-`/` ולא כ-`/index.html`.
- `/index.html` מקבל redirect יחיד וקנוני ל-`/`.
- אין `wrangler.jsonc`; תצורת Cloudflare הקיימת אינה משתנה.
- API חדשות, כל המקורות ו-Telegram נשארו ללא שינוי לוגי בגרסה זו.
- Service Worker אינו מטפל ב-fetch ואינו שומר HTML/חדשות ב-cache.
- גרסת assets/API: 71.0.0.
