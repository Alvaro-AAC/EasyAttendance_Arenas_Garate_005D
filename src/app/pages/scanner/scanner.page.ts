import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  public modalAbierto = false;

  private tokenAlumno = this.storage.get('token');

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  public async startScan() {
    const element = document.getElementById('fondoEsp');
    const boton = document.getElementById('boton');
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    element.classList.add('fondoInvisible');
    element.classList.remove('fondo');
    boton.style.visibility = 'hidden';
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.tokenAlumno.then(tokenAlm => {
        this.http.get(`http://129.151.110.110/api/v1/registrar_asistencia/${result.content}/${tokenAlm}/`).toPromise().then(r => {
          this.modalAbierto = true;
          BarcodeScanner.showBackground();
          element.classList.remove('fondoInvisible');
          element.classList.add('fondo');
          boton.style.visibility = 'visible';
        });
      });
    }
  }

  public abrir(input: boolean) {
    this.modalAbierto = input;
  }

}
