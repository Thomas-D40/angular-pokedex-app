import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';

const routes: Routes = [
  {
    path: 'pokemons',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'edit/:id',
        component: PokemonEditComponent,
        title: 'Edit Pokémon',
      },
      {
        path: ':id',
        component: PokemonProfileComponent,
        title: 'Pokémon',
      },
      {
        path: '',
        component: PokemonListComponent,
        title: 'Pokédex',
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Page de connexion',
  },
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
