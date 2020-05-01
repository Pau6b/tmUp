import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TacticsPageRoutingModule } from './tactics-routing.module';

import { TacticsPage } from './tactics.page';

import { AngularFireStorageModule } from '@angular/fire/storage'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TacticsPageRoutingModule,
    AngularFireStorageModule
  ],
  declarations: [TacticsPage]
})
export class TacticsPageModule {}
