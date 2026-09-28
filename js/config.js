/* ============================================================
   Configuration commune à toutes les visualisations
   (constantes, colonnes, features, genres, couleurs)
   ============================================================ */

const CONFIG = {
  // Dataset par défaut (rechargeable via l'input "Changer de dataset")
  DATA_URL: "data/spotify_songs.csv",

  // Colonnes brutes du CSV (voir README)
  COLUMNS: {
    id: "track_id",
    name: "track_name",
    artist: "track_artist",
    popularity: "track_popularity",
    albumReleaseDate: "track_album_release_date",
    genre: "playlist_genre",
    subgenre: "playlist_subgenre",
    duration: "duration_ms",
  },

  // Features audio numériques déjà dans l'intervalle 0..1
  FEATURES: [
    "danceability", "energy", "valence",
    "acousticness", "speechiness", "instrumentalness", "liveness",
  ],

  // Features numériques à normaliser (échelles différentes)
  FEATURES_TO_NORMALIZE: ["tempo", "loudness"],

  // Libellés lisibles
  FEATURE_LABELS: {
    danceability: "Danceability",
    energy: "Energy",
    valence: "Valence",
    acousticness: "Acousticness",
    speechiness: "Speechiness",
    instrumentalness: "Instrumentalness",
    liveness: "Liveness",
    tempo: "Tempo",
    loudness: "Loudness",
    track_popularity: "Popularité",
  },

  // Les 6 genres du dataset
  GENRES: ["pop", "rap", "rock", "latin", "r&b", "edm"],

  GENRE_LABELS: {
    pop: "Pop", rap: "Rap", rock: "Rock",
    latin: "Latin", "r&b": "R&B", edm: "EDM",
  },

  // Palette catégorielle (accessible daltoniens)
  GENRE_COLORS: {
    pop: "#2a78d6",
    rap: "#eb6834",
    rock: "#1baf7a",
    latin: "#eda100",
    "r&b": "#e87ba4",
    edm: "#008300",
  },
};

// Couleur d'un genre (gris par défaut si inconnu)
function genreColor(g) {
  return CONFIG.GENRE_COLORS[g] || "#9aa0a6";
}
