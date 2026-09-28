/* ============================================================
   VUE 4 — Heatmap de corrélation (matrice)      [Étudiant·e 4]
   ------------------------------------------------------------
   Objectif : révéler les relations entre features.
   Données  : matrice features x features · cellule = corrélation
              de Pearson calculée sur state.filtered.
   Mapping  : couleur divergente (bleu <-> gris <-> rouge).
   Overview : la matrice. Détails : clic cellule -> nuage de points
              des 2 features (details-on-demand).
   Interactions : clic (scatter lié), filtre par genre = recalcule
                  la matrice (via le Store, déjà branché).

   Piste d'implémentation :
   - features = state.meta.features ;
   - r(a,b) = corrélation de Pearson sur les paires (r[a], r[b])
     non nulles ; construire la matrice puis dessiner une grille
     (d3.scaleBand x/y) colorée par une échelle divergente
     d3.scaleLinear([-1,0,1], [bleu, gris, rouge]).
   ============================================================ */

function createHeatmapView(selector, store) {
  const svg = Utils.makeSvg(selector, 600, 340);

  function render(state) {
    Utils.clear(svg);
    const data = state.filtered;

    // TODO (Étudiant·e 4 — Maud) : calculer la matrice de corrélation et la dessiner.
    Utils.placeholder(svg, `Heatmap de corrélation — ${Utils.formatInt(data.length)} titres`);
  }

  store.subscribe(render);
  render(store.getState());
  return { render };
}
