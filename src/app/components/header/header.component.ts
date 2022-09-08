import { Component, OnInit } from '@angular/core';
// import { NavigationEnd, Router } from '@angular/router';
// import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  // public isLoged = false;

  constructor() { }

  ngOnInit() {
    // this.router.events.subscribe((elem: any) => {
    //   if (elem instanceof NavigationEnd) {
    //     if(GlobalVarsService.loged === 'true') {
    //       this.isLoged = true;
    //     }
    //   }
    // });
  }

}
