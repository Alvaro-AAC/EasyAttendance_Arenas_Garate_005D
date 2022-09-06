import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuocLoginPage } from './duoc-login.page';

const routes: Routes = [
  {
    path: '',
    component: DuocLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuocLoginPageRoutingModule {}
