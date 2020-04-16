import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMatchPage } from './add-match.page';

const routes: Routes = [
  {
    path: '',
    component: AddMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMatchPageRoutingModule {}
