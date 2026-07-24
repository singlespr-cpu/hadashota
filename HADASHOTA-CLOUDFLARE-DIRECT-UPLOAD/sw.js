const HADASHOTA_SW_VERSION = "13.0.0";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || "/";
  event.waitUntil((async () => {
    try {
      if (self.clients.openWindow) await self.clients.openWindow(targetUrl);
    } catch {
      if (self.clients.openWindow) await self.clients.openWindow("/");
    }
  })());
});
