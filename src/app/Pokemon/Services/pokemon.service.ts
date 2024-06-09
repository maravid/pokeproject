import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { PaginatedPokemonDTO } from '../Models/paginatedPokemon.interface';
import { PokemonDTO } from '../Models/pokemon.interface';
import {
  PokemonData,
  PokemonResults,
  Result,
} from '../Models/pokemonApi.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getAllPokemonsPaginated(
    offset: number = 0,
    limit: number = 5
  ): Observable<PaginatedPokemonDTO> {
    return this.http
      .get<PokemonResults>(`${this.apiUrl}/?offset=${offset}&limit=${limit}`)
      .pipe(
        switchMap((response: PokemonResults) => {
          const pokemonDetailsRequests = response.results.map(
            (result: Result) =>
              this.http
                .get<PokemonData>(result.url)
                .pipe(
                  map((pokemonData: PokemonData) =>
                    this.mapPokemonData(pokemonData)
                  )
                )
          );

          return forkJoin(pokemonDetailsRequests).pipe(
            map((pokemonDTOs: PokemonDTO[]) => {
              return {
                count: response.count,
                next: response.next,
                previous: response.previous,
                results: pokemonDTOs,
              } as PaginatedPokemonDTO;
            })
          );
        })
      );
  }

  getPokemonById(id: number): Observable<PokemonDTO> {
    return this.http
      .get<PokemonData>(`${this.apiUrl}/${id}/`)
      .pipe(
        map((pokemonData: PokemonData) => this.mapPokemonData(pokemonData))
      );
  }

  private mapPokemonData(data: PokemonData): PokemonDTO {
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      type: data.types.reduce((acc, type) => {
        return acc + ' ' + type.type.name;
      }, ''),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((ability) => ability.ability.name),
      heldItems: data.held_items.map((item) => item.item.name),
      moves: data.moves.map((move) => move.move.name),
      artwork: data.sprites.other?.['official-artwork'].front_default,
      cry: data.cries.latest,
    } as PokemonDTO;
  }
}
