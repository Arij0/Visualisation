/* ============================================================
   État partagé + coordination des vues (brushing & linking)
   ------------------------------------------------------------
   C'est le cœur du "tableau de bord coordonné" : chaque vue
   s'abonne au Store et se redessine quand un filtre ou une
   sélection change ailleurs.

   API :
   - Store.init(rows, meta)      : injecte les données
   - Store.subscribe(fn)         : fn(state) appelée à chaque MAJ
   - Store.setFilter({...})      : met à jour genre / année / popularité...
   - Store.setSelection(sel)     : surbrillance croisée entre vues
   - Store.getState()            : lit l'état courant
   ============================================================ */

const Store = {
  _subscribers: [],
  state: {
    rows: [],        // toutes les données (nettoyées)
    filtered: [],    // données après application des filtres
    meta: {},
    filters: {
      genre: null,        // ex. "pop" ou null (= tous)
      subgenre: null,
      yearRange: null,    // [min, max] ou null
      minPopularity: 0,   // 0..100
    },
    selection: null,      // objet libre défini par une vue (ex. un titre survolé)
  },

  init(rows, meta) {
    this.state.rows = rows;
    this.state.meta = meta;
    this.state.filters.yearRange = meta.yearExtent ? meta.yearExtent.slice() : null;
    this._applyFilters();
    this._notify();
  },

  subscribe(fn) {
    this._subscribers.push(fn);
    return () => {
      this._subscribers = this._subscribers.filter((f) => f !== fn);
    };
  },

  setFilter(patch) {
    Object.assign(this.state.filters, patch);
    this._applyFilters();
    this._notify();
  },

  setSelection(sel) {
    this.state.selection = sel;
    this._notify();
  },

  getState() {
    return this.state;
  },

  // Recalcule state.filtered à partir des filtres courants
  _applyFilters() {
    const f = this.state.filters;
    this.state.filtered = this.state.rows.filter((r) => {
      if (f.genre && r.genre !== f.genre) return false;
      if (f.subgenre && r.subgenre !== f.subgenre) return false;
      if (f.minPopularity && (r.popularity == null || r.popularity < f.minPopularity)) return false;
      if (f.yearRange && r.year != null && (r.year < f.yearRange[0] || r.year > f.yearRange[1])) return false;
      return true;
    });
  },

  _notify() {
    this._subscribers.forEach((fn) => fn(this.state));
  },
};
