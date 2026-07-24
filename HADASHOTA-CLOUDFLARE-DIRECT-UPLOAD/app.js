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
  nextRefreshAt: 0,
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
  quickReset: document.querySelector("#quickReset")
};

const MAINSTREAM_PUBLISHERS = ["ynet", "n12", "walla", "israelhayom", "kan", "13tv", "maariv"];

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
    if (cat) {
      state.category = cat.dataset.quickCategory;
      localStorage.setItem("hadashota.category", state.category);
      syncControlsFromState();
      render();
      document.querySelector("#controlPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (kind) {
      state.kind = kind.dataset.quickKind;
      localStorage.setItem("hadashota.kind", state.kind);
      syncControlsFromState();
      render();
      document.querySelector("#controlPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
  document.addEventListener("click", (event) => {
    if (!el.quickMenu || el.quickMenu.classList.contains("hidden")) return;
    if (el.quickMenu.contains(event.target) || el.filtersToggle.contains(event.target)) return;
    el.quickMenu.classList.add("hidden");
    el.filtersToggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== el.searchInput) {
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

async function loadNews(force = false) {
  if (state.loading) return;
  state.loading = true;
  el.refreshBtn.classList.add("loading");

  try {
    const response = await fetch(`/api/news`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state.items = Array.isArray(data.items) ? data.items : [];
    state.sources = Array.isArray(data.sources) ? data.sources : [];
    el.lastUpdated.textContent = `עודכן ${formatClock(data.generatedAt)}`;
    renderStats(data);
    render();
    if (state.autoRefresh) scheduleNextRefresh(Number(data.refreshAfterSeconds) || 60);
    else updateRefreshCountdown();
    localStorage.setItem("hadashota.lastVisitAt", String(Date.now()));
    if (force) showToast("החדשות רועננו עכשיו");
  } catch (error) {
    console.error(error);
    el.feed.innerHTML = `<div class="empty-state"><div class="empty-icon">!</div><h3>לא הצלחנו למשוך את המקורות</h3><p>בדוק שה‑Worker פעיל ונסה לרענן שוב.</p></div>`;
    showToast("שגיאה בטעינת המקורות");
  } finally {
    state.loading = false;
    el.refreshBtn.classList.remove("loading");
  }
}

function render() {
  renderLeadStory();
  renderFeed();
  renderSources();
  renderBreaking();
  renderTrending();
}

function renderStats(data = null) {
  const now = Date.now();
  const hourItems = state.items.filter((item) => now - Date.parse(item.publishedAt) <= 60 * 60 * 1000);
  const officialItems = state.items.filter((item) => item.official && now - Date.parse(item.publishedAt) <= 24 * 60 * 60 * 1000);
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
  el.feedTitle.textContent = `${CATEGORY_LABELS[state.category] || "כל העדכונים"} · ${timeLabel}`;
  el.emptyState.classList.toggle("hidden", items.length > 0);
  el.feed.classList.toggle("hidden", items.length === 0);

  if (!items.length) {
    el.feed.innerHTML = "";
    return;
  }

  el.feed.innerHTML = items.map(newsCardHtml).join("");
}

function filteredItems() {
  const cutoff = Date.now() - state.hours * 60 * 60 * 1000;
  const filtered = state.items.filter((item) => {
    if (Date.parse(item.publishedAt) < cutoff) return false;
    if (state.category !== "all" && item.category !== state.category) return false;
    if (state.kind === "site" && item.sourceKind !== "site") return false;
    if (state.kind === "telegram" && item.sourceKind !== "telegram") return false;
    if (state.kind === "official" && !item.official) return false;
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
  for (const publisher of MAINSTREAM_PUBLISHERS) {
    const item = items.find((candidate) => candidate.sourceKind === "site" && candidate.publisher === publisher && !usedPublishers.has(candidate.publisher));
    if (item) { selected.push(item); usedPublishers.add(item.publisher); }
    if (selected.length === 3) break;
  }
  if (selected.length < 3) {
    for (const item of items) {
      if (item.sourceKind !== "site" || usedPublishers.has(item.publisher)) continue;
      selected.push(item); usedPublishers.add(item.publisher);
      if (selected.length === 3) break;
    }
  }
  const chosen = new Set(selected.map((item) => item.id || item.url));
  return [...selected, ...items.filter((item) => !chosen.has(item.id || item.url))];
}

function newsCardHtml(item) {
  const related = state.cluster
    ? (item.related || []).filter((r) => r.url !== item.url && r.sourceKind === "site")
    : [];
  const reportCount = state.cluster ? Math.max(Number(item.reportCount) || 1, (item.related || []).length || 1) : 1;
  const category = item.category || "other";
  const preview = item.preview && item.preview !== item.title ? `<p class="news-preview">${escapeHtml(item.preview)}</p>` : "";
  const telegramBadge = item.sourceKind === "telegram" ? `<span class="source-type-badge">Telegram</span>` : "";
  const newBadge = state.lastVisitAt > 0 && Date.parse(item.publishedAt) > state.lastVisitAt ? `<span class="new-badge">חדש</span>` : "";
  const officialBadge = item.official ? `<span class="official-badge">רשמי</span>` : "";
  const independentBadge = item.independent ? `<span class="independent-badge">עצמאי</span>` : "";
  const clusterBadge = reportCount > 1 ? `<span class="cluster-badge">${reportCount} מקורות</span>` : "";
  const isSite = item.sourceKind === "site";
  const image = item.imageUrl ? `<img src="${safeUrl(item.imageUrl)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.closest('.news-image').remove()" />` : "";
  const imageHtml = item.imageUrl
    ? (isSite ? `<a class="news-image" href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="פתיחת הידיעה">${image}</a>` : `<div class="news-image telegram-image" aria-hidden="true">${image}</div>`)
    : "";
  const titleHtml = isSite
    ? `<a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>`
    : `<span>${escapeHtml(item.title)}</span>`;
  const relatedHtml = related.length ? `
    <details class="related-wrap">
      <summary>עוד דיווחים מאתרי חדשות (${related.length})</summary>
      <div class="related-list">
        ${related.map((r) => `<a class="related-link" href="${safeUrl(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.sourceName)} · ${formatAge(r.publishedAt)}</a>`).join("")}
      </div>
    </details>` : "";

  return `
    <article class="news-card ${state.compact ? "compact" : ""} ${item.imageUrl ? "has-image" : ""} ${isSite ? "clickable-story" : "telegram-story"}" data-category="${category}">
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
    return source.kind === "site"
      ? `<a class="source-row" href="${safeUrl(source.home)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
      : `<div class="source-row source-row-static" title="מקור Telegram — ללא קישור חיצוני">${inner}</div>`;
  }).join("");

  el.showAllSources.classList.toggle("hidden", sources.length <= 8);
  el.showAllSources.textContent = state.allSourcesVisible ? "הצג פחות" : `הצג את כל ${sources.length} המקורות`;
}

function renderLeadStory() {
  const now = Date.now();
  const candidates = state.items
    .map((item) => {
      const ageMinutes = Math.max(0, (now - Date.parse(item.publishedAt)) / 60_000);
      const reportCount = Math.max(Number(item.reportCount) || 1, Array.isArray(item.related) ? item.related.length : 1);
      const sourceKinds = new Set((item.related || []).map((r) => r.publisher || r.sourceId || r.sourceName));
      if (item.publisher) sourceKinds.add(item.publisher);
      const uniqueSources = Math.max(reportCount, sourceKinds.size);
      const freshness = Math.max(0, 180 - ageMinutes) / 180;
      const authority = item.official ? 0.6 : item.verified ? 0.25 : 0;
      const score = uniqueSources * 2.4 + freshness * 2 + authority;
      return { item, uniqueSources, ageMinutes, score };
    })
    .filter((entry) => entry.ageMinutes <= 180 && entry.uniqueSources >= 3)
    .sort((a, b) => b.score - a.score || Date.parse(b.item.publishedAt) - Date.parse(a.item.publishedAt));

  const winner = candidates[0];
  if (!winner) {
    el.leadStory.classList.add("hidden");
    return;
  }

  const item = winner.item;
  const sources = [
    { sourceName: item.sourceName, url: item.url, sourceKind: item.sourceKind },
    ...(item.related || []).filter((r) => r.url !== item.url)
  ];
  const seen = new Set();
  const unique = sources.filter((source) => {
    const key = source.sourceName || source.url;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 5);
  const siteTarget = sources.find((source) => source.sourceKind === "site" && source.url);

  el.leadStoryTitle.textContent = cleanDisplayTitle(item.title);
  el.leadStoryPreview.textContent = item.preview && item.preview !== item.title ? stripUrls(item.preview) : "הידיעה זוהתה כמובילה לאחר שפורסמה במקביל במספר מקורות שונים בזמן קצר.";
  el.leadStorySource.textContent = item.sourceName;
  el.leadStoryAge.textContent = formatAge(item.publishedAt);
  el.leadStoryCount.textContent = `${winner.uniqueSources} מקורות מדווחים`;
  el.leadStorySignal.textContent = winner.uniqueSources >= 6 ? "חם מאוד" : winner.uniqueSources >= 4 ? "מתפשט במהירות" : "בכמה מקורות במקביל";

  setOptionalLink(el.leadStoryLink, siteTarget?.url);
  if (siteTarget?.url) {
    el.leadStoryCta.href = siteTarget.url;
    el.leadStoryCta.classList.remove("hidden");
  } else {
    el.leadStoryCta.removeAttribute("href");
    el.leadStoryCta.classList.add("hidden");
  }
  if (item.imageUrl) {
    el.leadStoryImage.src = item.imageUrl;
    el.leadStoryImage.alt = cleanDisplayTitle(item.title);
    setOptionalLink(el.leadStoryMedia, siteTarget?.url);
    el.leadStoryMedia.classList.remove("hidden");
    el.leadStoryImage.onerror = () => el.leadStoryMedia.classList.add("hidden");
  } else {
    el.leadStoryImage.removeAttribute("src");
    el.leadStoryMedia.classList.add("hidden");
  }
  el.leadStorySources.innerHTML = unique.map((source) => source.sourceKind === "site"
    ? `<a href="${safeUrl(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.sourceName)}</a>`
    : `<span>${escapeHtml(source.sourceName)}</span>`).join("");
  el.leadStory.classList.remove("hidden");
}

function renderBreaking() {
  const now = Date.now();
  const latest = state.items.find((item) => {
    const age = now - Date.parse(item.publishedAt);
    return age <= 45 * 60 * 1000 && (item.category === "security" || item.official);
  });

  if (!latest) {
    el.breakingBanner.classList.add("hidden");
    return;
  }

  el.breakingTitle.textContent = cleanDisplayTitle(latest.title);
  el.breakingMeta.textContent = `${latest.sourceName} · ${formatAge(latest.publishedAt)}`;
  setOptionalLink(el.breakingLink, latest.sourceKind === "site" ? latest.url : null);
  el.breakingBanner.classList.remove("hidden");
}

function renderFlashDeck() {
  if (!el.flashDeck || !el.flashDeckItems) return;
  const seen = new Set();
  const items = state.items
    .filter((item) => item.sourceKind === "site" && item.url)
    .sort((a, b) => {
      const ai = MAINSTREAM_PUBLISHERS.indexOf(a.publisher);
      const bi = MAINSTREAM_PUBLISHERS.indexOf(b.publisher);
      const ar = ai === -1 ? 99 : ai;
      const br = bi === -1 ? 99 : bi;
      return ar - br || Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    })
    .filter((item) => {
      const key = item.publisher || item.sourceName;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);
  if (items.length < 2) {
    el.flashDeck.classList.add("hidden");
    return;
  }
  el.flashDeckItems.innerHTML = items.map((item) => `<a class="flash-item" href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">
    <span>${escapeHtml(item.sourceName)} · ${formatAge(item.publishedAt)}</span>
    <strong>${escapeHtml(cleanDisplayTitle(item.title))}</strong>
  </a>`).join("");
  el.flashDeck.classList.remove("hidden");
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
  if (el.autoRefreshPill) el.autoRefreshPill.querySelector("span").textContent = state.autoRefresh ? "60 שנ׳" : "כבוי";
  if (el.quickAutoStatus) el.quickAutoStatus.textContent = state.autoRefresh ? "פעיל · 60 שנ׳" : "כבוי";
  if (el.citySelect) el.citySelect.value = state.city;
  document.querySelectorAll("[data-quick-category]").forEach((button) => button.classList.toggle("active", button.dataset.quickCategory === state.category));
  document.querySelectorAll("[data-quick-kind]").forEach((button) => button.classList.toggle("active", button.dataset.quickKind === state.kind));
}

function syncTheme() {
  const isDark = document.documentElement.dataset.theme === "dark";
  el.themeToggle.setAttribute("aria-pressed", String(isDark));
  el.themeToggle.setAttribute("aria-label", isDark ? "מעבר למצב בהיר" : "מעבר למצב כהה");
  el.themeToggle.title = isDark ? "מעבר למצב בהיר" : "מעבר למצב כהה";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", isDark ? "#0b0d12" : "#f7f8fb");
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
  clearInterval(state.timer);
  clearInterval(state.countdownTimer);
  if (state.autoRefresh) {
    scheduleNextRefresh(60);
    state.timer = setInterval(() => loadNews(false), 60_000);
  } else {
    state.nextRefreshAt = 0;
    updateRefreshCountdown();
  }
  state.countdownTimer = setInterval(updateRefreshCountdown, 1000);
}

function scheduleNextRefresh(seconds = 60) {
  state.nextRefreshAt = Date.now() + Math.max(15, seconds) * 1000;
  updateRefreshCountdown();
}

function updateRefreshCountdown() {
  if (!el.refreshCountdown) return;
  if (!state.autoRefresh) {
    el.refreshCountdown.textContent = "רענון אוטומטי כבוי";
    return;
  }
  const seconds = Math.max(0, Math.ceil((state.nextRefreshAt - Date.now()) / 1000));
  el.refreshCountdown.textContent = seconds > 0 ? `רענון בעוד ${seconds} שנ׳` : "מרענן עכשיו…";
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
    if (Date.parse(item.publishedAt) < cutoff) continue;
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
