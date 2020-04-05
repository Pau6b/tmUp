import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTeamPage } from './add-team.page';

const routes: Routes = [
  {
    path: '',
    component: AddTeamPage
  },
  {
    path: 'team-list',
    loadChildren: () => import('../team-list/team-list.module').then( m => m.TeamListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTeamPageRoutingModule {}
