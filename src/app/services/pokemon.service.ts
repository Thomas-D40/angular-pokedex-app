import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonList } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  readonly #POKEMON_API_URL = 'http://localhost:3000/pokemons';
  private readonly httpClient = inject(HttpClient);

  getPokemonList(): Observable<PokemonList> {
    return this.httpClient.get<PokemonList>(this.#POKEMON_API_URL);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = this.#POKEMON_API_URL + '/' + id;

    return this.httpClient.get<Pokemon>(url);
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = this.#POKEMON_API_URL + '/' + pokemon.id;

    return this.httpClient.put<Pokemon>(url, pokemon);
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = this.#POKEMON_API_URL;

    return this.httpClient.post<Pokemon>(url, pokemon);
  }

  deletePokemon(id: number): Observable<void> {
    const url = this.#POKEMON_API_URL + '/' + id;
    return this.httpClient.delete<void>(url);
  }

  // Retourne la liste des types valides pour un pokémon.
  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
}
