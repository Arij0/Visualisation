/* ============================================================
   BONUS — Carte (location)                         [équipe]
   ------------------------------------------------------------
   Objectif : "d'où vient la musique" (pays d'origine de
   l'artiste). ATTENTION : le dataset n'a PAS de colonne pays ->
   variable ENRICHIE (artiste -> pays d'origine, source externe).
   À faire seulement après le cœur du projet.

   Mapping  : couleur = popularité moyenne · taille = nb de titres.
   ============================================================ */

function createChoroplethView(selector, store) {
  const svg = Utils.makeSvg(selector, 600, 340);

  function render(state) {
    Utils.clear(svg);
    // TODO (bonus) : enrichir artiste -> pays puis dessiner la carte.
    Utils.placeholder(svg, "Carte (bonus) — nécessite l'enrichissement pays");
  }

  store.subscribe(render);
  render(store.getState());
  return { render };
}
