import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveMatchPageRoutingModule } from './live-match-routing.module';

import { LiveMatchPage } from './live-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveMatchPageRoutingModule
  ],
  declarations: [LiveMatchPage]
})
export class LiveMatchPageModule {}
