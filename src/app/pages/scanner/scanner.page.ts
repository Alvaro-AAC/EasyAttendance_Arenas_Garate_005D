import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  public modalAbierto = false;

  constructor() { }

  ngOnInit() {
  }

  public abrir(es: boolean) {
    this.modalAbierto = es;
  }

}
