// Adresse de l'API. Si les appels directs sont bloqués par le navigateur (erreur CORS),
// déploie worker/proxy.js sur Cloudflare et mets ici l'adresse du worker.
window.TR_CONFIG = {
  api: "https://api.warframestat.us",
  // Profil public officiel de DE (lecture seule, par pseudo). Avec le proxy, mets ici l'adresse du worker.
  deContent: "https://content.warframe.com",
  language: "fr",
  refreshMinutes: 5
};
