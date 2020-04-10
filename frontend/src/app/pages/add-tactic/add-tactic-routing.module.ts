import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTacticPage } from './add-tactic.page';

const routes: Routes = [
  {
    path: '',
    component: AddTacticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTacticPageRoutingModule {}
