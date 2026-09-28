/* ============================================================
   Fonctions utilitaires partagées
   ============================================================ */

const Utils = {
  // Extrait l'année depuis une date qui peut être "YYYY" ou "YYYY-MM-DD"
  extractYear(dateStr) {
    if (!dateStr) return null;
    const m = String(dateStr).match(/\d{4}/);
    return m ? +m[0] : null;
  },

  // Décennie d'une année (1994 -> 1990)
  decade(year) {
    return year == null ? null : Math.floor(year / 10) * 10;
  },

  // Normalisation min-max vers 0..1
  normalize(value, min, max) {
    if (max === min) return 0;
    return (value - min) / (max - min);
  },

  // Formatage nombre "fr" (32 833)
  formatInt(n) {
    return new Intl.NumberFormat("fr-FR").format(Math.round(n));
  },

  // Anti-rebond (utile pour les sliders / resize)
  debounce(fn, delay = 150) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // Moyenne d'un tableau selon un accesseur
  mean(rows, accessor) {
    if (!rows.length) return 0;
    return d3.mean(rows, accessor);
  },

  // Vide un conteneur (SVG ou div) avant un nouveau rendu
  clear(selection) {
    selection.selectAll("*").remove();
  },

  // Crée un SVG responsive (largeur 100%, ratio conservé via viewBox)
  makeSvg(rootSelector, width = 600, height = 340) {
    return d3
      .select(rootSelector)
      .append("svg")
      .attr("class", "viz-svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", "100%");
  },

  // Placeholder affiché tant que la vue n'est pas implémentée
  placeholder(svg, note) {
    const vb = svg.attr("viewBox").split(" ").map(Number);
    const w = vb[2], h = vb[3];
    const g = svg.append("g").attr("text-anchor", "middle");
    g.append("rect")
      .attr("x", 8).attr("y", 8)
      .attr("width", w - 16).attr("height", h - 16)
      .attr("rx", 10).attr("fill", "none")
      .attr("stroke", "#cfd3da").attr("stroke-dasharray", "6 5");
    g.append("text")
      .attr("x", w / 2).attr("y", h / 2)
      .attr("fill", "#9aa0a6").attr("font-size", 14)
      .text(note || "à implémenter");
    return g;
  },
};
