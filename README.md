# Spotify · Tableau de bord de visualisation

Projet *Information Visualization* — visualisations interactives en **D3.js** à partir du dataset **Spotify Songs** (~32 000 titres, 6 genres, 24 sous-genres).

Un même dataset, **4 visualisations coordonnées** (+ 1 bonus) : sélectionner ou filtrer dans une vue met à jour les autres.

## Lancer le projet

Il faut un petit serveur local (le chargement du CSV ne marche pas en `file://`).

```bash
# depuis le dossier du projet
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000>.
(ou utiliser l'extension « Live Server » de VS Code.)

## Structure

```
index.html          page unique (barre de filtres + grille des vues)
css/style.css        style commun
data/spotify_songs.csv   le dataset
js/
  config.js          colonnes, features, genres, couleurs
  utils.js           fonctions utilitaires (SVG responsive, helpers)
  dataLoader.js      chargement + nettoyage + enrichissement du CSV
  store.js           état partagé + coordination (brushing & linking)
  main.js            orchestrateur (filtres, instanciation des vues)
  views/
    parallelCoords.js   Vue 1 — coordonnées parallèles (multivarié)
    treemap.js          Vue 2 — treemap / sunburst (hiérarchie)
    lines.js            Vue 3 — courbes multiples (temporel)
    heatmap.js          Vue 4 — heatmap de corrélation (matrice)
    choropleth.js       Bonus — carte (location)
```

## Le socle commun (déjà en place)

- **`dataLoader.js`** — charge le CSV, dédoublonne (`track_id`), et calcule les variables dérivées : `year`, `decade`, `duration_min`, `mood = valence × energy`. Fournit aussi `loadFile()` pour l'exigence « changer de dataset ».
- **`store.js`** — état partagé. Les vues s'abonnent (`Store.subscribe`) et se redessinent quand un filtre (genre, popularité…) ou une sélection change ailleurs. C'est ce qui rend les vues **coordonnées**.
- **`main.js`** — construit la barre de filtres commune, gère le changement de dataset, et instancie les 5 vues.

## Où chacun développe

Chaque membre remplit **uniquement son fichier** dans `js/views/`. Le contrat est le même partout :

```js
function createMaVue(selector, store) {
  const svg = Utils.makeSvg(selector);
  function render(state) {
    Utils.clear(svg);
    const data = state.filtered;   // données filtrées par la barre commune
    // ... dessiner ici ...
  }
  store.subscribe(render);         // se redessine quand l'état change
  render(store.getState());
  return { render };
}
```

- lire les données dans `state.filtered` ;
- pour propager une sélection aux autres vues : `store.setSelection({...})` ou `store.setFilter({...})` ;
- chaque vue doit offrir **deux niveaux** (overview + détails) et des **interactions**.

## Répartition

| Vue | Fichier | Famille |
|---|---|---|
| Coordonnées parallèles | `views/parallelCoords.js` | multivarié |
| Treemap / sunburst | `views/treemap.js` | hiérarchie |
| Courbes multiples | `views/lines.js` | temporel |
| Heatmap de corrélation | `views/heatmap.js` | matrice |
| Carte (bonus) | `views/choropleth.js` | location |

## Dataset

`spotify_songs.csv` (TidyTuesday, 2020-01-21). Colonnes principales : `track_name`, `track_artist`, `track_popularity`, `track_album_release_date`, `playlist_genre`, `playlist_subgenre`, et les features audio (`danceability`, `energy`, `valence`, `acousticness`, `speechiness`, `instrumentalness`, `liveness`, `tempo`, `loudness`, `duration_ms`).
