(() => {
  "use strict";
  const reduceMotion = () => !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const smooth = () => reduceMotion() ? "auto" : "smooth";
  const isMobile = () => window.matchMedia?.("(max-width: 700px)")?.matches !== false;

  function scrollToNode(node, offset = 68) {
    if (!node) return;
    const top = Math.max(0, node.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({ top, behavior: smooth() });
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
    const feed = document.querySelector("#feed");
    const control = document.querySelector("#controlPanel");
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

    home?.addEventListener("click", () => { closeMore(); window.scrollTo({ top: 0, behavior: smooth() }); setCurrent(items, home); });
    story?.addEventListener("click", () => { closeMore(); scrollToNode(lead, 62); setCurrent(items, story); });
    updates?.addEventListener("click", () => { closeMore(); newDotHost?.classList.remove("has-new"); scrollToNode(feedColumn || feed, 64); setCurrent(items, updates); });
    search?.addEventListener("click", () => {
      closeMore(); searchActive = true; setCurrent(items, search); scrollToNode(control, 58);
      searchBox?.classList.add("kp-mobile-search-focus");
      window.setTimeout(() => { try { searchInput?.focus({ preventScroll: true }); } catch { searchInput?.focus(); } }, reduceMotion() ? 20 : 240);
    });
    more?.addEventListener("click", () => sheetOpen ? closeMore() : openMore());
    moreBackdrop?.addEventListener("click", closeMore);
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && sheetOpen) closeMore(); });

    searchInput?.addEventListener("blur", () => {
      searchActive = false; searchBox?.classList.remove("kp-mobile-search-focus"); window.setTimeout(updateActive, 40);
    });

    const runExisting = (selector) => {
      closeMore();
      window.setTimeout(() => document.querySelector(selector)?.click(), 30);
    };
    document.querySelector("#kpMoreOref")?.addEventListener("click", () => { closeMore(); scrollToNode(document.querySelector("#alertCenterCard"), 62); });
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
      return r.top < innerHeight * .72 && r.bottom > 110;
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
      if (feedTop <= Math.min(210, innerHeight * .34)) { setCurrent(items, updates); return; }
      if (lead) {
        const r = lead.getBoundingClientRect();
        if (r.bottom > 90 || window.scrollY < (lead.offsetTop + lead.offsetHeight + 220)) { setCurrent(items, story); return; }
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
