import { WalletService } from './../services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AssetService } from '../services/asset.service';
import { Wallet } from '../interfaces/wallet';
import { Asset } from '../interfaces/asset';
import { Assetzone } from '../enumerated/assetzone';
import { UserService } from '../services/user.service';
import { Assettype } from '../enumerated/assettype';
Chart.register(...registerables)

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  error!: string | undefined;

  bycountry: boolean = false;
  bytype: boolean = false;
  byintermediary: boolean = false;
  bydiversification: boolean = false;

  wallets: Wallet[] = [];
  assets: Asset[] = [];

  currency: string = '';

  constructor(private wtsvc:WalletService, private atsvc:AssetService, private usvc:UserService) {}

  ngOnInit(): void {
    this.currency = this.usvc.getCurrency();
    this.getWallets();
  }

  // API METHODS
  getWallets(){
    this.wtsvc.findByUser().subscribe(
      (data) => {
        console.log(data)
        this.wallets = data;
        this.error = undefined;
        this.getAssets();
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  getAssets(){
    for(let i = 0; i < this.wallets.length; i++){
      this.atsvc.findByWalletId(this.wallets[i].id).subscribe(
        (data) => {
          console.log(data)
          let wass:Asset[] = data;
          for(let f = 0; f < wass.length; f++){
            this.assets.push(wass[f])
          }
          this.error = undefined;
        },
        (err) => {
          console.log(err.error.message);
          this.error = err.error.message;
        }
      )
    }

  }

  // BYCOUNTRY
  countries: any[] = [];
  values: number[] = [];
  total: number = 0;

  renderByCountry() {
    let existingChart = Chart.getChart("bycountry");
    if (existingChart) {
      existingChart.destroy();
    }
    const c = new Chart("bycountry", {
      type: 'doughnut',
      data: {
        labels: this.countries,
        datasets: [{
          label: 'Allocation By Country',
          data: this.values,
          backgroundColor: [
            '#2F5233',
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
            '#2F5233',
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
            '#2F5233',
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
          ],
          hoverOffset: 4
        }]
      }
    })
  }

  dataByCountry() {
    if(!this.bycountry){
      this.total = 0;
      this.bycountry = !this.bycountry
      this.countries = [];
      this.values = [];
      const map = new Map<Assetzone, number>();

      this.assets.forEach((asset) => {
        const { zone, marketValue } = asset;
        if (map.has(zone!)) {
          map.set(zone!, map.get(zone!)! + marketValue!);
        } else {
          map.set(zone!, marketValue!);
        }
      });

      map.forEach((value, key) => {
        if(key === null){
          this.countries.push('Unknown');
        }else{
          this.countries.push(key);
        }
        this.values.push(value);
        this.total = this.total + value
      });
      setTimeout(() => this.renderByCountry(), 10 )
    }else{
      this.bycountry = !this.bycountry
    }

  }

  // BYTYPE
  types: any[] = [];
  vals: number[] = [];
  tot: number = 0;

  renderByType() {
    let existingChart = Chart.getChart("bytype");
    if (existingChart) {
      existingChart.destroy();
    }
    const c = new Chart("bytype", {
      type: 'doughnut',
      data: {
        labels: this.types,
        datasets: [{
          label: 'Allocation By Type',
          data: this.vals,
          backgroundColor: [
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
            '#2F5233',
            '#94C973',
            '#2F5233',
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
            '#2F5233',
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#81B622',
            '#ECF87F',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
          ],
          hoverOffset: 4
        }]
      }
    })
  }

  dataByType() {
    if(!this.bytype){
      this.tot = 0;
      this.bytype = !this.bytype
      this.types = [];
      this.vals = [];
      const map = new Map<Assettype, number>();

      this.assets.forEach((asset) => {
        const { assetType, marketValue } = asset;
        if (map.has(assetType!)) {
          map.set(assetType!, map.get(assetType!)! + marketValue!);
        } else {
          map.set(assetType!, marketValue!);
        }
      });

      map.forEach((value, key) => {
        if(key === null){
          this.types.push('Unknown');
        }else{
          this.types.push(key);
        }
        this.vals.push(value);
        this.tot = this.tot + value
      });
      setTimeout(() => this.renderByType(), 10 )
    }else{
      this.bytype = !this.bytype
    }

  }

  // BYINTERMEDIARY
  intermediarys: any[] = [];
  valss: number[] = [];
  tott: number = 0;

  renderByIntermediary() {
    let existingChart = Chart.getChart("byintermediary");
    if (existingChart) {
      existingChart.destroy();
    }
    const c = new Chart("byintermediary", {
      type: 'doughnut',
      data: {
        labels: this.intermediarys,
        datasets: [{
          label: 'Allocation By Intermediary',
          data: this.valss,
          backgroundColor: [
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
            '#2F5233',
            '#94C973',
            '#2F5233',
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#2F5233',
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#81B622',
            '#ECF87F',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
          ],
          hoverOffset: 4
        }]
      }
    })
  }

  dataByIntermediary() {
    if(!this.byintermediary){
      this.tott = 0;
      this.byintermediary = !this.byintermediary
      this.intermediarys = [];
      this.valss = [];
      const map = new Map<string, number>();

      this.assets.forEach((asset) => {
        const { intermediary, marketValue } = asset;
        if (map.has(intermediary!)) {
          map.set(intermediary!, map.get(intermediary!)! + marketValue!);
        } else {
          map.set(intermediary!, marketValue!);
        }
      });

      map.forEach((value, key) => {
        if(key === null){
          this.intermediarys.push('Unknown');
        }else{
          this.intermediarys.push(key);
        }
        this.valss.push(value);
        this.tott = this.tott + value
      });
      setTimeout(() => this.renderByIntermediary(), 10 )
    }else{
      this.byintermediary = !this.byintermediary
    }

  }

  // BYINTERMEDIARY
  names: any[] = [];
  valsss: number[] = [];
  tottt: number = 0;

  renderByDiversification() {
    let existingChart = Chart.getChart("bydiversification");
    if (existingChart) {
      existingChart.destroy();
    }
    const c = new Chart("bydiversification", {
      type: 'doughnut',
      data: {
        labels: this.names,
        datasets: [{
          label: 'Total Diversification',
          data: this.valsss,
          backgroundColor: [
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#2F5233',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
            '#94C973',
            '#81B622',
            '#ECF87F',
            '#81B622',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
            '#2F5233',
            '#94C973',
            '#2F5233',
            '#ECF87F',
            '#3D550C',
            '#59981A',
            '#76B947',
            '#B1D8B7',
          ],
          hoverOffset: 4
        }]
      }
    })
  }

  dataByDiversification() {
    if(!this.bydiversification){
      this.tottt = 0;
      this.bydiversification = !this.bydiversification
      this.names = [];
      this.valsss = [];
      const map = new Map<string, number>();

      this.assets.forEach((asset) => {
        const { ticker, marketValue } = asset;
        if (map.has(ticker!)) {
          map.set(ticker!, map.get(ticker!)! + marketValue!);
        } else {
          map.set(ticker!, marketValue!);
        }
      });

      map.forEach((value, key) => {
        if(key === null){
          this.names.push('Unknown');
        }else{
          this.names.push(key);
        }
        this.valsss.push(value);
        this.tottt = this.tottt + value
      });
      setTimeout(() => this.renderByDiversification(), 10 )
    }else{
      this.bydiversification = !this.bydiversification
    }

  }
}
