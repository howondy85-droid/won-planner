// 앱 화면(HTML)과 Firebase 라이브러리를 기기에 보관해서, 인터넷이 약해도 앱이 열리도록 합니다.
// 데이터(업무·노트)는 Firestore가 따로 기기에 저장·동기화합니다.
const CACHE = "wonsabu-planner-v1";
const SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const sdk = url.hostname === "www.gstatic.com" && url.pathname.startsWith("/firebasejs/");
  const dnd = url.hostname === "cdn.jsdelivr.net" && url.pathname.includes("mobile-drag-drop");
  if (!sameOrigin && !sdk && !dnd) return; // 로그인·Firestore 통신은 건드리지 않음
  // 네트워크 우선 → 실패하면 보관본 사용 (새 버전이 올라가면 바로 반영)
  e.respondWith(
    fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((r) => r || (req.mode === "navigate" ? caches.match("./index.html") : Response.error())))
  );
});
