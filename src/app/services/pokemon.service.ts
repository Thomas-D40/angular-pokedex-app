import { Injectable } from '@angular/core';
import { POKEMON_LIST } from '../models/pokemon-list.fake';
import { Pokemon, PokemonList } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  getPokemonList(): PokemonList {
    return POKEMON_LIST;
  }

  getPokemonById(id: number): Pokemon {
    const pokemon = POKEMON_LIST.find(
      (pokemon: { id: number }) => pokemon.id === id
    );

    if (!pokemon) {
      throw new Error('No Pokemon found with id ${id}');
    }

    return pokemon;
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
