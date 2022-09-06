import { Component } from '@angular/core';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { GlobalVarsService } from './services/global-vars.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public static loged;
  public static logedBool;
  public static user;

  public hasHeader: boolean;
  public exemptUrl = []; //['/inicio', '/', '/login', '/duoc-login'];

  constructor(private router: Router, private menu: MenuController) {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationStart) {
        this.hasHeader = true;
        for(const url of this.exemptUrl) {
          if(event.url === url) {
            this.hasHeader = false;
          }
        }
        this.menu.close('miMenu');
      }
      if(event instanceof NavigationEnd) {
        AppComponent.loged = GlobalVarsService.loged;
        if(AppComponent.loged === 'true') {
          console.log('loged');
          AppComponent.logedBool = true;
          AppComponent.user = GlobalVarsService.user;
        } else {
          console.log('notLoged');
          AppComponent.logedBool = false;
        }
      }
    });
  }

}
