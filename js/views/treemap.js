/* ============================================================
   VUE 2 — Treemap / Sunburst (hiérarchie)       [Étudiant·e 2]
   ------------------------------------------------------------
   Objectif : décomposer le catalogue.
   Données  : hiérarchie genre -> sous-genre -> artiste -> titres.
   Mapping  : taille = nb de titres · couleur = genre.
   Overview : tous les genres. Détails : drill-down au clic
              (+ fil d'Ariane), tooltip.
   Interactions : clic (zoom), fil d'Ariane, survol.

   Astuce : construire la hiérarchie avec d3.group puis
   d3.hierarchy(...).sum(...). Utiliser state.filtered.
   ============================================================ */

function createTreemapView(selector, store) {
  const svg = Utils.makeSvg(selector, 600, 340);

  function render(state) {
    Utils.clear(svg);
    const data = state.filtered;

    // TODO (Étudiant·e 2) : construire la hiérarchie et dessiner la treemap/sunburst.
    Utils.placeholder(svg, `Treemap / sunburst — ${Utils.formatInt(data.length)} titres`);
  }

  store.subscribe(render);
  render(store.getState());
  return { render };
}
