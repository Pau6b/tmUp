import { Component, OnInit, ViewChild } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { StorageService } from 'src/app/services/storage.service';

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
    private apiProv: apiRestProvider,
    private storage: StorageService
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
        this.msgList.forEach(element => {
          this.apiProv.getUser(element.email).subscribe((data) => {
            element['userName'] = data['userName'];
          })
          this.storage.getAFile("profile_images", element.email).then(result => {
            result.items.forEach(async ref => {
              element.url = await ref.getDownloadURL();
            });
          });
        });
      });
  }

  sendMessage() {
    if(this.newMessage != "") {
      var msg = 
      {
      "email": this.user,
      "teamId": this.teamId,
      "bodyMessage": this.newMessage,
      "date": new Date().toString(),
      };
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
