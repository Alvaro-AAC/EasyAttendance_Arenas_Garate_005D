import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public logedBool;
  public user;

  constructor(private router: Router) { }

  ngOnInit() {
      this.router.events.subscribe((event: any) => {
        if(event instanceof NavigationEnd) {
          if(GlobalVarsService.loged === 'true') {
            this.logedBool = true;
            this.user = GlobalVarsService.user;
          } else {
            this.logedBool = false;
            this.user = null;
          }
        }
      });
  }

}
