import { Component, OnInit } from '@angular/core';
import { ServicedatosService } from 'src/app/services/servicedatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = '';
  public pwd = '';

  constructor(
    private datos: ServicedatosService
  ) { }

  ngOnInit() {
  }

  login() {
    this.datos.login(this.user, this.pwd);
  }

  onSubmit() {
    return false;
  }

}
