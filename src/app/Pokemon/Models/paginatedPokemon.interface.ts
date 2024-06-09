import { PokemonDTO } from './pokemon.interface';

export interface PaginatedPokemonDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDTO[];
}
