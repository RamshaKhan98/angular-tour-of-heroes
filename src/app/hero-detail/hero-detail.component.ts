import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { Power }         from '../power';
import { PowerService }  from '../power.service';
import { Costume } from '../costume';
import {CostumeService} from   '../costume.service'


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() power: Power;
  powers : Power[];
  heroPowers : Power[];
  costumes : Costume[];
  heroCostumes : Costume[];
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private powerService: PowerService,
    private costumeService: CostumeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getPowers();
    this.getHeroPowers();
    this.getCostumes();
    this.getHeroCostume();
  }
  getPowers(): void {
    this.powerService.getPowers()
    .subscribe(powers => this.powers = powers);
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
 getHeroPowers() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.powerService.getHeroPowers(id)
      .subscribe(heroPowers => this.heroPowers = heroPowers);
  }
    
   addHeroPower(power: Power): void {
    const id = +this.route.snapshot.paramMap.get('pid');
    const Array = {
      power_id : power.pid,
      hero_id : this.hero.id
    } 
    // console.log("Hero id is " + id);
    // console.log("Power id is " + power.id)
    if (!power) { 
      console.log("no power given")
      return; }
    this.powerService.addPowerToHero(Array)
      .subscribe(power => {
        console.log("power is" + power)
        this.getHeroPowers();
      });
  }


  
    deletePowerFromHeroPower(heroPower : any)
    {
      //console.log(heroPower);
      if(!heroPower){
        console.log("No power selected to be deleted");
      }
      this.powerService.deletePowerFromHeroPower(heroPower.btId)
      .subscribe( heroPower => {
        this.getPowers();
        this.getHeroPowers();
      });
  
    } 
  
// To get all costumes
getCostumes(): void {
  this.costumeService.getCostumes()
    .subscribe(costumes => this.costumes = costumes);
}

// To get Costume of a Particular Hero
  getHeroCostume() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.costumeService.getHeroCostume(id)
      .subscribe(heroCostume => this.heroCostumes = heroCostume);
  }
  delHeroCostume(): void
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.costumeService.delHeroCostume(id)
      .subscribe(() => this.getHeroCostume());
  }
  
  addCostumeToHero(costume){
    const data = {
    
           cId: costume.cid,
           heroId :this.hero.id
       }
        console.log(data);
    
        if (!costume) { 
          console.log("no costume given")
          return; }
        this.costumeService.addCostumeToHero(data)
          .subscribe(costume => {
          //  console.log("costume is" + power);
            this.getCostumes();
            this.getHeroCostume();
         
          });
        
      }
  

    }


