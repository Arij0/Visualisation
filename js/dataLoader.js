/* ============================================================
   Chargement, nettoyage et enrichissement du dataset
   (module commun : un seul point d'entrée pour les 4 vues)
   ------------------------------------------------------------
   - load()        : charge le CSV par défaut (CONFIG.DATA_URL)
   - loadFile(file): charge un CSV fourni par l'utilisateur
                     (exigence "changer de dataset")
   Retourne un objet { rows, meta }.
   ============================================================ */

const DataLoader = {
  _cache: null, // { rows, meta } — évite de recharger inutilement

  // Nettoie + enrichit une ligne brute du CSV
  _parseRow(d) {
    const C = CONFIG.COLUMNS;
    const num = (v) => (v === "" || v == null ? null : +v);

    const row = {
      id: d[C.id],
      name: d[C.name],
      artist: d[C.artist],
      genre: d[C.genre],
      subgenre: d[C.subgenre],
      popularity: num(d[C.popularity]),
      duration_ms: num(d[C.duration]),
    };

    // Features numériques
    CONFIG.FEATURES.forEach((f) => (row[f] = num(d[f])));
    CONFIG.FEATURES_TO_NORMALIZE.forEach((f) => (row[f] = num(d[f])));

    // ---- Variables calculées (dérivées, non stockées) ----
    row.year = Utils.extractYear(d[C.albumReleaseDate]);
    row.decade = Utils.decade(row.year);
    row.duration_min = row.duration_ms != null ? row.duration_ms / 60000 : null;
    row.mood = (row.valence != null && row.energy != null)
      ? row.valence * row.energy
      : null;

    return row;
  },

  // Dédoublonnage (un même titre apparaît dans plusieurs playlists)
  _dedupe(rows) {
    const seen = new Set();
    return rows.filter((r) => {
      if (!r.id || seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    });
  },

  // Calcule les métadonnées utiles aux vues
  _buildMeta(rows) {
    const genres = Array.from(new Set(rows.map((r) => r.genre))).filter(Boolean).sort();
    const subgenres = Array.from(new Set(rows.map((r) => r.subgenre))).filter(Boolean).sort();
    const years = rows.map((r) => r.year).filter((y) => y != null);
    return {
      count: rows.length,
      genres,
      subgenres,
      features: CONFIG.FEATURES.concat(CONFIG.FEATURES_TO_NORMALIZE),
      yearExtent: d3.extent(years),
      popularityExtent: d3.extent(rows, (r) => r.popularity),
    };
  },

  _process(raw) {
    let rows = raw.map((d) => this._parseRow(d));
    rows = this._dedupe(rows);
    const meta = this._buildMeta(rows);
    this._cache = { rows, meta };
    return this._cache;
  },

  // Charge le dataset par défaut
  async load() {
    if (this._cache) return this._cache;
    const raw = await d3.csv(CONFIG.DATA_URL);
    return this._process(raw);
  },

  // Charge un CSV fourni par l'utilisateur (input type="file")
  async loadFile(file) {
    const text = await file.text();
    const raw = d3.csvParse(text);
    return this._process(raw);
  },
};
