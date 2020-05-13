import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFinePage } from './add-fine.page';

const routes: Routes = [
  {
    path: '',
    component: AddFinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFinePageRoutingModule {}
