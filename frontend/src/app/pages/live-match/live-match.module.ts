import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveMatchPageRoutingModule } from './live-match-routing.module';

import { LiveMatchPage } from './live-match.page';
import { BasketballViewComponent } from './Components/basketball-view/basketball-view.component';
import { FootballViewComponent } from './Components/football-view/football-view.component';
import { HandballViewComponent } from './Components/handball-view/handball-view.component';
import { EditStadisticsComponent } from './Components/edit-stadistics/edit-stadistics.component'
import { TranslateModule } from '@ngx-translate/core'

const PageComponents = [
  FootballViewComponent,
  BasketballViewComponent,
  HandballViewComponent,
  EditStadisticsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveMatchPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    LiveMatchPage,
    PageComponents
  ],
  entryComponents: [
    PageComponents
  ]
})
export class LiveMatchPageModule {}
