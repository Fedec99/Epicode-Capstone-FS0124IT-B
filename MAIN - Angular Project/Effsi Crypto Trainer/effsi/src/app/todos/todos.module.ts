import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TogstatusPipe } from '../pipes/togstatus.pipe';
import { TogsituationPipe } from '../pipes/togsituation.pipe';


@NgModule({
  declarations: [
    TodosComponent,
    TogstatusPipe,
    TogsituationPipe
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class TodosModule { }
