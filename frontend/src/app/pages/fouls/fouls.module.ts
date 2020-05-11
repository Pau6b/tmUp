import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoulsPageRoutingModule } from './fouls-routing.module';

import { FoulsPage } from './fouls.page';
import { ModalComponent } from '../components/modal/modal.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoulsPageRoutingModule,
    ModalComponent,
    TranslateModule
  ],
  declarations: [FoulsPage]
})
export class FoulsPageModule {}
