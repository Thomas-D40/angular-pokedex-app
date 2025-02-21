import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { getPokemonColor, POKEMON_RULES } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
})
export class PokemonEditComponent {
  readonly pokemonService: PokemonService = inject(PokemonService);
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));
  readonly router = inject(Router);

  readonly #pokemonResponse = toSignal(
    this.pokemonService.getPokemonById(this.#pokemonId).pipe(
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

  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.minLength(POKEMON_RULES.MIN_NAME),
    ]),
    life: new FormControl(0, [
      Validators.required,
      Validators.max(POKEMON_RULES.MAX_LIFE),
      Validators.min(POKEMON_RULES.MIN_LIFE),
    ]),
    damage: new FormControl(0, [
      Validators.required,
      Validators.max(POKEMON_RULES.MAX_DAMAGE),
      Validators.min(POKEMON_RULES.MIN_DAMAGE),
    ]),
    types: new FormArray(
      [],
      [Validators.required, Validators.maxLength(POKEMON_RULES.MAX_TYPES)]
    ),
  });
  POKEMON_RULES: any = POKEMON_RULES;

  constructor() {
    effect(() => {
      const pokemon = this.pokemon();

      if (pokemon) {
        this.form.patchValue({
          name: pokemon.name,
          life: pokemon.life,
          damage: pokemon.damage,
        });

        pokemon.types.forEach((type) => {
          this.pokemonTypeList.push(new FormControl(type));
        });
      }
    });
  }

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  get pokemonName(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get pokemonLife(): FormControl {
    return this.form.get('life') as FormControl;
  }

  get pokemonDamage(): FormControl {
    return this.form.get('damage') as FormControl;
  }

  incrementLife() {
    this.pokemonLife.setValue(this.pokemonLife.value + 1);
  }

  decrementLife() {
    this.pokemonLife.setValue(this.pokemonLife.value - 1);
  }

  incrementDamage() {
    this.pokemonDamage.setValue(this.pokemonDamage.value + 1);
  }

  decrementDamage() {
    this.pokemonDamage.setValue(this.pokemonDamage.value - 1);
  }

  isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.find(
      (control) => control.value === type
    );
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    } else {
      const index = this.pokemonTypeList.controls.findIndex(
        (control) => control.value === type
      );
      this.pokemonTypeList.removeAt(index);
    }
  }

  getPokemonColor(type: string) {
    return getPokemonColor(type);
  }

  onSubmit() {
    const isFormValid = this.form.valid;
    const pokemon = this.pokemon();

    if (isFormValid && pokemon) {
      const updatedPokemon = {
        ...pokemon,
        name: this.pokemonName.value,
        life: this.pokemonLife.value,
        damage: this.pokemonDamage.value,
        types: this.pokemonTypeList.value,
      };

      this.pokemonService.updatePokemon(updatedPokemon).subscribe(() => {
        this.router.navigate(['/pokemons', updatedPokemon.id]);
      });
    }
  }
}
