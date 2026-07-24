const state = {
  items: [],
  sources: [],
  hours: 1,
  category: (localStorage.getItem("hadashota.category") ?? localStorage.getItem("pulse.category")) || "all",
  kind: (localStorage.getItem("hadashota.kind") ?? localStorage.getItem("pulse.kind")) || "all",
  query: "",
  compact: (localStorage.getItem("hadashota.compact") ?? localStorage.getItem("pulse.compact")) === "1",
  cluster: (localStorage.getItem("hadashota.cluster") ?? localStorage.getItem("pulse.cluster")) !== "0",
  autoRefresh: (localStorage.getItem("hadashota.autoRefresh") ?? "1") !== "0",
  allSourcesVisible: false,
  loading: false,
  timer: null,
  countdownTimer: null,
  retryTimer: null,
  retryAttempt: 0,
  nextRefreshAt: 0,
  dataDelayed: false,
  city: localStorage.getItem("hadashota.city") || "telaviv",
  lastVisitAt: Number((localStorage.getItem("hadashota.lastVisitAt") ?? localStorage.getItem("pulse.lastVisitAt"))) || 0
};

const el = {
  feed: document.querySelector("#feed"),
  emptyState: document.querySelector("#emptyState"),
  resultsCount: document.querySelector("#resultsCount"),
  feedTitle: document.querySelector("#feedTitle"),
  searchInput: document.querySelector("#searchInput"),
  refreshBtn: document.querySelector("#refreshBtn"),
  timeFilters: document.querySelector("#timeFilters"),
  categoryFilters: document.querySelector("#categoryFilters"),
  compactToggle: document.querySelector("#compactToggle"),
  clusterToggle: document.querySelector("#clusterToggle"),
  autoRefresh: document.querySelector("#autoRefresh"),
  sourceList: document.querySelector("#sourceList"),
  activeSourceCount: document.querySelector("#activeSourceCount"),
  showAllSources: document.querySelector("#showAllSources"),
  statSources: document.querySelector("#statSources"),
  statSourceDetail: document.querySelector("#statSourceDetail"),
  statHour: document.querySelector("#statHour"),
  statOfficial: document.querySelector("#statOfficial"),
  currentDate: document.querySelector("#currentDate"),
  lastUpdated: document.querySelector("#lastUpdated"),
  breakingBanner: document.querySelector("#breakingBanner"),
  breakingLink: document.querySelector("#breakingLink"),
  breakingTitle: document.querySelector("#breakingTitle"),
  breakingMeta: document.querySelector("#breakingMeta"),
  resetFilters: document.querySelector("#resetFilters"),
  toast: document.querySelector("#toast"),
  filtersToggle: document.querySelector("#filtersToggle"),
  controlPanel: document.querySelector("#controlPanel"),
  themeToggle: document.querySelector("#themeToggle"),
  leadStory: document.querySelector("#leadStory"),
  leadStoryLink: document.querySelector("#leadStoryLink"),
  leadStoryTitle: document.querySelector("#leadStoryTitle"),
  leadStoryPreview: document.querySelector("#leadStoryPreview"),
  leadStorySource: document.querySelector("#leadStorySource"),
  leadStoryAge: document.querySelector("#leadStoryAge"),
  leadStoryCount: document.querySelector("#leadStoryCount"),
  leadStorySignal: document.querySelector("#leadStorySignal"),
  leadStorySources: document.querySelector("#leadStorySources"),
  leadStoryCta: document.querySelector("#leadStoryCta"),
  leadStoryMedia: document.querySelector("#leadStoryMedia"),
  leadStoryImage: document.querySelector("#leadStoryImage"),
  citySelect: document.querySelector("#citySelect"),
  weatherTemp: document.querySelector("#weatherTemp"),
  weatherText: document.querySelector("#weatherText"),
  weatherRange: document.querySelector("#weatherRange"),
  shabbatIn: document.querySelector("#shabbatIn"),
  shabbatOut: document.querySelector("#shabbatOut"),
  shabbatCity: document.querySelector("#shabbatCity"),
  shabbatParasha: document.querySelector("#shabbatParasha"),
  trendingStrip: document.querySelector("#trendingStrip"),
  trendingTopics: document.querySelector("#trendingTopics"),
  refreshCountdown: document.querySelector("#refreshCountdown"),
  flashDeck: document.querySelector("#flashDeck"),
  flashDeckItems: document.querySelector("#flashDeckItems"),
  locateBtn: document.querySelector("#locateBtn"),
  autoRefreshPill: document.querySelector("#autoRefreshPill"),
  quickMenu: document.querySelector("#quickMenu"),
  quickAutoRefresh: document.querySelector("#quickAutoRefresh"),
  quickAutoStatus: document.querySelector("#quickAutoStatus"),
  quickFilters: document.querySelector("#quickFilters"),
  quickReset: document.querySelector("#quickReset"),
  dataStatus: document.querySelector("#dataStatus"),
  dataStatusText: document.querySelector("#dataStatusText"),
  aboutBtn: document.querySelector("#aboutBtn"),
  contactBtn: document.querySelector("#contactBtn"),
  aboutModal: document.querySelector("#aboutModal"),
  contactModal: document.querySelector("#contactModal")
};

const MAINSTREAM_PUBLISHERS = ["ynet", "n12", "walla", "israelhayom", "kan", "13tv", "maariv"];
const NEWS_SHARDS = ["sites", "telegram"];
const LAST_GOOD_PREFIX = "hadashota.lastGoodShard.v6.";
const CLIENT_NEWS_TIMEOUT_MS = 22_000;

const CATEGORY_LABELS = {
  all: "כל העדכונים",
  security: "ביטחוני",
  politics: "פוליטי",
  diplomatic: "מדיני",
  other: "כללי"
};

init();

function init() {
  el.currentDate.textContent = new Intl.DateTimeFormat("he-IL", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  syncTheme();
  syncControlsFromState();
  bindEvents();
  restoreLocalLastGood();
  loadUtilities();
  loadNews();
  restartAutoRefresh();
}

function bindEvents() {
  el.timeFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-hours]");
    if (!button) return;
    state.hours = Number(button.dataset.hours);
    syncControlsFromState();
    render();
  });

  el.categoryFilters.addEventListener("click", (event) => {
    const category = event.target.closest("button[data-category]");
    if (category) {
      state.category = category.dataset.category;
      localStorage.setItem("hadashota.category", state.category);
      syncControlsFromState();
      render();
      return;
    }

    const kind = event.target.closest("button[data-kind]");
    if (kind) {
      state.kind = kind.dataset.kind;
      localStorage.setItem("hadashota.kind", state.kind);
      syncControlsFromState();
      render();
    }
  });

  // Every news item is a link to its exact source, including Telegram messages.
  // Interactive controls inside a card keep their own behavior.
  el.feed?.addEventListener("click", (event) => {
    if (event.target.closest("a, button, summary, details, input, select, textarea, label")) return;
    const card = event.target.closest(".news-card[data-story-url]");
    if (!card) return;
    openStorySource(card.dataset.storyUrl);
  });

  el.feed?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target.closest("a, button, summary, details, input, select, textarea, label")) return;
    const card = event.target.closest(".news-card[data-story-url]");
    if (!card) return;
    event.preventDefault();
    openStorySource(card.dataset.storyUrl);
  });

  let searchTimer;
  el.searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = el.searchInput.value.trim().toLowerCase();
      render();
    }, 120);
  });

  el.refreshBtn.addEventListener("click", () => loadNews(true));
  el.themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    if (isDark) {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("hadashota.theme", "light");
    } else {
      document.documentElement.dataset.theme = "dark";
      localStorage.setItem("hadashota.theme", "dark");
    }
    syncTheme();
  });
  el.compactToggle.addEventListener("click", () => {
    state.compact = !state.compact;
    localStorage.setItem("hadashota.compact", state.compact ? "1" : "0");
    syncControlsFromState();
    renderFeed();
  });

  el.clusterToggle.addEventListener("change", () => {
    state.cluster = el.clusterToggle.checked;
    localStorage.setItem("hadashota.cluster", state.cluster ? "1" : "0");
    render();
  });

  el.autoRefresh.addEventListener("change", () => setAutoRefresh(el.autoRefresh.checked));

  el.showAllSources.addEventListener("click", () => {
    state.allSourcesVisible = !state.allSourcesVisible;
    renderSources();
  });

  el.citySelect?.addEventListener("change", () => {
    state.city = el.citySelect.value;
    localStorage.setItem("hadashota.city", state.city);
    loadUtilities();
  });

  document.querySelector(".news-nav")?.addEventListener("click", (event) => {
    const cat = event.target.closest("[data-quick-category]");
    const kind = event.target.closest("[data-quick-kind]");
    if (!cat && !kind) return;

    // The newsroom bar behaves like primary navigation, not like an extra AND filter.
    // Category tabs show that category across all sources; source tabs show that source
    // type across all categories. "ראשי" always returns to the complete feed.
    if (cat) {
      state.category = cat.dataset.quickCategory;
      state.kind = "all";
    } else {
      state.kind = kind.dataset.quickKind;
      state.category = "all";
    }

    localStorage.setItem("hadashota.category", state.category);
    localStorage.setItem("hadashota.kind", state.kind);
    syncControlsFromState();
    render();
    scrollToFeedFromNewsroomNav();
  });

  el.locateBtn?.addEventListener("click", locateNearestCity);

  el.resetFilters.addEventListener("click", resetFilters);
  el.filtersToggle.addEventListener("click", () => {
    const opening = el.quickMenu.classList.contains("hidden");
    el.quickMenu.classList.toggle("hidden");
    el.filtersToggle.setAttribute("aria-expanded", opening ? "true" : "false");
  });
  el.autoRefreshPill?.addEventListener("click", toggleAutoRefresh);
  el.quickAutoRefresh?.addEventListener("click", toggleAutoRefresh);
  el.quickFilters?.addEventListener("click", () => {
    el.quickMenu.classList.add("hidden");
    el.filtersToggle.setAttribute("aria-expanded", "false");
    el.controlPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => el.searchInput.focus(), 350);
  });
  el.quickReset?.addEventListener("click", () => {
    resetFilters();
    el.quickMenu.classList.add("hidden");
    el.filtersToggle.setAttribute("aria-expanded", "false");
  });

  el.aboutBtn?.addEventListener("click", () => openSiteModal(el.aboutModal, el.aboutBtn));
  el.contactBtn?.addEventListener("click", () => openSiteModal(el.contactModal, el.contactBtn));
  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => closeSiteModal(button.closest(".site-modal")));
  });

  document.addEventListener("click", (event) => {
    if (!el.quickMenu || el.quickMenu.classList.contains("hidden")) return;
    if (el.quickMenu.contains(event.target) || el.filtersToggle.contains(event.target)) return;
    el.quickMenu.classList.add("hidden");
    el.filtersToggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openModal = document.querySelector(".site-modal:not(.hidden)");
      if (openModal) {
        closeSiteModal(openModal);
        return;
      }
    }
    if (event.key === "/" && document.activeElement !== el.searchInput && !document.querySelector(".site-modal:not(.hidden)")) {
      event.preventDefault();
      el.searchInput.focus();
    }
    if (event.key === "Escape" && document.activeElement === el.searchInput) {
      el.searchInput.value = "";
      state.query = "";
      el.searchInput.blur();
      render();
    }
  });
}

let modalReturnFocus = null;

function openSiteModal(modal, trigger) {
  if (!modal) return;
  modalReturnFocus = trigger || document.activeElement;
  document.querySelectorAll(".site-modal:not(.hidden)").forEach((other) => closeSiteModal(other, false));
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modal.querySelector(".modal-card")?.focus());
}

function closeSiteModal(modal, restoreFocus = true) {
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".site-modal:not(.hidden)")) document.body.classList.remove("modal-open");
  if (restoreFocus && modalReturnFocus instanceof HTMLElement) modalReturnFocus.focus();
}


async function loadNews(force = false, fromRetry = false) {
  if (state.loading) return;
  state.loading = true;
  el.refreshBtn.classList.add("loading");

  try {
    const results = await Promise.allSettled(NEWS_SHARDS.map((shard) => fetchNewsShard(shard, force)));
    const payloads = [];
    let delayed = false;
    let freshShards = 0;

    results.forEach((result, index) => {
      const shard = NEWS_SHARDS[index];
      if (result.status === "fulfilled" && Array.isArray(result.value?.items) && result.value.items.length) {
        payloads.push(result.value);
        persistShardLastGood(shard, result.value);
        freshShards += result.value.stale ? 0 : 1;
        if (result.value.stale) delayed = true;
        return;
      }

      const cached = readShardLastGood(shard);
      if (cached?.items?.length) {
        payloads.push({ ...cached, stale: true, localFallback: true });
        delayed = true;
      } else {
        delayed = true;
      }
    });

    if (!payloads.length) throw new Error("No news shard returned usable data");

    const data = mergeNewsPayloads(payloads);
    if (!data.items.length) throw new Error("Merged news feed is empty");

    state.items = data.items;
    state.sources = data.sources;
    state.dataDelayed = delayed || freshShards < NEWS_SHARDS.length;
    el.lastUpdated.textContent = state.dataDelayed
      ? `נתונים אחרונים · ${formatClock(data.generatedAt)}`
      : `עודכן ${formatClock(data.generatedAt)}`;

    renderStats(data);
    render();
    setDataStatus(state.dataDelayed);

    if (state.autoRefresh) scheduleNextRefresh(Number(data.refreshAfterSeconds) || 60);
    else updateRefreshCountdown();

    if (!state.dataDelayed) {
      state.retryAttempt = 0;
      clearTimeout(state.retryTimer);
      localStorage.setItem("hadashota.lastVisitAt", String(Date.now()));
      if (force) showToast("החדשות רועננו עכשיו");
    } else {
      scheduleNewsRetry();
      if (force) showToast("חלק מהמקורות מתעכבים — מוצגים הנתונים האחרונים");
    }
  } catch (error) {
    console.error(error);
    state.dataDelayed = true;
    const restored = state.items.length > 0 || restoreLocalLastGood();
    setDataStatus(true, restored);
    scheduleNewsRetry();

    if (!restored) {
      el.feed.innerHTML = `<div class="connection-state" role="status"><span class="connection-spinner"></span><div><strong>מתחבר למקורות החדשות…</strong><small>מתבצע ניסיון נוסף אוטומטית בעוד מספר שניות.</small></div></div>`;
    }
    if (force && !fromRetry) showToast(restored ? "העדכון מתעכב — מוצגים הנתונים האחרונים" : "מתחבר מחדש למקורות…");
  } finally {
    state.loading = false;
    el.refreshBtn.classList.remove("loading");
  }
}

async function fetchNewsShard(shard, force = false) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("client_timeout"), CLIENT_NEWS_TIMEOUT_MS);
  try {
    const params = new URLSearchParams({ shard });
    if (force) params.set("force", "1");
    const response = await fetch(`/api/news?${params}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: force ? "no-store" : "default"
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} (${shard})`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function persistShardLastGood(shard, payload) {
  if (!payload?.items?.length) return;
  try {
    const compact = {
      ...payload,
      items: payload.items.slice(0, shard === "telegram" ? 360 : 320),
      failures: []
    };
    localStorage.setItem(`${LAST_GOOD_PREFIX}${shard}`, JSON.stringify(compact));
  } catch (error) {
    console.warn("Could not persist last good news", error);
  }
}

function readShardLastGood(shard) {
  try {
    const raw = localStorage.getItem(`${LAST_GOOD_PREFIX}${shard}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.items) || !parsed.items.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

function restoreLocalLastGood() {
  const payloads = NEWS_SHARDS.map(readShardLastGood).filter(Boolean);
  if (!payloads.length) return false;
  const data = mergeNewsPayloads(payloads.map((payload) => ({ ...payload, stale: true, localFallback: true })));
  if (!data.items.length) return false;
  state.items = data.items;
  state.sources = data.sources;
  state.dataDelayed = true;
  el.lastUpdated.textContent = `מוצגים נתונים שמורים · ${formatClock(data.generatedAt)}`;
  renderStats(data);
  render();
  setDataStatus(true);
  return true;
}

function scheduleNewsRetry() {
  clearTimeout(state.retryTimer);
  const delays = [5, 10, 20, 30];
  const seconds = delays[Math.min(state.retryAttempt, delays.length - 1)];
  state.retryAttempt += 1;
  state.retryTimer = setTimeout(() => loadNews(false, true), seconds * 1000);
}

function setDataStatus(delayed, hasData = state.items.length > 0) {
  if (!el.dataStatus || !el.dataStatusText) return;
  el.dataStatus.classList.toggle("hidden", !delayed);
  if (delayed) {
    el.dataStatusText.textContent = hasData
      ? "העדכון מתעכב — מוצגים הנתונים האחרונים"
      : "מתחבר למקורות — מתבצע ניסיון נוסף אוטומטית";
  }
}

function mergeNewsPayloads(payloads) {
  const items = payloads.flatMap((payload) => Array.isArray(payload.items) ? payload.items : []);
  const sourcesById = new Map();
  for (const payload of payloads) {
    for (const source of Array.isArray(payload.sources) ? payload.sources : []) {
      const current = sourcesById.get(source.id);
      if (!current || Date.parse(source.lastItemAt || 0) > Date.parse(current.lastItemAt || 0)) sourcesById.set(source.id, source);
    }
  }

  const mergedItems = mergeClustersClient(items)
    .sort((a, b) => Date.parse(b.latestReportAt || b.publishedAt) - Date.parse(a.latestReportAt || a.publishedAt))
    .slice(0, 650);
  const generatedAt = payloads
    .map((payload) => payload.generatedAt)
    .filter(Boolean)
    .sort((a, b) => Date.parse(b) - Date.parse(a))[0] || new Date().toISOString();

  return {
    generatedAt,
    refreshAfterSeconds: 60,
    items: mergedItems,
    sources: [...sourcesById.values()].sort((a, b) => Date.parse(b.lastItemAt || 0) - Date.parse(a.lastItemAt || 0)),
    stats: {
      configuredSources: Math.max(...payloads.map((payload) => Number(payload.stats?.configuredSources) || 0), 0)
    }
  };
}

function mergeClustersClient(items) {
  const sorted = [...items].sort((a, b) => Date.parse(b.latestReportAt || b.publishedAt) - Date.parse(a.latestReportAt || a.publishedAt));
  const clusters = [];

  for (const item of sorted) {
    const itemTime = Date.parse(item.latestReportAt || item.publishedAt);
    let match = null;
    for (let i = Math.max(0, clusters.length - 120); i < clusters.length; i++) {
      const candidate = clusters[i];
      const candidateTime = Date.parse(candidate.latestReportAt || candidate.publishedAt);
      if (Math.abs(itemTime - candidateTime) > 8 * 60 * 60 * 1000) continue;
      if (item.category && candidate.category && item.category !== "other" && candidate.category !== "other" && item.category !== candidate.category) continue;
      if (sameEventClient(item.title, candidate.title)) { match = candidate; break; }
    }

    if (!match) {
      const clone = structuredCloneSafe(item);
      clone.related = normalizeClusterReports(clone);
      clone.reportCount = clone.related.length || 1;
      clone.latestReportAt = clusterLatestAt(clone);
      clone.firstReportAt = clusterFirstAt(clone);
      clusters.push(clone);
      continue;
    }

    const reports = dedupeReports([...normalizeClusterReports(match), ...normalizeClusterReports(item)]);
    const preferred = representativeRank(item) > representativeRank(match) ? item : match;
    const other = preferred === item ? match : item;
    const latestReportAt = newestIso(reports.map((report) => report.publishedAt).concat([match.latestReportAt, item.latestReportAt]));
    const firstReportAt = oldestIso(reports.map((report) => report.publishedAt).concat([match.firstReportAt, item.firstReportAt]));
    const imageUrl = preferred.imageUrl || other.imageUrl || reports.find((report) => report.imageUrl)?.imageUrl || null;
    const preserved = { ...preferred };
    Object.assign(match, preserved, {
      related: reports,
      reportCount: reports.length,
      latestReportAt,
      firstReportAt,
      imageUrl
    });
  }
  return clusters;
}

function normalizeClusterReports(item) {
  const base = {
    sourceId: item.sourceId,
    publisher: item.publisher,
    sourceName: item.sourceName,
    sourceKind: item.sourceKind,
    verified: !!item.verified,
    official: !!item.official,
    independent: !!item.independent,
    url: item.url,
    publishedAt: item.publishedAt,
    imageUrl: item.imageUrl || null
  };
  return dedupeReports([base, ...(Array.isArray(item.related) ? item.related : [])]);
}

function dedupeReports(reports) {
  const byPublisher = new Map();
  for (const report of reports) {
    if (!report?.publisher && !report?.sourceId) continue;
    const key = report.publisher || report.sourceId;
    const current = byPublisher.get(key);
    if (!current || Date.parse(report.publishedAt || 0) > Date.parse(current.publishedAt || 0)) byPublisher.set(key, report);
  }
  return [...byPublisher.values()].sort((a, b) => Date.parse(b.publishedAt || 0) - Date.parse(a.publishedAt || 0));
}

function representativeRank(item) {
  const publishedMs = Date.parse(item?.publishedAt || 0);
  const ageHours = Number.isFinite(publishedMs) ? Math.max(0, (Date.now() - publishedMs) / 3_600_000) : 24;
  const recency = Math.max(0, 4 - ageHours);
  // Mixed clusters must remain clickable: a real news-site report always wins
  // the representative slot over a Telegram post. Official/verified still matter within a kind.
  return Number(item?.sourceKind === "site") * 100
    + Number(item?.official) * 20
    + Number(item?.verified) * 5
    + Number(MAINSTREAM_PUBLISHERS.includes(item?.publisher)) * 3
    + recency;
}

function clusterLatestAt(item) {
  return newestIso([item?.latestReportAt, item?.publishedAt, ...(item?.related || []).map((report) => report.publishedAt)]);
}

function clusterFirstAt(item) {
  return oldestIso([item?.firstReportAt, item?.publishedAt, ...(item?.related || []).map((report) => report.publishedAt)]);
}

function newestIso(values) {
  const valid = values.filter(Boolean).map((value) => Date.parse(value)).filter(Number.isFinite);
  return valid.length ? new Date(Math.max(...valid)).toISOString() : new Date().toISOString();
}

function oldestIso(values) {
  const valid = values.filter(Boolean).map((value) => Date.parse(value)).filter(Number.isFinite);
  return valid.length ? new Date(Math.min(...valid)).toISOString() : new Date().toISOString();
}

function structuredCloneSafe(value) {
  try { return structuredClone(value); } catch { return JSON.parse(JSON.stringify(value)); }
}

function sameEventClient(a, b) {
  const A = clientTitleTokens(a);
  const B = clientTitleTokens(b);
  if (!A.size || !B.size) return false;
  let intersection = 0;
  for (const token of A) if (B.has(token)) intersection += 1;
  const union = A.size + B.size - intersection;
  const jaccard = union ? intersection / union : 0;
  const containment = intersection / Math.max(1, Math.min(A.size, B.size));
  return jaccard >= 0.58 || (intersection >= 3 && containment >= 0.52) || (intersection >= 4 && containment >= 0.44);
}

function clientTitleTokens(value) {
  const stop = new Set(["של","את","על","עם","לא","גם","זה","זו","כי","כך","הוא","היא","הם","כל","אל","לפי","אחרי","לפני","עוד","היום","עכשיו","חדש","חדשה","חדשות","דיווח","דיווחים","עדכון","עדכונים","ראשוני","ישראל","ישראלי","ישראלית","the","of","to","in","on","for","and","is","are","with","breaking","report","update"]);
  const normalized = String(value || "").toLowerCase().replace(/[״׳'\"`]/g, "").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  return new Set(normalized.split(" ").filter((word) => word.length >= 2 && !stop.has(word)).slice(0, 24));
}

function render() {
  renderLeadStory();
  renderFlashDeck();
  renderFeed();
  renderSources();
  renderBreaking();
  renderTrending();
}

function renderStats(data = null) {
  const now = Date.now();
  const hourItems = state.items.filter((item) => now - Date.parse(item.latestReportAt || item.publishedAt) <= 60 * 60 * 1000);
  const officialItems = state.items.filter((item) =>
    (item.official || (item.related || []).some((report) => report.official))
    && now - Date.parse(item.latestReportAt || item.publishedAt) <= 24 * 60 * 60 * 1000
  );
  el.statSources.textContent = String(state.sources.length);
  el.statHour.textContent = String(hourItems.length);
  el.statOfficial.textContent = String(officialItems.length);
  const tg = state.sources.filter((source) => source.kind === "telegram").length;
  el.statSourceDetail.textContent = `${tg} ערוצי Telegram פעילים`;
  if (data?.stats?.configuredSources) el.statSources.title = `${data.stats.configuredSources} מקורות מוגדרים במערכת; מוצגים רק מקורות שסיפקו נתונים`;
}

function renderFeed() {
  const items = filteredItems();
  el.resultsCount.textContent = `${items.length} עדכונים`;
  const timeLabel = state.hours === 1 ? "השעה האחרונה" : state.hours === 3 ? "3 השעות האחרונות" : "24 השעות האחרונות";
  el.feedTitle.textContent = `${currentFeedLabel()} · ${timeLabel}`;
  el.emptyState.classList.toggle("hidden", items.length > 0);
  el.feed.classList.toggle("hidden", items.length === 0);

  if (!items.length) {
    el.feed.innerHTML = "";
    return;
  }

  el.feed.innerHTML = items.map(newsCardHtml).join("");
}

function currentFeedLabel() {
  const categoryLabel = CATEGORY_LABELS[state.category] || "כל העדכונים";
  const kindLabels = { site: "אתרי חדשות", telegram: "Telegram", official: "רשמי בלבד" };
  const kindLabel = kindLabels[state.kind] || "";
  if (state.category === "all" && kindLabel) return kindLabel;
  if (state.category !== "all" && kindLabel) return `${categoryLabel} · ${kindLabel}`;
  return categoryLabel;
}

function scrollToFeedFromNewsroomNav() {
  const target = document.querySelector(".feed-column");
  if (!target) return;
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function filteredItems() {
  const cutoff = Date.now() - state.hours * 60 * 60 * 1000;
  const filtered = state.items.filter((item) => {
    if (Date.parse(item.latestReportAt || item.publishedAt) < cutoff) return false;
    if (state.category !== "all" && item.category !== state.category) return false;
    if (state.kind === "site" && item.sourceKind !== "site") return false;
    if (state.kind === "telegram" && item.sourceKind !== "telegram") return false;
    if (state.kind === "official" && !(item.official || (item.related || []).some((report) => report.official))) return false;
    if (state.query) {
      const haystack = `${item.title} ${item.preview || ""} ${item.sourceName}`.toLowerCase();
      if (!haystack.includes(state.query)) return false;
    }
    return true;
  });
  if (state.kind === "all" && state.category === "all" && !state.query) return mainstreamFirst(filtered);
  return filtered;
}

function mainstreamFirst(items) {
  const selected = [];
  const usedPublishers = new Set();
  const major = items
    .filter((item) => item.sourceKind === "site" && MAINSTREAM_PUBLISHERS.includes(item.publisher))
    .sort((a, b) => Date.parse(b.latestReportAt || b.publishedAt) - Date.parse(a.latestReportAt || a.publishedAt));

  for (const item of major) {
    if (usedPublishers.has(item.publisher)) continue;
    selected.push(item);
    usedPublishers.add(item.publisher);
    if (selected.length === 3) break;
  }
  if (selected.length < 3) {
    for (const item of items) {
      if (item.sourceKind !== "site" || usedPublishers.has(item.publisher)) continue;
      selected.push(item);
      usedPublishers.add(item.publisher);
      if (selected.length === 3) break;
    }
  }
  const chosen = new Set(selected.map((item) => item.id || item.url));
  return [...selected, ...items.filter((item) => !chosen.has(item.id || item.url))];
}

function newsCardHtml(item) {
  const related = state.cluster
    ? (item.related || []).filter((r) => r.url && r.url !== item.url)
    : [];
  const reportCount = state.cluster ? Math.max(Number(item.reportCount) || 1, (item.related || []).length || 1) : 1;
  const category = item.category || "other";
  const preview = item.preview && item.preview !== item.title ? `<p class="news-preview">${escapeHtml(item.preview)}</p>` : "";
  const telegramBadge = item.sourceKind === "telegram" ? `<span class="source-type-badge">Telegram</span>` : "";
  const newBadge = state.lastVisitAt > 0 && Date.parse(item.latestReportAt || item.publishedAt) > state.lastVisitAt ? `<span class="new-badge">חדש</span>` : "";
  const officialBadge = (item.official || (item.related || []).some((report) => report.official)) ? `<span class="official-badge">רשמי</span>` : "";
  const independentBadge = item.independent ? `<span class="independent-badge">עצמאי</span>` : "";
  const clusterBadge = reportCount > 1 ? `<span class="cluster-badge">${reportCount} מקורות</span>` : "";
  const isSite = item.sourceKind === "site";
  const storyUrl = safeUrl(item.url);
  const image = item.imageUrl ? `<img src="${safeUrl(item.imageUrl)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.closest('.news-image').remove()" />` : "";
  const imageHtml = item.imageUrl
    ? `<a class="news-image${isSite ? "" : " telegram-image"}" href="${storyUrl}" target="_blank" rel="noopener noreferrer" aria-label="פתיחת מקור הידיעה">${image}</a>`
    : "";
  const titleHtml = `<a href="${storyUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>`;
  const relatedHtml = related.length ? `
    <details class="related-wrap">
      <summary>עוד דיווחים (${related.length})</summary>
      <div class="related-list">
        ${related.map((r) => `<a class="related-link" href="${safeUrl(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.sourceName)} · ${formatAge(r.publishedAt)}</a>`).join("")}
      </div>
    </details>` : "";

  return `
    <article class="news-card clickable-story ${state.compact ? "compact" : ""} ${item.imageUrl ? "has-image" : ""} ${isSite ? "site-story" : "telegram-story"}" data-category="${category}" data-story-url="${storyUrl}" role="link" tabindex="0" aria-label="פתיחת המקור: ${escapeHtml(item.title)}">
      <div class="news-main">
        ${imageHtml}
        <div class="news-copy">
          <div class="news-meta">
            <span class="source-name">${escapeHtml(item.sourceName)}</span>
            <span class="meta-sep">•</span>
            <time datetime="${escapeHtml(item.publishedAt)}" title="${escapeHtml(formatFullDate(item.publishedAt))}">${formatAge(item.publishedAt)}</time>
            ${newBadge}${telegramBadge}${officialBadge}${independentBadge}${clusterBadge}
          </div>
          <h3 class="news-title">${titleHtml}</h3>
          ${preview}
        </div>
        <div class="news-side"><span class="category-badge ${category}">${CATEGORY_LABELS[category] || "כללי"}</span></div>
      </div>
      ${relatedHtml}
    </article>`;
}

function renderSources() {
  const sources = [...state.sources].sort((a, b) => {
    if (a.official !== b.official) return a.official ? -1 : 1;
    return Date.parse(b.lastItemAt || 0) - Date.parse(a.lastItemAt || 0);
  });
  el.activeSourceCount.textContent = String(sources.length);
  const limit = state.allSourcesVisible ? sources.length : 8;
  const visible = sources.slice(0, limit);

  el.sourceList.innerHTML = visible.map((source) => {
    const type = source.official ? "מקור רשמי" : source.independent ? "Telegram עצמאי" : source.kind === "telegram" ? "Telegram / כתב" : "אתר חדשות";
    const inner = `<span class="source-avatar">${escapeHtml(sourceInitial(source.name))}</span>
      <span class="source-info"><b>${escapeHtml(source.name)}</b><small>${type} · ${formatAge(source.lastItemAt)}</small></span>
      <i class="source-state" title="פעיל"></i>`;
    return source.home
      ? `<a class="source-row" href="${safeUrl(source.home)}" target="_blank" rel="noopener noreferrer" title="פתיחת המקור">${inner}</a>`
      : `<div class="source-row source-row-static">${inner}</div>`;
  }).join("");

  el.showAllSources.classList.toggle("hidden", sources.length <= 8);
  el.showAllSources.textContent = state.allSourcesVisible ? "הצג פחות" : `הצג את כל ${sources.length} המקורות`;
}

function renderLeadStory() {
  const now = Date.now();
  const candidates = state.items
    .map((item) => {
      const latestAt = clusterLatestAt(item);
      const ageMinutes = Math.max(0, (now - Date.parse(latestAt)) / 60_000);
      const reports = normalizeClusterReports(item);
      const uniqueSources = Math.max(Number(item.reportCount) || 1, reports.length || 1);
      const hasOfficial = !!item.official || reports.some((report) => report.official);
      const hasVerified = !!item.verified || reports.some((report) => report.verified);

      let freshness = 0;
      if (ageMinutes <= 15) freshness = 10;
      else if (ageMinutes <= 30) freshness = 8.5;
      else if (ageMinutes <= 60) freshness = 6;
      else if (ageMinutes <= 90) freshness = 3.2;
      else if (ageMinutes <= 120) freshness = 1.2;
      else freshness = 0;

      const sourceScore = Math.min(uniqueSources, 9) * 1.2;
      const authority = hasOfficial ? 1.8 : hasVerified ? 0.55 : 0;
      const activity = ageMinutes <= 12 ? 1.8 : ageMinutes <= 25 ? 1 : 0;
      const oldPenalty = ageMinutes > 75 ? (ageMinutes - 75) / 11 : 0;
      const score = freshness + sourceScore + authority + activity - oldPenalty;
      return { item, uniqueSources, ageMinutes, latestAt, score, hasOfficial };
    })
    .filter((entry) => entry.ageMinutes <= 150 && (entry.uniqueSources >= 3 || (entry.hasOfficial && entry.uniqueSources >= 2)))
    .sort((a, b) => b.score - a.score || Date.parse(b.latestAt) - Date.parse(a.latestAt));

  const winner = candidates[0];
  if (!winner) {
    el.leadStory.classList.add("hidden");
    return;
  }

  const item = winner.item;
  const sources = normalizeClusterReports(item);
  const sourceTarget = sources.find((source) => source.sourceKind === "site" && source.url)
    || sources.find((source) => source.url)
    || (item.url ? item : null);
  const unique = sources.slice(0, 5);

  el.leadStoryTitle.textContent = cleanDisplayTitle(item.title);
  el.leadStoryPreview.textContent = item.preview && item.preview !== item.title ? stripUrls(item.preview) : "הידיעה מתקדמת במהירות ומופיעה בכמה מקורות בזמן קצר.";
  el.leadStorySource.textContent = item.sourceName;
  el.leadStoryAge.textContent = formatAge(winner.latestAt);
  el.leadStoryCount.textContent = `${winner.uniqueSources} מקורות מדווחים`;
  el.leadStorySignal.textContent = winner.ageMinutes <= 20 ? "מתעדכן עכשיו" : winner.uniqueSources >= 6 ? "חם מאוד" : "בכמה מקורות במקביל";

  setOptionalLink(el.leadStoryLink, sourceTarget?.url);
  if (sourceTarget?.url) {
    el.leadStoryCta.href = sourceTarget.url;
    el.leadStoryCta.classList.remove("hidden");
  } else {
    el.leadStoryCta.removeAttribute("href");
    el.leadStoryCta.classList.add("hidden");
  }
  if (item.imageUrl) {
    el.leadStoryImage.src = item.imageUrl;
    el.leadStoryImage.alt = cleanDisplayTitle(item.title);
    setOptionalLink(el.leadStoryMedia, sourceTarget?.url);
    el.leadStoryMedia.classList.remove("hidden");
    el.leadStoryImage.onerror = () => el.leadStoryMedia.classList.add("hidden");
  } else {
    el.leadStoryImage.removeAttribute("src");
    el.leadStoryMedia.classList.add("hidden");
  }
  el.leadStorySources.innerHTML = unique.map((source) => source.url
    ? `<a href="${safeUrl(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.sourceName)}</a>`
    : `<span>${escapeHtml(source.sourceName)}</span>`).join("");
  el.leadStory.classList.remove("hidden");
}

function renderBreaking() {
  const now = Date.now();
  const latest = state.items.find((item) => {
    const age = now - Date.parse(item.latestReportAt || item.publishedAt);
    const hasOfficial = item.official || (item.related || []).some((report) => report.official);
    return age <= 45 * 60 * 1000 && (item.category === "security" || hasOfficial);
  });

  if (!latest) {
    el.breakingBanner.classList.add("hidden");
    return;
  }

  el.breakingTitle.textContent = cleanDisplayTitle(latest.title);
  el.breakingMeta.textContent = `${latest.sourceName} · ${formatAge(latest.latestReportAt || latest.publishedAt)}`;
  setOptionalLink(el.breakingLink, latest.url);
  el.breakingBanner.classList.remove("hidden");
}

function renderFlashDeck() {
  if (!el.flashDeck || !el.flashDeckItems) return;
  const cutoff = Date.now() - 3 * 60 * 60 * 1000;
  const seen = new Set();
  const preferred = state.items
    .filter((item) => item.sourceKind === "site" && item.url && Date.parse(item.latestReportAt || item.publishedAt) >= cutoff)
    .sort((a, b) => {
      const aMajor = MAINSTREAM_PUBLISHERS.includes(a.publisher) ? 1 : 0;
      const bMajor = MAINSTREAM_PUBLISHERS.includes(b.publisher) ? 1 : 0;
      const timeDiff = Date.parse(b.latestReportAt || b.publishedAt) - Date.parse(a.latestReportAt || a.publishedAt);
      if (Math.abs(timeDiff) > 20 * 60 * 1000) return timeDiff;
      return bMajor - aMajor || timeDiff;
    })
    .filter((item) => {
      const key = item.publisher || item.sourceName;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);

  if (preferred.length < 2) {
    el.flashDeck.classList.add("hidden");
    return;
  }
  el.flashDeckItems.innerHTML = preferred.map((item) => `<a class="flash-item" href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">
    <span>${escapeHtml(item.sourceName)} · ${formatAge(item.latestReportAt || item.publishedAt)}</span>
    <strong>${escapeHtml(cleanDisplayTitle(item.title))}</strong>
  </a>`).join("");
  el.flashDeck.classList.remove("hidden");
}

function openStorySource(url) {
  if (!url) return;
  try {
    const parsed = new URL(url, window.location.href);
    if (!/^https?:$/.test(parsed.protocol)) return;
    window.open(parsed.href, "_blank", "noopener,noreferrer");
  } catch {
    // Ignore malformed source URLs; normal anchors remain protected by safeUrl().
  }
}

function setOptionalLink(anchor, url) {
  if (!anchor) return;
  if (url) {
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.classList.remove("no-link");
    anchor.removeAttribute("aria-disabled");
  } else {
    anchor.removeAttribute("href");
    anchor.removeAttribute("target");
    anchor.classList.add("no-link");
    anchor.setAttribute("aria-disabled", "true");
  }
}

function stripUrls(text = "") {
  return String(text).replace(/https?:\/\/\S+/gi, "").replace(/\s{2,}/g, " ").trim();
}

function cleanDisplayTitle(text = "") {
  return stripUrls(text).replace(/(?:<<<|>>>|➡️|👉|👇)+/g, "").replace(/\s{2,}/g, " ").trim();
}

function locateNearestCity() {
  if (!navigator.geolocation) {
    showToast("הדפדפן לא תומך בזיהוי מיקום");
    return;
  }
  el.locateBtn.disabled = true;
  el.locateBtn.textContent = "מאתר…";
  navigator.geolocation.getCurrentPosition((position) => {
    const cities = {
      telaviv: [32.0853, 34.7818], jerusalem: [31.7683, 35.2137], haifa: [32.7940, 34.9896],
      beersheva: [31.2530, 34.7915], eilat: [29.5577, 34.9519]
    };
    const { latitude, longitude } = position.coords;
    let nearest = "telaviv", best = Infinity;
    for (const [key, [lat, lon]] of Object.entries(cities)) {
      const d = (latitude - lat) ** 2 + (longitude - lon) ** 2;
      if (d < best) { best = d; nearest = key; }
    }
    state.city = nearest;
    localStorage.setItem("hadashota.city", nearest);
    if (el.citySelect) el.citySelect.value = nearest;
    loadUtilities();
    showToast("העיר הותאמה לפי המיקום שלך");
    el.locateBtn.disabled = false;
    el.locateBtn.textContent = "⌖ המיקום שלי";
  }, () => {
    showToast("לא התקבלה הרשאת מיקום — אפשר לבחור עיר ידנית");
    el.locateBtn.disabled = false;
    el.locateBtn.textContent = "⌖ המיקום שלי";
  }, { enableHighAccuracy: false, timeout: 7000, maximumAge: 900000 });
}

function syncControlsFromState() {
  document.querySelectorAll("[data-hours]").forEach((button) => button.classList.toggle("active", Number(button.dataset.hours) === state.hours));
  document.querySelectorAll("[data-category]").forEach((button) => button.classList.toggle("active", button.dataset.category === state.category));
  document.querySelectorAll("[data-kind]").forEach((button) => button.classList.toggle("active", button.dataset.kind === state.kind));
  el.compactToggle.textContent = state.compact ? "תצוגה מרווחת" : "תצוגה קומפקטית";
  el.clusterToggle.checked = state.cluster;
  el.autoRefresh.checked = state.autoRefresh;
  el.autoRefreshPill?.classList.toggle("active", state.autoRefresh);
  if (el.autoRefreshPill) el.autoRefreshPill.querySelector("span").textContent = state.autoRefresh ? "רענון אוטומטי" : "רענון כבוי";
  if (el.quickAutoStatus) el.quickAutoStatus.textContent = state.autoRefresh ? "פעיל — מתעדכן כל דקה" : "רענון כבוי";
  if (el.citySelect) el.citySelect.value = state.city;
  document.querySelectorAll("[data-quick-category]").forEach((button) => {
    const active = state.kind === "all" && button.dataset.quickCategory === state.category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });
  document.querySelectorAll("[data-quick-kind]").forEach((button) => {
    const active = state.category === "all" && button.dataset.quickKind === state.kind;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });
}

function syncTheme() {
  const isDark = document.documentElement.dataset.theme === "dark";
  el.themeToggle.setAttribute("aria-pressed", String(isDark));
  el.themeToggle.setAttribute("aria-label", isDark ? "מעבר למצב בהיר" : "מעבר למצב כהה");
  el.themeToggle.title = isDark ? "מעבר למצב בהיר" : "מעבר למצב כהה";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", isDark ? "#0b0f15" : "#f7f8fb");
}

function resetFilters() {
  state.hours = 1;
  state.category = "all";
  state.kind = "all";
  state.query = "";
  el.searchInput.value = "";
  localStorage.setItem("hadashota.category", "all");
  localStorage.setItem("hadashota.kind", "all");
  syncControlsFromState();
  render();
}

function setAutoRefresh(enabled) {
  state.autoRefresh = Boolean(enabled);
  localStorage.setItem("hadashota.autoRefresh", state.autoRefresh ? "1" : "0");
  syncControlsFromState();
  restartAutoRefresh();
}

function toggleAutoRefresh() {
  setAutoRefresh(!state.autoRefresh);
}

function restartAutoRefresh() {
  clearTimeout(state.timer);
  clearInterval(state.countdownTimer);
  if (state.autoRefresh) {
    scheduleNextRefresh(60);
  } else {
    state.nextRefreshAt = 0;
    updateRefreshCountdown();
  }
  state.countdownTimer = setInterval(updateRefreshCountdown, 1000);
}

function scheduleNextRefresh(seconds = 60) {
  clearTimeout(state.timer);
  if (!state.autoRefresh) {
    state.nextRefreshAt = 0;
    updateRefreshCountdown();
    return;
  }
  const delayMs = Math.max(15, seconds) * 1000;
  state.nextRefreshAt = Date.now() + delayMs;
  state.timer = setTimeout(() => loadNews(false), delayMs);
  updateRefreshCountdown();
}

function updateRefreshCountdown() {
  if (!el.refreshCountdown) return;
  if (!state.autoRefresh) {
    el.refreshCountdown.textContent = "רענון כבוי";
    if (el.quickAutoStatus) el.quickAutoStatus.textContent = "רענון כבוי";
    return;
  }
  const seconds = Math.max(0, Math.ceil((state.nextRefreshAt - Date.now()) / 1000));
  el.refreshCountdown.textContent = seconds > 0 ? `רענון בעוד ${seconds} שנ׳` : "מרענן עכשיו…";
  if (el.quickAutoStatus) el.quickAutoStatus.textContent = seconds > 0 ? `רענון בעוד ${seconds} שנ׳` : "מרענן עכשיו…";
}

async function loadUtilities() {
  if (!el.citySelect) return;
  el.citySelect.value = state.city;
  try {
    const response = await fetch(`/api/utilities?city=${encodeURIComponent(state.city)}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    renderUtilities(data);
  } catch (error) {
    console.error("Utilities:", error);
    if (el.weatherText) el.weatherText.textContent = "לא זמין כרגע";
    if (el.weatherRange) el.weatherRange.textContent = "נסה שוב מאוחר יותר";
    if (el.shabbatIn) el.shabbatIn.textContent = "—";
    if (el.shabbatOut) el.shabbatOut.textContent = "—";
  }
}

function renderUtilities(data) {
  if (data?.city?.name) {
    if (el.shabbatCity) el.shabbatCity.textContent = data.city.name;
  }

  const weather = data?.weather;
  if (weather) {
    el.weatherTemp.textContent = Number.isFinite(weather.temperature) ? `${Math.round(weather.temperature)}°` : "—°";
    el.weatherText.textContent = weatherLabel(weather.weatherCode);
    const min = Number.isFinite(weather.min) ? Math.round(weather.min) : null;
    const max = Number.isFinite(weather.max) ? Math.round(weather.max) : null;
    const rain = Number.isFinite(weather.rainChance) ? Math.round(weather.rainChance) : null;
    const range = min !== null && max !== null ? `${min}°–${max}°` : "";
    el.weatherRange.textContent = rain !== null ? `${range}${range ? " · " : ""}${rain}% סיכוי לגשם` : range || "תחזית להיום";
  }

  const shabbat = data?.shabbat;
  if (shabbat) {
    el.shabbatIn.textContent = formatUtilityTime(shabbat.candleLighting);
    el.shabbatOut.textContent = formatUtilityTime(shabbat.havdalah);
    el.shabbatParasha.textContent = shabbat.parasha ? `· ${shabbat.parasha}` : "";
  }
}

function formatUtilityTime(iso) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("he-IL", { hour: "2-digit", minute: "2-digit" }).format(date);
}

function weatherLabel(code) {
  const n = Number(code);
  if (n === 0) return "בהיר";
  if ([1, 2].includes(n)) return "מעונן חלקית";
  if (n === 3) return "מעונן";
  if ([45, 48].includes(n)) return "ערפל";
  if ([51, 53, 55, 56, 57].includes(n)) return "טפטוף";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(n)) return "גשם";
  if ([71, 73, 75, 77, 85, 86].includes(n)) return "שלג";
  if ([95, 96, 99].includes(n)) return "סופות רעמים";
  return "מזג אוויר נעים";
}

function renderTrending() {
  if (!el.trendingStrip || !el.trendingTopics) return;
  const cutoff = Date.now() - 3 * 60 * 60 * 1000;
  const counts = new Map();
  const stop = new Set(["ישראל", "ישראלי", "חדשות", "דיווח", "עדכון", "עכשיו", "היום", "אחרי", "לפני", "בעקבות", "במהלך", "ראשוני", "אמר", "אומר", "כוחות", "הודעה", "המשטרה", "צה״ל", "של", "את", "על", "עם", "לא", "גם", "כי", "זה", "זו", "כל"]);
  for (const item of state.items) {
    if (Date.parse(item.latestReportAt || item.publishedAt) < cutoff) continue;
    const words = String(item.title || "").replace(/https?:\/\/\S+/g, " ").match(/[\u0590-\u05FF]{3,}/g) || [];
    const unique = new Set(words.filter((word) => !stop.has(word) && word.length >= 3));
    for (const word of unique) counts.set(word, (counts.get(word) || 0) + 1);
  }
  const topics = [...counts.entries()].filter(([, count]) => count >= 2).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (!topics.length) {
    el.trendingStrip.classList.add("hidden");
    return;
  }
  el.trendingTopics.innerHTML = topics.map(([topic, count]) => `<button type="button" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)} <small>${count}</small></button>`).join("");
  el.trendingStrip.classList.remove("hidden");
  el.trendingTopics.querySelectorAll("button[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.dataset.topic || "";
      state.query = topic.toLowerCase();
      el.searchInput.value = topic;
      render();
      el.controlPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function formatAge(iso) {
  const timestamp = Date.parse(iso);
  if (!Number.isFinite(timestamp)) return "עכשיו";
  const diff = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "עכשיו";
  if (minutes < 60) return `לפני ${minutes} דק׳`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `לפני ${hours} ${hours === 1 ? "שעה" : "שעות"}`;
  return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "short" }).format(new Date(timestamp));
}

function formatClock(iso) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "עכשיו" : new Intl.DateTimeFormat("he-IL", { hour: "2-digit", minute: "2-digit" }).format(date);
}

function formatFullDate(iso) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("he-IL", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function sourceInitial(name) {
  const clean = String(name || "?").replace(/[^\p{L}\p{N}]/gu, "");
  return clean.slice(0, 2).toUpperCase() || "?";
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) ? escapeHtml(url.toString()) : "#";
  } catch {
    return "#";
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  el.toast.textContent = message;
  el.toast.classList.add("show");
  toastTimer = setTimeout(() => el.toast.classList.remove("show"), 2300);
}
