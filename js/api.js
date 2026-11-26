// Accès aux données publiques (warframestat.us), avec cache local et délai maximal.
{
const C = window.TR_CONFIG;
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
    const data = await getJSON(`${C.api}/${platform}/?language=${C.language}`);
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
  const raw = await getJSON(`${C.api}/drops/search/${encodeURIComponent(query)}`);
  const list = (Array.isArray(raw) ? raw : []).map(d => ({
    item: String(d.item ?? ""), place: String(d.place ?? ""),
    rarity: String(d.rarity ?? ""), chance: Number(d.chance ?? 0)
  })).sort((a, b) => b.chance - a.chance);
  put(key, { at: Date.now(), list });
  return list;
}

// Profil public par pseudo, en lecture seule (aucune connexion au compte).
// Essaie d'abord warframestat.us, puis le fichier public de DE. Cache d'une heure.
async function profile(name) {
  const key = "tr-prof-" + name.toLowerCase();
  const c = get(key);
  if (c && Date.now() - c.at < 3600000) return c.raw;
  const n = encodeURIComponent(name);
  const urls = [`${C.api}/profile/${n}`, `${C.deContent}/dynamic/getProfileViewingData.php?n=${n}`];
  let last;
  for (const u of urls) {
    try {
      const raw = await getJSON(u);
      if (raw && typeof raw === "object" && !raw.error) { put(key, { at: Date.now(), raw }); return raw; }
      last = new Error(raw && raw.error ? String(raw.error) : "réponse vide");
    } catch (e) { last = e; }
  }
  throw last || new Error("profil introuvable");
}

window.TR_API = { worldstate, drops, profile };
}
