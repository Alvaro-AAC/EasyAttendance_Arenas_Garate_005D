import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = '';
  public pwd = '';

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private storage: Storage
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    return false;
  }

  login() {
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    const postUrl = 'http://localhost:8000/api/v1/login/';
    const postData = `user=${this.user}&pwd=${this.pwd}`;
    this.http.post(postUrl, postData, {headers})
      .subscribe((elem: any) => {
        if(elem.status === 'success') {
          this.storage.set('user', this.user);
          this.storage.set('isLoged', true);
          const alerta = this.presentAlert('Sesión iniciada', 'Usted ha iniciado sesión correctamente');
          alerta.then((event: any) => {
            event.buttons = [{
              text: 'Aceptar',
              handler: () => {
                window.location.replace('/');
              }
            }];
          });
        } else if(elem.status === 'invalid') {
          this.presentAlert('No válido', 'Usuario o contraseña ingresados no son correctos.');
        }
      });
  }

  private async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
    return alert;
  }
}
