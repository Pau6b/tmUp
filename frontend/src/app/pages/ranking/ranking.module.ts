import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingPageRoutingModule } from './ranking-routing.module';

import { RankingPage } from './ranking.page';
import { BasketballRankingComponent } from './basketball-ranking/basketball-ranking.component';
import { FootballRankingComponent } from './football-ranking/football-ranking.component';
import { HandballRankingComponent } from './handball-ranking/handball-ranking.component';

const RankingPageComponents = [
  BasketballRankingComponent,
  FootballRankingComponent,
  HandballRankingComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingPageRoutingModule
  ],
  declarations: [
    RankingPage,
    RankingPageComponents
  ]
})
export class RankingPageModule {}
