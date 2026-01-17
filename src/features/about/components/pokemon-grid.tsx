import type { FC } from 'react';

import { Grid } from '@components/core';
import type { PokemonListItem } from '@services/pokemon';

import PokemonCard from './pokemon-card';

interface PokemonGridProps {
  pokemon: PokemonListItem[];
  selectedPokemon: string | null;
  onSelectPokemon: (name: string) => void;
}

const PokemonGrid: FC<PokemonGridProps> = ({
  pokemon,
  selectedPokemon,
  onSelectPokemon,
}) => {
  return (
    <Grid cols={1} colsSm={2} colsMd={3} gap="md">
      {pokemon.map((p) => {
        // Extract ID from URL
        const urlParts = p.url.split('/');
        const pokemonId = urlParts[urlParts.length - 2];

        return (
          <PokemonCard
            key={p.name}
            name={p.name}
            pokemonId={pokemonId}
            isSelected={selectedPokemon === p.name}
            onClick={() => onSelectPokemon(p.name)}
          />
        );
      })}
    </Grid>
  );
};

export default PokemonGrid;
