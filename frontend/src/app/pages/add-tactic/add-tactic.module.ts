import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTacticPageRoutingModule } from './add-tactic-routing.module';

import { AddTacticPage } from './add-tactic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTacticPageRoutingModule
  ],
  declarations: [AddTacticPage]
})
export class AddTacticPageModule {}
