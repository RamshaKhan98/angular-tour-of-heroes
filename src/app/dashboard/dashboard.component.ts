import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Power } from '../power';
import { PowerService } from '../power.service';
import { Costume } from '../costume';
import { CostumeService } from '../costume.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  powers: Power[] = [];
  costumes: Costume[] = [];

  constructor(private heroService: HeroService , private powerService: PowerService , private costumeService: CostumeService ) { }

  ngOnInit() {
    this.getHeroes();
    this.getPowers();
    this.getCostumes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
  getPowers(): void {
    this.powerService.getPowers()
      .subscribe(powers => this.powers = powers.slice(1, 5));
  }
  getCostumes(): void {
    this.costumeService.getCostumes()
      .subscribe(costumes => this.costumes = costumes.slice(1, 5));
  }
}