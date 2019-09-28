import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { PowersComponent } from './powers/powers.component';
import { PowerDetailComponent }  from './power-detail/power-detail.component';
import {  CostumeComponent }  from './costume/costume.component';
import { CostumeDetailsComponent }  from './costume-details/costume-details.component';

  const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'powers', component: PowersComponent },
    { path: 'powerdetail/:pid', component: PowerDetailComponent },
    { path: 'costume', component: CostumeComponent },
    { path: 'costumedetails/:cid', component: CostumeDetailsComponent },
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }