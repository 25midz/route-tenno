// Parcours : phases et objectifs. Format : [id, phase, titre, MR min, prérequis, priorité 1-5, heures, pourquoi, liens [[libellé, url ou "w:Page du wiki"]], libellé du questionnaire, MR auto]
window.PH=[
 {n:"Fondations",r:"MR 0–5",c:"var(--cyan)"},
 {n:"Histoire & outils",r:"MR 5–10",c:"var(--cyan)"},
 {n:"Steel Path",r:"MR 10–14",c:"var(--cyan)"},
 {n:"Level cap",r:"MR 14–16",c:"var(--gold)"}];
// id, phase, title, min MR, prereqs, priority 1-5, hours, why, steps, quiz label (key milestones)
window.O=[
 ["vor", 0, "Terminer Vor's Prize", 0, [], 5, 1, "Le tutoriel débloque ton vaisseau, la Fonderie et les premiers mods.", [["Wiki : Vor's Prize", "w:Vor's Prize"]], "J'ai terminé Vor's Prize"],
 ["mods", 0, "Équiper les mods essentiels", 0, ["vor"], 5, 2, "80 % de ta puissance au début vient de quelques mods de dégâts et de survie.", [["Wiki : Mod", "w:Mod"], ["Wiki : Fusion", "w:Fusion"], ["Builds sur Overframe", "https://overframe.gg/"]], "Mes mods de base sont équipés et montés"],
 ["clan", 0, "Rejoindre un clan avec un dojo complet", 0, ["vor"], 5, 0.5, "Le dojo donne accès à des dizaines d'armes et de Warframes à recherche déjà faite.", [["Wiki : Clan Dojo", "w:Clan Dojo"], ["Wiki : Clan", "w:Clan"]], "Je suis dans un clan avec dojo"],
 ["nw", 0, "Suivre la Nightwave chaque semaine", 0, ["vor"], 4, 0.5, "Source régulière de Catalyseurs, Réacteurs, Forma et Aura.", [["Wiki : Nightwave", "w:Nightwave"]], null],
 ["junc", 0, "Ouvrir la Star Chart jusqu'à Mars", 0, ["vor"], 5, 4, "Ouvre l'accès aux boss, aux zones ouvertes et aux premières reliques.", [["Wiki : Junction", "w:Junction"], ["Wiki : Star Chart", "w:Star Chart"]], "La Star Chart est ouverte jusqu'à Mars"],
 ["rhino", 0, "Farmer Rhino (boss Vay Hek, Terre)", 0, ["junc"], 4, 2, "Iron Skin rend le début du jeu beaucoup plus confortable.", [["Wiki : Rhino", "w:Rhino"], ["Wiki : Vay Hek", "w:Vay Hek"]], null],
 ["cetus", 0, "Plaines d'Eidolon : quête Saya's Vigil", 0, ["junc"], 4, 1, "Débloque Cetus, les primes et plus tard les Eidolons (Arcanes).", [["Wiki : Saya's Vigil", "w:Saya's Vigil"], ["Wiki : Plains of Eidolon", "w:Plains of Eidolon"]], null],
 ["fiss", 0, "Ouvrir tes premières fissures du Néant", 0, ["junc"], 4, 1, "Les reliques donnent les pièces Prime : équipement solide et platine.", [["Wiki : Void Fissure", "w:Void Fissure"], ["Wiki : Void Relic", "w:Void Relic"], ["Tables de drop officielles", "https://www.warframe.com/droptables"]], null],
 ["react", 0, "Installer un Réacteur et un Catalyseur Orokin", 0, ["nw"], 4, 1, "Doublent la capacité de mods : ton build principal en a besoin.", [["Wiki : Orokin Reactor", "w:Orokin Reactor"], ["Wiki : Orokin Catalyst", "w:Orokin Catalyst"]], "J'ai un Réacteur et un Catalyseur posés"],
 ["trade", 0, "Vendre des pièces Prime pour du platine", 2, ["fiss"], 3, 1, "Le platine achète slots, Warframes et mods sans dépenser d'argent réel.", [["Wiki : Trading", "w:Trading"], ["warframe.market (prix)", "https://warframe.market/"]], null],
 ["mr5", 0, "Atteindre MR 5", 0, ["vor"], 4, 8, "Chaque rang débloque de l'équipement et plus de slots d'échange.", [["Wiki : Mastery Rank", "w:Mastery Rank"]], null, 5],

 ["junc2", 1, "Ouvrir la Star Chart jusqu'à Uranus", 3, ["junc"], 5, 6, "Nécessaire pour la quête principale et les ressources du milieu de jeu.", [["Wiki : Junction", "w:Junction"], ["Wiki : Star Chart", "w:Star Chart"]], "La Star Chart est ouverte jusqu'à Uranus"],
 ["sd", 1, "Natah puis The Second Dream", 5, ["junc2"], 5, 3, "La quête la plus importante du jeu : elle débloque l'Opérateur et le Focus.", [["Wiki : Natah", "w:Natah"], ["Wiki : The Second Dream", "w:The Second Dream"]], "J'ai terminé The Second Dream"],
 ["focus", 1, "Choisir une école de Focus", 5, ["sd"], 3, 3, "Le Focus renforce l'Opérateur ; Zenurik (énergie) est le choix le plus confortable au début.", [["Wiki : Focus", "w:Focus"]], null],
 ["ww", 1, "The War Within", 6, ["sd"], 5, 2, "Débloque les Sorties, la Forteresse Kuva et les Liches Kuva.", [["Wiki : The War Within", "w:The War Within"]], "J'ai terminé The War Within"],
 ["vallis", 1, "Orb Vallis : quête Vox Solaris", 4, ["junc"], 3, 1, "Débloque Fortuna et les amplificateurs les plus accessibles.", [["Wiki : Vox Solaris (Quest)", "w:Vox Solaris (Quest)"], ["Wiki : Orb Vallis", "w:Orb Vallis"]], null],
 ["amp", 1, "Obtenir un vrai amplificateur", 6, ["sd", "vallis"], 4, 4, "L'amplificateur de départ est trop faible pour les Eidolons et le contenu avancé.", [["Wiki : Amp", "w:Amp"]], null],
 ["deimos", 1, "Heart of Deimos (Cambion Drift)", 5, ["junc"], 4, 1, "Ouvre les Entrati, indispensables pour l'Helminth.", [["Wiki : Heart of Deimos", "w:Heart of Deimos"], ["Wiki : Entrati", "w:Entrati"]], "J'ai terminé Heart of Deimos"],
 ["mr8", 1, "Atteindre MR 8", 0, ["mr5"], 4, 15, "Débloque l'Helminth et les emplacements de mods Riven.", [["Wiki : Mastery Rank", "w:Mastery Rank"]], null, 8],
 ["helm", 1, "Débloquer l'Helminth", 8, ["deimos", "mr8"], 5, 10, "Remplace une compétence de Warframe : c'est la base de presque tous les builds avancés.", [["Wiki : Helminth", "w:Helminth"]], "J'ai débloqué l'Helminth"],
 ["lich", 1, "Vaincre ta première Liche Kuva", 6, ["ww"], 3, 6, "Les armes Kuva sont puissantes et donnent beaucoup de maîtrise.", [["Wiki : Kuva Lich", "w:Kuva Lich"]], null],
 ["story", 1, "Chains of Harrow, Apostasy, The Sacrifice", 6, ["ww"], 4, 3, "Fil principal de l'histoire ; The Sacrifice donne Excalibur Umbra.", [["Wiki : Chains of Harrow", "w:Chains of Harrow"], ["Wiki : Apostasy Prologue", "w:Apostasy Prologue"], ["Wiki : The Sacrifice", "w:The Sacrifice"]], "J'ai terminé The Sacrifice"],
 ["rail", 1, "Rising Tide : ton Railjack", 6, ["clan", "junc2"], 2, 4, "Débloque l'Empyrean ; vérifie s'il est requis pour l'histoire dans ta version du jeu.", [["Wiki : Rising Tide", "w:Rising Tide"], ["Wiki : Railjack", "w:Railjack"]], null],
 ["forma", 1, "Poser tes premiers Forma", 6, ["react"], 4, 3, "Les Forma libèrent la capacité nécessaire aux builds complets.", [["Wiki : Forma", "w:Forma"], ["Wiki : Polarization", "w:Polarization"]], "J'ai déjà posé des Forma"],
 ["newwar", 1, "The New War", 8, ["story", "deimos", "sd"], 5, 4, "Le grand tournant de l'histoire : débloque les Chasses aux Archontes et les contenus récents.", [["Wiki : The New War", "w:The New War"]], "J'ai terminé The New War"],

 ["star", 2, "Terminer toute la Star Chart", 8, ["junc2", "ww"], 5, 10, "Condition pour la Steel Path et les Arbitrages.", [["Wiki : Star Chart", "w:Star Chart"]], "Toute la Star Chart est terminée"],
 ["sp", 2, "Débloquer la Steel Path", 8, ["star"], 5, 0.5, "Ennemis plus forts, meilleures récompenses, et l'Acier essentiel de Teshin.", [["Wiki : The Steel Path", "w:The Steel Path"]], "J'ai débloqué la Steel Path"],
 ["teshin", 2, "Dépenser l'Acier essentiel chez Teshin", 8, ["sp"], 3, 1, "Umbra Forma, Kuva, adaptateurs d'arcane : de gros raccourcis.", [["Wiki : Steel Essence", "w:Steel Essence"], ["Wiki : Teshin", "w:Teshin"]], null],
 ["arbi", 2, "Arbitrages : farmer l'Essence Vitus", 8, ["star"], 4, 5, "Monnaie des mods Galvanisés, très importants pour le scaling.", [["Wiki : Arbitrations", "w:Arbitrations"], ["Wiki : Vitus Essence", "w:Vitus Essence"]], "Je fais déjà des Arbitrages"],
 ["galva", 2, "Obtenir les mods Galvanisés", 8, ["arbi"], 4, 4, "Ils remplacent les mods de dégâts classiques et augmentent avec les kills.", [["Wiki : Galvanized Mods", "w:Galvanized Mods"], ["Wiki : Arbitrations", "w:Arbitrations"]], "J'ai mes mods Galvanisés"],
 ["duviri", 2, "The Duviri Paradox", 6, ["ww"], 3, 2, "Débloque le Circuit et les Incarnon Genesis.", [["Wiki : The Duviri Paradox", "w:The Duviri Paradox"], ["Wiki : The Circuit", "w:The Circuit"]], null],
 ["incar", 2, "Débloquer des armes Incarnon", 8, ["duviri", "sp"], 4, 4, "Les Incarnon sont parmi les meilleures armes du jeu.", [["Wiki : Incarnon", "w:Incarnon"], ["Wiki : The Circuit", "w:The Circuit"]], "J'ai des armes Incarnon"],
 ["arch", 2, "Chasses aux Archontes", 10, ["newwar", "sp"], 5, 1, "Les Fragments d'Archonte sont les bonus permanents les plus forts pour un Warframe.", [["Wiki : Archon Hunt", "w:Archon Hunt"], ["Wiki : Archon Shard", "w:Archon Shard"]], "Je fais les Chasses aux Archontes"],
 ["zar", 2, "Angels of the Zariman", 8, ["newwar"], 3, 2, "Débloque le Zariman et ses Arcanes.", [["Wiki : Angels of the Zariman", "w:Angels of the Zariman"], ["Wiki : Holdfasts", "w:Holdfasts"]], null],
 ["arcane", 2, "Équiper des Arcanes clés", 10, ["cetus", "zar"], 4, 6, "Les Arcanes apportent survie et énergie sans place de mod.", [["Wiki : Arcane Enhancement", "w:Arcane Enhancement"], ["Builds sur Overframe", "https://overframe.gg/"]], null],
 ["hbuild", 2, "Construire des builds avec l'Helminth", 10, ["helm"], 4, 2, "Remplacer une compétence par un buff de dégâts ou de survie change tout.", [["Wiki : Helminth", "w:Helminth"], ["Builds sur Overframe", "https://overframe.gg/"]], null],
 ["mr12", 2, "Atteindre MR 12", 0, ["mr8"], 3, 25, "Débloque des armes et un accès complet à la plupart des contenus.", [["Wiki : Mastery Rank", "w:Mastery Rank"]], null, 12],

 ["dr", 3, "Comprendre la survie à très haut niveau", 12, ["sp", "helm"], 5, 1, "Au level cap, les dégâts bruts ne suffisent plus : il faut du shield gating, de l'overguard ou de la réduction de dégâts.", [["Wiki : Shield Gating", "w:Shield Gating"], ["Wiki : Overguard", "w:Overguard"], ["Wiki : Damage Reduction", "w:Damage Reduction"]], null],
 ["armor", 3, "Maîtriser le retrait d'armure et le scaling", 12, ["sp"], 5, 2, "Les ennemis de très haut niveau ont tant d'armure qu'il faut la retirer.", [["Wiki : Armor", "w:Armor"], ["Wiki : Damage", "w:Damage"], ["Wiki : Condition Overload", "w:Condition Overload"]], null],
 ["shards", 3, "Optimiser 2 Warframes avec des Fragments", 12, ["arch"], 4, 6, "Deux builds complets pour couvrir la plupart des missions.", [["Wiki : Archon Shard", "w:Archon Shard"], ["Builds sur Overframe", "https://overframe.gg/"]], null],
 ["endure", 3, "Tenir 60 min en Survie Steel Path", 12, ["dr", "armor", "galva"], 5, 2, "Test réaliste avant de viser des niveaux extrêmes.", [["Wiki : Survival", "w:Survival"], ["Wiki : The Steel Path", "w:The Steel Path"]], "J'ai tenu une heure en Survie Steel Path"],
 ["mr16", 3, "Atteindre MR 16", 0, ["mr12"], 3, 30, "Le sommet ciblé par ce guide.", [["Wiki : Mastery Rank", "w:Mastery Rank"]], null, 16],
 ["cap", 3, "Level cap : tenir face aux ennemis au niveau maximum", 14, ["endure", "shards", "incar"], 5, 6, "Le but final : un build qui survit et tue même au niveau maximum des ennemis.", [["Wiki : Simulacrum", "w:Simulacrum"], ["Wiki : Enemy Level Scaling", "w:Enemy Level Scaling"], ["Builds sur Overframe", "https://overframe.gg/"]], "Je tiens face aux ennemis au level cap"],
];

// Objets à chercher dans les tables de drop pour certains objectifs
window.DROPS={
 mods:["Hornet Strike","Pressure Point","Split Chamber","Point Strike","Vitality","Redirection","Streamline","Flow","Intensify"],
 rhino:["Rhino"],
 react:["Orokin Reactor","Orokin Catalyst"],
 forma:["Forma"],
 fiss:["Lith","Meso"]
};
