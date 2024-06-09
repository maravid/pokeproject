export interface PokemonDTO {
  id: number;
  name: string;
  image: string;
  type: string;
  height: number;
  weight: number;
  abilities: string[];
  heldItems: string[];
  moves: string[];
  artwork: string;
  cry: string;
}
