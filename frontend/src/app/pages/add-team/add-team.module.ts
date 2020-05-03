import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTeamPageRoutingModule } from './add-team-routing.module';

import { AddTeamPage } from './add-team.page';

import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddTeamPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddTeamPage]
})
export class AddTeamPageModule {}
