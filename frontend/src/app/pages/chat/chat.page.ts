import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, IonContent } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  username: string="Ivan";
  messages :any = [];
  currentUser = "Ivan";
  newMessage='';
  @ViewChild (IonContent, {static: true}) content: IonContent

  constructor(
    public api: apiRestProvider,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.api.getMessages("a", "b").subscribe(mensajes => {
      this.messages = mensajes;
    });
    setTimeout(() => {
      this.content.scrollToBottom();
    })
  }

  getMessages(){
    this.api.getMessages("t8qtEbMEcFbflhKlHGsQ", "6hd6Bdym8CXKW0Sm3hDb")
        .subscribe(
          (data) => { 
            this.messages = data; 
          },
          (error) => { console.log(error); }
        );
  }

  sendMessage() {
    var msg = 
      {
      "email": this.username,
      "teamId": "6hd6Bdym8CXKW0Sm3hDb",
      "chatId": "t8qtEbMEcFbflhKlHGsQ",
      "bodyMessage": this.newMessage,
      "date": new Date().toString()
      };
      console.log(msg)
    this.api.createMessage(msg)
        .then( () => {
        })
        .catch( () => {
        });
    
    this.newMessage = '';
    setTimeout(() => {
      this.content.scrollToBottom();
    })
    
  }
}
