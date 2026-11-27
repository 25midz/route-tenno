// LE TEST DE DÉPART : une question à la fois, avec une jauge.
// Chaque question :
//   id, title, hint      texte affiché
//   type                 "single" (un choix), "multi" (plusieurs choix) ou "mr" (rang de maîtrise)
//   options              [{ label, ids: [objectifs validés], none: true pour « Aucun » }]
//   show(a)              facultatif : la question n'apparaît que si la fonction renvoie vrai
//                        (a = réponses déjà données, has(id) = objectif déjà validé par une réponse)
// Valider un objectif valide aussi tous ses prérequis.
window.QUIZ = [
  { id: "platform", type: "single", title: "Sur quelle plateforme joues-tu ?",
    hint: "Pour afficher les bonnes alertes, fissures et rotations.",
    options: [
      { label: "PC", platform: "pc" }, { label: "PlayStation", platform: "ps4" },
      { label: "Xbox", platform: "xb1" }, { label: "Switch", platform: "swi" }
    ] },

  { id: "mr", type: "mr", title: "Quel est ton rang de maîtrise ?",
    hint: "Il s'affiche dans ton profil, à côté de ton pseudo. Un ordre de grandeur suffit." },

  { id: "story", type: "single", title: "Quelle est la dernière grande quête que tu as terminée ?",
    hint: "Elles se suivent dans cet ordre dans le Codex.",
    options: [
      { label: "Je débute, le tutoriel n'est pas fini", ids: [] },
      { label: "Vor's Prize, je découvre la Star Chart", ids: ["vor"] },
      { label: "The Second Dream", ids: ["sd"] },
      { label: "The War Within", ids: ["ww"] },
      { label: "The Sacrifice", ids: ["story"] },
      { label: "The New War", ids: ["newwar"] },
      { label: "Plus loin (Whispers in the Walls, 1999…)", ids: ["newwar"] }
    ] },

  { id: "chart", type: "single", title: "Jusqu'où va ta Star Chart ?",
    hint: "La carte des planètes, dans ta navigation.",
    show: a => a.story !== 0,
    options: [
      { label: "Je n'ai pas encore atteint Mars", ids: ["vor"] },
      { label: "Jusqu'à Mars, à peu près", ids: ["junc"] },
      { label: "Jusqu'à Uranus ou plus loin", ids: ["junc2"] },
      { label: "Elle est entièrement terminée", ids: ["star"] }
    ] },

  { id: "steel", type: "single", title: "Et la Steel Path ?",
    hint: "Le mode difficile, débloqué une fois toute la Star Chart finie.",
    show: (a, has) => has("star"),
    options: [
      { label: "Pas encore débloquée", ids: [] },
      { label: "Je débute dessus", ids: ["sp"] },
      { label: "Je suis à l'aise, je tiens une heure en Survie", ids: ["sp", "endure"] }
    ] },

  { id: "zones", type: "multi", title: "Quelles zones ouvertes as-tu débloquées ?",
    hint: "Plusieurs choix possibles.",
    show: (a, has) => has("junc"),
    options: [
      { label: "Cetus (Plaines d'Eidolon)", ids: ["cetus"] },
      { label: "Fortuna (Orb Vallis)", ids: ["vallis"] },
      { label: "Le Necralisk (Deimos)", ids: ["deimos"] },
      { label: "Aucune pour l'instant", ids: [], none: true }
    ] },

  { id: "gear", type: "multi", title: "Où en est ton équipement ?",
    hint: "Coche tout ce qui est vrai.",
    show: a => a.story !== 0,
    options: [
      { label: "Mes mods de base sont montés (Serration, Vitality…)", ids: ["mods"] },
      { label: "J'ai posé un Réacteur ou un Catalyseur Orokin", ids: ["react"] },
      { label: "J'ai déjà posé des Forma", ids: ["forma"] },
      { label: "J'ouvre déjà des fissures du Néant", ids: ["fiss"] },
      { label: "Je suis dans un clan avec un dojo", ids: ["clan"] },
      { label: "J'ai un amplificateur autre que celui de départ", ids: ["amp"], show: (a, has) => has("sd") },
      { label: "Rien de tout ça pour l'instant", ids: [], none: true }
    ] },

  { id: "helminth", type: "single", title: "As-tu débloqué l'Helminth ?",
    hint: "La chaise du vaisseau qui permet de remplacer une compétence de Warframe.",
    show: (a, has) => has("deimos") || (a.mr || 0) >= 8,
    options: [
      { label: "Non, pas encore", ids: [] },
      { label: "Oui", ids: ["helm"] },
      { label: "Oui, et je l'utilise pour mes builds", ids: ["helm", "hbuild"] }
    ] },

  { id: "side", type: "multi", title: "Lesquelles de ces activités as-tu déjà faites ?",
    hint: "Plusieurs choix possibles.",
    show: (a, has) => has("ww"),
    options: [
      { label: "La quête The Duviri Paradox", ids: ["duviri"] },
      { label: "La quête Angels of the Zariman", ids: ["zar"], show: (a, has) => has("newwar") },
      { label: "Le Railjack (Rising Tide)", ids: ["rail"] },
      { label: "Vaincre une Liche Kuva", ids: ["lich"] },
      { label: "Aucune", ids: [], none: true }
    ] },

  { id: "endgame", type: "multi", title: "Et côté fin de jeu ?",
    hint: "Dernière question !",
    show: (a, has) => has("sp") || has("newwar"),
    options: [
      { label: "Je fais des Arbitrages", ids: ["arbi"], show: (a, has) => has("star") },
      { label: "J'ai mes mods Galvanisés", ids: ["galva"], show: (a, has) => has("star") },
      { label: "Je fais la Chasse aux Archontes chaque semaine", ids: ["arch"], show: (a, has) => has("newwar") },
      { label: "J'ai des Fragments d'Archonte sur 2 Warframes", ids: ["shards"], show: (a, has) => has("newwar") },
      { label: "J'ai des armes Incarnon", ids: ["incar"], show: (a, has) => has("sp") },
      { label: "J'ai des Arcanes importants équipés", ids: ["arcane"] },
      { label: "Rien de tout ça pour l'instant", ids: [], none: true }
    ] }
];
