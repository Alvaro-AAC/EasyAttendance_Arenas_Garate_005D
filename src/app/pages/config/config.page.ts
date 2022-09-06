import { Component, OnInit } from '@angular/core';

interface MenuItem {
  label: string;
  id: string;
}

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  public menuItemToggle: MenuItem[] = [
    {
      label: 'Test 1',
      id: 'test1',
    },
    {
      label: 'Test 2',
      id: 'test2',
    },
    {
      label: 'Test 3',
      id: 'test3',
    },
  ];

  public menuItemCheck: MenuItem[] = [
    {
      label: 'Test 4',
      id: 'test4',
    },
    {
      label: 'Test 5',
      id: 'test5',
    },
    {
      label: 'Test 6',
      id: 'test6',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
