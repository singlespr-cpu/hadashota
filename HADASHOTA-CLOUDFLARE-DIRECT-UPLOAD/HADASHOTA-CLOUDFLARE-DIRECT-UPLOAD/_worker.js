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
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/promo") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handlePromoPublic(request);
    }
    if (url.pathname === "/api/admin/promo") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handlePromoAdmin(request);
    }
    if (url.pathname === "/api/feed-promo") {
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleFeedPromoPublic(request);
    }
    if (url.pathname === "/api/admin/feed-promo") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleFeedPromoAdmin(request);
    }
    if (url.pathname === PROMO_ADMIN_PATH) {
      return serveHtmlAsset(request, env, url.origin, "/admin.html");
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

    if (url.pathname === "/api/utilities") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleUtilities(request, ctx);
    }

    if (url.pathname === "/api/alerts") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleEmergencyAlerts(ctx);
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
          version: "92.0.0",
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
        version: "92.0.0",
        time: new Date().toISOString(),
        configuredSources: SOURCES.length,
        configuredSiteSources: getShardSources("sites").length,
        configuredTelegramSources: getShardSources("telegram").length,
        collectionPolicy: "full-pass-before-retry",
        newsShards: ["sites-1","sites-2","sites-3","telegram-1","telegram-2","telegram-3"]
      });
    }

    if (url.pathname === "/sw.js") return serveNoCacheAsset(request, env, "/sw.js", "application/javascript; charset=utf-8");
    if (url.pathname === "/app.js") return serveNoCacheAsset(request, env, "/app.js", "application/javascript; charset=utf-8");
    if (url.pathname === "/styles.css") return serveNoCacheAsset(request, env, "/styles.css", "text/css; charset=utf-8");
    if (url.pathname === "/site.webmanifest") return serveNoCacheAsset(request, env, "/site.webmanifest", "application/manifest+json; charset=utf-8");
    if (url.pathname === "/robots.txt") return robotsResponse(url.origin);
    if (url.pathname === "/sitemap.xml") return sitemapResponse(url.origin);

    // V72: Static Assets runs with html_handling:"none".
    // Resolve clean HTML routes explicitly and internally so the browser always
    // receives a 200 response. Never redirect "/" to itself and never rely on
    // automatic HTML canonicalization.
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveHtmlAsset(request, env, url.origin, "/index.html");
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


function promoCacheKey(origin){return new Request(`${origin}${PROMO_CACHE_PATH}`,{method:"GET"})}
async function sha256Hex(value){const bytes=new TextEncoder().encode(String(value));const digest=await crypto.subtle.digest("SHA-256",bytes);return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("")}
async function verifyPromoAdmin(username,password){return await sha256Hex(`${String(username||"")}:${String(password||"")}`)===PROMO_ADMIN_CREDENTIAL_HASH}
function sanitizePromoPayload(value={}){
  const text=cleanText(String(value.text||"")).slice(0,120);let url="";
  try{const parsed=new URL(String(value.url||""));if(!/^https?:$/.test(parsed.protocol))throw new Error();url=parsed.toString()}catch{}
  const imageData=String(value.imageData||"");
  const safeImage=/^data:image\/(?:jpeg|jpg|png|webp);base64,/i.test(imageData)&&imageData.length<=750000?imageData:"";
  return{active:Boolean(text&&url),text,url,imageData:safeImage,updatedAt:new Date().toISOString()}
}
async function readPromo(request){
  if(promoMemory)return promoMemory;
  try{const cached=await caches.default.match(promoCacheKey(new URL(request.url).origin));if(cached){promoMemory=await cached.json();return promoMemory}}catch{}
  return{active:false,text:"",url:"",imageData:"",updatedAt:null}
}
async function writePromo(request,promo){
  promoMemory=promo;
  try{await caches.default.put(promoCacheKey(new URL(request.url).origin),new Response(JSON.stringify(promo),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=31536000"}}))}catch(e){console.warn("Promo cache write failed",e)}
}
async function handlePromoPublic(request){return json(await readPromo(request),200,{"Cache-Control":"no-store","X-Koteret-Promo-Store":"edge-cache"})}
async function handlePromoAdmin(request){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  if(!(await verifyPromoAdmin(body?.username,body?.password)))return json({error:"שם משתמש או סיסמה שגויים"},401,{"Cache-Control":"no-store"});
  const action=String(body?.action||"get");
  if(action==="get")return json({ok:true,promo:await readPromo(request)},200,{"Cache-Control":"no-store"});
  if(action==="remove"){const promo={active:false,text:"",url:"",imageData:"",updatedAt:new Date().toISOString()};await writePromo(request,promo);return json({ok:true,promo},200,{"Cache-Control":"no-store"})}
  if(action==="save"){const promo=sanitizePromoPayload(body?.promo||{});if(!promo.active)return json({error:"יש להזין מלל וקישור תקין"},400,{"Cache-Control":"no-store"});await writePromo(request,promo);return json({ok:true,promo},200,{"Cache-Control":"no-store"})}
  return json({error:"Unknown action"},400,{"Cache-Control":"no-store"})
}


function feedPromoCacheKey(origin){return new Request(`${origin}${FEED_PROMO_CACHE_PATH}`,{method:"GET"})}
async function readFeedPromo(request){
  if(feedPromoMemory)return feedPromoMemory;
  try{const cached=await caches.default.match(feedPromoCacheKey(new URL(request.url).origin));if(cached){feedPromoMemory=await cached.json();return feedPromoMemory}}catch{}
  return{active:false,text:"",url:"",imageData:"",updatedAt:null}
}
async function writeFeedPromo(request,promo){
  feedPromoMemory=promo;
  try{await caches.default.put(feedPromoCacheKey(new URL(request.url).origin),new Response(JSON.stringify(promo),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=31536000"}}))}catch(e){console.warn("Feed promo cache write failed",e)}
}
async function handleFeedPromoPublic(request){return json(await readFeedPromo(request),200,{"Cache-Control":"no-store","X-Koteret-Promo-Store":"edge-cache"})}
async function handleFeedPromoAdmin(request){
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,{"Cache-Control":"no-store"})}
  if(!(await verifyPromoAdmin(body?.username,body?.password)))return json({error:"שם משתמש או סיסמה שגויים"},401,{"Cache-Control":"no-store"});
  const action=String(body?.action||"get");
  if(action==="get")return json({ok:true,promo:await readFeedPromo(request)},200,{"Cache-Control":"no-store"});
  if(action==="remove"){const promo={active:false,text:"",url:"",imageData:"",updatedAt:new Date().toISOString()};await writeFeedPromo(request,promo);return json({ok:true,promo},200,{"Cache-Control":"no-store"})}
  if(action==="save"){const promo=sanitizePromoPayload(body?.promo||{});if(!promo.active)return json({error:"יש להזין מלל וקישור תקין"},400,{"Cache-Control":"no-store"});await writeFeedPromo(request,promo);return json({ok:true,promo},200,{"Cache-Control":"no-store"})}
  return json({error:"Unknown action"},400,{"Cache-Control":"no-store"})
}

async function serveNoCacheAsset(request, env, assetPath, contentType = "application/octet-stream") {
  const assetRequest = new Request(new URL(assetPath, request.url), request);
  const asset = await env.ASSETS.fetch(assetRequest);
  if (!asset.ok) return asset;
  const headers = new Headers(asset.headers);
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
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
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "geolocation=(self), camera=(), microphone=(), payment=(), usb=()");
  headers.set("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https:; manifest-src 'self'; worker-src 'self'; upgrade-insecure-requests");
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

  // HEAD must remain body-less, while GET receives the rewritten HTML.
  if (request.method === "HEAD") {
    return new Response(null, { status: 200, headers });
  }
  const html = (await asset.text()).replaceAll("__SITE_URL__", origin);
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
  <url><loc>${safeOrigin}/contact</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>${safeOrigin}/copyright</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=1800" } });
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[ch]));
}

async function handleEmergencyAlerts(ctx) {
  const endpoint = "https://www.oref.org.il/WarningMessages/alert/alerts.json";
  const cache = caches.default;
  const cacheKey = new Request("https://hadashota.internal/v92/oref-current", { method: "GET" });
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
        "User-Agent": "Mozilla/5.0 (compatible; Hadashota/65.0; +https://www.oref.org.il/)",
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
    ctx?.waitUntil(cache.put(cacheKey, sharedResponse));
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
  api.searchParams.set("gsrlimit", "14");
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
      ? (specificity >= 3 ? 30 : specificity >= 2 ? 28 : 26)
      : (specificity >= 3 ? 42 : specificity >= 2 ? 36 : specificity >= 1 ? 30 : 70);
    if (!best || best.score < threshold) return null;

    // V76 relevance gate: for a specific query, one coincidental word is not
    // enough. This is the rule that prevents a random Israeli celebrity/person
    // photo from being used for an unrelated cabinet/security story.
    const minHits = specificity >= 2
      ? Math.min(2, Math.max(1, best.overlap.queryTokens))
      : 1;
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
  searchUrl.searchParams.set("license", "cc0,pdm,by,by-sa");
  searchUrl.searchParams.set("mature", "false");
  try {
    const res = await fetch(searchUrl.toString(), { headers: { "Accept": "application/json", "User-Agent": "Koteret Plus/77 (+news aggregator; strict semantic media lookup)" } });
    if (!res.ok) return null;
    const data = await res.json();
    const allowed = new Set(["cc0","pdm","by","by-sa"]);
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
      candidates.push({ img, license, mediaUrl, candidateText, overlap, score });
    }
    candidates.sort((a,b) => b.score-a.score);
    const best = candidates[0];
    const concepts = mediaConcepts(query);
    const subjectStrict = concepts.has("openai") || concepts.has("motorcycle") || concepts.has("scooter");
    const threshold = subjectStrict
      ? (specificity >= 3 ? 32 : specificity >= 2 ? 30 : 28)
      : (specificity >= 3 ? 44 : specificity >= 2 ? 38 : specificity >= 1 ? 32 : 72);
    if (!best || best.score < threshold) return null;
    const minHits = specificity >= 2
      ? Math.min(2, Math.max(1, best.overlap.queryTokens))
      : 1;
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
      candidateDescription: cleanText(tagText || "").slice(0, 260),
      illustrative: false
    };
  } catch {}
  return null;
}

async function handleOpenMedia(url, ctx) {
  const raw = cleanText(url.searchParams.get("q") || "").slice(0, 280);
  const category = cleanText(url.searchParams.get("category") || "other");
  const queries = mediaQueryVariants(raw, category);
  const cache = caches.default;
  const cacheKey = new Request(`https://hadashota.media.local/v70?q=${encodeURIComponent(raw)}&c=${encodeURIComponent(category)}`);
  const cached = await cache.match(cacheKey);
  if (cached) return cors(cached);

  let chosen = null;
  let matchedQuery = "";
  // Commons tends to be strongest for named people, places and public institutions.
  for (const row of queries.filter((x) => x.specificity > 0).slice(0, 5)) {
    chosen = await findCommonsMedia(row.q, row.specificity);
    if (chosen) { matchedQuery = row.q; break; }
  }
  // Openverse expands coverage, but still has to pass a relevance threshold.
  if (!chosen) {
    for (const row of queries.filter((x) => x.specificity > 0)) {
      chosen = await findOpenverseMedia(row.q, row.specificity);
      if (chosen) { matchedQuery = row.q; break; }
    }
  }
  const payload = chosen ? {
    image: { ...chosen, matchedQuery },
    note: "Licensed/open-media result. Attribution and license metadata are preserved; source-license accuracy should still be independently verifiable."
  } : { image: null };
  const ttl = chosen ? 1800 : 300;
  const response = json(payload, 200, { "Cache-Control": `public, max-age=0, s-maxage=${ttl}` });
  ctx?.waitUntil(cache.put(cacheKey, response.clone()));
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

async function handleNews(request, env, ctx) {
  const requestUrl = new URL(request.url);
  const requestedShard = String(requestUrl.searchParams.get("shard") || "sites-1");
  const shard = /^(sites|telegram)(-[123])?$/.test(requestedShard) ? requestedShard : "sites-1";
  const forceRequested = requestUrl.searchParams.get("force") === "1";
  const shardSources = getShardSources(shard);
  const cache = caches.default;
  // V70: an explicit refresh must always reach the configured publishers.
  // Browser-specific Sec-Fetch/Origin header differences must never silently demote it.
  const force = forceRequested;

  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = "/api/news";
  cacheUrl.search = `?shard=${shard}&v=92`;
  const cacheKey = new Request(cacheUrl.toString(), { method: "GET" });

  const lastGoodUrl = new URL(request.url);
  lastGoodUrl.pathname = "/api/news-last-good";
  lastGoodUrl.search = `?shard=${shard}&v=92`;
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
          "X-Hadashota-Version": "92.0.0",
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
    const settled = await fetchSourcesWithLimit(shardSources, 4, retryBudget, force);
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
      "X-Hadashota-Version": "92.0.0",
      "X-Hadashota-Shard": shard,
      "X-Hadashota-Force": force ? "1" : "0"
    });
    const sharedSnapshotResponse = json(payload, 200, {
      "Cache-Control": "public, max-age=0, s-maxage=12",
      "X-Hadashota-Version": "92.0.0",
      "X-Hadashota-Shard": shard
    });
    const lastGoodResponse = json(payload, 200, {
      "Cache-Control": "public, max-age=0, s-maxage=7200"
    });

    ctx.waitUntil(Promise.all([
      cache.put(cacheKey, sharedSnapshotResponse),
      cache.put(lastGoodKey, lastGoodResponse)
    ]));
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
        "X-Hadashota-Version": "92.0.0"
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
    "X-Hadashota-Version": "92.0.0"
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
const LICENSED_MEDIA_HOSTS = new Set(["hadashota.singles-pr.workers.dev","koteretplus.co.il","www.koteretplus.co.il"]);
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
