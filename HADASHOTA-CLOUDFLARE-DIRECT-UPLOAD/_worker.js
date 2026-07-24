const SOURCES = [
  // ---------- RSS / news sites ----------
  { id: "ynet-news", publisher: "ynet", name: "ynet", kind: "site", adapter: "rss", url: "https://www.ynet.co.il/Integration/StoryRss2.xml", home: "https://www.ynet.co.il/news", language: "he", verified: true },

  { id: "walla-news", publisher: "walla", name: "וואלה חדשות", kind: "site", adapter: "rss", url: "https://rss.walla.co.il/feed/1?type=main", home: "https://news.walla.co.il/", language: "he", verified: true },

  { id: "globes-all", publisher: "globes", name: "גלובס", kind: "site", adapter: "rss", url: "https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=2", home: "https://www.globes.co.il/", language: "he", verified: true },

  { id: "timesofisrael", publisher: "timesofisrael", name: "Times of Israel", kind: "site", adapter: "rss", url: "https://www.timesofisrael.com/feed/", home: "https://www.timesofisrael.com/", language: "en", verified: true },
  { id: "jpost-breaking", publisher: "jpost", name: "Jerusalem Post Breaking", kind: "site", adapter: "rss", url: "https://www.jpost.com/rss/rssfeedsheadlines.aspx", home: "https://www.jpost.com/breaking-news", language: "en", verified: true },

  { id: "kikar-latest", publisher: "kikar", name: "כיכר השבת", kind: "site", adapter: "rss", url: "https://a.kikar.co.il/v1/rss/articles/latest/rss2", home: "https://www.kikar.co.il/", language: "he", verified: true },

  // ---------- HTML/JSON-LD fallbacks: source is only exposed if live items are actually parsed ----------
  { id: "israelhayom-news", publisher: "israelhayom", name: "ישראל היום", kind: "site", adapter: "jsonld", url: "https://www.israelhayom.co.il/news", home: "https://www.israelhayom.co.il/news", language: "he", verified: true },
  { id: "n12-breaking", publisher: "n12", name: "N12 מבזקים", kind: "site", adapter: "jsonld", url: "https://www.n12.co.il/Tagit/%D7%9E%D7%91%D7%96%D7%A7", home: "https://www.n12.co.il/Tagit/%D7%9E%D7%91%D7%96%D7%A7", language: "he", verified: true },
  { id: "kan-headlines", publisher: "kan", name: "כאן חדשות", kind: "site", adapter: "jsonld", url: "https://www.kan.org.il/headlines/", home: "https://www.kan.org.il/headlines/", language: "he", verified: true },
  { id: "now14-breaking", publisher: "now14", name: "עכשיו 14 מבזקים", kind: "site", adapter: "jsonld", url: "https://www.now14.co.il/news-flash", home: "https://www.now14.co.il/news-flash", language: "he", verified: true },
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
  { id: "tg-kannews", publisher: "kan-tg", name: "כאן חדשות - טלגרם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/kann_news", home: "https://t.me/kann_news", language: "he", verified: false },
  { id: "tg-newssil", publisher: "newssil", name: "חדשות ישראל IL", kind: "telegram", adapter: "telegram", url: "https://t.me/s/newssil", home: "https://t.me/newssil", language: "he", verified: false },
  { id: "tg-hotnews", publisher: "hotnews", name: "החדשות החמות", kind: "telegram", adapter: "telegram", url: "https://t.me/s/hotnews1", home: "https://t.me/hotnews1", language: "he", verified: false },

  // ---------- Additional live Telegram newsrooms / journalists ----------
  { id: "tg-ynet", publisher: "ynet-tg", name: "ynet חדשות - טלגרם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/ynetalerts", home: "https://t.me/ynetalerts", language: "he", verified: true },
  { id: "tg-israelhayom", publisher: "israelhayom-tg", name: "ישראל היום - טלגרם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/israelhayomofficial", home: "https://t.me/israelhayomofficial", language: "he", verified: true },
  { id: "tg-globes", publisher: "globes-tg", name: "גלובס - טלגרם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/globesnews", home: "https://t.me/globesnews", language: "he", verified: true },
  { id: "tg-now14", publisher: "now14-tg", name: "עכשיו 14 - טלגרם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/Now14_Israel", home: "https://t.me/Now14_Israel", language: "he", verified: true },
  { id: "tg-n12news", publisher: "n12-tg", name: "חדשות N12 - טלגרם", kind: "telegram", adapter: "telegram", url: "https://t.me/s/N12_News", home: "https://t.me/N12_News", language: "he", verified: false },
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

const STOP_WORDS = new Set(["של", "את", "על", "עם", "לא", "גם", "זה", "זו", "כי", "כך", "הוא", "היא", "הם", "הן", "כל", "אל", "לפי", "אחרי", "לפני", "עוד", "the", "a", "an", "of", "to", "in", "on", "for", "and", "is", "are", "with", "after", "before"]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/news") {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
      return handleNews(request, ctx);
    }

    if (url.pathname === "/api/health") {
      if (url.searchParams.get("deep") === "1") {
        const checkedAt = new Date().toISOString();
        const results = await Promise.all(SOURCES.map(fetchSource));
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
          ok: sourceStatus.some((s) => s.ok),
          service: "hadashota-news",
          checkedAt,
          configuredSources: SOURCES.length,
          respondingSources: sourceStatus.filter((s) => s.ok).length,
          sources: sourceStatus
        });
      }
      return json({ ok: true, service: "hadashota-news", time: new Date().toISOString() });
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

async function handleNews(request, ctx) {
  const cacheUrl = new URL(request.url);
  cacheUrl.search = "";
  cacheUrl.pathname = "/api/news";
  const cacheKey = new Request(cacheUrl.toString(), { method: "GET" });
  const cache = caches.default;

  const cached = await cache.match(cacheKey);
  if (cached) return cors(cached);

  const started = Date.now();
  const settled = await Promise.all(SOURCES.map(fetchSource));
  const rawItems = settled.flatMap((r) => r.items);
  const now = Date.now();
  const cutoff = now - 30 * 60 * 60 * 1000;

  const recent = rawItems
    .filter((item) => {
      const t = Date.parse(item.publishedAt);
      return Number.isFinite(t) && t >= cutoff && t <= now + 10 * 60 * 1000;
    })
    .map((item) => ({ ...item, category: classify(item) }))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  const clustered = clusterItems(recent).slice(0, 650);
  const activeSources = settled
    .map((s) => ({ ...s, recentItems: s.items.filter((item) => {
      const t = Date.parse(item.publishedAt);
      return Number.isFinite(t) && t >= cutoff && t <= now + 10 * 60 * 1000;
    }) }))
    .filter((s) => s.recentItems.length > 0)
    .map((s) => ({
      id: s.source.id,
      publisher: s.source.publisher,
      name: s.source.name,
      kind: s.source.kind,
      home: s.source.home,
      verified: !!s.source.verified,
      official: !!s.source.official,
      independent: !!s.source.independent,
      itemCount: s.recentItems.length,
      latencyMs: s.latencyMs,
      lastItemAt: s.recentItems[0]?.publishedAt || null
    }))
    .sort((a, b) => Date.parse(b.lastItemAt || 0) - Date.parse(a.lastItemAt || 0));

  const payload = {
    generatedAt: new Date().toISOString(),
    refreshAfterSeconds: 60,
    tookMs: Date.now() - started,
    items: clustered,
    sources: activeSources,
    stats: {
      configuredSources: SOURCES.length,
      activeSources: activeSources.length,
      items: clustered.length,
      officialSources: activeSources.filter((s) => s.official).length,
      telegramSources: activeSources.filter((s) => s.kind === "telegram").length
    }
  };

  const response = json(payload, 200, {
    "Cache-Control": "public, max-age=20, s-maxage=55, stale-while-revalidate=120"
  });

  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

async function fetchSource(source) {
  const started = Date.now();
  try {
    const response = await fetchWithTimeout(source.url, 5200);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.text();
    let items = [];

    if (source.adapter === "rss") items = parseRss(body, source);
    if (source.adapter === "telegram") items = parseTelegram(body, source);
    if (source.adapter === "jsonld") items = parseJsonLd(body, source);

    items = dedupeSameSource(items)
      .filter((i) => i.title && i.url && i.publishedAt)
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .slice(0, 80);

    return { source, items, latencyMs: Date.now() - started, error: null };
  } catch (error) {
    return { source, items: [], latencyMs: Date.now() - started, error: String(error?.message || error) };
  }
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
      cf: { cacheEverything: true, cacheTtl: 60 }
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
    const description = cleanText(firstTag(block, ["description", "summary", "content:encoded", "content"]));
    const publishedAt = safeIso(dateRaw);
    const url = absoluteUrl(link, source.home);

    if (!title || !url || !publishedAt) continue;
    items.push(makeItem({ source, title, url, publishedAt, preview: trimPreview(description) }));
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
    const text = cleanText(textHtml || "");
    const publishedAt = safeIso(datetime);
    if (!dataPost || !text || !publishedAt) continue;

    const url = `https://t.me/${dataPost}`;
    const title = telegramTitle(text);
    items.push(makeItem({ source, title, url, publishedAt, preview: trimPreview(text, 260) }));
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
      if (!title || !url || !publishedAt) return null;
      return makeItem({ source, title, url, publishedAt, preview: trimPreview(preview) });
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

function makeItem({ source, title, url, publishedAt, preview }) {
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

    for (let i = Math.max(0, clusters.length - 90); i < clusters.length; i++) {
      const cluster = clusters[i];
      if (Math.abs(itemTime - Date.parse(cluster.publishedAt)) > 8 * 60 * 60 * 1000) continue;
      if (titleSimilarity(item.title, cluster.title) >= 0.72) {
        match = cluster;
        break;
      }
    }

    if (!match) {
      clusters.push({
        ...item,
        reportCount: 1,
        related: [{ sourceId: item.sourceId, publisher: item.publisher, sourceName: item.sourceName, sourceKind: item.sourceKind, verified: item.verified, official: item.official, independent: item.independent, url: item.url, publishedAt: item.publishedAt }]
      });
      continue;
    }

    const exists = match.related.some((r) => r.publisher === item.publisher);
    if (!exists) {
      match.related.push({ sourceId: item.sourceId, publisher: item.publisher, sourceName: item.sourceName, sourceKind: item.sourceKind, verified: item.verified, official: item.official, independent: item.independent, url: item.url, publishedAt: item.publishedAt });
      match.reportCount = match.related.length;
    }

    // Prefer an official or verified representative, otherwise keep the newest one.
    const representativeScore = Number(match.official) * 3 + Number(match.verified) * 2;
    const candidateScore = Number(item.official) * 3 + Number(item.verified) * 2;
    if (candidateScore > representativeScore) {
      const related = match.related;
      Object.assign(match, item, { related, reportCount: related.length });
    }
  }

  return clusters.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
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
  return normalizeSpace(decodeEntities(stripHtml(unwrapCdata(value || ""))));
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
  return String(value || "")
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, code) => {
      if (code[0] === "#") {
        const hex = code[1]?.toLowerCase() === "x";
        const n = parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10);
        return Number.isFinite(n) ? String.fromCodePoint(n) : _;
      }
      return entities[code.toLowerCase()] ?? _;
    });
}

function normalizeSpace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function trimPreview(value, max = 220) {
  const text = normalizeSpace(value);
  return text.length > max ? `${text.slice(0, max - 1).trim()}…` : text;
}

function telegramTitle(text) {
  const clean = normalizeSpace(text);
  const first = clean.split(/(?<=[.!?…])\s+/)[0] || clean;
  return first.length > 180 ? `${first.slice(0, 179).trim()}…` : first;
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
