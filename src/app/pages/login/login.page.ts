import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private storage: Storage,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    return false;
  }

  login() {
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    const postUrl = 'http://129.151.110.110/api/v1/login/';
    const postData = `user=${this.user}&pwd=${this.pwd}`;
    this.http.post(postUrl, postData, {headers})
      .subscribe(async (elem: any) => {
        if(elem.status === 'success') {
          await this.storage.set('user', this.user);
          await this.storage.set('isLoged', true);
          const alerta = this.presentAlert('Sesión iniciada', 'Usted ha iniciado sesión correctamente');
          alerta.then(async (event: any) => {
            // eslint-disable-next-line max-len
            this.http.post('http://129.151.110.110/api/v1/generar_codigo_alumno/', `username=${this.user}`, {headers}).subscribe((token: any) => {
              if(token.status === 'success') {
                this.storage.set('token', token.data.token).then(() => {
                  event.buttons = [{
                    text: 'Aceptar',
                    handler: () => {
                      this.router.navigate(['/']);
                    }
                  }];
                });
              } else {
                console.log(token);
                event.buttons = [{
                  text: 'Reintentar',
                  handler: () => {
                    this.login();
                  }
                },
                {
                  text: 'Cancelar',
                  handler: () => {
                    this.router.navigate(['/']);
                  }
                }];
              }
            });
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
