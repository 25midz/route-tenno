// Proxy optionnel (Cloudflare Workers), seulement si les appels directs échouent (CORS).
// /dynamic/getProfileViewingData.php → profil public de DE ; tout le reste → api.warframestat.us.
export default {
  async fetch(request) {
    if (request.method !== "GET") return new Response("Méthode non autorisée", { status: 405 });
    const u = new URL(request.url);
    const isProfile = u.pathname === "/dynamic/getProfileViewingData.php";
    const target = (isProfile ? "https://content.warframe.com" : "https://api.warframestat.us") + u.pathname + u.search;
    const r = await fetch(target, { cf: { cacheTtl: isProfile ? 3600 : 60, cacheEverything: true } });
    const h = new Headers(r.headers);
    h.set("Access-Control-Allow-Origin", "*");
    return new Response(r.body, { status: r.status, headers: h });
  }
};
