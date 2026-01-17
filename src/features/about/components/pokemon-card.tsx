import type { FC } from 'react';

import { Card, Column, Heading, Text } from '@components/core';

interface PokemonCardProps {
  name: string;
  pokemonId: string;
  isSelected: boolean;
  onClick: () => void;
}

const PokemonCard: FC<PokemonCardProps> = ({
  name,
  pokemonId,
  isSelected,
  onClick,
}) => {
  return (
    <Card
      variant="default"
      hoverable
      clickable
      onClick={onClick}
      className={`text-left transition-all hover:border-primary-400 dark:hover:border-primary-500 ${
        isSelected
          ? 'border-primary-500 bg-primary-50 shadow-md dark:bg-primary-950/30'
          : ''
      }`}
    >
      <Column gap="sm">
        <Text size="lg" weight="bold" color="muted">
          #{String(pokemonId).padStart(3, '0')}
        </Text>
        <Heading as="h3" size="md" className="capitalize">
          {name}
        </Heading>
      </Column>
    </Card>
  );
};

export default PokemonCard;
