# Route Tenno

Guide de progression Warframe, du MR 0 au level cap (MR 16 maximum) :
- **Parcours** : 43 objectifs avec prérequis, recalculés à chaque étape validée.
- **Aujourd'hui** : état du monde en direct (alertes, invasions, fissures, Baro, Sortie, Chasse aux Archontes, Teshin, Arbitrage, Nightwave, cycles), trié selon ta progression. Les récompenses utiles pour toi (Catalyseur, Réacteur, Forma…) sont surlignées.
- **Où farmer ?** : recherche dans les tables de drop, triée par probabilité.
- **Pré-remplissage par identifiant de compte** : lecture seule du profil public (MR, clan, missions et Steel Path, syndicats, objets montés, intrinsèques). Aucune connexion ni mot de passe. DE ne permet plus la recherche par pseudo : le joueur colle son identifiant (24 caractères), qu'il trouve en se connectant sur warframe.com puis en ouvrant warframe.com/api/user-data (champ `user_id`). Les quêtes, les mods, les Forma et l'Helminth n'y figurent pas : le joueur les coche lui-même.
- **Liens** : chaque objectif renvoie vers les pages utiles du wiki officiel (wiki.warframe.com) et, selon le cas, vers Overframe, warframe.market ou les tables de drop.

Site statique : pas de compilation, pas de serveur. La progression reste dans le navigateur du joueur.

## Mettre en ligne avec GitHub Pages (gratuit, environ 5 minutes)

1. Crée un compte sur github.com, puis un nouveau dépôt public (par exemple `route-tenno`).
2. Clique sur « Add file » puis « Upload files » et glisse tout le contenu de ce dossier (`index.html`, `js/`, `worker/`, `README.md`). Valide avec « Commit changes ».
3. Va dans « Settings », puis « Pages ». Dans « Source », choisis « Deploy from a branch », sélectionne la branche `main` et le dossier `/ (root)`, puis « Save ».
4. Au bout d'une minute ou deux, le site est disponible à l'adresse `https://<ton-pseudo>.github.io/route-tenno/`.

Pour tester sur ton ordinateur avant de mettre en ligne : `python3 -m http.server` dans ce dossier, puis ouvre http://localhost:8000.

## Si « Données en direct indisponibles » s'affiche

C'est probablement un blocage CORS : le navigateur refuse les appels directs à l'API. Pour le contourner, passe par un petit relais :
1. Crée un compte gratuit sur Cloudflare, puis va dans « Workers & Pages » et crée un Worker.
2. Colle le contenu de `worker/proxy.js` et déploie.
3. Dans `js/config.js`, mets l'adresse du worker dans `proxy` (par exemple `proxy: "https://route-tenno.<compte>.workers.dev",`). Le worker relaie à la fois l'état du monde, les tables de drop et le profil public.

## Modifier le contenu

- **Parcours** : `js/data.js`. Chaque objectif suit le format `[id, phase, titre, MR minimum, [prérequis], priorité 1-5, heures estimées, pourquoi, [liens], libellé dans le questionnaire ou null, MR atteint (seulement pour les paliers de MR)]`. Un lien s'écrit `["Libellé", "https://…"]`, ou `["Libellé", "w:Nom de la page"]` pour le wiki : la recherche du wiki ouvre directement la page si le titre existe, sinon les résultats.
- **Règles de pré-remplissage** : fonction `inferFromProfile()` dans `js/app.js`. Elles ont été écrites d'après la structure connue du profil public, sans test sur un vrai compte : vérifie-les avec ton propre pseudo.
- **Boutons « Où farmer »** d'un objectif : objet `DROPS` en bas de `js/data.js`. Les noms sont en anglais.
- **Règles du bloc « Aujourd'hui »** : fonction `tiles()` dans `js/app.js`.

## Sources de données

- Profil public : `getProfileViewingData.php` de DE (api.warframe.com et ses équivalents par plateforme), en lecture seule, comme l'onglet Profil en jeu. Cache d'une heure par identifiant. Trop de requêtes, surtout avec des identifiants invalides, peuvent bloquer temporairement l'adresse IP : l'appli vérifie le format avant d'appeler et attend une minute après un échec.
- État du monde et tables de drop : [warframestat.us](https://docs.warframestat.us), API maintenue par la communauté (WFCD). Elle n'est pas officielle : si un champ change, adapte `tiles()`.
- Outil de fan, non affilié à Digital Extremes.
