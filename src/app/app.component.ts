import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public hasHeader: boolean;
  public exemptUrl = ['/inicio', '/', '/login', '/duoc-login'];
  public perm = true;
  private user;
  private token;
  private isLoged;

  private isLogedUrls = ['/login', '/duoc-login'];
  private notLogedUrls = ['/asistencia', '/horario', '/noticias', '/config', '/scanner', '/ayuda'];

  constructor(private router: Router, private storage: Storage, private platform: Platform) {
    this.storage.create();
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationStart) {
        for (const url of this.isLogedUrls) {
          if(event.url === url) {
            this.storage.get('isLoged').then(loged => {
              if(loged) {
                this.router.navigate(['/']);
              }
            })
          }
        }
        for (const url of this.notLogedUrls) {
          if(event.url === url) {
            this.storage.get('isLoged').then(loged => {
              if(!loged) {
                this.router.navigate(['/']);
              }
            })
          }
        }
        this.hasHeader = true;
        for(const url of this.exemptUrl) {
          if(event.url === url) {
            this.hasHeader = false;
          }
        }
      }
    });
    // this.storage.get('huella').then(huella => {
    //   if(huella) {
    //     this.fillData().then(() => {
    //       this.platform.pause.subscribe(async () => {
    //         await this.storage.remove('user');
    //         await this.storage.set('isLoged', false);
    //       });
    //       this.platform.resume.subscribe(async () => {
    //         await this.storage.set('isLoged', true);
    //         await this.storage.set('user', this.user);
    //       });
    //     });
    //   }
    // });
  }

  async fillData() {
    await this.storage.get('user').then(user => {
      this.user = user;
    });
    await this.storage.get('token').then(token => {
      this.token = token;
    });
    await this.storage.get('isLoged').then(isLoged => {
      this.isLoged = isLoged;
    });
  }

}
