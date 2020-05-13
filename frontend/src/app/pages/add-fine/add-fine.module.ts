import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFinePageRoutingModule } from './add-fine-routing.module';

import { AddFinePage } from './add-fine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFinePageRoutingModule
  ],
  declarations: [AddFinePage]
})
export class AddFinePageModule {}
