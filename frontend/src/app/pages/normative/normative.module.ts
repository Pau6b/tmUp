import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//------------------------
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
//............................

import { IonicModule } from '@ionic/angular';

import { NormativePageRoutingModule } from './normative-routing.module';

import { NormativePage } from './normative.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NormativePageRoutingModule
  ],
  declarations: [NormativePage]
})
export class NormativePageModule {}
