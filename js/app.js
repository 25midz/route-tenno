{
const PH = window.PH, API = window.TR_API, DROPS = window.DROPS || {};
const M = {};
window.O.forEach(o => M[o[0]] = { id:o[0], ph:o[1], t:o[2], mr:o[3], req:o[4], pr:o[5], h:o[6], why:o[7], how:o[8], q:o[9], auto:o[10] });
const L = Object.values(M);
const kids = {};
L.forEach(o => o.req.forEach(r => (kids[r] = kids[r] || []).push(o.id)));
const desc = id => { const s = new Set(), st = [...(kids[id] || [])]; while (st.length) { const k = st.pop(); if (!s.has(k)) { s.add(k); st.push(...(kids[k] || [])); } } return s.size; };

let S = { mr:0, done:{}, platform:"pc" };
try { const j = JSON.parse(localStorage.getItem("tennoRoute") || "null"); if (j) S = { ...S, ...j }; } catch (e) {}
const save = () => { try { localStorage.setItem("tennoRoute", JSON.stringify(S)); } catch (e) {} };
const isDone = o => o.auto ? S.mr >= o.auto : !!S.done[o.id];
const has = id => isDone(M[id]);
const reqOk = o => o.req.every(r => isDone(M[r]));
const avail = o => !isDone(o) && reqOk(o) && S.mr >= o.mr;
const fmtH = h => h < 1 ? "< 1 h" : "~" + h + " h";
const $ = id => document.getElementById(id);
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

function left(iso) {
  const ms = new Date(iso) - Date.now();
  if (!isFinite(ms)) return "";
  if (ms <= 0) return "terminé";
  const m = Math.round(ms / 60000), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60), mn = m % 60;
  return d ? `${d} j ${h} h` : h ? `${h} h ${String(mn).padStart(2, "0")}` : `${mn} min`;
}
const href = u => u.startsWith("w:") ? "https://wiki.warframe.com/w/Special:Search?search=" + encodeURIComponent(u.slice(2)) + "&go=Go" : u;
function markWithPrereqs(id) { const o = M[id]; if (o.auto) return; S.done[id] = true; o.req.forEach(markWithPrereqs); }
function score(o) { return o.pr * 2 + Math.min(desc(o.id), 10) * .6 - Math.min(o.h, 10) * .25; }

/* ---------- Parcours ---------- */
function card(o, i) {
  const n = desc(o.id), dr = DROPS[o.id];
  return `<article class="card frame${i === 0 ? " first" : ""}"><div class="tags">${i === 0 ? '<span class="tag hot">Priorité</span>' : ""}<span class="tag">${PH[o.ph].n}</span><span class="tag">${fmtH(o.h)}</span>${o.mr ? `<span class="tag">MR ${o.mr}+</span>` : ""}</div>
  <h3>${o.t}</h3><p class="why">${o.why}</p>${n ? `<p class="unl">Ouvre la voie à ${n} objectif${n > 1 ? "s" : ""} suivant${n > 1 ? "s" : ""}</p>` : ""}
  ${o.how && o.how.length ? `<ul class="links">${o.how.map(([t, u]) => `<li><a href="${esc(href(u))}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join("")}</ul>` : ""}
  ${dr ? `<div class="chips"><span class="m">Où farmer :</span>${dr.map(q => `<button class="chip" data-find="${esc(q)}">${esc(q)}</button>`).join("")}</div>` : ""}
  <div class="row">${o.auto ? `<button class="pri" data-mr="${o.auto}">J'ai atteint MR ${o.auto}</button>` : `<button class="pri" data-done="${o.id}">C'est fait</button>`}</div></article>`;
}

function renderRoute() {
  $("mrv").textContent = S.mr;
  const st = PH.map((p, i) => { const it = L.filter(o => o.ph === i), d = it.filter(isDone).length; return { p, i, d, n: it.length, pc: Math.round(d / it.length * 100) }; });
  const cur = st.findIndex(x => x.pc < 100);
  $("planets").innerHTML = st.map(x => `<div class="pl${x.i === cur ? " now" : ""}"><div class="ring" style="--p:${x.pc};--c:${x.p.c}"><i>${x.pc}%</i></div><strong>${x.p.n}</strong><small>${x.p.r} · ${x.d}/${x.n}</small></div>`).join("");
  const av = L.filter(avail).sort((a, b) => score(b) - score(a)).slice(0, 5);
  $("next").innerHTML = av.length ? av.map(card).join("") : '<p class="empty">Tout est validé : tu as atteint le level cap visé par ce guide.</p>';
  const lk = L.filter(o => !isDone(o) && reqOk(o) && S.mr < o.mr);
  $("mrlock").innerHTML = lk.length ? `<h3 style="margin:26px 0 8px">Prêt, mais il te faut un MR plus élevé</h3><p class="sub">${lk.map(o => `${o.t} (MR ${o.mr})`).join(" · ")}</p>` : "";
  $("all").innerHTML = PH.map((p, i) => `<div class="phase"><h3>${p.n} <small class="m">${p.r}</small></h3>${L.filter(o => o.ph === i).map(o => {
    const d = isDone(o), ok = reqOk(o) && S.mr >= o.mr, miss = o.req.filter(r => !has(r)).map(r => M[r].t);
    return `<div class="item${d ? " done" : ok ? "" : " lock"}"><input type="checkbox" id="c-${o.id}" data-tog="${o.id}" ${d ? "checked" : ""} ${o.auto ? "disabled" : ""}><div><label class="t" for="c-${o.id}">${o.t}</label><div class="m">${fmtH(o.h)}${o.mr ? ` · MR ${o.mr}+` : ""}${!d && miss.length ? ` · Avant : ${miss.join(", ")}` : ""}${o.auto ? " · se valide avec ton MR" : ""}</div></div></div>`;
  }).join("")}</div>`).join("");
  $("quiz").innerHTML = L.filter(o => o.q).map(o => `<label><input type="checkbox" data-q="${o.id}" ${isDone(o) ? "checked" : ""}>${o.q}</label>`).join("");
  $("plat").value = S.platform;
  $("qmr").value = S.mr;
  if (S.pid && !$("pname").value) $("pname").value = S.pid;
}

/* ---------- Aujourd'hui dans le jeu ---------- */
let WS = null;
const rewardStr = r => esc(r && (r.asString || r.itemString) || "");
const needRx = () => {
  const n = [];
  if (!has("react")) n.push("Catalyst", "Reactor", "Catalyseur", "Réacteur");
  if (!has("forma")) n.push("Forma");
  n.push("Exilus", "Nitain");
  return new RegExp(n.join("|"), "i");
};

function tiles(w) {
  const T = [], rx = needRx();
  const add = (pr, title, body, tag) => T.push({ pr, title, body, tag });

  const vt = w.voidTrader;
  if (vt && vt.active) add(has("fiss") ? 9 : 5, "Baro Ki'Teer est là", `${esc(vt.location)} · repart dans ${left(vt.expiry)}. Garde tes Ducats pour les mods Primed.${vt.inventory && vt.inventory.length ? `<details><summary>Inventaire (${vt.inventory.length})</summary><ul>${vt.inventory.slice(0, 40).map(i => `<li>${esc(i.item)} · ${esc(i.ducats)} ducats</li>`).join("")}</ul></details>` : ""}`, "Événement");
  else if (vt && vt.activation) add(1, "Prochaine venue de Baro", `Dans ${left(vt.activation)} · ${esc(vt.location)}`, "Bientôt");

  const al = (w.alerts || []).filter(a => a.mission);
  if (al.length) {
    const hot = al.some(a => rx.test(rewardStr(a.mission.reward)));
    add(hot ? 10 : 4, "Alertes en cours", `<ul>${al.map(a => { const r = rewardStr(a.mission.reward); return `<li${rx.test(r) ? ' class="hl"' : ""}>${r || "Récompense"} · ${esc(a.mission.node)} (${esc(a.mission.type)}) · ${left(a.expiry)}</li>`; }).join("")}</ul>`, hot ? "Utile pour toi" : "Alertes");
  }

  const inv = (w.invasions || []).filter(i => !i.completed);
  const invHot = inv.map(i => ({ i, r: [i.attacker && i.attacker.reward || i.attackerReward, i.defender && i.defender.reward || i.defenderReward].map(rewardStr).filter(Boolean) }))
    .filter(x => x.r.some(s => rx.test(s)));
  if (invHot.length) add(8, "Invasions intéressantes", `<ul>${invHot.slice(0, 6).map(x => `<li class="hl">${x.r.join(" / ")} · ${esc(x.i.node)}</li>`).join("")}</ul>`, "Utile pour toi");

  const fi = (w.fissures || []).filter(f => !f.expired && (f.active !== false));
  if (fi.length && has("junc")) {
    const sp = has("sp"), list = fi.filter(f => sp || !f.isHard).filter(f => !f.isStorm)
      .sort((a, b) => (b.isHard - a.isHard) || ((a.tierNum || 0) - (b.tierNum || 0))).slice(0, 10);
    add(avail(M.fiss) || avail(M.trade) ? 7 : 3, "Fissures du Néant", `<ul>${list.map(f => `<li>${f.isHard ? '<b class="sp">SP</b> ' : ""}${esc(f.tier)} · ${esc(f.missionType)} · ${esc(f.node)} · ${left(f.expiry)}</li>`).join("")}</ul>`, "Reliques");
  }

  if (has("ww") && w.sortie && w.sortie.variants) add(5, `Sortie du jour · ${esc(w.sortie.boss)}`, `<ul>${w.sortie.variants.map(v => `<li>${esc(v.missionType)} · ${esc(v.node)} · ${esc(v.modifier)}</li>`).join("")}</ul>Se termine dans ${left(w.sortie.expiry)}.`, "Quotidien");

  if (has("newwar") && w.archonHunt && w.archonHunt.missions) add(has("sp") ? 8 : 6, `Chasse aux Archontes · ${esc(w.archonHunt.boss)}`, `<ul>${w.archonHunt.missions.map(m => `<li>${esc(m.type)} · ${esc(m.node)}</li>`).join("")}</ul>Fragment d'Archonte garanti. Se termine dans ${left(w.archonHunt.expiry)}.`, "Hebdo");

  if (has("sp") && w.steelPath && w.steelPath.currentReward) add(4, "Boutique de Teshin", `Récompense tournante : ${esc(w.steelPath.currentReward.name)} (${esc(w.steelPath.currentReward.cost)} Acier essentiel) · change dans ${left(w.steelPath.expiry)}.`, "Steel Path");

  if (has("star") && w.arbitration && w.arbitration.node) add(4, "Arbitrage actuel", `${esc(w.arbitration.type)} · ${esc(w.arbitration.node)} · ${esc(w.arbitration.enemy)}. Défense et Survie sont les plus rentables en Essence Vitus.`, "Arbitrage");

  const nw = w.nightwave && w.nightwave.activeChallenges;
  if (nw && nw.length) add(3, "Défis Nightwave", `<ul>${nw.slice(0, 8).map(c => `<li>${esc(c.title)} · ${esc(c.desc)} <span class="m">(${esc(c.reputation)})</span></li>`).join("")}</ul>`, "Nightwave");

  const cy = [];
  if (w.cetusCycle) cy.push(`Cetus : ${w.cetusCycle.isDay ? "jour" : "<b>nuit</b> (Eidolons possibles)"} · ${left(w.cetusCycle.expiry)}`);
  if (w.vallisCycle) cy.push(`Orb Vallis : ${w.vallisCycle.isWarm ? "<b>chaud</b>" : "froid"} · ${left(w.vallisCycle.expiry)}`);
  if (w.cambionCycle) cy.push(`Cambion Drift : ${esc(w.cambionCycle.state || w.cambionCycle.active)} · ${left(w.cambionCycle.expiry)}`);
  if (cy.length) add(w.cetusCycle && !w.cetusCycle.isDay && has("amp") ? 7 : 2, "Cycles des zones ouvertes", `<ul>${cy.map(c => `<li>${c}</li>`).join("")}</ul>`, "Cycles");

  return T.sort((a, b) => b.pr - a.pr);
}

function renderToday(res) {
  const st = $("wsstate");
  if (!res || !res.data) {
    $("today").innerHTML = "";
    st.textContent = "Données en direct indisponibles" + (res && res.error ? ` (${res.error})` : "") + ". Sur un hébergement classique, c'est souvent un blocage CORS : voir le README.";
    return;
  }
  const t = tiles(res.data);
  $("today").innerHTML = t.length ? t.map(x => `<article class="card frame live"><div class="tags"><span class="tag${/Utile/.test(x.tag) ? " hot" : ""}">${x.tag}</span></div><h3>${x.title}</h3><div class="body">${x.body}</div></article>`).join("") : '<p class="empty">Rien de particulier pour ta progression en ce moment.</p>';
  const ago = Math.round((Date.now() - res.at) / 60000);
  st.textContent = `Mis à jour il y a ${ago < 1 ? "moins d'une minute" : ago + " min"}${res.stale ? " · connexion impossible, données en cache" : ""}.`;
}

async function loadWS(force) {
  $("wsstate").textContent = "Chargement de l'état du monde…";
  WS = await API.worldstate(S.platform, force);
  renderToday(WS);
}

/* ---------- Où farmer ---------- */
async function find(q) {
  q = q.trim(); if (!q) return;
  $("fq").value = q; view("farm");
  const out = $("fres");
  out.innerHTML = `<p class="m">Recherche de « ${esc(q)} »…</p>`;
  try {
    const list = await API.drops(q);
    if (!list.length) { out.innerHTML = `<p class="empty">Aucune source trouvée pour « ${esc(q)} ». Essaie le nom anglais de l'objet.</p>`; return; }
    out.innerHTML = `<table class="stack"><thead><tr><th>Objet</th><th>Où</th><th>Rareté</th><th class="n">Chance</th></tr></thead><tbody>${list.slice(0, 40).map(d => `<tr><td>${esc(d.item)}</td><td>${esc(d.place)}</td><td>${esc(d.rarity)}</td><td class="n">${d.chance ? esc(d.chance.toFixed(2)) + " %" : ""}</td></tr>`).join("")}</tbody></table>${list.length > 40 ? `<p class="m">40 meilleures sources sur ${list.length}.</p>` : ""}`;
  } catch (e) {
    out.innerHTML = `<p class="empty">Impossible de joindre les tables de drop (${esc(e.message || e)}).</p>`;
  }
}

/* ---------- Profil public ---------- */
// Lit la réponse brute de DE ou celle de warframestat.us, quelle que soit sa forme.
function findKey(obj, rx, depth = 0) {
  if (!obj || typeof obj !== "object" || depth > 3) return undefined;
  for (const k of Object.keys(obj)) if (rx.test(k)) return obj[k];
  for (const k of Object.keys(obj)) { const v = obj[k]; if (v && typeof v === "object" && !Array.isArray(v)) { const f = findKey(v, rx, depth + 1); if (f !== undefined) return f; } }
  return undefined;
}
const arr = v => Array.isArray(v) ? v : [];
function normProfile(raw) {
  const r = (raw && raw.Results && raw.Results[0]) || (raw && (raw.profile || raw.Profile)) || raw;
  const mr = Number(findKey(r, /^(playerlevel|masteryrank)$/i));
  const name = findKey(r, /^displayname$/i);
  const missions = arr(findKey(r, /^missions$/i)).map(m => ({
    tag: String(m.Tag ?? m.tag ?? m.node ?? m.uniqueName ?? m.name ?? ""),
    sp: m.Tier === 1 || m.tier === 1 || !!(m.steelPath || m.hardMode || m.isHard || m.hardModeComplete)
  })).filter(m => m.tag);
  const xp = arr(findKey(r, /^xpinfo$/i)).map(x => String(x.ItemType ?? x.itemType ?? x.uniqueName ?? (x.item && x.item.uniqueName) ?? "").toLowerCase());
  const syn = arr(findKey(r, /^syndicates$/i)).map(s => String(s.Tag ?? s.tag ?? s.name ?? s.uniqueName ?? "").toLowerCase());
  const guild = findKey(r, /^(guildname|guild|clan)$/i);
  const skills = findKey(r, /^playerskills$/i) || {};
  return { name: name ? String(name) : "", mr: isFinite(mr) ? mr : null, missions, xp, syn, guild: !!guild, skills };
}

// Déduit les objectifs validés. Chaque règle note sa raison pour que le joueur puisse vérifier.
function inferFromProfile(p) {
  const ids = new Set(), why = [];
  const hit = (id, reason) => { if (!ids.has(id)) { ids.add(id); why.push(reason); } };
  const syn = t => p.syn.some(s => s.includes(t));
  const xp = rx => p.xp.some(x => rx.test(x));
  if (p.guild) hit("clan", "Tu fais partie d'un clan");
  const nodes = new Set(p.missions.map(m => m.tag)), junc = p.missions.filter(m => /junction/i.test(m.tag)).length;
  if (p.missions.some(m => m.sp)) hit("sp", "Des missions Steel Path sont terminées : Star Chart complète et Steel Path débloquée");
  if (ids.has("sp")) ["mods", "react", "forma", "fiss"].forEach(id => ids.add(id)), why.push("Un joueur Steel Path a forcément ses mods de base, un Réacteur, un Catalyseur, des Forma et a déjà ouvert des fissures");
  if (nodes.size >= 230) hit("star", `${nodes.size} missions différentes terminées : Star Chart complète`);
  if (junc >= 9 || nodes.size >= 100) hit("junc2", "Star Chart ouverte au moins jusqu'à Uranus");
  else if (junc >= 3 || nodes.size >= 25) hit("junc", "Star Chart ouverte au moins jusqu'à Mars");
  if (nodes.size) hit("vor", "Le tutoriel est terminé");
  if (syn("cetus")) hit("cetus", "Réputation chez les Ostrons (Cetus)");
  if (syn("solaris")) hit("vallis", "Réputation à Fortuna (Orb Vallis)");
  if (syn("entrati") && !syn("entratilab")) hit("deimos", "Réputation chez les Entrati (Deimos)");
  if (syn("radiolegion") || syn("nightwave")) hit("nw", "Tu as joué la Nightwave");
  if (syn("zariman") || syn("kahl") || syn("entratilab") || syn("hex")) hit("newwar", "Réputation dans un contenu qui suit The New War (Zariman, Kahl, Cavia ou Höllvania)");
  if (syn("zariman")) hit("zar", "Réputation chez les Holdfasts (Zariman)");
  if (xp(/powersuits\/rhino\/rhino$/)) hit("rhino", "Rhino a déjà été monté");
  if (xp(/excaliburumbra/)) hit("story", "Excalibur Umbra possédé : The Sacrifice est terminée");
  if (xp(/kuvalich|\/kuva/)) hit("lich", "Une arme Kuva a déjà été montée");
  if (xp(/operatoramplifier/) && p.xp.some(x => /operatoramplifier/.test(x) && !/training|starter/.test(x))) hit("amp", "Un amplificateur a déjà été monté");
  const sk = Object.entries(p.skills);
  if (sk.some(([k, v]) => /space/i.test(k) && v > 0)) hit("rail", "Intrinsèques Railjack débloquées");
  if (sk.some(([k, v]) => /drifter/i.test(k) && v > 0)) hit("duviri", "Intrinsèques du Drifter débloquées : Duviri commencé");
  return { ids, why };
}

async function importProfile(id) {
  id = id.trim(); if (!id) return;
  const out = $("pres");
  out.innerHTML = `<p class="m">Lecture du profil public…</p>`;
  try {
    const p = normProfile(await API.profile(id, S.platform));
    if (p.mr === null && !p.missions.length && !p.xp.length) throw new Error("profil vide ou privé");
    const b = snap(), { ids, why } = inferFromProfile(p);
    if (p.mr !== null) S.mr = Math.max(0, Math.min(30, p.mr));
    ids.forEach(markWithPrereqs);
    S.pid = id;
    changed(b);
    out.innerHTML = `<div class="found"><p><b>${esc(p.name || "Profil trouvé")}</b>${p.mr !== null ? ` · MR ${esc(p.mr)}` : ""} · ${p.xp.length} objets montés</p>
      <ul>${why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
      <p class="m" style="margin-top:8px">Les quêtes, les mods, les Forma et l'Helminth n'apparaissent pas sur le profil public : complète-les ci-dessous puis valide.</p></div>`;
  } catch (e) {
    out.innerHTML = `<p class="empty">Impossible de lire ce profil (${esc(e.message || e)}). Vérifie l'identifiant et la plateforme. Si l'erreur est « Failed to fetch », il faut le relais Cloudflare (voir le README).</p>`;
  }
}

/* ---------- Interface ---------- */
let tt;
function toast(m) { const t = $("toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 3200); }
const snap = () => L.filter(avail).map(o => o.id);
function changed(before) {
  renderRoute(); if (WS) renderToday(WS); save();
  const now = L.filter(avail).map(o => o.id).filter(id => !before.includes(id));
  if (now.length) toast("Débloqué : " + now.map(id => M[id].t).join(", "));
}
function view(v) {
  document.querySelectorAll(".tabs button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === v));
  ["next", "farm", "all", "acc"].forEach(k => $("v-" + k).hidden = k !== v);
}
document.querySelectorAll(".tabs button").forEach(b => b.addEventListener("click", () => view(b.dataset.v)));
$("openQ").addEventListener("click", () => view("acc"));
document.body.addEventListener("click", e => {
  const d = e.target.closest("[data-done]"), m = e.target.closest("[data-mr]"), f = e.target.closest("[data-find]");
  if (d) { const b = snap(); markWithPrereqs(d.dataset.done); changed(b); }
  if (m) { const b = snap(); S.mr = Math.max(S.mr, +m.dataset.mr); changed(b); }
  if (f) find(f.dataset.find);
});
document.body.addEventListener("change", e => {
  const t = e.target.dataset.tog; if (!t) return; const b = snap();
  if (e.target.checked) markWithPrereqs(t); else delete S.done[t];
  changed(b);
});
const setMr = v => { const b = snap(); S.mr = Math.max(0, Math.min(30, v)); changed(b); };
$("mrm").addEventListener("click", () => setMr(S.mr - 1));
$("mrp").addEventListener("click", () => setMr(S.mr + 1));
$("plat").addEventListener("change", e => { S.platform = e.target.value; save(); loadWS(true); });
$("refresh").addEventListener("click", () => loadWS(true));
$("pf").addEventListener("submit", e => { e.preventDefault(); importProfile($("pname").value); });
$("ff").addEventListener("submit", e => { e.preventDefault(); find($("fq").value); });
$("saveQ").addEventListener("click", () => {
  const mr = parseInt($("qmr").value, 10); if (!isNaN(mr)) S.mr = Math.max(0, Math.min(30, mr));
  document.querySelectorAll("[data-q]").forEach(c => { if (c.checked) markWithPrereqs(c.dataset.q); });
  save(); renderRoute(); if (WS) renderToday(WS); view("next"); window.scrollTo({ top: 0, behavior: "smooth" }); toast("Objectifs recalculés");
});
$("reset").addEventListener("click", () => {
  const b = $("reset");
  if (b.dataset.sure) { S = { mr: 0, done: {}, platform: S.platform }; $("pres").innerHTML = ""; save(); renderRoute(); if (WS) renderToday(WS); b.textContent = "Tout remettre à zéro"; delete b.dataset.sure; toast("Progression effacée"); }
  else { b.dataset.sure = 1; b.textContent = "Confirmer la remise à zéro"; }
});

renderRoute();
if (!Object.keys(S.done).length && !S.mr) view("acc");
loadWS(false);
const refreshTimer = setInterval(() => loadWS(false), window.TR_CONFIG.refreshMinutes * 60000);
const clockTimer = setInterval(() => { if (WS) renderToday(WS); }, 30000);
}
