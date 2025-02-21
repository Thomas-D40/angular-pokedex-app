import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: '.pokemon-card { cursor: pointer;}',
})
export class PokemonListComponent {
  readonly #pokemonservice = inject(PokemonService);
  pokemonList = toSignal(this.#pokemonservice.getPokemonList(), {
    initialValue: [],
  });
  readonly searchTerm = signal('');

  filteredPokemonList = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase().trim();
    const pokemonList = this.pokemonList();
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
  });

  readonly loading = computed(() => this.pokemonList().length === 0);

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }
}
