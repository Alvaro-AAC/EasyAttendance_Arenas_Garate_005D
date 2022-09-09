import { Component, OnInit } from '@angular/core';

interface MenuItem {
  label: string;
  id: string;
  icon: string;
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
    },
    {
      label: 'Huella',
      id: 'huella',
      icon: 'finger-print-outline',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
