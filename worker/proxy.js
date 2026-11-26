// Relais Cloudflare (Workers) pour Route Tenno. Il ajoute l'autorisation CORS que les navigateurs exigent.
// - /cdn/getProfileViewingData.php?playerId=…&platform=… → profil public officiel de DE (lecture seule)
// - tout le reste → api.warframestat.us (état du monde, tables de drop)
const PROFILE_HOSTS = {
  pc: "https://api.warframe.com",
  ps4: "https://api-ps4.warframe.com",
  xb1: "https://api-xb1.warframe.com",
  swi: "https://api-swi.warframe.com"
};

export default {
  async fetch(request) {
    const cors = { "Access-Control-Allow-Origin": "*" };
    if (request.method !== "GET") return new Response("Méthode non autorisée", { status: 405, headers: cors });
    const u = new URL(request.url);
    let target, ttl;
    if (u.pathname === "/cdn/getProfileViewingData.php") {
      const id = u.searchParams.get("playerId") || "";
      if (!/^[a-f0-9]{24}$/i.test(id)) return new Response(JSON.stringify({ error: "identifiant invalide" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
      const host = PROFILE_HOSTS[u.searchParams.get("platform")] || PROFILE_HOSTS.pc;
      target = `${host}/cdn/getProfileViewingData.php?playerId=${id}`;
      ttl = 3600;
    } else {
      target = "https://api.warframestat.us" + u.pathname + u.search;
      ttl = 60;
    }
    const r = await fetch(target, { cf: { cacheTtl: ttl, cacheEverything: true } });
    const h = new Headers(r.headers);
    h.set("Access-Control-Allow-Origin", "*");
    return new Response(r.body, { status: r.status, headers: h });
  }
};
