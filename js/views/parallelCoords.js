/* ============================================================
   VUE 1 — Coordonnées parallèles (multivarié)   [Étudiant·e 1]
   ------------------------------------------------------------
   Objectif : comparer le profil audio des genres.
   Données  : CONFIG.FEATURES (+ tempo, loudness normalisés).
   Mapping  : 1 axe vertical par feature · 1 ligne = 1 titre ·
              couleur = genre (genreColor).
   Overview : moyennes par genre. Détails : survol -> tooltip.
   Interactions : brushing sur un axe, réordonner les axes,
                  filtrer par genre.

   Coordination :
   - lire les données filtrées dans state.filtered ;
   - au brushing, appeler store.setFilter({...}) ou
     store.setSelection({...}) pour mettre à jour les autres vues.
   ============================================================ */

function createParallelCoordsView(selector, store) {
  const svg = Utils.makeSvg(selector, 600, 340);

  function render(state) {
    Utils.clear(svg);
    const data = state.filtered;

    // TODO (Étudiant·e 1) : dessiner les coordonnées parallèles.
    Utils.placeholder(svg, `Coordonnées parallèles — ${Utils.formatInt(data.length)} titres`);
  }

  store.subscribe(render);
  render(store.getState());
  return { render };
}
