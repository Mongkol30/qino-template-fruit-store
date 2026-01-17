import { createExternalApi } from '@services/api';

// ============ Types ============
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  base_experience: number;
}

// ============ Create External API ============
/**
 * Pokemon API - External API (no auth required)
 * Using createExternalApi factory for third-party APIs
 */
const pokemonExternalApi = createExternalApi({
  reducerPath: 'pokemonApi',
  baseUrl: 'https://pokeapi.co/api/v2/',
  tagTypes: ['Pokemon', 'PokemonList'],
  // No auth needed for Pokemon API
  // If needed, you could add:
  // apiKeyHeader: 'X-API-Key',
  // apiKey: import.meta.env.VITE_POKEMON_API_KEY,
});

// ============ Inject Endpoints ============
export const pokemonApi = pokemonExternalApi.api.injectEndpoints({
  endpoints: (builder) => ({
    // Get list of pokemon
    getPokemonList: builder.query<
      PokemonListResponse,
      { limit?: number; offset?: number } | void
    >({
      query: (params) => ({
        url: 'pokemon',
        params: {
          limit: params?.limit ?? 20,
          offset: params?.offset ?? 0,
        },
      }),
      providesTags: ['PokemonList'],
    }),

    // Get single pokemon by name or id
    getPokemon: builder.query<Pokemon, string | number>({
      query: (nameOrId) => ({
        url: `pokemon/${nameOrId}`,
      }),
      providesTags: (_result, _error, nameOrId) => [
        { type: 'Pokemon', id: String(nameOrId) },
      ],
    }),
  }),
});

// ============ Exports ============
// Reducer and middleware for store
export const pokemonQueryReducer = pokemonExternalApi.reducer;
export const pokemonMiddleware = pokemonExternalApi.middleware;

// Hooks
export const {
  useGetPokemonListQuery,
  useGetPokemonQuery,
  useLazyGetPokemonQuery,
  useLazyGetPokemonListQuery,
} = pokemonApi;
