import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { AlertController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

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
    private router: Router
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
        this.checkValidity()
        .then((response: any) => {
          if(response.status === 'success') {
            console.log(response);
            if(response.data.verificado) {
              GlobalVarsService.user = this.user;
              GlobalVarsService.loged = 'true';
              this.suscripcion.unsubscribe();
              alert.header = 'Bienvenido ' + this.user;
              alert.message = 'El correo fue validado correctamente.';
              alert.subHeader = null;
              alert.buttons = [{text: 'Aceptar', handler: () => {this.router.navigate(['/']);}}];
            } else {
              console.log('no validado');
            }
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

  private async checkValidity() {
    const url = `http://129.151.110.110/api/v1/verified/${this.user}/`;
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    const response = this.http.get(url, {headers});
    return await response.toPromise();
  }
}
