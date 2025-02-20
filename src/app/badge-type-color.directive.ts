import { Directive } from '@angular/core';
import { getPokemonColor } from './models/pokemon.model';

@Directive({
  selector: '[appBadgeTypeColor]',
})
export class BadgeTypeColorDirective {
  pokemonType = input('');

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = getPokemonColor(
      this.pokemonType
    );
  }
}
