import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudaPage } from './ayuda.page';

const routes: Routes = [
  {
    path: '',
    component: AyudaPage
  },
  {
    path: 'acerca',
    loadChildren: () => import('./acerca/acerca.module').then( m => m.AcercaPageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./manual/manual.module').then( m => m.ManualPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudaPageRoutingModule {}
