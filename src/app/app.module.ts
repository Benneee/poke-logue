import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonGroupComponent } from './pokemon-group/pokemon-group.component';
import { PokemonViewComponent } from './pokemon-view/pokemon-view.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonService } from './providers/pokemon.service';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizePipe } from './capitalize.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    PokemonGroupComponent,
    PokemonViewComponent,
    PokemonComponent,
    NavComponent,
    CapitalizePipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatProgressSpinnerModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
