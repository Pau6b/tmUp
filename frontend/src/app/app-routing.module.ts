import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-team',
    loadChildren: () => import('./pages/add-team/add-team.module').then( m => m.AddTeamPageModule)
  },
  {
    path: 'team-list',
    loadChildren: () => import('./pages/team-list/team-list.module').then( m => m.TeamListPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'tactics',
    loadChildren: () => import('./pages/tactics/tactics.module').then( m => m.TacticsPageModule)
  },
  {
    path: 'normative',
    loadChildren: () => import('./pages/normative/normative.module').then( m => m.NormativePageModule)
  },
  {
    path: 'add-tactic',
    loadChildren: () => import('./pages/add-tactic/add-tactic.module').then( m => m.AddTacticPageModule)
  },
  {
    path: 'event/:id',
    loadChildren: () => import('./pages/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./pages/add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'location-select',
    loadChildren: () => import('./pages/location-select/location-select.module').then( m => m.LocationSelectPageModule)
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./pages/edit-event/edit-event.module').then( m => m.EditEventPageModule)
  },
  {
    path: 'fouls',
    loadChildren: () => import('./pages/fouls/fouls.module').then( m => m.FoulsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
