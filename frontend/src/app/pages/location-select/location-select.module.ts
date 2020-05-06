import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationSelectPageRoutingModule } from './location-select-routing.module';

import { LocationSelectPage } from './location-select.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationSelectPageRoutingModule,
    TranslateModule
  ],
  declarations: [LocationSelectPage]
})
export class LocationSelectPageModule {}
