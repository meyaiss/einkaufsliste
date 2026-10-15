/* Service Worker für die Einkaufsliste
   - macht die App offline nutzbar
   - nimmt Dateien und Texte aus dem Android-Teilen-Menü an (share_target)
   - Updates: „Automatisch“ lädt neue Versionen sofort, „Auf Nachfrage“ wartet auf deinen Klick
   Bei Änderungen an der App die Versionsnummer erhöhen, damit Handys die neue Version bekommen. */
const VERSION = "einkaufsliste-v30";
const INBOX = "einkaufszettel-inbox";
const SETTINGS = "einkaufsliste-settings";   // hier legt die App die Update-Einstellung ab
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./vendor/zxing.min.js",
  "./vendor/qrcode.js",
  "./lang/en.js",
  "./manifest-en.webmanifest",
  "./vendor/fonts/atkinson-hyperlegible-latin-400-normal.woff2",
  "./vendor/fonts/atkinson-hyperlegible-latin-700-normal.woff2",
  "./vendor/fonts/barlow-condensed-latin-600-normal.woff2",
  "./vendor/fonts/barlow-condensed-latin-700-normal.woff2",
  "./icons/shortcut-add.png",
  "./icons/shortcut-shop.png"
];

async function updateMode() {
  try {
    const r = await (await caches.open(SETTINGS)).match("update-mode");
    return r ? (await r.text()) : "auto";
  } catch (e) { return "auto"; }
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    // Automatisch: neue Version sofort übernehmen. Auf Nachfrage: warten, bis du „Aktualisieren“ tippst.
    if ((await updateMode()) !== "manual") self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== INBOX && k !== SETTINGS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  const d = event.data || {};
  if (d.type === "skip-waiting") self.skipWaiting();
  if (d.type === "version" && event.source) event.source.postMessage({ type: "version", version: VERSION });
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  // Geteilte Datei aus WhatsApp (Android): ablegen und die App öffnen
  if (req.method === "POST" && url.pathname.endsWith("/share-target")) {
    event.respondWith(receiveShare(req));
    return;
  }
  if (req.method !== "GET") return;

  // App-Seite
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      if ((await updateMode()) === "manual") {
        // Auf Nachfrage: immer die installierte Version zeigen, neue kommt erst nach „Aktualisieren“
        const hit = await cache.match("./index.html");
        if (hit) return hit;
      }
      // Automatisch: erst Netz (neueste Fassung), ohne Netz aus dem Speicher
      try {
        const res = await fetch(req);
        if (res.ok) cache.put("./index.html", res.clone());
        return res;
      } catch (e) {
        return (await cache.match("./index.html")) || Response.error();
      }
    })());
    return;
  }

  // Eigene Dateien (Icons, Barcode-Erkennung): sofort aus dem Speicher, im Hintergrund aktualisieren
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(VERSION).then(cache => cache.match(req).then(hit => {
        const net = fetch(req).then(res => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        }).catch(() => hit);
        return hit || net;
      }))
    );
  }
});

async function receiveShare(req) {
  const back = new URL("./?shared=1", self.registration.scope).href;
  try {
    const form = await req.formData();
    const files = [];
    for (const f of form.getAll("files")) {
      if (f && typeof f.text === "function" && f.size < 1024 * 1024) {
        files.push({ name: f.name || "Einkaufsliste.txt", text: await f.text() });
      }
    }
    const text = ["title", "text", "url"].map(k => form.get(k)).filter(Boolean).join("\n");
    const inbox = await caches.open(INBOX);
    await inbox.put("inbox", new Response(JSON.stringify({ files, text }), { headers: { "Content-Type": "application/json" } }));
  } catch (e) { /* App öffnet sich trotzdem */ }
  return Response.redirect(back, 303);
}
