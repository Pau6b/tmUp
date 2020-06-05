import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysiotherapistPageRoutingModule } from './physiotherapist-routing.module';

import { PhysiotherapistPage } from './physiotherapist.page';

import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysiotherapistPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [PhysiotherapistPage]
})
export class PhysiotherapistPageModule {}
