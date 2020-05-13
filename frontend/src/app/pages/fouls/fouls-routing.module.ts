import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoulsPage } from './fouls.page';

const routes: Routes = [
  {
    path: '',
    component: FoulsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoulsPageRoutingModule {}
