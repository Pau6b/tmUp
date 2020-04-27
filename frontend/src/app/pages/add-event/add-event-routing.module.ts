import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEventPage } from './add-event.page';

const routes: Routes = [
  {
    path: '',
    component: AddEventPage
  },
  {
    path: 'calendar',
    loadChildren: () => import('../calendar/calendar.module').then( m => m.CalendarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEventPageRoutingModule {}
