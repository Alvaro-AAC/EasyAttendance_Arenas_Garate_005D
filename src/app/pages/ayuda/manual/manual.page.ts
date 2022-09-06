import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface ManualItem {
  icon: string;
  label: string;
  modalTittle: string;
  modalContent: string;
}

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  public tituloModal = '';
  public contenidoModal = '';
  public isModalOpen = false;

  public manualItems: ManualItem[] = [
    {
      icon: 'scan-circle-outline',
      label: '¿Cómo escanear?',
      modalTittle: 'Cómo escanear',
      modalContent: 'Para escanear un código QR se requiere:',
    },
    {
      icon: 'camera-outline',
      label: 'La cámara no funciona',
      modalTittle: 'Cámara',
      modalContent: 'En caso de que la cámara no funcione, debe intentar:<br>-<br>-',
    },
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  public cancel() {
    this.isModalOpen = false;
  }

  public changeModal(titulo: string, contenido: string) {
    this.tituloModal = titulo;
    this.contenidoModal = contenido;
    this.isModalOpen = true;
  }

}
