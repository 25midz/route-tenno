// Accès aux données publiques (warframestat.us), avec cache local et délai maximal.
{
const C = window.TR_CONFIG;
const BASE = (C.proxy || C.api).replace(/\/$/, "");
const get = (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

async function getJSON(url, ms = 10000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctl.signal });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.json();
  } finally { clearTimeout(t); }
}

// État du monde complet pour une plateforme. Renvoie {data, at, stale, error}.
async function worldstate(platform, force) {
  const key = "tr-ws-" + platform;
  const c = get(key);
  if (!force && c && Date.now() - c.at < C.refreshMinutes * 60000) return { ...c, stale: false };
  try {
    const data = await getJSON(`${BASE}/${platform}/?language=${C.language}`);
    const v = { data, at: Date.now() };
    put(key, v);
    return { ...v, stale: false };
  } catch (e) {
    if (c) return { ...c, stale: true, error: String(e.message || e) };
    return { data: null, at: 0, stale: true, error: String(e.message || e) };
  }
}

// Recherche dans les tables de drop. Renvoie une liste [{item, place, rarity, chance}].
async function drops(query) {
  const key = "tr-drop-" + query.toLowerCase();
  const c = get(key);
  if (c && Date.now() - c.at < 24 * 3600000) return c.list;
  const raw = await getJSON(`${BASE}/drops/search/${encodeURIComponent(query)}`);
  const list = (Array.isArray(raw) ? raw : []).map(d => ({
    item: String(d.item ?? ""), place: String(d.place ?? ""),
    rarity: String(d.rarity ?? ""), chance: Number(d.chance ?? 0)
  })).sort((a, b) => b.chance - a.chance);
  put(key, { at: Date.now(), list });
  return list;
}

// Profil public par identifiant de compte (24 caractères), en lecture seule.
// DE ne permet plus la recherche par pseudo. Trop de requêtes, surtout avec un identifiant
// invalide, peuvent bloquer temporairement l'adresse IP : on valide le format, on met en cache
// une heure et on refuse de relancer la même requête moins d'une minute après un échec.
const ID_RX = /^[a-f0-9]{24}$/i;
async function profile(id, platform) {
  // Accepte un collage approximatif : guillemets, espaces, ou même toute la page user-data.
  const raw = String(id || "");
  const found = raw.match(/"user_id"\s*:\s*"([a-f0-9]{24})"/i) || raw.match(/\b([a-f0-9]{24})\b/i);
  id = found ? found[1] : raw.trim().replace(/["'\s]/g, "");
  if (!ID_RX.test(id)) throw new Error(`ce n'est pas un identifiant de compte (reçu ${id.length} caractères, attendu 24 chiffres et lettres de a à f). Ce n'est pas ton pseudo`);
  const key = `tr-prof-${platform}-${id.toLowerCase()}`;
  const c = get(key);
  if (c && c.raw && Date.now() - c.at < 3600000) return c.raw;
  if (c && c.failAt && Date.now() - c.failAt < 60000) throw new Error("patiente une minute avant de réessayer");
  const url = C.proxy
    ? `${C.proxy.replace(/\/$/, "")}/cdn/getProfileViewingData.php?playerId=${id}&platform=${platform}`
    : `${C.profileApi[platform] || C.profileApi.pc}/cdn/getProfileViewingData.php?playerId=${id}`;
  try {
    const raw = await getJSON(url);
    if (!raw || typeof raw !== "object" || raw.error) throw new Error(raw && raw.error ? String(raw.error) : "réponse vide");
    put(key, { at: Date.now(), raw });
    return raw;
  } catch (e) {
    put(key, { failAt: Date.now() });
    throw e;
  }
}

window.TR_API = { worldstate, drops, profile };
}
