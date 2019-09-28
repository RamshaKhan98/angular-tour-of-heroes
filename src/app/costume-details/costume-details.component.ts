import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Costume }         from '../costume';
import { CostumeService }  from '../costume.service';

@Component({
  selector: 'app-costume-details',
  templateUrl: './costume-details.component.html',
  styleUrls: ['./costume-details.component.css']
})
export class CostumeDetailsComponent implements OnInit {

  @Input() costume: Costume;
  
  constructor(
    private route: ActivatedRoute,
    private powerService: CostumeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCostume();
  }

  getCostume(): void {
    const cid = +this.route.snapshot.paramMap.get('cid');
    this.powerService.getCostume(cid)
      .subscribe(costume => this.costume = costume);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.powerService.updateCostume(this.costume)
      .subscribe(() => this.goBack());
  }
}