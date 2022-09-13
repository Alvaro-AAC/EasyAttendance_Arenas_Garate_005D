import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public logedBool = this.storage.get('isLoged').then(elem => elem);
  public user = this.storage.get('user').then(elem => elem);

  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    let a;
    let b;
    await this.storage.get('isLoged').then(elem => a = elem);
    await this.logedBool.then(elem => b = elem);
    this.storage.get('user').then(usuario => {
      if (usuario === undefined) {
        this.storage.get('isLoged').then(isLoged => {
          if(isLoged) {
            this.storage.set('isLoged', false);
          }
        });
      }
    });
    if(a !== b) {
      window.location.reload();
    }
  }

}
