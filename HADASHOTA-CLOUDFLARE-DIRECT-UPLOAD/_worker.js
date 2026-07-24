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

  // ---------- Telegram public preview pages ----------
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

    if (url.pathname === "/api/news") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleNews(request, ctx);
    }

    if (url.pathname === "/api/utilities") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleUtilities(request, ctx);
    }

    if (url.pathname === "/api/health") {
      const deep = url.searchParams.get("deep");
      if (deep) {
        const shard = deep === "telegram" || url.searchParams.get("shard") === "telegram" ? "telegram" : "sites";
        const checkedAt = new Date().toISOString();
        const retryBudget = { remaining: 2 };
        const shardSources = getShardSources(shard);
        const results = await fetchSourcesWithLimit(shardSources, 6, retryBudget);
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
          checkedAt,
          shard,
          configuredSources: SOURCES.length,
          configuredShardSources: shardSources.length,
          respondingSources: sourceStatus.filter((item) => item.ok).length,
          diagnosticShards: ["sites", "telegram"],
          sources: sourceStatus
        });
      }
      return json({
        ok: true,
        service: "hadashota-news",
        time: new Date().toISOString(),
        configuredSources: SOURCES.length,
        newsShards: ["sites", "telegram"]
      });
    }

    if (url.pathname === "/robots.txt") return robotsResponse(url.origin);
    if (url.pathname === "/sitemap.xml") return sitemapResponse(url.origin);
    if (url.pathname === "/" || url.pathname === "/index.html") return serveIndex(request, env, url.origin);

    return env.ASSETS.fetch(request);
  }
};

async function serveIndex(request, env, origin) {
  const assetRequest = new Request(new URL("/index.html", request.url), request);
  const asset = await env.ASSETS.fetch(assetRequest);
  if (!asset.ok) return asset;
  const html = (await asset.text()).replaceAll("__SITE_URL__", origin);
  const headers = new Headers(asset.headers);
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=0, s-maxage=300");
  return new Response(html, { status: 200, headers });
}

function robotsResponse(origin) {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

function sitemapResponse(origin) {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapeXml(origin)}/</loc><changefreq>hourly</changefreq><priority>1.0</priority></url>\n</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[ch]));
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

  const [weatherResult, shabbatResult, usdMarketResult, eurMarketResult, boiResult] = await Promise.allSettled([
    fetchJsonWithTimeout(weatherUrl.toString(), 4500),
    fetchJsonWithTimeout(shabbatUrl.toString(), 4500),
    fetchJsonFreshWithTimeout(usdMarketUrl, 4500),
    fetchJsonFreshWithTimeout(eurMarketUrl, 4500),
    fetchTextWithTimeout(exchangeRatesUrl, 4500)
  ]);

  const weather = weatherResult.status === "fulfilled" ? normalizeWeather(weatherResult.value) : null;
  const shabbat = shabbatResult.status === "fulfilled" ? normalizeShabbat(shabbatResult.value) : null;
  const usdMarket = usdMarketResult.status === "fulfilled" ? normalizeYahooFx(usdMarketResult.value) : null;
  const eurMarket = eurMarketResult.status === "fulfilled" ? normalizeYahooFx(eurMarketResult.value) : null;
  const boiRates = boiResult.status === "fulfilled" ? normalizeBoiExchangeRates(boiResult.value) : null;

  let exchangeRates = null;
  if (Number.isFinite(usdMarket?.rate) || Number.isFinite(eurMarket?.rate)) {
    exchangeRates = {
      USD: Number.isFinite(usdMarket?.rate) ? usdMarket.rate : boiRates?.USD ?? null,
      EUR: Number.isFinite(eurMarket?.rate) ? eurMarket.rate : boiRates?.EUR ?? null,
      date: usdMarket?.timestamp || eurMarket?.timestamp || new Date().toISOString(),
      source: "Yahoo Finance",
      live: true
    };
  } else if (boiRates) {
    exchangeRates = { ...boiRates, live: false };
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
  return SOURCES.filter((source) => shard === "telegram" ? source.kind === "telegram" : source.kind !== "telegram");
}

async function handleNews(request, ctx) {
  const requestUrl = new URL(request.url);
  const shard = requestUrl.searchParams.get("shard") === "telegram" ? "telegram" : "sites";
  const force = requestUrl.searchParams.get("force") === "1";
  const shardSources = getShardSources(shard);
  const cache = caches.default;

  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = "/api/news";
  cacheUrl.search = `?shard=${shard}`;
  const cacheKey = new Request(cacheUrl.toString(), { method: "GET" });

  const lastGoodUrl = new URL(request.url);
  lastGoodUrl.pathname = "/api/news-last-good";
  lastGoodUrl.search = `?shard=${shard}`;
  const lastGoodKey = new Request(lastGoodUrl.toString(), { method: "GET" });

  if (!force) {
    const cached = await cache.match(cacheKey);
    if (cached) return cors(cached);
  }

  const started = Date.now();
  try {
    // Keep retries deliberately small. This protects the Free-plan external-subrequest budget
    // even when an origin redirects or several sources fail at the same time.
    const retryBudget = { remaining: 6 };
    const settled = await fetchSourcesWithLimit(shardSources, 12, retryBudget);
    const rawItems = settled.flatMap((result) => result.items);
    const now = Date.now();
    const cutoff = now - 30 * 60 * 60 * 1000;

    if (!rawItems.length) {
      return await lastGoodOrError(cache, lastGoodKey, shard, "all_sources_failed");
    }

    const recent = rawItems
      .filter((item) => {
        const t = Date.parse(item.publishedAt);
        return Number.isFinite(t) && t >= cutoff && t <= now + 10 * 60 * 1000;
      })
      .map((item) => ({ ...item, category: classify(item) }))
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

    if (!recent.length) {
      return await lastGoodOrError(cache, lastGoodKey, shard, "no_recent_items");
    }

    const clustered = clusterItems(recent).slice(0, shard === "telegram" ? 420 : 360);
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

    const failedSources = settled
      .filter((result) => result.error)
      .map((result) => ({ id: result.source.id, name: result.source.name, error: result.error }));

    // A severely degraded refresh must never overwrite or replace a healthy feed.
    // When only a handful of sources answered, serve the previous good shard and retry soon.
    const minimumHealthySources = shard === "telegram" ? 3 : 4;
    if (activeSources.length < minimumHealthySources) {
      const previousGood = await cache.match(lastGoodKey);
      if (previousGood) return await lastGoodOrError(cache, lastGoodKey, shard, `partial_refresh_${activeSources.length}_sources`);
    }

    const payload = {
      generatedAt: new Date().toISOString(),
      refreshAfterSeconds: 30,
      shard,
      stale: false,
      tookMs: Date.now() - started,
      items: clustered,
      sources: activeSources,
      stats: {
        configuredSources: SOURCES.length,
        configuredShardSources: shardSources.length,
        activeSources: activeSources.length,
        items: clustered.length,
        officialSources: activeSources.filter((source) => source.official).length,
        telegramSources: activeSources.filter((source) => source.kind === "telegram").length,
        failedSources: failedSources.length,
        retriesUsed: 4 - retryBudget.remaining
      },
      failures: failedSources.slice(0, 12)
    };

    const response = json(payload, 200, {
      "Cache-Control": "public, max-age=0, s-maxage=25, stale-while-revalidate=120",
      "X-Hadashota-Version": "15.0.0",
      "X-Hadashota-Shard": shard
    });
    const lastGoodResponse = json(payload, 200, {
      "Cache-Control": "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400"
    });

    ctx.waitUntil(Promise.all([
      cache.put(cacheKey, response.clone()),
      cache.put(lastGoodKey, lastGoodResponse)
    ]));
    return response;
  } catch (error) {
    return await lastGoodOrError(cache, lastGoodKey, shard, String(error?.message || error));
  }
}

async function lastGoodOrError(cache, lastGoodKey, shard, reason) {
  const cached = await cache.match(lastGoodKey);
  if (cached) {
    try {
      const payload = await cached.json();
      payload.stale = true;
      payload.staleReason = reason;
      payload.servedAt = new Date().toISOString();
      return json(payload, 200, {
        "Cache-Control": "no-store",
        "X-Hadashota-Stale": "1",
        "X-Hadashota-Version": "15.0.0"
      });
    } catch {
      // A corrupt cache entry should never prevent a proper error response.
    }
  }
  return json({
    error: "News sources are temporarily unavailable",
    shard,
    stale: true,
    staleReason: reason,
    refreshAfterSeconds: 8
  }, 503, { "Cache-Control": "no-store", "Retry-After": "8" });
}

async function fetchSourcesWithLimit(sources, concurrency = 8, retryBudget = { remaining: 0 }) {
  const results = new Array(sources.length);
  let cursor = 0;
  const workerCount = Math.min(Math.max(1, concurrency), sources.length || 1);

  async function runner() {
    while (true) {
      const index = cursor++;
      if (index >= sources.length) return;
      results[index] = await fetchSource(sources[index], retryBudget);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, runner));
  return results;
}

async function fetchSource(source, retryBudget = { remaining: 0 }) {
  const started = Date.now();
  let lastError = null;
  let attempt = 0;

  while (attempt < 2) {
    try {
      const timeoutMs = source.adapter === "telegram" ? 5400 : source.adapter === "jsonld" ? 6200 : 5600;
      const response = await fetchWithTimeout(source.url, timeoutMs);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const contentLength = Number(response.headers.get("content-length") || 0);
      if (contentLength > 5_500_000) throw new Error("BODY_TOO_LARGE");

      const body = await response.text();
      let items = [];
      if (source.adapter === "rss") items = parseRss(body, source);
      if (source.adapter === "telegram") items = parseTelegram(body, source);
      if (source.adapter === "jsonld") items = parseJsonLd(body, source);

      items = dedupeSameSource(items)
        .filter((item) => item.title && item.url && item.publishedAt)
        .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
        .slice(0, 80);

      return { source, items, latencyMs: Date.now() - started, error: null, attempts: attempt + 1 };
    } catch (error) {
      lastError = error;
      const retryable = isRetryableSourceError(error);
      if (attempt === 0 && retryable && retryBudget.remaining > 0) {
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

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HadashotaNews/1.0; +news-aggregator)",
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8",
        "Accept-Language": "he-IL,he;q=0.9,en;q=0.7"
      },
      cf: { cacheEverything: true, cacheTtl: 45 }
    });
  } finally {
    clearTimeout(timeout);
  }
}

function parseRss(xml, source) {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  const items = [];

  for (const block of blocks) {
    const title = cleanText(firstTag(block, ["title"]));
    let link = cleanText(firstTag(block, ["link"]));
    if (!link) {
      const href = block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*\/?\s*>/i)?.[1];
      link = href || cleanText(firstTag(block, ["guid", "id"]));
    }
    const dateRaw = cleanText(firstTag(block, ["pubDate", "published", "updated", "dc:date", "date"]));
    const descriptionRaw = firstTag(block, ["description", "summary", "content:encoded", "content"]);
    const description = cleanText(descriptionRaw);
    const publishedAt = safeIso(dateRaw);
    const url = absoluteUrl(link, source.home);
    const imageUrl = extractRssImage(block, descriptionRaw, source.home);

    if (!title || !url || !publishedAt) continue;
    items.push(makeItem({ source, title, url, publishedAt, preview: trimPreview(description), imageUrl }));
  }
  return items;
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
      const url = absoluteUrl(rawUrl, source.home);
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
    const url = absoluteUrl(raw, base);
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
    imageUrl: sanitizeImageUrl(imageUrl),
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
      if (Math.abs(itemTime - clusterTime) > 8 * 60 * 60 * 1000) continue;
      if (item.category && cluster.category && item.category !== "other" && cluster.category !== "other" && item.category !== cluster.category) continue;
      if (sameEvent(item.title, cluster.title)) {
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
      title: item.title || ""
    };

    if (!match) {
      clusters.push({
        ...item,
        reportCount: 1,
        firstReportAt: item.publishedAt,
        latestReportAt: item.publishedAt,
        related: [relatedEntry]
      });
      continue;
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
      const reportCount = match.reportCount;
      const latestReportAt = match.latestReportAt;
      const firstReportAt = match.firstReportAt;
      const clusterImage = match.imageUrl || item.imageUrl || null;
      Object.assign(match, item, { related, reportCount, latestReportAt, firstReportAt, imageUrl: clusterImage });
    }
  }

  return clusters.sort((a, b) => Date.parse(b.latestReportAt || b.publishedAt) - Date.parse(a.latestReportAt || a.publishedAt));
}

function sameEvent(a, b) {
  const A = titleTokens(a);
  const B = titleTokens(b);
  if (!A.size || !B.size) return false;
  let intersection = 0;
  for (const token of A) if (B.has(token)) intersection++;
  const union = A.size + B.size - intersection;
  const jaccard = union ? intersection / union : 0;
  const containment = intersection / Math.max(1, Math.min(A.size, B.size));
  // Hebrew outlets often phrase the same event very differently. Three specific shared
  // terms plus strong containment is a better signal than exact headline similarity.
  return jaccard >= 0.58 || (intersection >= 3 && containment >= 0.52) || (intersection >= 4 && containment >= 0.44);
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
      .filter((word) => word.length >= 2 && !STOP_WORDS.has(word))
      .slice(0, 24)
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

function stripMarkupArtifacts(value) {
  return String(value || "")
    .replace(/\bimg\s+[^<>]{0,700}?(?:\/?>|(?=\s{2,}|$))/gi, " ")
    .replace(/\b(?:height|width|align|src|class|style|alt|loading)\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, " ")
    .replace(/(?:<|&lt;)?\/?br\s*\/?(?:>|&gt;)?/gi, " ")
    .replace(/(?:<|&lt;)?\/?(?:p|div|span)\s*(?:>|&gt;)?/gi, " ");
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
