import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  readonly username = signal('');
  readonly password = signal('');
  readonly message = signal('Vous êtes déconnecté.');

  onSubmit(event: Event) {
    event.preventDefault();
    this.message.set('Connexion en cours...');

    this.#authService
      .login(this.username(), this.password())
      .subscribe((isLoggedIn) => {
        if (!isLoggedIn) {
          this.username.set('');
          this.password.set('');
          this.message.set('Identifiants incorrects.');

          return;
        }
      });

    return this.#router.navigate(['/pokemons']);
  }
}
