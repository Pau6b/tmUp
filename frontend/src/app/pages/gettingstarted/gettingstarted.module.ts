import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GettingstartedPageRoutingModule } from './gettingstarted-routing.module';

import { GettingstartedPage } from './gettingstarted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GettingstartedPageRoutingModule
  ],
  declarations: [GettingstartedPage]
})
export class GettingstartedPageModule {}
