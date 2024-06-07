import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MarketService } from '../services/market.service';
import { Router } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { WalletService } from '../services/wallet.service';
import { Asset } from '../interfaces/asset';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit{

  @ViewChild('f') form!: NgForm;
  error: undefined | string;

  currency!: string;

  matches:any;
  assets:Asset[] = [];

  constructor(private svc: MarketService, private router: Router,
              private asvc: AssetService, private wsvc: WalletService,
              private usvc: UserService) {}

  ngOnInit(): void {
    this.currency = this.usvc.getCurrency();
    this.findWatchlist();
  }

  onSubmit() {
    if(this.form.value.keywords.trim() !== ''){
      this.svc.searchAsset(this.form.value).subscribe(
      (data) => {
              console.log(Object.values(data)[0]);
              this.matches = Object.values(data)[0];
                this.error = undefined;
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      });
    } else {
      this.error = 'Field Required';
    }
  }

  findWatchlist(){
    this.wsvc.findByUser().subscribe(
      (data) => {
        for(let i = 0; i < data.length; i++){
          this.asvc.findByWalletId(data[i].id).subscribe(
            (data) => {
              console.log(data)
              this.assets = this.assets.concat(data)
              this.error = undefined;
            },
            (err) => {
              console.log(err.error.message);
              this.error = err.error.message;
            }
          )
        }
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  checkAndGiveS(symbol: string | undefined): string {
    if(symbol!.includes("/")){
      let s = symbol!.replace("/", "@");
      console.log(s);
      return s;
    }else if(symbol!.includes("@")){
      let s = symbol!.replace("@", "/");
      console.log(s);
      return s;
    }else{
      console.log(symbol)
      return symbol!;
    }
  }
}
