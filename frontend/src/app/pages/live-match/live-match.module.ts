import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveMatchPageRoutingModule } from './live-match-routing.module';

import { LiveMatchPage } from './live-match.page';

const PageComponents = [
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveMatchPageRoutingModule
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
