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
  pokemonTypes = [];
  length: number;
  pageIndex;
  pageSize = 5;
  pageSizeOptions = [1, 2, 5];
  pokemon = [];
  pageEvent: PageEvent;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }
  loadData(pageIndex, pageSize) {
    this.pokemonTypes.slice(pageIndex, pageIndex + pageSize);
  }

  ngOnInit() {
    // this.pokemonService.fetchPokemonType(0, 20).then(pokemonType => {
    //   pokemonType = pokemonType.map(type => type);
    //   this.pokemonTypes = [...pokemonType];
    // });

    this.pokemonService.getPokemonType().subscribe(data => {
      if (data) {
        this.length = data['count'];
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
    this.loadData(0, this.pageSize);
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
