import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  help:boolean = false;

  constructor(private svc: AuthService){}

  ngOnInit(): void {
    this.svc.restoreUser();
  }

}
