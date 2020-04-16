import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMatchPageRoutingModule } from './add-match-routing.module';

import { AddMatchPage } from './add-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMatchPageRoutingModule
  ],
  declarations: [AddMatchPage]
})
export class AddMatchPageModule {}
