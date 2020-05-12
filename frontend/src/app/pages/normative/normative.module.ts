import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NormativePageRoutingModule } from './normative-routing.module';

import { NormativePage } from './normative.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NormativePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [NormativePage]
})
export class NormativePageModule {}
