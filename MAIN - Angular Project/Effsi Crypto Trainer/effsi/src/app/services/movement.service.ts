import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement } from '../interfaces/movement';
import { Asset } from '../interfaces/asset';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  headers = new HttpHeaders();

  constructor(private usvc: UserService, private http: HttpClient) { }

  // GET METHODS
  getMovsByWallet(id:any) {
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.get<Movement[]>('http://localhost:8080/api/movement/bywallet/'+ id , {headers: this.headers})
  }

  // POST METHODS
  addIncoming(value: any, id: any) {
      this.headers = this.headers.set(
        'Authorization',
        'Bearer ' + this.usvc.getToken()
      );
      return this.http.post('http://localhost:8080/api/movement/incoming/' + this.usvc.getId() + '/' + id + '/' + value.startingAssetId, value.amount , {headers: this.headers})
  }

  addOutgoing(value: any, id: any) {
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.post('http://localhost:8080/api/movement/outgoing/' + this.usvc.getId() + '/' + id + '/' + value.startingAssetId, value.amount , {headers: this.headers})
  }

  addTransfer(value: any, id: any) {
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.post('http://localhost:8080/api/movement/transfer/' + this.usvc.getId() + '/' + id + '/' + value.endingWalletId + '/' + value.startingAssetId, value.amount , {headers: this.headers})
  }

  addConvert(value: any, id: any, a:Asset) {
    console.log(value, id, a)

    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.post('http://localhost:8080/api/movement/convert/' + this.usvc.getId() + '/' + id + '/' + value.startingAssetId + '/' + value.amount , a, {headers: this.headers})
  }

}
