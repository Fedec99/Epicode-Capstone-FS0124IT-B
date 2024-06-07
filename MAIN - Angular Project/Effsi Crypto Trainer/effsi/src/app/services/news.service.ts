import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headers = new HttpHeaders();

  constructor(private http: HttpClient){}

  // GET NEWS METHODS
  searchNews() {
      this.headers = this.headers.set('X-RapidAPI-Host', 'seeking-alpha.p.rapidapi.com')
                                 .set('X-RapidAPI-Key', 'f4620064b9mshdb8d1bb25f138ebp15508ajsn932fd197513a');

      return this.http.get('https://seeking-alpha.p.rapidapi.com/articles/v2/list-trending?size=20', {
        headers: this.headers
      });
  }
}
