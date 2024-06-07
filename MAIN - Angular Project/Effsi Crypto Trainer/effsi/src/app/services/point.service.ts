import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Point } from '../interfaces/point';
import { Asset } from '../interfaces/asset';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  headers = new HttpHeaders();

  constructor(private usvc: UserService, private http:HttpClient) { }

  addPoint(point:Point){
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.post<Point>('http://localhost:8080/api/point/add' , point ,{headers: this.headers});
  }

  completePoint(pointId:any, value:any, high:any, low:any) {
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.put<Point>('http://localhost:8080/api/point/complete/' + pointId + '/' + value + '/' + high + '/' + low ,{} ,{headers: this.headers});
  }

  findByWallet(walletId:any){
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.get<Point[]>('http://localhost:8080/api/point/bywallet/'+ walletId , {headers: this.headers})
  }

  findByWalletAndDate(walletId:any, date:string){
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.get<Point>('http://localhost:8080/api/point/bywallet/'+ walletId + '/' + date , {headers: this.headers})
  }

  existByWalletAndDate(walletId:any, date:string){
    this.headers = this.headers.set(
      'Authorization',
      'Bearer ' + this.usvc.getToken()
    );
    return this.http.get<Boolean>('http://localhost:8080/api/point/exist/'+ walletId + '/' + date , {headers: this.headers})
  }

}
