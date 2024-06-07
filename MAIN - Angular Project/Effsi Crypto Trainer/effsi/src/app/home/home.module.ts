import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TogsituationPipe } from '../pipes/togsituation.pipe';
import { TogsithomePipe } from '../pipes/togsithome.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    TogsithomePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule{

}
