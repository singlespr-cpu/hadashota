# V123 True Web Push — deployment

This release adds a SQLite-backed Durable Object and a one-minute Cron Trigger.
The project root now contains `wrangler.jsonc`; keep it at repository root, while the website files remain inside `HADASHOTA-CLOUDFLARE-DIRECT-UPLOAD/`.

After GitHub/Cloudflare deploy, verify:
- `/api/push/config` returns `enabled: true` and a `publicKey`.
- Enable notifications from the site once on each device.
- `/api/push/status` should show the subscription count.
- The first background lead only primes the baseline; the next actual lead change sends Push.

iPhone/iPad: Web Push requires installing the site to the Home Screen and enabling notifications from that installed web app.
