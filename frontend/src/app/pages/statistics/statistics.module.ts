import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';

import {SelfBasketballComponent} from './components/self-basketball/self-basketball.component';
import {SelfFootballComponent} from './components/self-football/self-football.component';
import {SelfHandballComponent} from './components/self-handball/self-handball.component';

const SelfPageComponents = [
  SelfBasketballComponent,
  SelfFootballComponent,
  SelfHandballComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule
  ],
  declarations: [
    StatisticsPage,
    SelfPageComponents
  ],
  entryComponents: [SelfPageComponents]
})
export class StatisticsPageModule {}
