import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';
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
  readonly #router = inject(Router);

  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));

  readonly #pokemonResponse = toSignal(
    this.#pokemonService.getPokemonById(this.#pokemonId).pipe(
      map((pokemon) => ({
        value: pokemon,
        error: undefined,
      })),
      catchError((error) => of({ value: undefined, error }))
    )
  );

  readonly loading = computed(() => this.#pokemonResponse() === undefined);

  readonly error = computed(() => !!this.#pokemonResponse()?.error);

  readonly pokemon = computed(() => this.#pokemonResponse()?.value);

  deletePokemon() {
    this.#pokemonService.deletePokemon(this.#pokemonId).subscribe(() => {
      this.#router.navigate(['/pokemons']);
    });
  }

  getPokemonColor(type: string | undefined) {
    if (type) {
      return getPokemonColor(type);
    }
    return '';
  }
}
