import { Component, OnInit, } from '@angular/core';
import {Power} from '../power';
import { PowerService } from '../power.service';
//import { POWERS } from '../mock-powers';

@Component({
  selector: 'app-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.css']
})
export class PowersComponent implements OnInit {
    powers : Power[];
    
   

    constructor(private powerService: PowerService) { }

  ngOnInit() {
    this.getPowers();
  }

  getPowers(): void {
    this.powerService.getPowers()
    .subscribe(powers => this.powers = powers);
  }

  add(pname: string): void {
    pname = pname.trim();
    if (!pname) { return; }
    this.powerService.addPower({ pname } as Power)
      .subscribe(power => {
        this.powers.push(power);
        this.getPowers();
      });
  }
 

  delete(power: Power): void {
    this.powers = this.powers.filter(h => h !== power);
    this.powerService.deletePower(power).subscribe();
  }

}
