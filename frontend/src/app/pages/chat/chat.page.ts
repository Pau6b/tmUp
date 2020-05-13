import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;

  User = "prueba";
  msgList :any = [];
  newMessage='';
  start_typing: any;
  username;

  teamId;

  constructor(
    private apiProv: apiRestProvider
  ) {  }

  
  ngOnInit() {
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
      "email": "prueba",//this.username,
      "teamId": "6hd6Bdym8CXKW0Sm3hDb",//this.teamId,
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
