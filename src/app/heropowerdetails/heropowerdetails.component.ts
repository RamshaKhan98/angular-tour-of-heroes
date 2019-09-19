import { Component, OnInit} from '@angular/core';


//import { Hero }         from '../hero';
import { HeroPowerService }  from '../heropower.service';
//import {Power} from '../power';
import {HeroPower} from '../heropower';

@Component({
  selector: 'app-heropowerdetails',
  templateUrl: './heropowerdetails.component.html',
  styleUrls: ['./heropowerdetails.component.css']
})
export class HeropowerdetailsComponent implements OnInit {
   heropowers: HeroPower[];
  
  constructor(private heropowerService: HeroPowerService) { }

  ngOnInit() {
    this.getHeroPowers();
  }

  getHeroPowers(): void {
    this.heropowerService.getHeroPowers()
    .subscribe(heropowers => this.heropowers = heropowers);
  }

  add1(hpname: string): void {
    hpname = hpname.trim();
    if (!hpname) { return; }
    this.heropowerService.addHeroPower({ hpname } as HeroPower)
      .subscribe(heropower => {
        this.heropowers.push(heropower);
        this.getHeroPowers();
      });
  }
  add2(hpname: string): void {
    hpname = hpname.trim();
    if (!hpname) { return; }
    this.heropowerService.addHeroPower({ hpname } as HeroPower)
      .subscribe(heropower => {
        this.heropowers.push(heropower);
        this.getHeroPowers();
      });
  }

  delete(heropower: HeroPower): void {
    this.heropowers = this.heropowers.filter(h => h !== heropower);
    this.heropowerService.deleteHeroPower(heropower).subscribe();
  }

}

