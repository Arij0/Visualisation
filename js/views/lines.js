/* ============================================================
   VUE 3 — Courbes multiples (temporel)          [Étudiant·e 3]
   ------------------------------------------------------------
   Objectif : suivre l'évolution des genres / d'une feature.
   Données  : year (ou decade) x genre x (nb de titres OU
              moyenne d'une feature).
   Mapping  : X = période · Y = valeur · couleur = genre ·
              1 ligne par genre.
   Overview : toutes les décennies. Détails : survol d'une année.
   Interactions : sélecteur de feature, filtre par genre.

   Note : le dataset est concentré sur 2019 et pauvre avant
   1985 -> agréger par période (d3.rollup) et le signaler.
   ============================================================ */

function createLinesView(selector, store) {
  const svg = Utils.makeSvg(selector, 600, 340);

  function render(state) {
    Utils.clear(svg);
    const data = state.filtered;

    // TODO (Étudiant·e 3) : agréger par période et tracer une ligne par genre.
    Utils.placeholder(svg, `Courbes multiples — ${Utils.formatInt(data.length)} titres`);
  }

  store.subscribe(render);
  render(store.getState());
  return { render };
}
