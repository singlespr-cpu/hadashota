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
  dataDelaySeverity: "ok",
  delayedShards: [],
  lastDataGeneratedAt: null,
  city: localStorage.getItem("hadashota.city") || "telaviv",
  lastVisitAt: Number((localStorage.getItem("hadashota.lastVisitAt") ?? localStorage.getItem("pulse.lastVisitAt"))) || 0,
  notificationsEnabled: localStorage.getItem("hadashota.headlineNotifications") === "1",
  currentLeadFingerprint: localStorage.getItem("hadashota.lastLeadFingerprint") || "",
  leadNotificationPrimed: localStorage.getItem("hadashota.lastLeadFingerprint") ? true : false,
  serviceWorkerRegistration: null,
  alertTimer: null,
  alertCities: readStoredAlertCities(),
  alertAllIsrael: localStorage.getItem("hadashota.alertAllIsrael") !== "0",
  alertSound: localStorage.getItem("hadashota.alertSound") === "1",
  alertDesktop: localStorage.getItem("hadashota.alertDesktop") === "1",
  lastAlertFingerprint: localStorage.getItem("hadashota.lastAlertFingerprint") || "",
  alertAudioUnlocked: false,
  alertAudioContext: null,
  alertWasActive: false,
  displayedLeadFingerprint: "",
  displayedLeadSince: 0,
  flashDeckExpanded: false,
  flashDeckPaused: false,
  flashDeckTimer: null
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
  notificationToggle: document.querySelector("#notificationToggle"),
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
  shabbatMobileIn: document.querySelector("#shabbatMobileIn"),
  shabbatMobileOut: document.querySelector("#shabbatMobileOut"),
  shabbatCity: document.querySelector("#shabbatCity"),
  shabbatParasha: document.querySelector("#shabbatParasha"),
  usdRate: document.querySelector("#usdRate"),
  eurRate: document.querySelector("#eurRate"),
  currencyMeta: document.querySelector("#currencyMeta"),
  currencyCredit: document.querySelector("#currencyCredit"),
  trendingStrip: document.querySelector("#trendingStrip"),
  trendingTopics: document.querySelector("#trendingTopics"),
  refreshCountdown: document.querySelector("#refreshCountdown"),
  flashDeck: document.querySelector("#flashDeck"),
  flashDeckItems: document.querySelector("#flashDeckItems"),
  flashDeckViewport: document.querySelector("#flashDeckViewport"),
  flashMoreButton: document.querySelector("#flashMoreButton"),
  locateBtn: document.querySelector("#locateBtn"),
  autoRefreshPill: document.querySelector("#autoRefreshPill"),
  quickMenu: document.querySelector("#quickMenu"),
  quickAutoRefresh: document.querySelector("#quickAutoRefresh"),
  quickAutoStatus: document.querySelector("#quickAutoStatus"),
  quickNotifications: document.querySelector("#quickNotifications"),
  quickNotificationsStatus: document.querySelector("#quickNotificationsStatus"),
  quickFilters: document.querySelector("#quickFilters"),
  quickReset: document.querySelector("#quickReset"),
  dataStatus: document.querySelector("#dataStatus"),
  dataStatusText: document.querySelector("#dataStatusText"),
  notificationsBtn: document.querySelector("#notificationsBtn"),
  aboutBtn: document.querySelector("#aboutBtn"),
  contactBtn: document.querySelector("#contactBtn"),
  aboutModal: document.querySelector("#aboutModal"),
  contactModal: document.querySelector("#contactModal"),
  backToTop: document.querySelector("#backToTop"),
  alertCenter: document.querySelector("#alertCenter"),
  alertCenterCard: document.querySelector("#alertCenterCard"),
  alertStateLabel: document.querySelector("#alertStateLabel"),
  alertLastCheck: document.querySelector("#alertLastCheck"),
  alertHeadline: document.querySelector("#alertHeadline"),
  alertAreas: document.querySelector("#alertAreas"),
  alertSoundQuick: document.querySelector("#alertSoundQuick"),
  alertSoundQuickLabel: document.querySelector("#alertSoundQuickLabel"),
  alertSettingsBtn: document.querySelector("#alertSettingsBtn"),
  alertSettingsModal: document.querySelector("#alertSettingsModal"),
  alertAllIsrael: document.querySelector("#alertAllIsrael"),
  alertCityPicker: document.querySelector("#alertCityPicker"),
  alertCityInput: document.querySelector("#alertCityInput"),
  alertAddCity: document.querySelector("#alertAddCity"),
  alertCityChips: document.querySelector("#alertCityChips"),
  alertCitiesSummary: document.querySelector("#alertCitiesSummary"),
  alertSoundToggle: document.querySelector("#alertSoundToggle"),
  alertDesktopToggle: document.querySelector("#alertDesktopToggle"),
  alertTestBtn: document.querySelector("#alertTestBtn"),
  alertConnectionState: document.querySelector("#alertConnectionState"),
  alertLiveRegion: document.querySelector("#alertLiveRegion")
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
  reconcileNotificationPermission();
  syncControlsFromState();
  bindEvents();
  registerServiceWorker();
  restoreLocalLastGood();
  loadUtilities();
  initAlertCenter();
  window.setInterval(() => { if (!document.hidden) loadUtilities(); }, 5 * 60 * 1000);
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

  el.refreshBtn.addEventListener("click", () => { loadNews(true); loadUtilities(); });
  el.backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  el.alertSettingsBtn?.addEventListener("click", () => openSiteModal(el.alertSettingsModal, el.alertSettingsBtn));
  el.alertSoundQuick?.addEventListener("click", () => setAlertSound(!state.alertSound, true));
  el.alertSoundToggle?.addEventListener("change", () => setAlertSound(el.alertSoundToggle.checked, true));
  el.alertDesktopToggle?.addEventListener("change", () => setAlertDesktop(el.alertDesktopToggle.checked));
  el.alertAllIsrael?.addEventListener("change", () => {
    state.alertAllIsrael = el.alertAllIsrael.checked;
    localStorage.setItem("hadashota.alertAllIsrael", state.alertAllIsrael ? "1" : "0");
    syncAlertSettings();
  });
  el.alertAddCity?.addEventListener("click", addAlertCityFromInput);
  el.alertCityInput?.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); addAlertCityFromInput(); } });
  el.alertCityChips?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-alert-city]");
    if (!button) return;
    state.alertCities = state.alertCities.filter((city) => city !== button.dataset.alertCity);
    localStorage.setItem("hadashota.alertCities", JSON.stringify(state.alertCities));
    syncAlertSettings();
  });
  el.alertTestBtn?.addEventListener("click", runAlertTest);
  window.addEventListener("scroll", () => {
    el.backToTop?.classList.toggle("visible", window.scrollY > 700);
  }, { passive: true });
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
  el.notificationToggle?.addEventListener("change", () => toggleHeadlineNotifications(el.notificationToggle.checked));

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

  el.flashMoreButton?.addEventListener("click", () => {
    state.flashDeckExpanded = !state.flashDeckExpanded;
    el.flashDeck.classList.toggle("flash-expanded", state.flashDeckExpanded);
    el.flashMoreButton.setAttribute("aria-expanded", state.flashDeckExpanded ? "true" : "false");
    el.flashMoreButton.innerHTML = state.flashDeckExpanded
      ? 'פחות אחרונים <span aria-hidden="true">↑</span>'
      : 'עוד אחרונים <span aria-hidden="true">↓</span>';
  });

  ["mouseenter", "focusin", "touchstart"].forEach((eventName) => {
    el.flashDeckViewport?.addEventListener(eventName, () => pauseFlashDeck());
  });
  ["mouseleave", "focusout"].forEach((eventName) => {
    el.flashDeckViewport?.addEventListener(eventName, () => resumeFlashDeckSoon());
  });

  el.resetFilters.addEventListener("click", resetFilters);
  el.filtersToggle.addEventListener("click", () => {
    const opening = el.quickMenu.classList.contains("hidden");
    el.quickMenu.classList.toggle("hidden");
    el.filtersToggle.setAttribute("aria-expanded", opening ? "true" : "false");
  });
  el.autoRefreshPill?.addEventListener("click", toggleAutoRefresh);
  el.quickAutoRefresh?.addEventListener("click", toggleAutoRefresh);
  el.notificationsBtn?.addEventListener("click", toggleHeadlineNotifications);
  el.quickNotifications?.addEventListener("click", toggleHeadlineNotifications);
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

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) loadUtilities();
    scheduleAlertPoll(250);
    if (state.autoRefresh) restartAutoRefresh();
    if (!document.hidden && state.dataDelayed) loadNews(false, true);
  });

  window.addEventListener("focus", () => {
    if (state.dataDelayed) loadNews(false, true);
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
    const delayedShards = [];

    results.forEach((result, index) => {
      const shard = NEWS_SHARDS[index];
      if (result.status === "fulfilled" && Array.isArray(result.value?.items) && result.value.items.length) {
        payloads.push(result.value);
        persistShardLastGood(shard, result.value);
        if (result.value.stale) {
          delayed = true;
          delayedShards.push({ shard, reason: result.value.staleReason || "stale", localFallback: !!result.value.localFallback });
        } else {
          freshShards += 1;
        }
        return;
      }

      const cached = readShardLastGood(shard);
      if (cached?.items?.length) {
        payloads.push({ ...cached, stale: true, localFallback: true });
        delayedShards.push({ shard, reason: "local_fallback", localFallback: true });
        delayed = true;
      } else {
        delayedShards.push({ shard, reason: "unavailable", localFallback: false });
        delayed = true;
      }
    });

    if (!payloads.length) throw new Error("No news shard returned usable data");

    const data = mergeNewsPayloads(payloads);
    if (!data.items.length) throw new Error("Merged news feed is empty");

    state.items = data.items;
    state.sources = data.sources;
    state.lastDataGeneratedAt = data.generatedAt || state.lastDataGeneratedAt;
    state.dataDelayed = delayed || freshShards < NEWS_SHARDS.length;
    state.delayedShards = delayedShards;
    state.dataDelaySeverity = getDataDelaySeverity({ delayed: state.dataDelayed, freshShards, delayedShards, generatedAt: data.generatedAt });

    if (!state.dataDelayed) {
      el.lastUpdated.textContent = `עודכן ${formatClock(data.generatedAt)}`;
    } else if (state.dataDelaySeverity === "minor") {
      el.lastUpdated.textContent = `עדכון חלקי · ${formatClock(data.generatedAt)} · ${formatDelayedShardShort(delayedShards)}`;
    } else {
      el.lastUpdated.textContent = `נתונים אחרונים · ${formatClock(data.generatedAt)}`;
    }

    renderStats(data);
    render();
    setDataStatus(state.dataDelayed, true, state.dataDelaySeverity);

    if (state.autoRefresh) scheduleNextRefresh(Math.max(Number(data.refreshAfterSeconds) || 30, getRefreshInterval()));
    else updateRefreshCountdown();

    if (!state.dataDelayed) {
      state.retryAttempt = 0;
      clearTimeout(state.retryTimer);
      localStorage.setItem("hadashota.lastVisitAt", String(Date.now()));
      if (force && !fromRetry) showToast("החדשות רועננו עכשיו");
    } else {
      scheduleNewsRetry();
      if (force && state.dataDelaySeverity === "major") showToast("העדכון חלקי — מוצגים הנתונים האחרונים התקינים");
      else if (force) showToast("מקור חדשות אחד מתעדכן ברקע");
    }
  } catch (error) {
    console.error(error);
    state.dataDelayed = true;
    state.dataDelaySeverity = "major";
    state.delayedShards = NEWS_SHARDS.map((shard) => ({ shard, reason: "request_failed", localFallback: true }));
    const restored = state.items.length > 0 || restoreLocalLastGood();
    setDataStatus(true, restored, "major");
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
    params.set("_", String(Math.floor(Date.now() / 15000)));
    const response = await fetch(`/api/news?${params}`, {
      headers: { Accept: "application/json", "Cache-Control": "no-cache" },
      signal: controller.signal,
      cache: "no-store"
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
  state.lastDataGeneratedAt = data.generatedAt || state.lastDataGeneratedAt;
  state.dataDelayed = true;
  state.dataDelaySeverity = "major";
  state.delayedShards = NEWS_SHARDS.map((shard) => ({ shard, reason: "local_fallback", localFallback: true }));
  el.lastUpdated.textContent = `מוצגים נתונים שמורים · ${formatClock(data.generatedAt)}`;
  renderStats(data);
  render();
  setDataStatus(true, true, "major");
  return true;
}

function scheduleNewsRetry() {
  clearTimeout(state.retryTimer);
  const delays = [4, 8, 15, 25];
  const seconds = delays[Math.min(state.retryAttempt, delays.length - 1)];
  state.retryAttempt += 1;
  state.retryTimer = setTimeout(() => loadNews(true, true), seconds * 1000);
}

function getDataDelaySeverity({ delayed, freshShards, delayedShards, generatedAt }) {
  if (!delayed) return "ok";
  if (freshShards <= 0 || delayedShards.length >= NEWS_SHARDS.length) return "major";

  const generatedMs = Date.parse(generatedAt || "");
  const ageSeconds = Number.isFinite(generatedMs) ? Math.max(0, (Date.now() - generatedMs) / 1000) : 999;
  const hasHardFailure = delayedShards.some((entry) => entry.reason === "unavailable" || entry.reason === "request_failed");
  if (hasHardFailure || ageSeconds > 180) return "major";
  return "minor";
}

function formatDelayedShardShort(entries = state.delayedShards) {
  const names = [...new Set(entries.map((entry) => entry.shard === "telegram" ? "Telegram מתעדכן" : "אתרי חדשות מתעדכנים"))];
  return names.join(" + ") || "מקור מתעדכן";
}

function setDataStatus(delayed, hasData = state.items.length > 0, severity = state.dataDelaySeverity) {
  if (!el.dataStatus || !el.dataStatusText) return;

  // A single fresh-vs-stale shard is retried in the background, but does not deserve
  // a large warning banner. The compact status remains visible in the header timestamp.
  const showBanner = delayed && (severity === "major" || !hasData);
  el.dataStatus.classList.toggle("hidden", !showBanner);
  el.dataStatus.classList.toggle("is-major", showBanner && severity === "major");
  if (!showBanner) return;

  if (!hasData) {
    el.dataStatusText.textContent = "מתחבר למקורות החדשות — מתבצע ניסיון נוסף אוטומטית";
    return;
  }

  const clock = state.lastDataGeneratedAt ? formatClock(state.lastDataGeneratedAt) : "";
  const delayedPart = formatDelayedShardShort();
  el.dataStatusText.textContent = clock
    ? `העדכון חלקי — ${delayedPart}. מוצגים הנתונים האחרונים התקינים מ־${clock}, והמערכת מנסה שוב אוטומטית.`
    : `העדכון חלקי — ${delayedPart}. מוצגים הנתונים האחרונים התקינים והמערכת מנסה שוב אוטומטית.`;
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
    refreshAfterSeconds: Math.min(...payloads.map((payload) => Number(payload.refreshAfterSeconds) || 30), 30),
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
    imageUrl: item.imageUrl || null,
    title: item.title || ""
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
  const safeTitle = cleanDisplayTitle(item.title);
  const safePreviewText = item.preview && item.preview !== item.title ? cleanDisplayText(item.preview) : "";
  const preview = safePreviewText ? `<p class="news-preview">${escapeHtml(safePreviewText)}</p>` : "";
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
  const titleHtml = `<a href="${storyUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(safeTitle)}</a>`;
  const relatedHtml = related.length ? `
    <details class="related-wrap">
      <summary>עוד דיווחים (${related.length})</summary>
      <div class="related-list">
        ${related.map((r) => `<a class="related-link" href="${safeUrl(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.sourceName)} · ${formatAge(r.publishedAt)}</a>`).join("")}
      </div>
    </details>` : "";

  return `
    <article class="news-card clickable-story ${state.compact ? "compact" : ""} ${item.imageUrl ? "has-image" : ""} ${isSite ? "site-story" : "telegram-story"}" data-category="${category}" data-story-url="${storyUrl}" role="link" tabindex="0" aria-label="פתיחת המקור: ${escapeHtml(safeTitle)}">
      <div class="news-main">
        ${imageHtml}
        <div class="news-copy">
          <div class="news-meta">
            <span class="source-name">${escapeHtml(cleanDisplayText(item.sourceName))}</span>
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
      <span class="source-info"><b>${escapeHtml(cleanDisplayText(source.name))}</b><small>${type} · ${formatAge(source.lastItemAt)}</small></span>
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
  const corroborationWindowMs = 45 * 60 * 1000;
  const candidates = state.items
    .map((item) => {
      const latestAt = clusterLatestAt(item);
      const latestMs = Date.parse(latestAt);
      const ageMinutes = Math.max(0, (now - latestMs) / 60_000);
      const reports = normalizeClusterReports(item);
      // The lead story must be corroborated by distinct sources reporting roughly
      // the same event in the same time window, not by old reports accumulated for hours.
      const recentReports = reports.filter((report) => {
        const reportMs = Date.parse(report.publishedAt || 0);
        if (!Number.isFinite(reportMs) || !Number.isFinite(latestMs)) return false;
        const delta = latestMs - reportMs;
        return delta >= -5 * 60 * 1000 && delta <= corroborationWindowMs;
      });
      const uniqueSources = recentReports.length;
      const hasOfficial = recentReports.some((report) => report.official);
      const hasVerified = recentReports.some((report) => report.verified);
      const reportTimes = recentReports.map((report) => Date.parse(report.publishedAt || 0)).filter(Number.isFinite);
      const spreadMinutes = reportTimes.length > 1 ? Math.max(0, Math.round((Math.max(...reportTimes) - Math.min(...reportTimes)) / 60_000)) : 0;

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
      const velocity = spreadMinutes <= 10 && uniqueSources >= 4 ? 1.2 : spreadMinutes <= 20 && uniqueSources >= 3 ? 0.55 : 0;
      const oldPenalty = ageMinutes > 75 ? (ageMinutes - 75) / 11 : 0;
      const score = freshness + sourceScore + authority + activity + velocity - oldPenalty;
      return { item, reports, recentReports, uniqueSources, ageMinutes, latestAt, score, hasOfficial, spreadMinutes };
    })
    // A lead story always requires at least 3 distinct corroborating sources.
    .filter((entry) => entry.ageMinutes <= 150 && entry.uniqueSources >= 3)
    .sort((a, b) => b.score - a.score || Date.parse(b.latestAt) - Date.parse(a.latestAt));

  let winner = candidates[0];
  if (!winner) {
    state.displayedLeadFingerprint = "";
    state.displayedLeadSince = 0;
    el.leadStory.classList.add("hidden");
    return;
  }

  // Prevent headline ping-pong: keep the visible lead while it remains competitive.
  // A challenger replaces it when materially stronger, when the current lead is aging,
  // or when a very fresh officially corroborated story breaks through.
  if (state.displayedLeadFingerprint) {
    const current = candidates.find((entry) => leadFingerprint(entry) === state.displayedLeadFingerprint);
    const challengerKey = leadFingerprint(winner);
    if (current && challengerKey !== state.displayedLeadFingerprint) {
      const absoluteAdvantage = winner.score - current.score;
      const relativeAdvantage = current.score > 0 ? winner.score / current.score : Infinity;
      const urgentBreakthrough = winner.hasOfficial && winner.uniqueSources >= 4 && winner.ageMinutes <= 15;
      const currentAging = current.ageMinutes > 70;
      const currentYoung = Date.now() - Number(state.displayedLeadSince || 0) < 3 * 60 * 1000;
      const clearlyStronger = absoluteAdvantage >= 2.1 || relativeAdvantage >= 1.14;
      if (!urgentBreakthrough && !currentAging && (!clearlyStronger || currentYoung)) winner = current;
    }
  }

  const winnerFingerprint = leadFingerprint(winner);
  if (winnerFingerprint !== state.displayedLeadFingerprint) {
    state.displayedLeadFingerprint = winnerFingerprint;
    state.displayedLeadSince = Date.now();
  }

  const item = winner.item;
  const sources = winner.recentReports;
  const sourceTarget = sources.find((source) => source.sourceKind === "site" && source.url)
    || sources.find((source) => source.url)
    || (item.url ? item : null);
  const unique = sources.slice(0, 5);

  const leadTitle = cleanDisplayTitle(item.title);
  el.leadStoryTitle.textContent = leadTitle;
  el.leadStory.dataset.titleSize = leadTitle.length > 120 ? "long" : leadTitle.length > 78 ? "medium" : "normal";
  el.leadStoryPreview.textContent = item.preview && item.preview !== item.title ? cleanDisplayText(item.preview) : "הידיעה מתקדמת במהירות ומופיעה בכמה מקורות בזמן קצר.";
  el.leadStorySource.textContent = sourceTarget?.sourceName || item.sourceName;
  el.leadStoryAge.textContent = formatAge(winner.latestAt);
  el.leadStoryCount.textContent = `${winner.uniqueSources} מקורות מדווחים`;
  const spreadLabel = winner.spreadMinutes <= 1 ? "כמעט במקביל" : `תוך ${winner.spreadMinutes} דק׳`;
  el.leadStorySignal.textContent = `${winner.uniqueSources} מקורות · ${spreadLabel}${winner.hasOfficial ? " · כולל רשמי" : ""}`;
  el.leadStorySignal.title = "הסיפור נבחר לפי מספר מקורות שונים, טריות וקצב הופעת הדיווחים";

  setOptionalLink(el.leadStoryLink, sourceTarget?.url);
  const leadHref = safeHttpHref(sourceTarget?.url);
  if (leadHref) {
    el.leadStoryCta.href = leadHref;
    el.leadStoryCta.classList.remove("hidden");
  } else {
    el.leadStoryCta.removeAttribute("href");
    el.leadStoryCta.classList.add("hidden");
  }
  if (item.imageUrl) {
    el.leadStoryImage.src = item.imageUrl;
    el.leadStoryImage.alt = leadTitle;
    setOptionalLink(el.leadStoryMedia, leadHref);
    el.leadStoryMedia.classList.remove("hidden");
    el.leadStory.classList.add("has-media");
    el.leadStoryImage.onerror = () => {
      el.leadStoryMedia.classList.add("hidden");
      el.leadStory.classList.remove("has-media");
    };
  } else {
    el.leadStoryImage.removeAttribute("src");
    el.leadStoryMedia.classList.add("hidden");
    el.leadStory.classList.remove("has-media");
  }
  el.leadStorySources.innerHTML = unique.map((source) => source.url
    ? `<a href="${safeUrl(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(cleanDisplayText(source.sourceName))}</a>`
    : `<span>${escapeHtml(cleanDisplayText(source.sourceName))}</span>`).join("");
  el.leadStory.classList.remove("hidden");
  updateLeadHeadlineTracking(winner);
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
  el.breakingMeta.textContent = `${cleanDisplayText(latest.sourceName)} · ${formatAge(latest.latestReportAt || latest.publishedAt)}`;
  setOptionalLink(el.breakingLink, latest.url);
  el.breakingBanner.classList.remove("hidden");
}

function renderFlashDeck() {
  if (!el.flashDeck || !el.flashDeckItems) return;
  const cutoff = Date.now() - 6 * 60 * 60 * 1000;
  const preferred = state.items
    .filter((item) => item.sourceKind === "site" && item.url && Date.parse(item.latestReportAt || item.publishedAt) >= cutoff)
    .sort((a, b) => Date.parse(b.latestReportAt || b.publishedAt) - Date.parse(a.latestReportAt || a.publishedAt))
    .slice(0, 20);

  clearFlashDeckTimer();

  if (preferred.length < 2) {
    el.flashDeck.classList.add("hidden");
    return;
  }

  el.flashDeckItems.innerHTML = preferred.map((item, index) => `<a class="flash-item" data-flash-index="${index}" href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">
    <span>${escapeHtml(cleanDisplayText(item.sourceName))} · ${formatAge(item.latestReportAt || item.publishedAt)}</span>
    <strong>${escapeHtml(cleanDisplayTitle(item.title))}</strong>
  </a>`).join("");

  el.flashDeck.classList.remove("hidden");
  el.flashDeck.classList.toggle("flash-expanded", state.flashDeckExpanded);
  if (el.flashMoreButton) {
    el.flashMoreButton.classList.toggle("hidden", preferred.length <= 5);
    el.flashMoreButton.setAttribute("aria-expanded", state.flashDeckExpanded ? "true" : "false");
    el.flashMoreButton.innerHTML = state.flashDeckExpanded
      ? 'פחות אחרונים <span aria-hidden="true">↑</span>'
      : 'עוד אחרונים <span aria-hidden="true">↓</span>';
  }

  if (el.flashDeckViewport) el.flashDeckViewport.scrollTop = 0;
  startFlashDeckAutoscroll();
}

function clearFlashDeckTimer() {
  if (state.flashDeckTimer) clearTimeout(state.flashDeckTimer);
  state.flashDeckTimer = null;
}

function pauseFlashDeck() {
  state.flashDeckPaused = true;
  clearFlashDeckTimer();
}

function resumeFlashDeckSoon() {
  state.flashDeckPaused = false;
  clearFlashDeckTimer();
  state.flashDeckTimer = setTimeout(startFlashDeckAutoscroll, 2200);
}

function startFlashDeckAutoscroll() {
  clearFlashDeckTimer();
  if (!el.flashDeckViewport || !el.flashDeckItems || state.flashDeckPaused) return;
  if (window.matchMedia("(max-width: 700px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const items = [...el.flashDeckItems.querySelectorAll(".flash-item")];
  if (items.length <= 5) return;

  const tick = () => {
    if (state.flashDeckPaused || document.hidden || window.matchMedia("(max-width: 700px)").matches) {
      state.flashDeckTimer = setTimeout(tick, 4500);
      return;
    }
    const viewport = el.flashDeckViewport;
    const first = items[0];
    const step = first ? first.getBoundingClientRect().height : 58;
    const maxScroll = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    const next = viewport.scrollTop + step;
    if (next >= maxScroll - 2) {
      viewport.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      viewport.scrollTo({ top: next, behavior: "smooth" });
    }
    state.flashDeckTimer = setTimeout(tick, 4800);
  };

  state.flashDeckTimer = setTimeout(tick, 4800);
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

function safeHttpHref(value) {
  if (!value) return "";
  try {
    const url = new URL(value, window.location.href);
    return /^https?:$/.test(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function setOptionalLink(anchor, url) {
  if (!anchor) return;
  const href = safeHttpHref(url);
  if (href) {
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.classList.remove("no-link");
    anchor.removeAttribute("aria-disabled");
  } else {
    anchor.removeAttribute("href");
    anchor.removeAttribute("target");
    anchor.removeAttribute("rel");
    anchor.classList.add("no-link");
    anchor.setAttribute("aria-disabled", "true");
  }
}

function decodeHtmlEntities(text = "") {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = String(text ?? "");
  return textarea.value;
}

function stripTags(text = "") {
  return String(text ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?p\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
}

function stripUrls(text = "") {
  return String(text).replace(/https?:\/\/\S+/gi, "").replace(/(?:www\.)\S+/gi, "").replace(/\s{2,}/g, " ").trim();
}

function stripMarkupArtifacts(text = "") {
  return String(text ?? "")
    .replace(/\bimg\s+[^<>]{0,700}?(?:\/?>|(?=\s{2,}|$))/gi, " ")
    .replace(/\b(?:height|width|align|src|class|style|alt|loading)\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, " ")
    .replace(/(?:<|&lt;)?\/?br\s*\/?(?:>|&gt;)?/gi, " ")
    .replace(/(?:<|&lt;)?\/?(?:p|div|span)\s*(?:>|&gt;)?/gi, " ");
}

function cleanDisplayText(text = "") {
  return stripUrls(stripMarkupArtifacts(stripTags(decodeHtmlEntities(decodeHtmlEntities(String(text ?? ""))))))
    .replace(/(?:<<<|>>>|➡️|👉|👇)+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanDisplayTitle(text = "") {
  return cleanDisplayText(text);
}

function getRefreshInterval() {
  return document.hidden ? 60 : 30;
}


function reconcileNotificationPermission() {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    state.notificationsEnabled = false;
    localStorage.setItem("hadashota.headlineNotifications", "0");
  }
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    state.serviceWorkerRegistration = await navigator.serviceWorker.register("/sw.js");
  } catch (error) {
    console.warn("Service worker registration failed", error);
  }
}

async function toggleHeadlineNotifications(desiredState = !state.notificationsEnabled) {
  const enabled = Boolean(desiredState);
  if (!enabled) {
    state.notificationsEnabled = false;
    localStorage.setItem("hadashota.headlineNotifications", "0");
    syncControlsFromState();
    showToast("התראות דפדפן כבויות");
    return;
  }

  if (!("Notification" in window)) {
    showToast("הדפדפן לא תומך בהתראות");
    return;
  }

  let permission = Notification.permission;
  if (permission === "default") permission = await Notification.requestPermission();
  if (permission !== "granted") {
    state.notificationsEnabled = false;
    localStorage.setItem("hadashota.headlineNotifications", "0");
    syncControlsFromState();
    showToast("לא ניתנה הרשאה להתראות");
    return;
  }

  state.notificationsEnabled = true;
  state.leadNotificationPrimed = true;
  localStorage.setItem("hadashota.headlineNotifications", "1");
  syncControlsFromState();
  showToast("התראות הופעלו — תישלח התראה כשהכותרת הראשית תתחלף");
}

function leadFingerprint(entry) {
  if (!entry?.item) return "";
  const item = entry.item;
  const reports = normalizeClusterReports(item);
  const titles = [item.title, ...reports.map((report) => report.title)].filter(Boolean);
  const tokenSets = titles.map((title) => clientTitleTokens(cleanDisplayTitle(title))).filter((set) => set.size);
  const tokenFrequency = new Map();

  for (const tokens of tokenSets) {
    for (const token of tokens) tokenFrequency.set(token, (tokenFrequency.get(token) || 0) + 1);
  }

  const threshold = Math.max(1, Math.ceil(tokenSets.length * 0.45));
  const commonTokens = [...tokenFrequency.entries()]
    .filter(([, count]) => count >= threshold)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "he"))
    .slice(0, 7)
    .map(([token]) => token);

  const fallbackTokens = [...clientTitleTokens(cleanDisplayTitle(item.title))].slice(0, 7);
  const identityTokens = commonTokens.length >= 2 ? commonTokens : fallbackTokens;
  const firstAt = Date.parse(clusterFirstAt(item));
  const timeBucket = Number.isFinite(firstAt) ? Math.floor(firstAt / (20 * 60 * 1000)) : 0;
  return [item.category || "other", timeBucket, ...identityTokens].join("|").toLowerCase();
}

async function notifyHeadlineChange(entry) {
  if (!state.notificationsEnabled || !("Notification" in window) || Notification.permission !== "granted") return;
  const item = entry.item;
  const title = cleanDisplayTitle(item.title);
  const reports = normalizeClusterReports(item);
  const hasOfficial = !!item.official || reports.some((report) => report.official);
  const body = `${entry.uniqueSources} מקורות מדווחים${hasOfficial ? " · כולל מקור רשמי" : ""} · ${formatAge(entry.latestAt)}`;
  const options = {
    body,
    tag: `hadashota-headline-${leadFingerprint(entry)}`,
    renotify: true,
    data: { url: safeHttpHref(item.url) || "/" },
    icon: "/favicon-32.png",
    badge: "/favicon-32.png"
  };

  try {
    if (state.serviceWorkerRegistration?.showNotification) {
      await state.serviceWorkerRegistration.showNotification(title, options);
    } else {
      const notification = new Notification(title, options);
      notification.onclick = () => openStorySource(item.url);
    }
  } catch (error) {
    console.warn("Notification failed", error);
  }
}

function updateLeadHeadlineTracking(entry) {
  const fingerprint = leadFingerprint(entry);
  if (!fingerprint) return;
  const previous = state.currentLeadFingerprint;
  state.currentLeadFingerprint = fingerprint;
  localStorage.setItem("hadashota.lastLeadFingerprint", fingerprint);

  if (!state.leadNotificationPrimed) {
    state.leadNotificationPrimed = true;
    return;
  }

  if (previous && previous !== fingerprint && !state.dataDelayed) notifyHeadlineChange(entry);
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
  const refreshInterval = getRefreshInterval();
  el.autoRefresh.checked = state.autoRefresh;
  el.autoRefreshPill?.classList.toggle("active", state.autoRefresh);
  if (el.autoRefreshPill) {
    el.autoRefreshPill.querySelector("span").textContent = state.autoRefresh ? "רענון אוטומטי" : "רענון כבוי";
    el.autoRefreshPill.title = state.autoRefresh ? `רענון חכם — כל ${refreshInterval} שניות` : "רענון אוטומטי כבוי";
  }
  if (el.quickAutoStatus) el.quickAutoStatus.textContent = state.autoRefresh ? `פעיל — כל ${refreshInterval} שנ׳` : "רענון כבוי";
  if (el.notificationsBtn) {
    el.notificationsBtn.classList.toggle("active", state.notificationsEnabled);
    el.notificationsBtn.setAttribute("aria-pressed", state.notificationsEnabled ? "true" : "false");
    el.notificationsBtn.querySelector("span").textContent = state.notificationsEnabled ? "התראות פועלות" : "התראות";
    el.notificationsBtn.title = state.notificationsEnabled ? "התראות דפדפן פעילות" : "הפעלת התראות דפדפן";
  }
  if (el.quickNotificationsStatus) el.quickNotificationsStatus.textContent = state.notificationsEnabled ? "פעיל" : "כבוי";
  if (el.quickNotifications) el.quickNotifications.classList.toggle("active", state.notificationsEnabled);
  if (el.notificationToggle) el.notificationToggle.checked = state.notificationsEnabled;
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
    scheduleNextRefresh(getRefreshInterval());
  } else {
    state.nextRefreshAt = 0;
    updateRefreshCountdown();
  }
  state.countdownTimer = setInterval(updateRefreshCountdown, 1000);
}

function scheduleNextRefresh(seconds = getRefreshInterval()) {
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
    const response = await fetch(`/api/utilities?city=${encodeURIComponent(state.city)}&t=${Date.now()}`, {
      cache: "no-store",
      headers: { Accept: "application/json", "Cache-Control": "no-cache" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    renderUtilities(data);
  } catch (error) {
    console.error("Utilities:", error);
    if (el.weatherText) el.weatherText.textContent = "לא זמין כרגע";
    if (el.weatherRange) el.weatherRange.textContent = "נסה שוב מאוחר יותר";
    if (el.shabbatIn) el.shabbatIn.textContent = "—";
    if (el.shabbatOut) el.shabbatOut.textContent = "—";
    if (el.shabbatMobileIn) el.shabbatMobileIn.textContent = "—";
    if (el.shabbatMobileOut) el.shabbatMobileOut.textContent = "—";
    if (el.usdRate) el.usdRate.textContent = "—";
    if (el.eurRate) el.eurRate.textContent = "—";
    const restored = restoreLastGoodCurrency();
    if (!restored) {
      if (el.currencyMeta) el.currencyMeta.textContent = "לא זמין כרגע";
      if (el.currencyCredit) {
        el.currencyCredit.textContent = "שערי שוק: לא זמין כרגע";
        el.currencyCredit.href = "https://finance.yahoo.com/markets/currencies/";
      }
    }
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
    const candleLighting = formatUtilityTime(shabbat.candleLighting);
    const havdalah = formatUtilityTime(shabbat.havdalah);
    if (el.shabbatIn) el.shabbatIn.textContent = candleLighting;
    if (el.shabbatOut) el.shabbatOut.textContent = havdalah;
    if (el.shabbatMobileIn) el.shabbatMobileIn.textContent = candleLighting;
    if (el.shabbatMobileOut) el.shabbatMobileOut.textContent = havdalah;
    if (el.shabbatParasha) el.shabbatParasha.textContent = shabbat.parasha ? `· ${shabbat.parasha}` : "";
  }

  const exchangeRates = data?.exchangeRates;
  if (exchangeRates) {
    if (el.usdRate) el.usdRate.textContent = formatExchangeRate(exchangeRates.USD);
    if (el.eurRate) el.eurRate.textContent = formatExchangeRate(exchangeRates.EUR);
    renderCurrencySource(exchangeRates);
    persistLastGoodCurrency(exchangeRates);
  }
}


function renderCurrencySource(exchangeRates, cached = false) {
  if (!exchangeRates) return;
  const source = String(exchangeRates.source || "");
  if (el.currencyMeta) {
    if (exchangeRates.live) {
      const time = formatExchangeRateTime(exchangeRates.date);
      el.currencyMeta.textContent = time ? `שוק עולמי · ${time}` : "שוק עולמי · אונליין";
    } else if (source === "Frankfurter") {
      const date = formatExchangeRateDate(exchangeRates.date);
      el.currencyMeta.textContent = `${cached ? "נתון אחרון · " : "שער גלובלי יומי · "}${date || "עדכני"}`;
    } else {
      const date = formatExchangeRateDate(exchangeRates.date);
      el.currencyMeta.textContent = `${cached ? "נתון אחרון · " : "בנק ישראל · "}${date || "גיבוי"}`;
    }
  }
  if (el.currencyCredit) {
    if (exchangeRates.live) {
      el.currencyCredit.textContent = "שערי שוק: Yahoo Finance";
      el.currencyCredit.href = "https://finance.yahoo.com/markets/currencies/";
    } else if (source === "Frankfurter") {
      el.currencyCredit.textContent = "שערי מטבע: Frankfurter";
      el.currencyCredit.href = "https://frankfurter.dev/";
    } else {
      el.currencyCredit.textContent = "שערים יציגים: בנק ישראל";
      el.currencyCredit.href = "https://www.boi.org.il/roles/markets/exchangerates/";
    }
  }
}

function persistLastGoodCurrency(exchangeRates) {
  if (!exchangeRates) return;
  const USD = Number(exchangeRates.USD);
  const EUR = Number(exchangeRates.EUR);
  if (!Number.isFinite(USD) || !Number.isFinite(EUR)) return;
  try {
    localStorage.setItem("hadashota.lastGoodCurrency.v1", JSON.stringify({ ...exchangeRates, USD, EUR, savedAt: Date.now() }));
  } catch {}
}

function restoreLastGoodCurrency() {
  try {
    const cached = JSON.parse(localStorage.getItem("hadashota.lastGoodCurrency.v1") || "null");
    if (!cached || !Number.isFinite(Number(cached.USD)) || !Number.isFinite(Number(cached.EUR))) return false;
    if (Date.now() - Number(cached.savedAt || 0) > 7 * 24 * 60 * 60 * 1000) return false;
    if (el.usdRate) el.usdRate.textContent = formatExchangeRate(cached.USD);
    if (el.eurRate) el.eurRate.textContent = formatExchangeRate(cached.EUR);
    renderCurrencySource(cached, true);
    return true;
  } catch {
    return false;
  }
}

function formatExchangeRate(value) {
  const rate = Number(value);
  return Number.isFinite(rate) ? `₪${rate.toFixed(4)}` : "—";
}

function formatExchangeRateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("he-IL", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jerusalem" }).format(date);
}

function formatExchangeRateDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const match = String(value).match(/(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[3]}/${match[2]}` : "";
  }
  return new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit" }).format(date);
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


// ===== V20 real-time emergency alert center =====
function readStoredAlertCities() {
  try {
    const value = JSON.parse(localStorage.getItem("hadashota.alertCities") || "[]");
    return Array.isArray(value) ? value.map((city) => String(city || "").trim()).filter(Boolean).slice(0, 30) : [];
  } catch { return []; }
}

function initAlertCenter() {
  syncAlertSettings();
  scheduleAlertPoll(100);
}

function syncAlertSettings() {
  if (el.alertAllIsrael) el.alertAllIsrael.checked = state.alertAllIsrael;
  if (el.alertCityPicker) el.alertCityPicker.classList.toggle("disabled", state.alertAllIsrael);
  if (el.alertSoundToggle) el.alertSoundToggle.checked = state.alertSound;
  if (el.alertDesktopToggle) el.alertDesktopToggle.checked = state.alertDesktop;
  if (el.alertSoundQuick) {
    el.alertSoundQuick.setAttribute("aria-pressed", state.alertSound ? "true" : "false");
    el.alertSoundQuickLabel.textContent = state.alertSound ? "צליל פעיל" : "צליל כבוי";
  }
  if (el.alertCitiesSummary) el.alertCitiesSummary.textContent = state.alertAllIsrael ? "כל הארץ" : (state.alertCities.length ? state.alertCities.join(", ") : "לא נבחרו יישובים");
  if (el.alertCityChips) {
    el.alertCityChips.innerHTML = state.alertCities.map((city) => `<span class="alert-city-chip">${escapeHtml(city)}<button type="button" data-alert-city="${escapeHtml(city)}" aria-label="הסר ${escapeHtml(city)}">×</button></span>`).join("");
  }
}

function addAlertCityFromInput() {
  const city = String(el.alertCityInput?.value || "").trim().replace(/\s+/g, " ");
  if (!city) return;
  if (!state.alertCities.some((value) => value.localeCompare(city, "he", { sensitivity: "base" }) === 0)) state.alertCities.push(city);
  state.alertAllIsrael = false;
  localStorage.setItem("hadashota.alertCities", JSON.stringify(state.alertCities));
  localStorage.setItem("hadashota.alertAllIsrael", "0");
  if (el.alertCityInput) el.alertCityInput.value = "";
  syncAlertSettings();
}

async function setAlertSound(enabled, userGesture = false) {
  state.alertSound = !!enabled;
  localStorage.setItem("hadashota.alertSound", state.alertSound ? "1" : "0");
  syncAlertSettings();
  if (state.alertSound && userGesture) {
    state.alertAudioUnlocked = true;
    playAlertTone(true);
  }
}

async function setAlertDesktop(enabled) {
  if (!enabled) {
    state.alertDesktop = false;
  } else if (!("Notification" in window)) {
    state.alertDesktop = false;
    showToast("הדפדפן הזה לא תומך בהתראות מערכת");
  } else {
    let permission = Notification.permission;
    if (permission === "default") permission = await Notification.requestPermission();
    state.alertDesktop = permission === "granted";
    if (!state.alertDesktop) showToast("לא ניתנה הרשאה להתראות דפדפן");
  }
  localStorage.setItem("hadashota.alertDesktop", state.alertDesktop ? "1" : "0");
  syncAlertSettings();
}

function scheduleAlertPoll(delay) {
  clearTimeout(state.alertTimer);
  state.alertTimer = setTimeout(pollEmergencyAlerts, Number.isFinite(delay) ? delay : (document.hidden ? 5000 : 2000));
}

async function pollEmergencyAlerts() {
  try {
    const response = await fetch(`/api/alerts?t=${Date.now()}`, { cache:"no-store", headers:{ Accept:"application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    if (el.alertConnectionState) el.alertConnectionState.textContent = payload.source ? `מקור: ${payload.source}` : "מקור: פיקוד העורף";
    renderEmergencyAlerts(Array.isArray(payload.alerts) ? payload.alerts : [], payload);
  } catch (error) {
    console.warn("Emergency alerts:", error);
    renderAlertConnectionError();
  } finally {
    scheduleAlertPoll(document.hidden ? 5000 : 2000);
  }
}

function normalizeAlertSearch(value) {
  return String(value || "").normalize("NFKD").replace(/[־–—-]/g," ").replace(/[״׳'\"]/g,"").replace(/\s+/g," ").trim().toLowerCase();
}

function alertMatchesPreferences(alert) {
  if (state.alertAllIsrael) return true;
  if (!state.alertCities.length) return false;
  const areas = Array.isArray(alert.areas) ? alert.areas : [];
  return areas.some((area) => {
    const normalizedArea = normalizeAlertSearch(area);
    return state.alertCities.some((city) => {
      const normalizedCity = normalizeAlertSearch(city);
      return normalizedArea === normalizedCity
        || normalizedArea.startsWith(`${normalizedCity} `)
        || normalizedCity.startsWith(`${normalizedArea} `);
    });
  });
}

function renderEmergencyAlerts(alerts, payload = {}) {
  const matching = alerts.filter(alertMatchesPreferences);
  const nowLabel = new Intl.DateTimeFormat("he-IL", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false }).format(new Date());
  if (el.alertLastCheck) el.alertLastCheck.textContent = `נבדק ${nowLabel}`;
  if (!matching.length) {
    if (state.alertWasActive && el.alertLiveRegion) el.alertLiveRegion.textContent = "ההתרעה הפעילה הסתיימה באתר חדשותא. יש להמשיך לפעול לפי הנחיות פיקוד העורף.";
    state.alertWasActive = false;
    el.alertCenterCard?.classList.remove("alert-active");
    el.alertCenterCard?.classList.add("alert-idle");
    el.alertCenter?.classList.remove("has-active-alert");
    if (el.alertStateLabel) el.alertStateLabel.textContent = "התרעות פיקוד העורף";
    if (el.alertHeadline) el.alertHeadline.textContent = state.alertAllIsrael ? "אין התרעות פעילות כרגע" : (state.alertCities.length ? `אין התרעות פעילות ב${state.alertCities.join(", ")}` : "בחר יישובים לקבלת התרעות");
    if (el.alertAreas) { el.alertAreas.classList.add("hidden"); el.alertAreas.innerHTML = ""; }
    return;
  }

  const primary = matching[0];
  const allAreas = [...new Set(matching.flatMap((item) => item.areas || []))];
  const title = primary.title || "התרעה פעילה";
  el.alertCenterCard?.classList.add("alert-active");
  el.alertCenterCard?.classList.remove("alert-idle");
  el.alertCenter?.classList.add("has-active-alert");
  if (el.alertStateLabel) el.alertStateLabel.textContent = "התרעה פעילה עכשיו";
  if (el.alertHeadline) el.alertHeadline.textContent = `${title}${allAreas.length ? ` — ${allAreas.slice(0,6).join(", ")}${allAreas.length>6 ? ` ועוד ${allAreas.length-6}` : ""}` : ""}`;
  if (el.alertAreas) {
    el.alertAreas.innerHTML = allAreas.slice(0,12).map((area) => `<span>${escapeHtml(area)}</span>`).join("");
    el.alertAreas.classList.toggle("hidden", !allAreas.length);
  }
  const fingerprint = matching.map((a) => a.id || `${a.title}|${(a.areas||[]).join("|")}`).sort().join("::");
  state.alertWasActive = true;
  if (fingerprint && fingerprint !== state.lastAlertFingerprint) {
    if (el.alertLiveRegion) el.alertLiveRegion.textContent = `התרעה פעילה: ${title}${allAreas.length ? `. אזורים: ${allAreas.slice(0,8).join(", ")}` : ""}`;
    state.lastAlertFingerprint = fingerprint;
    localStorage.setItem("hadashota.lastAlertFingerprint", fingerprint);
    if (state.alertSound) playAlertTone(false);
    if (state.alertDesktop) showEmergencyNotification(title, allAreas);
  }
}

function renderAlertConnectionError() {
  if (el.alertLastCheck) el.alertLastCheck.textContent = "חיבור מתעכב";
  if (el.alertConnectionState) el.alertConnectionState.textContent = "מקור ההתרעות לא זמין כרגע";
  if (!el.alertCenterCard?.classList.contains("alert-active") && el.alertHeadline) el.alertHeadline.textContent = "לא ניתן לאמת כרגע אם קיימת התרעה פעילה";
}

function playAlertTone(isTest = false) {
  if (!state.alertSound && !isTest) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = state.alertAudioContext || new AudioCtx();
    state.alertAudioContext = ctx;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(isTest ? 0.07 : 0.11, ctx.currentTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
    [740, 990].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      osc.type = "sine"; osc.frequency.value = frequency; osc.connect(gain);
      osc.start(ctx.currentTime + index * 0.22); osc.stop(ctx.currentTime + 0.35 + index * 0.22);
    });
  } catch (error) { console.warn("Alert audio:", error); }
}

function showEmergencyNotification(title, areas) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const body = areas?.length ? areas.slice(0,8).join(", ") : "התקבלה התרעה חדשה";
  try { new Notification(`חדשותא • ${title}`, { body, icon:"/apple-touch-icon.png", tag:`hadashota-alert-${state.lastAlertFingerprint.slice(0,60)}`, renotify:true }); } catch {}
}

function runAlertTest() {
  const original = { headline: el.alertHeadline?.textContent || "", state: el.alertStateLabel?.textContent || "" };
  el.alertCenterCard?.classList.add("alert-active");
  if (el.alertStateLabel) el.alertStateLabel.textContent = "בדיקת התרעה";
  if (el.alertHeadline) el.alertHeadline.textContent = "בדיקה בלבד — התרעת חדשותא פועלת";
  if (el.alertAreas) { el.alertAreas.innerHTML = '<span>עיר לדוגמה</span>'; el.alertAreas.classList.remove("hidden"); }
  if (state.alertSound) playAlertTone(true);
  showToast("זו בדיקה בלבד — לא התקבלה התרעה אמיתית");
  setTimeout(() => { scheduleAlertPoll(0); }, 2600);
}
