import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('ionContent', {static: false}) content;
  
  user;
  msgList :any = [];
  newMessage='';
  start_typing: any;
  teamId;

  constructor(
    private apiProv: apiRestProvider
  ) {  }

  
  ngOnInit() {
    this.user = this.apiProv.getCurrentUserId();
    this.teamId = this.apiProv.getTeamId();
  }

  getMessages(){
    this.apiProv.getMessages(this.teamId)
    .subscribe(
      (data) => { 
        this.msgList = data; 
      });
  }

  sendMessage() {
    var msg = 
      {
      "email": this.user,
      "teamId": this.teamId,
      "bodyMessage": this.newMessage,
      "date": new Date().toString(),
      };
      console.log(msg);
    this.apiProv.createMessage(msg)
    .then( () => {
    })
    .catch(() => {
    });
    
    this.newMessage = '';
    setTimeout(() => {
      this.content.scrollToBottom();
    })
  }

  scrollDown() {
    setTimeout(() => {
      this.content.scrollToBottom(50)
    }, 50);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(50)
    }, 50);
    this.getMessages();
  }

  userTyping(event: any) {
    this.start_typing = event.target.value;
    this.scrollDown()
  }
}
