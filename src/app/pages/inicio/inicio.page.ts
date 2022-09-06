import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public logedBool = new BehaviorSubject(GlobalVarsService.loged);
  public user;

  constructor() { }

  ngOnInit() {
    this.logedBool.subscribe();
  }

}
