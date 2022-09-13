import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public hasHeader: boolean;
  public exemptUrl = ['/inicio', '/', '/login', '/duoc-login'];

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationStart) {
        this.hasHeader = true;
        for(const url of this.exemptUrl) {
          if(event.url === url) {
            this.hasHeader = false;
          }
        }
      }
    });
  }

}
