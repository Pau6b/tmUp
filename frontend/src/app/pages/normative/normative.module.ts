import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//------------------------
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
//............................

import { IonicModule } from '@ionic/angular';

import { NormativePageRoutingModule } from './normative-routing.module';

import { NormativePage } from './normative.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NormativePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule

  ],
  declarations: [NormativePage]
})
export class NormativePageModule {}
