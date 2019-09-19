import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Power } from '../power';
import { PowerService } from '../power.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  powers: Power[] = [];

  constructor(private heroService: HeroService , private powerService: PowerService ) { }

  ngOnInit() {
    this.getHeroes();
    this.getPowers();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
  getPowers(): void {
    this.powerService.getPowers()
      .subscribe(powers => this.powers = powers.slice(1, 5));
  }
}