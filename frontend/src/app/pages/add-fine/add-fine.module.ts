import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFinePageRoutingModule } from './add-fine-routing.module';

import { AddFinePage } from './add-fine.page';
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFinePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AddFinePage]
})
export class AddFinePageModule {}
