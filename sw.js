/* Service Worker für die Einkaufsliste
   - macht die App offline nutzbar
   - nimmt Dateien und Texte aus dem Android-Teilen-Menü an (share_target)
   - Updates: „Auf Nachfrage“ (Standard) behält die benutzte Version, bis du „Aktualisieren“ tippst –
     auch über einen Neustart der App hinweg. „Automatisch“ übernimmt neue Versionen sofort.
   Bei Änderungen an der App die Versionsnummer erhöhen, damit Handys die neue Version bekommen. */
const VERSION = "einkaufsliste-v37";
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
    return r ? (await r.text()) : "manual";
  } catch (e) { return "manual"; }
}
/* „served“ = die Version, die du gerade benutzt. Bei „Auf Nachfrage“ bleibt sie, bis du „Aktualisieren“ tippst –
   auch wenn der Browser die neue Version beim nächsten Start schon aktiviert hat. */
async function getServed() {
  try { const r = await (await caches.open(SETTINGS)).match("served"); return r ? await r.text() : ""; } catch (e) { return ""; }
}
async function setServed(v) {
  try { await (await caches.open(SETTINGS)).put("served", new Response(v)); } catch (e) {}
}
async function servedCache() {
  if ((await updateMode()) === "manual") {
    const sv = await getServed();
    if (sv && sv !== VERSION && await caches.has(sv)) return sv;
  }
  return VERSION;
}
async function cleanup(keep) {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k !== VERSION && k !== INBOX && k !== SETTINGS && k !== keep).map(k => caches.delete(k)));
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const c = await caches.open(VERSION);
    // frisch vom Server holen (nicht aus dem Browser-Zwischenspeicher), damit alle Dateien zur neuen Version passen
    await c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })));
    // Automatisch: neue Version sofort übernehmen. Auf Nachfrage: warten, bis du „Aktualisieren“ tippst.
    if ((await updateMode()) !== "manual") self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    let keep = "";
    if ((await updateMode()) === "manual") {
      let sv = await getServed();
      if (!sv) sv = (await caches.keys()).filter(k => /^einkaufsliste-v\d+$/.test(k) && k !== VERSION).pop() || "";   // Umstieg von älteren Versionen
      if (sv && sv !== VERSION && await caches.has(sv)) { keep = sv; await setServed(sv); }
    }
    if (!keep) await setServed(VERSION);
    await cleanup(keep);
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  const d = event.data || {};
  if (d.type === "skip-waiting") event.waitUntil(setServed(VERSION).then(() => self.skipWaiting()));
  if (d.type === "apply") event.waitUntil((async () => {          // neue Version ist schon aktiv, wurde aber noch zurückgehalten
    await setServed(VERSION); await cleanup("");
    if (event.source) event.source.postMessage({ type: "applied" });
  })());
  if (d.type === "version" && event.source) event.waitUntil((async () => {
    if ((await updateMode()) !== "manual" && (await getServed()) !== VERSION) { await setServed(VERSION); await cleanup(""); }   // auf Automatisch umgestellt: alte Version aufräumen
    event.source.postMessage({ type: "version", version: await servedCache(), latest: VERSION });
  })());
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
      const name = await servedCache(), cache = await caches.open(name);
      if ((await updateMode()) === "manual") {
        // Auf Nachfrage: immer die benutzte Version zeigen, neue kommt erst nach „Aktualisieren“
        const hit = await cache.match("./index.html");
        if (hit) return hit;
      }
      // Automatisch: erst Netz (neueste Fassung), ohne Netz aus dem Speicher
      try {
        const res = await fetch(req);
        if (res.ok && name === VERSION) cache.put("./index.html", res.clone());
        return res;
      } catch (e) {
        return (await cache.match("./index.html")) || Response.error();
      }
    })());
    return;
  }

  // Eigene Dateien: aus dem Speicher der benutzten Version (passend zur App-Seite), nur wenn sie fehlen aus dem Netz
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const name = await servedCache(), cache = await caches.open(name);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok && name === VERSION) cache.put(req, res.clone());
        return res;
      } catch (e) { return Response.error(); }
    })());
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
