const HADASHOTA_SW_VERSION = "150.0.0";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});



// V123 — true Web Push. The push service wakes this Service Worker even when
// no Koteret Plus tab is open. The push itself is intentionally payload-free;
// the latest verified lead is fetched from our own Worker to avoid Web Push
// payload-encryption dependencies and keep the stack fully self-hosted.
async function readPushDeviceId() {
  try {
    const cache=await caches.open("koteret-plus-sw-meta-v1");
    const hit=await cache.match("/.__kp_device_id");
    return hit?await hit.text():"";
  } catch { return ""; }
}
async function writePushDeviceId(deviceId) {
  try {
    const cache=await caches.open("koteret-plus-sw-meta-v1");
    await cache.put("/.__kp_device_id",new Response(String(deviceId||""),{headers:{"Content-Type":"text/plain"}}));
  } catch {}
}

self.addEventListener("push", (event) => {
  event.waitUntil((async () => {
    try {
      const deviceId=await readPushDeviceId();
      const response = await fetch(`/api/push/notification${deviceId?`?deviceId=${encodeURIComponent(deviceId)}`:""}`, { cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json();
      if (!payload?.fingerprint || !payload?.title) return;

      await self.registration.showNotification(payload.title, {
        body: payload.body || "עדכון חדש מכותרת פלוס",
        tag: `koteret-${payload.kind||"push"}-${payload.fingerprint}`,
        renotify: true,
        requireInteraction: payload.kind === "escalation",
        icon: "/icon-192.png?v=150.0.0",
        badge: "/favicon-32.png?v=150.0.0",
        data: { url: payload.url || "/", fingerprint: payload.fingerprint, kind:payload.kind||"push" },
        timestamp: Date.parse(payload.at || payload.createdAt || "") || Date.now()
      });

      if (self.registration.setAppBadge) { try { await self.registration.setAppBadge(1); } catch {} }
    } catch (error) { console.warn("Background push display failed", error); }
  })());
});

self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil((async () => {
    try {
      const config = await fetch("/api/push/config", { cache: "no-store" }).then((r) => r.json());
      if (!config?.publicKey) return;
      const padding = "=".repeat((4 - config.publicKey.length % 4) % 4);
      const raw = atob((config.publicKey + padding).replace(/-/g, "+").replace(/_/g, "/"));
      const applicationServerKey = Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
      const subscription = await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: subscription.toJSON(), userAgent: "service-worker-resubscribe" })
      });
    } catch (error) {
      console.warn("Push resubscribe failed", error);
    }
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  try { self.registration.clearAppBadge?.(); } catch {}
  const targetUrl = event.notification?.data?.url || "/";
  event.waitUntil((async () => {
    try {
      if (self.clients.openWindow) await self.clients.openWindow(targetUrl);
    } catch {
      if (self.clients.openWindow) await self.clients.openWindow("/");
    }
  })());
});


self.addEventListener("message", (event) => {
  if (event.data?.type === "GET_VERSION") event.source?.postMessage?.({ type: "KOTERET_SW_VERSION", version: HADASHOTA_SW_VERSION });
  if (event.data?.type === "SET_PUSH_DEVICE_ID" && event.data?.deviceId) event.waitUntil?.(writePushDeviceId(event.data.deviceId));
});
