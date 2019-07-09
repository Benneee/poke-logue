import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonViewComponent } from './pokemon-view/pokemon-view.component';
import { PokemonGroupComponent } from './pokemon-group/pokemon-group.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'pokemon/:id', component: PokemonViewComponent },
  { path: 'pokemon-types', component: PokemonGroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
