/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

interface Acordion {
  valor: string;
  label: string;
  numtotal: number;
  numasist: number;
  porcentaje: number;
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  public acordiones: Acordion[] = [
  ];

  private token = this.storage.get('token');

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  ngOnInit() {
    // eslint-disable-next-line max-len
    this.token.then(token => {
      this.http.get(`http://129.151.110.110/api/v1/asistencia/${token}/`).toPromise().then(response => {
        Object.entries(response).forEach(elem => {
          this.acordiones.push(<Acordion>{
            valor: elem[1].descripcion,
            label: elem[1].descripcion,
            numtotal: elem[1].total,
            numasist: elem[1].presente,
            porcentaje: Number.parseFloat(((elem[1].presente/elem[1].total)*100).toPrecision(2))
          });
        });
      });
    });
  }

}
