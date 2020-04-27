import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarPage } from './calendar.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  },
  {
    path: 'add-event',
    loadChildren: () => import('../add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('../event/event.module').then( m => m.EventPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarPageRoutingModule {}
