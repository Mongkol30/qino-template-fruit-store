/**
 * Pokemon type color mapping
 */
export const POKEMON_TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-stone-500',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

/**
 * Get the background color class for a Pokemon type
 */
export const getTypeColor = (type: string): string => {
  return POKEMON_TYPE_COLORS[type] || 'bg-gray-500';
};
