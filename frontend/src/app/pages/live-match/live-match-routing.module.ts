import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveMatchPage } from './live-match.page';

const routes: Routes = [
  {
    path: '',
    component: LiveMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveMatchPageRoutingModule {}
