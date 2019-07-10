import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../providers/pokemon.service';
import { PokemonType } from '../shared/pokemon-type.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-group',
  templateUrl: './pokemon-group.component.html',
  styleUrls: ['./pokemon-group.component.css']
})
export class PokemonGroupComponent implements OnInit {
  panelOpenState = false;
  multi = true;
  p;
  type;
  imageUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  pokemonTypes = [];

  pokemon = [];
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pokemonService.getPokemonType().subscribe(data => {
      if (data) {
        if (data && data['results']) {
          for (const x in data['results']) {
            if (typeof data['results'][x] === 'object') {
              let urlId = data['results'][x].url;
              this.pokemonTypes.push({
                name: data['results'][x].name,
                urlId: this.getIdFromUrl(urlId)
              });
            }
          }
        }
      }
    });
  }

  sendId(id: number) {
    // console.log(id);
    this.pokemonService.fetchPokemonByType(id).then(data => {
      // console.log(data);

      if (data) {
        for (const x in data) {
          if (typeof data[x] === 'object' && data[x].pokemon) {
            // console.log(data[x].pokemon);
            this.pokemon.push({
              name: data[x].pokemon.name,
              urlId: this.getIdFromUrl(data[x].pokemon.url)
            });
          }
        }
      }
    });
  }

  getIdFromUrl(url) {
    let splitUrl = url.split('/');
    let index = splitUrl[6];
    let pokemonId = Number(index);
    return pokemonId;
  }

  sendImage(id: number) {
    return `${this.imageUrl}${id}.png`;
  }

  goToPokemonPage(id: number) {
    this.router.navigate([`/pokemon/${id}`], {
      relativeTo: this.activeRoute
    });
    // console.log('navigated');
  }
}
