import about from '../../tokens/about';

const aboutTranslation = {
  // Page
  [about.title]: 'API Integration Example',
  [about.subtitle]: 'This page demonstrates RTK Query integration with the',
  [about.subtitle2]: 'Click on a Pokémon to see its details. Data is fetched using RTK Query with caching.',

  // Pokemon
  [about.pokemonList]: 'Pokémon List',
  [about.pokemonDetails]: 'Pokémon Details',
  [about.searchPlaceholder]: 'Search on this page...',
  [about.loadingPokemon]: 'Loading Pokémon...',
  [about.failedToLoad]: 'Failed to load Pokémon list. Please try again.',
  [about.showing]: 'Showing',
  [about.of]: 'of',
  [about.pokemon]: 'Pokémon',
  [about.matches]: 'matches',
  [about.match]: 'match',
  [about.onThisPage]: 'on this page',

  // Empty States
  [about.noPokemonFound]: 'No Pokémon found matching',
  [about.tryDifferentSearch]: 'Try a different search or change the page.',
  [about.noPokemonSelected]: 'No Pokémon selected',
  [about.selectPokemon]: 'Select a Pokémon to view details',

  // Actions
  [about.backToHome]: '← Back to Home',
};

export default aboutTranslation;
