import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../shared/pokemon.model";
import { PokemonService } from "../providers/pokemon.service";

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.css"]
})
export class PokemonCardComponent implements OnInit {
  /**
   *  name: string;
   * sprite: string;
   * id: number
   */
  pokemon: Pokemon[];
  isLoading: boolean = false;
  error: boolean = false;
  filtered: Pokemon[];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService
      .fetchPokemon(0, 20)
      .then(pokemon => {
        pokemon = pokemon.map(p => p);
        this.filtered = this.pokemon = [...pokemon];
        this.isLoading = false;
        this.error = false;
      })
      .catch(err => {
        console.log(err);
        this.error = true;
        this.isLoading = false;
      });
  }

  filterByName(name: string) {
    // console.log(name);
    this.filtered = name
      ? this.pokemon.filter(pokemon =>
          pokemon.name.toLowerCase().includes(name.toLowerCase())
        )
      : this.pokemon;
  }

  filterById(id: number) {
    this.filtered = id
      ? this.pokemon.filter(pokemon => pokemon.id == id)
      : this.pokemon;
    // console.log(id);
  }
}
