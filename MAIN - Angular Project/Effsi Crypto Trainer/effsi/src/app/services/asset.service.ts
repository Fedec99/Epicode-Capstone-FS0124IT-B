import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asset } from '../interfaces/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  headers = new HttpHeaders();

  constructor(private usvc: UserService, private http: HttpClient) { }

  // POST METHODS
  addAsset(asset: Asset){
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.post('http://localhost:8080/api/asset/add', asset, {headers: this.headers})
  }

  // GET METHODS
  findByWalletId(wId:any) {
      this.headers = this.headers.set(
        'Authorization',
        'Bearer ' + this.usvc.getToken()
      );
      return this.http.get<Asset[]>('http://localhost:8080/api/asset/bywallet/' + wId, {headers: this.headers});
  }

  // PUT METHODS
  updateMarketPrice(id: any, newMarketPrice: number) {
    console.log(id, newMarketPrice)
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.put<Asset>('http://localhost:8080/api/asset/updateprice/' + id + '/' + newMarketPrice,{},{headers: this.headers});
  }
}
