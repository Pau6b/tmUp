import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular';

import { LocationSelectPageModule } from '../location-select/location-select.module'

import { AddEventPageRoutingModule } from './add-event-routing.module';

import { AddEventPage } from './add-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddEventPageRoutingModule,
    LocationSelectPageModule
  ],
  declarations: [AddEventPage],
})
export class AddEventPageModule {}
