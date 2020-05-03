import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TacticsPageRoutingModule } from './tactics-routing.module';

import { TacticsPage } from './tactics.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TacticsPageRoutingModule,
    TranslateModule
  ],
  declarations: [TacticsPage]
})
export class TacticsPageModule {}
