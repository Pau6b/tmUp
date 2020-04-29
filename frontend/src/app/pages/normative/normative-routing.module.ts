import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NormativePage } from './normative.page';

const routes: Routes = [
  {
    path: '',
    component: NormativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NormativePageRoutingModule {}
