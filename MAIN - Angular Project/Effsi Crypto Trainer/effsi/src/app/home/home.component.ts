import { BehaviorSubject } from 'rxjs';
import { Wallet } from '../interfaces/wallet';
import { Component } from '@angular/core';
import { Point } from '../interfaces/point';
import { PointService } from '../services/point.service';
import { Router } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { MarketService } from '../services/market.service';
import { UserService } from '../services/user.service';
import { WalletService } from '../services/wallet.service';
import { Chart, registerables } from 'chart.js';
import { User } from '../interfaces/user';
import { Asset } from '../interfaces/asset';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';
Chart.register(...registerables)




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  error: undefined | string;
  proSubj = new BehaviorSubject<boolean>(false);
  pro$ = this.proSubj.asObservable();

  setSubj = new BehaviorSubject<boolean>(false);
  set$ = this.setSubj.asObservable();

  dailydata:any[] = [];
  wpoints:Point[][] = [];

  point:Point = {}
  dates: string[] = [] ;

  // wind:number = 0;
  // aind:number = 0;

  low: any[] = [];
  high: any[] = [];
  labels: any[] = [];
  datas: any[] = [];
  values: any[] = [];
  limits: any[] = [];

  user:User = {}
  totval: number = 0;
  assets: Asset[] = [];
  wallets: Wallet[] = [];

  todos: Todo[] = [] ;

  constructor(private ptsvc: PointService, private ursvc: UserService,
              private wtsvc: WalletService, private router:Router,
              private mksvc: MarketService, private atsvc: AssetService,
              private tdsvc: TodoService){}

  ngOnInit() {
    this.dates = this.getDates();
    this.findUser();
    this.findTodos();
    this.getValues();
    this.findTotValue();
    this.findAllAssets();
    this.pro$.subscribe(
      (res) => {
        if(res){
          console.log(res);
          console.log(this.dailydata)
          console.log(this.wpoints)
          setTimeout(() => {
            this.getPoints();
          }, 1000);
          this.set$.subscribe(
            (ris) => {
              if(ris){
                console.log(ris);
                console.log(this.dailydata)
                console.log(this.wpoints)
                setTimeout(() => {
                  this.completeExistingPoints();
                }, 1000);
                setTimeout(() => {
                  this.createMissingPoints();
                }, 1000);
              }
            }
                )
              }
            }
            );
            this.findPoints();
  }

  getValues(){
    // CERCA TUTTI I WALLET DELL'UTENTE
    this.wtsvc.findByUser().subscribe(
      (resp) => {
        let wallets = resp;
        console.log(wallets);
        // SE NON CI SONO WALLET BLOCCA E VAI A WALLET
        if(wallets.length === 0){
          console.log('User has no wallets');
          this.router.navigate(['/wallet'])
        }else{
          // PER OGNI WALLET (ASSETS HANDLER)
          for (let i = 0; i < wallets.length; i++){
            // CERCA GLI ASSET CONTENUTI
            this.atsvc.findByWalletId(wallets[i].id).subscribe(
                  (resp) => {
                    let assets = resp;
                    console.log(assets);
                    // PER OGNI ASSET
                    for (let a = 0; a < assets.length; a++){
                      // SALTA GLI ASSET CHE CORRISPONDONO ALLA CURRENCY PRINCIPALE
                      if (assets[a].ticker == this.ursvc.getCurrency()){
                        console.log('This is your main currency');
                        if(assets[a].id == assets[assets.length-1].id && wallets[i].id == wallets[wallets.length-1].id){
                          this.proSubj.next(true);
                          console.log(this.pro$);
                        }
                      }else{
                        // SE I VALORI SONO GIA NELL'ARRAY DI DATI ALLORA NON FARE LA CHIAMATA
                        let exist = false;
                        console.log(this.dailydata);
                        for(let b = 0; b < this.dailydata.length; b++){
                          if(this.dailydata[b].meta.symbol == assets[a].ticker){
                            exist = true;
                            if(assets[a].id == assets[assets.length-1].id && wallets[i].id == wallets[wallets.length-1].id){
                              this.proSubj.next(true);
                              console.log(this.pro$);
                            }
                            console.log('Asset already saved');
                          }
                        }
                        if(!exist){
                          // CERCA IL VALORE DELL'ASSET NEGLI ULTIMI 100 GIORNI
                          this.mksvc.getMarketData(assets[a].ticker, '1day').subscribe(
                            (resp) => {
                              console.log(resp);
                              // INSERISCO L'OGGETTO CONTENENTE I 100 VALORI IN UN ARRAY
                              this.dailydata.push(resp);
                              this.error = undefined;
                              if(assets[a].id == assets[assets.length-1].id && wallets[i].id == wallets[wallets.length-1].id){
                                this.proSubj.next(true);
                                console.log(this.pro$);
                              }
                            },
                            (err) => {
                              console.log(err.error.message);
                              this.error = err.error.message;
                            }
                          )
                        }
                      }
                    }
                    this.error = undefined;
                  },
                  (err) => {
                    console.log(err.error.message);
                    this.error = err.error.message;
                  }
            )
          }

          this.error = undefined;
        }
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }

  getPoints(){
    this.wtsvc.findByUser().subscribe(
      (resp) => {
                console.log(resp)
                let wats:Wallet[] = resp;
                let indexx = 0;
               // PER OGNI WALLET (PONITS HANDLER)
              for (let z = 0; z < wats.length; z++){
              // CERCA TUTTI I PUNTI LEGATI AL WALLET
              this.ptsvc.findByWallet(wats[z].id).subscribe(
                (resp) => {
                  console.log(resp)
                  this.wpoints.push(resp);
                  console.log(this.wpoints);
                  this.error = undefined;
                  indexx++;
                  if(indexx == wats.length){
                    this.setSubj.next(true);
                    console.log(this.set$);
                  }
                }, (err) => {
                  console.log(err.error.message);
                  this.error = err.error.message;
                }
              )
          }
                this.error = undefined;
      }, (err) => {
                console.log(err.error.message);
                this.error = err.error.message;
              }
    )

  }

  completeExistingPoints(){
    console.log(this.wpoints)
    console.log(this.dailydata)
    // PER OGNI ARRAY DI PUNTI

    console.log(this.wpoints.length);
    console.log(this.dailydata.length);

    for(let h = 0; h < this.wpoints.length; h++){
      // PER OGNI PUNTO
      console.log(this.wpoints[h].length);
      console.log(this.wpoints.length);
      for(let j = 0; j < this.wpoints[h].length; j++){
        const nd = new Date();
        const year = nd.getFullYear();
        const month = String(nd.getMonth() + 1).padStart(2, '0');
        const day = String(nd.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;
        console.log(today)
        // SE IL PUNTO E DI OGGI PASSA AL PROSSIMO
        console.log(this.wpoints[h][j]);
        if(this.wpoints[h][j].date == today){
          console.log('Today is not completable');
          continue;
        }
        // SE IL PUNTO E INCOMPLETO VA AVANTI
        console.log(this.wpoints[h][j].value);
        if(this.wpoints[h][j].value == undefined || this.wpoints[h][j].value == null){
          let id = this.wpoints[h][j].id;
          let date = this.wpoints[h][j].date;
          let value = 0.00;
          let high = 0.00;
          let low = 0.00;
          // PER OGNI ASSET NEL PUNTO
          console.log(this.wpoints[h][j].assets!.length)
          for(let k = 0; k < this.wpoints[h][j].assets!.length; k++){
            let symbol = this.wpoints[h][j].assets![k].ticker;
            console.log(this.wpoints[h][j].assets![k].ticker)
            console.log(this.wpoints[h][j].assets![k].amount)
            console.log(this.wpoints[h][j].assets![k].marketValue)

            let amount:any = this.wpoints[h][j].assets![k].amount;
            let price:any = this.wpoints[h][j].assets![k].marketValue;
            // SE L'ASSET E UGUALE ALLA CURRENCY PRINCIPALE BLOCCA
            if(symbol == this.ursvc.getCurrency()){
              value = value + price
              high = high + price
              low = low + price
              console.log(value, high, low);
              continue;
            }
            console.log(this.dailydata.length)
            // PER OGNI SERIE DI VALORI PRECEDENTEMENTE SALVATA
            for(let n = 0; n < this.dailydata.length; n++){
              console.log(this.dailydata[n].meta);
              // SE ABBIAMO I SUOI VALORI SALVATI
              if(this.dailydata[n].meta.symbol == symbol){
                console.log(this.dailydata[n].values);
                console.log(Object.values(this.dailydata[n].values).length);
                let dex: number = 0;
                // PER OGNI GIORNO
                for(let r = 0; r < Object.values(this.dailydata[n].values).length; r++){
                  console.log(this.dailydata[n].values[r].datetime, date);

                  // SE IL UN GIORNO CORRISPONDE
                  if(this.dailydata[n].values[r].datetime == date){
                    console.log(amount)
                    console.log(value)
                    value = value + (this.dailydata[n].values[r].close * amount);
                    high =  high + (this.dailydata[n].values[r].high * amount);
                    low =  low + (this.dailydata[n].values[r].low * amount);
                    console.log(value, high, low);
                  // SE IL GIORNO NON CORRISPONDE
                  }else{
                    dex = dex + 1;
                  }
                  // SE IL GIORNO NON E PRESENTE NEI VALORI SALVATI
                  if(dex == 100){
                    value = value + price
                    high = high + price
                    low = low + price
                  }
                }
              }

            }
          }
          console.log(value, high, low)
          this.ptsvc.completePoint(id, value, high, low).subscribe(
            (resp) => {
              console.log(resp);
              this.error = undefined;
            },
            (err) => {
              console.log(err.error.message);
              this.error = err.error.message;
            }
          )
        }else{
          console.log('Point already completed');
          continue;
        }
      }
    }
  }

  createMissingPoints(){
    //! CERCA TUTTI I WALLET DELL'UTENTE
    this.wtsvc.findByUser().subscribe(
      (resp) => {
        console.log(resp);
        let wallets:Wallet[] = resp;
        // PER OGNI WALLET DELL'UTENTE
        for(let e = 0; e < wallets.length; e++){
          // PER GLI ULTIMI 100 GIORNI A PARTIRE DA IERI
          for(let f = 0; f < this.dates.length; f++){
            //! CONTROLLA SE ESISTE PUNTO CON WALLET ID E DATA
            this.ptsvc.existByWalletAndDate(wallets[e].id, this.dates[f]).subscribe(
              (resp) => {
                console.log(resp);
                let exist:Boolean = resp;
                //? SE ESITE IL PUNTO
                if(exist){
                  console.log("Point already exists")
                }else{
                //? SE NON ESISTE IL PUNTO
                //! CERCA I PUNTI DEL WALLET
                this.ptsvc.findByWallet(wallets[e].id).subscribe(
                  (resp) => {
                    console.log(resp);
                    let punti:Point[] = resp;
                    //* ORDINA LE DATE NELL'ARRAY
                    punti = punti.sort((a, b) => a.date!.localeCompare(b.date!));
                    //* CERCA LA PRIMA DATA PRECEDETE DISPONIBILE
                    let before: Point | null = this.findNearestPreviousPoint(this.dates[f], punti)
                      //? SE NON CE UNA DATA PRECEDENTE
                      if(before == null){
                        //* IMPORSTA VALORI A 0
                        this.point.date = this.dates[f];
                        this.point.invested = 0.00;
                        this.point.high = 0.00;
                        this.point.low = 0.00;
                        this.point.value = 0.00;
                        this.point.walletId = wallets[e].id;
                        //! LANCIA CHIAMATA POST CON PUNTO COMPLETO
                        this.ptsvc.addPoint(this.point).subscribe(
                          (resp) => {
                            console.log(resp);
                            this.point = {};
                            this.error = undefined;
                          },
                          (err) => {
                            console.log(err.error.message);
                            this.error = err.error.message;
                          }
                        )
                      //? SE CE UNA DATA PRECEDENTE
                      }else{
                        //* IMPOSTA ASSETS DEL PUNTO UGUALI ALLA DATA PRECEDENTE
                        this.point.assets = before.assets;
                        this.point.invested = before.invested;
                        this.point.walletId = wallets[e].id;
                        this.point.date = this.dates[f];
                        // PER OGNI ASSET NEL NUOVO PUNTO
                        for(let o = 0; o < this.point.assets!.length; o++){
                          //? SE L'ASSET E LA CURRENCY PRINCIPALE
                          if(this.point.assets![o].ticker == this.ursvc.getCurrency()){
                            //* IMPOSTA VALUE, HIGH, LOW
                            this.point.high = this.point.high! + this.point.assets![o].amount!;
                            this.point.low = this.point.low! + this.point.assets![o].amount!;
                            this.point.value = this.point.value! + this.point.assets![o].amount!;
                          //? SE L'ASSET NON E LA CURRENCY PRINCIPALE
                          }else{
                            // PER OGNI SERIE DI DATI VALORI SALVATI
                            for(let u = 0; u < this.dailydata.length; u++){
                              //? SE L'ASSET CORRISPONDE
                              if(this.dailydata[u].meta.symbol == this.point.assets![o].ticker){
                                // PER OGNI DATA NELLA SERIE
                                for(let h = 0; h < Object.values(this.dailydata[u].values).length; h++){
                                  //? SE LA DATA E TRACCIATA
                                  if(this.dailydata[u].values[h].datetime == this.point.date){
                                    //* PRENDI I PREZZI DALLA DATA PRECISA E IMPOSTA VALUE, HIGH, LOW
                                    this.point.value = this.point.value! + (this.point.assets![o].amount! * this.dailydata[u].values[h].close);
                                    this.point.high = this.point.value! + (this.point.assets![o].amount! * this.dailydata[u].values[h].high);
                                    this.point.low = this.point.value! + (this.point.assets![o].amount! * this.dailydata[u].values[h].low);
                                  //? SE LA DATA NON E TRACCIATA
                                  }else{
                                    //* PRENDI I PREZZI DALLA DATA PRECEDENTE E IMPOSTA, VALUE, HIGH, LOW
                                    this.point.value = this.point.value! + (this.point.assets![o].amount! * this.point.assets![o].marketPrice!);
                                    this.point.high = this.point.value! + (this.point.assets![o].amount! * this.point.assets![o].marketPrice!);
                                    this.point.low = this.point.value! + (this.point.assets![o].amount! * this.point.assets![o].marketPrice!);
                                  }
                                }
                              }
                            }
                          }
                        }
                        //! LANCIA CHIAMATA POST CON PUNTO COMPLETO
                        this.ptsvc.addPoint(this.point).subscribe(
                          (resp) => {
                            console.log(resp);
                            this.point = {};
                            this.error = undefined;
                          },
                          (err) => {
                            console.log(err.error.message);
                            this.error = err.error.message;
                          }
                        )
                      }
                    this.error = undefined;
                  },
                  (err) => {
                    console.log(err.error.message);
                    this.error = err.error.message;
                  }
                )
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
          this.error = undefined;
        },
        (err) => {
          console.log(err.error.message);
          this.error = err.error.message;
        }
      );


  }

//! UTIL METHODS
  // GET LAST 100 DATES
  private getDates(): string[] {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);

    const datesArray: string[] = [];

    for (let i = 0; i < 100; i++) {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - i);
      const dateString = this.formatDate(date);
      datesArray.push(dateString);
    }

    return datesArray;
  }
  // FORMAT DATES
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private findNearestPreviousPoint(date: string, points: Point[]): Point | null {
    points.sort((a, b) => a.date!.localeCompare(b.date!));
    for (let i = points.length - 1; i >= 0; i--) {
      if (points[i].date! < date) {
        return points[i];
      }
    }
    return null;
  }
//! CHART METHODS
  renderChart(){
    let existingChart = Chart.getChart("totalchart");

    if (existingChart) {
      existingChart.destroy();
    }

    const chart = new Chart("totalchart", {
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
        },
        {
          type: 'line',
          label: 'limit',
          data: this.limits,
          borderColor: '#444654',
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
    Chart.defaults.layout.padding = 15
  }

  findPoints(){
    this.wtsvc.findByUser().subscribe(
      (resp) => {
        console.log(resp);
        let wats:Wallet[] = resp
        let idx: number = 0;
        for(let u = 0; u < wats.length; u++) {
          this.ptsvc.findByWallet(wats[u].id).subscribe(
            (resp) => {
              console.log(resp);
              this.values.push(resp)
              idx = idx + 1
              if(idx == wats.length){
                this.mergeAndShow()
              }
              this.error = undefined;

            },
            (err) => {
              console.log(err.error.message);
              this.error = err.error.message;
            }
          )
        }
        this.error = undefined;
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
    console.log(this.values)
  }

  mergeAndShow() {
    const limitsd: any[] = [];
    const labelsd: any[] = [];
    const datasd: any[] = [];
    const highd: any[] = [];
    const lowd: any[] = [];
    console.log(this.values)

    let marged:Point[] = this.values[0];

    if(this.values.length > 1) {
      console.log(this.values.length)
      for(let i = 1; i < this.values.length; i++){
        console.log(Object.values(this.values[i]).length)
        for(let j = 0; j < Object.values(this.values[i]).length; j++){

          for(let k = 0; k < marged.length; k++){
            console.log(this.values[i][j].date, marged[k].date)
           if(this.values[i][j].date == marged[k].date){
            console.log(marged[k].invested, this.values[i][j].invested)
            marged[k].invested = marged[k].invested + this.values[i][j].invested;
            marged[k].high = marged[k].high + this.values[i][j].high;
            marged[k].low = marged[k].low + this.values[i][j].low;
            marged[k].value = marged[k].value + this.values[i][j].value;
           }
          }
        }
      }
    }
      this.values = marged;

    console.log(this.values);

    this.values = this.values.sort((a, b) => a.date!.localeCompare(b.date!));
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
            limitsd.push(this.values[z].invested);
          }
        }
        this.limits = limitsd;
        this.low = lowd
        this.high = highd
        this.labels = labelsd
        this.datas = datasd
        this.error = undefined;
        this.renderChart();
  }

  findUser(){
    this.user.email = this.ursvc.getEmail();
    this.user.name = this.ursvc.getName();
    this.user.username = this.ursvc.getUsername();
    this.user.currency = this.ursvc.getCurrency();
  }

  findAllAssets(){
    this.wtsvc.findByUser().subscribe(
      (resp) => {
        console.log(resp)
        let walt:Wallet[] = resp
        this.wallets = resp;
        for(let p = 0; p < walt.length; p++){
         this.atsvc.findByWalletId(walt[p].id).subscribe(
          (resp) => {
            console.log(resp)
            let asst: Asset[] = resp;
            for(let g = 0; g < asst.length; g++){
              this.assets.push(asst[g]);
            }
          }, (err) => {
            console.log(err.error.message);
            this.error = err.error.message;
          }
         )
        }

      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    );
  }

  findTotValue() {
    this.wtsvc.findByUser().subscribe(
      (resp) => {
        console.log(resp)
        let walt:Wallet[] = resp
        for(let p = 0; p < walt.length; p++){
          this.totval = this.totval + walt[p].value!;
        }

      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    );
  }

  findTodos(){
    this.tdsvc.findByUser().subscribe(
      (resp) => {
        console.log(resp)
        this.todos = resp
      }, (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    )
  }
}
