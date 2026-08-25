// MYSONG AI V103 DIRECT UPLOAD FINAL · browser top-layer embed · isolated from page layout · /catalog explicitly disabled
(function() {
    const allowedPaths = [
        "/",
        "/about",
        "/faq",
        "/taklitia",
        "/contact",
        "/writer_area"
    ];

    const allowedDomains = [
        "www.mysong.co.il",
        "mysong.co.il",
        "localhost"
    ];

    const currentHostname = window.location.hostname;
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

    // חסימה קשיחה של הקטלוג וכל תת-נתיב שלו.
    if (currentPath === "/catalog" || currentPath.startsWith("/catalog/")) return;

    if (!allowedDomains.includes(currentHostname) || !allowedPaths.includes(currentPath)) {
        console.warn("MySong AI Widget is disabled on this specific page: " + currentPath);
        return;
    }

    // מניעת הטמעה כפולה במקרה שהסקריפט נטען יותר מפעם אחת באותו עמוד.
    const oldHost = document.getElementById('mysong-ai-widget-host');
    if (oldHost) {
        try {
            if (oldHost.matches && oldHost.matches(':popover-open') && oldHost.hidePopover) oldHost.hidePopover();
        } catch (_) {}
        oldHost.remove();
    }
    const oldLegacyMount = document.getElementById('mysong-ai-widget-mount');
    if (oldLegacyMount) oldLegacyMount.remove();

    const botOrigin = "https://bootmysong.singles-pr.workers.dev";
    const debugEnabled = new URLSearchParams(window.location.search).get("mysong-debug") === "1";
    const botUrl = botOrigin + (debugEnabled ? "/?v=103-final.1&debug=1" : "/?v=103-final.1");

    /*
     * IMPORTANT:
     * The host never participates in the website layout. On modern browsers it is promoted
     * to the browser Top Layer through the Popover API, so site stacking contexts cannot
     * cover it. Older browsers use the maximum practical z-index as a fallback.
     *
     * The full-viewport host itself never receives pointer events and clips all overflow.
     * Only the iframe is interactive. This prevents the widget from changing document
     * width/height or creating a horizontal page scrollbar.
     */
    const host = document.createElement('div');
    host.id = 'mysong-ai-widget-host';
    host.setAttribute('aria-hidden', 'false');
    host.setAttribute('popover', 'manual');
    host.style.cssText = [
        'all:initial!important',
        'display:block!important',
        'position:fixed!important',
        'top:0!important',
        'right:0!important',
        'bottom:0!important',
        'left:0!important',
        'width:auto!important',
        'height:auto!important',
        'min-width:0!important',
        'min-height:0!important',
        'max-width:none!important',
        'max-height:none!important',
        'margin:0!important',
        'padding:0!important',
        'border:0!important',
        'outline:0!important',
        'background:transparent!important',
        'overflow:hidden!important',
        'box-sizing:border-box!important',
        'pointer-events:none!important',
        'isolation:isolate!important',
        'z-index:2147483647!important',
        'direction:ltr!important',
        'color-scheme:normal!important'
    ].join(';');

    const shadow = host.attachShadow({ mode: 'closed' });
    const style = document.createElement('style');
    style.textContent = `
        :host {
            all: initial !important;
            display: block !important;
            position: fixed !important;
            inset: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            overflow: hidden !important;
            pointer-events: none !important;
            z-index: 2147483647 !important;
        }
        iframe {
            position: absolute !important;
            left: 0 !important;
            right: auto !important;
            bottom: 0 !important;
            top: auto !important;
            width: 140px !important;
            height: 140px !important;
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: 100% !important;
            max-height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            outline: 0 !important;
            display: block !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            background: transparent !important;
            pointer-events: auto !important;
            color-scheme: normal !important;
            z-index: 1 !important;
        }
    `;

    const iframe = document.createElement('iframe');
    iframe.src = botUrl;
    iframe.title = 'MySong AI - עוזרת מידע אוטומטית';
    iframe.setAttribute('allow', 'clipboard-write');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('frameborder', '0');
    iframe.sandbox = 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms';

    shadow.appendChild(style);
    shadow.appendChild(iframe);

    // Append directly to <html> when possible so BODY-specific transforms/overflow cannot own it.
    const mountTarget = document.documentElement || document.body;
    mountTarget.appendChild(host);

    // Prefer the browser Top Layer. This wins over ordinary page stacking contexts.
    // If Popover API is unavailable/fails, fixed + max z-index remains as fallback.
    try {
        if (typeof host.showPopover === 'function') host.showPopover();
    } catch (_) {}

    let isBotOpen = false;

    const updateWidgetSize = () => {
        if (isBotOpen) {
            iframe.style.setProperty('height', '100%', 'important');
            iframe.style.setProperty('top', '0', 'important');
            iframe.style.setProperty('bottom', 'auto', 'important');
            iframe.style.setProperty('left', '0', 'important');
            iframe.style.setProperty('right', 'auto', 'important');
            iframe.style.setProperty('width', window.innerWidth < 640 ? '100%' : '460px', 'important');
        } else {
            iframe.style.setProperty('width', '140px', 'important');
            iframe.style.setProperty('height', '140px', 'important');
            iframe.style.setProperty('top', 'auto', 'important');
            iframe.style.setProperty('right', 'auto', 'important');
            iframe.style.setProperty('left', '0', 'important');
            iframe.style.setProperty('bottom', '0', 'important');
        }
    };

    updateWidgetSize();

    window.addEventListener('message', function(event) {
        if (event.origin !== botOrigin || event.source !== iframe.contentWindow) return;
        if (event.data === 'mysong-bot-opened') {
            isBotOpen = true;
            updateWidgetSize();
        } else if (event.data === 'mysong-bot-closed') {
            isBotOpen = false;
            updateWidgetSize();
        }
    });

    window.addEventListener('resize', updateWidgetSize, { passive: true });

    // Some SPA/theme scripts may move or replace BODY nodes. Keep the top-layer host alive
    // without ever touching page dimensions or overflow styles.
    const ensureTopLayer = () => {
        if (!host.isConnected) {
            (document.documentElement || document.body).appendChild(host);
        }
        try {
            if (typeof host.showPopover === 'function' && !(host.matches && host.matches(':popover-open'))) {
                host.showPopover();
            }
        } catch (_) {}
    };

    // A light one-time re-check after page widgets finish booting.
    window.setTimeout(ensureTopLayer, 800);
    window.setTimeout(ensureTopLayer, 2500);
})();
