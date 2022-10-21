/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ServicedatosService } from 'src/app/services/servicedatos.service';
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

  public empty = false;

  public acordiones: Acordion[] = [];

  private token = this.storage.get('token');

  constructor(
    private datos: ServicedatosService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.token.then(toke => {
      this.acordiones = this.datos.asis(toke, this.acordiones);
    });
  }

}
