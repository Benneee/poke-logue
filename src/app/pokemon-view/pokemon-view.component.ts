import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit {
  constructor() {
    console.log('[PokemonViewComponent] has loaded');
  }

  ngOnInit() {}
}
