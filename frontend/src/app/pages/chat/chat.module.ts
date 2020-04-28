import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { AutosizeModule } from 'ngx-autosize';

import { ChatPage } from './chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutosizeModule,
    ChatPageRoutingModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
