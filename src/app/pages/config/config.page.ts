import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

interface MenuItem {
  label: string;
  id: string;
  icon: string;
  disabled: boolean;
  checked?: Promise<any>;
}

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  public menuItemToggle: MenuItem[] = [
    {
      label: 'Modo oscuro',
      id: 'darkmode',
      icon: 'moon',
      disabled: true,
      checked: Promise.resolve(true),
    },
    {
      label: 'Huella',
      id: 'huella',
      icon: 'finger-print-outline',
      disabled: false,
      checked: this.storage.get('huella'),
    },
  ];

  public periodoNotif = this.storage.get('notif');

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.periodoNotif.then(data => {
      if (data === null) {
        this.periodoNotif = Promise.resolve('na');
      }
    });
  }

  public handleChange(e) {
    if(e.target.id === 'huella') {
      this.storage.set('huella', e.detail.checked);
    } else if(e.target.id === 'notif') {
      this.storage.set('notif', e.detail.value);
    }
  }

}
