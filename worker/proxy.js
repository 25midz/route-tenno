// Relais Cloudflare (Workers) pour Route Tenno : relaie api.warframestat.us
// et ajoute l'autorisation CORS que les navigateurs exigent.
export default {
  async fetch(request) {
    if (request.method !== "GET") return new Response("Méthode non autorisée", { status: 405 });
    const u = new URL(request.url);
    const r = await fetch("https://api.warframestat.us" + u.pathname + u.search, {
      headers: { "User-Agent": "RouteTenno/1.0 (outil de fan, lecture seule)", "Accept": "application/json" },
      cf: { cacheTtl: 60, cacheEverything: true }
    });
    const h = new Headers(r.headers);
    h.set("Access-Control-Allow-Origin", "*");
    return new Response(r.body, { status: r.status, headers: h });
  }
};
