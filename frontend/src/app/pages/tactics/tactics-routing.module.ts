import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TacticsPage } from './tactics.page';

const routes: Routes = [
  {
    path: '',
    component: TacticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TacticsPageRoutingModule {}
