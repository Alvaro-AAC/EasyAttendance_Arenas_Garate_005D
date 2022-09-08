import { Component, OnInit } from '@angular/core';

interface Dia {
  codigo: string;
  nombre: string;
  horas?: Horario[];
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

  public horariosLun: Horario[] = [
    {
      nombre: 'ARQUITECTURA',
      ini: '16:01',
      fin: '17:20',
      codigo: 'ASY4131'
    },
    {
      nombre: 'INGLES INTERMEDIO',
      ini: '17:30',
      fin: '18:50',
      codigo: 'INI5111'
    },
  ];

  public horariosMar: Horario[] = [
    {
      nombre: 'ESTADISTICA DESCRIPTIVA',
      ini: '11:31',
      fin: '12:50',
      codigo: 'MAT4140'
    },
    {
      nombre: 'CALIDAD DE SOFTWARE',
      ini: '13:01',
      fin: '14:20',
      codigo: 'CSY4111'
    },
    {
      nombre: 'PROCESO DE PORTAFOLIO',
      ini: '14:31',
      fin: '15:50',
      codigo: 'APY4461'
    },
    {
      nombre: 'ETICA PARA EL TRABAJO',
      ini: '16:01',
      fin: '17:20',
      codigo: 'EAY4470'
    },
  ];

  public dias: Dia[] = [
    {
      codigo: 'L',
      nombre: 'Lunes',
      horas: this.horariosLun,
    },
    {
      codigo: 'M',
      nombre: 'Martes',
      horas: this.horariosMar,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
