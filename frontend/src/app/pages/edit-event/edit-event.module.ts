import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms'
import { LocationSelectPageModule } from '../location-select/location-select.module'


import { EditEventPageRoutingModule } from './edit-event-routing.module';

import { EditEventPage } from './edit-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEventPageRoutingModule,
    ReactiveFormsModule,
    LocationSelectPageModule
  ],
  declarations: [EditEventPage]
})
export class EditEventPageModule {}
