# Route Tenno

Guide de progression Warframe, du premier pas au level cap (MR 16 maximum). Outil de fan, non affilié à Digital Extremes.

- **Test de départ** : une question à la fois, avec une jauge d'avancement. Les réponses calculent les objectifs déjà faits.
- **Aujourd'hui** : les prochains objectifs classés **Essentiel**, **Recommandé** ou **Optionnel**, puis l'état du jeu en direct (alertes, invasions, fissures, Arbitrage, cycles).
- **Récompenses** : ce qui se refait chaque jour ou chaque semaine, avec le bon choix à faire, des liens vers le wiki et la rotation de la semaine quand elle est disponible (Circuit, Archontes, Teshin, Baro, Sortie, Nightwave). Les cases se décochent seules à la remise à zéro.
- **Où farmer ?** : recherche dans les tables de drop, triée par probabilité.
- **Parcours** : tous les objectifs, cochables à la main.

Aucun compte ni identifiant : tout reste dans le navigateur du joueur.

## Les fichiers

| Fichier | Ce qu'il contient | Quand le modifier |
|---|---|---|
| `index.html` | La page et son style | Changer un texte fixe ou l'apparence |
| `js/config.js` | L'adresse du relais Cloudflare | Une seule fois |
| `js/data.js` | Les objectifs du parcours | Ajouter, retirer ou reclasser un objectif |
| `js/quiz.js` | Les questions du test | Changer une question ou ses réponses |
| `js/rewards.js` | Les récompenses périodiques et les listes de priorité | Après une mise à jour du jeu |
| `js/api.js`, `js/app.js` | Le fonctionnement | En principe jamais |
| `worker/proxy.js` | Le code du relais Cloudflare | En principe jamais |

### Exemples de modifications

**Reclasser un objectif** : dans `js/data.js`, change `tier: "R"` en `tier: "O"` (E = Essentiel, R = Recommandé, O = Optionnel).

**Mettre à jour les Incarnon prioritaires** : dans `js/rewards.js`, modifie la liste `INCARNON_TOP` (priorité) ou `INCARNON_GOOD` (bon choix).

**Ajouter une récompense périodique** : copie un bloc `{ id: …, … }` dans `js/rewards.js`, donne-lui un `id` unique et adapte les textes.

**Un lien vers le wiki** s'écrit `["Wiki : Nom", "w:Nom de la page"]` : le lien ouvre la page si le titre existe, sinon la recherche du wiki.

Après une modification, change le numéro de version (`20261127a`) partout dans `index.html` : les navigateurs chargeront alors la nouvelle version au lieu de garder l'ancienne en mémoire.

## Mettre en ligne (GitHub Pages)

1. Dans ton dépôt GitHub : **Add file**, puis **Upload files**. Glisse tout le contenu du dossier (sauf `js/config.js` si ton relais est déjà réglé), puis **Commit changes**.
2. **Settings**, puis **Pages** : source **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le site est à l'adresse `https://<ton-pseudo>.github.io/<nom-du-dépôt>/`.

## Le relais Cloudflare (données en direct)

Les navigateurs bloquent les appels directs à l'API. Le relais les transmet :
1. Sur Cloudflare, ouvre **Workers & Pages** et crée un Worker, puis colle le contenu de `worker/proxy.js` et clique sur **Deploy**.
2. Mets son adresse dans `js/config.js`, ligne `proxy: "https://…workers.dev",`.

## Sources

- État du monde et tables de drop : [warframestat.us](https://docs.warframestat.us), API de la communauté (non officielle).
- Contenu du parcours et des récompenses : wiki officiel (wiki.warframe.com) et guides communautaires, vérifiés en novembre 2026 (mise à jour 44.1). Warframe évolue souvent : relis `js/rewards.js` après chaque grosse mise à jour.
