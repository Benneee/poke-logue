import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {}

  goToAllPokemon() {
    this.router.navigate(['/pokemon'], { relativeTo: this.activeRoute });
  }

  goToTypesPage() {
    this.router.navigate(['/pokemon-types'], { relativeTo: this.activeRoute });
  }
}
