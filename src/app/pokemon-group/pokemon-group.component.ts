import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../providers/pokemon.service';
import { PokemonType } from '../shared/pokemon-type.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-pokemon-group',
  templateUrl: './pokemon-group.component.html',
  styleUrls: ['./pokemon-group.component.css']
})
export class PokemonGroupComponent implements OnInit {
  panelOpenState = false;
  multi = true;
  imageUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  pokemonTypes: PokemonType[];
  length = 20;
  pageSize = 10;
  pageSizeOptions = [1, 2, 5];
  pokemon = [];
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pokemonService.fetchPokemonType(0, 20).then(pokemonType => {
      pokemonType = pokemonType.map(type => type);
      this.pokemonTypes = [...pokemonType];
    });
  }

  sendId(id: number) {
    console.log(id);
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
    console.log('navigated');
  }
}
