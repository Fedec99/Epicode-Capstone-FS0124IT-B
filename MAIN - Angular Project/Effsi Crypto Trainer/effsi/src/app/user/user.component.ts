import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  user: User = {};

  supp:boolean = false;

  @ViewChild('f') form!: NgForm;

  constructor(private athsvc:AuthService, private svc:UserService){}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.user.id = this.svc.getId();
    this.user.username = this.svc.getUsername();
    this.user.name = this.svc.getName();
    this.user.email = this.svc.getEmail();
    this.user.exp = this.svc.getExp();
    this.user.currency = this.svc.getCurrency();
  }

  logout() {
    this.athsvc.logout();
  }

  emailHandler(e: Event) {
    console.log('inviata')
    e.preventDefault();
    emailjs.sendForm('service_ivcepkh', 'template_9q6uajb', e.target as HTMLFormElement, 'Ez87DD_mc6nP2YS88')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        this.supp = false;
      }, (error) => {
        console.log(error.text);
      });
  }
}
