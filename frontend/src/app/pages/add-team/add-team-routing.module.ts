import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTeamPage } from './add-team.page';

const routes: Routes = [
  {
    path: '',
    component: AddTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTeamPageRoutingModule {}
