import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

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

  public allMenuItems: MenuItem[];

  public isLoged = this.storage.get('isLoged');

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.storage.get('isLoged').then(elem => {
          console.log(elem);
          if (elem) {
            this.allMenuItems = [
              {
                icon: 'home-outline',
                label: 'Inicio',
                href: '/inicio'
              },
              {
                icon: 'time-outline',
                label: 'Horario',
                href: '/horario'
              },
              {
                icon: 'scan-circle-outline',
                label: 'Escanear código QR',
                href: '/scanner'
              },
              {
                icon: 'clipboard-outline',
                label: 'Asistencia',
                href: '/asistencia'
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
          } else {
            this.allMenuItems = [
              {
                icon: 'home-outline',
                label: 'Inicio',
                href: '/inicio'
              },
              {
                icon: 'person-add-outline',
                label: 'Registrarse',
                href: '/duoc-login',
              },
            ];
          }
        });
      }
    });
  }

  public logout() {
    this.storage.set('isLoged', false).then(() => {
      this.storage.remove('user').then(() => {
        window.location.replace('/');
      });
    });
  }

}
