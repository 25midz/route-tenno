// ROUTE TENNO : le parcours de progression.
// Chaque objectif :
//   id      identifiant court, unique (utilisé dans les prérequis, le test et les récompenses)
//   phase   0 Fondations, 1 Histoire & outils, 2 Steel Path, 3 Level cap
//   tier    "E" essentiel (indispensable pour avancer), "R" recommandé, "O" optionnel (si tu en as envie)
//   mr      rang de maîtrise minimum ; req = objectifs à finir avant
//   prio    importance de 1 à 5 ; hours = temps estimé
//   why     pourquoi c'est utile ; links = [libellé, adresse] ou [libellé, "w:Page du wiki"]
//   autoMR  pour les paliers de MR : validé automatiquement quand le joueur atteint ce rang
window.PH=[
 {n:"Fondations",r:"MR 0–5",c:"var(--cyan)"},
 {n:"Histoire & outils",r:"MR 5–10",c:"var(--cyan)"},
 {n:"Steel Path",r:"MR 10–14",c:"var(--cyan)"},
 {n:"Level cap",r:"MR 14–16",c:"var(--gold)"}];

window.TIERS={E:"Essentiel",R:"Recommandé",O:"Optionnel"};

window.OBJ=[
  {id:  "vor", phase:  0, tier:  "E", title:  "Terminer Vor's Prize", mr:  0, req:  [], prio:  5, hours:  1, why:  "Le tutoriel débloque ton vaisseau, la Fonderie et les premiers mods.", links:  [["Wiki : Vor's Prize", "w:Vor's Prize"]]},
  {id:  "mods", phase:  0, tier:  "E", title:  "Équiper les mods essentiels", mr:  0, req:  ["vor"], prio:  5, hours:  2, why:  "80 % de ta puissance au début vient de quelques mods de dégâts et de survie.", links:  [["Wiki : Mod", "w:Mod"], ["Wiki : Fusion", "w:Fusion"], ["Builds sur Overframe", "https://overframe.gg/"]]},
  {id:  "clan", phase:  0, tier:  "R", title:  "Rejoindre un clan avec un dojo complet", mr:  0, req:  ["vor"], prio:  5, hours:  0.5, why:  "Le dojo donne accès à des dizaines d'armes et de Warframes à recherche déjà faite.", links:  [["Wiki : Clan Dojo", "w:Clan Dojo"], ["Wiki : Clan", "w:Clan"]]},
  {id:  "nw", phase:  0, tier:  "R", title:  "Suivre la Nightwave chaque semaine", mr:  0, req:  ["vor"], prio:  4, hours:  0.5, why:  "Source régulière de Catalyseurs, Réacteurs, Forma et Aura.", links:  [["Wiki : Nightwave", "w:Nightwave"]]},
  {id:  "junc", phase:  0, tier:  "E", title:  "Ouvrir la Star Chart jusqu'à Mars", mr:  0, req:  ["vor"], prio:  5, hours:  4, why:  "Ouvre l'accès aux boss, aux zones ouvertes et aux premières reliques.", links:  [["Wiki : Junction", "w:Junction"], ["Wiki : Star Chart", "w:Star Chart"]]},
  {id:  "rhino", phase:  0, tier:  "O", title:  "Farmer Rhino (boss Vay Hek, Terre)", mr:  0, req:  ["junc"], prio:  4, hours:  2, why:  "Pratique au début grâce à Iron Skin, mais pas du tout obligatoire : n'importe quel Warframe solide que tu aimes jouer fait l'affaire.", links:  [["Wiki : Rhino", "w:Rhino"], ["Wiki : Vay Hek", "w:Vay Hek"]]},
  {id:  "cetus", phase:  0, tier:  "R", title:  "Plaines d'Eidolon : quête Saya's Vigil", mr:  0, req:  ["junc"], prio:  4, hours:  1, why:  "Débloque Cetus, les primes et plus tard les Eidolons (Arcanes).", links:  [["Wiki : Saya's Vigil", "w:Saya's Vigil"], ["Wiki : Plains of Eidolon", "w:Plains of Eidolon"]]},
  {id:  "fiss", phase:  0, tier:  "R", title:  "Ouvrir tes premières fissures du Néant", mr:  0, req:  ["junc"], prio:  4, hours:  1, why:  "Les reliques donnent les pièces Prime : équipement solide et platine.", links:  [["Wiki : Void Fissure", "w:Void Fissure"], ["Wiki : Void Relic", "w:Void Relic"], ["Tables de drop officielles", "https://www.warframe.com/droptables"]]},
  {id:  "react", phase:  0, tier:  "E", title:  "Installer un Réacteur et un Catalyseur Orokin", mr:  0, req:  ["nw"], prio:  4, hours:  1, why:  "Doublent la capacité de mods : ton build principal en a besoin.", links:  [["Wiki : Orokin Reactor", "w:Orokin Reactor"], ["Wiki : Orokin Catalyst", "w:Orokin Catalyst"]]},
  {id:  "trade", phase:  0, tier:  "O", title:  "Vendre des pièces Prime pour du platine", mr:  2, req:  ["fiss"], prio:  3, hours:  1, why:  "Pratique pour se financer sans argent réel, mais tu peux très bien progresser sans échanger.", links:  [["Wiki : Trading", "w:Trading"], ["warframe.market (prix)", "https://warframe.market/"]]},
  {id:  "mr5", phase:  0, tier:  "R", title:  "Atteindre MR 5", mr:  0, req:  ["vor"], prio:  4, hours:  8, why:  "Chaque rang débloque de l'équipement et plus de slots d'échange.", links:  [["Wiki : Mastery Rank", "w:Mastery Rank"]], autoMR:  5},
  {id:  "junc2", phase:  1, tier:  "E", title:  "Ouvrir la Star Chart jusqu'à Uranus", mr:  3, req:  ["junc"], prio:  5, hours:  6, why:  "Nécessaire pour la quête principale et les ressources du milieu de jeu.", links:  [["Wiki : Junction", "w:Junction"], ["Wiki : Star Chart", "w:Star Chart"]]},
  {id:  "sd", phase:  1, tier:  "E", title:  "Natah puis The Second Dream", mr:  5, req:  ["junc2"], prio:  5, hours:  3, why:  "La quête la plus importante du jeu : elle débloque l'Opérateur et le Focus.", links:  [["Wiki : Natah", "w:Natah"], ["Wiki : The Second Dream", "w:The Second Dream"]]},
  {id:  "focus", phase:  1, tier:  "R", title:  "Choisir une école de Focus", mr:  5, req:  ["sd"], prio:  3, hours:  3, why:  "Le Focus renforce l'Opérateur ; Zenurik (énergie) est le choix le plus confortable au début.", links:  [["Wiki : Focus", "w:Focus"]]},
  {id:  "ww", phase:  1, tier:  "E", title:  "The War Within", mr:  6, req:  ["sd"], prio:  5, hours:  2, why:  "Débloque les Sorties, la Forteresse Kuva et les Liches Kuva.", links:  [["Wiki : The War Within", "w:The War Within"]]},
  {id:  "vallis", phase:  1, tier:  "O", title:  "Orb Vallis : quête Vox Solaris", mr:  4, req:  ["junc"], prio:  3, hours:  1, why:  "Fortuna et ses primes, utile surtout pour un amplificateur ou si tu aimes la zone. Pas indispensable.", links:  [["Wiki : Vox Solaris (Quest)", "w:Vox Solaris (Quest)"], ["Wiki : Orb Vallis", "w:Orb Vallis"]]},
  {id:  "amp", phase:  1, tier:  "R", title:  "Obtenir un vrai amplificateur", mr:  6, req:  ["sd", "vallis"], prio:  4, hours:  4, why:  "L'amplificateur de départ est trop faible pour les Eidolons et le contenu avancé.", links:  [["Wiki : Amp", "w:Amp"]]},
  {id:  "deimos", phase:  1, tier:  "E", title:  "Heart of Deimos (Cambion Drift)", mr:  5, req:  ["junc"], prio:  4, hours:  1, why:  "Ouvre les Entrati, indispensables pour l'Helminth.", links:  [["Wiki : Heart of Deimos", "w:Heart of Deimos"], ["Wiki : Entrati", "w:Entrati"]]},
  {id:  "mr8", phase:  1, tier:  "E", title:  "Atteindre MR 8", mr:  0, req:  ["mr5"], prio:  4, hours:  15, why:  "Débloque l'Helminth et les emplacements de mods Riven.", links:  [["Wiki : Mastery Rank", "w:Mastery Rank"]], autoMR:  8},
  {id:  "helm", phase:  1, tier:  "E", title:  "Débloquer l'Helminth", mr:  8, req:  ["deimos", "mr8"], prio:  5, hours:  10, why:  "Remplace une compétence de Warframe : c'est la base de presque tous les builds avancés.", links:  [["Wiki : Helminth", "w:Helminth"]]},
  {id:  "lich", phase:  1, tier:  "O", title:  "Vaincre ta première Liche Kuva", mr:  6, req:  ["ww"], prio:  3, hours:  6, why:  "Les armes Kuva sont fortes et rapportent de la maîtrise, mais ce système est long : à faire quand tu en as envie.", links:  [["Wiki : Kuva Lich", "w:Kuva Lich"]]},
  {id:  "story", phase:  1, tier:  "E", title:  "Chains of Harrow, Apostasy, The Sacrifice", mr:  6, req:  ["ww"], prio:  4, hours:  3, why:  "Fil principal de l'histoire ; The Sacrifice donne Excalibur Umbra.", links:  [["Wiki : Chains of Harrow", "w:Chains of Harrow"], ["Wiki : Apostasy Prologue", "w:Apostasy Prologue"], ["Wiki : The Sacrifice", "w:The Sacrifice"]]},
  {id:  "rail", phase:  1, tier:  "O", title:  "Rising Tide : ton Railjack", mr:  6, req:  ["clan", "junc2"], prio:  2, hours:  4, why:  "L'Empyrean (Railjack) donne des ressources et des intrinsèques. Facultatif pour progresser vers le level cap.", links:  [["Wiki : Rising Tide", "w:Rising Tide"], ["Wiki : Railjack", "w:Railjack"]]},
  {id:  "forma", phase:  1, tier:  "E", title:  "Poser tes premiers Forma", mr:  6, req:  ["react"], prio:  4, hours:  3, why:  "Les Forma libèrent la capacité nécessaire aux builds complets.", links:  [["Wiki : Forma", "w:Forma"], ["Wiki : Polarization", "w:Polarization"]]},
  {id:  "newwar", phase:  1, tier:  "E", title:  "The New War", mr:  8, req:  ["story", "deimos", "sd"], prio:  5, hours:  4, why:  "Le grand tournant de l'histoire : débloque les Chasses aux Archontes et les contenus récents.", links:  [["Wiki : The New War", "w:The New War"]]},
  {id:  "star", phase:  2, tier:  "E", title:  "Terminer toute la Star Chart", mr:  8, req:  ["junc2", "ww"], prio:  5, hours:  10, why:  "Condition pour la Steel Path et les Arbitrages.", links:  [["Wiki : Star Chart", "w:Star Chart"]]},
  {id:  "sp", phase:  2, tier:  "E", title:  "Débloquer la Steel Path", mr:  8, req:  ["star"], prio:  5, hours:  0.5, why:  "Ennemis plus forts, meilleures récompenses, et l'Acier essentiel de Teshin.", links:  [["Wiki : The Steel Path", "w:The Steel Path"]]},
  {id:  "teshin", phase:  2, tier:  "R", title:  "Dépenser l'Acier essentiel chez Teshin", mr:  8, req:  ["sp"], prio:  3, hours:  1, why:  "Umbra Forma, Kuva, adaptateurs d'arcane : de gros raccourcis.", links:  [["Wiki : Steel Essence", "w:Steel Essence"], ["Wiki : Teshin", "w:Teshin"]]},
  {id:  "arbi", phase:  2, tier:  "R", title:  "Arbitrages : farmer l'Essence Vitus", mr:  8, req:  ["star"], prio:  4, hours:  5, why:  "Monnaie des mods Galvanisés, très importants pour le scaling.", links:  [["Wiki : Arbitrations", "w:Arbitrations"], ["Wiki : Vitus Essence", "w:Vitus Essence"]]},
  {id:  "galva", phase:  2, tier:  "R", title:  "Obtenir les mods Galvanisés", mr:  8, req:  ["arbi"], prio:  4, hours:  4, why:  "Ils remplacent les mods de dégâts classiques et augmentent avec les kills.", links:  [["Wiki : Galvanized Mods", "w:Galvanized Mods"], ["Wiki : Arbitrations", "w:Arbitrations"]]},
  {id:  "duviri", phase:  2, tier:  "R", title:  "The Duviri Paradox", mr:  6, req:  ["ww"], prio:  3, hours:  2, why:  "Débloque le Circuit et les Incarnon Genesis.", links:  [["Wiki : The Duviri Paradox", "w:The Duviri Paradox"], ["Wiki : The Circuit", "w:The Circuit"]]},
  {id:  "incar", phase:  2, tier:  "R", title:  "Débloquer des armes Incarnon", mr:  8, req:  ["duviri", "sp", "zar"], prio:  4, hours:  4, why:  "Les Incarnon sont parmi les meilleures armes du jeu. L'adaptateur s'obtient dans le Circuit Steel Path et s'installe chez Cavalero (Zariman).", links:  [["Wiki : Incarnon", "w:Incarnon"], ["Wiki : The Circuit", "w:The Circuit"]]},
  {id:  "arch", phase:  2, tier:  "R", title:  "Chasses aux Archontes", mr:  10, req:  ["newwar", "sp"], prio:  5, hours:  1, why:  "Les Fragments d'Archonte sont les bonus permanents les plus forts pour un Warframe.", links:  [["Wiki : Archon Hunt", "w:Archon Hunt"], ["Wiki : Archon Shard", "w:Archon Shard"]]},
  {id:  "zar", phase:  2, tier:  "R", title:  "Angels of the Zariman", mr:  8, req:  ["newwar"], prio:  3, hours:  2, why:  "Débloque le Zariman et ses Arcanes.", links:  [["Wiki : Angels of the Zariman", "w:Angels of the Zariman"], ["Wiki : Holdfasts", "w:Holdfasts"]]},
  {id:  "arcane", phase:  2, tier:  "R", title:  "Équiper des Arcanes clés", mr:  10, req:  ["cetus", "zar"], prio:  4, hours:  6, why:  "Les Arcanes apportent survie et énergie sans place de mod.", links:  [["Wiki : Arcane Enhancement", "w:Arcane Enhancement"], ["Builds sur Overframe", "https://overframe.gg/"]]},
  {id:  "hbuild", phase:  2, tier:  "R", title:  "Construire des builds avec l'Helminth", mr:  10, req:  ["helm"], prio:  4, hours:  2, why:  "Remplacer une compétence par un buff de dégâts ou de survie change tout.", links:  [["Wiki : Helminth", "w:Helminth"], ["Builds sur Overframe", "https://overframe.gg/"]]},
  {id:  "mr12", phase:  2, tier:  "O", title:  "Atteindre MR 12", mr:  0, req:  ["mr8"], prio:  3, hours:  25, why:  "Débloque des armes et un accès complet à la plupart des contenus.", links:  [["Wiki : Mastery Rank", "w:Mastery Rank"]], autoMR:  12},
  {id:  "dr", phase:  3, tier:  "E", title:  "Comprendre la survie à très haut niveau", mr:  12, req:  ["sp", "helm"], prio:  5, hours:  1, why:  "Au level cap, les dégâts bruts ne suffisent plus : il faut du shield gating, de l'overguard ou de la réduction de dégâts.", links:  [["Wiki : Shield Gating", "w:Shield Gating"], ["Wiki : Overguard", "w:Overguard"], ["Wiki : Damage Reduction", "w:Damage Reduction"]]},
  {id:  "armor", phase:  3, tier:  "E", title:  "Maîtriser le retrait d'armure et le scaling", mr:  12, req:  ["sp"], prio:  5, hours:  2, why:  "Les ennemis de très haut niveau ont tant d'armure qu'il faut la retirer.", links:  [["Wiki : Armor", "w:Armor"], ["Wiki : Damage", "w:Damage"], ["Wiki : Condition Overload", "w:Condition Overload"]]},
  {id:  "shards", phase:  3, tier:  "R", title:  "Optimiser 2 Warframes avec des Fragments", mr:  12, req:  ["arch"], prio:  4, hours:  6, why:  "Deux builds complets pour couvrir la plupart des missions.", links:  [["Wiki : Archon Shard", "w:Archon Shard"], ["Builds sur Overframe", "https://overframe.gg/"]]},
  {id:  "endure", phase:  3, tier:  "E", title:  "Tenir 60 min en Survie Steel Path", mr:  12, req:  ["dr", "armor", "galva"], prio:  5, hours:  2, why:  "Test réaliste avant de viser des niveaux extrêmes.", links:  [["Wiki : Survival", "w:Survival"], ["Wiki : The Steel Path", "w:The Steel Path"]]},
  {id:  "mr16", phase:  3, tier:  "O", title:  "Atteindre MR 16", mr:  0, req:  ["mr12"], prio:  3, hours:  30, why:  "Le sommet ciblé par ce guide.", links:  [["Wiki : Mastery Rank", "w:Mastery Rank"]], autoMR:  16},
  {id:  "cap", phase:  3, tier:  "E", title:  "Level cap : tenir face aux ennemis au niveau maximum", mr:  14, req:  ["endure", "shards", "incar"], prio:  5, hours:  6, why:  "Le but final : un build qui survit et tue même au niveau maximum des ennemis.", links:  [["Wiki : Simulacrum", "w:Simulacrum"], ["Wiki : Enemy Level Scaling", "w:Enemy Level Scaling"], ["Builds sur Overframe", "https://overframe.gg/"]]}
];

// Boutons « Où farmer » de certains objectifs (noms anglais des objets).
window.DROPS={
 mods:["Hornet Strike","Pressure Point","Split Chamber","Point Strike","Vitality","Redirection","Streamline","Flow","Intensify"],
 rhino:["Rhino"],
 react:["Orokin Reactor","Orokin Catalyst"],
 forma:["Forma"],
 fiss:["Lith","Meso"]
};
