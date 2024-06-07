import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class WalletModule { }
