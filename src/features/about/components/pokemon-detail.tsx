import type { FC } from 'react';

import { Badge, Card, Column, Grid, Heading, Image, ProgressBar, Row, Text } from '@components/core';
import type { Pokemon } from '@services/pokemon';

import { getTypeColor } from '../types';

interface PokemonDetailProps {
  pokemon: Pokemon;
}

const PokemonDetail: FC<PokemonDetailProps> = ({ pokemon }) => {
  return (
    <Card variant="default">
      {/* Image */}
      <Row justify="center" className="mb-4">
        <Image
          src={
            pokemon.sprites.other?.['official-artwork']?.front_default ||
            pokemon.sprites.front_default ||
            ''
          }
          alt={pokemon.name}
          className="h-40 w-40 object-contain"
        />
      </Row>

      {/* Name & ID */}
      <Column align="center" gap="xs" className="mb-4">
        <Heading as="h3" size="xl" className="capitalize">
          {pokemon.name}
        </Heading>
        <Text color="muted">
          #{String(pokemon.id).padStart(3, '0')}
        </Text>
      </Column>

      {/* Types */}
      <Row justify="center" gap="sm" className="mb-4">
        {pokemon.types.map((t) => (
          <Badge
            key={t.type.name}
            variant="solid"
            pill
            className={`capitalize ${getTypeColor(t.type.name)}`}
          >
            {t.type.name}
          </Badge>
        ))}
      </Row>

      {/* Stats */}
      <Grid cols={2} gap="sm" className="mb-4">
        <Card variant="outlined" padding="sm" className="text-center">
          <Text size="sm" color="muted">Height</Text>
          <Text weight="semibold">{pokemon.height / 10}m</Text>
        </Card>
        <Card variant="outlined" padding="sm" className="text-center">
          <Text size="sm" color="muted">Weight</Text>
          <Text weight="semibold">{pokemon.weight / 10}kg</Text>
        </Card>
      </Grid>

      {/* Base Stats */}
      <Column gap="sm">
        <Heading as="h4" size="sm" color="muted">Base Stats</Heading>
        {pokemon.stats.map((stat) => (
          <Row key={stat.stat.name} gap="sm" align="center">
            <Text size="xs" color="muted" className="w-20 capitalize">
              {stat.stat.name.replace('-', ' ')}
            </Text>
            <ProgressBar
              value={stat.base_stat}
              max={255}
              size="sm"
              color="primary"
              className="flex-1"
            />
            <Text size="xs" weight="medium" className="w-8 text-right">
              {stat.base_stat}
            </Text>
          </Row>
        ))}
      </Column>
    </Card>
  );
};

export default PokemonDetail;
