const HADASHOTA_SW_VERSION = "211.0.0";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});



// V170 — true payload-first Web Push. The push service wakes this Service Worker
// even when no Koteret Plus window is open. The encrypted payload already carries
// the compact notification title and the full newsroom headline; fetching /notification
// remains only a compatibility fallback.
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

const PUSH_DISPLAY_DEDUPE_MS=24*60*60*1000;
const PUSH_CONTENT_DEDUPE_MS=3*60*1000;
const pushDisplayClaims=new Set();
const pushContentClaims=new Set();
function pushContentSignature(payload={}){
  const kind=String(payload.kind||"push");
  const normalize=(value)=>String(value||"").toLowerCase().replace(/^[^\p{L}\p{N}]+/u,"").replace(/[^\p{L}\p{N}]+/gu," ").replace(/\s+/g," ").trim();
  // For hot stories ignore the compact "X sources" notification title. The
  // actual newsroom headline is the identity, so 3->4 sources cannot produce a
  // second visible notification for the same story.
  const raw=kind==="hot-story"?`${kind}|${normalize(payload.body)}|${payload.url||"/"}`:[kind,normalize(payload.title),normalize(payload.body),payload.url||"/"].join("|");
  let hash=2166136261;
  for(let i=0;i<raw.length;i++){hash^=raw.charCodeAt(i);hash=Math.imul(hash,16777619);}
  return `${raw.length}-${(hash>>>0).toString(36)}`;
}
function pushContentCacheRequest(signature){
  return new Request(`${self.location.origin}/.__kp_push_content/${encodeURIComponent(String(signature||"").slice(0,160))}`);
}
async function claimPushContent(payload){
  const signature=pushContentSignature(payload);
  if(!signature)return {ok:true,signature:""};
  if(pushContentClaims.has(signature))return {ok:false,signature};
  pushContentClaims.add(signature);
  try{
    const cache=await caches.open("koteret-plus-push-content-v1");
    const key=pushContentCacheRequest(signature),hit=await cache.match(key);
    if(hit){
      const at=Number(await hit.text());
      if(Number.isFinite(at)&&Date.now()-at<PUSH_CONTENT_DEDUPE_MS){pushContentClaims.delete(signature);return {ok:false,signature};}
    }
    await cache.put(key,new Response(String(Date.now()),{headers:{"Content-Type":"text/plain","Cache-Control":"no-store"}}));
    return {ok:true,signature};
  }catch{return {ok:true,signature};}
}
async function finishPushContentClaim(signature,shown=true){
  if(!signature)return;
  if(!shown){try{const cache=await caches.open("koteret-plus-push-content-v1");await cache.delete(pushContentCacheRequest(signature));}catch{}}
  pushContentClaims.delete(signature);
}
function pushDisplayCacheRequest(fingerprint){
  return new Request(`${self.location.origin}/.__kp_push_seen/${encodeURIComponent(String(fingerprint||"").slice(0,220))}`);
}
async function claimPushDisplay(fingerprint){
  const fp=String(fingerprint||"");
  if(!fp)return true;
  if(pushDisplayClaims.has(fp))return false;
  pushDisplayClaims.add(fp);
  try{
    const cache=await caches.open("koteret-plus-push-seen-v1");
    const key=pushDisplayCacheRequest(fp),hit=await cache.match(key);
    if(hit){
      const at=Number(await hit.text());
      if(Number.isFinite(at)&&Date.now()-at<PUSH_DISPLAY_DEDUPE_MS){pushDisplayClaims.delete(fp);return false;}
    }
    // Claim before showNotification so two near-simultaneous push events cannot
    // both pass the check. A failed display rolls the claim back below.
    await cache.put(key,new Response(String(Date.now()),{headers:{"Content-Type":"text/plain","Cache-Control":"no-store"}}));
    return true;
  }catch{return true;}
}
async function finishPushDisplayClaim(fingerprint,shown=true){
  const fp=String(fingerprint||"");
  if(!fp)return;
  if(!shown){try{const cache=await caches.open("koteret-plus-push-seen-v1");await cache.delete(pushDisplayCacheRequest(fp));}catch{}}
  pushDisplayClaims.delete(fp);
}

self.addEventListener("push", (event) => {
  event.waitUntil((async () => {
    try {
      const deviceId=await readPushDeviceId();
      let payload=null;
      // V200: the encrypted message uses the Declarative Web Push envelope.
      // Safari/iOS 18.4+ can therefore display the proposed notification even
      // if this JavaScript fails or is not available. Older browsers continue
      // through this handler, which normalizes the standard envelope back into
      // the site's existing payload shape.
      try{
        if(event.data){
          const raw=event.data.json();
          if(raw?.web_push===8030&&raw?.notification){
            const meta=raw?.koteret||{};
            let path=String(meta?.url||"/");
            if(!path.startsWith("/")){try{path=new URL(raw.notification.navigate,self.location.origin).pathname||"/";}catch{path="/";}}
            payload={fingerprint:String(meta?.fingerprint||""),kind:String(meta?.kind||"push"),title:String(raw.notification.title||""),body:String(raw.notification.body||""),url:path,at:meta?.at||new Date().toISOString()};
          }else payload=raw;
        }
      }catch{}
      if(!payload?.fingerprint||!payload?.title){
        const response = await fetch(`/api/push/notification${deviceId?`?deviceId=${encodeURIComponent(deviceId)}`:""}`, { cache: "no-store" });
        if (!response.ok) return;
        payload = await response.json();
      }
      if (!payload?.fingerprint || !payload?.title) return;
      if (!(await claimPushDisplay(payload.fingerprint))) return;
      const contentClaim=await claimPushContent(payload);
      if(!contentClaim.ok){await finishPushDisplayClaim(payload.fingerprint,true);return;}

      let shown=false;
      try {
        await self.registration.showNotification(payload.title, {
          body: payload.body || "עדכון חדש מכותרת פלוס",
          tag: payload.kind==="hot-story"?`koteret-hot-${contentClaim.signature}`:`koteret-${payload.kind||"push"}-${payload.fingerprint}`,
          renotify: payload.kind!=="hot-story",
          requireInteraction: payload.kind === "escalation",
          icon: "/icon-192.png?v=211.0.0",
          badge: "/favicon-32.png?v=211.0.0",
          data: { url: payload.url || "/", fingerprint: payload.fingerprint, kind:payload.kind||"push" },
          timestamp: Date.parse(payload.at || payload.createdAt || "") || Date.now()
        });
        shown=true;
        try { await fetch("/api/push/event",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"display",fingerprint:payload.fingerprint,deviceId})}); } catch {}
      } finally {
        await finishPushDisplayClaim(payload.fingerprint,shown);
        await finishPushContentClaim(contentClaim.signature,shown);
      }

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
  event.notification.close();
  try { self.registration.clearAppBadge?.(); } catch {}
  const targetUrl = event.notification?.data?.url || "/";
  const fingerprint=event.notification?.data?.fingerprint||"";
  event.waitUntil((async () => {
    try {
      if(fingerprint){const deviceId=await readPushDeviceId();await fetch("/api/push/event",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"click",fingerprint,deviceId})}).catch(()=>{});}
      const absolute=new URL(targetUrl,self.location.origin).href;
      const windows=await self.clients.matchAll({type:"window",includeUncontrolled:true});
      for(const client of windows){
        try{
          if(new URL(client.url).origin!==self.location.origin)continue;
          if("navigate" in client)await client.navigate(absolute);
          await client.focus();
          return;
        }catch{}
      }
      if (self.clients.openWindow) await self.clients.openWindow(absolute);
    } catch {
      if (self.clients.openWindow) await self.clients.openWindow("/");
    }
  })());
});


self.addEventListener("message", (event) => {
  if (event.data?.type === "GET_VERSION") event.source?.postMessage?.({ type: "KOTERET_SW_VERSION", version: HADASHOTA_SW_VERSION });
  if (event.data?.type === "SET_PUSH_DEVICE_ID" && event.data?.deviceId) event.waitUntil?.(writePushDeviceId(event.data.deviceId));
});
