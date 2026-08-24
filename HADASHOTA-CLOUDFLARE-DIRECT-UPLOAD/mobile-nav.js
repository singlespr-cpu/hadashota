(() => {
  "use strict";
  const reduceMotion = () => !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const smooth = () => reduceMotion() ? "auto" : "smooth";
  const isMobile = () => window.matchMedia?.("(max-width: 700px)")?.matches !== false;

  function visibleHeight(selector) {
    const node = document.querySelector(selector);
    if (!node) return 0;
    const style = getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") return 0;
    return Math.max(0, node.getBoundingClientRect().height || 0);
  }

  function topUiOffset(extra = 10) {
    // The main mobile UI has two sticky rows. Measure them instead of relying
    // on hard-coded pixels so navigation remains exact after future UI tweaks.
    return visibleHeight(".topbar") + visibleHeight(".news-nav") + extra;
  }

  function scrollToNode(node, { extra = 10, behavior = smooth() } = {}) {
    if (!node) return;
    const top = Math.max(0, node.getBoundingClientRect().top + window.scrollY - topUiOffset(extra));
    window.scrollTo({ top, behavior });
  }

  function revealTarget(node) {
    if (!node) return;
    node.classList.remove("kp-mobile-nav-target");
    // Force restart when the same shortcut is tapped twice.
    void node.offsetWidth;
    node.classList.add("kp-mobile-nav-target");
    window.setTimeout(() => node.classList.remove("kp-mobile-nav-target"), 1250);
  }

  function preciseReveal(node, extra = 10) {
    if (!node) return;
    scrollToNode(node, { extra });
    window.setTimeout(() => revealTarget(node), reduceMotion() ? 0 : 220);
  }

  function setCurrent(items, active) {
    items.forEach((item) => {
      const on = item === active;
      item.classList.toggle("is-active", on);
      if (on) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
  }

  function initHomeNav() {
    const nav = document.querySelector("#kpMobileAppNav");
    if (!nav) return;
    const items = [...nav.querySelectorAll(".kp-mobile-nav-item")];
    const byAction = (name) => nav.querySelector(`[data-kp-mobile-nav="${name}"]`);
    const home = byAction("home"), story = byAction("story"), updates = byAction("updates"), search = byAction("search"), more = byAction("more");
    const lead = document.querySelector("#leadStory");
    const feedColumn = document.querySelector(".feed-column");
    const feedTitle = document.querySelector("#feedTitle");
    const feed = document.querySelector("#feed");
    const searchInput = document.querySelector("#searchInput");
    const searchBox = searchInput?.closest(".search-box");
    const newDotHost = updates;
    const moreSheet = document.querySelector("#kpMobileMoreSheet");
    const moreBackdrop = document.querySelector("#kpMobileMoreBackdrop");
    let sheetOpen = false;
    let searchActive = false;
    const bootAt = Date.now();

    const closeMore = () => {
      if (!moreSheet || !moreBackdrop) return;
      moreSheet.hidden = true; moreBackdrop.hidden = true; sheetOpen = false;
      more?.setAttribute("aria-expanded", "false");
      updateActive();
    };
    const openMore = () => {
      if (!moreSheet || !moreBackdrop) return;
      moreSheet.hidden = false; moreBackdrop.hidden = false; sheetOpen = true;
      more?.setAttribute("aria-expanded", "true");
      setCurrent(items, more);
      syncNotificationState();
    };

    home?.addEventListener("click", () => {
      closeMore();
      window.scrollTo({ top: 0, behavior: smooth() });
      setCurrent(items, home);
    });

    story?.addEventListener("click", () => {
      closeMore();
      preciseReveal(lead, 10);
      setCurrent(items, story);
    });

    updates?.addEventListener("click", () => {
      closeMore();
      newDotHost?.classList.remove("has-new");
      // Aim at the heading, not the middle of the feed, so "כל העדכונים"
      // is the first thing visible under the sticky mobile headers.
      preciseReveal(feedTitle?.closest(".section-head") || feedColumn || feed, 10);
      setCurrent(items, updates);
    });

    search?.addEventListener("click", () => {
      closeMore();
      searchActive = true;
      setCurrent(items, search);
      searchBox?.classList.add("kp-mobile-search-focus");

      // IMPORTANT: focus synchronously inside the tap event. iOS/Safari and
      // Chrome mobile may refuse to open the keyboard if focus is delayed.
      try { searchInput?.focus({ preventScroll: true }); }
      catch { try { searchInput?.focus(); } catch {} }

      const target = searchBox || searchInput;
      const align = (behavior = smooth()) => scrollToNode(target, { extra: 10, behavior });
      requestAnimationFrame(() => align());
      // The visual viewport changes when the software keyboard opens. Re-align
      // once so the field remains fully visible rather than landing "near" it.
      window.setTimeout(() => align("auto"), 180);
      if (window.visualViewport) {
        const onResize = () => align("auto");
        window.visualViewport.addEventListener("resize", onResize, { once: true });
      }
    });

    more?.addEventListener("click", () => sheetOpen ? closeMore() : openMore());
    moreBackdrop?.addEventListener("click", closeMore);
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && sheetOpen) closeMore(); });

    searchInput?.addEventListener("blur", () => {
      searchActive = false;
      searchBox?.classList.remove("kp-mobile-search-focus");
      window.setTimeout(updateActive, 40);
    });

    const runExisting = (selector) => {
      closeMore();
      window.setTimeout(() => document.querySelector(selector)?.click(), 30);
    };

    document.querySelector("#kpMoreOref")?.addEventListener("click", () => {
      closeMore();
      const target = document.querySelector("#alertCenterCard") || document.querySelector("#alertCenter");
      // Wait one frame for the bottom sheet to be removed, then land the Oref
      // card immediately below both sticky header rows.
      requestAnimationFrame(() => preciseReveal(target, 8));
    });
    document.querySelector("#kpMoreNotifications")?.addEventListener("click", () => runExisting("#notificationsBtn"));
    document.querySelector("#kpMoreSupport")?.addEventListener("click", () => runExisting("#supportFloatBtn"));
    document.querySelector("#kpMoreAbout")?.addEventListener("click", () => runExisting("#aboutBtn"));

    function syncNotificationState() {
      const source = document.querySelector("#notificationsBtn");
      const target = document.querySelector("#kpMoreNotifications");
      const state = document.querySelector("#kpMoreNotificationsState");
      const enabled = source?.getAttribute("aria-pressed") === "true" || localStorage.getItem("hadashota.headlineNotifications") === "1";
      target?.classList.toggle("is-alerts-on", enabled);
      if (state) state.textContent = enabled ? "פעיל" : "כבוי";
    }
    const notificationsBtn = document.querySelector("#notificationsBtn");
    if (notificationsBtn) new MutationObserver(syncNotificationState).observe(notificationsBtn, { attributes: true, attributeFilter: ["aria-pressed", "class"] });
    syncNotificationState();

    function feedInView() {
      if (!feedColumn) return false;
      const r = feedColumn.getBoundingClientRect();
      return r.top < innerHeight * .72 && r.bottom > topUiOffset(0);
    }
    if (feed) {
      new MutationObserver(() => {
        if (Date.now() - bootAt < 7000 || feedInView()) return;
        newDotHost?.classList.add("has-new");
      }).observe(feed, { childList: true, subtree: true });
    }
    if (feedColumn && "IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > .14)) newDotHost?.classList.remove("has-new");
      }, { threshold: [.14] }).observe(feedColumn);
    }

    let raf = 0;
    function updateActive() {
      if (!isMobile() || sheetOpen || searchActive) return;
      if (window.scrollY < 180) { setCurrent(items, home); return; }
      const feedTop = feedColumn ? feedColumn.getBoundingClientRect().top : Infinity;
      if (feedTop <= Math.min(topUiOffset(20) + 70, innerHeight * .38)) { setCurrent(items, updates); return; }
      if (lead) {
        const r = lead.getBoundingClientRect();
        if (r.bottom > topUiOffset(0) || window.scrollY < (lead.offsetTop + lead.offsetHeight + 220)) { setCurrent(items, story); return; }
      }
      setCurrent(items, home);
    }
    window.addEventListener("scroll", () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; updateActive(); }); }, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    updateActive();
  }

  function initEscalationNav() {
    const nav = document.querySelector("#kpEscMobileAppNav");
    if (!nav) return;
    const dofek = nav.querySelector('[data-kp-mobile-nav="dofek"]');
    const alerts = nav.querySelector('[data-kp-mobile-nav="esc-alerts"]');
    const dot = alerts?.querySelector(".kp-mobile-alert-dot");
    const sync = () => {
      const enabled = localStorage.getItem("hadashota.headlineNotifications") === "1" && (typeof Notification === "undefined" || Notification.permission === "granted");
      dot?.classList.toggle("is-on", enabled);
      alerts?.setAttribute("aria-label", enabled ? "התראות פעילות — בדיקת מצב" : "הפעלת התראות");
    };
    dofek?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: smooth() }));
    alerts?.addEventListener("click", async () => {
      sync();
      const alreadyOn = localStorage.getItem("hadashota.headlineNotifications") === "1" && (typeof Notification === "undefined" || Notification.permission === "granted");
      if (alreadyOn) {
        if (typeof showToast === "function") showToast("ההתראות פעילות ✓");
        return;
      }
      if (typeof setEscPushOfferVisible === "function") { setEscPushOfferVisible(true); return; }
      const offer = document.querySelector("#escPushOffer"), backdrop = document.querySelector("#escPushBackdrop");
      if (offer) offer.hidden = false; if (backdrop) backdrop.hidden = false;
    });
    window.addEventListener("storage", sync);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) sync(); });
    sync();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => { initHomeNav(); initEscalationNav(); }, { once: true });
  else { initHomeNav(); initEscalationNav(); }
})();
