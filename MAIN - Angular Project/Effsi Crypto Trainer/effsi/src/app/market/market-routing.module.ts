import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './market.component';
import { MarketviewComponent } from './marketview/marketview.component';

const routes: Routes = [
  { path: '', component: MarketComponent },
  { path: 'marketview/:id', component: MarketviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule { }
