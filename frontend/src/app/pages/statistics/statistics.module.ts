import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';

import { SelfBasketballComponent } from './components/self-basketball/self-basketball.component';
import { SelfFootballComponent } from './components/self-football/self-football.component';
import { SelfHandballComponent } from './components/self-handball/self-handball.component';
import { TranslateModule } from '@ngx-translate/core';
import { TeamBasketballComponent } from './components/team-basketball/team-basketball.component';
import { TeamFootballComponent } from './components/team-football/team-football.component';
import { TeamHandballComponent } from './components/team-handball/team-handball.component';

const SelfPageComponents = [
  SelfBasketballComponent,
  SelfFootballComponent,
  SelfHandballComponent,
  TeamBasketballComponent,
  TeamFootballComponent,
  TeamHandballComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    StatisticsPage,
    SelfPageComponents
  ],
  entryComponents: [SelfPageComponents]
})
export class StatisticsPageModule {}
