import { useCallback, useEffect, useRef } from 'react';

import {
    type Pokemon,
    type PokemonListResponse,
    useGetPokemonListQuery,
    useGetPokemonQuery,
} from '@services/pokemon';

// Types
export interface UseGetPokemonListOptions {
  limit?: number;
  offset?: number;
  skip?: boolean;
  onSuccess?: (response: PokemonListResponse) => void;
  onError?: (error: unknown) => void;
}

export interface UseGetPokemonListResult {
  refetch: () => void;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  data: PokemonListResponse | undefined;
}

export function useGetPokemonList(
  options: UseGetPokemonListOptions = {}
): UseGetPokemonListResult {
  const { limit = 20, offset = 0, skip = false, onSuccess, onError } = options;

  const lastDataRef = useRef<PokemonListResponse | undefined>(undefined);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetPokemonListQuery({ limit, offset }, { skip });

  useEffect(() => {
    if (data && data !== lastDataRef.current) {
      lastDataRef.current = data;
      onSuccess?.(data);
    }
  }, [data, onSuccess]);

  useEffect(() => {
    if (isError && error) {
      onError?.(error);
    }
  }, [isError, error, onError]);

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    refetch: handleRefetch,
    isLoading,
    isFetching,
    isError,
    error,
    data,
  };
}

// Hook for getting single pokemon
export interface UseGetPokemonOptions {
  nameOrId?: string | number;
  skip?: boolean;
  onSuccess?: (response: Pokemon) => void;
  onError?: (error: unknown) => void;
}

export interface UseGetPokemonResult {
  refetch: () => void;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  data: Pokemon | undefined;
}

export function useGetPokemon(
  options: UseGetPokemonOptions = {}
): UseGetPokemonResult {
  const { nameOrId, skip = false, onSuccess, onError } = options;

  const lastDataRef = useRef<Pokemon | undefined>(undefined);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetPokemonQuery(nameOrId ?? '', {
      skip: !nameOrId || skip,
    });

  useEffect(() => {
    if (data && data !== lastDataRef.current) {
      lastDataRef.current = data;
      onSuccess?.(data);
    }
  }, [data, onSuccess]);

  useEffect(() => {
    if (isError && error) {
      onError?.(error);
    }
  }, [isError, error, onError]);

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    refetch: handleRefetch,
    isLoading,
    isFetching,
    isError,
    error,
    data,
  };
}
