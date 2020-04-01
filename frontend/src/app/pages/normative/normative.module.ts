import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NormativePageRoutingModule } from './normative-routing.module';

import { NormativePage } from './normative.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NormativePageRoutingModule
  ],
  declarations: [NormativePage]
})
export class NormativePageModule {}
