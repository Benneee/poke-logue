import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../shared/pokemon.model';
import { PokemonService } from '../providers/pokemon.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  /**
   *  name: string;
   * sprite: string;
   * id: number
   */
  pokemon: Pokemon[];
  isLoading: boolean = false;
  isLoaded: boolean = false;
  error: boolean = false;
  // filtered: Pokemon[];

  pokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  nextPageUrl;
  previousPageURL;
  previousPage: boolean = false;
  results;
  imageUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  filtered: any;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData();
  }

  getPokemonId(url) {
    let splitUrl = url.split('/');
    let index = splitUrl[6];
    let pokemonId = Number(index);
    return pokemonId;
  }

  loadData(url?: string) {
    if (!url) {
      url = this.pokemonUrl;
    }
    this.pokemonService
      .getAllPokemon(url)
      .then(res => {
        this.isLoading = true;
        if (res && res['next']) {
          this.nextPageUrl = res['next'];
        }
        if (res && res['previous']) {
          this.previousPageURL = res['previous'];
        }
        if (res && res['results']) {
          this.filtered = this.results = res['results'].map(item => {
            return {
              name: item.name,
              url: item.url,
              id: this.getPokemonId(item.url),
              sprite: this.imageUrl + this.getPokemonId(item.url) + '.png'
            };
          });
          // console.log('results:', this.results);
          this.isLoaded = true;
          this.isLoading = false;
          this.error = false;
        }
      })
      .catch(err => {
        console.log(err);
        this.error = true;
        this.isLoading = false;
        this.isLoaded = false;
      });
  }

  filterByName(name: string) {
    // console.log(name);
    this.filtered = name
      ? this.results.filter(results =>
          results.name.toLowerCase().includes(name.toLowerCase())
        )
      : this.results;
  }

  filterById(id: number) {
    this.filtered = id
      ? this.results.filter(results => results.id == id)
      : this.results;
    // console.log(id);
  }

  goToPokemonPage(url: string) {
    // console.log(url);
    let splitUrl = url.split('/');
    let index = splitUrl[6];
    let pokemonId = Number(index);
    // console.log(pokemonId);
    this.router.navigate([`/pokemon/${pokemonId}`], {
      relativeTo: this.activeRoute
    });
    // console.log('navigated');
  }

  sendImage(id: number) {
    return `${this.imageUrl}${id}.png`;
  }

  // Load next twenty set of Pokemon data
  getNextPageData() {
    this.loadData(this.nextPageUrl);
    this.previousPage = true;
    // console.log('next page loaded');
  }

  getPreviousPageData() {
    this.loadData(this.previousPageURL);
  }
}
