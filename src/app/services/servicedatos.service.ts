import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Acordion {
  valor: string;
  label: string;
  numtotal: number;
  numasist: number;
  porcentaje: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicedatosService {

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router
  ) {

  }
//LOGIN
  public login(user: string, pwd: string) {
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    const postUrl = 'http://129.151.110.110/api/v1/login/';
    const postData = `user=${user}&pwd=${pwd}`;
    this.http.post(postUrl, postData, {headers})
      .subscribe(async (elem: any) => {
        if(elem.status === 'success') {
          await this.storage.set('user', user);
          await this.storage.set('isLoged', true);
          const alerta = this.presentAlert('Sesión iniciada', 'Usted ha iniciado sesión correctamente');
          alerta.then(async (event: any) => {
            // eslint-disable-next-line max-len
            this.http.post('http://129.151.110.110/api/v1/generar_codigo_alumno/', `username=${user}`, {headers}).subscribe((token: any) => {
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
                    this.login(user, pwd);
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

//Asistencia
  public asis(token: string, acordiones: Array<Acordion>){
    this.http.get(`http://129.151.110.110/api/v1/asistencia/${token}/`).toPromise().then(response => {
      Object.entries(response).forEach(elem => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        acordiones.push(<Acordion>{
          valor: elem[1].descripcion,
          label: elem[1].descripcion,
          numtotal: elem[1].total,
          numasist: elem[1].presente,
          porcentaje: Number.parseFloat(((elem[1].presente/elem[1].total)*100).toPrecision(2))
        });
      });
    });
    return acordiones;
  }

  public async horario(token: string) {
    return this.http.get('http://129.151.110.110/api/v1/horario/' + token + '/?format=json').toPromise();
  }

  public async register(user: string) {
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    const url = `http://129.151.110.110/api/v1/verified/${user}/`;
    const response = this.http.get(url, {headers}).toPromise();
    return response;
  }

  public async crearuser(usuario, contrasena, nombre, apellido) {
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    const postUrl = 'http://129.151.110.110/api/v1/crearalumno/';
    // eslint-disable-next-line max-len
    const postData = `usuario=${usuario}&contrasena=${contrasena}&nombre=${nombre}&apellido=${apellido}`;
    return this.http.post(postUrl, postData, {headers}).toPromise();
  }

  public async generarcodigo(user) {
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post('http://129.151.110.110/api/v1/generar_codigo_alumno/', `username=${user}`, {headers}).toPromise();
  }

  public async codelogin(user) {
    const url = 'http://129.151.110.110/api/v1/generar_codigo_login/';
    const headers = new HttpHeaders({'content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(url, `username=${user}&auth=z_gHXCkfMAuv703l_F2J6`, {headers});
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
