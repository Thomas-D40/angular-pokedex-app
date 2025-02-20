import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getPokemonColor } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``,
})
export class PokemonProfileComponent {
  readonly #pokemonService: PokemonService = inject(PokemonService);
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(
    this.#pokemonService.getPokemonById(this.#pokemonId)
  );

  getPokemonColor(type: string | undefined) {
    if (type) {
      return getPokemonColor(type);
    }
    return '';
  }
}
