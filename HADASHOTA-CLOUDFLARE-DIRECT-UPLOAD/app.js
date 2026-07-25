const state = {
  items: [],
  sources: [],
  hours: [1, 3, 24].includes(Number(localStorage.getItem("hadashota.hours"))) ? Number(localStorage.getItem("hadashota.hours")) : 1,
  category: (localStorage.getItem("hadashota.category") ?? localStorage.getItem("pulse.category")) || "all",
  kind: (localStorage.getItem("hadashota.kind") ?? localStorage.getItem("pulse.kind")) || "all",
  query: "",
  compact: (localStorage.getItem("hadashota.compact") ?? localStorage.getItem("pulse.compact")) === "1",
  showImages: localStorage.getItem("hadashota.showImages") !== "0",
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
  lastForegroundRefreshAt: 0,
  lastHiddenAt: 0,
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
  lastQualifiedLead: readStoredLeadSnapshot(),
  flashDeckExpanded: false,
  flashDeckPaused: false,
  flashDeckTimer: null,
  deferredInstallPrompt: null,
  installOfferShownThisSession: false,
  visitCount: Number(localStorage.getItem("hadashota.visitCount") || 0),
  importantOnly: localStorage.getItem("hadashota.importantOnly") === "1",
  hotOnly: false,
  summaryOpen: false
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
  compactSettingToggle: document.querySelector("#compactSettingToggle"),
  themeSettingToggle: document.querySelector("#themeSettingToggle"),
  showImagesToggle: document.querySelector("#showImagesToggle"),
  resetPreferencesBtn: document.querySelector("#resetPreferencesBtn"),
  clusterToggle: document.querySelector("#clusterToggle"),
  autoRefresh: document.querySelector("#autoRefresh"),
  notificationToggle: document.querySelector("#notificationToggle"),
  notificationOfferModal: document.querySelector("#notificationOfferModal"),
  notificationOfferAccept: document.querySelector("#notificationOfferAccept"),
  notificationOfferDecline: document.querySelector("#notificationOfferDecline"),
  installOfferModal: document.querySelector("#installOfferModal"),
  installOfferAccept: document.querySelector("#installOfferAccept"),
  installOfferLater: document.querySelector("#installOfferLater"),
  installInstructions: document.querySelector("#installInstructions"),
  installAppBtn: document.querySelector("#installAppBtn"),
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
  leadStoryLabelText: document.querySelector("#leadStoryLabelText"),
  leadStoryLiveBadge: document.querySelector("#leadStoryLiveBadge"),
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
  sinceVisit: document.querySelector("#sinceVisit"),
  sinceVisitText: document.querySelector("#sinceVisitText"),
  hotNowCount: document.querySelector("#hotNowCount"),
  hotNowFilterBtn: document.querySelector("#hotNowFilterBtn"),
  importantOnlyBtn: document.querySelector("#importantOnlyBtn"),
  quickBriefBtn: document.querySelector("#quickBriefBtn"),
  quickBriefModal: document.querySelector("#quickBriefModal"),
  quickBriefList: document.querySelector("#quickBriefList"),
  leadIntelligence: document.querySelector("#leadIntelligence"),
  leadVerification: document.querySelector("#leadVerification"),
  leadHotScore: document.querySelector("#leadHotScore"),
  leadTimeline: document.querySelector("#leadTimeline"),
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
const CLIENT_NEWS_TIMEOUT_MS = 18_000;
const FOREGROUND_FRESHNESS_MS = 10_000;

const CATEGORY_LABELS = {
  all: "כל העדכונים",
  security: "ביטחוני",
  politics: "פוליטי",
  diplomatic: "מדיני",
  other: "כללי"
};

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  state.deferredInstallPrompt = event;
  syncInstallControl();
});

window.addEventListener("appinstalled", () => {
  localStorage.setItem("hadashota.appInstalled", "1");
  localStorage.removeItem("hadashota.installSnoozeUntil");
  state.deferredInstallPrompt = null;
  closeSiteModal(el.installOfferModal, false);
  syncInstallControl();
  showToast("חדשותא נוספה למכשיר בהצלחה");
});

init();

function init() {
  state.visitCount += 1;
  localStorage.setItem("hadashota.visitCount", String(state.visitCount));
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
  // Render saved data immediately, then join the shared server snapshot.
  // This keeps desktop, Safari and the iPhone Home-Screen app on the same dataset.
  loadNews(false);
  window.setTimeout(() => {
    const generatedMs = Date.parse(state.lastDataGeneratedAt || "");
    const tooOld = !Number.isFinite(generatedMs) || Date.now() - generatedMs > 90_000;
    if (!state.loading && (state.dataDelayed || tooOld)) {
      state.lastForegroundRefreshAt = 0;
      loadNews(false, true);
    }
  }, 20_000);
  restartAutoRefresh();
  window.setTimeout(maybeShowNotificationOffer, 1400);
  // Do not stack prompts. First visit gets a gentle delayed install suggestion; returning visitors see it sooner.
  window.setTimeout(() => maybeShowInstallOffer("automatic"), state.visitCount > 1 ? 7000 : 30000);
  syncInstallControl();
}

function bindEvents() {
  el.timeFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-hours]");
    if (!button) return;
    state.hours = Number(button.dataset.hours);
    localStorage.setItem("hadashota.hours", String(state.hours));
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
  el.themeToggle.addEventListener("click", () => setTheme(document.documentElement.dataset.theme !== "dark"));
  el.compactToggle.addEventListener("click", () => {
    state.compact = !state.compact;
    localStorage.setItem("hadashota.compact", state.compact ? "1" : "0");
    syncControlsFromState();
    renderFeed();
  });
  el.compactSettingToggle?.addEventListener("change", () => {
    state.compact = el.compactSettingToggle.checked;
    localStorage.setItem("hadashota.compact", state.compact ? "1" : "0");
    syncControlsFromState();
    renderFeed();
  });
  el.themeSettingToggle?.addEventListener("change", () => setTheme(el.themeSettingToggle.checked));
  el.showImagesToggle?.addEventListener("change", () => {
    state.showImages = el.showImagesToggle.checked;
    localStorage.setItem("hadashota.showImages", state.showImages ? "1" : "0");
    syncControlsFromState();
  });
  el.resetPreferencesBtn?.addEventListener("click", resetDisplayPreferences);
  el.importantOnlyBtn?.addEventListener("click", () => {
    state.importantOnly = !state.importantOnly;
    if (state.importantOnly) state.hotOnly = false;
    localStorage.setItem("hadashota.importantOnly", state.importantOnly ? "1" : "0");
    render();
  });
  el.quickBriefBtn?.addEventListener("click", openQuickBrief);
  el.hotNowFilterBtn?.addEventListener("click", () => {
    state.hotOnly = !state.hotOnly;
    if (state.hotOnly) state.importantOnly = false;
    el.hotNowFilterBtn.classList.toggle("active", state.hotOnly);
    render();
    if (state.hotOnly) scrollToFeedFromNewsroomNav();
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

  el.notificationOfferAccept?.addEventListener("click", async () => {
    localStorage.setItem("hadashota.notificationPromptChoice", "accepted");
    closeSiteModal(el.notificationOfferModal, false);
    await toggleHeadlineNotifications(true);
  });
  el.notificationOfferDecline?.addEventListener("click", () => {
    localStorage.setItem("hadashota.notificationPromptChoice", "declined");
    closeSiteModal(el.notificationOfferModal, false);
    showToast("לא נציג שוב את ההצעה להתראות — אפשר להפעיל אותן בכל עת בהעדפות");
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
    if (document.hidden) {
      state.lastHiddenAt = Date.now();
    } else {
      const hiddenFor = state.lastHiddenAt ? Date.now() - state.lastHiddenAt : 0;
      // iOS Home Screen web apps can resume the exact suspended page process.
      // In standalone mode a real page reload is the most reliable way to guarantee
      // a fresh app shell + forced news fetch instead of a frozen in-memory snapshot.
      if (hiddenFor >= 3000 && hardRefreshStandalone("visibility")) return;
      loadUtilities();
      if (hiddenFor >= 3000) state.lastForegroundRefreshAt = 0;
      refreshNewsOnForeground("visibility");
    }
    scheduleAlertPoll(250);
    if (state.autoRefresh) restartAutoRefresh();
  });

  window.addEventListener("pagehide", () => {
    state.lastHiddenAt = Date.now();
  });

  window.addEventListener("focus", () => {
    if (isStandaloneMode() && state.lastHiddenAt && Date.now() - state.lastHiddenAt >= 3000) {
      if (hardRefreshStandalone("focus")) return;
    }
    refreshNewsOnForeground("focus");
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted && hardRefreshStandalone("pageshow-bfcache")) return;
    if (event.persisted) state.lastForegroundRefreshAt = 0;
    refreshNewsOnForeground(event.persisted ? "pageshow-bfcache" : "pageshow");
  });

  window.addEventListener("online", () => {
    state.lastForegroundRefreshAt = 0;
    loadUtilities();
    refreshNewsOnForeground("online");
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

let notificationOfferShownThisSession = false;

function maybeShowNotificationOffer() {
  if (notificationOfferShownThisSession || !el.notificationOfferModal) return;
  const choice = localStorage.getItem("hadashota.notificationPromptChoice");
  if (choice === "accepted" || choice === "declined") return;
  if (state.notificationsEnabled) {
    localStorage.setItem("hadashota.notificationPromptChoice", "accepted");
    return;
  }
  if ("Notification" in window && Notification.permission === "denied") {
    localStorage.setItem("hadashota.notificationPromptChoice", "declined");
    return;
  }
  notificationOfferShownThisSession = true;
  openSiteModal(el.notificationOfferModal);
}

function isStandaloneMode() {
  return window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true;
}

function hardRefreshStandalone(reason = "resume") {
  if (!isStandaloneMode()) return false;
  try {
    const now = Date.now();
    const last = Number(sessionStorage.getItem("hadashota.pwaHardRefreshAt") || 0);
    // Prevent a reload loop if iOS emits more than one resume lifecycle event.
    if (now - last < 8000) return false;
    sessionStorage.setItem("hadashota.pwaHardRefreshAt", String(now));
    const url = new URL(location.href);
    url.searchParams.set("_pwa", String(now));
    location.replace(url.pathname + url.search + url.hash);
    return true;
  } catch {
    location.reload();
    return true;
  }
}

function isIOSDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isAndroidDevice() {
  return /android/i.test(navigator.userAgent);
}

function isMacDesktop() {
  return /macintosh|mac os x/i.test(navigator.userAgent) && !isIOSDevice();
}

function installInstructionsMarkup() {
  if (isIOSDevice()) {
    return `<div class="install-step"><b>1</b><span>לחצו בדפדפן על <strong>שיתוף</strong> <em>↥</em></span></div>
      <div class="install-step"><b>2</b><span>בחרו <strong>הוסף למסך הבית</strong></span></div>
      <div class="install-step"><b>3</b><span>אשרו <strong>הוספה</strong> — וחדשותא תופיע כאייקון במסך הבית</span></div>`;
  }
  if (state.deferredInstallPrompt) {
    return `<div class="install-step install-step-one"><b>✓</b><span>לחיצה על הכפתור למטה תפתח את חלון ההתקנה הרשמי של הדפדפן. נשאר רק לאשר.</span></div>`;
  }
  if (isAndroidDevice()) {
    return `<div class="install-step"><b>1</b><span>פתחו את תפריט הדפדפן <strong>⋮</strong></span></div>
      <div class="install-step"><b>2</b><span>בחרו <strong>התקנת אפליקציה</strong> או <strong>הוספה למסך הבית</strong></span></div>`;
  }
  const shortcut = isMacDesktop() ? "⌘D" : "Ctrl+D";
  return `<div class="install-step"><b>★</b><span>לשמירה מהירה במועדפים לחצו <strong>${shortcut}</strong>.</span></div>
    <div class="install-step"><b>+</b><span>בדפדפנים תומכים אפשר גם לבחור בתפריט <strong>התקנת חדשותא</strong> / <strong>הוסף כאפליקציה</strong>.</span></div>`;
}

function syncInstallControl() {
  if (!el.installAppBtn) return;
  const installed = isStandaloneMode() || localStorage.getItem("hadashota.appInstalled") === "1";
  el.installAppBtn.disabled = installed;
  el.installAppBtn.textContent = installed ? "חדשותא מותקנת במכשיר ✓" : (isIOSDevice() ? "הוספת חדשותא למסך הבית" : "הוספת חדשותא למכשיר");
}

function maybeShowInstallOffer(reason = "automatic") {
  if (!el.installOfferModal || isStandaloneMode()) {
    if (isStandaloneMode()) localStorage.setItem("hadashota.appInstalled", "1");
    syncInstallControl();
    return;
  }
  if (reason !== "manual") {
    if (state.installOfferShownThisSession) return;
    const snoozeUntil = Number(localStorage.getItem("hadashota.installSnoozeUntil") || 0);
    if (snoozeUntil > Date.now()) return;
    // Never place the install request on top of the notification decision.
    if (!document.querySelector(".site-modal:not(.hidden)") && localStorage.getItem("hadashota.notificationPromptChoice")) {
      // continue
    } else {
      window.setTimeout(() => maybeShowInstallOffer(reason), 5000);
      return;
    }
  }
  state.installOfferShownThisSession = true;
  if (el.installInstructions) {
    el.installInstructions.innerHTML = installInstructionsMarkup();
    el.installInstructions.classList.remove("hidden");
  }
  if (el.installOfferAccept) {
    delete el.installOfferAccept.dataset.stage;
    el.installOfferAccept.textContent = state.deferredInstallPrompt
      ? "התקינו את חדשותא"
      : (isIOSDevice() ? "הראו לי איך" : "הוסיפו את חדשותא");
  }
  openSiteModal(el.installOfferModal, reason === "manual" ? el.installAppBtn : null);
}

async function handleInstallAccept() {
  if (state.deferredInstallPrompt) {
    const promptEvent = state.deferredInstallPrompt;
    state.deferredInstallPrompt = null;
    closeSiteModal(el.installOfferModal, false);
    try {
      await promptEvent.prompt();
      const result = await promptEvent.userChoice;
      if (result?.outcome === "accepted") {
        localStorage.setItem("hadashota.appInstalled", "1");
        localStorage.removeItem("hadashota.installSnoozeUntil");
        showToast("ההתקנה אושרה — חדשותא תופיע במכשיר");
      } else {
        localStorage.setItem("hadashota.installSnoozeUntil", String(Date.now() + 14 * 24 * 60 * 60 * 1000));
      }
    } catch (error) {
      console.warn("Install prompt failed", error);
      showToast("אפשר להתקין דרך תפריט הדפדפן");
    }
    syncInstallControl();
    return;
  }

  // iOS/Safari and unsupported browsers cannot be installed programmatically. Keep the instructions visible.
  if (isIOSDevice()) {
    if (el.installOfferAccept?.dataset.stage === "instructions-shown") {
      closeSiteModal(el.installOfferModal, false);
      return;
    }
    if (el.installOfferAccept) {
      el.installOfferAccept.textContent = "הבנתי";
      el.installOfferAccept.dataset.stage = "instructions-shown";
    }
    localStorage.setItem("hadashota.installSnoozeUntil", String(Date.now() + 30 * 24 * 60 * 60 * 1000));
    showToast("שיתוף ↥ ואז ‘הוסף למסך הבית’");
    return;
  }

  localStorage.setItem("hadashota.installSnoozeUntil", String(Date.now() + 14 * 24 * 60 * 60 * 1000));
  showToast(isMacDesktop() ? "למועדפים: ⌘D" : "למועדפים: Ctrl+D");
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


function refreshNewsOnForeground(reason = "foreground") {
  if (document.hidden || state.loading) return;
  const now = Date.now();
  if (now - state.lastForegroundRefreshAt < FOREGROUND_FRESHNESS_MS) return;
  state.lastForegroundRefreshAt = now;
  // Automatic foreground refresh joins the shared Worker snapshot instead of
  // creating a device-specific collection. Manual refresh is the only force path.
  loadNews(false, true).catch((error) => console.warn(`Foreground refresh (${reason}) failed`, error));
}

async function loadNews(force = false, fromRetry = false) {
  if (state.loading) return;
  state.loading = true;
  if (force) state.lastForegroundRefreshAt = Date.now();
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
  state.retryTimer = setTimeout(() => loadNews(false, true), seconds * 1000);
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
      const timeDeltaMs = Math.abs(itemTime - candidateTime);
      if (timeDeltaMs > 8 * 60 * 60 * 1000) continue;
      const directMatch = sameEventClient(item.title, candidate.title, timeDeltaMs);
      const relatedMatch = !directMatch && normalizeClusterReports(candidate).some((report) => {
        if (!report?.title) return false;
        const reportTime = Date.parse(report.publishedAt || 0);
        const reportDeltaMs = Number.isFinite(reportTime) && Number.isFinite(itemTime) ? Math.abs(itemTime - reportTime) : timeDeltaMs;
        return reportDeltaMs <= 180 * 60 * 1000 && sameEventClient(item.title, report.title, reportDeltaMs);
      });
      if (directMatch || relatedMatch) { match = candidate; break; }
    }

    if (!match) {
      const clone = structuredCloneSafe(item);
      clone.related = normalizeClusterReports(clone);
      clone.updates = normalizeClusterUpdates(clone);
      clone.reportCount = clone.related.length || 1;
      clone.latestReportAt = clusterLatestAt(clone);
      clone.firstReportAt = clusterFirstAt(clone);
      clusters.push(clone);
      continue;
    }

    const reports = dedupeReports([...normalizeClusterReports(match), ...normalizeClusterReports(item)]);
    const updates = [...normalizeClusterUpdates(match), ...normalizeClusterUpdates(item)]
      .filter((report, index, arr) => arr.findIndex((r) => `${r.url || ""}|${r.publishedAt}|${r.title || ""}` === `${report.url || ""}|${report.publishedAt}|${report.title || ""}`) === index)
      .sort((a,b) => Date.parse(a.publishedAt || 0) - Date.parse(b.publishedAt || 0)).slice(-24);
    const preferred = representativeRank(item) > representativeRank(match) ? item : match;
    const other = preferred === item ? match : item;
    const latestReportAt = newestIso(reports.map((report) => report.publishedAt).concat([match.latestReportAt, item.latestReportAt]));
    const firstReportAt = oldestIso(reports.map((report) => report.publishedAt).concat([match.firstReportAt, item.firstReportAt]));
    const imageUrl = preferred.imageUrl || other.imageUrl || reports.find((report) => report.imageUrl)?.imageUrl || null;
    const preserved = { ...preferred };
    Object.assign(match, preserved, {
      related: reports,
      updates,
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

function normalizeClusterUpdates(item) {
  const base = normalizeClusterReports(item);
  const raw = Array.isArray(item?.updates) ? item.updates : [];
  const seen = new Set();
  return [...raw, ...base].filter((report) => {
    if (!report?.publishedAt || !report?.sourceName) return false;
    const key = `${report.url || ""}|${report.publishedAt}|${report.title || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).sort((a,b) => Date.parse(a.publishedAt || 0) - Date.parse(b.publishedAt || 0)).slice(-24);
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

function sameEventClient(a, b, timeDeltaMs = Infinity) {
  const A = clientTitleTokens(a);
  const B = clientTitleTokens(b);
  if (!A.size || !B.size) return false;
  let intersection = 0;
  for (const token of A) if (B.has(token)) intersection += 1;
  const union = A.size + B.size - intersection;
  const jaccard = union ? intersection / union : 0;
  const containment = intersection / Math.max(1, Math.min(A.size, B.size));
  if (jaccard >= 0.50 || (intersection >= 3 && containment >= 0.46) || (intersection >= 4 && containment >= 0.40)) return true;

  if (timeDeltaMs <= 180 * 60 * 1000) {
    const entitiesA = clientEventEntities(a);
    const entitiesB = clientEventEntities(b);
    const actionsA = clientEventActions(a);
    const actionsB = clientEventActions(b);
    const sharedEntities = [...entitiesA].filter((x) => entitiesB.has(x)).length;
    const sharedActions = [...actionsA].filter((x) => actionsB.has(x)).length;
    if (sharedEntities >= 2 && sharedActions >= 1) return true;
    if (sharedEntities >= 1 && sharedActions >= 2 && intersection >= 2) return true;
    // Breaking regional events are often phrased very differently across Hebrew,
    // English and Telegram. A shared specific target + the same conflict action
    // within 90 minutes is enough to treat them as one developing event.
    if (timeDeltaMs <= 150 * 60 * 1000 && sharedEntities >= 1 && sharedActions >= 1) {
      const specificTargets = new Set(["כווית","בחריין","קטאר","ירדן","עיראק","סעודיה","תימן","טהרן","ביירות","דמשק"]);
      const sharedSpecificTarget = [...entitiesA].some((entity) => entitiesB.has(entity) && specificTargets.has(entity));
      if (sharedSpecificTarget) return true;
    }
  }
  return false;
}

function clientCanonicalToken(word) {
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

function clientTitleTokens(value) {
  const stop = new Set(["של","את","על","עם","לא","גם","זה","זו","כי","כך","הוא","היא","הם","כל","אל","לפי","אחרי","לפני","עוד","היום","עכשיו","חדש","חדשה","חדשות","דיווח","דיווחים","עדכון","עדכונים","ראשוני","ישראל","ישראלי","ישראלית","the","of","to","in","on","for","and","is","are","with","breaking","report","update"]);
  const normalized = String(value || "").toLowerCase().replace(/[״׳'"`]/g, "").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  return new Set(normalized.split(" ").map(clientCanonicalToken).filter((word) => word.length >= 2 && !stop.has(word)).slice(0, 28));
}

function clientEventEntities(value) {
  const tokens = clientTitleTokens(value);
  const known = new Set(["איראן","כווית","בחריין","קטאר","ירדן","עיראק","סעודיה","תימן","ארהב","ישראל","טהרן","ביירות","דמשק","לבנון","סוריה"]);
  return new Set([...tokens].filter((t) => known.has(t)));
}

function clientEventActions(value) {
  const tokens = clientTitleTokens(value);
  const families = new Map([
    ["attack", new Set(["תקיפה","תקף","תקפה","פגיעה","פגע","פיצוץ","ירי","שיגור","שיגרה","שיגר","מטח"])],
    ["missile", new Set(["טיל","רקטה","כטבמ","רחפן","מלט"])],
    ["intercept", new Set(["יירוט","יירט","הגנה","אזעקה","התרעה","התרעות"])],
    ["base", new Set(["בסיס","צבאי","כוחות","ארהב"])]]);
  const out = new Set();
  for (const [family, words] of families) if ([...tokens].some((t) => words.has(t))) out.add(family);
  return out;
}



// V42 — Consensus newsroom engine.
// Headlines are built from the wording that is best-supported across the cluster,
// then lightly edited into a natural front-page headline. This keeps the human
// newsroom quality of the source material without blindly mirroring one publisher.
function titleSimilarityScore(a, b) {
  const A = clientTitleTokens(cleanDisplayTitle(a || ""));
  const B = clientTitleTokens(cleanDisplayTitle(b || ""));
  if (!A.size || !B.size) return 0;
  let hit = 0;
  for (const token of A) if (B.has(token)) hit += 1;
  const union = A.size + B.size - hit;
  const jaccard = union ? hit / union : 0;
  const containment = hit / Math.max(1, Math.min(A.size, B.size));
  return Math.max(jaccard, containment * .82);
}

function repeatedPhraseCandidate(titles) {
  const stop = new Set(["דיווח","דיווחים","היום","חדשות","עכשיו","לאחר","אחרי","לקראת","בעקבות","במהלך","של","על","עם","את","הוא","היא","עוד"]);
  const counts = new Map();
  for (const raw of titles) {
    const words = cleanDisplayTitle(raw).replace(/[״׳'\"`]/g, "").split(/\s+/).filter((w) => /^[א-ת]{2,}$/.test(w) && !stop.has(w));
    for (let n = 3; n >= 2; n--) {
      for (let i = 0; i + n <= words.length; i++) {
        const phrase = words.slice(i, i+n).join(" ");
        counts.set(phrase, (counts.get(phrase) || 0) + 1);
      }
    }
  }
  return [...counts.entries()]
    .filter(([phrase, n]) => n >= 2 && phrase.length >= 6)
    .sort((a,b) => b[1]-a[1] || b[0].length-a[0].length)[0]?.[0] || "";
}

function consensusMedoidTitle(titles) {
  const rows = titles.map(cleanNewsroomCandidate).filter((t) => t.length >= 14);
  if (!rows.length) return "";
  const scored = rows.map((title, i) => {
    let support = 0;
    for (let j = 0; j < rows.length; j++) if (j !== i) support += titleSimilarityScore(title, rows[j]);
    const detail = Math.min(16, (title.match(/\d|[א-ת]{3,}/g) || []).length * .55);
    const shape = title.length >= 34 && title.length <= 96 ? 8 : title.length <= 118 ? 4 : -5;
    const clickbait = /^(דרמה|סערה|הלם|צפו|תיעוד|לא תאמינו)\b/.test(title) ? -8 : 0;
    return { title, score: support * 35 + detail + shape + clickbait };
  });
  scored.sort((a,b) => b.score-a.score || a.title.length-b.title.length);
  return scored[0]?.title || rows[0];
}

function stripTitleLeadIns(title) {
  return cleanNewsroomCandidate(title || "")
    .replace(/^דיווחים?\s*[:\-–—]?\s*/i, "")
    .replace(/^על פי דיווחים?\s*[:\-–—]?\s*/i, "")
    .replace(/^מבזק\s*[:\-–—]?\s*/i, "")
    .trim();
}

function conciseLeadHeadline(base, category = "other", titles = [], reportCount = 1) {
  let t = stripTitleLeadIns(base);
  if (!t) return "חדשות עכשיו";
  // Turn long quote-like source headlines into a concise newsroom lead.
  t = t.replace(/^([^:]{8,42}):\s*(.+)$/, (_, a, b) => {
    if (b.length > 70 || /אמר|לדבריו|לדבריהם|הודיע|הודיעה|ציין|ציינה/.test(b)) return `${a}: ${b}`;
    return `${a}: ${b}`;
  });
  const firstChunk = t.split(/(?<=[.!?])\s+/)[0];
  if (firstChunk.length >= 26 && firstChunk.length <= 96) t = firstChunk;
  if (t.includes(':') && t.length > 92) {
    const [pre, post] = t.split(/:\s*/, 2);
    if (post && post.length > 40) {
      // keep the dramatic preface but condense the explanatory tail
      t = `${pre}: ${post.slice(0, 64).replace(/\s+\S*$/, '')}…`;
    }
  }
  t = t.replace(/\s*—\s*/g, ' – ').replace(/\s+/g, ' ').trim();
  const lower = t.toLowerCase();
  if (category === 'security' || category === 'diplomatic') {
    if (/סעודיה|saudi/.test(lower) && /הודע|אזהר|טלפונ|סלולרי|נייד|פלטפורמה/.test(lower)) {
      return reportCount >= 2
        ? 'הכוננות עולה בסעודיה: הודעות אזהרה נשלחו לטלפונים של אזרחים'
        : 'בסעודיה מזהירים את האזרחים: הודעות אזהרה נשלחו לטלפונים';
    }
    if (/איראן|iran/.test(lower) && /(כווית|kuwait|בחריין|bahrain|קטאר|qatar|סעודיה|saudi)/.test(lower) && /(טיל|טילים|ירי|יירוט|מתקפ|תקיפ|כטב|missile|strike|attack)/.test(lower)) {
      const place = /כווית|kuwait/.test(lower) ? 'כווית' : /בחריין|bahrain/.test(lower) ? 'בחריין' : /קטאר|qatar/.test(lower) ? 'קטאר' : 'המדינה';
      return `דיווחים על הסלמה: ירי איראני לעבר ${place}`;
    }
  }
  if (t.length > 94) {
    const shorter = t.replace(/,\s*[^,]+$/, '').replace(/\s+\S+\s+\S+\s+\S+$/, '').trim();
    if (shorter.length >= 34) t = shorter;
  }
  if (t.length > 84) t = t.slice(0, 81).replace(/\s+\S*$/, '').trim() + '…';
  return t;
}

function editorialHeadlineForItem(item) {
  const reports = normalizeClusterReports(item);
  const titles = [...new Set(reports.map((r) => cleanDisplayTitle(r.title || "")).filter(Boolean))];
  if (!titles.length) return cleanDisplayTitle(item?.title || "חדשות עכשיו");
  const corpus = titles.join(" | ");
  const lower = corpus.toLowerCase();
  const reportCount = Math.max(1, Number(item?.reportCount) || reports.length || 1);
  const found = /(נמצא|נמצאה|אותר|אותרה|אותרו|נמצאו)/.test(lower);
  const missing = /(נעדר|נעדרת|החיפושים|אבדו עקבות|נעלם|נעלמה|חיפושים)/.test(lower);
  if (found && missing) {
    const name = extractLikelyPersonName(titles) || repeatedPhraseCandidate(titles);
    return name ? `סוף טוב לחיפושים: ${name} אותר בשלום` : "סוף טוב לחיפושים: הנעדר אותר בשלום";
  }
  let base = consensusMedoidTitle(titles) || strongestFactFromTitles(titles) || cleanDisplayTitle(item?.title || "חדשות עכשיו");
  base = stripTitleLeadIns(base);
  if (!base) return cleanDisplayTitle(item?.title || "חדשות עכשיו");
  const polished = reportCount >= 3 && !/^[^:]{3,34}:/.test(base) && base.length < 72
    ? polishConsensusHeadline(base, item?.category || "other", titles)
    : base;
  return conciseLeadHeadline(polished, item?.category || 'other', titles, reportCount);
}

function polishConsensusHeadline(fact, category, titles = []) {
  let t = cleanNewsroomCandidate(fact);
  const all = titles.join(" ");
  const alreadyHasPunch = /^[^:]{3,34}:/.test(t) || /(הסלמה|דרמה|טלטלה|חשש|מתיחות|פיצוץ|מטח|תקיפה|אותר|נמצא)/.test(t.slice(0, 34));
  if (alreadyHasPunch) return t;
  if (category === "security") {
    if (/(הרוג|הרוגים|פצוע|פצועים|נפגע|נפגעים)/.test(all)) return `האירוע גובה מחיר: ${t}`;
    if (/(אותר|נמצא|חולץ|שוחרר)/.test(all)) return `אחרי שעות של מתח: ${t}`;
    if (/(מטח|טילים|כטב|תקיפה|פיצוץ|יירוט|ירי)/.test(all)) return `הסלמה בשטח: ${t}`;
  }
  if (category === "politics" && /(התפטר|פרש|פוטר|בחירות|פיזור|קואליציה)/.test(all)) return `טלטלה פוליטית: ${t}`;
  if (category === "diplomatic" && /(הסכם|שיחות|פסגה|שליח|אולטימטום|סנקציות)/.test(all)) return `התפתחות מדינית: ${t}`;
  return t;
}

function extractLikelyPersonName(titles) {
  const stop = new Set(["הילד","הילדה","הנער","הנערה","הנעדר","הנעדרת","נעדר","נעדרת","נמצא","נמצאה","אותר","אותרה","אחרי","שעות","חיפושים","החיפושים","דיווח","דיווחים","משטרת","ישראל","שלום","בחיים"]);
  const phraseCounts = new Map();
  for (const title of titles) {
    const words = String(title).replace(/[״׳'\"`]/g, "").match(/[א-ת]{2,}/g) || [];
    for (let i=0;i<words.length;i++) {
      if (stop.has(words[i])) continue;
      const one = words[i];
      phraseCounts.set(one, (phraseCounts.get(one)||0)+1);
      if (i+1 < words.length && !stop.has(words[i+1])) {
        const two = `${words[i]} ${words[i+1]}`;
        phraseCounts.set(two, (phraseCounts.get(two)||0)+1);
      }
    }
  }
  return [...phraseCounts.entries()]
    .filter(([phrase,n]) => n >= 2 && phrase.length >= 3)
    .sort((a,b) => b[1]-a[1] || (b[0].includes(" ")-a[0].includes(" ")) || b[0].length-a[0].length)[0]?.[0] || "";
}

function cleanNewsroomCandidate(value) {
  let t = cleanDisplayTitle(value || "");
  t = t.replace(/\s*[|•]\s*(ynet|וואלה|N12|ישראל היום|מעריב|כאן|חדשות 13|ערוץ 14|גלובס|כלכליסט).*$/i, "")
       .replace(/^(פרסום ראשון|בלעדי|צפו|תיעוד|דיווח ראשוני)\s*[:\-–—]\s*/i, "")
       .replace(/\s+/g, " ")
       .trim();
  if (t.length > 116) t = t.slice(0, 113).replace(/\s+\S*$/, "") + "…";
  return t;
}

function strongestFactFromTitles(titles) {
  const rows = titles.map(cleanNewsroomCandidate).filter((t) => t.length >= 14);
  if (!rows.length) return "";
  return consensusMedoidTitle(rows) || rows[0];
}

function editorialTitle(item) {
  try { return editorialHeadlineForItem(item); } catch { return cleanDisplayTitle(item?.title || "חדשות עכשיו"); }
}


function editorialDeckForItem(item, sourceCount = 1) {
  const titles = [...new Set(normalizeClusterReports(item).map((r) => cleanNewsroomCandidate(r.title || "")).filter(Boolean))];
  const main = editorialTitle(item);
  const secondary = titles
    .filter((t) => t !== main)
    .map((t) => ({ t, sim: titleSimilarityScore(t, main) }))
    .filter((x) => x.sim >= .18)
    .sort((a,b) => b.sim-a.sim || a.t.length-b.t.length)[0]?.t;
  if (secondary && secondary.length >= 18) return secondary;
  return sourceCount >= 3
    ? `${sourceCount} מקורות שונים מצליבים את פרטי האירוע. העדכונים החדשים ביותר מתעדכנים כאן בזמן אמת.`
    : "האירוע עדיין מתפתח. חדשותא ממשיכה לאסוף דיווחים ולאמת אותם מול מקורות נוספים.";
}

function mediaQueryForItem(item, editorial = "") {
  const reports = normalizeClusterReports(item);
  const rawTitles = [item?.title, editorial, ...reports.map((r) => r.title)].filter(Boolean);
  const cleanTitles = rawTitles.map(cleanDisplayTitle);
  const corpus = cleanTitles.join(' | ');
  const person = extractLikelyPersonName(cleanTitles);
  const entities = new Set();
  const actions = new Set();
  for (const title of rawTitles) {
    for (const e of clientEventEntities(title)) entities.add(e);
    for (const a of clientEventActions(title)) actions.add(a);
  }
  const lower = corpus.toLowerCase();
  const extras = [];
  if (/טלפונ|סלולרי|נייד|sms|הודע|התראה|אזהר/.test(lower)) extras.push('mobile phone emergency alert');
  if (/סעודיה|saudi/.test(lower)) extras.push('Saudi Arabia');
  if (/איראן|iran/.test(lower) && /(כווית|kuwait|בחריין|bahrain|קטאר|qatar)/.test(lower)) extras.push('middle east missile alert');
  if (/ילד|נעדר|נעדרת|אותר|נמצא/.test(lower)) extras.push('person search rescue');
  const entityPhrase = [...entities].slice(0, 3).join(' ');
  const actionPhrase = [...actions].slice(0, 2).join(' ');
  const strongest = strongestFactFromTitles(cleanTitles);
  return [person, [entityPhrase, actionPhrase].filter(Boolean).join(' '), ...extras, strongest, editorial]
    .filter(Boolean).join(' | ').slice(0, 360);
}

const SAFE_MEDIA_CACHE = new Map();
let safeMediaRequests = 0;
async function fetchSafeMedia(query, category = "other") {
  const normalized = String(query || "").trim().slice(0, 260);
  if (!normalized) return null;
  const key = `${category}|${normalized}`;
  if (SAFE_MEDIA_CACHE.has(key)) return SAFE_MEDIA_CACHE.get(key);
  if (safeMediaRequests >= 36) return null;
  safeMediaRequests += 1;
  const promise = fetch(`/api/media?q=${encodeURIComponent(normalized)}&category=${encodeURIComponent(category)}`, { cache: "force-cache" })
    .then((r) => r.ok ? r.json() : null)
    .then((data) => data?.image?.url ? data.image : null)
    .catch(() => null);
  SAFE_MEDIA_CACHE.set(key, promise);
  return promise;
}

function preferredSourceImage(item) {
  const reports = normalizeClusterReports(item || {});
  const candidates = [item, ...reports].filter(Boolean);
  for (const report of candidates) {
    const raw = report?.imageUrl;
    if (!raw || !/^https?:\/\//i.test(String(raw))) continue;
    return {
      url: String(raw),
      credit: `תמונה: ${report?.sourceName || report?.publisher || item?.sourceName || "המקור"}`,
      sourceName: report?.sourceName || report?.publisher || item?.sourceName || "המקור"
    };
  }
  return null;
}

async function hydrateLeadOpenMediaFallback(winner, leadTitle) {
  if (!el.leadStoryImage || !el.leadStoryMedia) return;
  const query = mediaQueryForItem(winner?.item, leadTitle);
  const media = await fetchSafeMedia(query, winner?.item?.category || "other");
  if (winner && leadFingerprint(winner) !== state.displayedLeadFingerprint) return;
  if (!media?.url) {
    el.leadStoryImage.removeAttribute("src");
    el.leadStoryImage.alt = "";
    el.leadStoryMedia.classList.add("image-unavailable", "contextual-fallback");
    el.leadStoryMedia.dataset.fallbackLabel = leadMediaFallbackLabel(winner?.item, leadTitle);
    el.leadStoryMedia.removeAttribute("data-media-credit");
    return;
  }
  el.leadStoryImage.src = media.url;
  el.leadStoryImage.alt = leadTitle;
  el.leadStoryImage.referrerPolicy = "no-referrer";
  el.leadStoryMedia.classList.remove("image-unavailable", "contextual-fallback");
  delete el.leadStoryMedia.dataset.fallbackLabel;
  el.leadStoryMedia.dataset.mediaCredit = `${media.illustrative ? "צילום אילוסטרציה · " : ""}${media.shortAttribution || media.attribution || "מדיה ברישיון פתוח"}`;
  el.leadStoryMedia.title = `${media.illustrative ? "צילום אילוסטרציה — " : ""}${media.attribution ? `תמונה ברישיון פתוח · ${media.attribution}` : "תמונה ברישיון פתוח"}`;
}

async function hydrateLeadSafeMedia(winner, leadTitle) {
  if (!el.leadStoryImage || !el.leadStoryMedia) return;
  const direct = preferredSourceImage(winner?.item);
  if (direct?.url) {
    const currentFingerprint = leadFingerprint(winner);
    el.leadStoryImage.onerror = async () => {
      if (currentFingerprint !== state.displayedLeadFingerprint) return;
      el.leadStoryImage.removeAttribute("src");
      await hydrateLeadOpenMediaFallback(winner, leadTitle);
    };
    el.leadStoryImage.src = direct.url;
    el.leadStoryImage.alt = leadTitle;
    el.leadStoryImage.referrerPolicy = "no-referrer";
    el.leadStoryMedia.classList.remove("image-unavailable", "contextual-fallback");
    delete el.leadStoryMedia.dataset.fallbackLabel;
    el.leadStoryMedia.dataset.mediaCredit = direct.credit;
    el.leadStoryMedia.title = direct.credit;
    return;
  }
  await hydrateLeadOpenMediaFallback(winner, leadTitle);
}

function mediaFallbackLabelFromSlot(slot) {
  const q = String(slot?.dataset?.mediaQuery || "");
  const category = String(slot?.dataset?.category || "other");
  const first = q.split("|").map((x) => x.trim()).find(Boolean) || "";
  if (first && first.length <= 42) return first;
  return category === "security" ? "ביטחון" : category === "politics" ? "פוליטיקה" : category === "diplomatic" ? "מדיני" : "חדשותא";
}

function leadMediaFallbackLabel(item, title = "") {
  const entities = [...clientEventEntities(`${item?.title || ""} ${title}`)];
  if (entities.length) return entities.slice(0, 2).join(" · ");
  const person = extractLikelyPersonName([cleanDisplayTitle(item?.title || ""), cleanDisplayTitle(title || "")].filter(Boolean));
  if (person) return person;
  return item?.category === "security" ? "אירוע ביטחוני" : item?.category === "politics" ? "פוליטיקה" : item?.category === "diplomatic" ? "הזירה המדינית" : "חדשותא";
}

async function hydrateSafeMediaSlots() {
  if (!state.showImages) return;
  const slots = [...document.querySelectorAll('.safe-media-slot[data-media-query]:not([data-hydrated="1"])')].slice(0, 30);
  await Promise.all(slots.map(async (slot) => {
    slot.dataset.hydrated = "1";
    const a = slot.closest('a.news-image');
    const directUrl = a?.dataset?.sourceImage || "";
    const directCredit = a?.dataset?.sourceCredit || "";
    const showDirect = (url) => {
      const img = document.createElement('img');
      img.src = url; img.alt = ""; img.loading = "lazy"; img.decoding = "async"; img.referrerPolicy = "no-referrer";
      img.addEventListener('error', async () => {
        if (!slot.isConnected) {
          const replacement = document.createElement("span");
          replacement.className = "safe-media-slot";
          replacement.dataset.mediaQuery = a?.dataset?.mediaQuery || slot.dataset.mediaQuery || "";
          replacement.dataset.category = a?.dataset?.category || slot.dataset.category || "other";
          replacement.dataset.hydrated = "1";
          img.replaceWith(replacement);
        }
      }, { once:true });
      slot.replaceWith(img);
      if (a && directCredit) {
        const credit = document.createElement('span');
        credit.className = 'media-credit';
        credit.textContent = directCredit;
        a.appendChild(credit);
      }
      return true;
    };
    if (directUrl && /^https?:\/\//i.test(directUrl)) {
      showDirect(directUrl);
      return;
    }
    const media = await fetchSafeMedia(slot.dataset.mediaQuery || "", slot.dataset.category || "other");
    if (!slot.isConnected) return;
    if (!media?.url) {
      slot.classList.add("contextual-media-fallback");
      slot.dataset.fallbackLabel = mediaFallbackLabelFromSlot(slot);
      return;
    }
    const img = document.createElement('img');
    img.src = media.url; img.alt = ""; img.loading = "lazy"; img.decoding = "async"; img.referrerPolicy = "no-referrer";
    img.addEventListener('error', () => {
      const replacement = document.createElement("span");
      replacement.className = "safe-media-slot contextual-media-fallback";
      replacement.dataset.fallbackLabel = mediaFallbackLabelFromSlot(slot);
      img.replaceWith(replacement);
    }, { once:true });
    slot.replaceWith(img);
    if (a && media.attribution) {
      a.title = `תמונה ברישיון פתוח · ${media.attribution}`;
      const credit = document.createElement("span");
      credit.className = "media-credit";
      credit.textContent = `${media.illustrative ? "אילוסטרציה · " : ""}${media.shortAttribution || media.attribution}`;
      a.appendChild(credit);
    }
  }));
}

function render() {
  // A secondary intelligence/visual module must never be able to blank the whole newsroom.
  // Each block renders independently so the core feed survives even if one enhancement fails.
  try { annotateStoryIntelligence(); } catch (error) { console.warn("Story intelligence render failed", error); }
  const renderSteps = [
    ["lead", renderLeadStory],
    ["latest", renderFlashDeck],
    ["feed", renderFeed],
    ["sources", renderSources],
    ["breaking", renderBreaking],
    ["trending", renderTrending],
    ["smart-dashboard", renderSmartDashboard]
  ];
  for (const [name, step] of renderSteps) {
    try { step(); } catch (error) { console.error(`Render block failed: ${name}`, error); }
  }
  queueMicrotask(() => {
    try { hydrateSafeMediaSlots(); } catch (error) { console.warn("Media hydration failed", error); }
  });
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
  const tg = state.sources.filter((source) => source.kind === "telegram" && source.healthStatus !== "offline").length;
  const healthy = state.sources.filter((source) => !source.healthStatus || source.healthStatus === "healthy").length;
  el.statSourceDetail.textContent = `${tg} ערוצי Telegram · ${healthy} מקורות תקינים`;
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
  if (state.hotOnly && state.category === "all" && state.kind === "all") return "חם עכשיו";
  if (state.importantOnly && state.category === "all" && state.kind === "all") return "רק חשוב";
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
    if (state.importantOnly && !isImportantStory(item)) return false;
    if (state.hotOnly && storyHotScore(item) < 60) return false;
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

function newsPreviewText(item, reportCount) {
  if (reportCount > 1) return `${reportCount} מקורות שונים מדווחים על אותו אירוע. לחצו למעבר לדיווחים המקוריים.`;
  return "עדכון חדשותי בזמן אמת. לחצו למעבר לידיעה במקור.";
}

function newsCardHtml(item) {
  const related = state.cluster
    ? (item.related || []).filter((r) => r.url && r.url !== item.url)
    : [];
  const reportCount = state.cluster ? Math.max(Number(item.reportCount) || 1, (item.related || []).length || 1) : 1;
  const category = item.category || "other";
  const safeTitle = editorialTitle(item);
  const preview = `<p class="news-preview">${escapeHtml(newsPreviewText(item, reportCount))}</p>`;
  const telegramBadge = item.sourceKind === "telegram" ? `<span class="source-type-badge">Telegram</span>` : "";
  const newBadge = state.lastVisitAt > 0 && Date.parse(item.latestReportAt || item.publishedAt) > state.lastVisitAt ? `<span class="new-badge">חדש</span>` : "";
  const officialBadge = (item.official || (item.related || []).some((report) => report.official)) ? `<span class="official-badge">רשמי</span>` : "";
  const independentBadge = item.independent ? `<span class="independent-badge">עצמאי</span>` : "";
  const clusterBadge = reportCount > 1 ? `<span class="cluster-badge">${reportCount} מקורות</span>` : "";
  const hot = storyHotScore(item);
  const verification = storyVerification(item);
  const hotBadge = hot >= 52 ? `<span class="hot-badge hot-${hot >= 75 ? "very" : "normal"}">🔥 ${hot}</span>` : "";
  const verifyBadge = reportCount >= 2 ? `<span class="verification-badge" title="רמת אימות לפי מספר וסוג המקורות">✓ ${verification.label}</span>` : "";
  const isSite = item.sourceKind === "site";
  const storyUrl = safeUrl(item.url);
  const mediaQuery = escapeHtml(mediaQueryForItem(item, safeTitle));
  const preferredImage = preferredSourceImage(item);
  const imageHtml = state.showImages
    ? `<a class="news-image safe-news-image${isSite ? "" : " telegram-image"}" href="${storyUrl}" target="_blank" rel="noopener noreferrer" aria-label="פתיחת מקור הידיעה"${preferredImage?.url ? ` data-source-image="${escapeHtml(preferredImage.url)}" data-source-credit="${escapeHtml(preferredImage.credit)}"` : ""}><span class="safe-media-slot" data-media-query="${mediaQuery}" data-category="${escapeHtml(category)}" aria-hidden="true"></span></a>`
    : "";
  const titleHtml = `<a href="${storyUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(safeTitle)}</a>`;
  const relatedHtml = related.length ? `
    <details class="related-wrap story-timeline-wrap">
      <summary>התפתחות הסיפור · ${reportCount} מקורות</summary>
      <div class="related-list story-timeline-mini">
        ${storyTimelineReports(item, 6).map((r) => `<a class="related-link" href="${safeUrl(r.url)}" target="_blank" rel="noopener noreferrer"><time>${formatClock(r.publishedAt)}</time><span>${escapeHtml(cleanDisplayText(r.sourceName))}</span><b>עדכון מהמקור</b></a>`).join("")}
      </div>
    </details>` : "";

  return `
    <article class="news-card clickable-story ${state.compact ? "compact" : ""} ${state.showImages ? "has-image" : ""} ${isSite ? "site-story" : "telegram-story"}" data-category="${category}" data-story-url="${storyUrl}" role="link" tabindex="0" aria-label="פתיחת המקור: ${escapeHtml(safeTitle)}">
      <div class="news-main">
        ${imageHtml}
        <div class="news-copy">
          <div class="news-meta">
            <span class="source-name">${escapeHtml(cleanDisplayText(item.sourceName))}</span>
            <span class="meta-sep">•</span>
            <time datetime="${escapeHtml(item.publishedAt)}" title="${escapeHtml(formatFullDate(item.publishedAt))}">${formatAge(item.publishedAt)}</time>
            ${newBadge}${telegramBadge}${officialBadge}${independentBadge}${clusterBadge}${hotBadge}${verifyBadge}
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
    const ah = Number(a.healthScore ?? 100), bh = Number(b.healthScore ?? 100);
    if ((ah < 35) !== (bh < 35)) return ah < 35 ? 1 : -1;
    if (a.official !== b.official) return a.official ? -1 : 1;
    if (ah !== bh) return bh - ah;
    return Date.parse(b.lastItemAt || 0) - Date.parse(a.lastItemAt || 0);
  });
  const healthySources = sources.filter((source) => (source.healthStatus || 'healthy') === 'healthy');
  const degradedSources = sources.filter((source) => source.healthStatus === 'degraded');
  const offlineSources = sources.filter((source) => source.healthStatus === 'offline');
  el.activeSourceCount.textContent = String(sources.filter((source) => source.healthStatus !== "offline").length);

  let visible;
  if (state.allSourcesVisible) {
    visible = sources;
  } else {
    visible = healthySources.slice(0, 8);
    if (!visible.length) visible = sources.slice(0, 8);
  }

  el.sourceList.innerHTML = visible.map((source) => {
    const type = source.official ? "מקור רשמי" : source.independent ? "Telegram עצמאי" : source.kind === "telegram" ? "Telegram / כתב" : "אתר חדשות";
    const health = Number.isFinite(Number(source.healthScore)) ? Number(source.healthScore) : 100;
    const healthLabel = source.healthStatus === "offline" ? "לא זמין כרגע" : source.healthStatus === "degraded" ? "איטי / חלקי" : "תקין";
    const ageLabel = source.lastItemAt ? formatAge(source.lastItemAt) : "ללא פריט חדש";
    const inner = `<span class="source-avatar">${escapeHtml(sourceInitial(source.name))}</span>
      <span class="source-info"><b>${escapeHtml(cleanDisplayText(source.name))}</b><small>${type} · ${ageLabel}</small><em class="source-health health-${escapeHtml(source.healthStatus || "healthy")}">בריאות ${health}% · ${healthLabel}</em></span>
      <i class="source-state ${source.healthStatus === "offline" ? "offline" : source.healthStatus === "degraded" ? "degraded" : ""}" title="${healthLabel}"></i>`;
    return source.home
      ? `<a class="source-row" href="${safeUrl(source.home)}" target="_blank" rel="noopener noreferrer" title="פתיחת המקור">${inner}</a>`
      : `<div class="source-row source-row-static">${inner}</div>`;
  }).join("");

  const extraCount = degradedSources.length + offlineSources.length;
  el.showAllSources.classList.toggle("hidden", sources.length <= 8 && extraCount === 0);
  el.showAllSources.textContent = state.allSourcesVisible
    ? "הצג פחות"
    : extraCount > 0
      ? `הצג גם מקורות חלקיים/לא זמינים (${extraCount})`
      : `הצג את כל ${sources.length} המקורות`;
}

const LEAD_SNAPSHOT_KEY = "hadashota.lastQualifiedLead.v2";
const DISPLAYED_LEAD_SNAPSHOT_KEY = "hadashota.displayedLead.v1";
const VERIFIED_LEAD_MAX_AGE_MS = 120 * 60 * 1000;
const STORED_LEAD_HARD_MAX_AGE_MS = 3 * 60 * 60 * 1000;

function leadSnapshotIsFresh(parsed, hardMaxMs = STORED_LEAD_HARD_MAX_AGE_MS) {
  if (!parsed?.entry?.item || !Number(parsed.savedAt)) return false;
  const latest = Date.parse(parsed.entry.latestAt || parsed.entry.item?.latestReportAt || parsed.entry.item?.publishedAt || 0);
  if (!Number.isFinite(latest)) return false;
  return Date.now() - latest <= hardMaxMs;
}

function readStoredLeadSnapshot() {
  try {
    const raw = localStorage.getItem(LEAD_SNAPSHOT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!leadSnapshotIsFresh(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readDisplayedLeadSnapshot() {
  try {
    const raw = localStorage.getItem(DISPLAYED_LEAD_SNAPSHOT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!leadSnapshotIsFresh(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function storyImageUrl(entry) {
  if (!entry?.item) return "";
  return entry.item.imageUrl
    || (entry.recentReports || []).find((report) => report?.imageUrl)?.imageUrl
    || (entry.reports || []).find((report) => report?.imageUrl)?.imageUrl
    || "";
}

function persistQualifiedLeadSnapshot(entry) {
  if (!entry?.item || Number(entry.uniqueSources) < 3) return;
  const snapshot = buildLeadSnapshot(entry);
  state.lastQualifiedLead = snapshot;
  try { localStorage.setItem(LEAD_SNAPSHOT_KEY, JSON.stringify(snapshot)); } catch {}
}

function persistDisplayedLeadSnapshot(entry) {
  if (!entry?.item) return;
  const snapshot = buildLeadSnapshot(entry);
  state.displayedLeadSnapshot = snapshot;
  try { localStorage.setItem(DISPLAYED_LEAD_SNAPSHOT_KEY, JSON.stringify(snapshot)); } catch {}
}

function buildLeadSnapshot(entry) {
  return {
    savedAt: Date.now(),
    entry: {
      item: structuredCloneSafe(entry.item),
      reports: structuredCloneSafe(entry.reports || []),
      recentReports: structuredCloneSafe(entry.recentReports || []),
      uniqueSources: Number(entry.uniqueSources) || 1,
      ageMinutes: Number(entry.ageMinutes) || 0,
      latestAt: entry.latestAt || entry.item?.latestReportAt || entry.item?.publishedAt,
      score: Number(entry.score) || 0,
      hotScore: Number(entry.hotScore) || storyHotScore(entry.item),
      hasOfficial: !!entry.hasOfficial,
      spreadMinutes: Number(entry.spreadMinutes) || 0,
      qualificationAt: entry.qualificationAt || null
    }
  };
}

function buildFallbackLeadCandidate() {
  const now = Date.now();
  const item = state.items
    .filter(Boolean)
    .sort((a, b) => Date.parse(clusterLatestAt(b) || 0) - Date.parse(clusterLatestAt(a) || 0))[0];
  if (!item) return null;

  const reports = normalizeClusterReports(item);
  const latestAt = clusterLatestAt(item);
  const latestMs = Date.parse(latestAt || 0);
  const ageMinutes = Number.isFinite(latestMs) ? Math.max(0, (now - latestMs) / 60_000) : 0;
  const reportTimes = reports.map((report) => Date.parse(report.publishedAt || 0)).filter(Number.isFinite);
  const spreadMinutes = reportTimes.length > 1 ? Math.max(0, Math.round((Math.max(...reportTimes) - Math.min(...reportTimes)) / 60_000)) : 0;
  return {
    item,
    reports,
    recentReports: reports,
    uniqueSources: Math.max(1, reports.length),
    ageMinutes,
    latestAt,
    score: 0,
    hasOfficial: reports.some((report) => report.official),
    spreadMinutes,
    fallback: true
  };
}

function leadQualificationAt(reports) {
  const times = (Array.isArray(reports) ? reports : [])
    .map((report) => Date.parse(report?.publishedAt || 0))
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  return times.length >= 3 ? new Date(times[2]).toISOString() : null;
}

function renderLeadStory() {
  // Use the server snapshot clock so every device evaluates freshness at the same moment.
  const serverNow = Date.parse(state.lastDataGeneratedAt || "");
  const now = Number.isFinite(serverNow) ? serverNow : Date.now();
  const corroborationWindowMs = 150 * 60 * 1000;

  const allEntries = state.items.map((item) => {
    const latestAt = clusterLatestAt(item);
    const latestMs = Date.parse(latestAt);
    const ageMinutes = Number.isFinite(latestMs) ? Math.max(0, (now - latestMs) / 60_000) : 9999;
    const reports = normalizeClusterReports(item);

    // normalizeClusterReports is deduped by publisher, so this is genuinely distinct sources.
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
    const spreadMinutes = reportTimes.length > 1
      ? Math.max(0, Math.round((Math.max(...reportTimes) - Math.min(...reportTimes)) / 60_000))
      : 0;
    const qualificationAt = uniqueSources >= 3 ? leadQualificationAt(recentReports) : null;
    const hotScore = storyHotScore(item);
    const sourceBoost = Math.min(uniqueSources, 8) * 7;
    const recencyBoost = ageMinutes <= 10 ? 34 : ageMinutes <= 25 ? 26 : ageMinutes <= 45 ? 18 : ageMinutes <= 60 ? 12 : ageMinutes <= 180 ? 4 : 0;
    const authorityBoost = hasOfficial ? 13 : hasVerified ? 5 : 0;
    const velocityBoost = uniqueSources >= 3 && spreadMinutes <= 20 ? 12 : uniqueSources >= 2 && spreadMinutes <= 35 ? 6 : 0;
    const score = hotScore * .75 + sourceBoost + recencyBoost + authorityBoost + velocityBoost;

    return { item, reports, recentReports, uniqueSources, ageMinutes, latestAt, qualificationAt, score, hotScore, hasOfficial, spreadMinutes };
  });

  const deterministicSort = (a, b) =>
    b.score - a.score ||
    Date.parse(b.latestAt || 0) - Date.parse(a.latestAt || 0) ||
    String(a.item?.id || a.item?.url || a.item?.title || "").localeCompare(String(b.item?.id || b.item?.url || b.item?.title || ""), "he");

  // Rule 1: 3+ distinct publishers, updated within the last hour.
  const verified = allEntries
    .filter((entry) => entry.uniqueSources >= 3 && entry.ageMinutes <= 60)
    .sort(deterministicSort);

  // Rule 2: only if no current 3-source story exists, allow a 2-source story.
  const twoSource = allEntries
    .filter((entry) => entry.uniqueSources >= 2 && entry.ageMinutes <= 60)
    .sort(deterministicSort);

  // Bridge quiet periods with the most recent corroborated story, never a single-source story,
  // and never older than three hours.
  const olderCorroborated = allEntries
    .filter((entry) => entry.uniqueSources >= 2 && entry.ageMinutes <= 180)
    .sort((a, b) =>
      Date.parse(b.latestAt || 0) - Date.parse(a.latestAt || 0) ||
      deterministicSort(a, b));

  let winner = verified[0] || twoSource[0] || olderCorroborated[0] || null;

  // A previous corroborated lead can bridge a partial network refresh.
  if (!winner && state.dataDelayed) {
    const saved = [state.lastQualifiedLead, readStoredLeadSnapshot(), state.displayedLeadSnapshot, readDisplayedLeadSnapshot()]
      .map((row) => row?.entry)
      .filter((entry) => entry?.item && Number(entry.uniqueSources) >= 2)
      .filter((entry) => {
        const latest = Date.parse(entry.latestAt || entry.item?.latestReportAt || entry.item?.publishedAt || 0);
        return Number.isFinite(latest) && now - latest <= 3 * 60 * 60 * 1000;
      })
      .sort((a,b) => Date.parse(b.latestAt || 0) - Date.parse(a.latestAt || 0));
    winner = saved[0] || null;
  }

  // Never leave the hero stuck on its HTML placeholder.
  // If no corroborated story exists at all, show the freshest item as a clearly-labelled
  // developing update — it is NOT treated as the main verified story and triggers no push.
  if (!winner && allEntries.length) {
    winner = [...allEntries].sort((a,b) =>
      Date.parse(b.latestAt || 0) - Date.parse(a.latestAt || 0) ||
      deterministicSort(a,b))[0];
    winner.leadMode = "single-developing";
  }

  if (!winner) {
    el.leadStoryTitle.textContent = "מתחבר לעדכונים האחרונים…";
    el.leadStoryPreview.textContent = "המערכת אוספת כעת דיווחים ממקורות החדשות.";
    el.leadStorySource.textContent = "חדשותא";
    el.leadStoryAge.textContent = "עכשיו";
    el.leadStoryCount.textContent = "";
    el.leadStorySources.innerHTML = "";
    el.leadStoryCta.classList.add("hidden");
    el.leadStoryMedia.classList.add("hidden");
    el.leadStory.classList.remove("hidden", "has-media");
    return;
  }

  if (!winner.leadMode) winner.leadMode = Number(winner.uniqueSources) >= 3 ? "verified" : "developing";

  const winnerFingerprint = leadFingerprint(winner);
  if (winnerFingerprint !== state.displayedLeadFingerprint) {
    state.displayedLeadFingerprint = winnerFingerprint;
    state.displayedLeadSince = Date.now();
  }

  if (Number(winner.uniqueSources) >= 3) persistQualifiedLeadSnapshot(winner);
  if (Number(winner.uniqueSources) >= 2) persistDisplayedLeadSnapshot(winner);

  const item = winner.item;
  const sources = winner.recentReports?.length ? winner.recentReports
    : winner.reports?.length ? winner.reports
    : normalizeClusterReports(item);
  const sourceTarget = sources.find((source) => source.sourceKind === "site" && source.url)
    || sources.find((source) => source.url)
    || (item.url ? item : null);
  const unique = sources.slice(0, 5);
  const leadTitle = editorialHeadlineForItem(item);

  el.leadStoryTitle.textContent = leadTitle;
  el.leadStory.dataset.titleSize = leadTitle.length > 120 ? "long" : leadTitle.length > 78 ? "medium" : "normal";
  el.leadStoryPreview.textContent = editorialDeckForItem(item, Math.max(1, Number(winner.uniqueSources) || sources.length));
  el.leadStorySource.textContent = sourceTarget?.sourceName || item.sourceName || "חדשותא";
  el.leadStoryAge.textContent = formatAge(winner.latestAt || item.latestReportAt || item.publishedAt);

  const count = Math.max(1, Number(winner.uniqueSources) || unique.length || 1);
  el.leadStoryCount.textContent = `${count} ${count === 1 ? "מקור מדווח" : "מקורות מדווחים"}`;

  const leadHot = storyHotScore(item);
  const leadVerify = storyVerification(item);
  if (el.leadHotScore) el.leadHotScore.textContent = `🔥 חום ${leadHot}/100`;

  if (el.leadVerification) {
    if (winner.leadMode === "verified") {
      el.leadVerification.textContent = `✓ רמת אימות ${leadVerify.label}${leadVerify.hasOfficial ? " · כולל מקור רשמי" : ""}`;
    } else if (winner.leadMode === "single-developing") {
      el.leadVerification.textContent = "◌ עדכון מתפתח · ממתינים לאימות נוסף";
    } else {
      el.leadVerification.textContent = `◌ מתפתח · ${count} מקורות כרגע`;
    }
  }

  if (el.leadTimeline) {
    const timeline = storyTimelineReports(item, 7);
    el.leadTimeline.innerHTML = timeline.map((report) =>
      `<a href="${safeUrl(report.url)}" target="_blank" rel="noopener noreferrer"><time>${formatClock(report.publishedAt)}</time><span>${escapeHtml(cleanDisplayText(report.sourceName))}</span><b>עדכון מהמקור</b></a>`
    ).join("");
    el.leadTimeline.closest("details")?.classList.toggle("hidden", timeline.length < 2);
  }

  if (el.leadStoryLabelText) {
    el.leadStoryLabelText.textContent = winner.leadMode === "single-developing"
      ? "עדכון מתפתח עכשיו"
      : "הסיפור המרכזי עכשיו";
  }
  if (el.leadStoryLiveBadge) el.leadStoryLiveBadge.classList.remove("hidden");
  if (el.leadStorySignal) {
    el.leadStorySignal.textContent = "";
    el.leadStorySignal.removeAttribute("title");
    el.leadStorySignal.classList.add("hidden");
  }

  setOptionalLink(el.leadStoryLink, sourceTarget?.url);
  const leadHref = safeHttpHref(sourceTarget?.url);
  if (leadHref) {
    el.leadStoryCta.href = leadHref;
    el.leadStoryCta.classList.remove("hidden");
  } else {
    el.leadStoryCta.removeAttribute("href");
    el.leadStoryCta.classList.add("hidden");
  }

  el.leadStoryMedia.classList.remove("hidden");
  el.leadStory.classList.add("has-media");
  setOptionalLink(el.leadStoryMedia, leadHref);
  el.leadStoryImage.onerror = () => {
    el.leadStoryImage.removeAttribute("src");
    el.leadStoryMedia.classList.add("image-unavailable");
  };
  el.leadStoryImage.removeAttribute("src");
  el.leadStoryMedia.classList.add("image-unavailable");
  hydrateLeadSafeMedia(winner, leadTitle);

  el.leadStorySources.innerHTML = unique.map((source) => source.url
    ? `<a href="${safeUrl(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(cleanDisplayText(source.sourceName))}</a>`
    : `<span>${escapeHtml(cleanDisplayText(source.sourceName))}</span>`).join("");

  el.leadStory.classList.remove("hidden");

  // Push notifications remain strictly 3+ sources.
  if (Number(winner.uniqueSources) >= 3) updateLeadHeadlineTracking(winner);
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

  el.breakingTitle.textContent = editorialTitle(latest);
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
    <strong>${escapeHtml(editorialTitle(item))}</strong>
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

  // A deliberate opt-in from the welcome offer or any notification control is remembered.
  localStorage.setItem("hadashota.notificationPromptChoice", "accepted");

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
  const title = editorialTitle(item);
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

  if (previous && previous !== fingerprint && !state.dataDelayed) {
    recordLeadHistory(entry, fingerprint);
    notifyHeadlineChange(entry);
  } else if (!previous) {
    recordLeadHistory(entry, fingerprint);
  }
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
  if (el.compactSettingToggle) el.compactSettingToggle.checked = state.compact;
  if (el.themeSettingToggle) el.themeSettingToggle.checked = document.documentElement.dataset.theme === "dark";
  if (el.showImagesToggle) el.showImagesToggle.checked = state.showImages;
  document.body.classList.toggle("hide-feed-images", !state.showImages);
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

function setTheme(isDark) {
  if (isDark) {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("hadashota.theme", "dark");
  } else {
    delete document.documentElement.dataset.theme;
    localStorage.setItem("hadashota.theme", "light");
  }
  syncTheme();
  syncControlsFromState();
}

function resetDisplayPreferences() {
  state.hours = 1;
  state.category = "all";
  state.kind = "all";
  state.compact = false;
  state.showImages = true;
  state.cluster = true;
  state.autoRefresh = true;
  state.notificationsEnabled = false;
  [
    ["hadashota.hours", "1"],
    ["hadashota.category", "all"],
    ["hadashota.kind", "all"],
    ["hadashota.compact", "0"],
    ["hadashota.showImages", "1"],
    ["hadashota.cluster", "1"],
    ["hadashota.autoRefresh", "1"],
    ["hadashota.headlineNotifications", "0"],
    ["hadashota.theme", "light"]
  ].forEach(([key, value]) => localStorage.setItem(key, value));
  delete document.documentElement.dataset.theme;
  syncTheme();
  syncControlsFromState();
  restartAutoRefresh();
  render();
  showToast("העדפות התצוגה אופסו לברירת המחדל");
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
  localStorage.setItem("hadashota.hours", "1");
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
  const now = Date.now();
  const recentCutoff = now - 45 * 60 * 1000;
  const previousCutoff = now - 3 * 60 * 60 * 1000;
  const recent = new Map();
  const previous = new Map();
  const stop = new Set(["ישראל", "ישראלי", "חדשות", "דיווח", "עדכון", "עכשיו", "היום", "אחרי", "לפני", "בעקבות", "במהלך", "ראשוני", "אמר", "אומר", "כוחות", "הודעה", "המשטרה", "צה״ל", "של", "את", "על", "עם", "לא", "גם", "כי", "זה", "זו", "כל"]);
  for (const item of state.items) {
    const when = Date.parse(item.latestReportAt || item.publishedAt);
    if (!Number.isFinite(when) || when < previousCutoff) continue;
    const words = String(item.title || "").replace(/https?:\/\/\S+/g, " ").match(/[\u0590-\u05FF]{3,}/g) || [];
    const unique = new Set(words.map(clientCanonicalToken).filter((word) => !stop.has(word) && word.length >= 3));
    for (const word of unique) {
      if (when >= recentCutoff) recent.set(word, (recent.get(word) || 0) + 1);
      else previous.set(word, (previous.get(word) || 0) + 1);
    }
  }
  const topics = [...new Set([...recent.keys(), ...previous.keys()])]
    .map((topic) => {
      const r = recent.get(topic) || 0, p = previous.get(topic) || 0;
      const momentum = r * 2.2 - p * 0.45;
      return { topic, count: r + p, r, p, momentum };
    })
    .filter((x) => x.count >= 2 && (x.r >= 1 || x.count >= 4))
    .sort((a, b) => b.momentum - a.momentum || b.count - a.count)
    .slice(0, 7);
  if (!topics.length) { el.trendingStrip.classList.add("hidden"); return; }
  el.trendingTopics.innerHTML = topics.map(({topic,count,r,p}) => {
    const direction = r > Math.max(1, p / 3) ? "↑" : r === 0 ? "↓" : "→";
    return `<button type="button" data-topic="${escapeHtml(topic)}"><span>${escapeHtml(topic)}</span> <small>${direction} ${count}</small></button>`;
  }).join("");
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


function storyTimelineReports(item, limit = 6) {
  return normalizeClusterUpdates(item)
    .filter((r) => r?.publishedAt && r?.sourceName)
    .sort((a,b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt))
    .slice(-limit);
}

function storyHotScore(item) {
  if (!item) return 0;
  if (Number.isFinite(Number(item.hotScore))) return Math.max(0, Math.min(100, Math.round(Number(item.hotScore))));
  const reports = normalizeClusterReports(item);
  const latestMs = Date.parse(clusterLatestAt(item) || 0);
  const age = Number.isFinite(latestMs) ? Math.max(0, (Date.now() - latestMs) / 60000) : 999;
  const recent = reports.filter(r => Math.abs(latestMs - Date.parse(r.publishedAt || 0)) <= 120*60000);
  const count = recent.length;
  const times = recent.map(r => Date.parse(r.publishedAt || 0)).filter(Number.isFinite);
  const spread = times.length > 1 ? (Math.max(...times)-Math.min(...times))/60000 : 120;
  const official = recent.some(r => r.official);
  const verified = recent.filter(r => r.verified).length;
  const kindMix = new Set(recent.map(r => r.sourceKind)).size > 1;
  let score = Math.min(42, count * 8);
  score += age <= 5 ? 28 : age <= 15 ? 23 : age <= 30 ? 17 : age <= 60 ? 10 : age <= 120 ? 4 : 0;
  score += official ? 12 : 0;
  score += Math.min(8, verified * 2);
  score += kindMix ? 5 : 0;
  score += count >= 3 && spread <= 12 ? 8 : count >= 3 && spread <= 30 ? 4 : 0;
  if (age > 180) score -= Math.min(35, (age-180)/8);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function storyVerification(item) {
  const reports = normalizeClusterReports(item);
  const count = reports.length;
  const hasOfficial = reports.some(r => r.official);
  const verified = reports.filter(r => r.verified).length;
  let label = "בסיסית";
  if (count >= 5 || (count >= 3 && hasOfficial) || verified >= 4) label = "גבוהה";
  else if (count >= 3 || hasOfficial || verified >= 2) label = "בינונית";
  return { label, hasOfficial, count, verified };
}

function annotateStoryIntelligence() {
  for (const item of state.items) {
    item.hotScore = storyHotScore({ ...item, hotScore: undefined });
    item.verification = storyVerification(item).label;
  }
}

function isImportantStory(item) {
  const reports = normalizeClusterReports(item);
  const age = Date.now() - Date.parse(clusterLatestAt(item) || 0);
  const official = reports.some(r => r.official);
  return storyHotScore(item) >= 55 || reports.length >= 3 || (official && age <= 3*60*60*1000);
}

function readLeadHistory() {
  try { return JSON.parse(localStorage.getItem("hadashota.leadHistory.v1") || "[]"); } catch { return []; }
}

function recordLeadHistory(entry, fingerprint) {
  if (!entry?.item || !fingerprint) return;
  const history = readLeadHistory();
  if (history[0]?.fingerprint === fingerprint) return;
  history.unshift({ fingerprint, at: Date.now(), title: cleanDisplayTitle(entry.item.title) });
  try { localStorage.setItem("hadashota.leadHistory.v1", JSON.stringify(history.slice(0, 30))); } catch {}
}

function renderSmartDashboard() {
  const hotStories = state.items.filter(i => storyHotScore(i) >= 60 && Date.now() - Date.parse(clusterLatestAt(i)||0) <= 3*60*60*1000);
  if (el.hotNowCount) el.hotNowCount.textContent = String(hotStories.length);
  if (el.importantOnlyBtn) {
    el.importantOnlyBtn.classList.toggle("active", state.importantOnly);
    el.importantOnlyBtn.setAttribute("aria-pressed", state.importantOnly ? "true" : "false");
    el.importantOnlyBtn.innerHTML = state.importantOnly ? "✓ מציג רק חשוב" : "רק חשוב";
  }
  if (el.sinceVisit && el.sinceVisitText) {
    if (state.lastVisitAt > 0) {
      const newItems = state.items.filter(i => Date.parse(clusterLatestAt(i)||0) > state.lastVisitAt).length;
      const leadChanges = readLeadHistory().filter(h => h.at > state.lastVisitAt).length;
      if (newItems || leadChanges) {
        el.sinceVisitText.textContent = `מאז הביקור האחרון: ${newItems} עדכונים חדשים${leadChanges ? ` · ${leadChanges} החלפות של הסיפור המרכזי` : ""}`;
        el.sinceVisit.classList.remove("hidden");
      } else el.sinceVisit.classList.add("hidden");
    } else el.sinceVisit.classList.add("hidden");
  }
}

function openQuickBrief() {
  if (!el.quickBriefModal || !el.quickBriefList) return;
  const items = [...state.items]
    .filter(i => Date.now() - Date.parse(clusterLatestAt(i)||0) <= 6*60*60*1000)
    .sort((a,b) => storyHotScore(b)-storyHotScore(a) || Date.parse(clusterLatestAt(b))-Date.parse(clusterLatestAt(a)))
    .slice(0,5);
  el.quickBriefList.innerHTML = items.map((item,index) => {
    const reports = normalizeClusterReports(item);
    const verification = storyVerification(item);
    const sourceNames = [...new Set(reports.map(r => r.sourceName || r.publisher).filter(Boolean))].slice(0,3);
    const url = safeUrl(item.url);
    return `<article class="brief-story-card">
      <div class="brief-rank">${index+1}</div>
      <div class="brief-copy">
        <h3>${escapeHtml(editorialTitle(item))}</h3>
        <div class="brief-meta">
          <span>${formatAge(clusterLatestAt(item))}</span>
          <span>${reports.length} מקורות</span>
          <span class="brief-verify">אימות ${verification.label}</span>
          <span class="brief-heat">חום ${storyHotScore(item)}/100</span>
        </div>
        ${sourceNames.length ? `<p>${escapeHtml(sourceNames.join(" · "))}</p>` : ""}
      </div>
      ${url !== "#" ? `<a class="brief-source-btn" href="${url}" target="_blank" rel="noopener noreferrer">למקור ↗</a>` : ""}
    </article>`;
  }).join("") || '<p class="brief-empty">עדיין אין מספיק עדכונים לבניית תקציר.</p>';
  openSiteModal(el.quickBriefModal, el.quickBriefBtn);
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
