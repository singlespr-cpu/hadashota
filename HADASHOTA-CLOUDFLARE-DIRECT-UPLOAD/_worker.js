const SOURCES = [
  // ---------- RSS / news sites ----------
  { id: "ynet-news", publisher: "ynet", name: "ynet", kind: "site", adapter: "rss", url: "https://www.ynet.co.il/Integration/StoryRss2.xml", home: "https://www.ynet.co.il/news", language: "he", verified: true },

  { id: "walla-news", publisher: "walla", name: "וואלה חדשות", kind: "site", adapter: "rss", url: "https://rss.walla.co.il/feed/1?type=main", home: "https://news.walla.co.il/", language: "he", verified: true },

  { id: "globes-all", publisher: "globes", name: "גלובס", kind: "site", adapter: "rss", url: "https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=2", home: "https://www.globes.co.il/", language: "he", verified: true },

  { id: "timesofisrael", publisher: "timesofisrael", name: "Times of Israel", kind: "site", adapter: "rss", url: "https://www.timesofisrael.com/feed/", home: "https://www.timesofisrael.com/", language: "en", verified: true },
  { id: "jpost-breaking", publisher: "jpost", name: "Jerusalem Post Breaking", kind: "site", adapter: "rss", url: "https://www.jpost.com/rss/rssfeedsheadlines.aspx", home: "https://www.jpost.com/breaking-news", language: "en", verified: true },

  { id: "kikar-latest", publisher: "kikar", name: "כיכר השבת", kind: "site", adapter: "rss", url: "https://a.kikar.co.il/v1/rss/articles/latest/rss2", home: "https://www.kikar.co.il/", language: "he", verified: true },

  // ---------- HTML/JSON-LD fallbacks: source is only exposed if live items are actually parsed ----------
  { id: "israelhayom-news", publisher: "israelhayom", name: "ישראל היום", kind: "site", adapter: "jsonld", url: "https://www.israelhayom.co.il/israelnow", home: "https://www.israelhayom.co.il/israelnow", language: "he", verified: true },
  { id: "n12-breaking", publisher: "n12", name: "N12 מבזקים", kind: "site", adapter: "jsonld", url: "https://www.n12.co.il/Tagit/%D7%9E%D7%91%D7%96%D7%A7", home: "https://www.n12.co.il/Tagit/%D7%9E%D7%91%D7%96%D7%A7", language: "he", verified: true },
  { id: "kan-headlines", publisher: "kan", name: "כאן חדשות", kind: "site", adapter: "jsonld", url: "https://www.kan.org.il/headlines/", home: "https://www.kan.org.il/headlines/", language: "he", verified: true },
  { id: "now14-breaking", publisher: "now14", name: "עכשיו 14 מבזקים", kind: "site", adapter: "jsonld", url: "https://www.c14.co.il/news-flash", home: "https://www.c14.co.il/news-flash", language: "he", verified: true },
  { id: "0404", publisher: "0404", name: "חדשות 04", kind: "site", adapter: "jsonld", url: "https://0404.co.il/", home: "https://0404.co.il/", language: "he", verified: true },
  { id: "bhol-breaking", publisher: "bhol", name: "בחדרי חרדים מבזקים", kind: "site", adapter: "jsonld", url: "https://www.bhol.co.il/newsflash", home: "https://www.bhol.co.il/newsflash", language: "he", verified: true },
  { id: "bhol-news", publisher: "bhol", name: "בחדרי חרדים", kind: "site", adapter: "jsonld", url: "https://www.bhol.co.il/categories/1072/", home: "https://www.bhol.co.il/categories/1072/", language: "he", verified: true },
  { id: "jdn", publisher: "jdn", name: "JDN", kind: "site", adapter: "jsonld", url: "https://www.jdn.co.il/", home: "https://www.jdn.co.il/", language: "he", verified: true },


  // ---------- Official institutional sources (direct public pages) ----------
  { id: "govil-news", publisher: "govil", name: "Gov.il חדשות הממשלה", kind: "site", adapter: "htmlnews", url: "https://www.gov.il/he/collectors/news", home: "https://www.gov.il/he/collectors/news", language: "he", verified: true, official: true },
  { id: "boi-press", publisher: "boi", name: "בנק ישראל - הודעות לעיתונות", kind: "site", adapter: "htmlnews", url: "https://www.boi.org.il/publications/pressreleases/", home: "https://www.boi.org.il/publications/pressreleases/", language: "he", verified: true, official: true },
  { id: "knesset-press", publisher: "knesset", name: "הכנסת - חדשות הכנסת", kind: "site", adapter: "htmlnews", url: "https://main.knesset.gov.il/News/PressReleases/Pages/default.aspx", home: "https://main.knesset.gov.il/News/PressReleases/Pages/default.aspx", language: "he", verified: true, official: true, defaultCategory: "politics" },
  { id: "iaa-updates", publisher: "iaa", name: "רשות שדות התעופה - עדכונים", kind: "site", adapter: "htmlnews", url: "https://www.iaa.gov.il/airports/ben-gurion/notifications-and-updates/", home: "https://www.iaa.gov.il/airports/ben-gurion/notifications-and-updates/", language: "he", verified: true, official: true },

  // ---------- Telegram public preview pages ----------
  { id: "tg-health", publisher: "health", name: "משרד הבריאות", kind: "telegram", adapter: "telegram", url: "https://t.me/s/MOHreport", home: "https://t.me/MOHreport", language: "he", verified: true, official: true },
  { id: "tg-idf", publisher: "idf", name: "צה״ל - הערוץ הרשמי", kind: "telegram", adapter: "telegram", url: "https://t.me/s/idf_telegram", home: "https://t.me/idf_telegram", language: "he", verified: true, official: true, defaultCategory: "security" },
  { id: "tg-homefront", publisher: "homefront", name: "פיקוד העורף", kind: "telegram", adapter: "telegram", url: "https://t.me/s/PikudHaOref_all", home: "https://t.me/PikudHaOref_all", language: "he", verified: true, official: true, defaultCategory: "security" },
  { id: "tg-police", publisher: "police", name: "משטרת ישראל", kind: "telegram", adapter: "telegram", url: "https://t.me/s/israelpoliceforce", home: "https://t.me/israelpoliceforce", language: "he", verified: true, official: true },
  { id: "tg-mda", publisher: "mda", name: "מגן דוד אדום", kind: "telegram", adapter: "telegram", url: "https://t.me/s/mdaisrael", home: "https://t.me/mdaisrael", language: "he", verified: true, official: true, defaultCategory: "security" },
  { id: "tg-abuali", publisher: "abuali", name: "אבו עלי אקספרס", kind: "telegram", adapter: "telegram", url: "https://t.me/s/abualiexpress", home: "https://t.me/abualiexpress", language: "he", verified: false, defaultCategory: "security" },
  { id: "tg-newsil", publisher: "newsil", name: "חדשות ישראל בטלגרם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/firstreportsnews", home: "https://t.me/firstreportsnews", language: "he", verified: false },
  { id: "tg-301", publisher: "301", name: "חדשות 301 העולם הערבי", kind: "telegram", adapter: "telegram", url: "https://t.me/s/arabworld301news", home: "https://t.me/arabworld301news", language: "he", verified: false, defaultCategory: "security" },
  { id: "tg-ram", publisher: "ram", name: "מבזקי רעם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/ramreports", home: "https://t.me/ramreports", language: "he", verified: false },
  { id: "tg-daniel", publisher: "danielamram", name: "דניאל עמרם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/danielamram3", home: "https://t.me/danielamram3", language: "he", verified: false },
  { id: "tg-amitsegal", publisher: "amitsegal", name: "עמית סגל", kind: "telegram", adapter: "telegram", url: "https://t.me/s/amitsegal", home: "https://t.me/amitsegal", language: "he", verified: true, defaultCategory: "politics" },
  { id: "13tv-flash", publisher: "13tv", name: "חדשות 13 מבזקים", kind: "site", adapter: "jsonld", url: "https://13tv.co.il/news/news-flash/", home: "https://13tv.co.il/news/", language: "he", verified: true },
  { id: "tg-newssil", publisher: "newssil", name: "חדשות ישראל IL", kind: "telegram", adapter: "telegram", url: "https://t.me/s/newssil", home: "https://t.me/newssil", language: "he", verified: false },
  { id: "tg-hotnews", publisher: "hotnews", name: "החדשות החמות", kind: "telegram", adapter: "telegram", url: "https://t.me/s/hotnews1", home: "https://t.me/hotnews1", language: "he", verified: false },

  // ---------- Additional live Telegram newsrooms / journalists ----------
  { id: "maariv-flash", publisher: "maariv", name: "מעריב מבזקים", kind: "site", adapter: "rss", url: "https://www.maariv.co.il/Rss/RssFeedsMivzakiChadashot", home: "https://www.maariv.co.il/news", language: "he", verified: true },
  { id: "calcalist", publisher: "calcalist", name: "כלכליסט", kind: "site", adapter: "jsonld", url: "https://www.calcalist.co.il/home/0,7340,L-8,00.html", home: "https://www.calcalist.co.il/", language: "he", verified: true },
  { id: "makorrishon", publisher: "makorrishon", name: "מקור ראשון", kind: "site", adapter: "jsonld", url: "https://www.makorrishon.co.il/", home: "https://www.makorrishon.co.il/", language: "he", verified: true },
  { id: "srugim", publisher: "srugim", name: "סרוגים", kind: "site", adapter: "rss", url: "https://www.srugim.co.il/feed", home: "https://www.srugim.co.il/", language: "he", verified: true },
  { id: "arutz7", publisher: "arutz7", name: "ערוץ 7", kind: "site", adapter: "jsonld", url: "https://www.inn.co.il/", home: "https://www.inn.co.il/", language: "he", verified: true },
  { id: "tg-yinon", publisher: "yinonews", name: "ינון מגל - YINONEWS", kind: "telegram", adapter: "telegram", url: "https://t.me/s/yinonews", home: "https://t.me/yinonews", language: "he", verified: true, defaultCategory: "politics" },
  { id: "tg-hamoked", publisher: "hamoked", name: "חדשות המוקד", kind: "telegram", adapter: "telegram", url: "https://t.me/s/hamoked_il", home: "https://t.me/hamoked_il", language: "he", verified: false },
  { id: "tg-moriahdoron", publisher: "moriahdoron", name: "קבינט מדיני ביטחוני - מוריה אסרף & דורון קדוש", kind: "telegram", adapter: "telegram", url: "https://t.me/s/moriahdoron", home: "https://t.me/moriahdoron", language: "he", verified: true, defaultCategory: "security" },
  { id: "tg-amichaishtein", publisher: "amichaishtein", name: "עמיחי שטיין - הערוץ המדיני", kind: "telegram", adapter: "telegram", url: "https://t.me/s/US2020US", home: "https://t.me/US2020US", language: "he", verified: true, defaultCategory: "diplomatic" },
  { id: "tg-haskupim", publisher: "haskupim", name: "חדשות הסקופים", kind: "telegram", adapter: "telegram", url: "https://t.me/s/haskupim", home: "https://t.me/haskupim", language: "he", verified: false, independent: true },
  { id: "tg-aharon-yediot", publisher: "aharon-yediot", name: "אהרון ידיעות", kind: "telegram", adapter: "telegram", url: "https://t.me/s/aharonyediotnews", home: "https://t.me/aharonyediotnews", language: "he", verified: false, independent: true },
  { id: "tg-divuhim", publisher: "divuhim", name: "דיווחים חמים מהשטח", kind: "telegram", adapter: "telegram", url: "https://t.me/s/divuhim1234", home: "https://t.me/divuhim1234", language: "he", verified: false, independent: true },
  { id: "tg-israel-news-uncensored", publisher: "israel-news-uncensored", name: "ללא צנזורה חדשות ישראל", kind: "telegram", adapter: "telegram", url: "https://t.me/s/israel_news_telegram", home: "https://t.me/israel_news_telegram", language: "he", verified: false, independent: true }
];

const SECURITY_WORDS = [
  "צהל", "צה״ל", "חמאס", "חיזבאללה", "איראן", "איראני", "פיגוע", "מחבל", "מחבלים", "טיל", "טילים", "רקט", "כטב", "רחפן", "אזעק", "יירוט", "יירט", "תקיפה", "תקיפות", "ירי", "נפילה", "גבול", "עזה", "לבנון", "סוריה", "שבכ", "שב״כ", "מוסד", "צבא", "ביטחון", "ביטחוני", "כוחות", "חטוף", "חטופים", "טרור", "terror", "idf", "hamas", "hezbollah", "iran", "missile", "rocket", "drone", "attack", "security", "gaza", "lebanon", "syria", "hostage"
];
const POLITICS_WORDS = [
  "כנסת", "ממשלה", "נתניהו", "בחירות", "ליכוד", "מפלגה", "מפלגות", "חכ", "ח״כ", "שר ", "שרים", "קואליציה", "אופוזיציה", "קבינט", "סמוטריץ", "בן גביר", "גנץ", "לפיד", "איזנקוט", "פוליטי", "politic", "election", "knesset", "coalition", "opposition", "netanyahu", "likud", "minister"
];
const DIPLOMATIC_WORDS = [
  "מדיני", "דיפלומט", "שגריר", "שגרירות", "משרד החוץ", "או״ם", "אום", "ארהב", "ארה״ב", "טראמפ", "וושינגטון", "הסכם", "הפסקת אש", "שיחות", "משא ומתן", "מו״מ", "סעודיה", "קטאר", "מצרים", "ירדן", "אירופה", "איחוד האירופי", "יחסי חוץ", "diplomat", "diplomacy", "trump", "white house", "ceasefire", "agreement", "negotiation", "united nations", "saudi", "qatar", "egypt", "jordan", "washington"
];

const STOP_WORDS = new Set(["של", "את", "על", "עם", "לא", "גם", "זה", "זו", "כי", "כך", "הוא", "היא", "הם", "הן", "כל", "אל", "לפי", "אחרי", "לפני", "עוד", "היום", "עכשיו", "חדש", "חדשה", "חדשות", "דיווח", "דיווחים", "עדכון", "עדכונים", "ראשוני", "ישראל", "ישראלי", "ישראלית", "the", "a", "an", "of", "to", "in", "on", "for", "and", "is", "are", "with", "after", "before", "breaking", "report", "reports", "update"]);


const PROMO_ADMIN_CREDENTIAL_HASH = "7c172ed999cb4ffb53236212897b2dd379020531e6b0136130dea3de49d35672";
const PUBLIC_SITE_ORIGIN = "https://koteretplus.com";
const PROMO_ADMIN_PATH = "/manage-kp-7538";
const PROMO_CACHE_PATH = "/__koteretplus_promo_v1";
const FEED_PROMO_CACHE_PATH = "/__koteretplus_feed_promo_v1";
let promoMemory = null;
let feedPromoMemory = null;

const CITIES = {
  telaviv: { name: "תל אביב", latitude: 32.0853, longitude: 34.7818, candleMinutes: 18 },
  jerusalem: { name: "ירושלים", latitude: 31.7683, longitude: 35.2137, candleMinutes: 40 },
  haifa: { name: "חיפה", latitude: 32.7940, longitude: 34.9896, candleMinutes: 30 },
  beersheva: { name: "באר שבע", latitude: 31.25297, longitude: 34.79146, candleMinutes: 18 },
  eilat: { name: "אילת", latitude: 29.5577, longitude: 34.9519, candleMinutes: 18 }
};

export default {
  async scheduled(controller, env, ctx) {
    ctx.waitUntil(runBackgroundPushMonitor(env, ctx));
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // V170: one secure canonical origin for users, Google and PWA state.
    // Preserve path/query and method semantics with 308 when an alternate host
    // or an HTTP URL reaches the Worker.
    if (url.protocol === "http:" || url.hostname.toLowerCase() === "www.koteretplus.com") {
      url.protocol = "https:";
      url.hostname = "koteretplus.com";
      return Response.redirect(url.toString(), 308);
    }

    if (url.pathname === "/api/promo") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handlePromoPublic(request);
    }
    if (url.pathname === "/api/admin/promo") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handlePromoAdmin(request, env);
    }
    if (url.pathname === "/api/feed-promo") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleFeedPromoPublic(request);
    }
    if (url.pathname === "/api/admin/feed-promo") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleFeedPromoAdmin(request, env);
    }
    if (url.pathname === PROMO_ADMIN_PATH) {
      return serveHtmlAsset(request, env, url.origin, "/admin.html");
    }

    if (url.pathname === "/api/push/config") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, "/config", request);
    }
    if (url.pathname === "/api/push/subscribe") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, "/subscribe", request);
    }
    if (url.pathname === "/api/push/unsubscribe") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, "/unsubscribe", request);
    }
    if (url.pathname === "/api/push/latest") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, "/latest", request);
    }
    if (url.pathname === "/api/hot-story") {
      if (request.method === "GET") return handlePushHubRequest(env, "/hot-story", request);
      if (request.method === "POST") return handleHotStorySync(request, env);
      return json({ error: "Method not allowed" }, 405);
    }
    if (url.pathname === "/api/push/status") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, "/status", request);
    }
    if (url.pathname === "/api/push/notification") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, `/notification${url.search}`, request);
    }
    if (url.pathname === "/api/push/event") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, "/event", request);
    }
    if (url.pathname === "/api/ad/event") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, "/ad/event", request);
    }
    if (url.pathname === "/api/analytics/visit") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, "/analytics/visit", request);
    }
    if (url.pathname === "/api/analytics/public") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handlePushHubRequest(env, `/analytics/public${url.search}`, request);
    }
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleContactSubmission(request, env);
    }
    if (url.pathname === "/api/admin/dashboard") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleAdminDashboard(request, env);
    }
    if (url.pathname === "/api/admin/register-device") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleAdminRegisterDevice(request, env);
    }
    if (url.pathname === "/api/admin/push") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleAdminPush(request, env);
    }
    if (url.pathname === "/api/admin/contact") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleAdminContact(request, env);
    }

    if (url.pathname === "/api/news-bundle") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleNewsBundle(request, env, ctx);
    }

    if (url.pathname === "/api/news") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleNews(request, env, ctx);
    }

    if (url.pathname === "/api/media") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleOpenMedia(url, ctx);
    }

    if (url.pathname === "/api/source-image") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleSourceArticleImage(url, ctx);
    }

    if (url.pathname === "/api/utilities") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleUtilities(request, ctx);
    }

    if (url.pathname === "/api/alerts") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleEmergencyAlerts(env, ctx);
    }

    if (url.pathname === "/api/escalation") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleEscalation(request, env, ctx);
    }

    if (url.pathname === "/api/health") {
      const deep = url.searchParams.get("deep");
      if (deep) {
        const configuredKey = String(env?.HADASHOTA_DIAGNOSTIC_KEY || "");
        const suppliedKey = request.headers.get("X-Hadashota-Diagnostic-Key") || url.searchParams.get("key") || "";
        if (!configuredKey || suppliedKey !== configuredKey) {
          return json({ error: "Deep diagnostics are disabled" }, 403, { "Cache-Control": "no-store" });
        }
        const requestedShard = String(url.searchParams.get("shard") || deep || "sites");
        const shard = /^(sites|telegram)(-[123])?$/.test(requestedShard) ? requestedShard : "sites";
        const checkedAt = new Date().toISOString();
        const retryBudget = { remaining: 2 };
        const shardSources = getShardSources(shard);
        const results = await fetchSourcesWithLimit(shardSources, 6, retryBudget, true, 18_000);
        const sourceStatus = results.map((r) => ({
          id: r.source.id,
          name: r.source.name,
          kind: r.source.kind,
          ok: r.items.length > 0,
          items: r.items.length,
          latest: r.items[0]?.publishedAt || null,
          latencyMs: r.latencyMs,
          error: r.error
        }));
        return json({
          ok: sourceStatus.some((item) => item.ok),
          service: "hadashota-news",
          version: "214.0.0",
          checkedAt,
          shard,
          configuredSources: SOURCES.length,
          configuredShardSources: shardSources.length,
          respondingSources: sourceStatus.filter((item) => item.ok).length,
          diagnosticShards: ["sites-1","sites-2","sites-3","telegram-1","telegram-2","telegram-3"],
          sources: sourceStatus
        });
      }
      return json({
        ok: true,
        service: "hadashota-news",
        version: "214.0.0",
        time: new Date().toISOString(),
        configuredSources: SOURCES.length,
        configuredSiteSources: getShardSources("sites").length,
        configuredTelegramSources: getShardSources("telegram").length,
        collectionPolicy: "full-pass-before-retry",
        newsShards: ["sites-1","sites-2","sites-3","telegram-1","telegram-2","telegram-3"]
      });
    }

    // V167: the workers.dev hostname is kept only as a technical endpoint.
    // Public documents permanently resolve to the official Koteret Plus domain.
    if ((request.method === "GET" || request.method === "HEAD") && (url.hostname === "hadashota.singles-pr.workers.dev" || url.hostname === "www.koteretplus.com")) {
      const publicPaths = new Map([
        ["/", "/"], ["/index.html", "/"],
        ["/escalation", "/escalation"], ["/escalation.html", "/escalation"], ["/%D7%9E%D7%93%D7%93-%D7%94%D7%94%D7%A1%D7%9C%D7%9E%D7%94", "/escalation"],
        ["/about", "/about"], ["/about.html", "/about"],
        ["/how-it-works", "/how-it-works"], ["/how-it-works.html", "/how-it-works"],
        ["/contact", "/contact"], ["/contact.html", "/contact"],
        ["/privacy", "/privacy"], ["/privacy.html", "/privacy"],
        ["/copyright", "/copyright"], ["/copyright.html", "/copyright"]
      ]);
      const officialPath = publicPaths.get(url.pathname);
      if (officialPath) {
        const target = new URL(officialPath, PUBLIC_SITE_ORIGIN);
        target.search = url.search;
        return Response.redirect(target.toString(), 308);
      }
    }

    if (url.pathname === "/sw.js") return serveNoCacheAsset(request, env, "/sw.js", "application/javascript; charset=utf-8");
    if (url.pathname === "/app.js") return serveNoCacheAsset(request, env, "/app.js", "application/javascript; charset=utf-8");
    if (url.pathname === "/styles.css") return serveNoCacheAsset(request, env, "/styles.css", "text/css; charset=utf-8");
    if (url.pathname === "/escalation.js") return serveNoCacheAsset(request, env, "/escalation.js", "application/javascript; charset=utf-8");
    if (url.pathname === "/escalation.css") return serveNoCacheAsset(request, env, "/escalation.css", "text/css; charset=utf-8");
    if (url.pathname === "/site.webmanifest") return serveNoCacheAsset(request, env, "/site.webmanifest", "application/manifest+json; charset=utf-8");
    if (url.pathname === "/robots.txt") return robotsResponse(PUBLIC_SITE_ORIGIN);
    if (url.pathname === "/sitemap.xml") return sitemapResponse(PUBLIC_SITE_ORIGIN);

    // V72: Static Assets runs with html_handling:"none".
    // Resolve clean HTML routes explicitly and internally so the browser always
    // receives a 200 response. Never redirect "/" to itself and never rely on
    // automatic HTML canonicalization.
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveHtmlAsset(request, env, url.origin, "/index.html");
    }
    if (url.pathname === "/escalation" || url.pathname === "/escalation.html" || url.pathname === "/%D7%9E%D7%93%D7%93-%D7%94%D7%94%D7%A1%D7%9C%D7%9E%D7%94") {
      return serveEscalationHtmlAsset(request, env, url.origin);
    }

    const htmlRoutes = new Map([
      ["/about", "/about.html"],
      ["/about.html", "/about.html"],
      ["/how-it-works", "/how-it-works.html"],
      ["/how-it-works.html", "/how-it-works.html"],
      ["/contact", "/contact.html"],
      ["/contact.html", "/contact.html"],
      ["/copyright", "/copyright.html"],
      ["/copyright.html", "/copyright.html"],
      ["/privacy", "/privacy.html"],
      ["/privacy.html", "/privacy.html"]
    ]);
    const htmlAssetPath = htmlRoutes.get(url.pathname);
    if (htmlAssetPath) return serveHtmlAsset(request, env, url.origin, htmlAssetPath);

    return env.ASSETS.fetch(request);
  }
};


function promoCacheKey(origin=PUBLIC_SITE_ORIGIN){
  let base=PUBLIC_SITE_ORIGIN;try{base=new URL(String(origin||PUBLIC_SITE_ORIGIN)).origin}catch{}
  return new Request(`${base}${PROMO_CACHE_PATH}`,{method:"GET"});
}
async function sha256Hex(value){const bytes=new TextEncoder().encode(String(value));const digest=await crypto.subtle.digest("SHA-256",bytes);return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("")}
async function verifyPromoAdmin(username,password){return await sha256Hex(`${String(username||"")}:${String(password||"")}`)===PROMO_ADMIN_CREDENTIAL_HASH}
function sanitizePromoPayload(value={},existing={}){
  const text=cleanText(String(value.text||"")).slice(0,120);let url="";
  try{const parsed=new URL(String(value.url||""));if(!/^https?:$/.test(parsed.protocol))throw new Error();url=parsed.toString()}catch{}
  const imageData=String(value.imageData||"");
  const safeImage=/^data:image\/(?:jpeg|jpg|png|webp);base64,/i.test(imageData)&&imageData.length<=750000?imageData:"";
  const rawMeta=value?.imageMeta&&typeof value.imageMeta==="object"?value.imageMeta:{};
  const imageMeta={originalWidth:Math.max(0,Math.min(10000,Number(rawMeta.originalWidth)||0)),originalHeight:Math.max(0,Math.min(10000,Number(rawMeta.originalHeight)||0)),width:Math.max(0,Math.min(10000,Number(rawMeta.width)||0)),height:Math.max(0,Math.min(10000,Number(rawMeta.height)||0))};
  const id=String(existing?.id||value?.id||crypto.randomUUID()).replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120)||crypto.randomUUID();
  return{active:Boolean(text&&url),id,text,url,imageData:safeImage,imageMeta,updatedAt:new Date().toISOString()}
}
async function readPromo(request){
  const requestOrigin=new URL(request.url).origin;
  const keys=[promoCacheKey(PUBLIC_SITE_ORIGIN)];
  if(requestOrigin!==PUBLIC_SITE_ORIGIN)keys.push(promoCacheKey(requestOrigin));
  try{
    for(let i=0;i<keys.length;i++){
      const cached=await caches.default.match(keys[i]);
      if(!cached)continue;
      const value=await cached.json();promoMemory=value;
      // One-time migration from the old workers.dev-origin cache key.
      if(i>0)await caches.default.put(keys[0],new Response(JSON.stringify(value),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=31536000"}}));
      return value;
    }
  }catch{}
  if(promoMemory)return promoMemory;
  return{active:false,text:"",url:"",imageData:"",updatedAt:null}
}
async function writePromo(request,promo){
  promoMemory=promo;
  const requestOrigin=new URL(request.url).origin;
  const keys=[promoCacheKey(PUBLIC_SITE_ORIGIN)];if(requestOrigin!==PUBLIC_SITE_ORIGIN)keys.push(promoCacheKey(requestOrigin));
  try{await Promise.all(keys.map(key=>caches.default.put(key,new Response(JSON.stringify(promo),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=31536000"}}))))}catch(e){console.warn("Promo cache write failed",e)}
}
async function handlePromoPublic(request){return json(await readPromo(request),200,{"Cache-Control":"no-store","X-Koteret-Promo-Store":"edge-cache"})}
async function handlePromoAdmin(request,env){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  if(!(await verifyPromoAdmin(body?.username,body?.password)))return json({error:"שם משתמש או סיסמה שגויים"},401,{"Cache-Control":"no-store"});
  const action=String(body?.action||"get");
  const current=await readPromo(request);
  if(action==="get"){const stats=current?.id?(await adminHubJson(env,"/ad/stats",{slot:"top",id:current.id}).catch(()=>({stats:{views:0,clicks:0}}))).stats:{views:0,clicks:0};return json({ok:true,promo:{...current,stats}},200,{"Cache-Control":"no-store"});}
  if(action==="remove"){if(current?.id)await adminHubJson(env,"/ad/delete",{slot:"top",id:current.id}).catch(()=>{});const promo={active:false,id:"",text:"",url:"",imageData:"",imageMeta:{},updatedAt:new Date().toISOString()};await writePromo(request,promo);return json({ok:true,promo},200,{"Cache-Control":"no-store"})}
  if(action==="save"){const promo=sanitizePromoPayload(body?.promo||{},current);if(!promo.active)return json({error:"יש להזין מלל וקישור תקין"},400,{"Cache-Control":"no-store"});await writePromo(request,promo);const stats=(await adminHubJson(env,"/ad/stats",{slot:"top",id:promo.id}).catch(()=>({stats:{views:0,clicks:0}}))).stats;return json({ok:true,promo:{...promo,stats}},200,{"Cache-Control":"no-store"})}
  return json({error:"Unknown action"},400,{"Cache-Control":"no-store"})
}

async function adminHubCall(env,path,payload={}){
  const stub=pushHubStub(env);
  if(!stub)return json({error:"מערכת הניהול אינה מחוברת ל-Durable Object"},503,{"Cache-Control":"no-store"});
  return stub.fetch(new Request(`https://push.internal${path}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}));
}
async function adminHubJson(env,path,payload={}){
  const response=await adminHubCall(env,path,payload);
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(data?.error||`Admin hub ${response.status}`);
  return data;
}
async function handleHotStorySync(request,env){
  const origin=String(request.headers.get("Origin")||"");
  const referer=String(request.headers.get("Referer")||"");
  let sameSite=false;
  try{sameSite=[PUBLIC_SITE_ORIGIN,"https://www.koteretplus.com"].includes(origin)||[PUBLIC_SITE_ORIGIN,"https://www.koteretplus.com"].includes(new URL(referer).origin);}catch{}
  if(!sameSite)return json({error:"Forbidden"},403,{"Cache-Control":"no-store"});
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  const fingerprint=String(body?.fingerprint||"").replace(/[<>{}\r\n]/g,"").trim().slice(0,220);
  const title=cleanPushTitle(body?.title||"");
  const sources=Math.max(0,Math.min(100,Number(body?.sources)||0));
  let at=String(body?.at||"");if(!Number.isFinite(Date.parse(at)))at=new Date().toISOString();
  let firstAt=String(body?.firstAt||"");if(!Number.isFinite(Date.parse(firstAt)))firstAt="";
  if(!fingerprint||title.length<6||sources<2)return json({error:"Invalid hot story"},400,{"Cache-Control":"no-store"});
  const cleanHttp=(value)=>{try{const u=new URL(String(value||""),PUBLIC_SITE_ORIGIN);return /^https?:$/.test(u.protocol)?u.toString():""}catch{return""}};
  const payload={fingerprint,title,sources,at,firstAt,official:!!body?.official,link:cleanHttp(body?.link),image:cleanHttp(body?.image),generatedAt:new Date().toISOString(),origin:"site"};
  const displayOnly=body?.displayOnly===true;
  const stub=pushHubStub(env);
  if(!stub)return json({error:"Push infrastructure is not bound"},503,{"Cache-Control":"no-store"});
  const displayResponse=await stub.fetch(new Request("https://push.internal/hot-story/display",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}));
  // V209: a page view/refresh is never allowed to wake the Push fan-out. The
  // browser may synchronize only what is visibly displayed. The autonomous
  // scheduled 6-shard collector is the sole producer permitted to POST /lead.
  // This guarantees that opening or refreshing the site cannot notify every
  // subscriber, while Push continues to work with every browser fully closed.
  return json({ok:displayResponse.ok,displaySynced:displayResponse.ok,pushSync:{queued:false,reason:"background-only"}},displayResponse.ok?200:207,{"Cache-Control":"no-store"});
}

async function handleContactSubmission(request,env){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  const name=cleanText(String(body?.name||"")).slice(0,80);
  const phone=String(body?.phone||"").replace(/[^0-9+()\-\s]/g,"").trim().slice(0,30);
  const email=String(body?.email||"").trim().toLowerCase().replace(/[<>\r\n]/g,"").slice(0,160);
  const topic=cleanText(String(body?.topic||"כללי")).slice(0,60)||"כללי";
  const message=cleanText(String(body?.message||"")).slice(0,1200);
  if(name.length<2)return json({error:"יש להזין שם"},400,{"Cache-Control":"no-store"});
  if(phone.replace(/\D/g,"").length<5)return json({error:"יש להזין מספר טלפון תקין"},400,{"Cache-Control":"no-store"});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email))return json({error:"יש להזין כתובת אימייל תקינה"},400,{"Cache-Control":"no-store"});
  if(message.length<2)return json({error:"יש לכתוב הודעה"},400,{"Cache-Control":"no-store"});
  const ip=String(request.headers.get("CF-Connecting-IP")||"");
  const ua=String(request.headers.get("User-Agent")||"").slice(0,160);
  const clientKey=(await sha256Base64Url(`${ip}|${ua}`)).slice(0,32);
  const source=String(body?.source||"site").slice(0,30);
  return adminHubCall(env,"/contact",{name,phone,email,topic,message,clientKey,source});
}
async function handleAdminContact(request,env){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  if(!(await verifyPromoAdmin(body?.username,body?.password)))return json({error:"שם משתמש או סיסמה שגויים"},401,{"Cache-Control":"no-store"});
  const action=String(body?.action||"").slice(0,20);
  const id=String(body?.id||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,100);
  return adminHubCall(env,"/admin/contact",{action,id});
}

async function handleAdminDashboard(request,env){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  if(!(await verifyPromoAdmin(body?.username,body?.password)))return json({error:"שם משתמש או סיסמה שגויים"},401,{"Cache-Control":"no-store"});
  return adminHubCall(env,"/admin/dashboard",{});
}
async function handleAdminRegisterDevice(request,env){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  if(!(await verifyPromoAdmin(body?.username,body?.password)))return json({error:"שם משתמש או סיסמה שגויים"},401,{"Cache-Control":"no-store"});
  const deviceId=String(body?.deviceId||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120);
  const userAgent=String(body?.userAgent||request.headers.get("User-Agent")||"").slice(0,220);
  if(!deviceId)return json({error:"מזהה מכשיר חסר"},400,{"Cache-Control":"no-store"});
  return adminHubCall(env,"/admin/register-device",{deviceId,userAgent});
}
async function handleAdminPush(request,env){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  if(!(await verifyPromoAdmin(body?.username,body?.password)))return json({error:"שם משתמש או סיסמה שגויים"},401,{"Cache-Control":"no-store"});
  const action=String(body?.action||"").slice(0,30);
  const title=cleanText(String(body?.title||"")).slice(0,120);
  const message=cleanText(String(body?.body||"")).slice(0,220);
  let url="/";try{const u=new URL(String(body?.url||"/"),new URL(request.url).origin);if(u.origin===new URL(request.url).origin)url=`${u.pathname}${u.search}${u.hash}`;}catch{}
  const deviceId=String(body?.deviceId||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120);
  return adminHubCall(env,"/admin/push",{action,title,body:message,url,deviceId});
}


function feedPromoCacheKey(origin=PUBLIC_SITE_ORIGIN){let base=PUBLIC_SITE_ORIGIN;try{base=new URL(String(origin||PUBLIC_SITE_ORIGIN)).origin}catch{}return new Request(`${base}${FEED_PROMO_CACHE_PATH}`,{method:"GET"})}
async function readFeedPromo(request){
  const requestOrigin=new URL(request.url).origin,keys=[feedPromoCacheKey(PUBLIC_SITE_ORIGIN)];if(requestOrigin!==PUBLIC_SITE_ORIGIN)keys.push(feedPromoCacheKey(requestOrigin));
  try{for(let i=0;i<keys.length;i++){const cached=await caches.default.match(keys[i]);if(!cached)continue;const value=await cached.json();feedPromoMemory=value;if(i>0)await caches.default.put(keys[0],new Response(JSON.stringify(value),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=31536000"}}));return value}}catch{}
  if(feedPromoMemory)return feedPromoMemory;
  return{active:false,text:"",url:"",imageData:"",updatedAt:null}
}
async function writeFeedPromo(request,promo){
  feedPromoMemory=promo;const requestOrigin=new URL(request.url).origin,keys=[feedPromoCacheKey(PUBLIC_SITE_ORIGIN)];if(requestOrigin!==PUBLIC_SITE_ORIGIN)keys.push(feedPromoCacheKey(requestOrigin));
  try{await Promise.all(keys.map(key=>caches.default.put(key,new Response(JSON.stringify(promo),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=31536000"}}))))}catch(e){console.warn("Feed promo cache write failed",e)}
}
async function handleFeedPromoPublic(request){return json(await readFeedPromo(request),200,{"Cache-Control":"no-store","X-Koteret-Promo-Store":"edge-cache"})}
async function handleFeedPromoAdmin(request,env){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  if(!(await verifyPromoAdmin(body?.username,body?.password)))return json({error:"שם משתמש או סיסמה שגויים"},401,{"Cache-Control":"no-store"});
  const action=String(body?.action||"get");
  const current=await readFeedPromo(request);
  if(action==="get"){const stats=current?.id?(await adminHubJson(env,"/ad/stats",{slot:"feed",id:current.id}).catch(()=>({stats:{views:0,clicks:0}}))).stats:{views:0,clicks:0};return json({ok:true,promo:{...current,stats}},200,{"Cache-Control":"no-store"});}
  if(action==="remove"){if(current?.id)await adminHubJson(env,"/ad/delete",{slot:"feed",id:current.id}).catch(()=>{});const promo={active:false,id:"",text:"",url:"",imageData:"",imageMeta:{},updatedAt:new Date().toISOString()};await writeFeedPromo(request,promo);return json({ok:true,promo},200,{"Cache-Control":"no-store"})}
  if(action==="save"){const promo=sanitizePromoPayload(body?.promo||{},current);if(!promo.active)return json({error:"יש להזין מלל וקישור תקין"},400,{"Cache-Control":"no-store"});await writeFeedPromo(request,promo);const stats=(await adminHubJson(env,"/ad/stats",{slot:"feed",id:promo.id}).catch(()=>({stats:{views:0,clicks:0}}))).stats;return json({ok:true,promo:{...promo,stats}},200,{"Cache-Control":"no-store"})}
  return json({error:"Unknown action"},400,{"Cache-Control":"no-store"})
}

async function serveNoCacheAsset(request, env, assetPath, contentType = "application/octet-stream") {
  const assetRequest = new Request(new URL(assetPath, request.url), request);
  const asset = await env.ASSETS.fetch(assetRequest);
  if (!asset.ok) return asset;
  const headers = new Headers(asset.headers);
  headers.set("Content-Type", contentType);
  // HTML and the service worker must always revalidate. Versioned CSS/JS/manifest
  // can safely stay in the browser cache because every release changes ?v=.
  const requestedVersion = new URL(request.url).searchParams.get("v") || "";
  const versionedStatic = assetPath !== "/sw.js" && /^\d+\.\d+\.\d+$/.test(requestedVersion);
  headers.set("Cache-Control", versionedStatic ? "public, max-age=31536000, immutable" : "no-cache, max-age=0, must-revalidate");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers });
}

async function serveHtmlAsset(request, env, origin, assetPath) {
  const assetUrl = new URL(assetPath, request.url);
  // Preserve query parameters only for cache-busting/debug parameters; the
  // requested asset path itself is explicit and cannot be normalized into a loop.
  assetUrl.search = new URL(request.url).search;
  const assetRequest = new Request(assetUrl, request);
  const asset = await env.ASSETS.fetch(assetRequest);
  if (!asset.ok) return asset;

  const headers = new Headers(asset.headers);
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "geolocation=(self), camera=(), microphone=(), payment=(), usb=()");
  headers.set("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://www.google.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https:; manifest-src 'self'; worker-src 'self'; upgrade-insecure-requests");
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

  // HEAD must remain body-less, while GET receives the rewritten HTML.
  if (request.method === "HEAD") {
    return new Response(null, { status: 200, headers });
  }
  const html = (await asset.text()).replaceAll("__SITE_URL__", PUBLIC_SITE_ORIGIN);
  headers.delete("Content-Length");
  return new Response(html, { status: 200, headers });
}

async function serveEscalationHtmlAsset(request, env, origin) {
  const assetUrl = new URL("/escalation.html", request.url);
  const asset = await env.ASSETS.fetch(new Request(assetUrl, request));
  if (!asset.ok) return asset;
  const headers = new Headers(asset.headers);
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "geolocation=(), camera=(), microphone=(), payment=(), usb=()");
  headers.set("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https:; manifest-src 'self'; upgrade-insecure-requests");
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  if (request.method === "HEAD") return new Response(null, { status: 200, headers });
  const html = (await asset.text()).replaceAll("__SITE_URL__", PUBLIC_SITE_ORIGIN);
  headers.delete("Content-Length");
  return new Response(html, { status: 200, headers });
}

function robotsResponse(origin) {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

function sitemapResponse(origin) {
  const today = new Date().toISOString();
  const safeOrigin = escapeXml(origin);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${safeOrigin}/</loc><lastmod>${today}</lastmod><changefreq>hourly</changefreq><priority>1.0</priority></url>
  <url><loc>${safeOrigin}/about</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${safeOrigin}/how-it-works</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${safeOrigin}/escalation</loc><lastmod>${today}</lastmod><changefreq>hourly</changefreq><priority>0.9</priority></url>
  <url><loc>${safeOrigin}/contact</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>${safeOrigin}/copyright</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>${safeOrigin}/privacy</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=1800" } });
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[ch]));
}

function loggedWaitUntil(ctx, promise, label = "background task") {
  if (!ctx?.waitUntil) return;
  ctx.waitUntil(Promise.resolve(promise).catch((error) => {
    console.warn(`${label} failed`, error);
  }));
}

async function handleEmergencyAlerts(env, ctx) {
  const endpoint = "https://www.oref.org.il/WarningMessages/alert/alerts.json";
  const cache = caches.default;
  const cacheKey = new Request("https://hadashota.internal/v120/oref-current", { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return cors(cached);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), 3500);
  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "Accept": "application/json,text/plain,*/*",
        "Referer": "https://www.oref.org.il/",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (compatible; KoteretPlus/119.0; +https://www.oref.org.il/)",
        "Cache-Control": "no-cache"
      },
      cf: { cacheEverything: true, cacheTtl: 2 }
    });
    if (!response.ok) throw new Error(`OREF HTTP ${response.status}`);
    const raw = (await response.text()).replace(/^\uFEFF/, "").trim();
    const parsed = raw && raw !== "null" ? JSON.parse(raw) : null;
    const payload = {
      ok: true,
      source: "פיקוד העורף",
      official: true,
      checkedAt: new Date().toISOString(),
      alerts: normalizeOrefCurrentAlerts(parsed)
    };
    const clientResponse = json(payload, 200, {
      "Cache-Control":"no-store, no-cache, must-revalidate, max-age=0",
      "Pragma":"no-cache"
    });
    const sharedResponse = json(payload, 200, {
      "Cache-Control":"public, max-age=0, s-maxage=2"
    });
    loggedWaitUntil(ctx, cache.put(cacheKey, sharedResponse), "OREF cache write");
    if(payload.alerts.length)loggedWaitUntil(ctx, queueOrefAlerts(env,payload.alerts), "OREF push queue");
    return clientResponse;
  } catch (error) {
    return json({ ok:false, source:"פיקוד העורף", official:true, checkedAt:new Date().toISOString(), alerts:[], error:String(error?.message || error) }, 502, { "Cache-Control":"no-store" });
  } finally { clearTimeout(timeout); }
}

function normalizeOrefCurrentAlerts(payload) {
  if (!payload) return [];
  const rows = Array.isArray(payload) ? payload : [payload];
  return rows.flatMap((row, index) => {
    if (!row || typeof row !== "object") return [];
    const areas = Array.isArray(row.data) ? row.data : Array.isArray(row.cities) ? row.cities : Array.isArray(row.areas) ? row.areas : [];
    const cleanedAreas = [...new Set(areas.map((area) => String(area || "").trim()).filter(Boolean))];
    if (!cleanedAreas.length && !row.title && !row.desc) return [];
    return [{
      id: String(row.id || row.notificationId || `${row.cat || row.category || "alert"}-${index}-${cleanedAreas.join("|")}`),
      category: String(row.cat ?? row.category ?? row.threat ?? ""),
      title: String(row.title || row.desc || "התרעה פעילה").trim(),
      description: String(row.desc || row.description || "").trim(),
      areas: cleanedAreas,
      isDrill: Boolean(row.isDrill || row.drill),
      rawTime: row.time || row.alertDate || null
    }];
  }).filter((alert) => !alert.isDrill);
}


async function queueOrefAlerts(env,alerts=[]){
  const stub=pushHubStub(env);if(!stub)return;
  const rows=(Array.isArray(alerts)?alerts:[]).filter((a)=>a&&!a.isDrill).slice(0,10);
  for(const alert of rows){
    const areas=[...new Set((Array.isArray(alert.areas)?alert.areas:[]).map((x)=>String(x||"").trim()).filter(Boolean))].slice(0,80);
    const id=String(alert.id||"").slice(0,160);
    const title=cleanPushTitle(alert.title||"התרעת פיקוד העורף")||"התרעת פיקוד העורף";
    const fingerprint=`oref:${await sha256Base64Url(`${id}|${title}|${areas.join("|")}`)}`;
    const notification={fingerprint,kind:"oref",title:`🚨 ${title}`,body:areas.length?areas.slice(0,8).join(", "):"התקבלה התרעה חדשה של פיקוד העורף",url:"/",areas,at:new Date().toISOString()};
    await stub.fetch(new Request("https://push.internal/queue",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(notification)}));
  }
}

function mediaQueryVariants(raw, category = "other") {
  const text = cleanText(raw || "");
  const pieces = text.split("|").map((x) => cleanText(x)).filter(Boolean);
  const map = [
    [/איראן|איראני/g, "Iran"], [/כווית/g, "Kuwait"], [/בחריין/g, "Bahrain"], [/קטאר/g, "Qatar"],
    [/ירדן/g, "Jordan"], [/עיראק/g, "Iraq"], [/סעודיה/g, "Saudi Arabia"], [/תימן/g, "Yemen"],
    [/טהרן/g, "Tehran"], [/לבנון|ביירות/g, "Lebanon Beirut"], [/סוריה|דמשק/g, "Syria Damascus"],
    [/ישראל/g, "Israel"], [/נתניהו/g, "Benjamin Netanyahu"], [/טראמפ/g, "Donald Trump"],
    [/כנסת/g, "Knesset Israel"], [/צה.?ל/g, "Israel Defense Forces"], [/משטרה/g, "Israel Police"],
    [/טיל|טילים|ירי|שיגור/g, "missile"], [/תקיפה|מתקפה|הפצצה/g, "air strike"],
    [/יירוט|יירוטים/g, "interception"], [/מטוס|חיל האוויר/g, "military aircraft"],
    [/נעדר|נעדרת|חיפושים/g, "missing person"], [/אותר|נמצא|נמצאה/g, "rescue"],
    [/בחירות/g, "election Israel"], [/ממשלה|קואליציה/g, "Israel government"],
    [/נתב.?ג|נמל התעופה/g, "Ben Gurion Airport"], [/בורסה|מניות|שוק ההון/g, "stock market Israel"],
    [/טלפון|טלפונים|סלולרי|נייד/g, "smartphone mobile phone"], [/הודעת אזהרה|הודעת חירום|התראת חירום|אזעקת חירום/g, "emergency alert notification"],
    [/התרעה|אזהרה/g, "alert warning"], [/אזרחים/g, "civilians people"],
    [/אופנוע|אופנוען|רוכב אופנוע/g, "motorcycle rider"], [/קטנוע/g, "motor scooter rider"],
    [/תאונה|התנגשות|נפצע|נפגע/g, "traffic accident"], [/מכונית|רכב/g, "car vehicle"],
    [/צאט.?גיפיטי|צ.?אט.?ג.?יפיטי|ChatGPT/gi, "OpenAI ChatGPT"], [/OpenAI/gi, "OpenAI"],
    [/תקלה|שיבוש|לא עובד|נפל/g, "service outage"]
  ];
  const translate = (value) => {
    let q = cleanText(value);
    for (const [re, replacement] of map) q = q.replace(re, ` ${replacement} `);
    const normalized = q.replace(/[א-ת]+/g, " ").replace(/[|•:;–—-]+/g, " ").replace(/\s+/g, " ").trim();
    const seen = new Set();
    return normalized.split(/\s+/).filter((token) => {
      const key = token.toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).join(" ");
  };
  const fallbackMap = {
    security: "Israel military security",
    politics: "Knesset Israel politics",
    diplomatic: "Israel diplomacy",
    other: ""
  };
  const out = [];
  const push = (q, specificity = 1) => {
    q = cleanText(q).slice(0, 100);
    if (q && !out.some((row) => row.q === q)) out.push({ q, specificity });
  };

  // High-value subject rescue queries. These remain semantically strict, but
  // avoid ending with no image merely because a long event query was too specific.
  const concepts = mediaConcepts(text);
  if (concepts.has("openai")) {
    push("OpenAI logo", 4);
    push("ChatGPT OpenAI", 4);
  }
  if (concepts.has("motorcycle")) {
    push("motorcycle rider", 4);
    push("motorcycle", 3);
  }
  if (concepts.has("scooter")) {
    push("motor scooter", 4);
  }
  // Exact structured pieces first: person -> entity/action pair -> strongest headline.
  pieces.slice(0, 4).forEach((part, idx) => {
    const translated = translate(part);
    if (translated) push(translated, idx === 0 ? 4 : idx === 1 ? 3 : 2);
    if (/^[\p{L}\p{N}\s.'’-]{3,70}$/u.test(part)) push(part, idx === 0 ? 4 : 2);
  });
  // Then useful combinations of English entities/actions.
  const translatedAll = translate(text);
  if (translatedAll) {
    const words = translatedAll.split(/\s+/).filter(Boolean);
    if (words.length > 2) push(words.slice(0, 7).join(" "), 2);
    // Location-only queries are allowed only as illustrative archive imagery.
    // They are deliberately lower-specificity than event/person searches.
    const knownPlaces = ["Iran","Kuwait","Bahrain","Qatar","Jordan","Iraq","Saudi Arabia","Yemen","Tehran","Lebanon","Beirut","Syria","Damascus","Israel","Ben Gurion Airport","Knesset Israel"];
    for (const place of knownPlaces) if (translatedAll.toLowerCase().includes(place.toLowerCase())) push(place, 1);
  }
  // Generic category imagery is a true last resort. It is explicitly marked as
  // illustrative in the response so users never mistake an archive/location photo
  // for a photograph of the exact event.
  const genericFallback = fallbackMap[category] || fallbackMap.other;
  if (genericFallback) push(genericFallback, 0);
  return out.slice(0, 10);
}

function mediaTokens(value) {
  return new Set(cleanText(value || "").toLowerCase()
    .replace(/[^a-z0-9\u0590-\u05ff ]+/g, " ")
    .split(/\s+/).filter((t) => t.length >= 3 && !["the","and","with","from","news","israel","photo","image","file","חדשות","דיווח","דיווחים"].includes(t)));
}

function mediaConcepts(value) {
  const text = cleanText(value || "").toLowerCase();
  const concepts = new Set();
  const has = (re) => re.test(text);

  if (has(/\bmotorcycle\b|\bmotorbike\b|אופנוע/)) concepts.add("motorcycle");
  if (has(/\bscooter\b|קטנוע/)) concepts.add("scooter");
  if (has(/\bcar\b|\bautomobile\b|\bvehicle\b|מכונית|רכב/)) concepts.add("car");
  if (has(/\broad\b|\bstreet\b|\bhighway\b|\broute\b|כביש|דרך/)) concepts.add("road");

  if (has(/\bopenai\b|\bchatgpt\b|\bgpt[- ]?[0-9a-z]*\b|צאט.?גיפיטי/)) concepts.add("openai");
  if (has(/\banthropic\b|\bclaude\b/)) concepts.add("anthropic");
  if (has(/\bgemini\b/)) concepts.add("gemini");
  if (has(/\bmicrosoft\b|\bwindows\b|\bazure\b/)) concepts.add("microsoft");
  if (has(/\bapple\b|אפל/)) concepts.add("apple");

  if (has(/\boutage\b|\bincident\b|\bdown\b|תקלה|שיבוש/)) concepts.add("outage");
  if (has(/\baccident\b|\bcrash\b|\bcollision\b|תאונ|התנגש/)) concepts.add("accident");
  if (has(/\bmissile\b|\brocket\b|טיל|רקט/)) concepts.add("missile");
  if (has(/\bair strike\b|\battack\b|תקיפ|הפצצ/)) concepts.add("attack");
  if (has(/\bphone\b|\bsmartphone\b|\bmobile\b|טלפונ|סלולרי/)) concepts.add("phone");
  return concepts;
}

function mediaHardMismatch(query, candidateText, specificity = 1) {
  if (specificity < 2) return false;
  const q = mediaConcepts(query);
  const c = mediaConcepts(candidateText);

  // Named technology brands are hard requirements. A road, building or generic
  // "technology" image is not a picture for an OpenAI/ChatGPT story.
  for (const brand of ["openai","anthropic","gemini","microsoft","apple"]) {
    if (q.has(brand) && !c.has(brand)) return true;
  }

  // Vehicle type is also a hard requirement. Do not substitute a car for a
  // motorcycle or a generic road for a motorcycle rider.
  if (q.has("motorcycle") && !c.has("motorcycle")) return true;
  if (q.has("scooter") && !c.has("scooter")) return true;

  // For an event query, a pure road/place image is too weak when it contains
  // none of the event/subject concepts.
  const eventConcepts = ["outage","accident","missile","attack","phone"];
  const requiredEvents = eventConcepts.filter((x) => q.has(x));
  if (requiredEvents.length && !requiredEvents.some((x) => c.has(x))) {
    // A matching named subject (for example OpenAI logo) may still be a good
    // illustrative image for an outage, so allow it when the subject matches.
    const subjectMatch =
      (q.has("openai") && c.has("openai")) ||
      (q.has("motorcycle") && c.has("motorcycle")) ||
      (q.has("scooter") && c.has("scooter"));
    if (!subjectMatch) return true;
  }
  return false;
}

function mediaOverlapStats(query, candidateText) {
  const q = mediaTokens(query);
  const c = mediaTokens(candidateText);
  const matched = [...q].filter((token) => c.has(token));
  return {
    queryTokens: q.size,
    candidateTokens: c.size,
    hits: matched.length,
    matched
  };
}

function mediaCandidateScore(query, candidateText, specificity = 1) {
  if (mediaHardMismatch(query, candidateText, specificity)) return -999;
  const q = mediaTokens(query);
  const c = mediaTokens(candidateText);
  if (!q.size || !c.size) return specificity === 0 ? 0 : -10;
  let hits = 0;
  for (const token of q) if (c.has(token)) hits += 1;
  const ratio = hits / Math.max(1, q.size);
  let score = hits * 18 + ratio * 34 + specificity * 7;
  // For a specific multi-token query (for example "Iran Bahrain missile"),
  // a candidate matching only the place name is not an image of the event.
  // Push it below the exact-event threshold; a separate location-only query may
  // still use it later as clearly-labelled illustration.
  if (specificity >= 2 && q.size >= 2 && hits < 2) score -= 48;
  if (specificity >= 3 && q.size >= 3 && hits < 2) score -= 24;
  // Exact named-entity phrase overlap is especially valuable for people/places.
  const qText = cleanText(query).toLowerCase();
  const cText = cleanText(candidateText).toLowerCase();
  if (qText.length >= 5 && cText.includes(qText)) score += 34;
  return score;
}

function commonsLicenseAllowed(name) {
  const value = cleanText(name || "").toUpperCase();
  return value.includes("PUBLIC DOMAIN") || value === "CC0" || value.startsWith("CC BY ") || value.startsWith("CC BY-") || value.startsWith("CC BY-SA");
}

function stripHtmlText(value) {
  return cleanText(String(value || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&"));
}

async function findCommonsMedia(query, specificity = 1) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("origin", "*");
  api.searchParams.set("generator", "search");
  api.searchParams.set("gsrnamespace", "6");
  api.searchParams.set("gsrlimit", "36");
  const queryConcepts = mediaConcepts(query);
  const needsVector = queryConcepts.has("openai") || queryConcepts.has("anthropic") || queryConcepts.has("gemini") || queryConcepts.has("microsoft") || queryConcepts.has("apple");
  api.searchParams.set("gsrsearch", needsVector ? query : `${query} filetype:bitmap`);
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url|extmetadata");
  api.searchParams.set("iiurlwidth", "1400");
  try {
    const res = await fetch(api.toString(), { headers: { "Accept": "application/json", "User-Agent": "Koteret Plus/77 (+strict semantic media resolver)" } });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data?.query?.pages || {});
    const candidates = [];
    for (const page of pages) {
      const info = page?.imageinfo?.[0];
      const meta = info?.extmetadata || {};
      const license = meta?.LicenseShortName?.value || "";
      const url = info?.thumburl || info?.url || "";
      if (!url || !commonsLicenseAllowed(license)) continue;
      const creator = stripHtmlText(meta?.Artist?.value || meta?.Credit?.value || "");
      const description = stripHtmlText(meta?.ImageDescription?.value || meta?.ObjectName?.value || meta?.Categories?.value || "");
      const candidateText = `${page?.title || ""} ${description}`;
      const overlap = mediaOverlapStats(query, candidateText);
      const score = mediaCandidateScore(query, candidateText, specificity);
      candidates.push({ score, overlap, candidateText, description, page, info, meta, license, url, creator });
    }
    candidates.sort((a,b) => b.score-a.score);
    const best = candidates[0];
    // Specific queries must actually match. A wrong photo is worse than a branded fallback.
    const concepts = mediaConcepts(query);
    const subjectStrict = concepts.has("openai") || concepts.has("motorcycle") || concepts.has("scooter");
    const threshold = subjectStrict
      ? (specificity >= 3 ? 16 : specificity >= 2 ? 14 : 12)
      : (specificity >= 3 ? 18 : specificity >= 2 ? 16 : specificity >= 1 ? 12 : 70);
    if (!best || best.score < threshold) return null;

    // V76 relevance gate: for a specific query, one coincidental word is not
    // enough. This is the rule that prevents a random Israeli celebrity/person
    // photo from being used for an unrelated cabinet/security story.
    const minHits = 1;
    if (best.overlap.hits < minHits) return null;

    const attributionRequired = !String(best.license).toUpperCase().includes("PUBLIC DOMAIN") && String(best.license).toUpperCase() !== "CC0";
    return {
      url: best.url,
      thumbnail: best.info?.thumburl || best.url,
      creator: best.creator,
      license: best.license,
      licenseUrl: best.meta?.LicenseUrl?.value || "",
      landingUrl: best.info?.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(best.page?.title || "")}`,
      attribution: [best.creator, best.license, "Wikimedia Commons"].filter(Boolean).join(" · "),
      shortAttribution: attributionRequired ? [best.creator || "Wikimedia Commons", best.license].filter(Boolean).join(" · ") : "Wikimedia Commons · נחלת הכלל",
      provider: "Wikimedia Commons",
      relevanceScore: Math.round(best.score),
      overlapHits: best.overlap.hits,
      matchedTokens: best.overlap.matched,
      candidateTitle: cleanText(best.page?.title || ""),
      candidateDescription: cleanText(best.description || "").slice(0, 260),
      illustrative: false
    };
  } catch {}
  return null;
}

async function findOpenverseMedia(query, specificity = 1) {
  const searchUrl = new URL("https://api.openverse.org/v1/images/");
  searchUrl.searchParams.set("q", query);
  searchUrl.searchParams.set("page_size", "24");
  searchUrl.searchParams.set("license", "cc0,pdm");
  searchUrl.searchParams.set("mature", "false");
  try {
    const res = await fetch(searchUrl.toString(), { headers: { "Accept": "application/json", "User-Agent": "Koteret Plus/77 (+news aggregator; strict semantic media lookup)" } });
    if (!res.ok) return null;
    const data = await res.json();
    const allowed = new Set(["cc0","pdm"]);
    const results = Array.isArray(data?.results) ? data.results : [];
    const candidates = [];
    for (const img of results) {
      const license = String(img?.license || "").toLowerCase();
      const mediaUrl = img?.url || img?.thumbnail || "";
      if (!allowed.has(license) || !/^https?:\/\//.test(mediaUrl)) continue;
      const tagText = Array.isArray(img?.tags) ? img.tags.map((t) => t?.name || t).join(" ") : "";
      const candidateText = `${img?.title || ""} ${img?.creator || ""} ${tagText}`;
      const overlap = mediaOverlapStats(query, candidateText);
      const score = mediaCandidateScore(query, candidateText, specificity);
      candidates.push({ img, license, mediaUrl, candidateText, tagText, overlap, score });
    }
    candidates.sort((a,b) => b.score-a.score);
    const best = candidates[0];
    const concepts = mediaConcepts(query);
    const subjectStrict = concepts.has("openai") || concepts.has("motorcycle") || concepts.has("scooter");
    const threshold = subjectStrict
      ? (specificity >= 3 ? 16 : specificity >= 2 ? 14 : 12)
      : (specificity >= 3 ? 18 : specificity >= 2 ? 16 : specificity >= 1 ? 12 : 72);
    if (!best || best.score < threshold) return null;
    const minHits = 1;
    if (best.overlap.hits < minHits) return null;
    const img = best.img;
    const creator = cleanText(img?.creator || "");
    return {
      url: best.mediaUrl,
      thumbnail: img?.thumbnail || best.mediaUrl,
      creator,
      license: img?.license || "",
      licenseUrl: img?.license_url || "",
      landingUrl: img?.foreign_landing_url || img?.detail_url || "",
      attribution: img?.attribution || [creator, String(img?.license || "").toUpperCase(), "Openverse"].filter(Boolean).join(" · "),
      shortAttribution: [creator || "Openverse", String(img?.license || "").toUpperCase()].filter(Boolean).join(" · "),
      provider: img?.provider || "Openverse",
      relevanceScore: Math.round(best.score),
      overlapHits: best.overlap.hits,
      matchedTokens: best.overlap.matched,
      candidateTitle: cleanText(img?.title || ""),
      candidateDescription: cleanText(best.tagText || "").slice(0, 260),
      illustrative: false
    };
  } catch {}
  return null;
}


const ARTICLE_IMAGE_TIMEOUT_MS = 5200;
const ARTICLE_IMAGE_CACHE_TTL_SECONDS = 3600;
const ARTICLE_IMAGE_NEGATIVE_TTL_SECONDS = 45;

function normalizedHostname(value) {
  try { return new URL(String(value || "")).hostname.toLowerCase().replace(/^www\./, ""); }
  catch { return ""; }
}

const ARTICLE_SOURCE_HOSTS = new Set(SOURCES.flatMap((source) => [source.home, source.url])
  .map(normalizedHostname).filter(Boolean));

function articleSourceForUrl(rawUrl) {
  let target;
  try { target = new URL(String(rawUrl || "")); } catch { return null; }
  if (!/^https?:$/.test(target.protocol) || target.username || target.password) return null;
  const host = target.hostname.toLowerCase().replace(/^www\./, "");
  const allowed = [...ARTICLE_SOURCE_HOSTS].some((known) => host === known || host.endsWith(`.${known}`) || known.endsWith(`.${host}`));
  if (!allowed) return null;
  return SOURCES.find((source) => {
    const hosts = [source.home, source.url].map(normalizedHostname).filter(Boolean);
    return hosts.some((known) => host === known || host.endsWith(`.${known}`) || known.endsWith(`.${host}`));
  }) || { name: host };
}

function metaContent(html, keys = []) {
  const source = String(html || "");
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patterns = [
      new RegExp(`<meta[^>]+(?:property|name|itemprop)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name|itemprop)=["']${escaped}["'][^>]*>`, "i")
    ];
    for (const rx of patterns) {
      const match = source.match(rx);
      if (match?.[1]) return decodeEntities(match[1]);
    }
  }
  return "";
}

function articleJsonLdImage(html, base) {
  const scripts = [...String(html || "").matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const scan = (node) => {
    if (!node) return "";
    if (Array.isArray(node)) {
      for (const child of node) { const found = scan(child); if (found) return found; }
      return "";
    }
    if (typeof node !== "object") return "";
    const type = String(node['@type'] || "").toLowerCase();
    if (/newsarticle|article|reportage|liveblogposting|imageobject/.test(type) || node.headline) {
      const raw = jsonLdImage(node.image || node.thumbnailUrl || node.associatedMedia, base);
      if (raw) return raw;
    }
    for (const value of Object.values(node)) {
      if (value && typeof value === "object") { const found = scan(value); if (found) return found; }
    }
    return "";
  };
  for (const match of scripts) {
    try { const found = scan(JSON.parse(decodeEntities(match[1].trim()))); if (found) return found; } catch {}
  }
  return "";
}

function articleBodyImage(html, base) {
  const source = String(html || "");
  const scopes = [
    source.match(/<article\b[\s\S]{0,180000}?<\/article>/i)?.[0] || "",
    source.match(/<main\b[\s\S]{0,180000}?<\/main>/i)?.[0] || "",
    source.slice(0,180000)
  ];
  for (const scope of scopes) {
    for (const match of scope.matchAll(/<img\b[^>]*(?:src|data-src|data-original)=["']([^"']+)["'][^>]*>/gi)) {
      const raw = absoluteUrl(decodeEntities(match[1]), base);
      const clean = sanitizeSourceImageUrl(raw);
      if (clean) return clean;
    }
  }
  return "";
}

function extractArticlePrimaryImage(html, articleUrl) {
  const meta = metaContent(html, ["og:image:secure_url","og:image","twitter:image","twitter:image:src","image"]);
  const metaUrl = sanitizeSourceImageUrl(absoluteUrl(meta, articleUrl));
  if (metaUrl) return metaUrl;
  const jsonLd = sanitizeSourceImageUrl(articleJsonLdImage(html, articleUrl));
  if (jsonLd) return jsonLd;
  return articleBodyImage(html, articleUrl) || null;
}

async function handleSourceArticleImage(url, ctx) {
  const articleUrl = String(url.searchParams.get("url") || "").trim().slice(0, 1800);
  const source = articleSourceForUrl(articleUrl);
  if (!source) return cors(json({ image: null, error: "source_not_allowed" }, 400, { "Cache-Control":"no-store" }));

  const cache = caches.default;
  const cacheKey = new Request(`https://hadashota.source-image.local/v138-stable?u=${encodeURIComponent(articleUrl)}`);
  const cached = await cache.match(cacheKey);
  if (cached) return cors(cached);

  let payload = { image: null };
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort("article_image_timeout"), ARTICLE_IMAGE_TIMEOUT_MS);
    let response;
    try {
      response = await fetch(articleUrl, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "Accept": "text/html,application/xhtml+xml",
          "User-Agent": "Mozilla/5.0 (compatible; KoteretPlus/165; +https://koteretplus.com/)"
        }
      });
    } finally { clearTimeout(timer); }

    const contentType = response.headers.get("content-type") || "";
    if (response.ok && /text\/html|application\/xhtml\+xml/i.test(contentType)) {
      const html = (await response.text()).slice(0, 650000);
      const imageUrl = extractArticlePrimaryImage(html, articleUrl);
      if (imageUrl) {
        const sourceName = cleanText(source?.name || source?.publisher || normalizedHostname(articleUrl));
        const photoCredit = extractPhotoCredit(html, imageUrl);
        const imageCaption = metaContent(html, ["og:image:alt","twitter:image:alt"]);
        payload = {
          image: {
            url: imageUrl,
            sourceUrl: articleUrl,
            sourceName,
            photographer: photoCredit || "",
            credit: photoCredit ? `צילום: ${photoCredit} / ${sourceName}` : `מקור תמונה: ${sourceName}`,
            caption: cleanText(imageCaption || "").slice(0,180),
            provider: "original-article"
          }
        };
      }
    }
  } catch {}

  const ttl = payload.image ? ARTICLE_IMAGE_CACHE_TTL_SECONDS : ARTICLE_IMAGE_NEGATIVE_TTL_SECONDS;
  const response = json(payload, 200, { "Cache-Control": `public, max-age=0, s-maxage=${ttl}` });
  loggedWaitUntil(ctx, cache.put(cacheKey, response.clone()), "media cache write");
  return cors(response);
}

async function handleOpenMedia(url, ctx) {
  const raw = cleanText(url.searchParams.get("q") || "").slice(0, 280);
  const category = cleanText(url.searchParams.get("category") || "other");
  const queries = mediaQueryVariants(raw, category);
  const cache = caches.default;
  const cacheKey = new Request(`https://hadashota.media.local/v120-original-first?q=${encodeURIComponent(raw)}&c=${encodeURIComponent(category)}`);
  const cached = await cache.match(cacheKey);
  if (cached) return cors(cached);

  let chosen = null;
  let matchedQuery = "";
  // Commons tends to be strongest for named people, places and public institutions.
  for (const row of queries.filter((x) => x.specificity > 0).slice(0, 5)) {
    chosen = await findCommonsMedia(row.q, row.specificity);
    if (chosen) { matchedQuery = row.q; break; }
  }
  // V97: broader coverage via Openverse, but only CC0/Public Domain.
  // Attribution-bearing licenses remain excluded here.
  if (!chosen) {
    for (const row of queries.filter((x) => x.specificity > 0).slice(0, 6)) {
      chosen = await findOpenverseMedia(row.q, row.specificity);
      if (chosen) { matchedQuery = row.q; break; }
    }
  }
  const payload = chosen ? {
    image: { ...chosen, matchedQuery },
    note: "Wikimedia Commons reusable-media result. File-page attribution and license metadata are preserved."
  } : { image: null };
  const ttl = chosen ? 1800 : 300;
  const response = json(payload, 200, { "Cache-Control": `public, max-age=0, s-maxage=${ttl}` });
  loggedWaitUntil(ctx, cache.put(cacheKey, response.clone()), "source image cache write");
  return response;
}

async function handleUtilities(request, ctx) {
  const requestUrl = new URL(request.url);
  const cityKey = CITIES[requestUrl.searchParams.get("city")] ? requestUrl.searchParams.get("city") : "telaviv";
  const city = CITIES[cityKey];

  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.searchParams.set("latitude", String(city.latitude));
  weatherUrl.searchParams.set("longitude", String(city.longitude));
  weatherUrl.searchParams.set("current", "temperature_2m,apparent_temperature,weather_code,wind_speed_10m");
  weatherUrl.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_probability_max");
  weatherUrl.searchParams.set("timezone", "Asia/Jerusalem");
  weatherUrl.searchParams.set("forecast_days", "2");

  const shabbatUrl = new URL("https://www.hebcal.com/shabbat");
  shabbatUrl.searchParams.set("cfg", "json");
  shabbatUrl.searchParams.set("latitude", String(city.latitude));
  shabbatUrl.searchParams.set("longitude", String(city.longitude));
  shabbatUrl.searchParams.set("tzid", "Asia/Jerusalem");
  shabbatUrl.searchParams.set("b", String(city.candleMinutes));
  shabbatUrl.searchParams.set("M", "on");
  shabbatUrl.searchParams.set("leyning", "off");

  // Market quotes are requested fresh on every utilities refresh. Yahoo Finance is
  // the primary global market source; Bank of Israel remains a safety fallback.
  const usdMarketUrl = "https://query1.finance.yahoo.com/v8/finance/chart/USDILS=X?interval=1m&range=1d";
  const eurMarketUrl = "https://query1.finance.yahoo.com/v8/finance/chart/EURILS=X?interval=1m&range=1d";
  const exchangeRatesUrl = "https://boi.org.il/PublicApi/GetExchangeRates?asXML=true";
  const frankfurterUrl = "https://api.frankfurter.dev/v1/latest?base=USD&symbols=ILS,EUR";

  const [weatherResult, shabbatResult, usdMarketResult, eurMarketResult, frankfurterResult, boiResult] = await Promise.allSettled([
    fetchJsonWithTimeout(weatherUrl.toString(), 4500),
    fetchJsonWithTimeout(shabbatUrl.toString(), 4500),
    fetchJsonFreshWithTimeout(usdMarketUrl, 5000),
    fetchJsonFreshWithTimeout(eurMarketUrl, 5000),
    fetchJsonWithTimeout(frankfurterUrl, 5000),
    fetchTextWithTimeout(exchangeRatesUrl, 5000)
  ]);

  const weather = weatherResult.status === "fulfilled" ? normalizeWeather(weatherResult.value) : null;
  const shabbat = shabbatResult.status === "fulfilled" ? normalizeShabbat(shabbatResult.value) : null;
  const usdMarket = usdMarketResult.status === "fulfilled" ? normalizeYahooFx(usdMarketResult.value) : null;
  const eurMarket = eurMarketResult.status === "fulfilled" ? normalizeYahooFx(eurMarketResult.value) : null;
  const frankfurterRates = frankfurterResult.status === "fulfilled" ? normalizeFrankfurterFx(frankfurterResult.value) : null;
  const boiRates = boiResult.status === "fulfilled" ? normalizeBoiExchangeRates(boiResult.value) : null;

  let exchangeRates = null;
  if (Number.isFinite(usdMarket?.rate) || Number.isFinite(eurMarket?.rate)) {
    exchangeRates = {
      USD: Number.isFinite(usdMarket?.rate) ? usdMarket.rate : frankfurterRates?.USD ?? boiRates?.USD ?? null,
      EUR: Number.isFinite(eurMarket?.rate) ? eurMarket.rate : frankfurterRates?.EUR ?? boiRates?.EUR ?? null,
      date: usdMarket?.timestamp || eurMarket?.timestamp || new Date().toISOString(),
      source: "Yahoo Finance",
      live: true
    };
  } else if (frankfurterRates) {
    exchangeRates = { ...frankfurterRates, live: false, online: true };
  } else if (boiRates) {
    exchangeRates = { ...boiRates, live: false, online: false };
  }

  return json({
    ok: !!(weather || shabbat || exchangeRates),
    city: { key: cityKey, name: city.name },
    generatedAt: new Date().toISOString(),
    weather,
    shabbat,
    exchangeRates
  }, 200, {
    "Cache-Control": "no-store, max-age=0"
  });
}

async function fetchJsonWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HadashotaNews/1.0; +news-aggregator)",
        "Accept": "application/json"
      },
      cf: { cacheEverything: true, cacheTtl: 600 }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJsonFreshWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HadashotaNews/1.0; +news-aggregator)",
        "Accept": "application/json",
        "Cache-Control": "no-cache"
      },
      cf: { cacheEverything: false, cacheTtl: 0 }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}


function normalizeFrankfurterFx(data) {
  const ilsPerUsd = Number(data?.rates?.ILS);
  const eurPerUsd = Number(data?.rates?.EUR);
  const USD = Number.isFinite(ilsPerUsd) ? ilsPerUsd : null;
  const EUR = Number.isFinite(ilsPerUsd) && Number.isFinite(eurPerUsd) && eurPerUsd > 0 ? ilsPerUsd / eurPerUsd : null;
  if (!Number.isFinite(USD) && !Number.isFinite(EUR)) return null;
  return {
    USD,
    EUR,
    date: data?.date || null,
    source: "Frankfurter"
  };
}

function normalizeYahooFx(data) {
  const result = data?.chart?.result?.[0];
  if (!result) return null;
  const meta = result.meta || {};
  let rate = Number(meta.regularMarketPrice);

  if (!Number.isFinite(rate)) {
    const closes = result.indicators?.quote?.[0]?.close;
    if (Array.isArray(closes)) {
      for (let i = closes.length - 1; i >= 0; i -= 1) {
        const value = Number(closes[i]);
        if (Number.isFinite(value)) {
          rate = value;
          break;
        }
      }
    }
  }

  if (!Number.isFinite(rate)) return null;
  const marketTime = Number(meta.regularMarketTime);
  return {
    rate,
    timestamp: Number.isFinite(marketTime) ? new Date(marketTime * 1000).toISOString() : new Date().toISOString()
  };
}

async function fetchTextWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HadashotaNews/1.0; +news-aggregator)",
        "Accept": "application/xml,text/xml,text/plain;q=0.9,*/*;q=0.8"
      },
      cf: { cacheEverything: true, cacheTtl: 300 }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeWeather(data) {
  if (!data?.current) return null;
  return {
    temperature: numberOrNull(data.current.temperature_2m),
    apparentTemperature: numberOrNull(data.current.apparent_temperature),
    weatherCode: numberOrNull(data.current.weather_code),
    windSpeed: numberOrNull(data.current.wind_speed_10m),
    max: numberOrNull(data.daily?.temperature_2m_max?.[0]),
    min: numberOrNull(data.daily?.temperature_2m_min?.[0]),
    rainChance: numberOrNull(data.daily?.precipitation_probability_max?.[0])
  };
}

function normalizeShabbat(data) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const candles = items.find((item) => item.category === "candles");
  const havdalah = items.find((item) => item.category === "havdalah");
  const parasha = items.find((item) => item.category === "parashat");
  return {
    candleLighting: candles?.date || null,
    havdalah: havdalah?.date || null,
    parasha: cleanText(parasha?.hebrew || parasha?.title || "")
  };
}

function normalizeBoiExchangeRates(xml) {
  const source = String(xml || "");
  if (!source) return null;

  const readRate = (code) => {
    const blocks = source.match(/<(?:ExchangeRate|ExchangeRateDTO|ExchangeRateResponseDTO|ExchangeRateResponseCollectioDTO)[^>]*>[\s\S]*?<\/(?:ExchangeRate|ExchangeRateDTO|ExchangeRateResponseDTO|ExchangeRateResponseCollectioDTO)>/gi) || [source];
    for (const block of blocks) {
      if (!new RegExp(`<Key>\\s*${code}\\s*</Key>`, "i").test(block)) continue;
      const match = block.match(/<CurrentExchangeRate>\s*([0-9.]+)\s*<\/CurrentExchangeRate>/i);
      const rate = match ? Number(match[1]) : NaN;
      if (Number.isFinite(rate)) return rate;
    }

    const aroundKey = source.match(new RegExp(`<Key>\\s*${code}\\s*</Key>[\\s\\S]{0,1200}?<CurrentExchangeRate>\\s*([0-9.]+)`, "i"));
    const beforeKey = source.match(new RegExp(`<CurrentExchangeRate>\\s*([0-9.]+)\\s*<\\/CurrentExchangeRate>[\\s\\S]{0,1200}?<Key>\\s*${code}\\s*</Key>`, "i"));
    const value = Number(aroundKey?.[1] || beforeKey?.[1]);
    return Number.isFinite(value) ? value : null;
  };

  const USD = readRate("USD");
  const EUR = readRate("EUR");
  if (!Number.isFinite(USD) && !Number.isFinite(EUR)) return null;

  const dateMatch = source.match(/<(?:LastUpdate|UpdateDate|Date)>\s*([^<]+)\s*<\/(?:LastUpdate|UpdateDate|Date)>/i);
  return { USD, EUR, date: dateMatch?.[1]?.trim() || null, source: "Bank of Israel" };
}

function numberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function getShardSources(shard) {
  const mainstreamOrder = new Map([
    ["ynet", 120], ["walla", 118], ["n12", 116], ["kan", 114], ["israelhayom", 112],
    ["13tv", 110], ["maariv", 108], ["jpost", 102], ["timesofisrael", 100], ["globes", 96],
    ["calcalist", 92], ["srugim", 88], ["arutz7", 86], ["kikar", 84], ["now14", 82]
  ]);
  const priority = (source) => {
    if (source.kind === "telegram") {
      return (source.official ? 120 : 0)
        + (source.verified ? 35 : 0)
        + (source.independent ? -5 : 0);
    }
    return (mainstreamOrder.get(source.publisher) || 60)
      + (source.adapter === "rss" ? 8 : source.adapter === "jsonld" ? 4 : 0)
      + (source.official ? 2 : 0);
  };

  const sites = SOURCES
    .filter((source) => source.kind !== "telegram")
    .sort((a, b) => priority(b) - priority(a));

  const telegram = SOURCES
    .filter((source) => source.kind === "telegram")
    .sort((a, b) => priority(b) - priority(a));

  const shardMap = {
    "sites-1": sites.slice(0, 8),
    "sites-2": sites.slice(8, 16),
    "sites-3": sites.slice(16, 24),
    "telegram-1": telegram.slice(0, 7),
    "telegram-2": telegram.slice(7, 14),
    "telegram-3": telegram.slice(14, 21),

    // Backward-compatible aliases for diagnostics/manual inspection only.
    "sites": sites,
    "telegram": telegram
  };

  return shardMap[shard] || sites;
}


function summarizeSourceHealth(settled, now, cutoff) {
  return settled.map((result) => {
    const recentItems = result.items.filter((item) => {
      const t = Date.parse(item.publishedAt);
      return Number.isFinite(t) && t >= cutoff && t <= now + 10 * 60 * 1000;
    });
    const lastItemAt = recentItems[0]?.publishedAt || result.items[0]?.publishedAt || null;
    const freshnessMinutes = lastItemAt ? Math.max(0, (now - Date.parse(lastItemAt)) / 60000) : 9999;
    let healthScore = 100;
    if (result.error) healthScore -= 70;
    if (!recentItems.length) healthScore -= 20;
    if (result.latencyMs > 5000) healthScore -= 18;
    else if (result.latencyMs > 3000) healthScore -= 9;
    if (freshnessMinutes > 360) healthScore -= 12;
    healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));
    const healthStatus = healthScore < 35 ? "offline" : healthScore < 70 ? "degraded" : "healthy";
    return {
      id: result.source.id,
      publisher: result.source.publisher,
      name: result.source.name,
      kind: result.source.kind,
      home: result.source.home,
      verified: !!result.source.verified,
      official: !!result.source.official,
      independent: !!result.source.independent,
      itemCount: recentItems.length,
      latencyMs: result.latencyMs,
      lastItemAt,
      healthScore,
      healthStatus,
      error: result.error || null
    };
  }).sort((a,b) =>
    Number(b.official) - Number(a.official) ||
    b.healthScore - a.healthScore ||
    Date.parse(b.lastItemAt || 0) - Date.parse(a.lastItemAt || 0)
  );
}

const NEWS_BUNDLE_SHARDS = ["sites-1", "sites-2", "sites-3", "telegram-1", "telegram-2", "telegram-3"];

async function handleNewsBundle(request, env, ctx) {
  const requestUrl = new URL(request.url);
  const presenceDeviceId = String(requestUrl.searchParams.get("presenceDeviceId") || "").replace(/[^a-zA-Z0-9._:-]/g, "").slice(0, 120);
  if (presenceDeviceId) {
    loggedWaitUntil(ctx, adminHubCall(env, "/presence", { deviceId: presenceDeviceId, page: "home" }), "presence update");
  }

  const cache = caches.default;
  const payloads = await Promise.all(NEWS_BUNDLE_SHARDS.map(async (shard) => {
    const cacheKey = new Request(`${PUBLIC_SITE_ORIGIN}/api/news?shard=${encodeURIComponent(shard)}&v=119`, { method: "GET" });
    const hit = await cache.match(cacheKey);
    if (!hit) return null;
    try {
      const payload = await hit.json();
      if (!payload || !Array.isArray(payload.items)) return null;
      payload.servedFromCache = true;
      payload.servedAt = new Date().toISOString();
      return payload;
    } catch (error) {
      console.warn(`news bundle parse ${shard} failed`, error);
      return null;
    }
  }));

  const missing = NEWS_BUNDLE_SHARDS.filter((_, index) => !payloads[index]);
  if (missing.length) {
    return cors(json({ ok: false, bundleMiss: true, missing }, 503, {
      "Cache-Control": "no-store",
      "X-Hadashota-Version": "214.0.0"
    }));
  }

  return cors(json({
    ok: true,
    generatedAt: new Date().toISOString(),
    payloads
  }, 200, {
    "Cache-Control": "no-store, max-age=0",
    "X-Hadashota-Version": "214.0.0",
    "X-Hadashota-Bundle": "HIT"
  }));
}

async function handleNews(request, env, ctx) {
  const requestUrl = new URL(request.url);
  const requestedShard = String(requestUrl.searchParams.get("shard") || "sites-1");
  const shard = /^(sites|telegram)(-[123])?$/.test(requestedShard) ? requestedShard : "sites-1";
  const forceRequested = requestUrl.searchParams.get("force") === "1";
  const presenceDeviceId=String(requestUrl.searchParams.get("presenceDeviceId")||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120);
  const presencePage=String(requestUrl.searchParams.get("presencePage")||"home")==="escalation"?"escalation":"home";
  if(presenceDeviceId&&ctx?.waitUntil)ctx.waitUntil(adminHubCall(env,"/presence",{deviceId:presenceDeviceId,page:presencePage}).catch(()=>{}));
  const shardSources = getShardSources(shard);
  const cache = caches.default;
  // V70: an explicit refresh must always reach the configured publishers.
  // Browser-specific Sec-Fetch/Origin header differences must never silently demote it.
  const force = forceRequested;

  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = "/api/news";
  cacheUrl.search = `?shard=${shard}&v=119`;
  const cacheKey = new Request(cacheUrl.toString(), { method: "GET" });

  const lastGoodUrl = new URL(request.url);
  lastGoodUrl.pathname = "/api/news-last-good";
  lastGoodUrl.search = `?shard=${shard}&v=119`;
  const lastGoodKey = new Request(lastGoodUrl.toString(), { method: "GET" });

  if (!force) {
    const cached = await cache.match(cacheKey);
    if (cached) {
      // V74 fast boot: return the shared snapshot immediately, but explicitly
      // tell the browser that this was a cache hit so it can start exactly one
      // full-source refresh in the background. This avoids a blank first paint.
      try {
        const cachedPayload = await cached.json();
        cachedPayload.servedFromCache = true;
        cachedPayload.servedAt = new Date().toISOString();
        return cors(json(cachedPayload, 200, {
          "Cache-Control": "no-store, max-age=0",
          "X-Hadashota-Version": "214.0.0",
          "X-Hadashota-Shard": shard,
          "X-Hadashota-Cache": "HIT"
        }));
      } catch {
        // Corrupt cache entry: ignore it and do one real collection below.
      }
    }
  }

  const started = Date.now();
  try {
    // Keep retries deliberately small. This protects the Free-plan external-subrequest budget
    // even when an origin redirects or several sources fail at the same time.
    const retryBudget = { remaining: 2 };
    // V70: every configured source gets one real attempt on every collection.
    // Retries happen only after that first complete pass, so late-list sources
    // (especially Telegram channels) can never be starved by an early timeout.
    const backgroundDirect=request.headers.get("X-Koteret-Background-Direct")==="1";
    const collectorConcurrency=backgroundDirect?2:4;
    const settled = await fetchSourcesWithLimit(shardSources, collectorConcurrency, retryBudget, force);
    const rawItems = settled.flatMap((result) => result.items);
    const now = Date.now();
    const cutoff = now - 30 * 60 * 60 * 1000;
    const sourceHealth = summarizeSourceHealth(settled, now, cutoff);
    const failedSources = settled
      .filter((result) => result.error)
      .map((result) => ({ id: result.source.id, name: result.source.name, error: result.error }));

    if (!rawItems.length) {
      return await lastGoodOrError(cache, lastGoodKey, shard, "all_sources_failed", sourceHealth, {
        configuredSources: SOURCES.length,
        configuredShardSources: shardSources.length,
        attemptedSources: settled.length,
        activeSources: 0,
        items: 0,
        telegramSources: 0,
        failedSources: failedSources.length,
        healthySources: sourceHealth.filter((source) => source.healthStatus === "healthy").length,
        degradedSources: sourceHealth.filter((source) => source.healthStatus === "degraded").length,
        offlineSources: sourceHealth.filter((source) => source.healthStatus === "offline").length
      });
    }

    const recent = rawItems
      .filter((item) => {
        const t = Date.parse(item.publishedAt);
        return Number.isFinite(t) && t >= cutoff && t <= now + 10 * 60 * 1000;
      })
      .map((item) => ({ ...item, category: classify(item) }))
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

    if (!recent.length) {
      return await lastGoodOrError(cache, lastGoodKey, shard, "no_recent_items", sourceHealth, {
        configuredSources: SOURCES.length,
        configuredShardSources: shardSources.length,
        attemptedSources: settled.length,
        activeSources: 0,
        items: 0,
        telegramSources: 0,
        failedSources: failedSources.length,
        healthySources: sourceHealth.filter((source) => source.healthStatus === "healthy").length,
        degradedSources: sourceHealth.filter((source) => source.healthStatus === "degraded").length,
        offlineSources: sourceHealth.filter((source) => source.healthStatus === "offline").length
      });
    }

    const clustered = clusterItems(recent).slice(0, shard.startsWith("telegram") ? 220 : 180);
    const activeSources = settled
      .map((result) => ({ ...result, recentItems: result.items.filter((item) => {
        const t = Date.parse(item.publishedAt);
        return Number.isFinite(t) && t >= cutoff && t <= now + 10 * 60 * 1000;
      }) }))
      .filter((result) => result.recentItems.length > 0)
      .map((result) => ({
        id: result.source.id,
        publisher: result.source.publisher,
        name: result.source.name,
        kind: result.source.kind,
        home: result.source.home,
        verified: !!result.source.verified,
        official: !!result.source.official,
        independent: !!result.source.independent,
        itemCount: result.recentItems.length,
        latencyMs: result.latencyMs,
        lastItemAt: result.recentItems[0]?.publishedAt || null
      }))
      .sort((a, b) => Date.parse(b.lastItemAt || 0) - Date.parse(a.lastItemAt || 0));


    // V70: if even one source produced current items, return the fresh partial
    // result instead of hiding it behind an older snapshot. The UI already marks
    // degraded sources and the lead-story policy still requires corroboration.

    const generatedAt = new Date().toISOString();
    const payload = {
      generatedAt,
      snapshotId: stableId(`${shard}|${generatedAt}|${clustered.slice(0, 12).map((item) => item.id).join("|")}`),
      refreshAfterSeconds: 30,
      shard,
      stale: false,
      partial: failedSources.length > 0,
      servedFromCache: false,
      tookMs: Date.now() - started,
      items: clustered,
      sources: sourceHealth,
      stats: {
        configuredSources: SOURCES.length,
        configuredShardSources: shardSources.length,
        attemptedSources: settled.length,
        activeSources: activeSources.length,
        items: clustered.length,
        officialSources: activeSources.filter((source) => source.official).length,
        telegramSources: activeSources.filter((source) => source.kind === "telegram").length,
        failedSources: failedSources.length,
        retriesUsed: 2 - retryBudget.remaining,
        healthySources: sourceHealth.filter((source) => source.healthStatus === "healthy").length,
        degradedSources: sourceHealth.filter((source) => source.healthStatus === "degraded").length,
        offlineSources: sourceHealth.filter((source) => source.healthStatus === "offline").length
      },
      failures: failedSources.slice(0, 12)
    };

    const response = json(payload, 200, {
      "Cache-Control": "no-store, max-age=0",
      "X-Hadashota-Version": "214.0.0",
      "X-Hadashota-Shard": shard,
      "X-Hadashota-Force": force ? "1" : "0"
    });
    const sharedSnapshotResponse = json(payload, 200, {
      "Cache-Control": "public, max-age=0, s-maxage=25",
      "X-Hadashota-Version": "214.0.0",
      "X-Hadashota-Shard": shard
    });
    const lastGoodResponse = json(payload, 200, {
      "Cache-Control": "public, max-age=0, s-maxage=7200"
    });

    loggedWaitUntil(ctx, Promise.all([
      cache.put(cacheKey, sharedSnapshotResponse),
      cache.put(lastGoodKey, lastGoodResponse)
    ]), `news cache write ${shard}`);
    return response;
  } catch (error) {
    return await lastGoodOrError(cache, lastGoodKey, shard, String(error?.message || error));
  }
}

async function lastGoodOrError(cache, lastGoodKey, shard, reason, currentSources = [], currentStats = {}) {
  const cached = await cache.match(lastGoodKey);
  if (cached) {
    try {
      const payload = await cached.json();
      const generatedMs = Date.parse(payload.generatedAt || "");
      if (!Number.isFinite(generatedMs) || Date.now() - generatedMs > 2 * 60 * 60 * 1000) {
        throw new Error("LAST_GOOD_TOO_OLD");
      }
      payload.stale = true;
      payload.staleReason = reason;
      payload.servedAt = new Date().toISOString();
      if (Array.isArray(currentSources) && currentSources.length) payload.sources = currentSources;
      payload.stats = { ...(payload.stats || {}), ...(currentStats || {}) };
      return json(payload, 200, {
        "Cache-Control": "no-store",
        "X-Hadashota-Stale": "1",
        "X-Hadashota-Version": "214.0.0"
      });
    } catch {
      // A corrupt cache entry should never prevent a proper error response.
    }
  }
  const generatedAt = new Date().toISOString();
  return json({
    generatedAt,
    snapshotId: stableId(`${shard}|empty|${generatedAt}`),
    shard,
    stale: true,
    staleReason: reason,
    partial: true,
    refreshAfterSeconds: 8,
    items: [],
    sources: Array.isArray(currentSources) ? currentSources : [],
    stats: currentStats || {},
    failures: []
  }, 200, {
    "Cache-Control": "no-store",
    "X-Hadashota-Stale": "1",
    "X-Hadashota-Version": "214.0.0"
  });
}


function enrichItemsWithPhotoCredits(items, html, source) {
  if (!Array.isArray(items) || !items.length || !html) return items;
  return items.map((item) => {
    if (!item?.imageUrl || item.imageCredit) return item;
    const credit = extractPhotoCredit(html, item.imageUrl);
    if (!credit) return item;
    return {
      ...item,
      imageCredit: credit,
      imageCreator: credit,
      imageCreditSource: cleanText(source?.name || item?.sourceName || "")
    };
  });
}

async function fetchSourcesWithLimit(sources, concurrency = 6, retryBudget = { remaining: 0 }, forceFresh = false) {
  const results = new Array(sources.length);
  const workerCount = Math.min(Math.max(1, concurrency), sources.length || 1);

  async function runIndexes(indexes, isRetry = false) {
    let cursor = 0;
    async function runner() {
      while (true) {
        const position = cursor++;
        if (position >= indexes.length) return;
        const index = indexes[position];
        const source = sources[index];
        const result = await fetchSource(source, { remaining: 0 }, forceFresh, Infinity);
        if (isRetry && results[index]) {
          result.attempts = Number(results[index].attempts || 1) + Number(result.attempts || 1);
        }
        // A retry only replaces the first result when it improves it.
        if (!isRetry || (result.items?.length || !results[index]?.items?.length)) results[index] = result;
      }
    }
    await Promise.all(Array.from({ length: Math.min(workerCount, indexes.length || 1) }, runner));
  }

  // PASS 1 — mandatory: every single configured source is attempted exactly once.
  await runIndexes(sources.map((_, index) => index), false);

  // PASS 2 — optional: only after the complete first pass, retry a small number
  // of failed/empty sources. This protects total subrequests without starving
  // any publisher or Telegram channel later in the list.
  const retryIndexes = results
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => result?.error || !result?.items?.length)
    .slice(0, Math.max(0, Number(retryBudget.remaining || 0)))
    .map(({ index }) => index);

  if (retryIndexes.length) {
    retryBudget.remaining = Math.max(0, Number(retryBudget.remaining || 0) - retryIndexes.length);
    await runIndexes(retryIndexes, true);
  }

  return results.map((result, index) => result || ({
    source: sources[index], items: [], latencyMs: 0, error: "NOT_ATTEMPTED", attempts: 0
  }));
}

async function fetchSource(source, retryBudget = { remaining: 0 }, forceFresh = false, deadlineAt = Infinity) {
  const started = Date.now();
  let lastError = null;
  let attempt = 0;

  while (attempt < 2) {
    try {
      const baseTimeoutMs = source.adapter === "telegram" ? 2200 : source.adapter === "jsonld" || source.adapter === "htmlnews" ? 2800 : 2400;
      const remainingMs = deadlineAt - Date.now();
      if (remainingMs <= 650) throw new Error("COLLECTION_DEADLINE");
      const timeoutMs = Number.isFinite(remainingMs)
        ? Math.min(baseTimeoutMs, Math.max(500, remainingMs - 180))
        : baseTimeoutMs;
      const response = await fetchWithTimeout(source.url, timeoutMs, forceFresh);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const contentLength = Number(response.headers.get("content-length") || 0);
      if (contentLength > 5_500_000) throw new Error("BODY_TOO_LARGE");

      const body = await response.text();
      let items = [];
      if (source.adapter === "rss") items = parseRss(body, source);
      if (source.adapter === "telegram") items = parseTelegram(body, source);
      if (source.adapter === "jsonld") items = parseJsonLd(body, source);
      if (source.adapter === "htmlnews") items = parseOfficialHtmlNews(body, source);

      items = dedupeSameSource(items)
        .filter((item) => item.title && item.url && item.publishedAt)
        .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
        .slice(0, 80);

      return { source, items, latencyMs: Date.now() - started, error: null, attempts: attempt + 1 };
    } catch (error) {
      lastError = error;
      const retryable = isRetryableSourceError(error);
      const enoughTimeForRetry = !Number.isFinite(deadlineAt) || deadlineAt - Date.now() > 1_200;
      if (attempt === 0 && retryable && retryBudget.remaining > 0 && enoughTimeForRetry) {
        retryBudget.remaining -= 1;
        attempt += 1;
        await delay(140 + Math.floor(Math.random() * 180));
        continue;
      }
      break;
    }
  }

  return {
    source,
    items: [],
    latencyMs: Date.now() - started,
    error: String(lastError?.message || lastError || "unknown_error"),
    attempts: attempt + 1
  };
}

function isRetryableSourceError(error) {
  const message = String(error?.message || error || "").toLowerCase();
  return /timeout|abort|network|fetch|http 429|http 5\d\d|connection|econn|temporar/.test(message);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, timeoutMs, forceFresh = false) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    const headers = {
      "User-Agent": "Mozilla/5.0 (compatible; HadashotaNews/77.0; +news-aggregator)",
      "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8",
      "Accept-Language": "he-IL,he;q=0.9,en;q=0.7"
    };
    if (forceFresh) {
      headers["Cache-Control"] = "no-cache, no-store, max-age=0";
      headers["Pragma"] = "no-cache";
    }
    return await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers,
      cf: forceFresh
        ? { cacheEverything: false, cacheTtl: 0 }
        : { cacheEverything: true, cacheTtl: 30 }
    });
  } finally {
    clearTimeout(timeout);
  }
}

function rssArticleCandidates(block, source) {
  const candidates = [];
  const add = (value) => {
    const absolute = absoluteUrl(cleanUrlValue(value), source.home);
    if (absolute && !candidates.includes(absolute)) candidates.push(absolute);
  };
  add(firstTag(block, ["link"]));
  for (const match of String(block || "").matchAll(/<link\b[^>]*href=["']([^"']+)["'][^>]*\/?\s*>/gi)) add(match[1]);
  add(firstTag(block, ["guid"]));
  add(firstTag(block, ["id"]));
  return candidates;
}

function chooseRssArticleUrl(block, source) {
  const candidates = rssArticleCandidates(block, source);
  if (!candidates.length) return null;
  const publisher = String(source?.publisher || "").toLowerCase();
  const rank = (value) => {
    try {
      const u = new URL(value);
      const path = u.pathname.toLowerCase();
      let score = u.protocol === "https:" ? 2 : 0;
      if (publisher === "ynet") {
        if (/(^|\.)ynet\.co\.il$/i.test(u.hostname)) score += 20;
        if (/\/news\/article\//i.test(path)) score += 60;
        else if (/\/articles\//i.test(path)) score += 45;
        else if (/\/article\//i.test(path)) score += 35;
        if (/\/integration\//i.test(path) || /storyrss/i.test(path)) score -= 80;
      } else if (publisher === "walla") {
        if (/(^|\.)walla\.co\.il$/i.test(u.hostname)) score += 20;
        if (/\/item\/\d+/i.test(path)) score += 60;
        else if (/\/break\/\d+/i.test(path)) score += 55;
        if (/\/rss/i.test(path) || /\/feed\//i.test(path)) score -= 80;
      } else if (path.length > 4) score += 10;
      return score;
    } catch { return -999; }
  };
  return [...candidates].sort((a,b) => rank(b)-rank(a))[0] || candidates[0];
}

function parseRss(xml, source) {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  const items = [];

  for (const block of blocks) {
    const title = cleanText(firstTag(block, ["title"]));
    const dateRaw = cleanText(firstTag(block, ["pubDate", "published", "updated", "dc:date", "date"]));
    const descriptionRaw = firstTag(block, ["description", "summary", "content:encoded", "content"]);
    const description = cleanText(descriptionRaw);
    const publishedAt = safeIso(dateRaw);
    const url = chooseRssArticleUrl(block, source);
    const imageUrl = extractRssImage(block, descriptionRaw, source.home);

    if (!title || !url || !publishedAt) continue;
    items.push(makeItem({ source, title, url, publishedAt, preview: trimPreview(description), imageUrl }));
  }
  return items;
}


function parseOfficialHtmlNews(html, source) {
  const text = String(html || "");
  const out = [];
  const anchorRe = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorRe.exec(text)) && out.length < 90) {
    const href = absoluteUrl(cleanUrlValue(match[1]), source.home);
    const title = cleanText(match[2]);
    if (!href || !title || title.length < 18 || title.length > 320) continue;
    const lower = href.toLowerCase();
    const relevant = source.publisher === "govil" ? /\/departments\/news\//.test(lower)
      : source.publisher === "boi" ? /pressreleases|press-releases/.test(lower)
      : source.publisher === "knesset" ? /\/news\/pressreleases\/pages\/press/i.test(lower)
      : source.publisher === "iaa" ? /notifications-and-updates|\/item\//.test(lower)
      : true;
    if (!relevant) continue;
    const around = text.slice(Math.max(0, match.index - 700), Math.min(text.length, anchorRe.lastIndex + 900));
    const iso = around.match(/(?:datetime|content)=["'](20\d{2}-\d{2}-\d{2}(?:T[^"']+)?)['"]/i)?.[1];
    const dmy = around.match(/\b([0-3]?\d)[\.\/-]([01]?\d)[\.\/-](20\d{2})\b/);
    const heDate = around.match(/\b(20\d{2})[-\/]([01]\d)[-\/]([0-3]\d)\b/);
    let dateRaw = iso || null;
    if (!dateRaw && dmy) dateRaw = `${dmy[3]}-${String(dmy[2]).padStart(2,"0")}-${String(dmy[1]).padStart(2,"0")}T12:00:00+03:00`;
    if (!dateRaw && heDate) dateRaw = `${heDate[1]}-${heDate[2]}-${heDate[3]}T12:00:00+03:00`;
    const publishedAt = safeIso(dateRaw || "");
    if (!publishedAt) continue;
    const preview = trimPreview(cleanText(around.replace(match[0], " ")), 220);
    out.push(makeItem({ source, title, url: href, publishedAt, preview, imageUrl: null }));
  }
  return out;
}

function parseTelegram(html, source) {
  const chunks = html.split(/<div class=["'][^"']*tgme_widget_message_wrap[^"']*["'][^>]*>/i).slice(1);
  const items = [];

  for (const chunk of chunks) {
    const dataPost = chunk.match(/data-post=["']([^"']+)["']/i)?.[1];
    const datetime = chunk.match(/<time\b[^>]*datetime=["']([^"']+)["']/i)?.[1];
    const textHtml = chunk.match(/<div class=["'][^"']*tgme_widget_message_text[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1];
    const text = cleanTelegramText(cleanText(textHtml || ""));
    const publishedAt = safeIso(datetime);
    if (!dataPost || !text || !publishedAt) continue;

    const url = `https://t.me/${dataPost}`;
    const title = telegramTitle(text);
    const imageUrl = extractTelegramImage(chunk);
    items.push(makeItem({ source, title, url, publishedAt, preview: trimPreview(text, 240), imageUrl }));
  }
  return items;
}

function parseJsonLd(html, source) {
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const candidates = [];

  for (const script of scripts) {
    try {
      const parsed = JSON.parse(decodeEntities(script.trim()));
      walkJsonLd(parsed, candidates);
    } catch {
      // Ignore malformed structured-data blocks. A source with no parsed items is hidden from the UI.
    }
  }

  return candidates
    .map((obj) => {
      const title = cleanText(obj.headline || obj.name || "");
      const rawUrl = typeof obj.url === "string" ? obj.url : obj.mainEntityOfPage?.['@id'] || obj.mainEntityOfPage || obj['@id'];
      const url = absoluteUrl(cleanUrlValue(rawUrl), source.home);
      const publishedAt = safeIso(obj.datePublished || obj.dateModified || obj.uploadDate);
      const preview = cleanText(obj.description || "");
      const imageUrl = jsonLdImage(obj.image, source.home);
      if (!title || !url || !publishedAt) return null;
      return makeItem({ source, title, url, publishedAt, preview: trimPreview(preview), imageUrl });
    })
    .filter(Boolean);
}

function walkJsonLd(value, out) {
  if (!value) return;
  if (Array.isArray(value)) {
    for (const child of value) walkJsonLd(child, out);
    return;
  }
  if (typeof value !== "object") return;

  const type = String(value['@type'] || "").toLowerCase();
  if ((value.headline || value.name) && (value.datePublished || value.dateModified) && (value.url || value.mainEntityOfPage || value['@id'])) {
    if (!type || /newsarticle|article|reportage|liveblogposting|creativework/.test(type)) out.push(value);
  }

  if (value['@graph']) walkJsonLd(value['@graph'], out);
  if (value.itemListElement) walkJsonLd(value.itemListElement, out);
  if (value.item) walkJsonLd(value.item, out);
}


function extractRssImage(block, descriptionRaw, base) {
  const candidates = [];
  for (const match of block.matchAll(/<(?:media:content|media:thumbnail)\b[^>]*url=["']([^"']+)["'][^>]*>/gi)) candidates.push(match[1]);
  for (const match of block.matchAll(/<enclosure\b[^>]*url=["']([^"']+)["'][^>]*>/gi)) {
    const tag = match[0];
    if (/type=["']image\//i.test(tag) || /\.(?:jpe?g|png|webp|gif)(?:\?|$)/i.test(match[1])) candidates.push(match[1]);
  }
  const html = String(descriptionRaw || "");
  const img = html.match(/<img\b[^>]*(?:src|data-src)=["']([^"']+)["'][^>]*>/i)?.[1];
  if (img) candidates.push(img);
  for (const value of candidates) {
    const url = absoluteUrl(decodeEntities(value), base);
    if (url && !/\.(?:svg)(?:\?|$)/i.test(url)) return url;
  }
  return null;
}

function extractTelegramImage(chunk) {
  const style = chunk.match(/<a\b[^>]*class=["'][^"']*tgme_widget_message_photo_wrap[^"']*["'][^>]*style=["'][^"']*background-image\s*:\s*url\(['"]?([^)'"]+)/i)?.[1]
    || chunk.match(/background-image\s*:\s*url\(['"]?([^)'"]+)/i)?.[1];
  if (style) return sanitizeImageUrl(decodeEntities(style));
  const img = chunk.match(/<img\b[^>]*(?:src|data-src)=["']([^"']+)["'][^>]*>/i)?.[1];
  return img ? sanitizeImageUrl(decodeEntities(img)) : null;
}

function jsonLdImage(image, base) {
  const values = Array.isArray(image) ? image : [image];
  for (const value of values) {
    const raw = typeof value === "string" ? value : value?.url || value?.contentUrl || value?.['@id'];
    const url = absoluteUrl(cleanUrlValue(raw), base);
    if (url) return url;
  }
  return null;
}

function sanitizeImageUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(String(value).trim());
    return /^https?:$/.test(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

const COPYRIGHT_SAFE_MEDIA_MODE = true;
const LICENSED_MEDIA_HOSTS = new Set(["koteretplus.com","www.koteretplus.com","hadashota.singles-pr.workers.dev"]);
function isLicensedMediaUrl(rawUrl){try{const u=new URL(String(rawUrl||""));return /^https?:$/.test(u.protocol)&&LICENSED_MEDIA_HOSTS.has(u.hostname.toLowerCase())}catch{return false}}
function sanitizeSourceImageUrl(value) {
  const clean = sanitizeImageUrl(value);
  if (!clean) return null;
  try {
    const url = new URL(clean);
    const fingerprint = `${url.hostname}${url.pathname}${url.search}`.toLowerCase();

    // Reject assets that are overwhelmingly likely to be branding, tracking,
    // avatars or generic placeholders rather than the image of this article.
    const blocked = [
      "favicon", "logo", "sprite", "avatar", "profile", "placeholder",
      "default-image", "default_image", "noimage", "no-image", "blank.",
      "transparent", "tracking", "pixel.", "1x1", "spacer", "icon-"
    ];
    if (blocked.some((token) => fingerprint.includes(token))) return null;

    // Obvious tiny dimension hints in URLs are also not editorial photography.
    const tinyWidth = url.searchParams.get("w") || url.searchParams.get("width");
    const tinyHeight = url.searchParams.get("h") || url.searchParams.get("height");
    if (tinyWidth && Number(tinyWidth) > 0 && Number(tinyWidth) < 240) return null;
    if (tinyHeight && Number(tinyHeight) > 0 && Number(tinyHeight) < 140) return null;

    return clean;
  } catch {
    return null;
  }
}

function makeItem({ source, title, url, publishedAt, preview, imageUrl = null }) {
  return {
    id: stableId(`${source.id}|${url}|${publishedAt}`),
    sourceId: source.id,
    publisher: source.publisher,
    sourceName: source.name,
    sourceKind: source.kind,
    verified: !!source.verified,
    official: !!source.official,
    independent: !!source.independent,
    language: source.language || "he",
    title: normalizeSpace(title),
    preview: normalizeSpace(preview || ""),
    // V76: Prefer an image explicitly supplied by the same source entry/page
    // (RSS enclosure/media, JSON-LD image or Telegram preview). This is much
    // more relevant than guessing from a generic media search. Junk branding
    // and placeholders are filtered by sanitizeSourceImageUrl().
    imageUrl: sanitizeSourceImageUrl(imageUrl),
    url,
    publishedAt,
    defaultCategory: source.defaultCategory || null
  };
}

function classify(item) {
  const haystack = `${item.title} ${item.preview}`.toLowerCase();
  const security = scoreWords(haystack, SECURITY_WORDS) + (item.defaultCategory === "security" ? 1.6 : 0);
  const politics = scoreWords(haystack, POLITICS_WORDS) + (item.defaultCategory === "politics" ? 1.4 : 0);
  const diplomatic = scoreWords(haystack, DIPLOMATIC_WORDS) + (item.defaultCategory === "diplomatic" ? 1.4 : 0);

  const max = Math.max(security, politics, diplomatic);
  if (max <= 0) return "other";
  if (security === max) return "security";
  if (politics === max) return "politics";
  return "diplomatic";
}

function scoreWords(text, words) {
  let score = 0;
  for (const word of words) if (text.includes(word.toLowerCase())) score += word.length > 6 ? 1.2 : 1;
  return score;
}

function clusterItems(items) {
  const clusters = [];

  for (const item of items) {
    const itemTime = Date.parse(item.publishedAt);
    let match = null;

    for (let i = Math.max(0, clusters.length - 110); i < clusters.length; i++) {
      const cluster = clusters[i];
      const clusterTime = Date.parse(cluster.latestReportAt || cluster.publishedAt);
      const timeDeltaMs = Math.abs(itemTime - clusterTime);
      if (timeDeltaMs > 8 * 60 * 60 * 1000) continue;
      const directMatch = sameEvent(item.title, cluster.title, timeDeltaMs);
      const relatedMatch = !directMatch && (cluster.related || []).some((report) => {
        if (!report?.title) return false;
        const reportTime = Date.parse(report.publishedAt || 0);
        const reportDeltaMs = Number.isFinite(reportTime) && Number.isFinite(itemTime) ? Math.abs(itemTime - reportTime) : timeDeltaMs;
        return reportDeltaMs <= 180 * 60 * 1000 && sameEvent(item.title, report.title, reportDeltaMs);
      });
      if (directMatch || relatedMatch) {
        match = cluster;
        break;
      }
    }

    const relatedEntry = {
      sourceId: item.sourceId,
      publisher: item.publisher,
      sourceName: item.sourceName,
      sourceKind: item.sourceKind,
      verified: item.verified,
      official: item.official,
      independent: item.independent,
      url: item.url,
      publishedAt: item.publishedAt,
      imageUrl: item.imageUrl || null,
      title: item.title || "",
      preview: item.preview || "",
      category: item.category || null
    };

    if (!match) {
      clusters.push({
        ...item,
        reportCount: 1,
        firstReportAt: item.publishedAt,
        latestReportAt: item.publishedAt,
        related: [relatedEntry],
        updates: [relatedEntry]
      });
      continue;
    }

    match.updates = Array.isArray(match.updates) ? match.updates : [...(match.related || [])];
    if (!match.updates.some((update) => update.url === relatedEntry.url && update.publishedAt === relatedEntry.publishedAt)) {
      match.updates.push(relatedEntry);
      match.updates.sort((a,b) => Date.parse(a.publishedAt || 0) - Date.parse(b.publishedAt || 0));
      if (match.updates.length > 24) match.updates = match.updates.slice(-24);
    }

    const existing = match.related.find((related) => related.publisher === item.publisher);
    if (!existing) {
      match.related.push(relatedEntry);
    } else if (Date.parse(item.publishedAt) > Date.parse(existing.publishedAt || 0)) {
      Object.assign(existing, relatedEntry);
    }

    match.reportCount = match.related.length;
    if (!match.imageUrl && item.imageUrl) match.imageUrl = item.imageUrl;
    if (itemTime > Date.parse(match.latestReportAt || 0)) match.latestReportAt = item.publishedAt;
    if (itemTime < Date.parse(match.firstReportAt || item.publishedAt)) match.firstReportAt = item.publishedAt;

    // A mixed cluster must stay clickable. A news-site article always represents the
    // cluster when one exists; official/verified priority is applied within the same kind.
    const representativeScore = Number(match.sourceKind === "site") * 100 + Number(match.official) * 20 + Number(match.verified) * 5;
    const candidateScore = Number(item.sourceKind === "site") * 100 + Number(item.official) * 20 + Number(item.verified) * 5;
    if (candidateScore > representativeScore || (candidateScore === representativeScore && itemTime > Date.parse(match.publishedAt))) {
      const related = match.related;
      const updates = match.updates;
      const reportCount = match.reportCount;
      const latestReportAt = match.latestReportAt;
      const firstReportAt = match.firstReportAt;
      const clusterImage = match.imageUrl || item.imageUrl || null;
      Object.assign(match, item, { related, updates, reportCount, latestReportAt, firstReportAt, imageUrl: clusterImage });
    }
  }

  return clusters.sort((a, b) => Date.parse(b.latestReportAt || b.publishedAt) - Date.parse(a.latestReportAt || a.publishedAt));
}

function sameEvent(a, b, timeDeltaMs = Infinity) {
  const A = titleTokens(a);
  const B = titleTokens(b);
  if (!A.size || !B.size) return false;
  let intersection = 0;
  for (const token of A) if (B.has(token)) intersection++;
  const union = A.size + B.size - intersection;
  const jaccard = union ? intersection / union : 0;
  const containment = intersection / Math.max(1, Math.min(A.size, B.size));
  if (jaccard >= 0.50 || (intersection >= 3 && containment >= 0.46) || (intersection >= 4 && containment >= 0.40)) return true;
  if (timeDeltaMs <= 180 * 60 * 1000) {
    const entitiesA = eventEntities(a);
    const entitiesB = eventEntities(b);
    const actionsA = eventActions(a);
    const actionsB = eventActions(b);
    const sharedEntities = [...entitiesA].filter((x) => entitiesB.has(x)).length;
    const sharedActions = [...actionsA].filter((x) => actionsB.has(x)).length;
    if (sharedEntities >= 2 && sharedActions >= 1) return true;
    if (sharedEntities >= 1 && sharedActions >= 2 && intersection >= 2) return true;
    if (timeDeltaMs <= 150 * 60 * 1000 && sharedEntities >= 1 && sharedActions >= 1) {
      const specificTargets = new Set(["כווית","בחריין","קטאר","ירדן","עיראק","סעודיה","תימן","טהרן","ביירות","דמשק"]);
      const sharedSpecificTarget = [...entitiesA].some((entity) => entitiesB.has(entity) && specificTargets.has(entity));
      if (sharedSpecificTarget) return true;
    }
  }
  return false;
}

function canonicalEventToken(word) {
  let w = String(word || "").toLowerCase();
  // Strip a Hebrew one-letter prefix only when the remaining word is a known
  // event/location stem. The old generic rule broke words such as "כווית"
  // itself by turning it into "ווית".
  if (w.length >= 4 && /^[ובלכמהש]/.test(w)) {
    const candidate = w.slice(1);
    const prefixableStems = new Set([
      "איראן","כווית","בחריין","קטאר","ירדן","עיראק","סעודיה","תימן","ארהב","ישראל","טהרן","ביירות","דמשק","לבנון","סוריה",
      "תקיפה","מתקפה","פגיעה","פיצוץ","ירי","שיגור","מטח","טיל","רקטה","כטבמ","רחפן","יירוט","אזעקה","התרעה","בסיס"
    ]);
    if (prefixableStems.has(candidate)) w = candidate;
  }
  const aliases = {
    "איראני":"איראן", "איראנית":"איראן", "איראנים":"איראן", "איראניות":"איראן",
    "iran":"איראן", "iranian":"איראן", "iranians":"איראן",
    "כוויתי":"כווית", "כוויתית":"כווית", "כוויתים":"כווית", "kuwait":"כווית", "kuwaiti":"כווית",
    "אמריקני":"ארהב", "אמריקנית":"ארהב", "אמריקאים":"ארהב", "american":"ארהב", "americans":"ארהב",
    "כטבמים":"כטבמ", "כטבם":"כטבמ", "מלטים":"כטבמ", "drone":"כטבמ", "drones":"כטבמ",
    "טילים":"טיל", "missile":"טיל", "missiles":"טיל", "רקטות":"רקטה", "rocket":"רקטה", "rockets":"רקטה",
    "תקיפות":"תקיפה", "התקפות":"תקיפה", "מתקפה":"תקיפה", "מתקפת":"תקיפה", "attack":"תקיפה", "attacks":"תקיפה", "attacked":"תקיפה", "strike":"תקיפה", "strikes":"תקיפה",
    "שיגורים":"שיגור", "launch":"שיגור", "launches":"שיגור", "launched":"שיגור",
    "פיצוצים":"פיצוץ", "explosion":"פיצוץ", "explosions":"פיצוץ", "blast":"פיצוץ", "blasts":"פיצוץ",
    "יורטו":"יירוט", "מיירטים":"יירוט", "יירוטים":"יירוט", "intercepted":"יירוט", "intercepts":"יירוט", "interception":"יירוט"
  };
  return aliases[w] || w;
}

function eventEntities(value) {
  const tokens = titleTokens(value);
  const known = new Set(["איראן","כווית","בחריין","קטאר","ירדן","עיראק","סעודיה","תימן","ארהב","ישראל","טהרן","ביירות","דמשק","לבנון","סוריה"]);
  return new Set([...tokens].filter((t) => known.has(t)));
}

function eventActions(value) {
  const tokens = titleTokens(value);
  const families = new Map([
    ["attack", new Set(["תקיפה","תקף","תקפה","פגיעה","פגע","פיצוץ","ירי","שיגור","שיגרה","שיגר","מטח"])],
    ["missile", new Set(["טיל","רקטה","כטבמ","רחפן","מלט"])],
    ["intercept", new Set(["יירוט","יירט","הגנה","אזעקה","התרעה","התרעות"])],
    ["base", new Set(["בסיס","צבאי","כוחות","ארהב"])]]);
  const out = new Set();
  for (const [family, words] of families) if ([...tokens].some((t) => words.has(t))) out.add(family);
  return out;
}

function titleSimilarity(a, b) {
  const A = titleTokens(a);
  const B = titleTokens(b);
  if (!A.size || !B.size) return 0;
  let intersection = 0;
  for (const token of A) if (B.has(token)) intersection++;
  const union = A.size + B.size - intersection;
  return union ? intersection / union : 0;
}

function titleTokens(value) {
  return new Set(
    normalizeHebrew(value)
      .split(/\s+/)
      .map(canonicalEventToken)
      .filter((word) => word.length >= 2 && !STOP_WORDS.has(word))
      .slice(0, 28)
  );
}

function normalizeHebrew(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[״”“'’`]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeSameSource(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = `${item.publisher}|${normalizeHebrew(item.title).slice(0, 120)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function firstTag(block, tags) {
  for (const tag of tags) {
    const escaped = tag.replace(":", "\\:");
    const re = new RegExp(`<${escaped}\\b[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i");
    const match = block.match(re);
    if (match) return unwrapCdata(match[1]);
  }
  return "";
}

function unwrapCdata(value) {
  return String(value || "").replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/i, "$1");
}


function normalizePhotoCreditText(value) {
  return cleanText(String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'"))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

function photoCreditLooksUseful(value) {
  const text = normalizePhotoCreditText(value);
  if (!text || text.length < 2 || text.length > 180) return false;
  if (/^(צילום|צלם|קרדיט|photo|credit)\s*:?\s*$/i.test(text)) return false;
  if (/^(מערכת|יחצ|יח"צ|יח״צ|ארכיון|שאטרסטוק|shutterstock|istock|getty images?)$/i.test(text)) return true;
  return /[\p{L}]/u.test(text);
}

function extractPhotoCreditFromJsonLd(html, targetImageUrl = "") {
  const scripts = [...String(html || "").matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const target = String(targetImageUrl || "").split("?")[0];

  const scan = (node) => {
    if (!node) return "";
    if (Array.isArray(node)) {
      for (const child of node) {
        const found = scan(child);
        if (found) return found;
      }
      return "";
    }
    if (typeof node !== "object") return "";

    const type = String(node["@type"] || "").toLowerCase();
    const imageObj = node.image || node.thumbnailUrl || node.associatedMedia || null;

    const imageMatches = (() => {
      if (!target) return true;
      const urls = [];
      const collect = (v) => {
        if (!v) return;
        if (typeof v === "string") urls.push(v);
        else if (Array.isArray(v)) v.forEach(collect);
        else if (typeof v === "object") {
          collect(v.url); collect(v.contentUrl); collect(v.thumbnailUrl);
        }
      };
      collect(imageObj);
      return urls.some((u) => String(u).split("?")[0] === target);
    })();

    if (imageMatches || type.includes("imageobject")) {
      const candidates = [
        node.creditText,
        node.creator?.name,
        node.creator,
        node.author?.name,
        node.author,
        node.copyrightHolder?.name,
        node.copyrightHolder,
        node.provider?.name
      ];
      for (const candidate of candidates) {
        const text = normalizePhotoCreditText(candidate?.name || candidate);
        if (photoCreditLooksUseful(text)) return text;
      }

      const imageCandidates = Array.isArray(imageObj) ? imageObj : [imageObj];
      for (const img of imageCandidates) {
        if (!img || typeof img !== "object") continue;
        const candidates2 = [
          img.creditText,
          img.creator?.name,
          img.creator,
          img.author?.name,
          img.author,
          img.copyrightHolder?.name,
          img.copyrightHolder
        ];
        for (const candidate of candidates2) {
          const text = normalizePhotoCreditText(candidate?.name || candidate);
          if (photoCreditLooksUseful(text)) return text;
        }
      }
    }

    for (const value of Object.values(node)) {
      if (value && typeof value === "object") {
        const found = scan(value);
        if (found) return found;
      }
    }
    return "";
  };

  for (const match of scripts) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const found = scan(parsed);
      if (found) return found;
    } catch {}
  }
  return "";
}

function extractPhotoCreditFromMeta(html) {
  const source = String(html || "");
  const metaPatterns = [
    /<meta[^>]+(?:name|property)=["'](?:credit|photo:credit|image:credit|og:image:credit|twitter:image:credit)["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["'](?:credit|photo:credit|image:credit|og:image:credit|twitter:image:credit)["'][^>]*>/i,
    /<meta[^>]+name=["']author["'][^>]+content=["']([^"']+)["'][^>]*>/i
  ];
  for (const rx of metaPatterns) {
    const m = source.match(rx);
    const text = normalizePhotoCreditText(m?.[1] || "");
    if (photoCreditLooksUseful(text)) return text;
  }
  return "";
}

function extractPhotoCreditNearImage(html, targetImageUrl = "") {
  const source = String(html || "");
  const decodedTarget = String(targetImageUrl || "").replace(/&amp;/g, "&");
  const filename = (() => {
    try { return new URL(decodedTarget).pathname.split("/").pop() || ""; } catch { return ""; }
  })();

  const needles = [decodedTarget, filename].filter((v) => v && v.length >= 6);
  for (const needle of needles) {
    const idx = source.indexOf(needle);
    if (idx < 0) continue;
    const windowText = source.slice(Math.max(0, idx - 1200), Math.min(source.length, idx + 2200));
    const textOnly = normalizePhotoCreditText(windowText);
    const patterns = [
      /צילום\s*[:\-–—]\s*([^|•<>]{2,90})/i,
      /צלם\s*[:\-–—]\s*([^|•<>]{2,90})/i,
      /קרדיט\s*[:\-–—]\s*([^|•<>]{2,90})/i,
      /Photo(?:graphy)?\s*[:\-–—]\s*([^|•<>]{2,90})/i,
      /Credit\s*[:\-–—]\s*([^|•<>]{2,90})/i
    ];
    for (const rx of patterns) {
      const m = textOnly.match(rx);
      const credit = normalizePhotoCreditText(m?.[1] || "");
      if (photoCreditLooksUseful(credit)) return credit;
    }
  }
  return "";
}

function extractPhotoCredit(html, targetImageUrl = "") {
  return (
    extractPhotoCreditFromJsonLd(html, targetImageUrl) ||
    extractPhotoCreditNearImage(html, targetImageUrl) ||
    extractPhotoCreditFromMeta(html) ||
    ""
  );
}

function cleanText(value) {
  const decoded = decodeEntities(decodeEntities(unwrapCdata(value || "")));
  return normalizeSpace(stripMarkupArtifacts(stripHtml(decoded)));
}

// URLs must never pass through prose cleanup. The legacy permissive markup
// cleanup could remove the letter "p" from https:// and corrupt article links.
function cleanUrlValue(value) {
  return decodeEntities(decodeEntities(unwrapCdata(value || "")))
    .replace(/<[^>]+>/g, " ")
    .trim()
    .replace(/^[\s"']+|[\s"']+$/g, "");
}

function stripMarkupArtifacts(value) {
  return String(value || "")
    .replace(/\bimg\s+[^<>]{0,700}?(?:\/?>|(?=\s{2,}|$))/gi, " ")
    .replace(/\b(?:height|width|align|src|class|style|alt|loading)\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, " ")
    // Require actual/encoded angle brackets so ordinary words such as https,
    // Trump or breaking are never mistaken for HTML tags.
    .replace(/(?:<|&lt;)\s*\/?\s*br\s*\/?\s*(?:>|&gt;)/gi, " ")
    .replace(/(?:<|&lt;)\s*\/?\s*(?:p|div|span)\b[^>]*?(?:>|&gt;)/gi, " ");
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?p\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
}

function decodeEntities(value) {
  const entities = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", laquo: "«", raquo: "»"
  };
  const decodePass = (input) => String(input || "").replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const hex = code[1]?.toLowerCase() === "x";
      const n = parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return entities[code.toLowerCase()] ?? match;
  });

  // A few publishers double-encode punctuation (for example &amp;#8226;).
  // Two passes clean it without fetching or parsing the article page itself.
  return decodePass(decodePass(value));
}

function normalizeSpace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function trimPreview(value, max = 220) {
  const text = normalizeSpace(value);
  return text.length > max ? `${text.slice(0, max - 1).trim()}…` : text;
}

function cleanTelegramText(text) {
  return normalizeSpace(String(text || "")
    .replace(/https?:\/\/\S+/gi, " ")
    .replace(/(?:www\.)\S+/gi, " ")
    .replace(/[<>]{2,}/g, " ")
    .replace(/\s*[|•]\s*להצטרפות.*$/i, " ")
    .replace(/\s+/g, " "));
}

function telegramTitle(text) {
  const clean = cleanTelegramText(text);
  const first = clean.split(/(?<=[.!?…])\s+/)[0] || clean;
  return first.length > 150 ? `${first.slice(0, 149).trim()}…` : first;
}

function safeIso(value) {
  if (!value) return null;
  const timestamp = Date.parse(String(value).trim());
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : null;
}

function absoluteUrl(value, base) {
  if (!value) return null;
  try {
    const url = new URL(String(value).trim(), base);
    if (!/^https?:$/.test(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function stableId(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function json(data, status = 200, extraHeaders = {}) {
  return cors(new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    }
  }));
}

function cors(response) {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}


/* =========================================================
   V146 — KOTERET PLUS ESCALATION INDEX
   Calibrated multi-signal OSINT situational-awareness index.
   The score is 0–100 intensity, NOT a probability of war.
   ========================================================= */
const ESCALATION_MODEL_VERSION = "192.0";
const ESCALATION_WEIGHTS = Object.freeze({news:16,intlnews:4,official:14,aviation:16,military:1,notam:6,airrisk:8,oil:8,us:10,maritime:9,nuclear:3,market:3,diplomatic:2});
const ESCALATION_DOMAIN_WEIGHTS = Object.freeze({news:18,official:18,air:16,posture:14,maritime:16,market:8,nuclear:6,military:4});
const ESCALATION_LABELS = Object.freeze({news:"מודיעין חדשותי",intlnews:"הצלבת חדשות בינלאומית",official:"פיקוד העורף + רשמי",aviation:"תעופה אזרחית מעל איראן",military:"נוכחות צבאית גלויה",notam:"NOTAM ישראל ומרחב אווירי",airrisk:"אזהרות תעופה אזוריות",oil:"Brent",us:"עמדת ארה״ב",maritime:"הורמוז והמפרץ",nuclear:"איראן והגרעין",market:"שוק חיזוי",diplomatic:"אזהרות בינלאומיות"});
const ESCALATION_SOURCE_URLS = Object.freeze({
  news:"/", intlnews:"https://feeds.bbci.co.uk/news/topics/cjnwl8q4ggwt/rss.xml", official:"https://www.oref.org.il/", aviation:"https://www.adsb.lol/", military:"https://www.adsb.lol/",
  notam:"https://ext.iaa.gov.il/aeroinfo/AeroInfo.aspx?msgType=Notam",
  airrisk:"https://www.easa.europa.eu/en/domains/air-operations/czibs",
  oil:"https://fred.stlouisfed.org/series/DCOILBRENTEU",
  us:"https://www.centcom.mil/MEDIA/PUBLIC-RELEASES/",
  maritime:"https://www.ukmto.org/recent-incidents",
  nuclear:"https://www-news.iaea.org/EventList.aspx",
  market:"https://polymarket.com/",
  diplomatic:"https://www.gov.uk/foreign-travel-advice/israel"
});
const ESCALATION_EXTERNAL_TTL_MS = 15*60*1000;
const ESCALATION_PUBLIC_REFRESH_MS = 55*1000;
const ESCALATION_LOCK_MS = 40*1000;
const ESCALATION_SHARDS = ["sites-1","sites-2","sites-3","telegram-1","telegram-2","telegram-3"];
const ESCALATION_REGION_RX = /(?:ישראל|ישראלי|צה["״']?ל|איראן|איראני|טהרן|משמרות המהפכה|גרעין|כור גרעיני|הורמוז|המפרץ|כווית|בחריין|קטאר|איחוד האמירויות|אבו דאבי|דובאי|עומאן|סעודיה|עיראק|ירדן|לבנון|חיזבאללה|סוריה|דמשק|תימן|חות['’״]?ים|ארה["״']?ב|וושינגטון|CENTCOM|Israel|Israeli|IDF|iran|iranian|tehran|irgc|nuclear|hormuz|gulf|uae|united arab emirates|oman|saudi|iraq|jordan|lebanon|hezbollah|syria|yemen|houthi|centcom|united states|u\.s\.)/i;
const ESCALATION_CORE_RX = /(?:איראן|איראני|טהרן|משמרות המהפכה|נתנז|פורדו|בושהר|הורמוז|המפרץ הפרסי|מפרץ עומאן|Iran|Iranian|Tehran|IRGC|Natanz|Fordow|Bushehr|Hormuz|Persian Gulf|Gulf of Oman)/i;
const ESCALATION_HARD_RX = /(?:תקיפ|מתקפה|הפצצ|שיגור|טיל|טילים|רקט|כטב|כטב.?ם|רחפ|יירוט|אזעק|התרע|כוננות|פינוי|אולטימטום|תגובה צבאית|פעולה צבאית|היערכות|גיוס|מלחמה|מצור|סגר ימי|חסימה ימית|strike|attack|bomb|missile|rocket|drone|intercept|alert|evacuat|ultimatum|retaliat|military action|deploy|readiness|imminent|\bwar\b|blockade|mobiliz|carrier strike|bomber|airspace.{0,40}(?:closed|closure)|ordered departure)/i;
const ESCALATION_SOFT_RX = /(?:איום|מתיחות|אזהר|לחץ|סנקציות|threat|tension|warning|pressure|sanction|heightened|concern)/i;
const ESCALATION_DEESC_RX = /(?:הפסקת אש|רגיעה|הרגעה|הסכם|שיחות|מו["״']?מ|משא ומתן|דיפלומט|עסקה|הבנות|ceasefire|de-?escalat|talks|negotiat|agreement|deal|diplomac|truce)/i;
const ESCALATION_NEWS_BOILERPLATE_RX = /(?:war of words|מלחמת מילים|anniversary|live updates?|live blog|explainer|what we know)/i;
function escClamp(value,min=0,max=100){const n=Number(value);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):min;}
function escMedian(values){const a=values.map(Number).filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2;}
function escQuantile(values,q=.5){const a=values.map(Number).filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const pos=(a.length-1)*Math.max(0,Math.min(1,Number(q)||0)),lo=Math.floor(pos),hi=Math.ceil(pos);return lo===hi?a[lo]:a[lo]+(a[hi]-a[lo])*(pos-lo);}
function escSignal(key,score,available,reason,extra={}){return {key,label:ESCALATION_LABELS[key]||key,weight:ESCALATION_WEIGHTS[key]||0,score:escClamp(score),available:available!==false,reason:String(reason||""),source:extra.source||"",sourceUrl:extra.sourceUrl||ESCALATION_SOURCE_URLS[key]||"/",checkedAt:extra.checkedAt||new Date().toISOString(),freshness:extra.freshness||"עדכני",...extra};}
function escLevel(score){score=Number(score)||0;if(score<30)return {label:"שגרה",key:"routine"};if(score<50)return {label:"מתיחות מוגברת",key:"elevated"};if(score<70)return {label:"מתיחות גבוהה",key:"high"};if(score<85)return {label:"הסלמה משמעותית",key:"significant"};return {label:"מצב חריג",key:"exceptional"};}
async function escFetch(url,{timeout=6500,type="text",headers={},cf}={}){
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort("timeout"),timeout);
  try{const response=await fetch(url,{signal:controller.signal,redirect:"follow",headers:{"Accept-Language":"he,en-US;q=.8,en;q=.6","User-Agent":"Mozilla/5.0 (compatible; KoteretPlus-Escalation/165.0; +https://koteretplus.com/escalation)",...headers},...(cf?{cf}: {}) });if(!response.ok)throw new Error(`HTTP ${response.status}`);return type==="json"?await response.json():await response.text();}finally{clearTimeout(timer);}
}
async function readEscalationNewsCache(request){
  const cache=caches.default,items=[],sources=[];let freshest=0;
  for(const shard of ESCALATION_SHARDS){
    const u=new URL(request.url);u.pathname="/api/news";u.search=`?shard=${shard}&v=119`;
    const hit=await cache.match(new Request(u.toString(),{method:"GET"}));if(!hit)continue;
    try{const p=await hit.json();const g=Date.parse(p?.generatedAt||0);if(Number.isFinite(g)&&Date.now()-g>2*60*60*1000)continue;freshest=Math.max(freshest,g||0);if(Array.isArray(p?.items))items.push(...p.items);if(Array.isArray(p?.sources))sources.push(...p.sources);}catch{}
  }
  const rows=[];const seen=new Set();
  for(const item of items){
    const base={...item,related:undefined};const all=[base,...(Array.isArray(item?.related)?item.related:[])];
    for(const r of all){const key=String(r?.url||r?.id||`${r?.sourceId}|${r?.title}|${r?.publishedAt}`);if(!key||seen.has(key))continue;seen.add(key);rows.push(r);}
  }
  return {rows,sources,freshestAt:freshest?new Date(freshest).toISOString():null};
}
function escNewsSourceTrust(row){
  const src=SOURCES.find(s=>s.id===row?.sourceId);if(src?.official)return 1.25;if(src?.verified)return 1;return .58;
}
function scoreKoteretNews(cacheData){
  const now=Date.now(),windowMs=12*3600000,contextMs=48*3600000,twoHours=2*3600000;
  const allRows=(cacheData?.rows||[]).filter(r=>{const t=Date.parse(r?.publishedAt||0);return Number.isFinite(t)&&now-t>=-600000&&now-t<=contextMs;});
  const rows=allRows.filter(r=>now-Date.parse(r?.publishedAt||0)<=windowMs);
  // V194: immediate news momentum is measured over 12h, while a separate 48h
  // conflict-context memory prevents a sustained verified crisis from becoming
  // "normal" merely because the most recent few hours were quieter.
  const relevant=rows.filter(r=>ESCALATION_CORE_RX.test(`${r?.title||""} ${r?.summary||r?.description||""}`));
  const contextRelevant=allRows.filter(r=>ESCALATION_CORE_RX.test(`${r?.title||""} ${r?.summary||r?.description||""}`));
  let weightedAlerts=0,weightedDenom=0,weightedDeesc=0,currentWeight=0,olderWeight=0;const hardPublishers=new Set(),trustedHard=new Set();
  for(const r of relevant){
    const text=`${r?.title||""} ${r?.summary||r?.description||""}`,title=String(r?.title||"");
    const age=Math.max(0,now-Date.parse(r?.publishedAt||now)),decay=Math.pow(.5,age/(6*3600000)),trust=escNewsSourceTrust(r),base=trust*decay;
    const hard=ESCALATION_HARD_RX.test(text),soft=ESCALATION_SOFT_RX.test(text),deesc=ESCALATION_DEESC_RX.test(text),boiler=ESCALATION_NEWS_BOILERPLATE_RX.test(title)&&!/(?:strike|attack|missile|תקיפ|טיל|שיגור|blockade|סגר ימי)/i.test(title);
    let alertWeight=hard?(deesc ? .36 : 1):(soft?(deesc ? .18 : .38):0);if(boiler)alertWeight=Math.min(alertWeight,.18);
    weightedDenom+=base;weightedAlerts+=base*alertWeight;if(deesc)weightedDeesc+=base;
    if(age<=twoHours)currentWeight+=base;else olderWeight+=base;
    if(hard&&!deesc){const pub=String(r.publisher||r.sourceId||"");if(pub)hardPublishers.add(pub);const src=SOURCES.find(s=>s.id===r?.sourceId);if(pub&&(src?.verified||src?.official))trustedHard.add(pub);}
  }
  const contextTrusted=new Set(),contextHard=new Set();let contextDeesc=0;
  for(const r of contextRelevant){const text=`${r?.title||""} ${r?.summary||r?.description||""}`,hard=ESCALATION_HARD_RX.test(text),deesc=ESCALATION_DEESC_RX.test(text);if(deesc)contextDeesc++;if(!hard||deesc)continue;const pub=String(r.publisher||r.sourceId||"");if(pub)contextHard.add(pub);const src=SOURCES.find(s=>s.id===r?.sourceId);if(pub&&(src?.verified||src?.official))contextTrusted.add(pub);}
  const ratio=weightedDenom?weightedAlerts/weightedDenom:0,deRatio=weightedDenom?weightedDeesc/weightedDenom:0;
  const olderPer2h=olderWeight/5,velocity=olderPer2h>.35?currentWeight/olderPer2h:(currentWeight>=2.2?2:1);
  let score=5+Math.pow(Math.min(1,ratio),1.5)*72+Math.min(10,Math.max(0,velocity-1)*6)+Math.min(8,Math.max(0,hardPublishers.size-1)*2)-deRatio*18;
  if(relevant.length<3)score=Math.min(score,32);if(hardPublishers.size<2)score=Math.min(score,48);if(trustedHard.size<2)score=Math.min(score,60);
  // A verified 48h conflict context is only a floor, never a direct escalation bonus.
  // It requires several distinct trusted publishers and is weakened by de-escalation reporting.
  let contextFloor=0;if(contextTrusted.size>=5)contextFloor=50;else if(contextTrusted.size>=3)contextFloor=42;else if(contextTrusted.size>=2)contextFloor=34;
  if(contextDeesc>=Math.max(3,contextHard.size))contextFloor=Math.max(0,contextFloor-12);
  score=escClamp(Math.round(Math.max(score,contextFloor)));
  const reason=relevant.length?`${relevant.length} דיווחים ממוקדי איראן/הורמוז ב־12 שעות; ${hardPublishers.size} מקורות שונים דיווחו על אינדיקציות הסלמה, ${trustedHard.size} מהם מקורות מאומתים; קצב השעתיים האחרונות פי ${Number(velocity.toFixed(1))} מקו הבסיס. בהקשר 48 שעות זוהו ${contextTrusted.size} מקורות מאומתים עם דיווחי הסלמה.`:`לא זוהתה מסה מיידית מספקת ב־12 השעות האחרונות; בהקשר 48 שעות זוהו ${contextTrusted.size} מקורות מאומתים עם דיווחי הסלמה.`;
  return escSignal("news",score,true,reason,{source:"כותרת פלוס — מקורות ישראליים ורשמיים",sourceUrl:"/",freshness:cacheData?.freshestAt?`מטמון ${new Date(cacheData.freshestAt).toLocaleTimeString("he-IL",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Jerusalem"})}`:"מטמון חדשות",stats:{relevant:relevant.length,contextRelevant:contextRelevant.length,hardSources:hardPublishers.size,trustedHardSources:trustedHard.size,contextHardSources:contextHard.size,contextTrustedHardSources:contextTrusted.size,contextFloor,alertRatio:Number(ratio.toFixed(3)),deescalationRatio:Number(deRatio.toFixed(3)),velocity:Number(velocity.toFixed(2)),windowHours:12,contextHours:48}});
}
async function fetchOrefForEscalation(){
  try{const parsed=await escFetch("https://www.oref.org.il/WarningMessages/alert/alerts.json",{timeout:3500,type:"text",headers:{Accept:"application/json,text/plain,*/*",Referer:"https://www.oref.org.il/","X-Requested-With":"XMLHttpRequest","Cache-Control":"no-cache"},cf:{cacheEverything:true,cacheTtl:2}});const raw=String(parsed||"").replace(/^\uFEFF/,"").trim();const data=raw&&raw!=="null"?JSON.parse(raw):null;return {ok:true,alerts:normalizeOrefCurrentAlerts(data)};}catch(error){return {ok:false,alerts:[],error:String(error?.message||error)};}
}
async function fetchIdfOfficialForEscalation(){
  const url="https://www.idf.il/en/mini-sites/idf-press-releases-israel-at-war/";
  try{
    const html=await escFetch(url,{timeout:5500,cf:{cacheEverything:true,cacheTtl:120}});
    const recent=extractRecentDatedSnippets(html,10).filter(x=>/(?:Iran|Iranian|Israel|missile|UAV|strike|attack|Home Front|Lebanon|Hezbollah|Syria|Yemen|Houthi)/i.test(x.snippet));
    const hard=recent.filter(x=>/(?:strike|attack|missile|UAV|combat|intercept|launch|operation|deploy|readiness)/i.test(x.snippet)).length;
    const deesc=recent.filter(x=>/(?:ceasefire|truce|agreement|de-escalat|talks)/i.test(x.snippet)).length;
    return {ok:true,url,recent:recent.length,hard,deesc};
  }catch(error){return {ok:false,url,recent:0,hard:0,deesc:0,error:String(error?.message||error)};}
}
async function fetchNscOfficialForEscalation(){
  const url="https://www.gov.il/he/departments/national-security-council/govil-landing-page";
  try{
    const html=await escFetch(url,{timeout:6000,cf:{cacheEverything:true,cacheTtl:180}});
    const recent=extractRecentDatedSnippets(html,14).filter(x=>/(?:איראן|איראני|טיסות|תעופה|ביטחון|הסלמה|מלחמה|תקיפה|חירום|אזהרת מסע|Iran|flight|security|escalat|strike)/i.test(x.snippet));
    const hard=recent.filter(x=>ESCALATION_HARD_RX.test(x.snippet)||/(?:סגירת|נסגר|להימנע|רמה 4|פינוי|עזיבה|departure|leave|withdrawn)/i.test(x.snippet)).length;
    const deesc=recent.filter(x=>ESCALATION_DEESC_RX.test(x.snippet)).length;
    return {ok:true,url,recent:recent.length,hard,deesc};
  }catch(error){return {ok:false,url,recent:0,hard:0,deesc:0,error:String(error?.message||error)};}
}
function scoreOfficialSignal(cacheData,oref,idfWeb,nscWeb){
  const now=Date.now(),officialIds=new Set(["tg-idf","tg-homefront","govil-news","iaa-updates"]);const rows=(cacheData?.rows||[]).filter(r=>officialIds.has(r?.sourceId)&&Number.isFinite(Date.parse(r?.publishedAt||0))&&now-Date.parse(r.publishedAt)<=6*3600000);
  const escalation=rows.filter(r=>ESCALATION_HARD_RX.test(`${r?.title||""} ${r?.summary||""}`)&&ESCALATION_REGION_RX.test(`${r?.title||""} ${r?.summary||""}`));
  const deesc=rows.filter(r=>ESCALATION_DEESC_RX.test(`${r?.title||""} ${r?.summary||""}`));const active=(oref?.alerts||[]).length;
  const directHard=Number(idfWeb?.hard)||0,directDeesc=Number(idfWeb?.deesc)||0,nscHard=Number(nscWeb?.hard)||0,nscDeesc=Number(nscWeb?.deesc)||0;
  let score=10+Math.min(40,escalation.length*9)+Math.min(16,directHard*4)+Math.min(12,nscHard*4)-Math.min(20,deesc.length*5+directDeesc*3+nscDeesc*3);if(active){const iranLinked=escalation.length||directHard||nscHard;const alertFloor=iranLinked?Math.min(96,82+active*2):Math.min(62,48+active*2);score=Math.max(score,alertFloor);}
  const available=oref?.ok||rows.length>0||idfWeb?.ok||nscWeb?.ok;const reason=active?`${active} התרעות פעילות של פיקוד העורף כעת; בנוסף נבדקו עדכוני צה״ל, המל״ל, ממשלה ורשות שדות התעופה.`:`אין התרעה פעילה ברגע הבדיקה; ${escalation.length} עדכונים רשמיים אזוריים במטמון${idfWeb?.ok?` · צה״ל: ${directHard} אינדיקציות מבצעיות`:""}${nscWeb?.ok?` · מל״ל: ${nscHard} אינדיקציות חריגות`:""}.`;
  const freshness=[oref?.ok?"פיקוד העורף חי":null,idfWeb?.ok?"אתר צה״ל ישיר":null,nscWeb?.ok?"המל״ל ישיר":null,rows.length?"מקורות רשמיים במטמון":null].filter(Boolean).join(" · ")||"לא זמין";
  return escSignal("official",score,available,reason,{source:"פיקוד העורף + צה״ל + המל״ל + Gov.il + רשות שדות התעופה",sourceUrl:"https://www.oref.org.il/",freshness,stats:{activeAlerts:active,officialEscalation:escalation.length,deescalation:deesc.length,idfDirectHard:directHard,idfDirectRecent:Number(idfWeb?.recent)||0,nscHard,nscRecent:Number(nscWeb?.recent)||0}});
}
function adsbAircraftKey(ac){return String(ac?.hex||ac?.icao||"").replace(/^~/,"").trim().toLowerCase();}
function validCruiseAircraft(ac){const alt=ac?.alt_baro,altN=Number(alt);if(String(alt).toLowerCase()==="ground")return false;if(Number.isFinite(altN)&&altN<5000)return false;return true;}
async function fetchAviationSignals(){
  const civilianPoints=[[35.6892,51.3890,210],[38.0800,46.2919,210],[32.6546,51.6680,210],[29.5918,52.5837,210]];
  const militaryPoints=[[33.0,34.7,250],[25.4,53.3,250]];
  const calls=[...civilianPoints.map(([lat,lon,r])=>({kind:"civil",url:`https://api.adsb.lol/v2/point/${lat}/${lon}/${r}`})),...militaryPoints.map(([lat,lon,r])=>({kind:"mil",url:`https://api.adsb.lol/v2/point/${lat}/${lon}/${r}`}))];
  const results=await Promise.allSettled(calls.map(c=>escFetch(c.url,{timeout:5500,type:"json",headers:{Accept:"application/json"}})));
  const civilian=new Map(),military=new Map();let civilReached=0,milReached=0;
  results.forEach((res,i)=>{if(res.status!=="fulfilled")return;const c=calls[i];if(c.kind==="civil")civilReached++;else milReached++;for(const ac of Array.isArray(res.value?.ac)?res.value.ac:[]){const key=adsbAircraftKey(ac);if(!key||!validCruiseAircraft(ac))continue;const isMil=(Number(ac?.dbFlags||0)&1)!==0;if(c.kind==="civil"&&!isMil)civilian.set(key,ac);if(c.kind==="mil"&&isMil)military.set(key,ac);}});
  const aviation=civilReached>=2?escSignal("aviation",15,true,`נמדדו ${civilian.size} מטוסים אזרחיים בגובה שיוט ב־${civilReached} מתוך ${civilianPoints.length} אזורי דגימה מעל איראן. קו הבסיס נלמד היסטורית.`,{source:"ADSB.lol (ODbL)",sourceUrl:"https://www.adsb.lol/",freshness:"עדכון חי",rawCount:civilian.size,stats:{aircraft:civilian.size,samplePoints:civilReached}}):escSignal("aviation",0,false,"לא התקבלו מספיק דגימות תעופה מעל איראן ברענון הנוכחי.",{source:"ADSB.lol",sourceUrl:"https://www.adsb.lol/",freshness:"לא זמין"});
  let milInitial=6;if(military.size>=2)milInitial=14;if(military.size>=4)milInitial=24;if(military.size>=7)milInitial=34;if(military.size>=10)milInitial=45;
  const mil=milReached>=1?escSignal("military",milInitial,true,`זוהו ${military.size} מטוסים המסומנים כצבאיים במידע ADS-B גלוי באזור מזרח הים התיכון והמפרץ. הכיסוי חלקי ואינו מייצג את כלל הפעילות הצבאית.`,{source:"ADSB.lol (military-tagged)",sourceUrl:"https://api.adsb.lol/",freshness:"עדכון חי / כיסוי חלקי",rawCount:military.size,stats:{militaryVisible:military.size,samplePoints:milReached}}):escSignal("military",0,false,"נתוני הנוכחות הצבאית הגלויה אינם זמינים כרגע.",{source:"ADSB.lol",sourceUrl:"https://www.adsb.lol/",freshness:"לא זמין"});
  return {aviation,military:mil};
}
async function fetchNotamSignal(){
  const urls=["https://ext.iaa.gov.il/aeroinfo/AeroInfo.aspx?msgType=Notam","https://www.iaa.gov.il/airports/ben-gurion/notifications-and-updates/"];
  const settled=await Promise.allSettled(urls.map(u=>escFetch(u,{timeout:6000})));
  const texts=settled.filter(x=>x.status==="fulfilled").map(x=>x.value);
  if(!texts.length)return escSignal("notam",0,false,"מקורות רשות שדות התעופה אינם זמינים כרגע.",{source:"רשות שדות התעופה",sourceUrl:urls[0],freshness:"לא זמין"});
  const text=normalizeSpace(stripHtml(texts.join(" ")));const routine=(text.match(/(?:DUE WIP|CRANE|PJE|UAS\/UAV ACT|AIR-SHOW|CAPTIVE BALLOON)/gi)||[]).length;const broad=(text.match(/(?:FIR.{0,80}(?:CLSD|CLOSED)|AIRSPACE.{0,80}(?:CLSD|CLOSED)|ALL FLT.{0,100}(?:PROHIBITED|SUSPENDED)|המרחב האווירי.{0,80}(?:נסגר|סגור)|נתב.?ג.{0,70}(?:נסגר|סגור)|פעילות.{0,50}(?:הופסקה|הושבתה))/gi)||[]).length;const route=(text.match(/(?:ATS RTE|CVFR RTE|HEL RTE).{0,70}CLSD/gi)||[]).length;const security=(text.match(/(?:SECURITY|MILITARY|EMERG|חירום|ביטחונ)/gi)||[]).length;let score=8+Math.min(30,route*4)+Math.min(45,broad*24)+Math.min(12,security*3);if(!broad&&routine>6)score=Math.min(score,25);score=escClamp(score);const reason=broad?`זוהו ${broad} ניסוחים של סגירה/הגבלה רחבה ו־${route} סגירות נתיב במסרי רשות שדות התעופה.`:`לא זוהתה סגירה רחבה; נמצאו ${route} סגירות נתיב ופעילויות NOTAM שגרתיות.`;return escSignal("notam",score,true,reason,{source:"רשות שדות התעופה / NOTAM",sourceUrl:urls[0],freshness:`${texts.length}/2 מקורות רשמיים`,stats:{broadClosures:broad,routeClosures:route,routine,security}});
}
function parseEscNumericDate(d,m,y){const ts=Date.UTC(Number(y),Number(m)-1,Number(d),12);return Number.isFinite(ts)?ts:null;}
async function fetchEasaAirRiskSignal(){
  const pageUrl="https://www.easa.europa.eu/en/domains/air-operations/czibs";
  const jsonUrl="https://www.easa.europa.eu/en/domains/air-operations/czibs/export-json?_format=json&page=";
  const relevantRx=/(?:Iran|Persian Gulf|Gulf of Oman|Jordan|Iraq|Lebanon|Middle East|Israel|Syria|Yemen)/i;
  try{
    // Prefer EASA's own JSON export. It is structurally safer than scraping the
    // rendered table and gives us status + issue/update/valid-until fields.
    const data=await escFetch(jsonUrl,{timeout:6500,type:"json",headers:{Accept:"application/json"}});
    const zones=Array.isArray(data?.conflict_zones)?data.conflict_zones:[];
    const active=zones.filter(z=>String(z?.status||"").toLowerCase()==="active"&&relevantRx.test(`${z?.name||""} ${z?.country||""}`));
    if(zones.length){
      const now=Date.now();let recentChanges=0,iranSpecific=0,gulfSpecific=0;
      for(const z of active){
        const issued=Date.parse(z?.issued_date||0);
        const updatedMatch=String(z?.updated||"").match(/datetime=["']([^"']+)/i);
        const updated=Date.parse(updatedMatch?.[1]||0);
        const newest=Math.max(Number.isFinite(issued)?issued:0,Number.isFinite(updated)?updated:0);
        if(newest&&now-newest>=-86400000&&now-newest<=10*86400000)recentChanges++;
        if(/Iran/i.test(`${z?.name||""} ${z?.country||""}`))iranSpecific++;
        if(/Persian Gulf|Gulf of Oman/i.test(z?.name||""))gulfSpecific++;
      }
      let score=8+Math.min(38,active.length*6)+Math.min(24,recentChanges*12)+(iranSpecific?8:0)+(gulfSpecific?5:0);
      if(iranSpecific&&gulfSpecific)score=Math.max(score,58);else if(iranSpecific)score=Math.max(score,48);
      if(active.length>=4)score=Math.max(score,55);
      score=escClamp(Math.min(90,score));
      const reason=active.length
        ? `EASA מציגה ${active.length} אזהרות Conflict Zone פעילות הרלוונטיות לאיראן/ישראל והמרחב האזורי${recentChanges?`, מהן ${recentChanges} עודכנו בעשרת הימים האחרונים`:""}.`
        : "לא זוהתה כרגע אזהרת Conflict Zone פעילה רלוונטית בייצוא הרשמי של EASA.";
      return escSignal("airrisk",score,true,reason,{source:"EASA Conflict Zone Advisories (JSON)",sourceUrl:pageUrl,freshness:"ייצוא JSON רשמי",stats:{activeRelevant:active.length,recentChanges,iranSpecific,gulfSpecific}});
    }
    throw new Error("empty EASA export");
  }catch(jsonError){
    // HTML fallback keeps the signal alive if EASA changes/temporarily blocks
    // its export endpoint.
    try{
      const html=await escFetch(pageUrl,{timeout:6500});const clean=normalizeSpace(stripHtml(html));const active=clean.split(/Status\s+Withdrawn/i)[0]||clean;
      const subjects=["Airspace of Iran","Persian Gulf and Gulf of Oman","Airspace of Jordan","Airspace of Iraq","Airspace of Lebanon","Middle East and Persian Gulf","Airspace of Israel"];
      let activeRelevant=0,recentChanges=0;
      for(const subject of subjects){const i=active.toLowerCase().indexOf(subject.toLowerCase());if(i<0)continue;activeRelevant++;const snippet=active.slice(Math.max(0,i-160),Math.min(active.length,i+340));let m;const rx=/(\d{2})\/(\d{2})\/(20\d{2})/g;while((m=rx.exec(snippet))){const ts=parseEscNumericDate(m[1],m[2],m[3]);if(ts&&Date.now()-ts>=-86400000&&Date.now()-ts<=10*86400000){recentChanges++;break;}}}
      let score=10+Math.min(38,activeRelevant*7)+Math.min(30,recentChanges*15);if(activeRelevant>=4)score=Math.max(score,55);score=escClamp(Math.min(88,score));
      const reason=activeRelevant?`EASA מציגה ${activeRelevant} אזהרות/הנחיות פעילות הרלוונטיות לאיראן ולמרחב האזורי${recentChanges?`, עם ${recentChanges} עדכונים מהימים האחרונים`:""}.`:`לא זוהתה כרגע אזהרת Conflict Zone פעילה רלוונטית ברשימה שנקראה.`;
      return escSignal("airrisk",score,true,reason,{source:"EASA Conflict Zone Advisories",sourceUrl:pageUrl,freshness:"HTML fallback",stats:{activeRelevant,recentChanges}});
    }catch(error){
      return escSignal("airrisk",0,false,`EASA אינו זמין כרגע: ${String(error?.message||jsonError?.message||error).slice(0,90)}`,{source:"EASA",sourceUrl:pageUrl,freshness:"לא זמין"});
    }
  }
}
async function fetchFaaAirRiskCorroboration(){
  const url="https://www.faa.gov/air_traffic/publications/us_restrictions";
  try{
    const html=await escFetch(url,{timeout:6500,cf:{cacheEverything:true,cacheTtl:600}});
    const clean=normalizeSpace(stripHtml(html));
    const relevant=(clean.match(/(?:Iran|Iraq|Persian Gulf and Gulf of Oman|Syria|Yemen)/gi)||[]).length;
    const m=clean.match(/Last updated:\s*(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)?,?\s*([A-Za-z]+\s+\d{1,2},\s+20\d{2})/i);
    const updated=m?Date.parse(`${m[1]} UTC`):NaN;
    const recent=Number.isFinite(updated)&&Date.now()-updated>=-86400000&&Date.now()-updated<=14*86400000;
    return {ok:true,url,relevant,recent,updatedAt:Number.isFinite(updated)?new Date(updated).toISOString():null};
  }catch(error){return {ok:false,url,relevant:0,recent:false,error:String(error?.message||error)};}
}
function mergeAirRiskWithFaa(base,faa){
  if(!faa?.ok)return base;
  const bonus=faa.recent?8:0;
  if(base?.available===false)return escSignal("airrisk",faa.recent?24:10,true,`EASA לא זמין ברענון זה; FAA מציגה מגבלות/אזהרות פעילות למרחבים אזוריים${faa.recent?" והעמוד עודכן ב־14 הימים האחרונים":""}.`,{source:"FAA Prohibitions & Restrictions",sourceUrl:faa.url,freshness:faa.recent?"FAA עודכן לאחרונה":"FAA זמין",stats:{faaRelevant:faa.relevant,faaRecent:faa.recent}});
  return {...base,score:escClamp(Number(base.score||0)+bonus),source:`${base.source||"EASA"} + FAA`,reason:`${base.reason} FAA משמשת מקור הצלבה נוסף למגבלות טיסה; ${faa.recent?"עמוד המגבלות עודכן לאחרונה ולכן נוסף חיזוק מתון.":"לא זוהה עדכון FAA חדש מספיק כדי לשנות את הציון."}`,stats:{...(base.stats||{}),faaRelevant:faa.relevant,faaRecent:faa.recent}};
}
async function fetchInternationalIranNewsSignal(){
  const sources=[
    {id:"esc-bbc",publisher:"bbc",name:"BBC Middle East",kind:"site",adapter:"rss",url:"https://feeds.bbci.co.uk/news/topics/cjnwl8q4ggwt/rss.xml",home:"https://www.bbc.com/news/world/middle_east",language:"en",verified:true},
    {id:"esc-aj",publisher:"aljazeera",name:"Al Jazeera",kind:"site",adapter:"rss",url:"https://www.aljazeera.com/xml/rss/all.xml",home:"https://www.aljazeera.com/",language:"en",verified:true}
  ];
  const settled=await Promise.allSettled(sources.map(src=>escFetch(src.url,{timeout:6000,headers:{Accept:"application/rss+xml,application/xml,text/xml,*/*"}})));
  const now=Date.now(),items=[];let reached=0;
  settled.forEach((res,i)=>{if(res.status!=="fulfilled")return;reached++;try{items.push(...parseRss(String(res.value||""),sources[i]));}catch{}});
  if(!reached)return escSignal("intlnews",0,false,"BBC ו-Al Jazeera אינם זמינים כרגע להצלבת חדשות בינלאומית.",{source:"BBC + Al Jazeera",sourceUrl:sources[0].home,freshness:"לא זמין"});
  const relevant=items.filter(r=>{const t=Date.parse(r?.publishedAt||0),text=`${r?.title||""} ${r?.preview||""}`;return Number.isFinite(t)&&now-t>=-600000&&now-t<=24*3600000&&ESCALATION_CORE_RX.test(text);});
  let denom=0,alerts=0,deescWeight=0,recentHard=0;const hardSources=new Set();
  for(const r of relevant){const text=`${r?.title||""} ${r?.preview||""}`,age=Math.max(0,now-Date.parse(r.publishedAt||now)),base=Math.pow(.5,age/(8*3600000));const hard=ESCALATION_HARD_RX.test(text),soft=ESCALATION_SOFT_RX.test(text),deesc=ESCALATION_DEESC_RX.test(text),boiler=ESCALATION_NEWS_BOILERPLATE_RX.test(String(r?.title||""));let a=hard?(deesc ? .35 : 1):(soft?(deesc ? .15 : .35):0);if(boiler)a=Math.min(a,.15);denom+=base;alerts+=base*a;if(deesc)deescWeight+=base;if(hard&&!deesc){hardSources.add(r.publisher||r.sourceId);if(age<=4*3600000)recentHard++;}}
  const ratio=denom?alerts/denom:0,deRatio=denom?deescWeight/denom:0;let score=5+Math.pow(Math.min(1,ratio),1.55)*76+Math.min(8,hardSources.size*4)+Math.min(8,recentHard*2)-deRatio*18;
  if(relevant.length<3)score=Math.min(score,35);if(hardSources.size<2)score=Math.min(score,58);score=escClamp(Math.round(score));
  const reason=relevant.length?`BBC ו-Al Jazeera: ${relevant.length} פריטים ממוקדי איראן ב־24 שעות; ${hardSources.size} מערכות חדשות בינלאומיות עם דיווחי הסלמה; ${recentHard} דיווחים קשים בארבע השעות האחרונות.`:"שני המקורות הבינלאומיים זמינים, אך לא אותרה מסה חדשה וממוקדת איראן ב־24 השעות האחרונות.";
  return escSignal("intlnews",score,true,reason,{source:"BBC World + Al Jazeera English",sourceUrl:sources[0].home,freshness:`${reached}/2 פידים בינלאומיים`,stats:{reached,relevant:relevant.length,hardSources:hardSources.size,recentHard,alertRatio:Number(ratio.toFixed(3)),deescalationRatio:Number(deRatio.toFixed(3))}});
}
function oilScoreFromContext({move24=0,move7=0,premium20=0,latest=null,source="Yahoo Finance / FRED"}={}){
  const up24=Math.max(0,Number(move24)||0),up7=Math.max(0,Number(move7)||0),premium=Math.max(0,Number(premium20)||0),price=Number(latest);
  let s24=8;if(up24>=1)s24=16;if(up24>=2)s24=28;if(up24>=4)s24=48;if(up24>=7)s24=68;if(up24>=10)s24=84;
  let s7=8;if(up7>=3)s7=20;if(up7>=6)s7=34;if(up7>=10)s7=52;if(up7>=15)s7=68;if(up7>=22)s7=82;
  let s20=8;if(premium>=4)s20=16;if(premium>=8)s20=27;if(premium>=12)s20=40;if(premium>=18)s20=56;if(premium>=25)s20=72;
  // V194: absolute Brent stress is deliberately only a partial floor. Oil can be
  // expensive for non-war reasons, so it cannot create a high index by itself;
  // it merely prevents a long-lived $90-$120 regime from normalising back to 8.
  let absolute=8;if(Number.isFinite(price)){if(price>=75)absolute=16;if(price>=80)absolute=24;if(price>=85)absolute=34;if(price>=90)absolute=46;if(price>=100)absolute=60;if(price>=115)absolute=74;if(price>=130)absolute=86;}
  const absoluteFloor=Math.round(absolute*.78),score=escClamp(Math.max(s24,s7,s20,absoluteFloor));
  return escSignal("oil",score,true,`${latest?`Brent סביב $${Number(latest).toFixed(2)}; `:""}24 שעות: ${Number(move24||0).toFixed(1)}% · 7 ימים: ${Number(move7||0).toFixed(1)}% · מול חציון כ־20 ימי מסחר: ${Number(premium20||0).toFixed(1)}%. נלקחת בחשבון גם רמת המחיר האבסולוטית במשקל מרוסן, כדי שמשבר ממושך לא יהפוך לבייסליין חדש.`,{source,sourceUrl:"https://fred.stlouisfed.org/series/DCOILBRENTEU",freshness:source.includes("Yahoo")?"שוק שעתי / גיבוי יומי":"גיבוי יומי",stats:{latest:Number(latest)||null,move24h:Number(move24)||0,move7d:Number(move7)||0,premium20d:Number(premium20)||0,absoluteStress:absolute,absoluteFloor}});
}
async function fetchOilSignal(){
  try{
    const j=await escFetch("https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1h&range=1mo",{timeout:5500,type:"json",headers:{Accept:"application/json"}});
    const r=j?.chart?.result?.[0],ts=r?.timestamp||[],cl=r?.indicators?.quote?.[0]?.close||[];
    const pairs=ts.map((t,i)=>[Number(t)*1000,Number(cl[i])]).filter(x=>Number.isFinite(x[0])&&Number.isFinite(x[1]));if(pairs.length<24)throw new Error("no Brent series");
    const latest=pairs[pairs.length-1];
    const closest=(target)=>pairs.reduce((best,p)=>Math.abs(p[0]-target)<Math.abs(best[0]-target)?p:best,pairs[0]);
    const p24=closest(latest[0]-24*3600000),p7=closest(latest[0]-7*86400000);
    const move24=(latest[1]/p24[1]-1)*100,move7=(latest[1]/p7[1]-1)*100;
    const daily=new Map();for(const [t,v] of pairs)daily.set(new Date(t).toISOString().slice(0,10),v);
    const priorDaily=[...daily.values()].slice(0,-1).slice(-20),median20=escMedian(priorDaily),premium20=median20?((latest[1]/median20)-1)*100:0;
    return oilScoreFromContext({move24,move7,premium20,latest:latest[1],source:"Yahoo Finance / FRED"});
  }catch(yahooError){
    try{
      const csv=await escFetch("https://fred.stlouisfed.org/graph/fredgraph.csv?id=DCOILBRENTEU",{timeout:6000});
      const vals=String(csv).split(/\r?\n/).slice(1).map(line=>{const m=line.match(/^(\d{4}-\d{2}-\d{2}),([\d.]+)/);return m?[m[1],Number(m[2])]:null;}).filter(Boolean).slice(-35);
      if(vals.length<8)throw new Error("no FRED observations");
      const latest=vals[vals.length-1][1],prior=vals[vals.length-2][1],prior7=vals[Math.max(0,vals.length-8)][1],median20=escMedian(vals.slice(Math.max(0,vals.length-21),-1).map(x=>x[1]));
      return oilScoreFromContext({move24:(latest/prior-1)*100,move7:(latest/prior7-1)*100,premium20:median20?((latest/median20)-1)*100:0,latest,source:"FRED"});
    }catch(error){return escSignal("oil",0,false,`נתוני Brent אינם זמינים כרגע: ${String(error?.message||yahooError?.message||error).slice(0,90)}`,{source:"FRED",sourceUrl:"https://fred.stlouisfed.org/series/DCOILBRENTEU",freshness:"לא זמין"});}
  }
}
const ESC_MONTHS="January|February|March|April|May|June|July|August|September|October|November|December";
const ESC_MONTHS_SHORT="Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec";
function extractRecentDatedSnippets(text,days=10){
  const clean=normalizeSpace(stripHtml(text)),hits=[];
  const patterns=[
    {rx:new RegExp("("+ESC_MONTHS+")\\s+(\\d{1,2}),\\s+(20\\d{2})","gi"),date:m=>`${m[1]} ${m[2]}, ${m[3]} UTC`},
    {rx:new RegExp("(\\d{1,2})\\s+("+ESC_MONTHS+")\\s+(20\\d{2})","gi"),date:m=>`${m[2]} ${m[1]}, ${m[3]} UTC`},
    {rx:new RegExp("(\\d{1,2})\\s+("+ESC_MONTHS_SHORT+")\\s+(20\\d{2})","gi"),date:m=>`${m[2]} ${m[1]}, ${m[3]} UTC`},
    {rx:new RegExp("("+ESC_MONTHS_SHORT+")\\s+(\\d{1,2}),?\\s+(20\\d{2})","gi"),date:m=>`${m[1]} ${m[2]}, ${m[3]} UTC`},
    {rx:/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g,date:m=>`${String(m[3]).length===2?`20${m[3]}`:m[3]}-${String(m[2]).padStart(2,"0")}-${String(m[1]).padStart(2,"0")}T12:00:00Z`}
  ];
  for(const entry of patterns){let m;while((m=entry.rx.exec(clean))&&hits.length<160){const date=Date.parse(entry.date(m));if(!Number.isFinite(date))continue;const age=Date.now()-date;if(age<=days*86400000&&age>=-86400000)hits.push({date,snippet:clean.slice(Math.max(0,m.index-80),Math.min(clean.length,m.index+500))});}}
  return hits.sort((a,b)=>b.date-a.date);
}
async function fetchUSPostureSignal(){
  const sources=[
    ["CENTCOM","https://www.centcom.mil/MEDIA/PUBLIC-RELEASES/"],
    ["State Dept Israel","https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/israel-west-bank-and-gaza-travel-advisory.html"],
    ["State Worldwide Caution","https://travel.state.gov/en/international-travel/travel-advisories/global-events/worldwide-caution.html"],
    ["White House","https://www.whitehouse.gov/?s=Iran"],
    ["U.S. DoD","https://www.defense.gov/News/Releases/Search/Iran/"]
  ];
  const results=await Promise.allSettled(sources.map(([,u])=>escFetch(u,{timeout:6500})));let escN=0,deN=0,severe=0,persistent=0,reached=0;const notes=[];
  results.forEach((res,i)=>{
    if(res.status!=="fulfilled")return;reached++;const label=sources[i][0],text=String(res.value||""),clean=normalizeSpace(stripHtml(text)).slice(0,22000);
    const recent=extractRecentDatedSnippets(text,21),anyDated=extractRecentDatedSnippets(text,365);const windowText=recent.length?recent.map(x=>x.snippet).join(" "):(anyDated.length?"":clean);
    const relevant=(windowText.match(/.{0,90}(?:Iran|Iranian|Israel|Middle East|Hormuz).{0,190}/gi)||[]).slice(0,20);
    const e=relevant.filter(x=>/(?:strike|attack|combat operation|military action|deploy|readiness|maximum pressure|blockade|threat|escalat|evacuat|heightened tension|carrier|bomber|tanker)/i.test(x)).length;
    const sev=relevant.filter(x=>/(?:authorized departure|ordered departure|combat operations|imminent|military strike|air strike|evacuat)/i.test(x)).length;
    const d=relevant.filter(x=>/(?:agreement|deal|ceasefire|talks|diplom|de-escalat|negotiat|truce)/i.test(x)).length;
    const liveRisk=/(?:heightened tensions in the Middle East|potential for unforeseen escalation|increased regional tensions can cause airlines to cancel|ordered (?:the )?departure.{0,120}(?:armed conflict|safety risks)|ongoing threat of drone and missile attacks from Iran|reconsider travel.{0,80}armed conflict)/i.test(clean);
    escN+=e;deN+=d;severe+=sev;if(liveRisk)persistent++;if(e||d||sev||liveRisk)notes.push(`${label}: ${e} מסלים${sev?` / ${sev} חזק`:""}${liveRisk?" / אזהרה פעילה":""} / ${d} מרגיע`);
  });
  if(!reached)return escSignal("us",0,false,"מקורות ארה״ב הרשמיים אינם זמינים כרגע.",{source:"CENTCOM + DoD + State Dept",sourceUrl:sources[0][1],freshness:"לא זמין"});
  let score=10+Math.min(44,escN*5)+Math.min(24,severe*12)+Math.min(28,persistent*8)-Math.min(28,deN*6);score=escClamp(Math.min(92,score));
  return escSignal("us",score,true,notes.length?notes.join(" · "):"לא אותר שינוי חריג בעמדה הפומבית במקורות האמריקאיים שנבדקו.",{source:"CENTCOM + DoD + State Dept + White House",sourceUrl:sources[0][1],freshness:`${reached}/5 מקורות הגיעו`,stats:{escalationMentions:escN,severeMentions:severe,persistentWarnings:persistent,deescalationMentions:deN,reached}});
}
async function fetchMaritimeSignal(){
  const urls={ukmto:"https://www.ukmto.org/recent-incidents",home:"https://www.ukmto.org/",jmic:"https://www.ukmto.org/partner-products/jmic-products/jmic-advisories/2026",advisories:"https://www.maritime.dot.gov/msci-advisories",alerts:"https://www.maritime.dot.gov/msci-alerts"};
  const [u,h,j,m,a]=await Promise.allSettled([escFetch(urls.ukmto,{timeout:6500}),escFetch(urls.home,{timeout:6500}),escFetch(urls.jmic,{timeout:6500}),escFetch(urls.advisories,{timeout:6500}),escFetch(urls.alerts,{timeout:6500})]);
  if([u,h,j,m,a].every(x=>x.status!=="fulfilled"))return escSignal("maritime",0,false,"מקורות UKMTO/JMIC ו-MARAD אינם זמינים כרגע.",{source:"UKMTO/JMIC + U.S. MARAD",sourceUrl:urls.ukmto,freshness:"לא זמין"});
  const ukTexts=[u,h,j].filter(x=>x.status==="fulfilled").map(x=>String(x.value||""));
  let focus=[];for(const text of ukTexts){const recent=extractRecentDatedSnippets(text,14);focus.push(...recent.filter(x=>/(?:Hormuz|Arabian Gulf|Persian Gulf|Gulf of Oman|Fujairah|UAE|Qatar|Bahrain|Kuwait|Iran)/i.test(x.snippet)));}
  const attackRows=focus.filter(x=>/(?:Attack|Hijack|projectile|fired|RPG|explosion|missile|drone|UAV|USV|struck)/i.test(x.snippet));
  const attackDays=new Set(attackRows.map(x=>new Date(x.date).toISOString().slice(0,10))).size;
  const suspicious=focus.filter(x=>/(?:Suspicious Activity|approached|unauthorised|interference|harassment|surveillance)/i.test(x.snippet)).length;
  const liveText=normalizeSpace(stripHtml(ukTexts.join(" "))).slice(0,50000);
  const severeLevel=/(?:Regional Threat Level\s*:?\s*SEVERE|Strait of Hormuz.{0,180}\bSEVERE\b|threat level remains SEVERE)/i.test(liveText)?1:0;
  const reducedTraffic=/(?:commercial traffic.{0,100}reduced levels|traffic through the Strait of Hormuz.{0,120}reduced|single-digit.{0,80}tankers)/i.test(liveText)?1:0;
  const blockade=/(?:blockade enforcement|naval blockade|blockade remains enforced)/i.test(liveText)?1:0;
  let advisory=0,alert=0;if(m.status==="fulfilled"){const active=normalizeSpace(stripHtml(m.value)).split(/Cancelled Advisories/i)[0];if(/Persian Gulf|Strait of Hormuz|Gulf of Oman/i.test(active)&&/Iran/i.test(active))advisory=1;}if(a.status==="fulfilled"){const active=normalizeSpace(stripHtml(a.value)).split(/Cancelled Alerts/i)[0];if(/Persian Gulf|Strait of Hormuz|Gulf of Oman|Iran/i.test(active)&&!/no active alerts at this time/i.test(active))alert=1;}
  const attackPoints=attackDays?32+Math.min(36,(attackDays-1)*18):0;
  let score=8+attackPoints+Math.min(14,suspicious*5)+(severeLevel?18:0)+(reducedTraffic?8:0)+(blockade?8:0)+(advisory?12:0)+(alert?25:0);score=escClamp(Math.min(95,score));
  const reason=`UKMTO/JMIC: ${focus.length} אירועים רלוונטיים ב־14 ימים (${attackDays} ימי תקיפה מאומתים/מדווחים, ${suspicious} אינדיקציות חשודות)${severeLevel?" · רמת איום SEVERE":""}${reducedTraffic?" · תנועת הורמוז מצומצמת":""}${blockade?" · פעילות אכיפה/חסימה ימית":""}. MARAD: ${advisory?"אזהרה פעילה רלוונטית":"ללא אזהרה פעילה רלוונטית שזוהתה"}${alert?" + התרעת חירום פעילה":""}.`;
  return escSignal("maritime",score,true,reason,{source:"UKMTO/JMIC + U.S. MARAD",sourceUrl:urls.ukmto,freshness:`${ukTexts.length}/3 מקורות UKMTO/JMIC · ${[m,a].filter(x=>x.status==="fulfilled").length}/2 MARAD`,stats:{regionalIncidents:focus.length,attackDays,suspicious,severeLevel,reducedTraffic,blockade,maradAdvisory:advisory,maradAlert:alert}});
}
async function fetchNuclearSignal(){
  const urls=["https://www-news.iaea.org/EventList.aspx","https://www.iaea.org/newscenter/focus/iran"];
  const results=await Promise.allSettled(urls.map(u=>escFetch(u,{timeout:6500})));const texts=results.filter(x=>x.status==="fulfilled").map(x=>x.value);if(!texts.length)return escSignal("nuclear",0,false,"מקורות IAEA אינם זמינים כרגע.",{source:"IAEA",sourceUrl:urls[0],freshness:"לא זמין"});
  const snippets=[];for(const text of texts)snippets.push(...extractRecentDatedSnippets(text,21));const iran=snippets.filter(x=>/Iran|Iranian|Bushehr|Esfahan|Natanz|Fordow/i.test(x.snippet));const incidents=iran.filter(x=>/(?:attack|strike|projectile|missile|damage|explosion|nuclear power plant|nuclear facilit)/i.test(x.snippet)).length;const concern=iran.filter(x=>/(?:safeguard|verification|inspection|enrichment|uranium|cooperation|concern)/i.test(x.snippet)).length;let score=8+Math.min(66,incidents*24)+Math.min(20,concern*5);if(!iran.length)score=8;score=escClamp(score);const reason=iran.length?`IAEA: ${iran.length} עדכונים רלוונטיים לאיראן ב־21 הימים האחרונים, מהם ${incidents} אירועי תקיפה/פגיעה ו־${concern} אזכורי גרעין/פיקוח משמעותיים.`:"לא נמצא בפרסומי IAEA שנקראו עדכון חדש ורלוונטי לאיראן בחלון 21 הימים.";return escSignal("nuclear",score,true,reason,{source:"IAEA",sourceUrl:urls[0],freshness:`${texts.length}/2 מקורות IAEA`,stats:{recentIran:iran.length,incidents,concern}});
}
function parseMaybeJson(value){if(Array.isArray(value))return value;try{return JSON.parse(String(value||""));}catch{return [];}}
async function fetchPredictionMarketSignal(){
  const base="https://gamma-api.polymarket.com/public-search",queries=["US Iran ceasefire","US strike Iran","Israel strike Iran","Iran attack Israel"];
  const settled=await Promise.allSettled(queries.map(q=>escFetch(`${base}?q=${encodeURIComponent(q)}&events_status=active&limit_per_type=12&search_profiles=false`,{timeout:5500,type:"json",headers:{Accept:"application/json"}})));
  const payloads=settled.filter(x=>x.status==="fulfilled"&&x.value).map(x=>x.value);
  if(!payloads.length)return escSignal("market",0,false,"Polymarket אינו זמין כרגע.",{source:"Polymarket",sourceUrl:"https://polymarket.com/",freshness:"לא זמין"});
  const markets=[];for(const payload of payloads){for(const e of Array.isArray(payload?.events)?payload.events:[]){for(const m of Array.isArray(e?.markets)?e.markets:[])markets.push({...m,_event:e});}if(Array.isArray(payload?.markets))markets.push(...payload.markets);}
  let best=null;
  for(const m of markets){if(m?.active===false||m?.closed===true)continue;const text=String(m?.question||m?.title||m?._event?.title||"");if(!/iran/i.test(text))continue;const outcomes=parseMaybeJson(m?.outcomes),prices=parseMaybeJson(m?.outcomePrices),yi=outcomes.findIndex(x=>String(x).toLowerCase()==="yes"),pRaw=Number(prices[yi>=0?yi:0]);if(!Number.isFinite(pRaw))continue;const yes=escClamp(pRaw<=1?pRaw*100:pRaw),liq=Number(m?.liquidityNum??m?.liquidity??m?._event?.liquidity??0)||0;
    let risk=null,relevance=0,kind="";
    if(/ceasefire.{0,80}continues?\s+through/i.test(text)){risk=100-yes;relevance=100;kind="ceasefire-inverse";}
    else if(/(?:US|U\.S\.|United States|Israel).{0,70}(?:strike|attack|bomb).{0,70}Iran|Iran.{0,70}(?:strike|attack|bomb).{0,70}(?:US|U\.S\.|United States|Israel)/i.test(text)){risk=yes;relevance=88;kind="near-conflict";}
    else if(/(?:strike|attack|military|bomb)/i.test(text)){risk=yes;relevance=62;kind="generic";}
    if(risk===null)continue;
    const horizonBoost=/(?:within|next)\s+7\s+days|this week|by\s+(?:tomorrow|Friday|Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday)/i.test(text)?10:0;
    const longPenalty=/(?:before 2027|by (?:November|December)|this year)/i.test(text)?25:0;
    const rank=relevance+horizonBoost-longPenalty+Math.log10(liq+1)*2;
    if(!best||rank>best.rank)best={m,risk:escClamp(risk),yes,liq,rank,kind,text};
  }
  if(!best)return escSignal("market",10,true,"לא נמצא כרגע שוק פעיל וקצר־טווח שרלוונטי מספיק למתיחות איראן; הסיגנל נשאר במשקל נמוך.",{source:"Polymarket",sourceUrl:"https://polymarket.com/",freshness:"API ציבורי",stats:{marketsScanned:markets.length}});
  const score=escClamp(Math.round(best.risk)),q=best.text.slice(0,140),explanation=best.kind==="ceasefire-inverse"?`הסיכון מחושב כהיפוך מחיר YES להמשך הפסקת האש: ${best.risk.toFixed(0)}%.`:`מחיר YES בשוק הרלוונטי: ${best.yes.toFixed(0)}%.`;
  return escSignal("market",score,true,`${explanation} “${q}”`,{source:"Polymarket",sourceUrl:"https://polymarket.com/",freshness:"שוק חיזוי חי / עדיפות לטווח קצר",stats:{risk:best.risk,yesProbability:best.yes,liquidity:best.liq,question:q,kind:best.kind,marketsScanned:markets.length}});
}
async function fetchDiplomaticRiskSignal(){
  const sources=[
    ["FCDO ישראל","https://www.gov.uk/foreign-travel-advice/israel"],["FCDO איראן","https://www.gov.uk/foreign-travel-advice/iran"],["FCDO לבנון","https://www.gov.uk/foreign-travel-advice/lebanon"],["FCDO ירדן","https://www.gov.uk/foreign-travel-advice/jordan"],
    ["State Worldwide","https://travel.state.gov/en/international-travel/travel-advisories/global-events/worldwide-caution.html"],["State Israel","https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/israel-west-bank-and-gaza-travel-advisory.html"]
  ];
  const results=await Promise.allSettled(sources.map(([,u])=>escFetch(u,{timeout:6000,cf:{cacheEverything:true,cacheTtl:300}})));
  let reached=0,recentUpdates=0,recentStrong=0,persistentStrong=0;const notes=[];
  results.forEach((res,i)=>{
    if(res.status!=="fulfilled")return;reached++;const label=sources[i][0],clean=normalizeSpace(stripHtml(res.value)).slice(0,24000);
    const m=clean.match(/Updated:\s*(\d{1,2}\s+[A-Za-z]+\s+20\d{2})/i)||clean.match(/Date issued:\s*([A-Za-z]+\s+\d{1,2},?\s+20\d{2})/i)||clean.match(/([A-Za-z]+\s+\d{1,2})\s*-\s*Worldwide Caution/i);
    let updated=NaN;if(m){const raw=m[1]||m[0];updated=Date.parse(`${raw.replace(/Worldwide Caution/i,"")} UTC`);}
    const age=Number.isFinite(updated)?Date.now()-updated:Infinity,recent=age>=-86400000&&age<=21*86400000;
    const strong=/(?:regional tensions|recent strikes|retaliatory attacks|potential for unforeseen escalation|heightened tensions in the Middle East|ongoing threat of drone and missile attacks from Iran|commercial flight options|airspace closure|airlines to cancel|ordered departure.{0,120}(?:armed conflict|safety risks)|consider departing|consider leaving|leave immediately)/i.test(clean);
    if(recent)recentUpdates++;if(strong)persistentStrong++;if(recent&&strong)recentStrong++;if(strong||recent)notes.push(`${label}: ${strong?"אזהרת סיכון אזורית פעילה":"ללא ניסוח הסלמה חריג"}${recent?" · עודכן לאחרונה":""}`);
  });
  if(!reached)return escSignal("diplomatic",0,false,"אזהרות נסיעה בינלאומיות אינן זמינות כרגע.",{source:"UK FCDO + U.S. State Department",sourceUrl:sources[0][1],freshness:"לא זמין"});
  let score=8+Math.min(35,persistentStrong*7)+Math.min(20,recentUpdates*5)+Math.min(24,recentStrong*8);score=escClamp(Math.min(82,score));
  const reason=notes.length?notes.slice(0,6).join(" · "):"מקורות האזהרות זמינים, אך לא זוהה ניסוח אזורי משמעותי שמעלה את הסיגנל.";
  return escSignal("diplomatic",score,true,reason,{source:"UK FCDO + U.S. State Department",sourceUrl:sources[0][1],freshness:`${reached}/6 מקורות הגיעו`,stats:{reached,recentUpdates,recentStrong,persistentStrong}});
}
async function fetchPizzaExperimental(){
  const url="https://www.pizzint.watch/";try{const html=await escFetch(url,{timeout:6000});const text=normalizeSpace(stripHtml(html));const m=text.match(/DOUGHCON\s*([1-5])/i);if(!m)return {available:false,weight:0,experimental:true,reason:"PizzINT נטען אך רמת DOUGHCON לא זוהתה.",source:"PizzINT",sourceUrl:url,checkedAt:new Date().toISOString()};const level=Number(m[1]),mapping={5:10,4:30,3:55,2:78,1:94};return {available:true,weight:0,experimental:true,level:`DOUGHCON ${level}`,score:mapping[level],reason:`PizzINT מציג DOUGHCON ${level}. מוצג לניטור OSINT בלבד ואינו משפיע על דופק ההסלמה.`,source:"PizzINT",sourceUrl:url,checkedAt:new Date().toISOString()};}catch(error){return {available:false,weight:0,experimental:true,reason:`מדד הפיצה אינו זמין כרגע: ${String(error?.message||error).slice(0,80)}`,source:"PizzINT",sourceUrl:url,checkedAt:new Date().toISOString()};}
}
async function collectExternalEscalationSignals(){
  const [airBundle,notam,airriskBase,faa,oil,us,maritime,nuclear,market,diplomatic,intlnews,pizza]=await Promise.all([fetchAviationSignals(),fetchNotamSignal(),fetchEasaAirRiskSignal(),fetchFaaAirRiskCorroboration(),fetchOilSignal(),fetchUSPostureSignal(),fetchMaritimeSignal(),fetchNuclearSignal(),fetchPredictionMarketSignal(),fetchDiplomaticRiskSignal(),fetchInternationalIranNewsSignal(),fetchPizzaExperimental()]);
  const airrisk=mergeAirRiskWithFaa(airriskBase,faa);
  return {signals:{aviation:airBundle.aviation,military:airBundle.military,notam,airrisk,oil,us,maritime,nuclear,market,diplomatic,intlnews},experimental:{pizza},updatedAt:new Date().toISOString()};
}
// V167 background calibration refresh: split the external OSINT set into three
// independent five-minute batches. Each signal family still refreshes roughly
// every 15 minutes, but no scheduled invocation has to perform the whole set.
async function collectExternalEscalationSignalGroup(groupIndex=0){
  const group=((Number(groupIndex)||0)%3+3)%3;
  if(group===0){
    const [airBundle,notam,airriskBase,faa,oil]=await Promise.all([fetchAviationSignals(),fetchNotamSignal(),fetchEasaAirRiskSignal(),fetchFaaAirRiskCorroboration(),fetchOilSignal()]);
    const airrisk=mergeAirRiskWithFaa(airriskBase,faa);
    return {signals:{aviation:airBundle.aviation,military:airBundle.military,notam,airrisk,oil},experimental:{},updatedAt:new Date().toISOString(),group};
  }
  if(group===1){
    const [us,maritime,nuclear]=await Promise.all([fetchUSPostureSignal(),fetchMaritimeSignal(),fetchNuclearSignal()]);
    return {signals:{us,maritime,nuclear},experimental:{},updatedAt:new Date().toISOString(),group};
  }
  const [market,diplomatic,intlnews,pizza]=await Promise.all([fetchPredictionMarketSignal(),fetchDiplomaticRiskSignal(),fetchInternationalIranNewsSignal(),fetchPizzaExperimental()]);
  return {signals:{market,diplomatic,intlnews},experimental:{pizza},updatedAt:new Date().toISOString(),group};
}
function mergeEscalationExternal(previous,fresh){
  const now=Date.now(),out={signals:{},experimental:{},updatedAt:fresh?.updatedAt||previous?.updatedAt||new Date().toISOString()};
  for(const k of ["aviation","military","notam","airrisk","oil","us","maritime","nuclear","market","diplomatic","intlnews"]){
    const n=fresh?.signals?.[k],p=previous?.signals?.[k];
    if(n===undefined&&p){out.signals[k]={...p};continue;}
    if(n?.available!==false){out.signals[k]={...n,stale:false,staleAgeMinutes:0};continue;}
    const age=p?now-Date.parse(p.checkedAt||previous?.updatedAt||0):Infinity,ageMinutes=Number.isFinite(age)?Math.max(0,age/60000):Infinity;
    if(p?.available!==false&&Number.isFinite(age)&&age<60*60000)out.signals[k]={...p,stale:true,staleAgeMinutes:Number(ageMinutes.toFixed(1)),freshness:`נתון שמור מלפני ${Math.max(1,Math.round(ageMinutes))} דק׳`,reason:`${String(p.reason||"").replace(/ \(המקור לא הגיב ברענון האחרון\)$/,'')} (המקור לא הגיב ברענון האחרון)`};
    else out.signals[k]=n||escSignal(k,0,false,"המקור אינו זמין כרגע.",{freshness:"לא זמין"});
  }
  out.experimental.pizza=fresh?.experimental?.pizza||previous?.experimental?.pizza||null;return out;
}
async function escalationHubCall(env,path,method="GET",body=null){const stub=pushHubStub(env);if(!stub)throw new Error("Escalation state storage is not bound");const init={method,headers:{"Content-Type":"application/json"}};if(body!==null)init.body=JSON.stringify(body);const r=await stub.fetch(new Request(`https://push.internal${path}`,init));const data=await r.json().catch(()=>null);if(!r.ok)throw new Error(data?.error||`Escalation hub ${r.status}`);return data;}
async function handleEscalation(request,env,ctx){
  try{
    const requestUrl=new URL(request.url),presenceDeviceId=String(requestUrl.searchParams.get("presenceDeviceId")||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120);
    if(presenceDeviceId&&ctx?.waitUntil)ctx.waitUntil(adminHubCall(env,"/presence",{deviceId:presenceDeviceId,page:"escalation"}).catch(()=>{}));
    const claim=await escalationHubCall(env,"/escalation/claim","POST",{});
    if(!claim?.claimed&&claim?.public?.latest)return json(claim.public,200,{"Cache-Control":"no-store","X-Hadashota-Version":"214.0.0"});
    if(!claim?.claimed){const p=await escalationHubCall(env,"/escalation/public");return json(p,200,{"Cache-Control":"no-store","X-Hadashota-Version":"214.0.0"});}
    const cacheData=await readEscalationNewsCache(request);const orefPromise=fetchOrefForEscalation();const idfWebPromise=fetchIdfOfficialForEscalation();const nscWebPromise=fetchNscOfficialForEscalation();let external=claim.external||null;
    if(claim.externalDue||!external){const fresh=await collectExternalEscalationSignals();external=mergeEscalationExternal(claim.external,fresh);}
    const [oref,idfWeb,nscWeb]=await Promise.all([orefPromise,idfWebPromise,nscWebPromise]);const localSignals={news:scoreKoteretNews(cacheData),official:scoreOfficialSignal(cacheData,oref,idfWeb,nscWeb)};
    const payload={signals:{...localSignals,...(external?.signals||{})},experimental:external?.experimental||{},external,externalUpdatedAt:external?.updatedAt||claim.externalUpdatedAt||null,collectedAt:new Date().toISOString()};
    const publicData=await escalationHubCall(env,"/escalation/snapshot","POST",payload);return json(publicData,200,{"Cache-Control":"no-store","X-Hadashota-Version":"214.0.0"});
  }catch(error){console.warn("Escalation refresh failed",error);try{const p=await escalationHubCall(env,"/escalation/public");return json({...p,refreshError:String(error?.message||error)},200,{"Cache-Control":"no-store","X-Hadashota-Version":"214.0.0"});}catch{return json({ok:false,error:"Escalation index temporarily unavailable"},503,{"Cache-Control":"no-store"});}}
}
function escPublicHistory(history){return (Array.isArray(history)?history:[]).filter(x=>x&&Number.isFinite(Number(x.score))&&x.at).slice(-900);}
function escClosestScore(history,target){let best=null,dist=Infinity;for(const row of history||[]){const d=Math.abs(Date.parse(row?.at||0)-target);if(d<dist){dist=d;best=row;}}return dist<=3*3600000?Number(best?.score):null;}
async function escUpdateSeriesBaseline(storage,signal,{storageKey,rawField,mode}){
  const now=Date.now();let samples=Array.isArray(await storage.get(storageKey))?await storage.get(storageKey):[];
  samples=samples.filter(x=>Number.isFinite(Number(x?.count))&&Number.isFinite(Date.parse(x?.at))&&now-Date.parse(x.at)<180*86400000);
  if(signal?.available===false||!Number.isFinite(Number(signal?.[rawField])))return;
  const current=Number(signal[rawField]),last=samples[samples.length-1];
  // V194: one hourly sample is enough for time-of-day baselines and lets us keep
  // roughly six months of history without growing the Durable Object value.
  if(!last||now-Date.parse(last.at)>55*60000){samples.push({at:new Date().toISOString(),count:current});samples=samples.slice(-4600);await storage.put(storageKey,samples);}
  const hour=new Date().getUTCHours();let comparable=samples.filter(x=>now-Date.parse(x.at)>36*3600000&&Math.min((new Date(x.at).getUTCHours()-hour+24)%24,(hour-new Date(x.at).getUTCHours()+24)%24)<=1).map(x=>Number(x.count));
  if(comparable.length<8)comparable=samples.filter(x=>now-Date.parse(x.at)>24*3600000).slice(-720).map(x=>Number(x.count));
  let candidate=mode==="aviation"?escQuantile(comparable,.65):escMedian(comparable),baseline=candidate;
  if(Number.isFinite(candidate)){
    const refKey=`${storageKey}.reference`,refs=await storage.get(refKey)||{},prev=refs?.[hour];
    if(prev&&Number.isFinite(Number(prev.value))&&Number.isFinite(Date.parse(prev.at))){const days=Math.max(1/24,(now-Date.parse(prev.at))/86400000),maxDrop=Math.pow(mode==="aviation"?.995:.97,days),guarded=Number(prev.value)*maxDrop;baseline=Math.max(candidate,guarded);}
    refs[hour]={value:Number(baseline.toFixed(2)),at:new Date().toISOString()};await storage.put(refKey,refs);
  }
  if(mode==="aviation"){
    if(Number.isFinite(baseline)&&comparable.length>=12&&baseline>3){const drop=(baseline-current)/baseline;let score=8;if(drop>.15)score=22;if(drop>.28)score=42;if(drop>.40)score=62;if(drop>.52)score=79;if(drop>.65)score=92;signal.score=score;signal.reason=`נמדדו ${current} מטוסים אזרחיים מול קו בסיס ארוך־טווח ${Math.round(baseline)} (${drop>0?"ירידה":"ללא ירידה"} ${Math.abs(drop*100).toFixed(0)}%). קו הבסיס נשמר עד 180 יום, משתמש ברמת פעילות אופיינית־גבוהה לשעת היום ואינו רשאי לצנוח במהירות בזמן משבר מתמשך.`;signal.stats={...(signal.stats||{}),baseline:Number(baseline.toFixed(1)),candidateBaseline:Number(candidate?.toFixed?.(1)??candidate),dropPercent:Number((drop*100).toFixed(1)),baselineSamples:comparable.length,baselineWindowDays:180};}
    else{signal.score=Math.min(20,Number(signal.score)||15);signal.reason=`נמדדו ${current} מטוסים אזרחיים. המערכת עדיין לומדת קו בסיס תעופתי ארוך־טווח (${comparable.length}/12 דגימות מינימום).`;}
  }
  if(mode==="military"){
    if(Number.isFinite(baseline)&&comparable.length>=12){const increase=current-baseline,ratio=baseline>=1?current/baseline:current;let score=6;if(current>=3&&increase>=2)score=20;if(current>=5&&(ratio>=1.7||increase>=3))score=34;if(current>=8&&ratio>=2)score=48;if(current>=12&&ratio>=2.2)score=62;signal.score=Math.min(62,score);signal.reason=`זוהו ${current} מטוסים צבאיים גלויים מול קו בסיס ${Number(baseline.toFixed(1))}. זהו סיגנל הצלבה במשקל נמוך: מטוסים מבצעיים רבים אינם משדרים ADS-B.`;signal.stats={...(signal.stats||{}),baseline:Number(baseline.toFixed(1)),increase:Number(increase.toFixed(1)),ratio:Number(ratio.toFixed(2)),baselineSamples:comparable.length,limitedCoverage:true};}
    else{signal.score=Math.min(34,Number(signal.score)||6);signal.reason=`זוהו ${current} מטוסים צבאיים גלויים. המערכת עדיין לומדת קו בסיס (${comparable.length}/12 דגימות מינימום); הכיסוי חלקי ולכן הסיגנל נשאר במשקל נמוך.`;}
  }
}
function escSignalQualityFactor(s){
  if(!s||s.available===false)return 0;const st=s.stats||{};let q=1;
  if(s.key==="aviation")q=Math.max(.70,Math.min(1,Number(st.samplePoints||0)/4));
  else if(s.key==="military")q=Math.max(.45,Math.min(.75,Number(st.samplePoints||0)/2));
  else if(s.key==="us")q=Math.max(.60,Math.min(1,Number(st.reached||0)/5));
  else if(s.key==="diplomatic")q=Math.max(.60,Math.min(1,Number(st.reached||0)/6));
  else if(s.key==="intlnews")q=Math.max(.65,Math.min(1,Number(st.reached||0)/2));
  else if(s.key==="market"){const liq=Number(st.liquidity||0);q=liq>=100000?1:liq>=25000?.85:liq>=5000?.68:.55;}
  return q;
}
function escSignalSmoothingProfile(key){
  const map={official:[6*60,90*60],news:[15*60,3*3600],intlnews:[25*60,4*3600],aviation:[25*60,6*3600],military:[30*60,3*3600],notam:[15*60,4*3600],airrisk:[35*60,8*3600],oil:[40*60,8*3600],us:[25*60,6*3600],maritime:[25*60,8*3600],nuclear:[45*60,12*3600],market:[20*60,2*3600],diplomatic:[45*60,12*3600]};return map[key]||[30*60,6*3600];
}
function escSmoothSignalScore(signal,prevSignal,previousSnapshot,now){
  const raw=escClamp(signal?.score);if(!prevSignal||previousSnapshot?.modelVersion!==ESCALATION_MODEL_VERSION||signal?.available===false||prevSignal?.available===false||signal?.stale)return {...signal,rawSignalScore:raw,score:raw};
  // Active Home Front alerts are verified real-time evidence and must register immediately.
  if(signal.key==="official"&&Number(signal?.stats?.activeAlerts||0)>0)return {...signal,rawSignalScore:raw,score:raw};
  const prev=escClamp(prevSignal.score),dt=Math.max(15,Math.min(15*60,(now-Date.parse(previousSnapshot?.updatedAt||now))/1000));const [upHalf,downHalf]=escSignalSmoothingProfile(signal.key),half=raw>prev?upHalf:downHalf,alpha=1-Math.exp(-Math.LN2*dt/half);const score=prev+alpha*(raw-prev);return {...signal,rawSignalScore:raw,score:Number(escClamp(score).toFixed(1))};
}
function escWeightedDomainScore(signals,keys,field="score"){
  const rows=signals.filter(s=>keys.includes(s.key)&&s.available!==false&&!s.stale);if(!rows.length)return 0;
  const weighted=rows.map(s=>{const q=escSignalQualityFactor(s),w=Number(s.weight||0)*q,v=escClamp(field==="raw"?(s.rawSignalScore??s.score):s.score);return {w,v};}).filter(x=>x.w>0);
  const total=weighted.reduce((a,x)=>a+x.w,0);if(!total)return 0;
  const mean=weighted.reduce((a,x)=>a+x.v*x.w,0)/total;
  const rms=Math.sqrt(weighted.reduce((a,x)=>a+x.v*x.v*x.w,0)/total);
  // V194: a domain is a blend of average stress and RMS stress. RMS lets a
  // genuinely severe sub-signal register without allowing a single source to
  // become the whole domain.
  return escClamp(mean*.72+rms*.28);
}
function escDomainNowcast(signals,groups,field="score"){
  const scores={},available={};
  for(const [name,keys] of Object.entries(groups)){
    const rows=signals.filter(s=>keys.includes(s.key)&&s.available!==false&&!s.stale);
    available[name]=rows.length>0;scores[name]=Number(escWeightedDomainScore(signals,keys,field).toFixed(1));
  }
  const rows=Object.entries(ESCALATION_DOMAIN_WEIGHTS).filter(([k])=>available[k]).map(([k,w])=>({key:k,w:Number(w),v:escClamp(scores[k])}));
  const total=rows.reduce((a,x)=>a+x.w,0);if(!total)return {score:0,mean:0,rms:0,top3:0,multiplier:1,corroborating:0,strong:0,scores,available};
  const mean=rows.reduce((a,x)=>a+x.v*x.w,0)/total;
  const rms=Math.sqrt(rows.reduce((a,x)=>a+x.v*x.v*x.w,0)/total);
  const sorted=[...rows].sort((a,b)=>b.v-a.v),top=sorted.slice(0,Math.min(3,sorted.length));
  const top3=top.length?top.reduce((a,x)=>a+x.v,0)/top.length:mean;
  const corroborating=rows.filter(x=>x.v>=60).length,strong=rows.filter(x=>x.v>=75).length;
  const hardElevated=rows.some(x=>["official","air","posture","maritime","nuclear"].includes(x.key)&&x.v>=60);
  // Convergence bonus is deliberately mild. It rewards independent confirmation,
  // not repeated headlines. Without a hard domain it is essentially disabled.
  let multiplier=1+Math.max(0,corroborating-1)*.025+strong*.0125;multiplier=Math.min(1.16,multiplier);if(!hardElevated)multiplier=Math.min(multiplier,1.02);
  const blended=(mean*.58+rms*.27+top3*.15)*multiplier;
  return {score:Number(escClamp(blended).toFixed(1)),mean:Number(mean.toFixed(1)),rms:Number(rms.toFixed(1)),top3:Number(top3.toFixed(1)),multiplier:Number(multiplier.toFixed(3)),corroborating,strong,scores,available};
}
function escStrategicFlags(signals){
  const byKey=new Map((signals||[]).map(s=>[s.key,s]));const maritime=byKey.get("maritime")?.stats||{},us=byKey.get("us")?.stats||{};
  return {
    maritime:!!(maritime.severeLevel||maritime.reducedTraffic||maritime.blockade||maritime.maradAlert||maritime.maradAdvisory),
    posture:Number(us.persistentWarnings||0)>0||Number(us.severeMentions||0)>0,
    official:Number(byKey.get("official")?.score||0)>=55,
    air:Number(byKey.get("airrisk")?.score||0)>=55||Number(byKey.get("notam")?.score||0)>=55||Number(byKey.get("aviation")?.score||0)>=60,
    nuclear:Number(byKey.get("nuclear")?.score||0)>=55,
    verifiedNews:Number(byKey.get("news")?.stats?.contextTrustedHardSources||0)>=3||Number(byKey.get("intlnews")?.stats?.hardSources||0)>=2
  };
}
async function escUpdateStrategicRegime(storage,{contextNowcast,domainScores,signals,previous,now}){
  const flags=escStrategicFlags(signals),flagCount=Object.values(flags).filter(Boolean).length;
  const values=["news","official","air","posture","maritime","nuclear"].map(k=>escClamp(domainScores?.[k]||0));
  const supporting=values.filter(v=>v>=50).length,strong=values.filter(v=>v>=65).length;
  // The regime score comes from current evidence. There is no fixed "war floor".
  // Memory only slows normalization while the present sensor set still confirms
  // structural stress.
  const top4=[...values].sort((a,b)=>b-a).slice(0,4),top4Mean=top4.length?top4.reduce((a,v)=>a+v,0)/top4.length:0;
  const instant=escClamp(contextNowcast*.78+top4Mean*.22);
  const key="escalation.strategicRegime.v192";const prevState=await storage.get(key);let memory=instant;
  if(prevState&&previous?.modelVersion===ESCALATION_MODEL_VERSION&&Number.isFinite(Number(prevState.score))){
    const prevScore=escClamp(prevState.score),dt=Math.max(30,Math.min(3600,(now-Date.parse(prevState.updatedAt||now))/1000));
    const downHalf=flagCount>=4?24*3600:flagCount===3?16*3600:flagCount===2?8*3600:3*3600,half=instant>prevScore?20*60:downHalf,alpha=1-Math.exp(-Math.LN2*dt/half);memory=prevScore+alpha*(instant-prevScore);
  }
  memory=Number(escClamp(memory).toFixed(1));
  const persistence=flagCount>=5?.90:flagCount===4?.84:flagCount===3?.76:flagCount===2?.62:flagCount===1?.42:.20;
  let floor=memory*persistence;
  if(supporting<2)floor=Math.min(floor,36);if(flagCount===0)floor=Math.min(floor,24);
  floor=Number(escClamp(floor,0,78).toFixed(1));
  const out={score:memory,instant:Number(instant.toFixed(1)),floor,supportingDomains:supporting,strongDomains:strong,flagCount,flags,persistence:Number(persistence.toFixed(2)),updatedAt:new Date().toISOString()};await storage.put(key,out);return out;
}
async function buildEscalationSnapshot(storage,payload){
  const now=Date.now(),previous=await storage.get("escalation.latest"),history=escPublicHistory(await storage.get("escalation.history"));let signals=Object.values(payload?.signals||{}).filter(Boolean).map(s=>({...s,weight:ESCALATION_WEIGHTS[s.key]||Number(s.weight)||0,label:ESCALATION_LABELS[s.key]||s.label}));
  await escUpdateSeriesBaseline(storage,signals.find(s=>s.key==="aviation"),{storageKey:"escalation.aviation.samples",rawField:"rawCount",mode:"aviation"});
  await escUpdateSeriesBaseline(storage,signals.find(s=>s.key==="military"),{storageKey:"escalation.military.samples",rawField:"rawCount",mode:"military"});
  signals=Object.keys(ESCALATION_WEIGHTS).map(k=>signals.find(s=>s.key===k)||escSignal(k,0,false,"המקור אינו זמין כרגע.",{freshness:"לא זמין"}));
  const prevByKey=new Map((previous?.signals||[]).map(s=>[s.key,s]));signals=signals.map(s=>escSmoothSignalScore(s,prevByKey.get(s.key),previous,now));
  const available=signals.filter(s=>s.available!==false);
  const staleFactor=s=>{if(!s.stale)return 1;const age=Number(s.staleAgeMinutes??((now-Date.parse(s.checkedAt||0))/60000));if(!Number.isFinite(age))return 0;if(age<=15)return .65;if(age<=30)return .35;if(age<=60)return .15;return 0;};
  const effectiveWeight=s=>Number(s.weight||0)*staleFactor(s)*escSignalQualityFactor(s),availableWeight=available.reduce((a,s)=>a+effectiveWeight(s),0);
  const signalInstantBase=availableWeight?available.reduce((a,s)=>a+escClamp(s.rawSignalScore??s.score)*effectiveWeight(s),0)/availableWeight:0;
  const signalContextBase=availableWeight?available.reduce((a,s)=>a+escClamp(s.score)*effectiveWeight(s),0)/availableWeight:0;
  const live=available.filter(s=>!s.stale),elevated=live.filter(s=>Number(s.score)>=65).length;
  // V194 REALITY NOWCAST: raw/current evidence and persistent context are kept
  // separate. Independent domains are aggregated before they are fused, so one
  // noisy family cannot dominate and unavailable sources do not count as calm.
  const groups={news:["news","intlnews"],official:["official"],air:["aviation","notam","airrisk"],posture:["us","diplomatic"],maritime:["maritime"],market:["oil","market"],nuclear:["nuclear"],military:["military"]};
  const instantDomains=escDomainNowcast(live,groups,"raw"),contextDomains=escDomainNowcast(live,groups,"score");
  const domainInstantScores=instantDomains.scores,domainScores=contextDomains.scores;
  const corroboratingDomains=instantDomains.corroborating,strongDomains=instantDomains.strong,multiplier=instantDomains.multiplier;
  const immediateScore=escClamp(signalInstantBase*.42+instantDomains.score*.58);
  const contextualScore=escClamp(signalContextBase*.35+contextDomains.score*.65);
  let raw=escClamp(immediateScore*.72+contextualScore*.28);
  const strategicRegime=await escUpdateStrategicRegime(storage,{contextNowcast:contextualScore,domainScores,signals:live,previous,now});
  const preRegimeRaw=raw;raw=escClamp(Math.max(raw,strategicRegime.floor));
  // Low sensor coverage limits confidence, not by pretending missing sensors are zero.
  if(availableWeight<30)raw=Math.min(raw,45);else if(availableWeight<45)raw=Math.min(raw,60);else if(availableWeight<60)raw=Math.min(raw,78);
  let score=raw,calibrationReset=false;
  if(previous&&Number.isFinite(Number(previous.score))){
    const prev=Number(previous.score);
    if(previous.modelVersion!==ESCALATION_MODEL_VERSION){score=raw;calibrationReset=true;}
    else{
      // Confidence-adaptive minute nowcast: strong independent confirmation reaches
      // the public dial quickly; quiet/noisy changes are damped. Downward movement
      // is slower only while structural evidence is still present.
      const gap=raw-prev,alphaUp=corroboratingDomains>=4?.72:corroboratingDomains===3?.58:corroboratingDomains===2?.42:.28;
      const alphaDown=strategicRegime.flagCount>=4?.08:strategicRegime.flagCount===3?.12:strategicRegime.flagCount===2?.18:.30;
      const alpha=gap>=0?alphaUp:alphaDown;score=prev+gap*alpha;
      if(Math.abs(gap)<1.2)score=raw;
      const officialRaw=Number(signals.find(s=>s.key==="official")?.rawSignalScore||0);
      if(officialRaw>=85&&corroboratingDomains>=2)score=Math.max(score,prev+Math.max(4,gap*.75));
    }
  }
  score=Number(escClamp(score).toFixed(1));const level=escLevel(score);let newHistory=history;const last=history[history.length-1];if(!last||now-Date.parse(last.at)>=5*60000)newHistory=[...history,{at:new Date().toISOString(),score:Number(score.toFixed(1)),raw:Number(raw.toFixed(1)),modelVersion:ESCALATION_MODEL_VERSION}].filter(x=>now-Date.parse(x.at)<73*3600000).slice(-900);else{newHistory=[...history.slice(0,-1),{...last,score:Number(score.toFixed(1)),raw:Number(raw.toFixed(1)),at:new Date().toISOString(),modelVersion:ESCALATION_MODEL_VERSION}];}
  const score6=escClosestScore(newHistory,now-6*3600000),delta6h=Number((score-(Number.isFinite(score6)?score6:(previous?.score??score))).toFixed(1)),coverage=Math.round(availableWeight),confidenceLabel=coverage>=88?"גבוה":coverage>=68?"בינוני":"נמוך";
  const ranked=available.map(s=>({s,delta:Number(s.score)-Number(prevByKey.get(s.key)?.score??s.score),impact:Number(s.score)*Number(s.weight)/100})).sort((a,b)=>Math.abs(b.delta)*.8+b.impact*.2-(Math.abs(a.delta)*.8+a.impact*.2));const changes=ranked.slice(0,5).map(({s,delta})=>`${s.label}: ${delta>3?`עלה בכ־${Math.round(delta)} נק׳ — `:delta<-3?`ירד בכ־${Math.round(Math.abs(delta))} נק׳ — `:""}${s.reason}`);
  if(strategicRegime.floor>preRegimeRaw+1)changes.unshift(`מצב בסיס אסטרטגי: כמה משפחות מידע בלתי־תלויות עדיין מאשרות לחץ מבני מתמשך; רכיב הזיכרון הנתוני מונע נרמול מהיר מדי של מצב חריג.`);
  if(calibrationReset)changes.unshift("כיול V194: המדד אותחל למודל Reality Nowcast שמפריד בין תמונת מצב מיידית להקשר מתמשך ומצליב תחומים בלתי־תלויים — ללא תוספת נקודות ידנית.");
  const sourceHealth={live:live.length,stale:available.filter(s=>s.stale).length,unavailable:signals.filter(s=>s.available===false).length,coverage};
  const latest={modelVersion:ESCALATION_MODEL_VERSION,score,rawScore:Number(raw.toFixed(1)),preRegimeRaw:Number(preRegimeRaw.toFixed(1)),level:level.label,levelKey:level.key,updatedAt:new Date().toISOString(),delta6h,coverage,confidenceLabel,availableSignals:available.length,totalSignals:Object.keys(ESCALATION_WEIGHTS).length,elevatedSignals:elevated,corroboratingDomains,strongDomains,multiplier,domainScores,domainInstantScores,strategicRegime,nowcast:{signalInstantBase:Number(signalInstantBase.toFixed(1)),signalContextBase:Number(signalContextBase.toFixed(1)),instantDomains:instantDomains.score,contextDomains:contextDomains.score,immediateScore:Number(immediateScore.toFixed(1)),contextualScore:Number(contextualScore.toFixed(1))},sourceHealth,calibrationReset,signals,changes:changes.slice(0,6),experimental:payload?.experimental||{},disclaimer:"מדד 0–100 של עוצמת המתיחות בזמן אמת; אינו הסתברות למלחמה ואינו תחזית מודיעינית."};
  let _pushCandidate=null;
  if(previous&&previous.modelVersion===ESCALATION_MODEL_VERSION&&Number.isFinite(Number(previous.score))){const prevScore=Number(previous.score),score1h=escClosestScore(newHistory,now-60*60000),delta1h=Number((score-(Number.isFinite(score1h)?score1h:prevScore)).toFixed(1));const threshold=[85,70,50].find(t=>prevScore<t&&score>=t)||0;const rapid=delta1h>=10&&score>=40&&corroboratingDomains>=2;if(threshold||rapid){_pushCandidate={fingerprint:`escalation:${threshold||"rapid"}:${Math.round(score)}:${Math.floor(now/(15*60000))}`,kind:"escalation",title:`📡 דופק ההסלמה עלה ל-${Math.round(score)}/100`,body:threshold?`${level.label} · המדד חצה את רף ${threshold}. כמה אינדיקציות ציבוריות מתחזקות במקביל.`:`${level.label} · עלייה של ${Math.round(delta1h)} נק׳ בשעה האחרונה.`,url:"/escalation",score,threshold:threshold||null,delta1h,at:new Date().toISOString()};}}
  await storage.put("escalation.latest",latest);await storage.put("escalation.history",newHistory);if(payload?.external){await storage.put("escalation.external",payload.external);await storage.put("escalation.external.updatedAt",payload?.externalUpdatedAt||payload.external?.updatedAt||new Date().toISOString());}await storage.delete("escalation.lock");return {ok:true,latest,history:newHistory,experimental:latest.experimental,_pushCandidate,methodology:{modelVersion:ESCALATION_MODEL_VERSION,weights:ESCALATION_WEIGHTS,refreshSeconds:60,externalRefreshMinutes:15,scoreMeaning:"intensity-not-probability",signalFamilies:Object.keys(ESCALATION_WEIGHTS).length,sourcesConfigured:SOURCES.length+2,corroborationThreshold:60}};
}


/* =========================================================
   V123 — TRUE WEB PUSH BACKEND
   Cloudflare-only: Cron + SQLite-backed Durable Object + VAPID.
   ========================================================= */

const PUSH_HUB_NAME = "koteret-plus-global-push-v1";
const PUSH_VAPID_SUBJECT = "mailto:singles.pr@gmail.com";

function pushHubStub(env) {
  if (!env?.PUSH_HUB) return null;
  return env.PUSH_HUB.getByName(PUSH_HUB_NAME);
}

async function handlePushHubRequest(env, path, request) {
  const stub = pushHubStub(env);
  if (!stub) return json({ error: "Push infrastructure is not bound", enabled: false }, 503, { "Cache-Control": "no-store" });
  const init = { method: request.method, headers: new Headers(request.headers) };
  if (request.method !== "GET" && request.method !== "HEAD") init.body = await request.arrayBuffer();
  return stub.fetch(new Request(`https://push.internal${path}`, init));
}

function serverClusterReports(item) {
  const rows = [{
    sourceId:item?.sourceId, publisher:item?.publisher, sourceName:item?.sourceName, sourceKind:item?.sourceKind,
    verified:!!item?.verified, official:!!item?.official, independent:!!item?.independent,
    url:item?.url, publishedAt:item?.publishedAt, title:item?.title || "", category:item?.category || null
  }, ...(Array.isArray(item?.related) ? item.related : [])];
  const byPublisher = new Map();
  for (const row of rows) {
    const key = row?.publisher || row?.sourceId;
    if (!key) continue;
    const current = byPublisher.get(key);
    if (!current || Date.parse(row.publishedAt || 0) > Date.parse(current.publishedAt || 0)) byPublisher.set(key,row);
  }
  return [...byPublisher.values()].sort((a,b)=>Date.parse(b.publishedAt||0)-Date.parse(a.publishedAt||0));
}

function serverClusterLatestAt(item) {
  const times = [item?.latestReportAt,item?.publishedAt,...(item?.related||[]).map((r)=>r?.publishedAt)]
    .map((v)=>Date.parse(v||0)).filter(Number.isFinite);
  return times.length ? new Date(Math.max(...times)).toISOString() : new Date(0).toISOString();
}

function serverClusterFirstAt(item) {
  const times = [item?.firstReportAt,item?.publishedAt,...(item?.related||[]).map((r)=>r?.publishedAt)]
    .map((v)=>Date.parse(v||0)).filter(Number.isFinite);
  return times.length ? new Date(Math.min(...times)).toISOString() : new Date(0).toISOString();
}

function serverStoryHotScore(item, now=Date.now()) {
  const reports=serverClusterReports(item);
  const latestMs=Date.parse(serverClusterLatestAt(item));
  const age=Number.isFinite(latestMs)?Math.max(0,(now-latestMs)/60000):999;
  const recent=reports.filter((r)=>Math.abs(latestMs-Date.parse(r.publishedAt||0))<=120*60000);
  const count=recent.length;
  const times=recent.map((r)=>Date.parse(r.publishedAt||0)).filter(Number.isFinite);
  const spread=times.length>1?(Math.max(...times)-Math.min(...times))/60000:120;
  const official=recent.some((r)=>r.official);
  const verified=recent.filter((r)=>r.verified).length;
  const kindMix=new Set(recent.map((r)=>r.sourceKind)).size>1;
  let score=Math.min(42,count*8);
  score+=age<=5?28:age<=15?23:age<=30?17:age<=60?10:age<=120?4:0;
  score+=official?12:0;
  score+=Math.min(8,verified*2);
  score+=kindMix?5:0;
  score+=count>=3&&spread<=12?8:count>=3&&spread<=30?4:0;
  if(age>180)score-=Math.min(35,(age-180)/8);
  return Math.max(0,Math.min(100,Math.round(score)));
}

// V214 — newsroom velocity model. Fresh corroboration can outrank a story that
// was selected only minutes ago; age is a soft penalty, never a hard blanking
// rule. The same formula is mirrored in app.js so the visible hero and the
// autonomous Push selector make the same editorial choice.
function serverLeadEditorialMetrics({uniqueSources=0,ageMinutes=9999,spreadMinutes=999,hotScore=0,hasOfficial=false,hasVerified=false}={}) {
  const sources=Math.max(0,Number(uniqueSources)||0);
  const age=Math.max(0,Number(ageMinutes)||0);
  const spread=Math.max(0,Number(spreadMinutes)||0);
  const hot=Math.max(0,Math.min(100,Number(hotScore)||0));
  const sourceBoost=Math.min(sources,8)*7;
  const recencyBoost=age<=10?34:age<=25?26:age<=45?18:age<=60?12:age<=120?4:0;
  const authorityBoost=hasOfficial?13:hasVerified?5:0;
  const velocityBoost=sources>=5&&spread<=20?18:sources>=4&&spread<=15?16:sources>=3&&spread<=10?14:sources>=3&&spread<=20?12:sources>=2&&spread<=35?6:0;
  const burst3=sources>=3&&age<=10&&spread<=10;
  const burst4=sources>=4&&age<=15&&spread<=15;
  const burst5=sources>=5&&age<=25&&spread<=20;
  const officialBurst=hasOfficial&&sources>=3&&age<=15&&spread<=20;
  const breaking=hot>=64&&(burst3||burst4||burst5||officialBurst);
  const burstBoost=breaking?(sources>=5?38:sources>=4?34:hasOfficial?32:28):(sources>=3&&age<=30&&spread<=25?9:0);
  const agePenalty=age<=60?0:age<=90?(age-60)*0.65:age<=120?19.5+(age-90)*0.9:Math.min(62,46.5+(age-120)*0.26);
  const score=hot*.75+sourceBoost+recencyBoost+authorityBoost+velocityBoost+burstBoost-agePenalty;
  return {score,sourceBoost,recencyBoost,authorityBoost,velocityBoost,burstBoost,agePenalty,breaking};
}

function serverLeadFingerprint(entry) {
  const item=entry?.item;
  if(!item)return "";
  const reports=serverClusterReports(item);
  const titles=[item.title,...reports.map((r)=>r.title)].filter(Boolean);
  const sets=titles.map((title)=>titleTokens(title)).filter((set)=>set?.size);
  const freq=new Map();
  for(const set of sets)for(const token of set)freq.set(token,(freq.get(token)||0)+1);
  const threshold=Math.max(1,Math.ceil(sets.length*.45));
  const common=[...freq.entries()].filter(([,count])=>count>=threshold)
    .sort((a,b)=>b[1]-a[1]||String(a[0]).localeCompare(String(b[0]),"he"))
    .slice(0,7).map(([token])=>token);
  const fallback=[...(titleTokens(item.title)||[])].slice(0,7);
  const identity=common.length>=2?common:fallback;
  const firstAt=Date.parse(serverClusterFirstAt(item));
  const bucket=Number.isFinite(firstAt)?Math.floor(firstAt/(20*60*1000)):0;
  return [item.category||"other",bucket,...identity].join("|").toLowerCase();
}

function selectServerPushLead(items, now=Date.now()) {
  const corroborationWindowMs=150*60*1000;
  const entries=(items||[]).map((item)=>{
    const latestAt=serverClusterLatestAt(item);
    const latestMs=Date.parse(latestAt);
    const ageMinutes=Number.isFinite(latestMs)?Math.max(0,(now-latestMs)/60000):9999;
    const reports=serverClusterReports(item);
    const recentReports=reports.filter((report)=>{
      const reportMs=Date.parse(report.publishedAt||0);
      if(!Number.isFinite(reportMs)||!Number.isFinite(latestMs))return false;
      const delta=latestMs-reportMs;
      return delta>=-5*60*1000&&delta<=corroborationWindowMs;
    });
    const uniqueSources=recentReports.length;
    const hasOfficial=recentReports.some((r)=>r.official);
    const hasVerified=recentReports.some((r)=>r.verified);
    const times=recentReports.map((r)=>Date.parse(r.publishedAt||0)).filter(Number.isFinite);
    const spreadMinutes=times.length>1?Math.max(0,Math.round((Math.max(...times)-Math.min(...times))/60000)):0;
    const hotScore=serverStoryHotScore(item,now);
    const editorial=serverLeadEditorialMetrics({uniqueSources,ageMinutes,spreadMinutes,hotScore,hasOfficial,hasVerified});
    return {item,reports,recentReports,uniqueSources,ageMinutes,latestAt,score:editorial.score,hotScore,hasOfficial,spreadMinutes,breaking:editorial.breaking,velocityBoost:editorial.velocityBoost,burstBoost:editorial.burstBoost,agePenalty:editorial.agePenalty};
  });
  const sort=(a,b)=>b.score-a.score||Date.parse(b.latestAt||0)-Date.parse(a.latestAt||0)||String(a.item?.id||a.item?.url||a.item?.title||"").localeCompare(String(b.item?.id||b.item?.url||b.item?.title||""),"he");

  // Keep the background Push selector aligned with the visible newsroom hero:
  // prefer 3+ corroborating sources for the first hour, allow 2 sources only
  // when the snapshot contains a full hour with no fresh 3-source story, then
  // retain a 3+ source story for at most three hours.
  const verified=entries.filter((e)=>e.uniqueSources>=3&&e.ageMinutes<=60).sort(sort);
  // A true multi-source burst is editorially "breaking": it may replace a
  // recently selected lead immediately. This is not a timer rotation — the
  // candidate still needs real corroboration and strong velocity.
  const breakingVerified=verified.filter((e)=>e.breaking===true&&e.ageMinutes<=25).sort(sort);
  let winner=breakingVerified[0]||verified[0]||null;
  const retainedThree=entries.filter((e)=>e.uniqueSources>=3&&e.ageMinutes>60&&e.ageMinutes<=180)
    .sort(sort);
  const observed=entries.flatMap((e)=>e.reports||[]).map((r)=>Date.parse(r?.publishedAt||0)).filter(Number.isFinite);
  const oldest=observed.length?Math.min(...observed):Infinity;
  const hasFullHour=Number.isFinite(oldest)&&oldest<=now-60*60*1000;
  if(!winner&&hasFullHour&&verified.length===0){
    winner=entries.filter((e)=>e.uniqueSources>=2&&e.ageMinutes<=60).sort(sort)[0]
      ||entries.filter((e)=>e.uniqueSources>=2&&e.ageMinutes>60&&e.ageMinutes<=180)
        .sort(sort)[0]
      ||null;
  }
  if(!winner)winner=retainedThree[0]||null;
  if(!winner)return null;
  winner.fingerprint=serverLeadFingerprint(winner);
  return winner;
}
function cleanPushTitle(value) {
  return String(value||"").replace(/<[^>]*>/g," ").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/\s+/g," ").trim().slice(0,150);
}

function serverLeadPayload(entry) {
  if(!entry?.item||!entry.fingerprint)return null;
  const item=entry.item;
  const sources=entry.recentReports?.length?entry.recentReports:serverClusterReports(item);
  const target=sources.find((s)=>s.sourceKind==="site"&&s.url)||sources.find((s)=>s.url)||item;
  const hasOfficial=sources.some((s)=>s.official);
  return {
    fingerprint:entry.fingerprint,
    title:cleanPushTitle(item.title)||"סיפור מרכזי חדש בכותרת פלוס",
    body:`${entry.uniqueSources} מקורות מדווחים${hasOfficial?" · כולל מקור רשמי":""}`,
    url:"/",
    sources:entry.uniqueSources,
    official:hasOfficial,
    at:entry.latestAt||new Date().toISOString(),
    firstAt:serverClusterFirstAt(item),
    generatedAt:new Date().toISOString(),
    origin:"background",
    breaking:entry.breaking===true,
    editorialScore:Math.round(Number(entry.score)||0),
    hotScore:Math.round(Number(entry.hotScore)||0),
    spreadMinutes:Math.max(0,Math.round(Number(entry.spreadMinutes)||0)),
    ageMinutes:Math.max(0,Math.round(Number(entry.ageMinutes)||0))
  };
}

// V214 — keep a compact FULL presentation snapshot beside the Push summary.
// The Push payload intentionally stays small and unchanged. This separate object
// lets a newly opened browser render the exact server-verified newsroom cluster
// (media, sources, timeline and updates) even when its live shard merge is
// temporarily incomplete or cannot reconstruct the same cluster locally.
function serverLeadDisplaySnapshot(entry){
  if(!entry?.item||!entry?.fingerprint)return null;
  const cleanReport=(row={})=>({
    id:String(row?.id||"").slice(0,220),
    sourceId:String(row?.sourceId||"").slice(0,120),
    publisher:String(row?.publisher||"").slice(0,120),
    sourceName:String(row?.sourceName||"").slice(0,160),
    sourceKind:String(row?.sourceKind||"").slice(0,40),
    verified:row?.verified===true,
    official:row?.official===true,
    independent:row?.independent===true,
    url:String(row?.url||"").slice(0,1800),
    publishedAt:String(row?.publishedAt||"").slice(0,64),
    imageUrl:String(row?.imageUrl||row?.image||"").slice(0,1800),
    imageCredit:String(row?.imageCredit||"").slice(0,300),
    imageCreator:String(row?.imageCreator||"").slice(0,300),
    imageLicense:String(row?.imageLicense||"").slice(0,120),
    imageLicenseUrl:String(row?.imageLicenseUrl||"").slice(0,1000),
    imageLandingUrl:String(row?.imageLandingUrl||"").slice(0,1800),
    imageAlt:String(row?.imageAlt||"").slice(0,400),
    imageTitle:String(row?.imageTitle||"").slice(0,400),
    imageCaption:String(row?.imageCaption||"").slice(0,600),
    title:String(row?.title||"").slice(0,800),
    preview:String(row?.preview||"").slice(0,1800),
    category:String(row?.category||"").slice(0,80)
  });
  const item=entry.item||{};
  const reports=serverClusterReports(item).slice(0,12).map(cleanReport);
  const recent=(Array.isArray(entry.recentReports)?entry.recentReports:reports).slice(0,12).map(cleanReport);
  const updates=(Array.isArray(item?.updates)?item.updates:reports).slice(-12).map(cleanReport);
  const base=cleanReport(item);
  const displayItem={
    ...base,
    reportCount:Math.max(1,Math.min(100,Number(item?.reportCount)||reports.length||1)),
    firstReportAt:String(item?.firstReportAt||serverClusterFirstAt(item)||base.publishedAt||"").slice(0,64),
    latestReportAt:String(item?.latestReportAt||entry.latestAt||base.publishedAt||"").slice(0,64),
    hotScore:Number.isFinite(Number(item?.hotScore))?Math.max(0,Math.min(100,Number(item.hotScore))):undefined,
    related:reports,
    updates
  };
  return {
    fingerprint:String(entry.fingerprint||"").slice(0,220),
    item:displayItem,
    reports,
    recentReports:recent,
    uniqueSources:Math.max(2,Math.min(100,Number(entry.uniqueSources)||recent.length||reports.length||2)),
    ageMinutes:Math.max(0,Number(entry.ageMinutes)||0),
    latestAt:String(entry.latestAt||displayItem.latestReportAt||new Date().toISOString()).slice(0,64),
    score:Number(entry.score)||0,
    hotScore:Number(entry.hotScore)||0,
    hasOfficial:entry.hasOfficial===true||recent.some((r)=>r.official),
    spreadMinutes:Math.max(0,Number(entry.spreadMinutes)||0),
    leadMode:Number(entry.uniqueSources)>=3?"verified":"developing",
    savedAt:new Date().toISOString()
  };
}

// V214 — presentation-only recovery for a recently verified lead. A deploy can
// happen during a quiet-news period where no NEW <=3h winner exists, while
// lead.latest is still within its three-hour verification-retention window. In
// that case reconstruct the same story from the already collected 30h newsroom
// rows so the browser receives the complete cluster. This function never calls
// /lead and therefore cannot enqueue or replay a Push.
function serverRecoverDisplayEntryForLatest(items=[], latest=null, now=Date.now()){
  if(!latest?.fingerprint||!latest?.title)return null;
  const acceptedAt=Date.parse(latest?.receivedAt||latest?.generatedAt||latest?.at||0);
  const acceptedAge=Number.isFinite(acceptedAt)?now-acceptedAt:Infinity;
  if(acceptedAge < -5*60*1000 || acceptedAge > 3*60*60*1000)return null;
  const rows=[];
  for(const item of Array.isArray(items)?items:[]){
    const reports=serverClusterReports(item);
    const latestAt=serverClusterLatestAt(item);
    const latestMs=Date.parse(latestAt);
    const recentReports=reports.filter((report)=>{
      const reportMs=Date.parse(report?.publishedAt||0);
      if(!Number.isFinite(reportMs)||!Number.isFinite(latestMs))return false;
      const delta=latestMs-reportMs;
      return delta>=-5*60*1000&&delta<=150*60*1000;
    });
    if(recentReports.length<2)continue;
    const uniqueSources=recentReports.length;
    const hasOfficial=recentReports.some((r)=>r.official);
    const hasVerified=recentReports.some((r)=>r.verified);
    const times=recentReports.map((r)=>Date.parse(r.publishedAt||0)).filter(Number.isFinite);
    const spreadMinutes=times.length>1?Math.max(0,Math.round((Math.max(...times)-Math.min(...times))/60000)):0;
    const ageMinutes=Number.isFinite(latestMs)?Math.max(0,(now-latestMs)/60000):9999;
    const hotScore=serverStoryHotScore(item,now);
    const editorial=serverLeadEditorialMetrics({uniqueSources,ageMinutes,spreadMinutes,hotScore,hasOfficial,hasVerified});
    const entry={item,reports,recentReports,uniqueSources,ageMinutes,latestAt,score:editorial.score,hotScore,hasOfficial,spreadMinutes,breaking:editorial.breaking,velocityBoost:editorial.velocityBoost,burstBoost:editorial.burstBoost,agePenalty:editorial.agePenalty};
    entry.fingerprint=serverLeadFingerprint(entry);
    const probe={fingerprint:entry.fingerprint,title:cleanPushTitle(item?.title||""),firstAt:serverClusterFirstAt(item),at:latestAt};
    if(!leadPushSameStory(latest,probe))continue;
    const exact=String(entry.fingerprint||"")===String(latest.fingerprint||"");
    const timeDistance=Math.abs((Date.parse(latest?.at||0)||0)-(latestMs||0));
    rows.push({entry,exact,timeDistance});
  }
  rows.sort((a,b)=>Number(b.exact)-Number(a.exact)||a.timeDistance-b.timeDistance||Number(b.entry.uniqueSources)-Number(a.entry.uniqueSources));
  const recovered=rows[0]?.entry||null;
  if(recovered)recovered.fingerprint=String(latest.fingerprint||recovered.fingerprint||"");
  return recovered;
}

const BACKGROUND_NEWS_ORIGIN="https://koteretplus.com";
const BACKGROUND_SHARD_GROUPS=[["sites-1","sites-3","telegram-2"],["sites-2","telegram-1","telegram-3"]];
const PUSH_SHARD_COLLECTOR_PREFIX="koteret-plus-news-shard-v204";

function flattenNewsPayloadRows(payloads=[]){
  const rows=[],seen=new Set();
  for(const payload of payloads){
    for(const item of Array.isArray(payload?.items)?payload.items:[]){
      for(const row of [{...item,related:undefined},...(Array.isArray(item?.related)?item.related:[])]){
        const key=String(row?.url||row?.id||`${row?.sourceId||""}|${row?.title||""}|${row?.publishedAt||""}`);
        if(!key||seen.has(key))continue;
        seen.add(key);rows.push(row);
      }
    }
  }
  return rows;
}

async function readBackgroundShardPayload(shard){
  try{
    const key=new Request(`${BACKGROUND_NEWS_ORIGIN}/api/news?shard=${encodeURIComponent(shard)}&v=119`,{method:"GET"});
    const hit=await caches.default.match(key);
    if(!hit)return null;
    const payload=await hit.json();
    const generated=Date.parse(payload?.generatedAt||0);
    if(!Number.isFinite(generated)||Date.now()-generated>2*60*60*1000)return null;
    return payload;
  }catch{return null;}
}

function pushShardCollectorStub(env,shard){
  if(!env?.PUSH_HUB)return null;
  return env.PUSH_HUB.getByName(`${PUSH_SHARD_COLLECTOR_PREFIX}:${shard}`);
}

async function collectBackgroundShardDirect(shard,env){
  if(!ESCALATION_SHARDS.includes(shard))throw new Error("INVALID_SHARD");
  const shardSources=getShardSources(shard);
  const started=Date.now();
  const retryBudget={remaining:1};
  // This function deliberately has NO Cache API dependency. It runs inside a
  // dedicated Durable Object invocation for this shard, so every shard gets its
  // own outbound-connection/subrequest budget even when no browser is open.
  const settled=await fetchSourcesWithLimit(shardSources,4,retryBudget,true);
  const rawItems=settled.flatMap((result)=>Array.isArray(result?.items)?result.items:[]);
  const now=Date.now(),cutoff=now-30*60*60*1000;
  const sourceHealth=summarizeSourceHealth(settled,now,cutoff);
  const failedSources=settled.filter((result)=>result?.error).map((result)=>({id:result.source.id,name:result.source.name,error:result.error}));
  const respondingSources=settled.filter((result)=>!result?.error).length;

  // V203: an empty shard is not the same thing as a failed shard. sites-3 is
  // mostly HTML/JSON-LD and official pages; those origins can answer HTTP 200
  // while exposing no parseable/recent article rows at that moment. V200/V201
  // collapsed that valid "fresh but empty" state into ALL_SOURCES_FAILED, which
  // made the autonomous background cycle report 5/6 even though the collector
  // had actually reached its publishers. Only a real all-request failure is a
  // collector failure. A successfully collected shard with no recent rows is
  // returned as a fresh empty payload and contributes no stories to lead choice.
  if(!respondingSources)throw new Error("ALL_SOURCE_REQUESTS_FAILED");

  const recent=rawItems.filter((item)=>{
    const t=Date.parse(item?.publishedAt||0);
    return Number.isFinite(t)&&t>=cutoff&&t<=now+10*60*1000;
  }).map((item)=>({...item,category:classify(item)})).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
  const clustered=recent.length?clusterItems(recent).slice(0,shard.startsWith("telegram")?220:180):[];
  const generatedAt=new Date().toISOString();
  return {
    generatedAt,
    snapshotId:stableId(`${shard}|push-v204|${generatedAt}|${clustered.slice(0,12).map((item)=>item.id).join("|")}`),
    refreshAfterSeconds:30,
    shard,
    stale:false,
    partial:failedSources.length>0,
    servedFromCache:false,
    tookMs:Date.now()-started,
    items:clustered,
    sources:sourceHealth,
    stats:{configuredSources:SOURCES.length,configuredShardSources:shardSources.length,attemptedSources:settled.length,respondingSources,rawItems:rawItems.length,recentItems:recent.length,items:clustered.length,failedSources:failedSources.length,retriesUsed:1-retryBudget.remaining,healthySources:sourceHealth.filter((source)=>source.healthStatus==="healthy").length,degradedSources:sourceHealth.filter((source)=>source.healthStatus==="degraded").length,offlineSources:sourceHealth.filter((source)=>source.healthStatus==="offline").length},
    failures:failedSources.slice(0,12)
  };
}

async function fetchBackgroundShardIsolated(env,shard,tickStartedAt=""){
  const stub=pushShardCollectorStub(env,shard);
  if(!stub)throw new Error("PUSH_HUB_NOT_BOUND");
  const response=await stub.fetch("https://push.internal/collect-news-shard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({shard,tickStartedAt})});
  if(!response.ok){
    let detail="";try{detail=String((await response.json())?.error||"");}catch{}
    throw new Error(`SHARD_DO_${response.status}${detail?`_${detail}`:""}`);
  }
  const data=await response.json();
  const payload=data?.payload;
  const generated=Date.parse(payload?.generatedAt||0);
  if(!payload||!Array.isArray(payload.items)||payload.stale===true||payload.servedFromCache===true||!Number.isFinite(generated)||Date.now()-generated>5*60*1000)throw new Error("INVALID_SHARD_DO_PAYLOAD");
  return payload;
}

async function refreshBackgroundNewsShards(env,ctx,shards=[],tickStartedAt=""){
  const fresh=new Map(),failures={};
  // V200: fan out to six DIFFERENT Durable Object instances. The scheduled
  // Worker only performs six internal DO calls; publisher fetches happen inside
  // the shard DO invocations, each with an independent network budget. This is
  // fully autonomous and does not recurse through the public site/domain.
  await Promise.all(shards.map(async(shard)=>{
    try{
      const payload=await fetchBackgroundShardIsolated(env,shard,tickStartedAt);
      fresh.set(shard,payload);
    }catch(error){
      failures[shard]=String(error?.message||error);
      console.warn(`V200 DO background shard ${shard} failed`,failures[shard]);
    }
  }));
  Object.defineProperty(fresh,"failures",{value:failures,enumerable:false});
  return fresh;
}

async function collectServerPushContext(env,ctx,{refresh=true}={}) {
  const now=Date.now(),cutoff=now-30*60*60*1000;
  const minute=Math.floor(now/60000);
  // Refresh three small shards per ordinary Cron. All six source shards are
  // refreshed across two active minutes; every fifth minute is reserved for
  // escalation/official/OSINT work so the two fetch sets never stack.
  const activeTick=minute-Math.floor(minute/5);
  const group=BACKGROUND_SHARD_GROUPS[((activeTick%2)+2)%2];
  const fresh=refresh?await refreshBackgroundNewsShards(env,ctx,group):new Map();
  const payloads=[];
  for(const shard of ESCALATION_SHARDS){
    const payload=fresh.get(shard)||await readBackgroundShardPayload(shard);
    if(payload)payloads.push(payload);
  }
  const recent=flattenNewsPayloadRows(payloads).filter((item)=>{
    const t=Date.parse(item?.publishedAt||0);
    return Number.isFinite(t)&&t>=cutoff&&t<=now+10*60*1000;
  }).map((item)=>({...item,category:classify(item)})).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
  if(!recent.length)return {entry:null,recent:[],now,shards:payloads.length,refreshed:[...fresh.keys()]};
  const clustered=clusterItems(recent);
  return {entry:selectServerPushLead(clustered,now),recent,now,shards:payloads.length,refreshed:[...fresh.keys()]};
}
async function collectServerPushLead(env,ctx) { return (await collectServerPushContext(env,ctx)).entry; }

async function runBackgroundEscalationFromNews(env,recent=[]) {
  // Every five minutes the scheduled Worker refreshes the escalation snapshot
  // even when no browser has /escalation open. The rotating six-shard news
  // snapshots are reused from the hot-story monitor. External OSINT is rotated in
  // three five-minute groups, so each family stays on roughly a 15-minute cadence
  // without stacking the whole external set into one scheduled invocation.
  try{
    const claim=await escalationHubCall(env,"/escalation/claim","POST",{});
    if(!claim?.claimed)return;
    let external=claim.external||null;
    const externalGroup=Math.floor(Date.now()/(5*60*1000))%3;
    const fresh=await collectExternalEscalationSignalGroup(externalGroup);
    external=mergeEscalationExternal(claim.external,fresh);
    const cacheData={rows:recent,sources:[],freshestAt:new Date().toISOString()};
    const [oref,idfWeb,nscWeb]=await Promise.all([fetchOrefForEscalation(),fetchIdfOfficialForEscalation(),fetchNscOfficialForEscalation()]);
    const localSignals={news:scoreKoteretNews(cacheData),official:scoreOfficialSignal(cacheData,oref,idfWeb,nscWeb)};
    const payload={signals:{...localSignals,...(external?.signals||{})},experimental:external?.experimental||{},external,externalUpdatedAt:external?.updatedAt||claim.externalUpdatedAt||null,collectedAt:new Date().toISOString(),background:true};
    await escalationHubCall(env,"/escalation/snapshot","POST",payload);
  }catch(error){console.warn("V167 scheduled escalation monitor failed",error);}
}

async function runBackgroundPushMonitor(env, ctx) {
  const stub=pushHubStub(env);
  if(!stub)return;
  try {
    const minute=Math.floor(Date.now()/60000);
    const tickStartedAt=new Date().toISOString();
    // Diagnostic heartbeat is persisted before any publisher fetch. It lets the
    // public /api/push/status distinguish "Cron did not run" from "Cron ran but a
    // shard collector failed", without changing any newsroom/UI behavior.
    await stub.fetch("https://push.internal/background-heartbeat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tickStartedAt})}).catch(()=>{});

    // V200 — the scheduled monitor now refreshes ALL six news shards every minute
    // through isolated Worker requests. This is intentionally not caches.default:
    // the public Cache API is PoP-local, and it is intentionally not six direct
    // handleNews() calls inside this scheduled invocation either: those calls share
    // one external-subrequest budget and can silently leave PushHub behind the live
    // site. Six isolated requests give the server the same complete snapshot a new
    // visitor can receive, without requiring any browser/PWA to be open.
    const fresh=await refreshBackgroundNewsShards(env,ctx,ESCALATION_SHARDS,tickStartedAt);
    const shardObject={};
    for(const [shard,payload] of fresh.entries())shardObject[shard]=payload;
    const backgroundResponse=await stub.fetch("https://push.internal/background-news",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({shards:shardObject,collectorFailures:fresh.failures||{},generatedAt:new Date().toISOString(),tickStartedAt,expectedShards:ESCALATION_SHARDS.length})});
    if(backgroundResponse.ok){
      const background=await backgroundResponse.json().catch(()=>null);
      if(background?.payload){
        background.payload.backgroundComplete=background.completeFresh===true||background.quorumReady===true;
        background.payload.backgroundFreshShards=Number(background.storedThisRun||0);
        await stub.fetch("https://push.internal/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(background.payload)});
      }
    }else{
      console.warn("V200 global Push news state failed",backgroundResponse.status);
    }

    try{const r=await fetch("https://www.oref.org.il/WarningMessages/alert/alerts.json",{headers:{"Accept":"application/json,text/plain,*/*","Referer":"https://www.oref.org.il/","X-Requested-With":"XMLHttpRequest","User-Agent":"Mozilla/5.0 (compatible; KoteretPlus/200.0; +https://www.oref.org.il/)"},cf:{cacheEverything:true,cacheTtl:4}});if(r.ok){const raw=(await r.text()).replace(/^\uFEFF/,"").trim(),parsed=raw&&raw!=="null"?JSON.parse(raw):null,alerts=normalizeOrefCurrentAlerts(parsed);if(alerts.length)await queueOrefAlerts(env,alerts);}}catch(error){console.warn("Scheduled OREF push monitor failed",error);}

    // Escalation stays on its existing cadence. V200 changes only Push/news
    // monitoring; the escalation model itself remains untouched.
    if(minute%5===0){const escalationContext=await collectServerPushContext(env,ctx,{refresh:false});await runBackgroundEscalationFromNews(env,escalationContext.recent);}
  } catch(error) {
    console.warn("V200 scheduled push monitor failed",error);
  }
}

function bytesToBase64Url(bytes) {
  let binary="";
  const arr=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes);
  for(let i=0;i<arr.length;i++)binary+=String.fromCharCode(arr[i]);
  return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
}

function stringToBase64Url(value) {
  return bytesToBase64Url(new TextEncoder().encode(String(value)));
}

function base64UrlToBytes(value) {
  const padded=String(value).replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-String(value).length%4)%4);
  const binary=atob(padded);
  return Uint8Array.from(binary,(c)=>c.charCodeAt(0));
}

async function sha256Base64Url(value) {
  return bytesToBase64Url(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(String(value))));
}

async function ensureVapidKeys(storage) {
  let stored=await storage.get("vapid.keys");
  if(stored?.privateJwk&&stored?.publicKey)return stored;
  const pair=await crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},true,["sign","verify"]);
  const privateJwk=await crypto.subtle.exportKey("jwk",pair.privateKey);
  const publicJwk=await crypto.subtle.exportKey("jwk",pair.publicKey);
  const publicKey=bytesToBase64Url(new Uint8Array([4,...base64UrlToBytes(publicJwk.x),...base64UrlToBytes(publicJwk.y)]));
  stored={privateJwk,publicKey,createdAt:new Date().toISOString()};
  await storage.put("vapid.keys",stored);
  return stored;
}

async function vapidAuthorization(endpoint,keys) {
  const audience=new URL(endpoint).origin;
  const now=Math.floor(Date.now()/1000);
  const header=stringToBase64Url(JSON.stringify({typ:"JWT",alg:"ES256"}));
  const payload=stringToBase64Url(JSON.stringify({aud:audience,exp:now+12*60*60,sub:PUSH_VAPID_SUBJECT}));
  const unsigned=`${header}.${payload}`;
  const privateKey=await crypto.subtle.importKey("jwk",keys.privateJwk,{name:"ECDSA",namedCurve:"P-256"},false,["sign"]);
  const signature=await crypto.subtle.sign({name:"ECDSA",hash:"SHA-256"},privateKey,new TextEncoder().encode(unsigned));
  return `vapid t=${unsigned}.${bytesToBase64Url(signature)}, k=${keys.publicKey}`;
}

function concatPushBytes(...parts) {
  const arrays=parts.map((part)=>part instanceof Uint8Array?part:new Uint8Array(part));
  const size=arrays.reduce((sum,part)=>sum+part.byteLength,0);
  const out=new Uint8Array(size);let offset=0;
  for(const part of arrays){out.set(part,offset);offset+=part.byteLength;}
  return out;
}

async function pushHkdf(ikm,salt,info,length) {
  const key=await crypto.subtle.importKey("raw",ikm,"HKDF",false,["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({name:"HKDF",hash:"SHA-256",salt,info},key,length*8));
}

async function encryptWebPushPayload(subscription,payloadText) {
  const uaPublic=base64UrlToBytes(subscription?.keys?.p256dh||"");
  const authSecret=base64UrlToBytes(subscription?.keys?.auth||"");
  if(uaPublic.byteLength!==65||authSecret.byteLength<16)throw new Error("push_subscription_keys_missing");

  const uaKey=await crypto.subtle.importKey("raw",uaPublic,{name:"ECDH",namedCurve:"P-256"},false,[]);
  const asPair=await crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},true,["deriveBits"]);
  const asPublic=new Uint8Array(await crypto.subtle.exportKey("raw",asPair.publicKey));
  const shared=new Uint8Array(await crypto.subtle.deriveBits({name:"ECDH",public:uaKey},asPair.privateKey,256));
  const encoder=new TextEncoder();
  const keyInfo=concatPushBytes(encoder.encode("WebPush: info"),new Uint8Array([0]),uaPublic,asPublic);
  const ikm=await pushHkdf(shared,authSecret,keyInfo,32);
  const salt=crypto.getRandomValues(new Uint8Array(16));
  const cek=await pushHkdf(ikm,salt,encoder.encode("Content-Encoding: aes128gcm\0"),16);
  const nonce=await pushHkdf(ikm,salt,encoder.encode("Content-Encoding: nonce\0"),12);
  const plaintext=encoder.encode(String(payloadText||""));
  if(plaintext.byteLength>3800)throw new Error("push_payload_too_large");
  const padded=concatPushBytes(plaintext,new Uint8Array([2]));
  const aesKey=await crypto.subtle.importKey("raw",cek,{name:"AES-GCM"},false,["encrypt"]);
  const cipher=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv:nonce,tagLength:128},aesKey,padded));
  const rs=new Uint8Array(4);new DataView(rs.buffer).setUint32(0,4096,false);
  const header=concatPushBytes(salt,rs,new Uint8Array([asPublic.byteLength]),asPublic);
  return concatPushBytes(header,cipher);
}

function compactPushPayload(notification={}) {
  // V200: use the Declarative Web Push standard envelope. Safari/iOS 18.4+
  // can display this notification even if Service Worker JavaScript is unable
  // to run in time. Older browsers still receive the same encrypted JSON and
  // sw.js reads the koteret metadata below, so this remains backwards compatible.
  const fingerprint=String(notification?.fingerprint||"").slice(0,220);
  const kind=String(notification?.kind||"push").slice(0,30);
  const title=cleanPushTitle(notification?.title||"")||"כותרת פלוס";
  const body=cleanPushBody(notification?.body||"")||"עדכון חדש מכותרת פלוס";
  const url=safePushPath(notification?.url||"/");
  const at=notification?.at||notification?.createdAt||new Date().toISOString();
  let navigate=PUBLIC_SITE_ORIGIN+url;
  try{navigate=new URL(url,PUBLIC_SITE_ORIGIN).toString();}catch{}
  return JSON.stringify({
    web_push:8030,
    notification:{title,lang:"he",dir:"rtl",body,navigate,silent:false,app_badge:"1",tag:pushTopicHeader(notification),renotify:false},
    koteret:{fingerprint,kind,url,at}
  });
}

function pushTopicHeader(notification={}) {
  // RFC 8030 Topic lets the push service collapse retries of THIS exact event,
  // without collapsing different newsroom stories.
  return `kp-${pushIdentityHash(String(notification?.fingerprint||"push"))}`.slice(0,32);
}
function isTransientPushStatus(status){
  const n=Number(status||0);
  return !n||n===408||n===425||n===429||n>=500;
}

async function sendEmptyWebPush(subscription,keys,notification={}) {
  const endpoint=String(subscription?.endpoint||"");
  if(!/^https:\/\//i.test(endpoint))return {ok:false,status:400,mode:"empty"};
  const authorization=await vapidAuthorization(endpoint,keys);
  const response=await fetch(endpoint,{method:"POST",headers:{Authorization:authorization,TTL:"900",Urgency:"high",Topic:pushTopicHeader(notification)},body:null});
  return {ok:response.ok,status:response.status,mode:"empty"};
}

function isAppleWebPushEndpoint(endpoint="") {
  try{return /(^|\.)push\.apple\.com$/i.test(new URL(String(endpoint||"")).hostname);}catch{return false;}
}
async function pushProviderError(response) {
  if(!response||response.ok)return {reason:"",detail:"",apnsId:""};
  let detail="",reason="";
  try{detail=(await response.clone().text()).slice(0,500);}catch{}
  try{const parsed=detail?JSON.parse(detail):null;reason=String(parsed?.reason||parsed?.error||"").slice(0,120);}catch{}
  return {reason,detail,apnsId:String(response.headers?.get?.("apns-id")||"").slice(0,120)};
}
async function sendWebPush(subscription,keys,notification) {
  const endpoint=String(subscription?.endpoint||"");
  if(!/^https:\/\//i.test(endpoint))return {ok:false,status:400,mode:"payload",reason:"InvalidEndpoint"};
  try{
    const authorization=await vapidAuthorization(endpoint,keys);
    const body=await encryptWebPushPayload(subscription,compactPushPayload(notification));
    const apple=isAppleWebPushEndpoint(endpoint);
    // Apple APNs validates every optional Web Push header strictly. V197 — the
    // last sender known to be accepted by Apple — did not send Topic. V198+
    // added Topic and all three iOS subscriptions began returning HTTP 400 while
    // Chrome/Android continued to accept the exact same payload. Keep Apple on
    // the minimal RFC 8030/8291 request; server/device fingerprints already give
    // us stronger duplicate protection without relying on provider-side Topic.
    const headers={Authorization:authorization,TTL:"900","Content-Encoding":"aes128gcm","Content-Type":"application/octet-stream"};
    if(!apple){headers.Urgency="high";headers.Topic=pushTopicHeader(notification);}
    const response=await fetch(endpoint,{method:"POST",headers,body});
    const provider=response.ok?{reason:"",detail:"",apnsId:String(response.headers?.get?.("apns-id")||"").slice(0,120)}:await pushProviderError(response);
    return {ok:response.ok,status:response.status,mode:"payload",provider:apple?"apple":"webpush",...provider};
  }catch(error){
    console.warn("Encrypted Web Push failed",String(error?.message||error));
    return {ok:false,status:0,mode:"payload",error:String(error?.message||error)};
  }
}

async function sendWebPushReliable(subscription,keys,notification) {
  // One short retry for transient push-service failures. A successful first
  // request is never retried. If the provider accepted a request but the reply
  // was lost, the Service Worker fingerprint/content guards still prevent a
  // second visible notification on the device.
  let first;
  try{first=await sendWebPush(subscription,keys,notification);}
  catch(error){first={ok:false,status:0,mode:"network",error:String(error?.message||error)};}
  if(first?.ok||[400,401,403,404,410].includes(Number(first?.status||0)))return first;
  const status=Number(first?.status||0);
  const transient=!status||status===408||status===425||status===429||status>=500;
  if(!transient)return first;
  await new Promise((resolve)=>setTimeout(resolve,status===429?180:70));
  try{
    const second=await sendWebPush(subscription,keys,notification);
    return {...second,retried:true,firstStatus:status||null};
  }catch(error){
    return {...first,retried:true,error:String(error?.message||error)};
  }
}

function pushPlatformFromUserAgent(value="") {
  const ua=String(value||"").toLowerCase();
  if(/iphone|ipad|ipod/.test(ua))return "ios";
  if(/android/.test(ua))return "android";
  if(/windows/.test(ua))return "windows";
  if(/macintosh|mac os x/.test(ua))return "mac";
  if(/linux/.test(ua))return "linux";
  return "other";
}
async function ensurePushStats(storage) {
  let stats=await storage.get("subscription.stats");
  if(stats?.schema==="v184"&&Number.isFinite(Number(stats.count)))return stats;
  const rows=await storage.list({prefix:"sub:"});
  // V186 repair: rebuild device -> subscription mappings from the actual rows.
  // This fixes stale pointers left after an endpoint expired and keeps only the
  // newest endpoint for the same installation/device id.
  const byDevice=new Map(),remove=[];
  for(const [key,row] of rows.entries()){
    const endpoint=String(row?.subscription?.endpoint||"");
    if(!/^https:\/\//i.test(endpoint)){remove.push(key);continue;}
    const deviceId=String(row?.deviceId||"");
    if(!deviceId)continue;
    const previous=byDevice.get(deviceId);
    if(!previous){byDevice.set(deviceId,{key,row});continue;}
    const prevTime=Date.parse(previous.row?.lastSeenAt||previous.row?.createdAt||0)||0;
    const nextTime=Date.parse(row?.lastSeenAt||row?.createdAt||0)||0;
    if(nextTime>=prevTime){remove.push(previous.key);byDevice.set(deviceId,{key,row});}
    else remove.push(key);
  }
  for(const key of [...new Set(remove)])await storage.delete(key);
  const oldMappings=await storage.list({prefix:"device:"});
  for(const key of oldMappings.keys())await storage.delete(key);
  const cleanRows=await storage.list({prefix:"sub:"});
  for(const [key,row] of cleanRows.entries()){
    const deviceId=String(row?.deviceId||"");
    if(deviceId)await storage.put(`device:${deviceId}`,key);
  }
  const platforms={ios:0,android:0,windows:0,mac:0,linux:0,other:0};
  for(const row of cleanRows.values()){
    const p=String(row?.platform||pushPlatformFromUserAgent(row?.userAgent)||"other");
    platforms[p]=(platforms[p]||0)+1;
  }
  stats={schema:"v184",count:cleanRows.size,platforms,updatedAt:new Date().toISOString(),deduplicated:[...new Set(remove)].length,mappingsRebuilt:true};
  await storage.put("subscription.stats",stats);
  return stats;
}
async function updatePushStats(storage,delta,platform="other") {
  const current=await ensurePushStats(storage);
  const stats={...current,platforms:{...(current.platforms||{})}};
  stats.count=Math.max(0,Number(stats.count||0)+Number(delta||0));
  const p=String(platform||"other");
  stats.platforms[p]=Math.max(0,Number(stats.platforms[p]||0)+Number(delta||0));
  stats.updatedAt=new Date().toISOString();
  await storage.put("subscription.stats",stats);
  return stats;
}


function normalizePushPreferences(value, fallback={news:true,escalation:true,alerts:false,alertAllIsrael:true,alertCities:[]}) {
  const source=value&&typeof value==="object"?value:{};
  const cities=Array.isArray(source.alertCities)?source.alertCities:Array.isArray(fallback.alertCities)?fallback.alertCities:[];
  return {
    news: source.news === undefined ? fallback.news !== false : source.news !== false,
    escalation: source.escalation === undefined ? fallback.escalation !== false : source.escalation !== false,
    alerts: source.alerts === undefined ? fallback.alerts === true : source.alerts === true,
    alertAllIsrael: source.alertAllIsrael === undefined ? fallback.alertAllIsrael !== false : source.alertAllIsrael !== false,
    alertCities: cities.map((x)=>String(x||"").trim()).filter(Boolean).slice(0,30)
  };
}
function normalizePushArea(value){return String(value||"").normalize("NFKD").replace(/[־–—-]/g," ").replace(/[״׳'\"]/g,"").replace(/\s+/g," ").trim().toLowerCase();}
function pushPreferenceAllows(row, kind="manual", notification=null) {
  const prefs=normalizePushPreferences(row?.preferences);
  if(kind==="hot-story")return prefs.news!==false;
  if(kind==="escalation")return prefs.escalation!==false;
  if(kind==="oref"){
    if(prefs.alerts!==true)return false;
    if(prefs.alertAllIsrael!==false)return true;
    const selected=prefs.alertCities.map(normalizePushArea).filter(Boolean);if(!selected.length)return false;
    const areas=(Array.isArray(notification?.areas)?notification.areas:[]).map(normalizePushArea).filter(Boolean);
    return areas.some((area)=>selected.some((city)=>area===city||area.startsWith(`${city} `)||city.startsWith(`${area} `)));
  }
  return true;
}
function safePushPath(value="/") {
  try {
    const u=new URL(String(value||"/"),"https://push.internal");
    if(u.origin!=="https://push.internal")return "/";
    return `${u.pathname}${u.search}${u.hash}`;
  } catch { return "/"; }
}
function cleanPushBody(value) {
  return String(value||"").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim().slice(0,220);
}
function analyticsJerusalemParts(ts=Date.now()) {
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Jerusalem",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",hourCycle:"h23",weekday:"short"}).formatToParts(new Date(ts));
  const get=(type)=>parts.find((p)=>p.type===type)?.value||"";
  return {date:`${get("year")}-${get("month")}-${get("day")}`,hour:Number(get("hour")||0),weekday:get("weekday")};
}
function analyticsDeviceType(ua="") {
  const x=String(ua||"").toLowerCase();
  if(/ipad|tablet/.test(x))return "tablet";
  if(/iphone|ipod|android|mobile/.test(x))return "mobile";
  return "desktop";
}
function analyticsReferrerGroup(value="") {
  if(!value)return "direct";
  try {
    const host=new URL(value).hostname.toLowerCase();
    if(/google\./.test(host))return "google";
    if(/facebook\.|fb\.|instagram\./.test(host))return "meta";
    if(/t\.co|x\.com|twitter\./.test(host))return "x";
    if(/whatsapp/.test(host))return "whatsapp";
    if(/koteretplus|singles-pr\.workers\.dev/.test(host))return "internal";
    return "other";
  } catch { return "other"; }
}
function stripAnalyticsDay(row={}) {
  const {uniqueHashes,homeUniqueHashes,escalationUniqueHashes,...safe}=row||{};
  return safe;
}
function pushTitleIdentity(value){return cleanPushTitle(value).toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").replace(/\s+/g," ").trim().slice(0,140);}
function pushIdentityHash(value=""){let hash=2166136261;const text=String(value||"");for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619);}return (hash>>>0).toString(36);}
function leadPushNumbers(value){return [...String(value||"").matchAll(/\d+(?:[.,]\d+)?/g)].map((m)=>m[0]).join("|");}
function leadPushTitleDelta(previousTitle,currentTitle){
  const aKey=pushTitleIdentity(previousTitle||""),bKey=pushTitleIdentity(currentTitle||"");
  if(!aKey||!bKey||aKey===bKey)return {changed:false,material:false,major:false,jaccard:1,added:0,removed:0,numbersChanged:false};
  const a=titleTokens(aKey)||new Set(),b=titleTokens(bKey)||new Set();
  const common=[...a].filter((token)=>b.has(token)).length;
  const union=Math.max(1,new Set([...a,...b]).size);
  const jaccard=common/union;
  const added=[...b].filter((token)=>!a.has(token)).length;
  const removed=[...a].filter((token)=>!b.has(token)).length;
  const aNumbers=leadPushNumbers(aKey),bNumbers=leadPushNumbers(bKey);
  const numbersChanged=!!(aNumbers||bNumbers)&&aNumbers!==bNumbers;
  const material=numbersChanged||added>=2||removed>=2||jaccard<0.52||(Math.abs(aKey.length-bKey.length)>=18&&added+removed>=2);
  const major=numbersChanged||added>=3||removed>=3||jaccard<0.38;
  return {changed:true,material,major,jaccard:Number(jaccard.toFixed(3)),added,removed,numbersChanged};
}
function leadPushSameStory(a={},b={}){
  if(!a||!b)return false;
  if(String(a.fingerprint||"")&&String(a.fingerprint||"")===String(b.fingerprint||""))return true;
  const aFirst=Date.parse(a.firstAt||0),bFirst=Date.parse(b.firstAt||0);
  const closeStart=Number.isFinite(aFirst)&&Number.isFinite(bFirst)&&Math.abs(aFirst-bFirst)<=35*60*1000;
  return closeStart&&sameEvent(a.title||"",b.title||"",180*60*1000);
}
function leadPushAgeMinutes(payload={},now=Date.now()){
  const at=Date.parse(payload?.at||0);
  if(!Number.isFinite(at))return Infinity;
  return Math.max(0,(now-at)/60000);
}
function leadPushObservationKey(payload={},kind="new-story",basisFingerprint=""){
  const basis=String(basisFingerprint||payload?.fingerprint||"");
  return `${kind}:${basis}`;
}
function leadPushQuality(payload={}){
  const sources=Number(payload?.sources||0);
  return sources>=3||(sources>=2&&payload?.official===true);
}
function leadPushDecision(payload={},lastState=null,now=Date.now()){
  const ageMinutes=leadPushAgeMinutes(payload,now);
  const quality=leadPushQuality(payload);
  if(!quality)return {eligible:false,reason:"insufficient-corroboration",ageMinutes,quality};
  if(!lastState)return {eligible:false,reason:"prime",ageMinutes,quality};
  const sameStory=leadPushSameStory(lastState,payload);
  const freshnessLimit=sameStory?(payload?.official?15:12):(payload?.official?25:20);
  if(!Number.isFinite(ageMinutes)||ageMinutes>freshnessLimit)return {eligible:false,reason:"stale",ageMinutes,quality,sameStory,freshnessLimit};
  if(!sameStory)return {eligible:true,reason:"new-story",kind:"new-story",ageMinutes,quality,sameStory:false};
  const titleDelta=leadPushTitleDelta(lastState.title||"",payload.title||"");
  if(!titleDelta.changed)return {eligible:false,reason:"same-headline",ageMinutes,quality,sameStory:true,titleDelta};
  const previousLatest=Date.parse(lastState.latestAt||lastState.at||0),currentLatest=Date.parse(payload.at||0);
  if(!Number.isFinite(currentLatest)||!Number.isFinite(previousLatest)||currentLatest<=previousLatest+60*1000){
    return {eligible:false,reason:"no-new-report",ageMinutes,quality,sameStory:true,titleDelta};
  }
  if(!titleDelta.material)return {eligible:false,reason:"minor-rewrite",ageMinutes,quality,sameStory:true,titleDelta};
  const pushedAt=Date.parse(lastState.pushedAt||0),sincePush=Number.isFinite(pushedAt)?now-pushedAt:Infinity;
  const minGap=titleDelta.major?90*1000:3*60*1000;
  if(sincePush<minGap)return {eligible:false,reason:"update-cooldown",waitMs:minGap-sincePush,ageMinutes,quality,sameStory:true,titleDelta};
  return {eligible:true,reason:"story-update",kind:"story-update",ageMinutes,quality,sameStory:true,titleDelta};
}
function recentLeadPushes(value){
  const now=Date.now();
  return (Array.isArray(value)?value:[]).filter((row)=>{
    const at=Date.parse(row?.pushedAt||row?.at||0);
    return Number.isFinite(at)&&now-at<12*60*60*1000;
  }).slice(-40);
}
function leadPushRowsMatch(row,payload){
  if(!row||!payload)return false;
  const aKey=String(row.titleKey||pushTitleIdentity(row.title||""));
  const bKey=pushTitleIdentity(payload.title||"");
  const rowLatest=Date.parse(row.latestAt||row.storyAt||0),payloadLatest=Date.parse(payload.at||0);
  const sameMoment=Number.isFinite(rowLatest)&&Number.isFinite(payloadLatest)&&Math.abs(rowLatest-payloadLatest)<=90*1000;
  if(String(row.fingerprint||"")===String(payload.fingerprint||"")&&aKey&&bKey&&aKey===bKey&&sameMoment)return true;
  if(aKey&&bKey&&aKey===bKey&&sameMoment)return true;
  const pushedAt=Date.parse(row.pushedAt||row.at||0),fresh=Number.isFinite(pushedAt)&&Date.now()-pushedAt<15*60*1000;
  return fresh&&sameMoment&&sameEvent(row.title||"",payload.title||"",15*60*1000);
}
async function recentLeadPushDuplicate(storage,payload){
  const rows=recentLeadPushes(await storage.get("lead.recentPushedStories"));
  return rows.some((row)=>leadPushRowsMatch(row,payload));
}
async function rememberLeadPush(storage,payload,state={}){
  const rows=recentLeadPushes(await storage.get("lead.recentPushedStories"));
  rows.push({
    fingerprint:String(payload?.fingerprint||""),
    title:cleanPushTitle(payload?.title||""),
    titleKey:pushTitleIdentity(payload?.title||""),
    latestAt:payload?.at||null,
    firstAt:payload?.firstAt||null,
    kind:state?.kind||"new-story",
    pushedAt:new Date().toISOString()
  });
  await storage.put("lead.recentPushedStories",rows.slice(-40));
}
function pushVisibleIdentity(notification={}){
  const kind=String(notification?.kind||"manual");
  let body=cleanPushBody(notification?.body||"").toLowerCase();
  body=body.replace(/^[^\p{L}\p{N}]+/u,"").replace(/[^\p{L}\p{N}]+/gu," ").replace(/\s+/g," ").trim();
  if(kind==="hot-story")return `hot:${body.slice(0,180)}`;
  const title=cleanPushTitle(notification?.title||"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").replace(/\s+/g," ").trim();
  return `${kind}:${title.slice(0,100)}:${body.slice(0,140)}:${safePushPath(notification?.url||"/")}`;
}
async function queuePushJob(storage,notification,targetDeviceId="") {
  const now=new Date().toISOString();
  const fingerprint=String(notification?.fingerprint||`manual:${crypto.randomUUID()}`).slice(0,220);
  const normalized={
    fingerprint,
    kind:String(notification?.kind||"manual").slice(0,30),
    title:cleanPushTitle(notification?.title)||"כותרת פלוס",
    body:cleanPushBody(notification?.body)||"עדכון חדש מכותרת פלוס",
    url:safePushPath(notification?.url||"/"),
    at:notification?.at||now,
    createdAt:now,
    score:Number.isFinite(Number(notification?.score))?Number(notification.score):undefined,
    sources:Number.isFinite(Number(notification?.sources))?Number(notification.sources):undefined,
    areas:Array.isArray(notification?.areas)?notification.areas.map((x)=>String(x||"").trim()).filter(Boolean).slice(0,80):[]
  };
  const activeBefore=await storage.get("push.job");
  const queueBefore=Array.isArray(await storage.get("push.queue"))?await storage.get("push.queue"):[];
  const recent=Array.isArray(await storage.get("push.recentFingerprints"))?await storage.get("push.recentFingerprints"):[];
  const duplicate=activeBefore?.notificationFingerprint===fingerprint||queueBefore.some((x)=>x?.notificationFingerprint===fingerprint)||recent.some((x)=>x?.fingerprint===fingerprint&&Date.now()-Date.parse(x.at||0)<12*3600000);
  if(duplicate)return {ok:true,queued:false,duplicate:true,fingerprint,target:targetDeviceId?"device":"all"};
  const visibleIdentity=pushVisibleIdentity(normalized);
  const recentVisible=Array.isArray(await storage.get("push.recentVisible"))?await storage.get("push.recentVisible"):[];
  const visibleWindow=normalized.kind==="hot-story"?10*60*1000:3*60*1000;
  const visibleDuplicate=recentVisible.some((x)=>x?.identity===visibleIdentity&&Date.now()-Date.parse(x?.at||0)<visibleWindow);
  if(visibleDuplicate)return {ok:true,queued:false,duplicate:true,duplicateBy:"visible-content",fingerprint,target:targetDeviceId?"device":"all"};
  await storage.put(`notification:${fingerprint}`,normalized);

  let targetKey="";
  const safeDevice=String(targetDeviceId||"").slice(0,120);
  if(safeDevice){
    targetKey=String(await storage.get(`device:${safeDevice}`)||"");
    if(!targetKey){
      const rows=await storage.list({prefix:"sub:"});
      for(const [key,row] of rows.entries())if(String(row?.deviceId||"")===safeDevice){targetKey=key;break;}
    }
    if(!targetKey)return {ok:false,error:"המכשיר הזה עדיין לא רשום לקבלת Push"};
  }

  if(!safeDevice)await storage.put("notification.latest",normalized);

  const queued={notificationFingerprint:fingerprint,targetKey,targetDeviceId:safeDevice,queuedAt:now};
  const active=activeBefore;
  if(active){
    const list=Array.isArray(await storage.get("push.queue"))?await storage.get("push.queue"):[];
    list.push(queued);
    await storage.put("push.queue",list.slice(-200));
  } else {
    const stats=await ensurePushStats(storage);
    await storage.put("push.job",{...queued,startedAt:now,cursor:"",processed:0,pushed:0,removed:0,failed:0,skipped:0,expected:targetKey?1:Number(stats.count||0)});
    await storage.setAlarm(Date.now()+100);
  }
  const freshRecent=recent.filter((x)=>Date.now()-Date.parse(x?.at||0)<12*3600000);freshRecent.push({fingerprint,at:now});await storage.put("push.recentFingerprints",freshRecent.slice(-80));
  const freshVisible=recentVisible.filter((x)=>Date.now()-Date.parse(x?.at||0)<12*3600000);freshVisible.push({identity:visibleIdentity,at:now});await storage.put("push.recentVisible",freshVisible.slice(-100));
  const history=Array.isArray(await storage.get("push.history"))?await storage.get("push.history"):[];
  history.push({fingerprint,kind:normalized.kind,title:normalized.title,body:normalized.body,url:normalized.url,queuedAt:now,target:safeDevice?(normalized.kind==="admin-contact"?"admin-device":"device"):"all",status:active?"queued":"sending",delivered:0,clicks:0});
  await storage.put("push.history",history.slice(-50));
  return {ok:true,queued:true,fingerprint,target:safeDevice?"device":"all"};
}
async function queueTargetPushRetry(storage,job,targetKey,retryCount=1){
  const key=String(targetKey||"");
  if(!key||!job?.notificationFingerprint)return false;
  const list=Array.isArray(await storage.get("push.queue"))?await storage.get("push.queue"):[];
  const exists=list.some((x)=>x?.notificationFingerprint===job.notificationFingerprint&&x?.targetKey===key);
  if(exists)return false;
  list.push({notificationFingerprint:job.notificationFingerprint,targetKey:key,targetDeviceId:"",queuedAt:new Date().toISOString(),retryCount:Math.max(1,Number(retryCount)||1),retryOf:"fanout"});
  await storage.put("push.queue",list.slice(-200));
  return true;
}

async function recordPushFailureDiagnostic(storage,job,row,result={}){
  try{
    const key=`push.failureScratch:${String(job?.notificationFingerprint||"unknown")}`;
    const rows=Array.isArray(await storage.get(key))?await storage.get(key):[];
    rows.push({at:new Date().toISOString(),platform:String(row?.platform||pushPlatformFromUserAgent(row?.userAgent||"")),status:Number(result?.status||0)||0,mode:String(result?.mode||""),provider:String(result?.provider||""),reason:String(result?.reason||"").slice(0,120),transient:isTransientPushStatus(result?.status),error:String(result?.error||result?.detail||"").slice(0,220),apnsId:String(result?.apnsId||"").slice(0,120)});
    await storage.put(key,rows.slice(-30));
  }catch{}
}

async function startNextPushJob(storage) {
  const list=Array.isArray(await storage.get("push.queue"))?await storage.get("push.queue"):[];
  if(!list.length){await storage.delete("push.queue");return false;}
  const next=list.shift();
  if(list.length)await storage.put("push.queue",list);else await storage.delete("push.queue");
  const stats=await ensurePushStats(storage);
  await storage.put("push.job",{...next,startedAt:new Date().toISOString(),cursor:"",processed:0,pushed:0,removed:0,failed:0,skipped:0,expected:next.targetKey?1:Number(stats.count||0)});
  await storage.setAlarm(Date.now()+120);
  return true;
}
async function finalizePushJob(storage,job) {
  const failureKey=`push.failureScratch:${String(job?.notificationFingerprint||"unknown")}`;
  const failureDetails=Array.isArray(await storage.get(failureKey))?await storage.get(failureKey):[];
  const result={...job,finishedAt:new Date().toISOString(),active:false,failureDetails:failureDetails.slice(-20)};
  delete result.cursor;
  await storage.put("push.lastResult",result);
  if(failureDetails.length)await storage.put("push.lastFailureDetails",{notificationFingerprint:job.notificationFingerprint,at:result.finishedAt,failures:failureDetails.slice(-20)});
  await storage.delete(failureKey);
  const history=Array.isArray(await storage.get("push.history"))?await storage.get("push.history"):[];
  const i=history.map((x)=>x.fingerprint).lastIndexOf(job.notificationFingerprint);
  if(i>=0)history[i]={...history[i],status:"done",finishedAt:result.finishedAt,pushed:result.pushed,failed:result.failed,removed:result.removed,skipped:Number(result.skipped||0)};
  await storage.put("push.history",history.slice(-50));
  await storage.delete("push.job");
  await startNextPushJob(storage);
}

export class PushHub {
  constructor(ctx,env){this.ctx=ctx;this.env=env;}

  async fetch(request){
    const url=new URL(request.url);
    const storage=this.ctx.storage;

    if(url.pathname==="/collect-news-shard"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const shard=String(data?.shard||"");
      if(!ESCALATION_SHARDS.includes(shard))return json({error:"Invalid shard"},400,{"Cache-Control":"no-store"});
      try{
        const payload=await collectBackgroundShardDirect(shard,this.env);
        // Local diagnostic only; each shard collector has its own DO instance.
        await storage.put("collector.last",{at:new Date().toISOString(),shard,tickStartedAt:String(data?.tickStartedAt||""),generatedAt:payload.generatedAt,items:payload.items.length,partial:!!payload.partial});
        return json({ok:true,payload},200,{"Cache-Control":"no-store"});
      }catch(error){
        const message=String(error?.message||error);
        await storage.put("collector.last",{at:new Date().toISOString(),shard,tickStartedAt:String(data?.tickStartedAt||""),error:message});
        return json({ok:false,error:message},503,{"Cache-Control":"no-store"});
      }
    }

    if(url.pathname==="/config"){
      const keys=await ensureVapidKeys(storage);
      const stats=await ensurePushStats(storage);
      return json({enabled:true,publicKey:keys.publicKey,subscriptions:Number(stats.count||0),platforms:stats.platforms||{},fanout:"paged-alarm",mode:"true-web-push",version:"214.0.0"},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/subscribe"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const subscription=data?.subscription;
      const endpoint=String(subscription?.endpoint||"");
      if(!/^https:\/\//i.test(endpoint))return json({error:"Invalid push subscription"},400);
      await ensureVapidKeys(storage);
      const id=await sha256Base64Url(endpoint);
      const key=`sub:${id}`;
      const invalidKey=`push.invalid:${id}`;
      const invalid=await storage.get(invalidKey);
      if(invalid&&!data?.forceRefresh){
        const invalidAt=Date.parse(invalid?.at||0)||0;
        if(!invalidAt||Date.now()-invalidAt<7*24*3600000)return json({error:"Push subscription expired",refreshRequired:true},409,{"Cache-Control":"no-store"});
        await storage.delete(invalidKey);
      }
      const existing=await storage.get(key);
      const userAgent=String(data?.userAgent||"").slice(0,240);
      const platform=pushPlatformFromUserAgent(userAgent);
      const now=new Date().toISOString();
      const deviceId=String(data?.deviceId||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120);
      let stats=await ensurePushStats(storage),migratedPreferences=null;
      if(deviceId){
        const previousKey=String(await storage.get(`device:${deviceId}`)||"");
        if(previousKey&&previousKey!==key){
          const previousRow=await storage.get(previousKey);
          if(previousRow){migratedPreferences=previousRow.preferences||null;await storage.delete(previousKey);stats=await updatePushStats(storage,-1,previousRow.platform||pushPlatformFromUserAgent(previousRow.userAgent));}
        }
      }
      if(existing?.deviceId&&existing.deviceId!==deviceId){
        const oldMapping=await storage.get(`device:${existing.deviceId}`);
        if(oldMapping===key)await storage.delete(`device:${existing.deviceId}`);
      }
      const preferences=normalizePushPreferences(data?.preferences,normalizePushPreferences(existing?.preferences||migratedPreferences));
      await storage.put(key,{subscription,deviceId,platform,userAgent,preferences,createdAt:existing?.createdAt||now,lastSeenAt:now,pendingFingerprint:existing?.pendingFingerprint||"",lastDeliveredFingerprint:existing?.lastDeliveredFingerprint||"",lastDeliveredAt:existing?.lastDeliveredAt||""});
      if(deviceId)await storage.put(`device:${deviceId}`,key);
      if(!existing)stats=await updatePushStats(storage,1,platform);
      else if(existing?.platform&&existing.platform!==platform){await updatePushStats(storage,-1,existing.platform);stats=await updatePushStats(storage,1,platform);}
      // V186: both / and /escalation share hadashota.pushDeviceId.  Older
      // releases could nevertheless leave more than one stored subscription for
      // that same browser.  Remove every stale row now, not only the row pointed
      // to by device:<id>, so enabling Push on both pages can never double-send.
      if(deviceId){
        const sameDeviceRows=await storage.list({prefix:"sub:"});
        for(const [otherKey,otherRow] of sameDeviceRows.entries()){
          if(otherKey===key||String(otherRow?.deviceId||"")!==deviceId)continue;
          await storage.delete(otherKey);
          stats=await updatePushStats(storage,-1,otherRow?.platform||pushPlatformFromUserAgent(otherRow?.userAgent));
        }
        await storage.put(`device:${deviceId}`,key);
      }
      await storage.delete(invalidKey);
      return json({ok:true,id,subscriptions:Number(stats.count||0),platform,preferences},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/unsubscribe"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const endpoint=String(data?.endpoint||"");
      let stats=await ensurePushStats(storage);
      if(endpoint){
        const id=await sha256Base64Url(endpoint), key=`sub:${id}`;
        const existing=await storage.get(key);
        if(existing){
          await storage.delete(key);
          if(existing?.deviceId){const mapped=await storage.get(`device:${existing.deviceId}`);if(mapped===key)await storage.delete(`device:${existing.deviceId}`);}
          stats=await updatePushStats(storage,-1,existing?.platform||pushPlatformFromUserAgent(existing?.userAgent));
        }
      }
      return json({ok:true,subscriptions:Number(stats.count||0)},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/hot-story/display"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const cleanHotUrl=(value)=>{try{const u=new URL(String(value||""),PUBLIC_SITE_ORIGIN);return /^https?:$/.test(u.protocol)?u.toString():""}catch{return""}};
      const row={fingerprint:String(data?.fingerprint||"").slice(0,220),title:cleanPushTitle(data?.title||""),sources:Math.max(0,Math.min(100,Number(data?.sources)||0)),at:data?.at||new Date().toISOString(),link:cleanHotUrl(data?.link),image:cleanHotUrl(data?.image),receivedAt:new Date().toISOString(),source:"live-site"};
      if(!row.fingerprint||row.title.length<6)return json({error:"Invalid hot story"},400,{"Cache-Control":"no-store"});
      await storage.put("lead.display",row);
      return json({ok:true,receivedAt:row.receivedAt},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/hot-story"){
      const now=Date.now();
      const display=await storage.get("lead.display");
      const displayAge=display?now-Date.parse(display.receivedAt||0):Infinity;
      if(display&&Number.isFinite(displayAge)&&displayAge<=3*60*1000)return json({...display,syncedAt:display.receivedAt},200,{"Cache-Control":"no-store"});
      const latest=await storage.get("lead.latest");
      const generated=latest?Date.parse(latest.generatedAt||latest.receivedAt||0):NaN;
      const age=Number.isFinite(generated)?now-generated:Infinity;
      if(latest&&age<=10*60*1000)return json({...latest,syncedAt:latest.generatedAt||latest.receivedAt||latest.at,source:"background"},200,{"Cache-Control":"no-store"});
      return json({error:"No fresh hot story"},404,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/latest"){
      const latest=await storage.get("lead.latest");
      if(!latest)return json({error:"No lead yet"},404,{"Cache-Control":"no-store"});
      const full=await storage.get("lead.fullDisplay");
      const fullAge=full?Date.now()-Date.parse(full.savedAt||full.latestAt||0):Infinity;
      const matchingFull=full&&String(full.fingerprint||"")===String(latest.fingerprint||"")&&Number.isFinite(fullAge)&&fullAge>=-5*60*1000&&fullAge<=3*60*60*1000?full:null;
      return json({...latest,displayEntry:matchingFull},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/queue"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const result=await queuePushJob(storage,data);
      return json(result,result.ok?200:400,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/notification"){
      const deviceId=String(url.searchParams.get("deviceId")||"").slice(0,120);
      let notification=null;
      if(deviceId){
        const key=await storage.get(`device:${deviceId}`);
        const row=key?await storage.get(String(key)):null;
        if(row?.pendingFingerprint)notification=await storage.get(`notification:${row.pendingFingerprint}`);
      }
      if(!notification)notification=await storage.get("notification.latest");
      return notification?json(notification,200,{"Cache-Control":"no-store"}):json({error:"No notification yet"},404,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/event"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));const fingerprint=String(data?.fingerprint||"").slice(0,220),type=String(data?.type||"");
      const deviceId=String(data?.deviceId||"anonymous").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120)||"anonymous";
      if(!fingerprint||!["display","click"].includes(type))return json({error:"Invalid push event"},400,{"Cache-Control":"no-store"});
      const eventKey=`push.event:${fingerprint}`,events=await storage.get(eventKey)||{display:[],click:[]};const list=Array.isArray(events[type])?events[type]:[];
      if(!list.includes(deviceId)){list.push(deviceId);events[type]=list.slice(-5000);events.updatedAt=new Date().toISOString();await storage.put(eventKey,events);const history=Array.isArray(await storage.get("push.history"))?await storage.get("push.history"):[];const i=history.map((x)=>x.fingerprint).lastIndexOf(fingerprint);if(i>=0){history[i]={...history[i],delivered:(events.display||[]).length,clicks:(events.click||[]).length};await storage.put("push.history",history.slice(-50));}}
      return json({ok:true,delivered:(events.display||[]).length,clicks:(events.click||[]).length},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/ad/event"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));const slot=["top","feed"].includes(String(data?.slot))?String(data.slot):"",id=String(data?.id||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120),type=String(data?.type||"");
      if(!slot||!id||!["view","click"].includes(type))return json({error:"Invalid ad event"},400,{"Cache-Control":"no-store"});
      const key=`ad.stats:${slot}:${id}`,stats=await storage.get(key)||{slot,id,views:0,clicks:0,createdAt:new Date().toISOString()};if(type==="view")stats.views=Number(stats.views||0)+1;else stats.clicks=Number(stats.clicks||0)+1;stats.updatedAt=new Date().toISOString();await storage.put(key,stats);return json({ok:true},200,{"Cache-Control":"no-store"});
    }
    if(url.pathname==="/ad/stats"&&request.method==="POST"){const data=await request.json().catch(()=>({}));const slot=String(data?.slot||""),id=String(data?.id||"");const stats=slot&&id?await storage.get(`ad.stats:${slot}:${id}`):null;return json({ok:true,stats:stats||{slot,id,views:0,clicks:0}},200,{"Cache-Control":"no-store"});}
    if(url.pathname==="/ad/delete"&&request.method==="POST"){const data=await request.json().catch(()=>({}));const slot=String(data?.slot||""),id=String(data?.id||"");if(slot&&id)await storage.delete(`ad.stats:${slot}:${id}`);return json({ok:true},200,{"Cache-Control":"no-store"});}

    if(url.pathname==="/presence"&&request.method==="POST"){const data=await request.json().catch(()=>({}));const deviceId=String(data?.deviceId||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120),page=String(data?.page||"home")==="escalation"?"escalation":"home";if(deviceId)await storage.put(`presence:${deviceId}`,{deviceId,page,lastSeenAt:new Date().toISOString()});return json({ok:true},200,{"Cache-Control":"no-store"});}

    if(url.pathname==="/contact"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const now=Date.now(),clientKey=String(data?.clientKey||"").slice(0,40);
      if(clientKey){
        const rateKey=`contact.rate:${clientKey}`,row=await storage.get(rateKey)||{times:[]};
        const times=(Array.isArray(row.times)?row.times:[]).filter((t)=>now-Number(t)<15*60*1000);
        if(times.length>=3)return json({error:"נשלחו מספר פניות בזמן קצר. נסו שוב בעוד כמה דקות."},429,{"Cache-Control":"no-store"});
        times.push(now);await storage.put(rateKey,{times,updatedAt:new Date(now).toISOString()});
      }
      const id=crypto.randomUUID(),createdAt=new Date(now).toISOString();
      const item={id,name:cleanText(data?.name||"").slice(0,80),phone:String(data?.phone||"").slice(0,30),email:String(data?.email||"").trim().toLowerCase().replace(/[<>\r\n]/g,"").slice(0,160),topic:cleanText(data?.topic||"כללי").slice(0,60),message:cleanText(data?.message||"").slice(0,1200),source:String(data?.source||"site").slice(0,30),status:"new",createdAt};
      if(item.name.length<2||item.phone.replace(/\D/g,"").length<5||!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(item.email)||item.message.length<2)return json({error:"פרטי הפנייה חסרים"},400,{"Cache-Control":"no-store"});
      await storage.put(`contact.item:${String(now).padStart(13,"0")}:${id}`,item);
      const summary=await storage.get("contact.summary")||{total:0,newCount:0};summary.total=Number(summary.total||0)+1;summary.newCount=Number(summary.newCount||0)+1;summary.lastAt=createdAt;await storage.put("contact.summary",summary);
      const adminRows=await storage.list({prefix:"admin.device:",limit:12});let adminPushQueued=0;
      for(const row of adminRows.values()){
        const deviceId=String(row?.deviceId||"");if(!deviceId)continue;
        const mapped=String(await storage.get(`device:${deviceId}`)||"");if(!mapped)continue;
        const queued=await queuePushJob(storage,{fingerprint:`admin-contact:${id}:${deviceId}`,kind:"admin-contact",title:"✉️ פנייה חדשה בכותרת פלוס",body:`${item.name} · ${item.topic||"כללי"}`,url:"/manage-kp-7538#contactInboxPanel",at:createdAt},deviceId);
        if(queued.ok)adminPushQueued+=1;
      }
      return json({ok:true,id,adminPushQueued},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/analytics/visit"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const page=["home","escalation","info"].includes(String(data?.page))?String(data.page):"other";
      const now=Date.now(),parts=analyticsJerusalemParts(now),dayKey=`analytics.day:${parts.date}`,hourKey=`analytics.hour:${parts.date}:${String(parts.hour).padStart(2,"0")}`;
      const deviceId=String(data?.deviceId||"").slice(0,160);
      const deviceHash=deviceId?(await sha256Base64Url(deviceId)).slice(0,18):"";
      const summary=await storage.get("analytics.summary")||{totalViews:0,pages:{home:0,escalation:0,info:0,other:0},firstSeenAt:new Date().toISOString()};
      summary.totalViews=Number(summary.totalViews||0)+1;summary.pages={home:0,escalation:0,info:0,other:0,...(summary.pages||{})};summary.pages[page]=Number(summary.pages[page]||0)+1;summary.lastSeenAt=new Date().toISOString();
      await storage.put("analytics.summary",summary);
      const day=await storage.get(dayKey)||{date:parts.date,views:0,pages:{home:0,escalation:0,info:0,other:0},unique:0,uniqueHome:0,uniqueEscalation:0,uniqueHashes:[],homeUniqueHashes:[],escalationUniqueHashes:[],devices:{mobile:0,tablet:0,desktop:0},sources:{direct:0,google:0,meta:0,x:0,whatsapp:0,internal:0,other:0}};
      day.views=Number(day.views||0)+1;day.pages={home:0,escalation:0,info:0,other:0,...(day.pages||{})};day.pages[page]=Number(day.pages[page]||0)+1;
      const all=new Set(day.uniqueHashes||[]),home=new Set(day.homeUniqueHashes||[]),escSet=new Set(day.escalationUniqueHashes||[]);
      if(deviceHash){all.add(deviceHash);if(page==="home")home.add(deviceHash);if(page==="escalation")escSet.add(deviceHash);}
      day.uniqueHashes=[...all].slice(-8000);day.homeUniqueHashes=[...home].slice(-8000);day.escalationUniqueHashes=[...escSet].slice(-8000);day.unique=all.size;day.uniqueHome=home.size;day.uniqueEscalation=escSet.size;
      const device=analyticsDeviceType(data?.userAgent||request.headers.get("user-agent")||"");day.devices={mobile:0,tablet:0,desktop:0,...(day.devices||{})};day.devices[device]=Number(day.devices[device]||0)+1;
      const source=analyticsReferrerGroup(data?.referrer||"");day.sources={direct:0,google:0,meta:0,x:0,whatsapp:0,internal:0,other:0,...(day.sources||{})};day.sources[source]=Number(day.sources[source]||0)+1;day.updatedAt=new Date().toISOString();
      await storage.put(dayKey,day);
      const hour=await storage.get(hourKey)||{date:parts.date,hour:parts.hour,views:0,pages:{home:0,escalation:0,info:0,other:0}};hour.views=Number(hour.views||0)+1;hour.pages={home:0,escalation:0,info:0,other:0,...(hour.pages||{})};hour.pages[page]=Number(hour.pages[page]||0)+1;hour.updatedAt=new Date().toISOString();await storage.put(hourKey,hour);
      const byHour=await storage.get("analytics.hourOfDay")||Array.from({length:24},(_,h)=>({hour:h,views:0}));if(!byHour[parts.hour])byHour[parts.hour]={hour:parts.hour,views:0};byHour[parts.hour].views=Number(byHour[parts.hour].views||0)+1;await storage.put("analytics.hourOfDay",byHour);
      return json({ok:true,total:Number(summary.totalViews||0),pageTotal:Number(summary.pages?.[page]||0),today:Number(day.views||0),uniqueToday:Number(day.unique||0)},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/analytics/public"){
      const page=String(url.searchParams.get("page")||"home");const summary=await storage.get("analytics.summary")||{totalViews:0,pages:{}};const parts=analyticsJerusalemParts();const day=await storage.get(`analytics.day:${parts.date}`)||{};
      return json({ok:true,total:Number(summary.totalViews||0),pageTotal:Number(summary.pages?.[page]||0),today:Number(day.views||0),pageToday:Number(day.pages?.[page]||0)},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/admin/register-device"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const deviceId=String(data?.deviceId||"").replace(/[^a-zA-Z0-9._:-]/g,"").slice(0,120);
      if(!deviceId)return json({error:"מזהה מכשיר חסר"},400,{"Cache-Control":"no-store"});
      const key=`admin.device:${deviceId}`,existing=await storage.get(key),now=new Date().toISOString();
      await storage.put(key,{deviceId,userAgent:String(data?.userAgent||"").slice(0,220),registeredAt:existing?.registeredAt||now,lastSeenAt:now});
      return json({ok:true,deviceId,pushReady:!!(await storage.get(`device:${deviceId}`))},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/admin/dashboard"&&request.method==="POST"){
      const summary=await storage.get("analytics.summary")||{totalViews:0,pages:{}};
      const dayRows=[...(await storage.list({prefix:"analytics.day:"})).values()].map(stripAnalyticsDay).sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(-14);
      const hourRows=[...(await storage.list({prefix:"analytics.hour:"})).values()].sort((a,b)=>`${a.date}-${String(a.hour).padStart(2,"0")}`.localeCompare(`${b.date}-${String(b.hour).padStart(2,"0")}`)).slice(-48);
      const hourOfDay=await storage.get("analytics.hourOfDay")||Array.from({length:24},(_,hour)=>({hour,views:0}));
      const stats=await ensurePushStats(storage),lastResult=await storage.get("push.lastResult"),activeJob=await storage.get("push.job"),latestNotification=await storage.get("notification.latest"),latestLead=await storage.get("lead.latest"),leadCandidate=await storage.get("lead.candidate"),lastPushedFingerprint=await storage.get("lead.lastPushedFingerprint"),backgroundNews=await storage.get("push.backgroundNews.status"),lastDecision=await storage.get("lead.lastDecision"),history=Array.isArray(await storage.get("push.history"))?await storage.get("push.history"):[],escalation=await storage.get("escalation.latest");
      const contactSummary=await storage.get("contact.summary")||{total:0,newCount:0};const contactRows=[...(await storage.list({prefix:"contact.item:"})).values()].sort((a,b)=>Date.parse(b.createdAt||0)-Date.parse(a.createdAt||0)).slice(0,30);
      const adminDeviceRows=[...(await storage.list({prefix:"admin.device:",limit:20})).values()];let adminPushReady=0;for(const row of adminDeviceRows){if(row?.deviceId&&await storage.get(`device:${row.deviceId}`))adminPushReady+=1;}
      const presenceRows=[...(await storage.list({prefix:"presence:",limit:5000})).entries()],onlineCutoff=Date.now()-150000;let onlineTotal=0,onlineHome=0,onlineEscalation=0;for(const [key,row] of presenceRows){const seen=Date.parse(row?.lastSeenAt||0);if(Number.isFinite(seen)&&seen>=onlineCutoff){onlineTotal+=1;if(row?.page==="escalation")onlineEscalation+=1;else onlineHome+=1;}else if(Number.isFinite(seen)&&Date.now()-seen>24*3600000)await storage.delete(key);}
      const peakHour=[...hourOfDay].sort((a,b)=>Number(b.views||0)-Number(a.views||0))[0]||{hour:0,views:0};
      const peakDay=[...dayRows].sort((a,b)=>Number(b.views||0)-Number(a.views||0))[0]||null;const todayParts=analyticsJerusalemParts();const today=stripAnalyticsDay(await storage.get(`analytics.day:${todayParts.date}`)||{date:todayParts.date,views:0,pages:{},unique:0,uniqueHome:0,uniqueEscalation:0,devices:{mobile:0,tablet:0,desktop:0},sources:{}});
      return json({ok:true,version:"214.0.0",analytics:{summary,days:dayRows,hours:hourRows,hourOfDay,peakHour,peakDay,today},push:{subscriptions:Number(stats.count||0),platforms:stats.platforms||{},lastResult:lastResult||null,activeJob:activeJob||null,latestNotification:latestNotification||null,latestLead:latestLead||null,leadCandidate:leadCandidate||null,lastPushedFingerprint:lastPushedFingerprint||null,backgroundNews:backgroundNews||null,lastDecision:lastDecision||null,history:history.slice(-50).reverse(),adminDevices:{registered:adminDeviceRows.length,pushReady:adminPushReady},online:{total:onlineTotal,home:onlineHome,escalation:onlineEscalation}},escalation:escalation?{score:escalation.score,level:escalation.level,updatedAt:escalation.updatedAt,delta6h:escalation.delta6h,sourceHealth:escalation.sourceHealth,coverage:escalation.coverage}:null,contacts:{total:Number(contactSummary.total||0),newCount:Number(contactSummary.newCount||0),items:contactRows}},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/admin/contact"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));const action=String(data?.action||""),id=String(data?.id||"");
      const rows=await storage.list({prefix:"contact.item:"});let foundKey="",item=null;for(const [key,row] of rows.entries()){if(String(row?.id||"")===id){foundKey=key;item=row;break;}}
      if(!foundKey||!item)return json({error:"הפנייה לא נמצאה"},404,{"Cache-Control":"no-store"});
      const summary=await storage.get("contact.summary")||{total:0,newCount:0};
      if(action==="read"){if(item.status==="new")summary.newCount=Math.max(0,Number(summary.newCount||0)-1);item={...item,status:"read",handledAt:new Date().toISOString()};await storage.put(foundKey,item);await storage.put("contact.summary",summary);return json({ok:true},200,{"Cache-Control":"no-store"});}
      if(action==="delete"){if(item.status==="new")summary.newCount=Math.max(0,Number(summary.newCount||0)-1);summary.total=Math.max(0,Number(summary.total||0)-1);await storage.delete(foundKey);await storage.put("contact.summary",summary);return json({ok:true},200,{"Cache-Control":"no-store"});}
      return json({error:"Unknown contact action"},400,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/admin/push"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));const action=String(data?.action||"");
      if(action==="test"){
        const result=await queuePushJob(storage,{fingerprint:`test:${Date.now()}:${crypto.randomUUID()}`,kind:"test",title:data?.title||"בדיקת Push — כותרת פלוס",body:data?.body||"אם קיבלת את ההתראה הזאת, מערכת ה-Push פועלת תקין במכשיר הזה.",url:data?.url||"/"},data?.deviceId||"");
        return json(result,result.ok?200:400,{"Cache-Control":"no-store"});
      }
      if(action==="send"){
        if(!String(data?.title||"").trim())return json({error:"יש להזין כותרת ל-Push"},400,{"Cache-Control":"no-store"});
        const result=await queuePushJob(storage,{fingerprint:`manual:${Date.now()}:${crypto.randomUUID()}`,kind:"manual",title:data.title,body:data.body||"עדכון חדש מכותרת פלוס",url:data.url||"/"});
        return json(result,200,{"Cache-Control":"no-store"});
      }
      return json({error:"Unknown push action"},400,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/status"){
      const latest=await storage.get("lead.latest");
      const previous=await storage.get("lead.lastPushedFingerprint");
      const stats=await ensurePushStats(storage);
      const lastResult=await storage.get("push.lastResult");
      const activeJob=await storage.get("push.job");
      const background=await storage.get("push.backgroundNews.status");
      const heartbeat=await storage.get("push.backgroundHeartbeat");
      const lastDecision=await storage.get("lead.lastDecision");
      const lastFailureDetails=await storage.get("push.lastFailureDetails");
      const fullDisplay=await storage.get("lead.fullDisplay");
      const displayDiagnostic=fullDisplay?{fingerprint:String(fullDisplay.fingerprint||""),savedAt:fullDisplay.savedAt||null,sources:Number(fullDisplay.uniqueSources||0),reports:Array.isArray(fullDisplay.reports)?fullDisplay.reports.length:0,hasImage:!!String(fullDisplay?.item?.imageUrl||"").trim()}:null;
      return json({enabled:true,subscriptions:Number(stats.count||0),platforms:stats.platforms||{},lastPushedFingerprint:previous||null,latest:latest||null,leadDisplay:displayDiagnostic,background:background||null,backgroundHeartbeat:heartbeat||null,lastDecision:lastDecision||null,fanoutActive:!!activeJob,lastResult:lastResult||null,lastFailureDetails:lastFailureDetails||null,version:"214.0.0"},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/escalation/public"&&request.method==="GET") {
      const latest=await storage.get("escalation.latest");
      const history=escPublicHistory(await storage.get("escalation.history"));
      if(!latest)return json({ok:false,latest:null,history,methodology:{modelVersion:ESCALATION_MODEL_VERSION,weights:ESCALATION_WEIGHTS,refreshSeconds:60,externalRefreshMinutes:15,scoreMeaning:"intensity-not-probability",signalFamilies:Object.keys(ESCALATION_WEIGHTS).length,sourcesConfigured:SOURCES.length+2,corroborationThreshold:60}},200,{"Cache-Control":"no-store"});
      return json({ok:true,latest,history,experimental:latest.experimental||{},methodology:{modelVersion:ESCALATION_MODEL_VERSION,weights:ESCALATION_WEIGHTS,refreshSeconds:60,externalRefreshMinutes:15,scoreMeaning:"intensity-not-probability",signalFamilies:Object.keys(ESCALATION_WEIGHTS).length,sourcesConfigured:SOURCES.length+2,corroborationThreshold:60}},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/escalation/claim"&&request.method==="POST") {
      const latest=await storage.get("escalation.latest");
      const history=escPublicHistory(await storage.get("escalation.history"));
      const external=await storage.get("escalation.external");
      const externalUpdatedAt=await storage.get("escalation.external.updatedAt");
      const lock=await storage.get("escalation.lock");
      const now=Date.now();
      const latestAge=latest?now-Date.parse(latest.updatedAt||0):Infinity;
      const lockAge=lock?now-Date.parse(lock.at||0):Infinity;
      const publicState={ok:!!latest,latest:latest||null,history,experimental:latest?.experimental||{},methodology:{modelVersion:ESCALATION_MODEL_VERSION,weights:ESCALATION_WEIGHTS,refreshSeconds:60,externalRefreshMinutes:15,scoreMeaning:"intensity-not-probability",signalFamilies:Object.keys(ESCALATION_WEIGHTS).length,sourcesConfigured:SOURCES.length+2,corroborationThreshold:60}};
      if(latest&&Number.isFinite(latestAge)&&latestAge<ESCALATION_PUBLIC_REFRESH_MS)return json({claimed:false,reason:"fresh",public:publicState,external,externalUpdatedAt},200,{"Cache-Control":"no-store"});
      if(lock&&Number.isFinite(lockAge)&&lockAge<ESCALATION_LOCK_MS)return json({claimed:false,reason:"locked",public:publicState,external,externalUpdatedAt},200,{"Cache-Control":"no-store"});
      const token=crypto.randomUUID();
      await storage.put("escalation.lock",{token,at:new Date().toISOString()});
      const externalAge=externalUpdatedAt?now-Date.parse(externalUpdatedAt):Infinity;
      return json({claimed:true,token,external:external||null,externalUpdatedAt:externalUpdatedAt||null,externalDue:!external||!Number.isFinite(externalAge)||externalAge>ESCALATION_EXTERNAL_TTL_MS,public:publicState},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/escalation/snapshot"&&request.method==="POST") {
      try{
        const payload=await request.json().catch(()=>({}));const result=await buildEscalationSnapshot(storage,payload);const candidate=result?._pushCandidate||null;delete result._pushCandidate;
        if(candidate){
          const state=await storage.get("escalation.push.state")||{lastAt:null,lastScore:0,thresholds:{}};const now=Date.now();const since=state.lastAt?now-Date.parse(state.lastAt):Infinity;const threshold=candidate.threshold?String(candidate.threshold):"";const lastThreshold=threshold&&state.thresholds?.[threshold]?Date.parse(state.thresholds[threshold]):0;
          const allowed=threshold?(now-lastThreshold>12*3600000):(since>2*3600000);
          if(allowed){const queued=await queuePushJob(storage,candidate);if(queued.ok){state.lastAt=new Date().toISOString();state.lastScore=candidate.score;state.thresholds={...(state.thresholds||{})};if(threshold)state.thresholds[threshold]=state.lastAt;await storage.put("escalation.push.state",state);}}
        }
        return json(result,200,{"Cache-Control":"no-store"});
      }
      catch(error){await storage.delete("escalation.lock");return json({error:String(error?.message||error)},500,{"Cache-Control":"no-store"});}
    }

    if(url.pathname==="/background-heartbeat"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const heartbeat={at:new Date().toISOString(),tickStartedAt:String(data?.tickStartedAt||""),version:"214.0.0"};
      await storage.put("push.backgroundHeartbeat",heartbeat);
      return json({ok:true,...heartbeat},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/background-news"&&request.method==="POST"){
      const data=await request.json().catch(()=>({}));
      const incoming=data?.shards&&typeof data.shards==="object"?data.shards:{};
      const collectorFailures=data?.collectorFailures&&typeof data.collectorFailures==="object"?data.collectorFailures:{};
      const now=Date.now();
      let storedCount=0;
      for(const shard of ESCALATION_SHARDS){
        const payload=incoming?.[shard];
        if(!payload||!Array.isArray(payload?.items))continue;
        const generated=Date.parse(payload?.generatedAt||0);
        if(!Number.isFinite(generated)||generated>now+10*60*1000)continue;
        await storage.put(`push.newsShard:${shard}`,{payload,storedAt:new Date(now).toISOString()});
        storedCount++;
      }

      const payloads=[];
      const shardAges={};
      for(const shard of ESCALATION_SHARDS){
        const row=await storage.get(`push.newsShard:${shard}`);
        const payload=row?.payload;
        const generated=Date.parse(payload?.generatedAt||0);
        if(!payload||!Array.isArray(payload?.items)||!Number.isFinite(generated)||now-generated>2*60*60*1000){
          if(row)await storage.delete(`push.newsShard:${shard}`);
          continue;
        }
        shardAges[shard]=Math.max(0,Math.round((now-generated)/1000));
        payloads.push(payload);
      }

      const cutoff=now-30*60*60*1000;
      const recent=flattenNewsPayloadRows(payloads).filter((item)=>{
        const t=Date.parse(item?.publishedAt||0);
        return Number.isFinite(t)&&t>=cutoff&&t<=now+10*60*1000;
      }).map((item)=>({...item,category:classify(item)})).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
      const clustered=recent.length?clusterItems(recent):[];
      const entry=clustered.length?selectServerPushLead(clustered,now):null;
      const payload=serverLeadPayload(entry);
      let displaySnapshot=serverLeadDisplaySnapshot(entry);
      let displayRecovered=false;
      if(!displaySnapshot){
        const latestForDisplay=await storage.get("lead.latest");
        const recoveredEntry=serverRecoverDisplayEntryForLatest(clustered,latestForDisplay,now);
        if(recoveredEntry){
          displaySnapshot=serverLeadDisplaySnapshot(recoveredEntry);
          displayRecovered=!!displaySnapshot;
        }
      }
      if(displaySnapshot)await storage.put("lead.fullDisplay",displaySnapshot);
      const incomingShardNames=ESCALATION_SHARDS.filter((shard)=>incoming?.[shard]&&Array.isArray(incoming[shard]?.items));
      const expectedShards=Math.max(1,Math.min(ESCALATION_SHARDS.length,Number(data?.expectedShards)||ESCALATION_SHARDS.length));
      const completeFresh=storedCount>=expectedShards&&incomingShardNames.length>=expectedShards;
      // sites-3 contains the lowest-priority/official HTML fallbacks and can be
      // blocked as a group by upstream anti-bot rules. Do not make one failed
      // auxiliary shard turn the otherwise autonomous 5-shard newsroom snapshot
      // back into a browser-dependent 45-second candidate. Keep completeFresh
      // truthful, but expose a strict core quorum for Push decisions.
      const corePushShards=["sites-1","sites-2","telegram-1","telegram-2","telegram-3"];
      const quorumReady=corePushShards.every((shard)=>incomingShardNames.includes(shard))&&recent.length>=20;
      const status={at:new Date(now).toISOString(),tickStartedAt:String(data?.tickStartedAt||""),storedThisRun:storedCount,expectedShards,completeFresh,quorumReady,incomingShards:incomingShardNames,availableShards:payloads.length,shardAges,collectorFailures,recentItems:recent.length,leadFingerprint:payload?.fingerprint||"",leadTitle:payload?.title||"",leadBreaking:payload?.breaking===true,leadEditorialScore:Number(payload?.editorialScore)||0,leadHotScore:Number(payload?.hotScore)||0,leadAgeMinutes:Number(payload?.ageMinutes)||0,leadSpreadMinutes:Number(payload?.spreadMinutes)||0,displayRecovered,displayFingerprint:displaySnapshot?.fingerprint||""};
      await storage.put("push.backgroundNews.status",status);
      return json({ok:true,payload, ...status},200,{"Cache-Control":"no-store"});
    }

    if(url.pathname==="/lead"&&request.method==="POST"){
      let payload=await request.json().catch(()=>null);
      if(!payload?.fingerprint||!payload?.title)return json({error:"Invalid lead"},400);
      const now=Date.now();
      payload={
        ...payload,
        fingerprint:String(payload.fingerprint||"").slice(0,220),
        title:cleanPushTitle(payload.title||""),
        sources:Math.max(0,Math.min(100,Number(payload.sources)||0)),
        official:payload.official===true,
        at:Number.isFinite(Date.parse(payload.at||0))?new Date(Date.parse(payload.at)).toISOString():new Date(now).toISOString(),
        firstAt:Number.isFinite(Date.parse(payload.firstAt||0))?new Date(Date.parse(payload.firstAt)).toISOString():"",
        origin:String(payload.origin||"background")==="site"?"site":"background",
        backgroundComplete:payload.backgroundComplete===true,
        backgroundFreshShards:Math.max(0,Math.min(ESCALATION_SHARDS.length,Number(payload.backgroundFreshShards)||0)),
        receivedAt:new Date(now).toISOString()
      };

      // V200 — the newsroom lead is the Push hook.  Once the same editorial
      // selector that powers "הסיפור המרכזי עכשיו" replaces the lead, Push is
      // no longer allowed to veto that replacement with a second set of quality,
      // age or stability rules.  A browser render can trigger this immediately;
      // the scheduled Worker feeds the very same endpoint when every tab/PWA is
      // closed, so delivery never depends on a visitor being online.
      const previousLatest=await storage.get("lead.latest");
      let observed=await storage.get("lead.observed.v200")||await storage.get("lead.observed.v199")||await storage.get("lead.observed.v198")||await storage.get("lead.observed.v197");
      if(!observed&&previousLatest?.fingerprint)observed=previousLatest;
      let lastState=await storage.get("lead.lastPushedState");
      await storage.put("lead.latest",payload);

      // First ever observation only establishes a baseline. The previous-release
      // lead.latest is reused during upgrade, preventing a deploy from replaying
      // a headline that was already on screen before V200 became active.
      if(!observed?.fingerprint){
        await storage.put("lead.observed.v200",payload);
        await storage.delete("lead.candidate");
        return json({ok:true,primed:true,pushed:0,reason:"first-observation"});
      }

      const sameObservedStory=leadPushSameStory(observed,payload);
      const observedFingerprintChanged=String(observed.fingerprint||"")!==String(payload.fingerprint||"");
      let changeKind="";
      let changeReason="";
      let titleDelta=null;

      if(!sameObservedStory){
        // A browser render is the strongest possible signal: the hero actually
        // changed on the public site, so broadcast immediately. When nobody has
        // the site open the Cron is the fallback editor; require the same server
        // winner on two consecutive scheduled observations (~1 minute) so a
        // half-refreshed shard can never create a false Push. No quality/freshness
        // veto is applied after that confirmation.
        if(payload.origin==="background"&&payload.backgroundComplete!==true){
          // Partial scheduled snapshots keep the safety gate. A complete V200
          // six-shard snapshot is already deterministic and may fire immediately.
          const candidateKey=pushIdentityHash(payload.fingerprint);
          let candidate=await storage.get("lead.backgroundCandidate.v200")||await storage.get("lead.backgroundCandidate.v199")||await storage.get("lead.backgroundCandidate.v198")||await storage.get("lead.backgroundCandidate.v197");
          if(candidate?.payload&&leadPushSameStory(candidate.payload,payload)){
            candidate={...candidate,key:candidateKey,observations:Number(candidate.observations||1)+1,lastSeenAt:new Date(now).toISOString(),payload};
          }else{
            candidate={key:candidateKey,observations:1,firstSeenAt:new Date(now).toISOString(),lastSeenAt:new Date(now).toISOString(),payload};
          }
          await storage.put("lead.backgroundCandidate.v200",candidate);
          const stableMs=now-Date.parse(candidate.firstSeenAt||now);
          if(candidate.observations<2||stableMs<45000){
            await storage.put("lead.lastDecision",{at:new Date().toISOString(),origin:payload.origin,fingerprint:payload.fingerprint,title:payload.title,changeKind:null,reason:"background-partial-confirmation",queued:false,observations:candidate.observations,stableSeconds:Math.round(stableMs/1000),backgroundFreshShards:payload.backgroundFreshShards});
            return json({ok:true,changed:true,pending:true,queued:false,reason:"background-partial-confirmation",observations:candidate.observations,stableSeconds:Math.round(stableMs/1000),backgroundFreshShards:payload.backgroundFreshShards,subscriptions:Number((await ensurePushStats(storage)).count||0)});
          }
        }
        changeKind="new-story";
        changeReason=payload.origin==="site"?"lead-replaced":payload.backgroundComplete===true?"background-complete-lead":"background-partial-confirmed";
      }else if(lastState){
        // The same story may legitimately receive another Push only when a new
        // report materially changes the headline. Small rewrites/source-count
        // changes never create another notification.
        titleDelta=leadPushTitleDelta(lastState.title||"",payload.title||"");
        const lastAt=Date.parse(lastState.latestAt||lastState.at||0);
        const nextAt=Date.parse(payload.at||0);
        const newReport=Number.isFinite(nextAt)&&(!Number.isFinite(lastAt)||nextAt>lastAt+30*1000);
        if(titleDelta.material&&newReport){
          const pushedAt=Date.parse(lastState.pushedAt||0);
          const sincePush=Number.isFinite(pushedAt)?now-pushedAt:Infinity;
          const minGap=titleDelta.major?60*1000:2*60*1000;
          if(sincePush>=minGap){changeKind="story-update";changeReason="material-update";}
          else changeReason="update-cooldown";
        }else if(titleDelta.changed&&!titleDelta.material)changeReason="minor-rewrite";
        else if(titleDelta.material&&!newReport)changeReason="no-new-report";
        else changeReason="same-headline";
      }else{
        // Legacy safety: if the current story is the same but no historical
        // sent-state exists, do not manufacture an update Push.
        changeReason=observedFingerprintChanged?"same-story-fingerprint-change":"same-headline";
      }

      let queued=null;
      if(changeKind){
        // Cross-origin/server-client dedupe: the page and Cron can observe the
        // same replacement within seconds and their raw fingerprints may differ
        // slightly. The recent editorial ledger compares story/title/time before
        // a second fan-out is allowed.
        const duplicate=await recentLeadPushDuplicate(storage,payload);
        if(!duplicate){
          const sourceCount=Math.max(2,Number(payload.sources||0));
          const storyHash=pushIdentityHash(payload.fingerprint);
          const updateSuffix=changeKind==="story-update"?`:${pushIdentityHash(pushTitleIdentity(payload.title))}:${Math.floor(Date.parse(payload.at||0)/60000)}`:"";
          // Keep the event fingerprint compact so the update discriminator can
          // never be truncated by the 220-char storage/payload safety limit.
          const notificationFingerprint=`lead:${changeKind}:${storyHash}${updateSuffix}`;
          queued=await queuePushJob(storage,{fingerprint:notificationFingerprint,kind:"hot-story",title:`הסיפור המרכזי · ${sourceCount} מקורות`,body:`🔥 ${cleanPushTitle(payload.title)}`,url:"/",at:payload.at,sources:sourceCount,changeKind});
          if(queued.ok){
            const pushedState={fingerprint:payload.fingerprint,title:payload.title,titleKey:pushTitleIdentity(payload.title),latestAt:payload.at,firstAt:payload.firstAt,pushedAt:new Date().toISOString(),kind:changeKind,sources:sourceCount,official:!!payload.official};
            await storage.put("lead.lastPushedFingerprint",payload.fingerprint);
            await storage.put("lead.lastPushedTitleKey",pushedState.titleKey);
            await storage.put("lead.lastPushedTitle",payload.title);
            await storage.put("lead.lastPushedState",pushedState);
            if(!queued.duplicate)await rememberLeadPush(storage,payload,pushedState);
          }
        }else{
          queued={ok:true,queued:false,duplicate:true,reason:"recent-editorial-duplicate"};
        }
      }

      // Always remember what the newsroom currently shows. This state is about
      // detecting the NEXT replacement, not about deciding whether a prior Push
      // was delivered.
      await storage.put("lead.observed.v200",payload);
      await storage.delete("lead.candidate");
      await storage.delete("lead.backgroundCandidate.v200");await storage.delete("lead.backgroundCandidate.v199");await storage.delete("lead.backgroundCandidate.v198");await storage.delete("lead.backgroundCandidate.v197");
      await storage.put("lead.lastDecision",{at:new Date().toISOString(),origin:payload.origin,fingerprint:payload.fingerprint,title:payload.title,changeKind:changeKind||null,reason:changeReason||(!changeKind?"same-story":"queued"),queued:!!queued?.queued,duplicate:!!queued?.duplicate});
      return json({ok:queued?queued.ok:true,changed:!!changeKind,queued:!!queued?.queued,duplicate:!!queued?.duplicate,changeKind:changeKind||null,reason:changeReason||null,origin:payload.origin,subscriptions:Number((await ensurePushStats(storage)).count||0)});
    }

    return json({error:"Not found"},404);
  }

  async alarm(){
    const storage=this.ctx.storage;
    const job=await storage.get("push.job");
    if(!job)return;
    const keys=await ensureVapidKeys(storage);

    if(job.targetKey){
      const row=await storage.get(job.targetKey);
      if(row){
        try{
          if(String(row?.lastDeliveredFingerprint||"")===String(job.notificationFingerprint||"")){job.processed=1;job.skipped=Number(job.skipped||0)+1;await finalizePushJob(storage,job);return;}
          const updated={...row,pendingFingerprint:job.notificationFingerprint,pendingAt:new Date().toISOString()};await storage.put(job.targetKey,updated);
          const notification=await storage.get(`notification:${job.notificationFingerprint}`);
          const result=await sendWebPushReliable(updated.subscription,keys,notification);job.processed=1;
          if(!result.ok){
            await recordPushFailureDiagnostic(storage,job,updated,result);
            if(String(result?.reason||"")==="VapidPkHashMismatch"){
              const invalidId=String(job.targetKey||"").replace(/^sub:/,"");
              if(invalidId)await storage.put(`push.invalid:${invalidId}`,{at:new Date().toISOString(),status:400,reason:"VapidPkHashMismatch"});
            }
          }
          if(result.ok){
            job.pushed=1;
            await storage.put(job.targetKey,{...updated,lastDeliveredFingerprint:job.notificationFingerprint,lastDeliveredAt:new Date().toISOString(),pendingFingerprint:""});
          }
          else if([404,410].includes(Number(result.status||0))){
            const invalidId=String(job.targetKey||"").replace(/^sub:/,"");
            if(invalidId)await storage.put(`push.invalid:${invalidId}`,{at:new Date().toISOString(),status:result.status});
            await storage.delete(job.targetKey);
            if(updated.deviceId){const mapped=await storage.get(`device:${updated.deviceId}`);if(mapped===job.targetKey)await storage.delete(`device:${updated.deviceId}`);}
            await updatePushStats(storage,-1,updated.platform||pushPlatformFromUserAgent(updated.userAgent));job.removed=1;
          }else if(isTransientPushStatus(result?.status)&&Number(job.retryCount||0)<3){
            // V200: a provider/network hiccup must not be lost just because the
            // first alarm finished. Keep this exact subscriber/event as the
            // active job and retry later. Topic + device fingerprint dedupe make
            // retries safe if the provider actually accepted an earlier attempt.
            job.retryCount=Number(job.retryCount||0)+1;
            job.lastStatus=Number(result?.status||0)||null;
            job.updatedAt=new Date().toISOString();
            await storage.put("push.job",job);
            const delays=[1200,5000,20000];
            await storage.setAlarm(Date.now()+delays[Math.min(delays.length-1,job.retryCount-1)]);
            return;
          }else job.failed=1;
        }catch(error){
          if(Number(job.retryCount||0)<3){
            job.retryCount=Number(job.retryCount||0)+1;job.lastError=String(error?.message||error);job.updatedAt=new Date().toISOString();await storage.put("push.job",job);const delays=[1200,5000,20000];await storage.setAlarm(Date.now()+delays[Math.min(delays.length-1,job.retryCount-1)]);return;
          }
          job.processed=1;job.failed=1;
        }
      } else {job.processed=1;job.failed=1;}
      await finalizePushJob(storage,job);return;
    }

    const options={prefix:"sub:",limit:40};
    if(job.cursor)options.startAfter=job.cursor;
    const entries=await storage.list(options);
    const rows=[...entries.entries()];
    if(!rows.length){await finalizePushJob(storage,job);return;}

    for(let i=0;i<rows.length;i+=5){
      const batch=rows.slice(i,i+5);
      const notification=await storage.get(`notification:${job.notificationFingerprint}`);
      const eligible=[],skipped=[];
      for(const [key,row] of batch){
        // V186: repair stale device mappings instead of blindly deleting the
        // current subscription. A stale device:<id> pointer could previously
        // remove the only valid iPhone endpoint during fanout.
        const rowDeviceId=String(row?.deviceId||"");
        if(rowDeviceId){
          const mapped=String(await storage.get(`device:${rowDeviceId}`)||"");
          if(mapped&&mapped!==key){
            const mappedRow=await storage.get(mapped);
            if(mappedRow&&String(mappedRow?.deviceId||"")===rowDeviceId){
              const mappedTime=Date.parse(mappedRow?.lastSeenAt||mappedRow?.createdAt||0)||0;
              const rowTime=Date.parse(row?.lastSeenAt||row?.createdAt||0)||0;
              if(rowTime>mappedTime){
                await storage.delete(mapped);
                await updatePushStats(storage,-1,mappedRow?.platform||pushPlatformFromUserAgent(mappedRow?.userAgent));
                await storage.put(`device:${rowDeviceId}`,key);
                job.removed+=1;
              }else{
                await storage.delete(key);
                await updatePushStats(storage,-1,row?.platform||pushPlatformFromUserAgent(row?.userAgent));
                job.processed+=1;job.removed+=1;
                continue;
              }
            }else{
              await storage.put(`device:${rowDeviceId}`,key);
            }
          }else if(!mapped)await storage.put(`device:${rowDeviceId}`,key);
        }
        if(!pushPreferenceAllows(row,notification?.kind,notification)){skipped.push([key,row]);continue;}
        if(String(row?.lastDeliveredFingerprint||"")===String(job.notificationFingerprint||"")){skipped.push([key,row]);continue;}
        const updated={...row,pendingFingerprint:job.notificationFingerprint,pendingAt:new Date().toISOString()};
        await storage.put(key,updated);eligible.push([key,updated]);
      }
      job.processed+=skipped.length;job.skipped=Number(job.skipped||0)+skipped.length;
      const results=await Promise.all(eligible.map(async([key,row])=>{
        try{const result=await sendWebPushReliable(row?.subscription,keys,notification);if(result.ok)return {key,row,ok:true,mode:result.mode,retried:!!result.retried,provider:result.provider||""};if([404,410].includes(result.status))return {key,remove:true,row,status:result.status,provider:result.provider||"",reason:result.reason||""};return {key,row,ok:false,status:result.status,mode:result.mode,provider:result.provider||"",reason:result.reason||"",detail:result.detail||"",error:result.error||"",apnsId:result.apnsId||""};}
        catch(error){return {key,row,ok:false,error:String(error?.message||error)};}
      }));
      for(const result of results){
        job.processed+=1;
        if(result.ok){
          job.pushed+=1;
          await storage.put(result.key,{...result.row,lastDeliveredFingerprint:job.notificationFingerprint,lastDeliveredAt:new Date().toISOString(),pendingFingerprint:""});
        }
        else if(result.remove){const invalidId=String(result.key||"").replace(/^sub:/,"");if(invalidId)await storage.put(`push.invalid:${invalidId}`,{at:new Date().toISOString(),status:result.status||410});await storage.delete(result.key);if(result.row?.deviceId){const mapped=await storage.get(`device:${result.row.deviceId}`);if(mapped===result.key)await storage.delete(`device:${result.row.deviceId}`);}await updatePushStats(storage,-1,result.row?.platform||pushPlatformFromUserAgent(result.row?.userAgent));job.removed+=1;}
        else {
          job.failed+=1;
          await recordPushFailureDiagnostic(storage,job,result.row,result);
          if(String(result?.reason||"")==="VapidPkHashMismatch"){
            const invalidId=String(result.key||"").replace(/^sub:/,"");
            if(invalidId)await storage.put(`push.invalid:${invalidId}`,{at:new Date().toISOString(),status:400,reason:"VapidPkHashMismatch"});
          }
          // V201: do not lose a subscriber on a temporary Apple/Chrome push
          // service/network failure. The initial fan-out continues for everyone
          // else and a targeted alarm retries this exact endpoint afterwards.
          if(isTransientPushStatus(result?.status))await queueTargetPushRetry(storage,job,result.key,1);
        }
      }
    }

    job.cursor=rows[rows.length-1][0];job.updatedAt=new Date().toISOString();await storage.put("push.job",job);
    if(rows.length<40){await finalizePushJob(storage,job);return;}
    await storage.setAlarm(Date.now()+250);
  }
}
