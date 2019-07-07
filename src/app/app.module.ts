import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import bootstrap from "bootstrap";
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { PokemonGroupComponent } from "./pokemon-group/pokemon-group.component";
import { PokemonViewComponent } from "./pokemon-view/pokemon-view.component";
import { PokemonComponent } from "./pokemon/pokemon.component";
import { PokemonService } from "./providers/pokemon.service";
import { NavComponent } from "./nav/nav.component";
import { HttpClientModule } from "@angular/common/http";
import { CapitalizePipe } from "./capitalize.pipe";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    PokemonGroupComponent,
    PokemonViewComponent,
    PokemonComponent,
    NavComponent,
    CapitalizePipe
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
