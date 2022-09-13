import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-duoc-login',
  templateUrl: './duoc-login.page.html',
  styleUrls: ['./duoc-login.page.scss'],
})
export class DuocLoginPage implements OnInit {

  public user = '';
  public timer = 600;
  private suscripcion: Subscription;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
    ) {

    }

  ngOnInit() {
  }

  public async showAlert() {
    const alert = await this.alertController.create({
      header: 'Esperando confirmación',
      subHeader: 'Tiempo: 10:00',
      message: 'Se ha enviado un correo a su dirección institucional. Debe verificar su identidad mediante el enlace enviado.',
      buttons: [
        {
          text: 'Cancelar',
          id: 'btnCancelar',
          handler: () => {
            if(!this.suscripcion.closed) {
              this.suscripcion.unsubscribe();
              this.timer = 600;
            }
          }
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
    const source = interval(1000);
    this.suscripcion = source.subscribe((val: number) => {
      this.timer -= 1;
      const tiempoMins = Math.trunc(this.timer/60);
      const tiempoSegs = (this.timer - (tiempoMins*60));
      let parsedSeconds;
      if(tiempoSegs < 10) {
        parsedSeconds = '0' + tiempoSegs;
      } else {
        parsedSeconds = tiempoSegs;
      }
      alert.subHeader = 'Tiempo: 0' + tiempoMins + ':' + parsedSeconds;
      if(val%5 === 0) {


        const url = `http://129.151.110.110/api/v1/verified/${this.user}/`;
        const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
        const response = this.http.get(url, {headers});


        response.toPromise()
        .then((resp: any) => {
          if(resp.status === 'success') {
            console.log(resp);
            if(resp.data.verificado) {
              this.suscripcion.unsubscribe();
              alert.header = 'Bienvenido ' + this.user;
              alert.message = 'El correo fue validado correctamente.';
              alert.subHeader = null;
              alert.buttons = [
                {
                  text: 'Aceptar',
                  handler: () => {
                    alert.header = 'Registrarse';
                    alert.message = null;
                    alert.inputs = [
                      {
                        name: 'usuario',
                        placeholder: 'Usuario',
                        value: this.user,
                        disabled: true,
                      },
                      {
                        name: 'nombre',
                        placeholder: 'Nombre',
                      },
                      {
                        name: 'apellido',
                        placeholder: 'Apellido',
                      },
                      {
                        name: 'contrasena',
                        placeholder: 'Contraseña',
                        type: 'password',
                      }
                    ];
                    alert.buttons = [
                      {
                        text: 'Confirmar',
                        handler: data => {
                          const postUrl = 'http://129.151.110.110/api/v1/crearalumno/';
                          // eslint-disable-next-line max-len
                          const postData = `usuario=${data.usuario}&contrasena=${data.contrasena}&nombre=${data.nombre}&apellido=${data.apellido}`;
                          const respPost = this.http.post(postUrl, postData, {headers})
                          .subscribe((respElem: any) => {
                            if(respElem.status === 'success') {
                              this.storage.set('user', data.usuario);
                              this.storage.set('isLoged', true);
                              alert.dismiss();
                              this.router.navigate(['/']);
                            } else {
                              console.log(respElem);
                              alert.subHeader = 'Error en los datos';
                            }
                          });
                        }
                      },
                      {
                        text: 'Cancelar',
                        handler: () => {
                          this.user = null;
                          this.storage.remove('user');
                          this.storage.set('isLoged', false);
                          this.router.navigate(['/']);
                        }
                      }
                    ];
                    return false;
                  }
                }
              ];
            } else {
              console.log('no validado');
            }
          } else {
            console.log('no validado');
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
      if(this.timer === 0) {
        this.suscripcion.unsubscribe();
        this.timer = 600;
        alert.header = 'Tiempo expirado!';
        alert.subHeader = '';
        alert.message = 'El tiempo de espera para confirmar el correo ha finalizado, debe enviar un nuevo correo de autentificación.';
        alert.buttons = [{
          text: 'Aceptar',
          handler: () => {
            alert.dismiss();
          }
        }];
      }
    });
  }

  public login() {
    if(this.user === '') {
      this.presentAlert('Campo vacío', 'Debe ingresar los datos solicitados en los campos que se muestran en pantalla.');
      return false;
    }
    const url = 'http://129.151.110.110/api/v1/generar_codigo_login/';
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    const response = this.http.post(url, `username=${this.user}&auth=z_gHXCkfMAuv703l_F2J6`, {headers});
    response.pipe().subscribe((elem: any) => {
      if(elem.status === 'success') {
        const token = elem.data.token;
        this.showAlert();
      } else if (elem.status === 'unauthorized') {
        this.presentAlert('No autorizado', 'Su acceso no está autorizado a este servicio, lo sentimos.');
      } else if (elem.status === 'existe') {
        this.presentAlert('Usuario ya registrado', 'El usuario que usted ha ingresado ya ha sido registrado.');
      }
      else if (elem.status === 'errorvalidacion') {
        this.presentAlert('Usuario no válido', 'El usuario que usted ha ingresado no coincide con el formato utilizado por Duoc.');
      }
      else {
        console.log('error');
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
  }

  // private async checkValidity() {
  //   const url = `http://129.151.110.110/api/v1/verified/${this.user}/`;
  //   const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
  //   const response = this.http.get(url, {headers});
  //   return await response.toPromise();
  // }
}
