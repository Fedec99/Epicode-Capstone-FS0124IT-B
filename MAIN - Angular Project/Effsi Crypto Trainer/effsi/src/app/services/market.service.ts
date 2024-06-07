import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  headers = new HttpHeaders();

  constructor(private http: HttpClient){}

  // GET STOCK METHODS
  searchAsset(keywords: string) {
      console.log(keywords);
      this.headers = this.headers.set('X-RapidAPI-Host', 'twelve-data1.p.rapidapi.com')
                                 .set('X-RapidAPI-Key', 'f4620064b9mshdb8d1bb25f138ebp15508ajsn932fd197513a');

      return this.http.get('https://twelve-data1.p.rapidapi.com/symbol_search?symbol=' + Object.values(keywords) + '&outputsize=25', {
        headers: this.headers
      });
  }

  getMarketDailyView(params: any, time:string) {
    console.log(this.checkAndGiveS(JSON.stringify(Object.values(params))));
    this.headers = this.headers.set('X-RapidAPI-Host', 'twelve-data1.p.rapidapi.com')
                               .set('X-RapidAPI-Key', 'f4620064b9mshdb8d1bb25f138ebp15508ajsn932fd197513a');

    return this.http.get('https://twelve-data1.p.rapidapi.com/time_series?symbol=' + this.checkAndGiveS(JSON.stringify(Object.values(params))) + '&interval=' + time + '&outputsize=100&format=json', {
        headers: this.headers
    });
  }

  getMarketData(params: any, time:string) {
    console.log(params);
    this.headers = this.headers.set('X-RapidAPI-Host', 'twelve-data1.p.rapidapi.com')
                               .set('X-RapidAPI-Key', 'f4620064b9mshdb8d1bb25f138ebp15508ajsn932fd197513a');

    return this.http.get('https://twelve-data1.p.rapidapi.com/time_series?symbol=' + params + '&interval=' + time + '&outputsize=100&format=json', {
        headers: this.headers
    });
  }

  getMarketAssetQuote(params: any){
    console.log(params);
    this.headers = this.headers.set('X-RapidAPI-Host', 'twelve-data1.p.rapidapi.com')
                               .set('X-RapidAPI-Key', 'f4620064b9mshdb8d1bb25f138ebp15508ajsn932fd197513a');

    return this.http.get('https://twelve-data1.p.rapidapi.com/quote?symbol=' + params + '&interval=1day&outputsize=1&format=json', {
        headers: this.headers
    });
  }

  checkAndGiveS(symbol: string|undefined): string {
    if(symbol!.includes("/")){
      let s = symbol!.replace("/", "@");
      console.log(s);
      return s;
    }else if(symbol!.includes("@")){
      let s = symbol!.replace("@", "/");
      s = s.replace(/\[|\]/g, '');
      s = s.replace(/"/g, '');
      console.log(s);
      return s;
    }else{
      let s = symbol;
      s = s!.replace(/\[|\]/g, '');
      s = s!.replace(/[, ]/g, '');
      s = s!.replace(/"/g, '');
      return s!;
    }
  }
}
