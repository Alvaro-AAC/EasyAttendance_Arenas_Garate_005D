/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

interface Dia {
  codigo: string;
  nombre: string;
  horas: Horario[];
  disabled: boolean;
}

interface Horario {
  nombre: string;
  ini: string;
  fin: string;
  codigo: string;
}

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  public horariosLun: Horario[] = [];

  public horariosMar: Horario[] = [];

  public horariosMie: Horario[] = [];

  public horariosJue: Horario[] = [];

  public horariosVie: Horario[] = [];

  public horariosSab: Horario[] = [];

  public dias: Dia[] = [
    {
      codigo: 'LUN',
      nombre: 'Lunes',
      horas: this.horariosLun,
      disabled: false,
    },
    {
      codigo: 'MAR',
      nombre: 'Martes',
      horas: this.horariosMar,
      disabled: false,
    },
    {
      codigo: 'MIE',
      nombre: 'Miercoles',
      horas: this.horariosMie,
      disabled: false,
    },
    {
      codigo: 'JUE',
      nombre: 'Jueves',
      horas: this.horariosJue,
      disabled: false,
    },
    {
      codigo: 'VIE',
      nombre: 'Viernes',
      horas: this.horariosVie,
      disabled: false,
    },
    {
      codigo: 'SAB',
      nombre: 'Sabado',
      horas: this.horariosSab,
      disabled: false,
    },
  ];

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) {

  }

  ngOnInit() {
    this.storage.get('token').then(token => {
      // eslint-disable-next-line max-len
      this.http.get('http://129.151.110.110/api/v1/horario/' + token + '/?format=json').toPromise()
      .then((data: any) => {
        data.forEach(hora => {
          const nombre = hora.seccion_id.ramo_id.descripcion;
          const ini = hora.modulo_id.hora_ini.substring(0, 5);
          const fin = hora.modulo_id.hora_fin.substring(0, 5);
          const codigo = hora.seccion_id.ramo_id.codigo_letra + hora.seccion_id.ramo_id.codigo_numero;
          switch (hora.dia) {
            case 'LUN':
              this.horariosLun.push(<Horario>{
                nombre,
                ini,
                fin,
                codigo
              });
              break;
            case 'MAR':
              this.horariosMar.push(<Horario>{
                nombre,
                ini,
                fin,
                codigo
              });
              break;
            case 'MIE':
              this.horariosMie.push(<Horario>{
                nombre,
                ini,
                fin,
                codigo
              });
              break;
            case 'JUE':
              this.horariosJue.push(<Horario>{
                nombre,
                ini,
                fin,
                codigo
              });
              break;
            case 'VIE':
              this.horariosVie.push(<Horario>{
                nombre,
                ini,
                fin,
                codigo
              });
              break;
            case 'SAB':
              this.horariosSab.push(<Horario>{
                nombre,
                ini,
                fin,
                codigo
              });
              break;
          }
        });
      }).finally(() => {
        for(const dia of this.dias) {
          if(dia.horas.length === 0) {
            dia.disabled = true;
          }
        }
      });
    });
  }

}
