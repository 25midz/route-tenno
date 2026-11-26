// Réglages de Route Tenno.
window.TR_CONFIG = {
  // Données publiques de la communauté (état du monde, tables de drop).
  api: "https://api.warframestat.us",
  // Profil public officiel de DE, par plateforme (lecture seule, par identifiant de compte).
  profileApi: {
    pc: "https://api.warframe.com",
    ps4: "https://api-ps4.warframe.com",
    xb1: "https://api-xb1.warframe.com",
    swi: "https://api-swi.warframe.com"
  },
  // Adresse du relais Cloudflare (voir README). Laisse vide pour appeler les API directement.
  // Exemple : "https://route-tenno.tonpseudo.workers.dev"
  proxy: "",
  language: "fr",
  refreshMinutes: 5
};
