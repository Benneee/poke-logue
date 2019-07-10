import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../providers/pokemon.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  nextPageUrl;
  previousPage;
  results;
  id: number;

  imageUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {}

  goToAllPokemon() {
    this.router.navigate(['/pokemon'], { relativeTo: this.activeRoute });
  }

  goToTypesPage() {
    this.router.navigate(['/pokemon-types'], { relativeTo: this.activeRoute });
  }
}
