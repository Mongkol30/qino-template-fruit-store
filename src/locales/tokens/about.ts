// About tokens (Type-safe translation keys)
const about = {
  // Page
  title: 'about.title',
  subtitle: 'about.subtitle',
  subtitle2: 'about.subtitle2',

  // Pokemon
  pokemonList: 'about.pokemonList',
  pokemonDetails: 'about.pokemonDetails',
  searchPlaceholder: 'about.searchPlaceholder',
  loadingPokemon: 'about.loadingPokemon',
  failedToLoad: 'about.failedToLoad',
  showing: 'about.showing',
  of: 'about.of',
  pokemon: 'about.pokemon',
  matches: 'about.matches',
  match: 'about.match',
  onThisPage: 'about.onThisPage',

  // Empty States
  noPokemonFound: 'about.noPokemonFound',
  tryDifferentSearch: 'about.tryDifferentSearch',
  noPokemonSelected: 'about.noPokemonSelected',
  selectPokemon: 'about.selectPokemon',

  // Actions
  backToHome: 'about.backToHome',
} as const;

export default about;
