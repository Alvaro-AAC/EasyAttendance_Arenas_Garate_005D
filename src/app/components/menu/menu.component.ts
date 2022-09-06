import { Component, OnInit } from '@angular/core';

interface MenuItem {
    icon: string;
    label: string;
    href: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public allMenuItems: MenuItem[] = [
    {
      icon: 'home-outline',
      label: 'Inicio',
      href: '/'
    },
    {
      icon: 'scan-circle-outline',
      label: 'Escanear código QR',
      href: '/scanner'
    },
    {
      icon: 'newspaper-outline',
      label: 'Noticias',
      href: '/noticias'
    },
    {
      icon: 'information-circle-outline',
      label: 'Ayuda',
      href: '/ayuda'
    },
    {
      icon: 'cog-outline',
      label: 'Configuración',
      href: '/config'
    },
  ];

  public isLoged = false;

  public isDisabled = false;

  constructor() { }

  ngOnInit() {
  }

}
