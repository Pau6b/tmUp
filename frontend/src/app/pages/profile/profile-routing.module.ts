import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
