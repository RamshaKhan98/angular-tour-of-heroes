import { Component, OnInit } from '@angular/core';
import {Costume} from '../costume';
import { CostumeService } from '../costume.service';
@Component({
  selector: 'app-costume',
  templateUrl: './costume.component.html',
  styleUrls: ['./costume.component.css']
})
export class CostumeComponent implements OnInit {

  costumes : Costume[];
    
  constructor(private costumeService: CostumeService) { }

ngOnInit() {
  this.getCostumes();
}

getCostumes(): void {
  this.costumeService.getCostumes()
  .subscribe(costumes => this.costumes = costumes);
}

add(cname: string): void {
  cname = cname.trim();
  if (!cname) { return; }
  this.costumeService.addCostume({ cname } as Costume)
    .subscribe(costume => {
      this.costumes.push(costume);
      this.getCostumes();
    });
}


delete(costume: Costume): void {
  this.costumes = this.costumes.filter(h => h !== costume);
  this.costumeService.deleteCostume(costume).subscribe();
}

}

