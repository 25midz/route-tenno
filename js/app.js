{
const PH = window.PH, TIERS = window.TIERS, API = window.TR_API, DROPS = window.DROPS || {};
const M = {}; window.OBJ.forEach(o => M[o.id] = o);
const L = window.OBJ;
const kids = {};
L.forEach(o => o.req.forEach(r => (kids[r] = kids[r] || []).push(o.id)));
const desc = id => { const s = new Set(), st = [...(kids[id] || [])]; while (st.length) { const k = st.pop(); if (!s.has(k)) { s.add(k); st.push(...(kids[k] || [])); } } return s.size; };

/* ---------- État du joueur (gardé dans le navigateur) ---------- */
let S = { mr: 0, done: {}, platform: "pc", quizDone: false, answers: {}, rdone: {} };
try { const j = JSON.parse(localStorage.getItem("tennoRoute2") || "null"); if (j) S = { ...S, ...j }; } catch (e) {}
const save = () => { try { localStorage.setItem("tennoRoute2", JSON.stringify(S)); } catch (e) {} };

const $ = id => document.getElementById(id);
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const href = u => u.startsWith("w:") ? "https://wiki.warframe.com/w/Special:Search?search=" + encodeURIComponent(u.slice(2)) + "&go=Go" : u;
const linkList = links => links && links.length ? `<ul class="links">${links.map(([t, u]) => `<li><a href="${esc(href(u))}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join("")}</ul>` : "";
const fmtH = h => h < 1 ? "< 1 h" : "~" + h + " h";
const isDone = o => o.autoMR ? S.mr >= o.autoMR : !!S.done[o.id];
const has = id => !!M[id] && isDone(M[id]);
const reqOk = o => o.req.every(r => isDone(M[r]));
const avail = o => !isDone(o) && reqOk(o) && S.mr >= o.mr;
function markWithPrereqs(id, into = S.done) { const o = M[id]; if (!o || o.autoMR) return; into[id] = true; o.req.forEach(r => markWithPrereqs(r, into)); }
const TW = { E: 4, R: 1.5, O: -2 };
const score = o => TW[o.tier] + o.prio * 1.5 + Math.min(desc(o.id), 10) * .5 - Math.min(o.hours, 10) * .2;
function left(iso) {
  const ms = new Date(iso) - Date.now();
  if (!isFinite(ms)) return "";
  if (ms <= 0) return "terminé";
  const m = Math.round(ms / 60000), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60), mn = m % 60;
  return d ? `${d} j ${h} h` : h ? `${h} h ${String(mn).padStart(2, "0")}` : `${mn} min`;
}
let tt;
function toast(m) { const t = $("toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 3200); }

/* ---------- Parcours ---------- */
function card(o, i) {
  const n = desc(o.id), dr = DROPS[o.id];
  return `<article class="card frame${i === 0 ? " first" : ""}"><div class="tags">${i === 0 ? '<span class="tag hot">Priorité</span>' : ""}<span class="tier ${o.tier}">${TIERS[o.tier]}</span><span class="tag">${PH[o.phase].n}</span><span class="tag">${fmtH(o.hours)}</span>${o.mr ? `<span class="tag">MR ${o.mr}+</span>` : ""}</div>
  <h3>${esc(o.title)}</h3><p class="why">${esc(o.why)}</p>${n ? `<p class="unl">Ouvre la voie à ${n} objectif${n > 1 ? "s" : ""} suivant${n > 1 ? "s" : ""}</p>` : ""}
  ${linkList(o.links)}
  ${dr ? `<div class="chips"><span class="m">Où farmer :</span>${dr.map(q => `<button class="chip" data-find="${esc(q)}">${esc(q)}</button>`).join("")}</div>` : ""}
  <div class="row">${o.autoMR ? `<button class="pri" data-mr="${o.autoMR}">J'ai atteint MR ${o.autoMR}</button>` : `<button class="pri" data-done="${o.id}">C'est fait</button>`}</div></article>`;
}

function renderRoute() {
  $("mrv").textContent = S.mr;
  const main = L.filter(o => o.tier !== "O");
  const st = PH.map((p, i) => { const it = main.filter(o => o.phase === i), d = it.filter(isDone).length; return { p, i, d, n: it.length, pc: it.length ? Math.round(d / it.length * 100) : 100 }; });
  const cur = st.findIndex(x => x.pc < 100);
  $("planets").innerHTML = st.map(x => `<div class="pl${x.i === cur ? " now" : ""}"><div class="ring" style="--p:${x.pc};--c:${x.p.c}"><i>${x.pc}%</i></div><strong>${x.p.n}</strong><small>${x.p.r} · ${x.d}/${x.n}</small></div>`).join("");

  const av = L.filter(o => avail(o) && o.tier !== "O").sort((a, b) => score(b) - score(a)).slice(0, 5);
  $("next").innerHTML = av.length ? av.map(card).join("") : '<p class="empty">Tous les objectifs essentiels et recommandés sont validés : monte tes armes, warframes, compagnons etc. pour grimper en MR.</p>';
  const lk = L.filter(o => !isDone(o) && reqOk(o) && S.mr < o.mr && !o.autoMR);
  $("mrlock").innerHTML = lk.length ? `<h3 style="margin:26px 0 8px">Prêt, mais il te faut un MR plus élevé</h3><p class="sub">${lk.map(o => `${esc(o.title)} (MR ${o.mr})`).join(" · ")}</p>` : "";
  const op = L.filter(o => avail(o) && o.tier === "O");
  $("optional").innerHTML = op.length ? `<div class="opt"><h3>Optionnel, si tu en as envie</h3><p class="m">Utile mais pas nécessaire pour progresser : fais-les seulement si ça t'intéresse.</p>${op.map(o => `<div class="item"><div><div class="t">${esc(o.title)}</div><div class="m">${esc(o.why)}</div></div>${o.autoMR ? "" : `<button data-done="${o.id}">C'est fait</button>`}</div>`).join("")}</div>` : "";

  $("all").innerHTML = PH.map((p, i) => `<div class="phase"><h3>${p.n} <small class="m">${p.r}</small></h3>${L.filter(o => o.phase === i).map(o => {
    const d = isDone(o), ok = reqOk(o) && S.mr >= o.mr, miss = o.req.filter(r => !has(r)).map(r => M[r].title);
    return `<div class="item${d ? " done" : ok ? "" : " lock"}"><input type="checkbox" id="c-${o.id}" data-tog="${o.id}" ${d ? "checked" : ""} ${o.autoMR ? "disabled" : ""}><div><label class="t" for="c-${o.id}">${esc(o.title)}</label> <span class="tier ${o.tier}">${TIERS[o.tier]}</span><div class="m">${fmtH(o.hours)}${o.mr ? ` · MR ${o.mr}+` : ""}${!d && miss.length ? ` · Avant : ${esc(miss.join(", "))}` : ""}${o.autoMR ? " · se valide avec ton MR" : ""}</div></div></div>`;
  }).join("")}</div>`).join("");
}

/* ---------- Le test de départ ---------- */
const Q = window.QUIZ;
let qi = 0, A = {}, gaugeMax = 0;
function quizHas(upTo) {
  const tmp = {};
  Q.slice(0, upTo).forEach(q => {
    const a = A[q.id];
    if (q.type === "single" && a !== undefined && q.options[a]) (q.options[a].ids || []).forEach(id => markWithPrereqs(id, tmp));
    if (q.type === "multi" && Array.isArray(a)) a.forEach(i => (q.options[i].ids || []).forEach(id => markWithPrereqs(id, tmp)));
  });
  return id => !!tmp[id];
}
const qVisible = i => !Q[i].show || Q[i].show(A, quizHas(i));
const visibleList = () => Q.map((q, i) => i).filter(qVisible);
const optVisible = (q, o, i) => !o.show || o.show(A, quizHas(i));
function cheer(pc) {
  if (pc < 25) return "C'est parti : quelques questions et ton plan est prêt.";
  if (pc < 55) return "Tu avances bien, continue !";
  if (pc < 85) return "Plus que quelques questions.";
  return "Dernière ligne droite !";
}

function renderQuiz() {
  const box = $("quiz");
  if (qi >= Q.length) return renderQuizEnd();
  if (!qVisible(qi)) { qi++; return renderQuiz(); }
  const vis = visibleList(), pos = vis.indexOf(qi), q = Q[qi];
  // La jauge ne recule jamais quand de nouvelles questions apparaissent.
  const pc = gaugeMax = Math.max(gaugeMax, Math.round(pos / vis.length * 100));
  let body = "";
  if (q.type === "mr") {
    const v = A.mr ?? S.mr ?? 0;
    body = `<div class="mrbig"><button data-mrq="-1" aria-label="Moins">−</button><b id="qmr">${v}</b><button data-mrq="1" aria-label="Plus">+</button></div>
      <div class="quick">${[0, 3, 5, 8, 10, 12, 14, 16].map(n => `<button data-mrset="${n}">${n === 16 ? "16+" : n}</button>`).join("")}</div>`;
  } else {
    const sel = A[q.id];
    body = `<div class="choices${q.type === "multi" ? " multi" : ""}">${q.options.map((o, i) => optVisible(q, o, qi) ? `<button class="choice" data-opt="${i}" aria-pressed="${q.type === "multi" ? (Array.isArray(sel) && sel.includes(i)) : sel === i}">${esc(o.label)}</button>` : "").join("")}</div>`;
  }
  const canNext = q.type === "mr" || (q.type === "multi" ? Array.isArray(A[q.id]) && A[q.id].length : A[q.id] !== undefined);
  box.innerHTML = `<div class="quiz frame">
    <div class="gauge" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}"><i style="width:${pc}%"></i></div>
    <div class="gmeta"><span>Question <b>${pos + 1}</b> · ${pc} %</span><span>${cheer(pc)}</span></div>
    <h2>${esc(q.title)}</h2><p class="sub">${esc(q.hint || "")}</p>
    ${body}
    <div class="qnav"><button id="qback" ${pos === 0 ? "disabled" : ""}>Retour</button>${q.type === "single" ? "" : `<button class="pri" id="qnext" ${canNext ? "" : "disabled"}>${pos === vis.length - 1 ? "Voir mon plan" : "Suivant"}</button>`}</div>
  </div>`;
  requestAnimationFrame(() => { const g = box.querySelector(".gauge i"); if (g) g.style.width = pc + "%"; });
}

function quizNext() {
  const vis = visibleList(), pos = vis.indexOf(qi);
  qi = pos + 1 < vis.length ? vis[pos + 1] : Q.length;
  if (qi >= Q.length) { applyQuiz(); document.body.classList.remove("onboarding"); renderQuizEnd(); toast("Objectifs calculés"); window.scrollTo({ top: 0 }); return; }
  renderQuiz();
}
function quizBack() { const vis = visibleList(), pos = vis.indexOf(qi); if (pos > 0) { qi = vis[pos - 1]; renderQuiz(); } }

function applyQuiz() {
  const done = {};
  Q.forEach((q, i) => {
    if (!qVisible(i)) return;
    const a = A[q.id];
    if (q.type === "single" && a !== undefined && q.options[a]) { const o = q.options[a]; (o.ids || []).forEach(id => markWithPrereqs(id, done)); if (o.platform) S.platform = o.platform; }
    if (q.type === "multi" && Array.isArray(a)) a.forEach(k => (q.options[k].ids || []).forEach(id => markWithPrereqs(id, done)));
  });
  S.done = done; S.mr = A.mr ?? S.mr; S.answers = A; S.quizDone = true; save();
}

function renderQuizEnd() {
  const main = L.filter(o => o.tier !== "O"), d = main.filter(isDone).length;
  const cur = PH.findIndex((p, i) => main.filter(o => o.phase === i).some(o => !isDone(o)));
  const next = L.filter(o => avail(o) && o.tier !== "O").sort((a, b) => score(b) - score(a))[0];
  $("quiz").innerHTML = `<div class="quiz frame done-q">
    <div class="gauge"><i style="width:100%"></i></div>
    <p class="big">Ton plan est prêt</p>
    <div class="summary"><div><b>MR ${S.mr}</b><span class="m">rang de maîtrise</span></div><div><b>${d}/${main.length}</b><span class="m">objectifs principaux validés</span></div><div><b>${cur >= 0 ? PH[cur].n : "Terminé"}</b><span class="m">ta phase actuelle</span></div></div>
    ${next ? `<p class="sub" style="margin:0 auto 18px">Ton prochain objectif : <b>${esc(next.title)}</b></p>` : ""}
    <div class="qnav" style="justify-content:center"><button class="pri" id="qgo">Voir mes objectifs</button><button id="qredo">Refaire le test</button></div>
  </div>`;
  renderAll();
}

function startQuiz() { A = {}; gaugeMax = 0; if (S.quizDone) A.mr = S.mr; qi = 0; renderQuiz(); }

$("quiz").addEventListener("click", e => {
  const q = Q[qi], t = e.target;
  const opt = t.closest("[data-opt]");
  if (opt && q) {
    const i = +opt.dataset.opt;
    if (q.type === "single") { A[q.id] = i; renderQuiz(); setTimeout(quizNext, 220); return; }
    let a = Array.isArray(A[q.id]) ? [...A[q.id]] : [];
    if (q.options[i].none) a = a.includes(i) ? [] : [i];
    else { a = a.filter(k => !q.options[k].none); a = a.includes(i) ? a.filter(k => k !== i) : [...a, i]; }
    A[q.id] = a; renderQuiz(); return;
  }
  const st = t.closest("[data-mrq]"), set = t.closest("[data-mrset]");
  if (st || set) { A.mr = Math.max(0, Math.min(30, set ? +set.dataset.mrset : (A.mr ?? S.mr ?? 0) + +st.dataset.mrq)); renderQuiz(); return; }
  if (t.closest("#qnext")) { if (q && q.type === "mr" && A.mr === undefined) A.mr = S.mr || 0; quizNext(); }
  if (t.closest("#qback")) quizBack();
  if (t.closest("#qgo")) { view("next"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  if (t.closest("#qredo")) startQuiz();
});

/* ---------- En jeu en ce moment ---------- */
let WS = null;
const rewardStr = r => esc(r && (r.asString || r.itemString) || "");
function needRx() {
  const n = [];
  if (!has("react")) n.push("Catalyst", "Reactor", "Catalyseur", "Réacteur");
  if (!has("forma")) n.push("Forma");
  n.push("Exilus", "Nitain");
  return new RegExp(n.join("|"), "i");
}
function tiles(w) {
  const T = [], rx = needRx(), add = (pr, title, body, tag) => T.push({ pr, title, body, tag });
  const al = (w.alerts || []).filter(a => a.mission);
  if (al.length) {
    const hot = al.some(a => rx.test(rewardStr(a.mission.reward)));
    add(hot ? 10 : 4, "Alertes en cours", `<ul>${al.map(a => { const r = rewardStr(a.mission.reward); return `<li${rx.test(r) ? ' class="hl"' : ""}>${r || "Récompense"} · ${esc(a.mission.node)} (${esc(a.mission.type)}) · ${left(a.expiry)}</li>`; }).join("")}</ul>`, hot ? "Utile pour toi" : "Alertes");
  }
  const invHot = (w.invasions || []).filter(i => !i.completed).map(i => ({ i, r: [i.attacker && i.attacker.reward || i.attackerReward, i.defender && i.defender.reward || i.defenderReward].map(rewardStr).filter(Boolean) })).filter(x => x.r.some(s => rx.test(s)));
  if (invHot.length) add(8, "Invasions intéressantes", `<ul>${invHot.slice(0, 6).map(x => `<li class="hl">${x.r.join(" / ")} · ${esc(x.i.node)}</li>`).join("")}</ul>`, "Utile pour toi");
  const fi = (w.fissures || []).filter(f => !f.expired && f.active !== false && !f.isStorm);
  if (fi.length && has("junc")) {
    const list = fi.filter(f => has("sp") || !f.isHard).sort((a, b) => (b.isHard - a.isHard) || ((a.tierNum || 0) - (b.tierNum || 0))).slice(0, 10);
    add(avail(M.fiss) ? 7 : 3, "Fissures du Néant", `<ul>${list.map(f => `<li>${f.isHard ? '<b class="sp">SP</b> ' : ""}${esc(f.tier)} · ${esc(f.missionType)} · ${esc(f.node)} · ${left(f.expiry)}</li>`).join("")}</ul>`, "Reliques");
  }
  if (has("star") && w.arbitration && w.arbitration.node) add(4, "Arbitrage actuel", `${esc(w.arbitration.type)} · ${esc(w.arbitration.node)} · ${esc(w.arbitration.enemy)}. Défense et Survie sont les plus rentables en Essence Vitus.`, "Arbitrage");
  const cy = [];
  if (w.cetusCycle) cy.push(`Cetus : ${w.cetusCycle.isDay ? "jour" : "<b>nuit</b> (Eidolons possibles)"} · ${left(w.cetusCycle.expiry)}`);
  if (w.vallisCycle) cy.push(`Orb Vallis : ${w.vallisCycle.isWarm ? "<b>chaud</b>" : "froid"} · ${left(w.vallisCycle.expiry)}`);
  if (w.cambionCycle) cy.push(`Cambion Drift : ${esc(w.cambionCycle.state || w.cambionCycle.active)} · ${left(w.cambionCycle.expiry)}`);
  if (cy.length) add(2, "Cycles des zones ouvertes", `<ul>${cy.map(c => `<li>${c}</li>`).join("")}</ul>`, "Cycles");
  return T.sort((a, b) => b.pr - a.pr);
}
function renderToday() {
  const st = $("wsstate");
  if (!WS || !WS.data) {
    $("today").innerHTML = "";
    st.textContent = "Données en direct indisponibles" + (WS && WS.error ? ` (${WS.error})` : "") + ". Vérifie l'adresse du relais dans js/config.js (voir le README).";
    return;
  }
  const t = tiles(WS.data);
  $("today").innerHTML = t.length ? t.map(x => `<article class="card frame live"><div class="tags"><span class="tag${/Utile/.test(x.tag) ? " hot" : ""}">${x.tag}</span></div><h3>${x.title}</h3><div class="body">${x.body}</div></article>`).join("") : '<p class="empty">Rien de particulier pour ta progression en ce moment.</p>';
  const ago = Math.round((Date.now() - WS.at) / 60000);
  st.textContent = `Mis à jour il y a ${ago < 1 ? "moins d'une minute" : ago + " min"}${WS.stale ? " · connexion impossible, données en cache" : ""}.`;
}
async function loadWS(force) {
  $("wsstate").textContent = "Chargement de l'état du monde…";
  WS = await API.worldstate(S.platform, force);
  renderToday(); renderRewards();
}

/* ---------- Récompenses périodiques ---------- */
const DAY = 86400000;
function periodStart(task) {
  const now = new Date(), d0 = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  if (task.id === "sortie") { const h = 16; const s = d0 + h * 3600000; return Date.now() >= s ? s : s - DAY; }
  if (task.cadence === "daily") return d0;
  if (task.cadence === "weekly") { const target = task.id === "icebind" ? 0 : 1, back = (now.getUTCDay() - target + 7) % 7; return d0 - back * DAY; }
  return Date.now() - (task.id === "varzia" ? 28 : 14) * DAY;
}
const taskDone = t => (S.rdone[t.id] || 0) >= periodStart(t);
const taskOpen = t => t.req.every(has);
const nameList = (arr, top, good) => `<ul>${arr.map(n => { const s = String(n); const isTop = top.some(x => s.toLowerCase().includes(x.toLowerCase())), isGood = good && good.some(x => s.toLowerCase().includes(x.toLowerCase())); return `<li>${isTop ? '<span class="star">★ ' + esc(s) + "</span> : priorité" : isGood ? esc(s) + " : bon choix" : esc(s)}</li>`; }).join("")}</ul>`;
function circuitChoices(cat) {
  const c = WS && WS.data && WS.data.duviriCycle && WS.data.duviriCycle.choices;
  if (!Array.isArray(c)) return null;
  const g = c.find(x => String(x.category || x.categoryKey || "").toLowerCase().includes(cat));
  return g && Array.isArray(g.choices) ? g.choices.map(String) : null;
}
function liveInfo(t) {
  const w = WS && WS.data; if (!w) return "";
  let h = "";
  if (t.live === "circuitSP") { const c = circuitChoices("hard"); h = c ? `<b>Cette semaine :</b>${nameList(c, window.INCARNON_TOP, window.INCARNON_GOOD)}` : `<b>À prendre en priorité quand elles passent :</b> ${esc(window.INCARNON_TOP.join(", "))}.`; }
  if (t.live === "circuit") { const c = circuitChoices("normal"); h = c ? `<b>Cette semaine :</b>${nameList(c, window.CIRCUIT_HARD_FRAMES)}<span class="m">★ = long à farmer autrement</span>` : `<b>Longs à farmer autrement :</b> ${esc(window.CIRCUIT_HARD_FRAMES.join(", "))}.`; }
  if (t.live === "archon" && w.archonHunt && w.archonHunt.boss) { const b = String(w.archonHunt.boss), k = Object.keys(window.ARCHON_SHARD).find(x => b.toLowerCase().includes(x)); h = `<b>Cette semaine :</b> ${esc(b)}${k ? ` · Fragment ${window.ARCHON_SHARD[k]}` : ""} · fin dans ${left(w.archonHunt.expiry)}${Array.isArray(w.archonHunt.missions) ? `<ul>${w.archonHunt.missions.map(m => `<li>${esc(m.type)} · ${esc(m.node)}</li>`).join("")}</ul>` : ""}`; }
  if (t.live === "sortie" && w.sortie && w.sortie.variants) h = `<b>Aujourd'hui :</b> ${esc(w.sortie.boss)} · fin dans ${left(w.sortie.expiry)}<ul>${w.sortie.variants.map(v => `<li>${esc(v.missionType)} · ${esc(v.node)} · ${esc(v.modifier)}</li>`).join("")}</ul>`;
  if (t.live === "teshin" && w.steelPath && w.steelPath.currentReward) { const r = w.steelPath.currentReward, um = /umbra/i.test(r.name || ""); h = `<b>Cette semaine :</b> ${um ? '<span class="star">★ ' + esc(r.name) + "</span> : à prendre" : esc(r.name)} (${esc(r.cost)} Acier essentiel) · change dans ${left(w.steelPath.expiry)}`; }
  if (t.live === "baro" && w.voidTrader) { const v = w.voidTrader; h = v.active ? `<b>Baro est là :</b> ${esc(v.location)} · repart dans ${left(v.expiry)}${Array.isArray(v.inventory) && v.inventory.length ? `<details><summary>Inventaire (${v.inventory.length})</summary><ul>${v.inventory.slice(0, 60).map(i => `<li>${/primed/i.test(i.item) ? '<span class="star">' + esc(i.item) + "</span>" : esc(i.item)} · ${esc(i.ducats)} ducats</li>`).join("")}</ul></details>` : ""}` : `<b>Prochaine venue :</b> dans ${left(v.activation)} · ${esc(v.location)}`; }
  if (t.live === "nightwave" && w.nightwave && Array.isArray(w.nightwave.activeChallenges)) { const c = w.nightwave.activeChallenges; h = `<b>Défis actifs :</b><ul>${c.slice(0, 8).map(x => `<li>${esc(x.title)} · ${esc(x.desc)} <span class="m">(${esc(x.reputation)})</span></li>`).join("")}</ul>`; }
  return h ? `<div class="liveinfo">${h}</div>` : "";
}
function renderRewards() {
  const only = $("onlyopen").checked, R = window.REWARDS;
  const groups = [["daily", "Chaque jour"], ["weekly", "Chaque semaine"], ["other", "Plus rarement"]];
  let total = 0, done = 0;
  $("rewards").innerHTML = groups.map(([cad, name]) => {
    const list = R.filter(t => t.cadence === cad && (!only || taskOpen(t)));
    if (!list.length) return "";
    const open = list.filter(taskOpen); total += open.length; done += open.filter(taskDone).length;
    return `<div class="rgroup"><h3>${name} <small>${open.filter(taskDone).length}/${open.length} faits</small></h3><div class="grid">${list.map(t => {
      const op = taskOpen(t), dn = op && taskDone(t);
      return `<article class="card frame task${dn ? " done" : ""}${op ? "" : " lock"}"><div class="tags"><span class="rank ${t.rank}">${t.rank}</span><span class="tag">${esc(t.reset)}</span></div>
        <h3>${esc(t.title)}</h3>
        <div><span class="lbl">Ce que tu gagnes</span>${esc(t.reward)}</div>
        <div><span class="lbl">Quoi choisir</span>${esc(t.tip)}</div>
        ${op ? liveInfo(t) : `<p class="m">Verrouillé · ${esc(t.unlockNote || "Avance dans le parcours pour le débloquer.")}</p>`}
        ${linkList(t.links)}
        ${op ? `<label class="chk"><input type="checkbox" data-rt="${t.id}" ${dn ? "checked" : ""}> Fait ${cad === "daily" ? "aujourd'hui" : cad === "weekly" ? "cette semaine" : ""}</label>` : ""}
      </article>`;
    }).join("")}</div></div>`;
  }).join("") || '<p class="empty">Rien de débloqué pour l\'instant : avance dans le parcours, les récompenses périodiques arrivent vite.</p>';
  $("rcount").textContent = total ? `${done}/${total} tâches faites sur la période` : "";
}

/* ---------- Où farmer ? ---------- */
async function find(q) {
  q = q.trim(); if (!q) return;
  $("fq").value = q; view("farm");
  const out = $("fres");
  out.innerHTML = `<p class="m">Recherche de « ${esc(q)} »…</p>`;
  try {
    const list = await API.drops(q);
    if (!list.length) { out.innerHTML = `<p class="empty">Aucune source trouvée pour « ${esc(q)} ». Essaie le nom anglais de l'objet.</p>`; return; }
    out.innerHTML = `<table class="stack"><thead><tr><th>Objet</th><th>Où</th><th>Rareté</th><th class="n">Chance</th></tr></thead><tbody>${list.slice(0, 40).map(d => `<tr><td>${esc(d.item)}</td><td>${esc(d.place)}</td><td>${esc(d.rarity)}</td><td class="n">${d.chance ? esc(d.chance.toFixed(2)) + " %" : ""}</td></tr>`).join("")}</tbody></table>${list.length > 40 ? `<p class="m">40 meilleures sources sur ${list.length}.</p>` : ""}`;
  } catch (e) { out.innerHTML = `<p class="empty">Impossible de joindre les tables de drop (${esc(e.message || e)}).</p>`; }
}

/* ---------- Interface ---------- */
const snap = () => L.filter(avail).map(o => o.id);
function renderAll() { renderRoute(); renderToday(); renderRewards(); }
function changed(before) {
  save(); renderAll();
  const now = L.filter(avail).map(o => o.id).filter(id => !before.includes(id));
  if (now.length) toast("Débloqué : " + now.map(id => M[id].title).join(", "));
}
function view(v) {
  document.querySelectorAll(".tabs button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === v));
  ["next", "rew", "farm", "all", "acc"].forEach(k => $("v-" + k).hidden = k !== v);
}
document.querySelectorAll(".tabs button").forEach(b => b.addEventListener("click", () => { view(b.dataset.v); if (b.dataset.v === "acc" && S.quizDone && qi >= Q.length) renderQuizEnd(); }));
document.body.addEventListener("click", e => {
  const d = e.target.closest("[data-done]"), m = e.target.closest("[data-mr]"), f = e.target.closest("[data-find]");
  if (d) { const b = snap(); markWithPrereqs(d.dataset.done); changed(b); }
  if (m) { const b = snap(); S.mr = Math.max(S.mr, +m.dataset.mr); changed(b); }
  if (f) find(f.dataset.find);
});
document.body.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.tog) { const b = snap(); if (t.checked) markWithPrereqs(t.dataset.tog); else delete S.done[t.dataset.tog]; changed(b); }
  if (t.dataset.rt) { if (t.checked) S.rdone[t.dataset.rt] = Date.now(); else delete S.rdone[t.dataset.rt]; save(); renderRewards(); }
});
const setMr = v => { const b = snap(); S.mr = Math.max(0, Math.min(30, v)); changed(b); };
$("mrm").addEventListener("click", () => setMr(S.mr - 1));
$("mrp").addEventListener("click", () => setMr(S.mr + 1));
$("refresh").addEventListener("click", () => loadWS(true));
$("onlyopen").addEventListener("change", renderRewards);
$("ff").addEventListener("submit", e => { e.preventDefault(); find($("fq").value); });

renderRoute(); renderRewards();
if (S.quizDone) { qi = Q.length; renderQuizEnd(); } else { document.body.classList.add("onboarding"); view("acc"); startQuiz(); }
loadWS(false);
const refreshTimer = setInterval(() => loadWS(false), window.TR_CONFIG.refreshMinutes * 60000);
const clockTimer = setInterval(() => { renderToday(); }, 30000);
}
