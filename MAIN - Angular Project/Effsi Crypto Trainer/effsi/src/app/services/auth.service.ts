import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Logindata } from '../auth/interfaces/logindata';
import { Registerdata } from '../auth/interfaces/registerdata';
import { Accessdata } from '../auth/interfaces/accessdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;

  jwtHelper: JwtHelperService = new JwtHelperService();
  private authSubject = new BehaviorSubject<null | Object>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((data: any) => Boolean(data)));

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }
  // POST METHODS
  signup(user: Registerdata) {
    console.log(user);
    return this.http.post('http://localhost:8080/api/auth/register', user);
  }

  signin(user: Logindata) {
    console.log(user);
    return this.http
      .post('http://localhost:8080/api/auth/login', user)
      .pipe(tap((data: any) => this.authSubject.next(data)));
  }

  // OTHER METHODS
  restoreUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(user.accessToken)) {
      console.log(user.accessToken);
      this.router.navigate(['/auth/login']);
      localStorage.clear();
      return;
    } else {
      this.authSubject.next(user);
      this.router.navigate(['/home']);
      return;
    }
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('user');
    console.log('Utente Sloggato');
    this.router.navigate(['/auth']);
  }
}
