import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = '';
  public pwd = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    return false;
  }

  login() {
    console.log(this.user);
    console.log(this.pwd);
  }

}
