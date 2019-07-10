import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../providers/pokemon.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}
  id: number;
  stats: any[];
  hp;
  attack;
  defense;
  speed;
  specialAttack;
  specialDefense;
  // color = 'yellow';
  abilities: any[];
  name;
  imageUrl;
  height: number;
  weight: number;
  types: any[];
  ability;
  type;

  effort;
  color = 'primary';

  isLoading: boolean = false;
  isLoaded: boolean = false;

  ngOnInit() {
    this.getPokemonId();
    this.pokemonService.getPokemonInfo(this.id).subscribe(data => {
      if (data) {
        this.isLoading = true;
        if (data && data['name']) {
          this.name = data['name'];
          this.isLoaded = true;
          this.isLoading = false;
        }

        if (data && data['abilities']) {
          this.abilities = [...data['abilities']];
          this.ability = this.abilities
            .map(ability => {
              return ability.ability.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            })
            .join(', ');
          this.isLoading = false;
          this.isLoaded = true;
          // console.log(this.ability);
        }
        if (data && data['sprites']) {
          this.imageUrl = data['sprites'].front_default;
        }
        if (data && data['stats']) {
          this.stats = [...data['stats']];
          this.stats.map(stat => {
            switch (stat.stat.name) {
              case 'hp':
                this.hp = stat['base_stat'];
                break;
              case 'attack':
                this.attack = stat['base_stat'];
                break;
              case 'defense':
                this.defense = stat['base_stat'];
                break;
              case 'speed':
                this.speed = stat['base_stat'];
                break;
              case 'special-attack':
                this.specialAttack = stat['base_stat'];
                break;
              case 'special-defense':
                this.specialDefense = stat['base_stat'];
                break;
            }
            this.isLoading = false;
            this.isLoaded = true;
            return this.stats;
          });
        }
        if (data && data['stats']) {
          this.effort = data['stats']
            .filter(stat => {
              if (stat.effort > 0) {
                return true;
              } else {
                return false;
              }
            })
            .map(stat => {
              return `${stat.effort} ${stat.stat.name}`
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            })
            .join(', ');
          // console.log(this.effort);
          this.isLoading = false;
          this.isLoaded = true;
        }
        if (data && data['height']) {
          // Convert from decimeters to meters
          this.height = Math.round(data['height'] / 10);
        }
        if (data && data['weight']) {
          // Convert from hectograms to kilograms
          this.weight = Math.round(data['weight'] / 10);
        }
        if (data && data['types']) {
          this.types = [...data['types']];
          this.type = this.types
            .map(type => {
              return type.type.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            })
            .join(', ');
          this.isLoading = false;
          this.isLoaded = true;
        }
      }
    });
  }

  getPokemonId() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // console.log(this.id);
    });
  }
}
