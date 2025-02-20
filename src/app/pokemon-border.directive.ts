import { Directive, ElementRef, HostListener, input } from '@angular/core';
import { getPokemonColor } from './models/pokemon.model';

@Directive({
  selector: '[appPokemonBorder]',
  standalone: true,
})
export class PokemonBorderDirective {
  pokemonType = input('');
  private initialColor: string;

  constructor(private el: ElementRef) {
    this.initialColor = el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '2px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = this.getBorderColor();
    this.setBorderColor(color);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorderColor(this.initialColor);
  }

  private setBorderColor(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

  private getBorderColor() {
    return getPokemonColor(this.pokemonType());
  }
}
