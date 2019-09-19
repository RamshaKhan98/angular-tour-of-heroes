import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeropowerdetailsComponent } from './heropowerdetails.component';

describe('HeropowerdetailsComponent', () => {
  let component: HeropowerdetailsComponent;
  let fixture: ComponentFixture<HeropowerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeropowerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeropowerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
