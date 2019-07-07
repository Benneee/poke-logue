import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokemonComponent } from "./pokemon/pokemon.component";
import { PokemonViewComponent } from "./pokemon-view/pokemon-view.component";
import { PokemonGroupComponent } from "./pokemon-group/pokemon-group.component";

const routes: Routes = [
  { path: "", redirectTo: "/pokemon", pathMatch: "full" },
  {
    path: "pokemon",
    component: PokemonComponent,
    children: [{ path: ":id", component: PokemonViewComponent }]
  },
  { path: "pokemon-types", component: PokemonGroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
