// RÉCOMPENSES PÉRIODIQUES : ce qui se refait chaque jour, chaque semaine ou plus rarement.
// Chaque tâche :
//   id, title, cadence ("daily", "weekly", "other"), reset (texte affiché)
//   rank       "Incontournable", "Conseillé" ou "Optionnel"
//   reward     ce que tu gagnes ; tip = quoi choisir ou comment s'y prendre
//   req        objectifs du parcours à avoir validés (sinon la tâche est affichée comme verrouillée)
//   unlockNote texte affiché quand la tâche est verrouillée
//   live       facultatif : donnée en direct à afficher ("circuit", "circuitSP", "archon", "sortie", "teshin", "baro", "nightwave")
//   links      [libellé, adresse] ou [libellé, "w:Page du wiki"]
// Heures en UTC : en France, ajoute 1 h en hiver et 2 h en été.

// Adaptateurs Incarnon à prendre en priorité dans le Circuit Steel Path (mis à jour : novembre 2026, mise à jour 44.1).
window.INCARNON_TOP = ["Torid", "Latron", "Lex", "Braton", "Boar", "Burston", "Hate", "Okina", "Dual Toxocyst"];
window.INCARNON_GOOD = ["Strun", "Furis", "Magistar", "Ceramic Dagger", "Nami Solo", "Dread", "Sybaris", "Paris", "Lato", "Angstrum", "Ballistica"];
// Warframes longues à farmer autrement : à privilégier dans le Circuit normal si tu ne les as pas.
window.CIRCUIT_HARD_FRAMES = ["Ivara", "Nidus", "Khora", "Revenant", "Gara", "Harrow", "Octavia"];
// Couleur du Fragment selon l'Archonte de la semaine.
window.ARCHON_SHARD = { amar: "Écarlate (Crimson)", nira: "Ambre (Amber)", boreal: "Azur (Azure)" };

window.REWARDS = [
  /* ---------- Chaque jour ---------- */
  { id: "nw-daily", cadence: "daily", reset: "00:00 UTC", rank: "Incontournable",
    title: "Défis Nightwave du jour",
    reward: "1 000 points Nightwave par défi (jusqu'à 3 actifs, chacun dure 3 jours).",
    tip: "Dans la boutique Nightwave, prends d'abord les Catalyseurs, Réacteurs et adaptateurs Exilus. Les mods Augment de la saison se revendent bien une fois la saison terminée.",
    req: ["vor"], live: "nightwave", links: [["Wiki : Nightwave", "w:Nightwave"]] },

  { id: "sortie", cadence: "daily", reset: "16:00 UTC (17:00 UTC en hiver)", rank: "Conseillé",
    title: "Sortie du jour",
    reward: "Une récompense tirée au sort : Riven, plan de Catalyseur ou de Réacteur, plan de Forma, Kuva…",
    tip: "Pas de choix à faire : la récompense est aléatoire. Trois missions d'environ 20 minutes au total, presque toujours rentable.",
    req: ["ww"], unlockNote: "Après la quête The War Within.", live: "sortie",
    links: [["Wiki : Sortie", "w:Sortie"]] },

  { id: "incursions", cadence: "daily", reset: "00:00 UTC", rank: "Incontournable",
    title: "Incursions Steel Path",
    reward: "De l'Acier essentiel, la monnaie de Teshin.",
    tip: "Ce sont des missions courtes repérées sur la Star Chart en Steel Path. L'Acier essentiel achète l'Umbra Forma, les adaptateurs d'arcane et d'autres raccourcis chez Teshin.",
    req: ["sp"], unlockNote: "Après avoir débloqué la Steel Path.",
    links: [["Wiki : The Steel Path", "w:The Steel Path"], ["Wiki : Steel Essence", "w:Steel Essence"]] },

  { id: "standing", cadence: "daily", reset: "00:00 UTC", rank: "Conseillé",
    title: "Plafond de réputation des syndicats",
    reward: "16 000 points de réputation par syndicat et par jour, + 500 par rang de maîtrise.",
    tip: "Concentre-toi sur les syndicats qui débloquent quelque chose pour toi : Entrati (Helminth), Holdfasts (Zariman), Cavia (Netracells, Fragments d'Archonte).",
    req: ["vor"], links: [["Wiki : Syndicates", "w:Syndicates"]] },

  { id: "acrithis", cadence: "daily", reset: "00:00 UTC", rank: "Optionnel",
    title: "Acrithis (Duviri)",
    reward: "Un Arcane ou une scène Captura différents chaque jour, à acheter.",
    tip: "Jette un œil en passant : si l'Arcane du jour fait partie de tes builds, achète-le.",
    req: ["duviri"], unlockNote: "Après The Duviri Paradox, avec le rang 9 de l'arbre Opportunité du Drifter.",
    links: [["Wiki : Acrithis", "w:Acrithis"]] },

  /* ---------- Chaque semaine (lundi 00:00 UTC sauf mention) ---------- */
  { id: "archon", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Incontournable",
    title: "Chasse aux Archontes",
    reward: "Un Fragment d'Archonte garanti (parfois Tauforgé), dont la couleur dépend de l'Archonte de la semaine.",
    tip: "Toujours la faire, c'est la source la plus fiable de Fragments. Mets-les d'abord sur ton Warframe principal : l'Écarlate renforce surtout la puissance et les dégâts, l'Azur la survie.",
    req: ["newwar"], unlockNote: "Après The New War et la quête Veilbreaker.", live: "archon",
    links: [["Wiki : Archon Hunt", "w:Archon Hunt"], ["Wiki : Archon Shard", "w:Archon Shard"]] },

  { id: "circuit-sp", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Incontournable",
    title: "Circuit Steel Path (Duviri) : adaptateurs Incarnon",
    reward: "Deux adaptateurs Incarnon Genesis par semaine, choisis parmi cinq : le premier au palier 5, le second au palier 10.",
    tip: "Choisis d'abord les armes listées en priorité ci-dessous, puis celles que tu possèdes déjà et aimes jouer. L'adaptateur s'installe chez Cavalero (Zariman). Les cinq armes changent chaque semaine selon un cycle de 9 semaines.",
    req: ["sp", "duviri", "zar"], unlockNote: "Après The Duviri Paradox, Angels of the Zariman et la Steel Path.", live: "circuitSP",
    links: [["Wiki : The Circuit", "w:The Circuit"], ["Wiki : Incarnon", "w:Incarnon"], ["Wiki : Cavalero", "w:Cavalero"]] },

  { id: "circuit", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Conseillé",
    title: "Circuit normal (Duviri) : un Warframe",
    reward: "Les pièces d'un Warframe, à choisir parmi trois proposés cette semaine.",
    tip: "Prends celui qui te manque et qui est le plus long à farmer autrement (primes, missions Espionnage…). Une fois choisi, le Warframe est fixé pour toute la semaine.",
    req: ["duviri"], unlockNote: "Après la quête The Duviri Paradox.", live: "circuit",
    links: [["Wiki : The Circuit", "w:The Circuit"]] },

  { id: "netracells", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Incontournable",
    title: "Netracells (5 par semaine)",
    reward: "Une Lanterne Entrati, avec une bonne chance de Fragment d'Archonte, d'Arcane de mêlée légendaire ou d'adaptateur d'Arcane de mêlée.",
    tip: "Utilise tes 5 Search Pulses chaque semaine : ils ne s'accumulent pas. Ils sont partagés avec l'Archimédée, alors fais les Netracells en premier si tes builds ne sont pas encore prêts pour l'Archimédée.",
    req: ["newwar"], unlockNote: "Après la quête Whispers in the Walls (qui suit The New War). Parle à Tagfer au Sanctum Anatomica.",
    links: [["Wiki : Netracells", "w:Netracells"]] },

  { id: "archimedea", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Conseillé",
    title: "Archimédée profonde et temporelle",
    reward: "Un Fragment d'Archonte Tauforgé garanti.",
    tip: "Seulement si tes builds tiennent face aux modificateurs de difficulté. Sinon, garde tes Search Pulses pour les Netracells.",
    req: ["endure"], unlockNote: "Fin de jeu : quand tu tiens une heure en Survie Steel Path.",
    links: [["Wiki : Deep Archimedea", "w:Deep Archimedea"], ["Wiki : Temporal Archimedea", "w:Temporal Archimedea"]] },

  { id: "teshin", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Conseillé",
    title: "Article de la semaine chez Teshin",
    reward: "Un article en vedette qui change chaque semaine, payé en Acier essentiel.",
    tip: "Quand l'Umbra Forma est proposé, achète-le. Sinon, les adaptateurs d'arcane et le Kuva sont de bons achats.",
    req: ["sp"], unlockNote: "Après avoir débloqué la Steel Path.", live: "teshin",
    links: [["Wiki : Teshin", "w:Teshin"]] },

  { id: "nw-weekly", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Incontournable",
    title: "Défis Nightwave de la semaine",
    reward: "4 500 points par défi hebdomadaire, 7 000 par défi d'élite.",
    tip: "Ce sont eux qui font monter les rangs Nightwave le plus vite. Lis-les en début de semaine et fais-les en jouant normalement.",
    req: ["vor"], links: [["Wiki : Nightwave", "w:Nightwave"]] },

  { id: "helminth-inv", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Conseillé",
    title: "Invigorations de l'Helminth",
    reward: "Un bonus gratuit de 7 jours pour 3 Warframes tirées au sort.",
    tip: "Pas de choix à faire : si un de tes Warframes favoris est proposé, applique le bonus.",
    req: ["helm"], unlockNote: "Après avoir débloqué l'Helminth.",
    links: [["Wiki : Helminth", "w:Helminth"]] },

  { id: "bird3", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Conseillé",
    title: "Fragment d'Archonte chez Bird 3",
    reward: "Un Fragment d'Archonte contre 30 000 points de réputation Cavia.",
    tip: "Achète-le chaque semaine dès que tu as le rang requis : c'est un Fragment sans mission.",
    req: ["newwar"], unlockNote: "Rang 5 chez Cavia (après Whispers in the Walls).",
    links: [["Wiki : Bird 3", "w:Bird 3"]] },

  { id: "calendar", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Conseillé",
    title: "Calendrier 1999 (Höllvania)",
    reward: "Des prix à choisir au fil des tâches de la saison : Fragments d'Archonte, Arcanes, rivens, boosters…",
    tip: "Avance les tâches dans l'ordre jusqu'aux prix. Choisis en priorité les Fragments d'Archonte, puis les rivens ou les Arcanes. Chaque saison dure une semaine.",
    req: ["newwar"], unlockNote: "Après la quête The Hex (Warframe : 1999).",
    links: [["Wiki : 1999 Calendar", "w:1999 Calendar"]] },

  { id: "icebind", cadence: "weekly", reset: "Dimanche 00:00 UTC", rank: "Optionnel",
    title: "The Icebind (3 Cryobells)",
    reward: "Un Riven Splicer garanti par mission, plus des coffres bonus.",
    tip: "Mode à six joueurs face à des ennemis de niveau 999+, sans matchmaking public : seulement avec un groupe organisé et des builds de level cap. Les Cryobells non utilisés s'accumulent jusqu'à six.",
    req: ["cap", "zar"], unlockNote: "Fin de jeu : Angels of the Zariman, Whispers in the Walls et l'Archimédée d'élite débloquée.",
    links: [["Wiki : The Icebind", "w:The Icebind"]] },

  { id: "kahl", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Optionnel",
    title: "Garnison de Kahl",
    reward: "Du Stock à échanger auprès de Chipper : mods d'Archonte, éphémères, équipement Veilbreaker.",
    tip: "Utile surtout si tu veux les mods d'Archonte. Sinon, tu peux t'en passer.",
    req: ["newwar"], unlockNote: "Après la quête Veilbreaker.",
    links: [["Wiki : Kahl's Garrison", "w:Kahl's Garrison"]] },

  { id: "maroo", cadence: "weekly", reset: "Lundi 00:00 UTC", rank: "Optionnel",
    title: "Chasse au trésor de Maroo",
    reward: "Une sculpture Ayatan, à revendre contre de l'Endo.",
    tip: "Une mission rapide : l'Endo sert à monter tes mods.",
    req: ["junc"], links: [["Wiki : Maroo", "w:Maroo"]] },

  /* ---------- Plus rare ---------- */
  { id: "baro", cadence: "other", reset: "Toutes les 2 semaines, du vendredi 14:00 au dimanche 14:00 UTC", rank: "Conseillé",
    title: "Baro Ki'Teer",
    reward: "Des mods Primed, des armes et des cosmétiques, contre des Ducats et des crédits.",
    tip: "Garde tes Ducats pour les mods Primed qui améliorent vraiment tes builds (Primed Flow, Primed Continuity, Primed Pressure Point…), pas pour les cosmétiques. Les Ducats s'obtiennent en revendant tes pièces Prime en double.",
    req: ["fiss"], live: "baro", links: [["Wiki : Baro Ki'Teer", "w:Baro Ki'Teer"]] },

  { id: "varzia", cadence: "other", reset: "Tous les 28 jours environ", rank: "Optionnel",
    title: "Prime Resurgence (Varzia)",
    reward: "Des Warframes et armes Prime retirés du jeu, contre des Aya.",
    tip: "Dépense tes Aya sur un Warframe Prime que tu veux vraiment jouer plutôt que sur des objets pour la collection.",
    req: ["fiss"], links: [["Wiki : Varzia", "w:Varzia"], ["Wiki : Prime Resurgence", "w:Prime Resurgence"]] }
];
