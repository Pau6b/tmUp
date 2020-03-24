import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTeamPageRoutingModule } from './add-team-routing.module';

import { AddTeamPage } from './add-team.page';

import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddTeamPageRoutingModule
  ],
  declarations: [AddTeamPage]
})
export class AddTeamPageModule {}
