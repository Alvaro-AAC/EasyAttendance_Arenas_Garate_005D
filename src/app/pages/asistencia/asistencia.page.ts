import { Component, OnInit } from '@angular/core';

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
    {
      valor: 'arquitectura',
      label: 'ARQUITECTURA ',
      numtotal: 8,
      numasist: 7,
      porcentaje: 88
    },
    {
      valor: 'calidad',
      label: 'CALIDAD DE SOFTWARE ',
      numtotal: 12,
      numasist: 12,
      porcentaje: 100
    },
    {
      valor: 'ingles',
      label: 'INGLÉS ',
      numtotal: 20,
      numasist: 15,
      porcentaje: 75
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
