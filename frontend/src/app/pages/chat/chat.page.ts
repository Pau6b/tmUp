import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, IonContent } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Observable } from 'rxjs';


interface message {
  id : string
  message : string
  username : string
  createdAt : Date
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  username: string="Ivan";
  messages :any = [];
  /*messagess = [
    {
      "message": "Hola a todos, como estais?",
      "username": "Juanjo",
      "createdAt": 1554090956000
    },
    {
      "message": "Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio"+
      +"Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio, Pues bien encerrados haciendo un poco de ejercicio",
      "username": "Ivan",
      "createdAt": 1554090956000
    },
    {
      "message": "Sudando un poco",
      "username": "Ivan",
      "createdAt": 1554090956000
    },
    {
      "message": "Pero en nada me voy",
      "username": "Ivan",
      "createdAt": 1554090956000
    },
    {
      "message": "Bueno agobiados",
      "username": "Carles",
      "createdAt": 1554090956000
    },
    {
      "message": "Cansado ya",
      "username": "Lucas",
      "createdAt": 1554090956000
    },
    {
      "message": "Bueno me voy a hacer ejercicio",
      "username": "Ivan",
      "createdAt": 1554090956000
    },
    {
      "message": "Hasta luego",
      "username": "Clara",
      "createdAt": 1554090956000
    },
    {
      "message": "Dew pasalo bien",
      "username": "Pau",
      "createdAt": 1554090956000
    },
    {
      "message": "Hasta luego",
      "username": "Daniela",
      "createdAt": 1554090956000
    },
    {
      "message": "Que vaya bien",
      "username": "Juanjo",
      "createdAt": 1554090956000
    }
  ];*/

  currentUser = "Ivan";
  newMessage='';
  @ViewChild (IonContent, {static: false}) content: IonContent

  constructor(
    public api: apiRestProvider,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
  ) { 
    setTimeout(() => {
      this.content.scrollToBottom();
    })
  }

  ngOnInit() {
    this.api.getMessages("a", "b").subscribe(mensajes => {
      this.messages = mensajes;
    });
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
      this.content.scrollToBottom(200);
    })
    
  }
}
