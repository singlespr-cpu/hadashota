const HADASHOTA_SW_VERSION = "157.0.0";

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
        icon: "/icon-192.png?v=157.0.0",
        badge: "/favicon-32.png?v=157.0.0",
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
      const deviceId=await readPushDeviceId();
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: subscription.toJSON(), deviceId, userAgent: self.navigator?.userAgent || "service-worker-resubscribe" })
      });
    } catch (error) {
      console.warn("Push resubscribe failed", error);
    }
  })());
});

self.addEventListener("notificationclick", (event) => {
  const meta = event.notification?.data || {};
  event.notification.close();
  event.waitUntil((async()=>{
    try {
      const deviceId = await readPushDeviceId();
      await fetch("/api/push/click", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({fingerprint:meta.fingerprint||"",kind:meta.kind||"push",deviceId}), keepalive:true });
    } catch {}
    const url = meta.url || "/";
    const allClients = await clients.matchAll({ type:"window", includeUncontrolled:true });
    for (const client of allClients) {
      try { if ("focus" in client) { await client.focus(); if ("navigate" in client) await client.navigate(url); return; } } catch {}
    }
    if (clients.openWindow) await clients.openWindow(url);
  })());
});



self.addEventListener("message", (event) => {
  if (event.data?.type === "GET_VERSION") event.source?.postMessage?.({ type: "KOTERET_SW_VERSION", version: HADASHOTA_SW_VERSION });
  if (event.data?.type === "SET_PUSH_DEVICE_ID" && event.data?.deviceId) event.waitUntil?.(writePushDeviceId(event.data.deviceId));
});
