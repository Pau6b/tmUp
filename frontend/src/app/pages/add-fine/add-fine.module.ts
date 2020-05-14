import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFinePageRoutingModule } from './add-fine-routing.module';

import { AddFinePage } from './add-fine.page';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFinePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddFinePage]
})
export class AddFinePageModule {}
