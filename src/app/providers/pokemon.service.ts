import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  pokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  pokemonTypeUrl: string = 'https://pokeapi.co/api/v2/type';
  pokemonFromTypeUrl: string = 'https://pokeapi.co/api/v2/type/';
  spriteUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  fetchPokemon(offset: number, limit: number) {
    /**
     * The URL above when opened in Postman returns paginated results
     * To better work with it, I will make this function that receives parameters to...
     * help load a certain number of Pokemon Resources per page
     */
    return this.http
      .get(`${this.pokemonUrl}?offset=${offset}&limit=${limit}`)
      .toPromise()
      .then(res => res['results'])
      .then(items =>
        items.map((item, index) => {
          const id: number = index + offset + 1;

          return {
            name: item.name,
            sprite: `${this.spriteUrl}${id}.png`,
            id,
            url: item.url
          };
        })
      );
  }

  fetchPokemonType(offset: number, limit: number) {
    return this.http
      .get(`${this.pokemonTypeUrl}?offset=${offset}&limit=${limit}`)
      .toPromise()
      .then(res => res['results'])
      .then(items =>
        items.map((item, index) => {
          const id: number = index + offset + 1;

          return {
            name: item.name,
            id,
            url: item.url
          };
        })
      );
  }

  fetchPokemonByType(id: number) {
    return this.http
      .get(`${this.pokemonFromTypeUrl}${id}`)
      .toPromise()
      .then(res => res['pokemon'])
      .then(data => data);
  }
}
