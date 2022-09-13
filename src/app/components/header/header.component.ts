import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  // public isLoged = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((elem: any) => {
      if (elem instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

}
