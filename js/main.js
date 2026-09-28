/* ============================================================
   Point d'entrée : charge les données, construit la barre de
   filtres commune, instancie les 4 vues (+ bonus) et les relie
   au Store (vues coordonnées).
   ============================================================ */

(async function () {
  const status = document.getElementById("status");

  try {
    const { rows, meta } = await DataLoader.load();
    Store.init(rows, meta);

    setupFilters(meta);
    setupDatasetSwitch();

    // Instanciation des vues — chaque membre remplit son fichier dans js/views/
    createParallelCoordsView("#view-parallel", Store);
    createTreemapView("#view-treemap", Store);
    createLinesView("#view-lines", Store);
    createHeatmapView("#view-heatmap", Store);
    createChoroplethView("#view-choropleth", Store);

    // Indicateur "N titres affichés" (démo de la coordination)
    Store.subscribe((state) => {
      status.textContent = `${Utils.formatInt(state.filtered.length)} titres affichés`;
    });
    status.textContent = `${Utils.formatInt(Store.getState().filtered.length)} titres affichés`;
  } catch (e) {
    console.error(e);
    status.textContent = "Erreur de chargement du dataset : " + e.message;
  }
})();

// Barre de filtres commune (genre + popularité minimale) -> Store
function setupFilters(meta) {
  const genreSel = document.getElementById("filter-genre");
  genreSel.innerHTML = '<option value="">Tous les genres</option>';
  meta.genres.forEach((g) => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = (CONFIG.GENRE_LABELS[g] || g);
    genreSel.appendChild(opt);
  });
  genreSel.onchange = () => Store.setFilter({ genre: genreSel.value || null });

  const popRange = document.getElementById("filter-pop");
  const popVal = document.getElementById("filter-pop-val");
  popRange.oninput = () => (popVal.textContent = popRange.value);
  popRange.onchange = () => Store.setFilter({ minPopularity: +popRange.value });
}

// "Changer de dataset" : recharge un CSV fourni par l'utilisateur
function setupDatasetSwitch() {
  const input = document.getElementById("dataset-file");
  input.onchange = async () => {
    if (!input.files || !input.files[0]) return;
    const status = document.getElementById("status");
    status.textContent = "Chargement du nouveau dataset…";
    try {
      const { rows, meta } = await DataLoader.loadFile(input.files[0]);
      Store.init(rows, meta);
      setupFilters(meta); // reconstruit la liste des genres
    } catch (e) {
      console.error(e);
      status.textContent = "Erreur : CSV invalide (" + e.message + ")";
    }
  };
}
