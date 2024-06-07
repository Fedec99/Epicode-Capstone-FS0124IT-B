import { PointService } from './../services/point.service';
import { AssetService } from './../services/asset.service';
import { MarketService } from './../services/market.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { NgForm } from '@angular/forms';
import { Wallet } from '../interfaces/wallet';
import { Asset } from '../interfaces/asset';
import { Movement } from '../interfaces/movement';
import { MovementService } from '../services/movement.service';
import { UserService } from '../services/user.service';
import { Assettype } from '../enumerated/assettype';
import { Assetclass } from '../enumerated/assetclass';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  @ViewChild('s') sform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('c') cform!: NgForm;
  @ViewChild('cc') ccform!: NgForm;

  @ViewChild('mi') miform!: NgForm;
  @ViewChild('mo') moform!: NgForm;
  @ViewChild('mt') mtform!: NgForm;
  @ViewChild('mc') mcform!: NgForm;
  error: undefined | string;

  currency!: string;

  wallets: Wallet[] = [];
  needwallet: boolean = false;
  postwallet: boolean = false;

  windex: number = 0;
  postasset: boolean = false;
  maincurrency: boolean = false;
  depositcurr: boolean = false;
  convertcurr: boolean = false;
  postmove: boolean = false;
  matches: any;

  movement: boolean = false;
  mov: Movement = {};
  movs: Movement[] = [];
  incoming: boolean = false;
  outgoing: boolean = false;
  transfer: boolean = false;
  convert: boolean = false;
  aexist: boolean = false;
  currexist: boolean = false;

  asset: Asset = {};
  assets: Asset[] = [];

  low: any[] = [];
  high: any[] = [];
  labels: any[] = [];
  datas: any[] = [];
  values: any[] = [];

  nams: any[] = [];
  vals: any[] = [];

  constructor(private asvc: AssetService, private msvc: MarketService,
              private svc: WalletService, private movsvc: MovementService,
              private usvc: UserService, private ptsvc: PointService){}

  ngOnInit(): void {
    this.currency = this.usvc.getCurrency();
    this.findByUser();

  }

  onSubmit() {
    console.log(this.form.value.type)
    if(  this.form.value.type.trim() !== '') {
        this.svc.addWallet(this.form.value).subscribe(
          (resp) => {
            console.log(resp);
            this.error = undefined;
            this.needwallet = false;
            this.postwallet = false;
            this.findByUser();
            this.form.reset();
            setTimeout(() => this.renderChart(), 10);
            setTimeout(() => this.renderPie(), 10);
          }, (err) => {
            console.log(err.error.message);
            this.error = err.error.message;
          }
        );
    } else {
      this.error = 'Field Required';
    }
  }

  onSearch() {
    if(this.sform.value.keywords.trim() !== ''){
      this.msvc.searchAsset(this.sform.value).subscribe((data) => {
            console.log(Object.values(data)[0]);
            this.matches = Object.values(data)[0];
            this.error = undefined;
            this.sform.reset();
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      });
      this.error = undefined;
    } else {
      this.error = 'Field Required';
    }
  }

  onSubmitAsset() {
    let ok:boolean = true;
    for (let i = 0; i < this.assets.length; i++) {
      if(this.aform.value.ticker == this.assets[i].ticker &&
         this.aform.value.intermediary != this.assets[i].intermediary) {
          ok = false;
          this.error = 'You must select '+ this.assets[i].intermediary +'for Intermediary, otherwise you can create a new Wallet!'
      }
    }
    if (ok){
      this.asvc.addAsset(this.aform.value).subscribe(
        (resp) => {
          console.log(resp);
          this.error = undefined;
          this.postasset = false;
          this.findByUser();
          this.aform.reset();
        }, (err) => {
          console.log(err.error.message);
          this.error = err.error.message;
        }
      );
    }else{}
  }

  depositMainCurrency() {
    this.asvc.addAsset(this.cform.value).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.closeCurrencyZone();
        this.maincurrency = false;
        this.findByUser();
        this.cform.reset();
        this.asset = {};
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    );
  }

  convertToMainCurrency() {
    this.movsvc.addConvert(this.ccform.value, this.wallets[this.windex].id, this.asset).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.closeCurrencyZone();
        this.maincurrency = false;
        this.findByUser();
        this.ccform.reset();
        this.asset = {};
        this.mov = {};
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  addMain() {
    this.maincurrency = true;
    this.asset.name = this.currency;
    this.asset.ticker = this.currency;
    this.asset.marketPrice = 1.00;
    this.asset.assetType = Assettype.FIAT;
    this.asset.assetClass = Assetclass.FIAT;
    this.asset.tax = 0.00;
    this.asset.paidCommission = 0.00;
    this.asset.averagePurchasePrice = 1.00;
    this.asset.walletId = this.wallets[this.windex].id;
  }

  findByUser(){
    this.svc.findByUser().subscribe(
      (resp) => {
        this.wallets = resp;
        console.log(this.wallets);
        if(this.wallets.length == 0){
          this.needwallet = true;
        }
        this.findPoints();
        this.findAssetsByWalletId();
        this.findAllocation()
        this.getMovements();
        this.error = undefined;
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    );
  }

  back(){
    if(this.windex == 0 ){
      return;
    }else{
      this.windex = this.windex - 1;
      this.findPoints();
      this.findAssetsByWalletId();
      this.findAllocation()
      this.getMovements();
    }
  }

  move(){
    if(this.windex == this.wallets.length-1){
      return;
    }else{
      this.windex = this.windex + 1;
      this.findPoints();
      this.findAssetsByWalletId();
      this.findAllocation()
      this.getMovements();
    }
  }

  chooseNewAsset(asset:any){
    console.log(asset)
    this.msvc.getMarketAssetQuote(asset.symbol).subscribe(
      (resp) => {
        console.log(Object.values(resp)[10]);
        this.error = undefined;
        if(Object.values(resp)[0] == 400){
          this.error = "Asset not available for your plan";
        }else{
          this.error = undefined;
        }
        let index;
          if(asset.symbol!.includes("/")){
            index = 8
          }else{
            index = 10
          }
        this.asset.marketPrice = Object.values(resp)[index];
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
    this.matches.splice(0, this.matches.length);
    this.matches.push(asset);
    this.asset.name = asset.instrument_name;
    this.asset.ticker = asset.symbol;
    this.asset.walletId = this.wallets[this.windex].id
    this.asset.exchange = asset.exchange;
  }

  closePostAsset() {
    this.postasset = false;
    setTimeout(() => this.renderChart(), 10);
    setTimeout(() => this.renderPie(), 10);
  }

  closePostWallet() {
    this.postwallet = false;
    setTimeout(() => this.renderChart(), 10);
    setTimeout(() => this.renderPie(), 10);
  }


  findAssetsByWalletId(){
    this.asvc.findByWalletId(this.wallets[this.windex].id).subscribe(
      (resp) => {
        this.assets = resp;
        console.log(this.assets);
        this.error = undefined;
        this.updatePrice();
        this.checkCurrency();
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  findUpdatedAssets(){
    this.asvc.findByWalletId(this.wallets[this.windex].id).subscribe(
      (resp) => {
        this.assets = resp;
        this.svc.findByUser().subscribe(
          (resp) => {
            this.wallets = resp;
            this.error = undefined;
          }, (err) => {
            console.log(err.error.message);
            this.error = err.error.message;
          }
        );
        console.log(this.assets);
        this.error = undefined;
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  checkCurrency() {
    this.currexist = false;
    for(let i = 0; i < this.assets.length; i++){
      if (this.assets[i].ticker == this.currency) {
        this.currexist = true;
      }
    }
  }

  getMovements(){
    this.movsvc.getMovsByWallet(this.wallets[this.windex].id).subscribe(
      (resp) => {
        this.movs = resp;
        console.log(this.movs);
        this.error = undefined;
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  onIncomingMovement() {
    this.movsvc.addIncoming(this.miform.value, this.wallets[this.windex].id).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.closeMovZone();
        this.movement = false;
        this.getMovements();
        this.findUpdatedAssets();
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  onOutgoingMovement() {
    this.movsvc.addOutgoing(this.moform.value, this.wallets[this.windex].id).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.movement = false;
        this.closeMovZone();
        this.movement = false;
        this.getMovements();
        this.findUpdatedAssets();
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  onTransferMovement() {
    this.movsvc.addTransfer(this.mtform.value, this.wallets[this.windex].id).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.movement = false;
        this.closeMovZone();
        this.movement = false;
        this.getMovements();
        this.findUpdatedAssets();
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  onConvertMovement() {
    this.movsvc.addConvert(this.mcform.value, this.wallets[this.windex].id, this.asset).subscribe(
      (resp) => {
        console.log(resp);
        this.closeMovZone();
        this.getMovements();
        this.movement = false;
        this.findUpdatedAssets();
        this.aexist = false;
        this.mcform.reset();
        this.asset = {};
      }, (err) => {
        console.log(err.error.message);
      }
    )
  }

  selectAsset(id: any) {
    this.mov.startingAssetId = id;
    console.log(this.mov.startingAssetId)
  }

  checkAsset(a:any) {
    for(let i = 0; i < this.assets.length; i++){
      if (this.assets[i].ticker == a.symbol) {
        this.aexist = true;
        this.asset.ticker = a.symbol;
      }else{
        this.asset.ticker = a.symbol;
        this.asset.name = a.name;
        this.msvc.getMarketAssetQuote(a.symbol).subscribe(
          (resp) => {
            console.log(resp, Object.values(resp)[10]);
            let index;
            if(this.assets[i].ticker!.includes("/")){
              index = 8
            }else{
              index = 10
            }
              this.asset.marketPrice = Object.values(resp)[index];
              console.log(this.asset.marketPrice)
            if(Object.values(resp)[0] == 400){
              this.error = "Asset not available for your plan";
            }else{
              this.error = undefined;
            }
          }, (err) => {
            console.log(err.error.message);
            this.error = err.error.message;
          }
        )
      }
    }
  }

  async updatePrice() {
    for (let i = 0; i < this.assets.length; i++) {
      if(this.assets[i].ticker == this.currency){
        console.log("no update is needed")
      }else{
      this.msvc.getMarketAssetQuote(this.assets[i].ticker).subscribe(
        (resp) => {
          console.log(resp);
          if(Object.values(resp)[0] == 400){
            this.error = "Asset not available for your plan";
          }else{
            this.error = undefined;
          }
          console.log(Object.values(resp))
          let index;
          if(this.assets[i].ticker!.includes("/")){
            index = 8
          }else{
            index = 10
          }
          this.asvc.updateMarketPrice(this.assets[i].id,Object.values(resp)[index]).subscribe(
            (resp) => {
              console.log(resp);
              this.error = undefined;
            }, (err) => {
              console.log(err.error.message);
              this.error = err.error.message;
            }
          )
        }, (err) => {
          console.log(err.error.message);
          this.error = err.error.message;
        }
      )
      if (i < this.assets.length - 1) {
        await this.delay(15000);
      }
    }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  closeMovZone(){
    if(this.incoming == true || this.outgoing == true ||
       this.transfer == true || this.convert == true){
        this.incoming = false;
        this.outgoing = false;
        this.transfer = false;
        this.convert = false;
       }else{
        this.movement = false;
        setTimeout(() => this.renderChart(), 10);
        setTimeout(() => this.renderPie(), 10);

       }
  }

  closeCurrencyZone() {
    if(this.depositcurr == true || this.convertcurr == true){
      this.depositcurr = false;
      this.convertcurr = false;
      }else{
       this.maincurrency = false;
       setTimeout(() => this.renderChart(), 10);
      setTimeout(() => this.renderPie(), 10);
      }
  }

  renderChart(){
    let existingChart = Chart.getChart("walletchart");
    if (existingChart) {
      existingChart.destroy();
    }

    Chart.defaults.layout.padding = 15
    Chart.defaults.plugins.legend.labels.color = 'dark';
    Chart.defaults.plugins.legend.display = true;
    const chart = new Chart("walletchart", {
      data: {
        datasets: [
        {
          type: 'line',
          label: 'low',
          data: this.low,
          borderColor: '#FF0100',
          tension: 0.1
        },
        {
          type: 'line',
          label: 'price',
          data: this.datas,
          borderColor: '#cccccc',
          tension: 0.1
        },
        {
          type: 'line',
          label: 'high',
          data: this.high,
          borderColor: '#167a4c',
          tension: 0.1
        }],
      labels: this.labels
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

  renderPie(){
    let existingChart = Chart.getChart("allochart");
    if (existingChart) {
      existingChart.destroy();
    }
    Chart.defaults.layout.padding = 25;
    Chart.defaults.plugins.legend.labels.color = 'white';
    Chart.defaults.plugins.legend.display = false;
    const c = new Chart("allochart", {
      type: 'doughnut',
      data: {
        labels: this.nams,
        datasets: [{
          label: 'Allocation',
          data: this.vals,
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
            '#B1D8B7'
          ],
          hoverOffset: 4
        }]
      }
    })
  }

  findPoints(){
    const labelsd: any[] = [];
    const datasd: any[] = [];
    const highd: any[] = [];
    const lowd: any[] = [];

    this.ptsvc.findByWallet(this.wallets[this.windex].id).subscribe(
      (resp) => {
        this.values = resp.sort((a, b) => a.date!.localeCompare(b.date!));
        console.log(this.values);
        const nd = new Date();
        const year = nd.getFullYear();
        const month = String(nd.getMonth() + 1).padStart(2, '0');
        const day = String(nd.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;
        console.log(today)
        for(let z = 0; z < this.values.length; z++){
          if(this.values[z].date == today){
            console.log('not today')
          }else{
            labelsd.push(this.values[z].date);
            datasd.push(this.values[z].value);
            highd.push(this.values[z].high);
            lowd.push(this.values[z].low);
          }
        }
        this.low = lowd
        this.high = highd
        this.labels = labelsd
        this.datas = datasd
        this.error = undefined;
        this.renderChart();
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  findAllocation(){
      this.nams = [];
      this.vals = [];
      this.asvc.findByWalletId(this.wallets[this.windex].id).subscribe(
        (resp) => {
          console.log(resp);
          let asst = resp;
          this.error = undefined;
          console.log(asst.length)
          for(let i = 0; i < asst.length; i++){
            this.nams.push(asst[i].ticker)
            this.vals.push(asst[i].marketValue)
          }
          this.renderPie()
        }, (err) => {
          console.log(err.error.message);
          this.error = err.error.message;
        }
        )
        console.log(this.nams, this.vals)
  }

}
