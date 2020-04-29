import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

interface message {
  id : string
  message : string
  username : string
  createdAt : Date
}

@Injectable()
export class apiRestProvider { 

  url: string = 'https://us-central1-tmup-908e4.cloudfunctions.net/app/';
  headers;

  constructor (
    private http: HttpClient,
    private db: AngularFirestore,
    private authServ: AuthService
  ){ }

  private setHeader() {
    this.headers = new HttpHeaders({ 'Authorization' : this.authServ.token });
    console.log("ENTRO EN EL METODO SET HEADER");
  }

  //USER

  getMe(){
    this.setHeader();
    console.log(this.headers);
    return this.http.get(this.url+'users/me', { headers: this.headers });
  }

  getProfileInfo() {
    this.setHeader();
    return this.http.get(this.url+'users/me', { headers: this.headers });
  }

  updateProfileInfo(name, email) {
    this.setHeader();      
  }

  getUserTeams(){
    this.setHeader();
    return this.http.get(this.url+'users/me/teams', { headers: this.headers });
  }

  //TEAMS

  getTeams(userid){
    this.setHeader();
    return this.http.get(this.url+'memberships/getByUser/'+userid, { headers: this.headers });
  }

  createTeam(teamData) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'teams/create', JSON.stringify(teamData), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    })
  }

  createMembership(data) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'memberships/create', JSON.stringify(data), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      });
    })
  }

  // CHAT

  createChat(chatInfo){
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'chats/create', JSON.stringify(chatInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    })
  }

  getChat(teamId: string){
    this.setHeader();
    return this.http.get(this.url+'chats/'+teamId, { headers: this.headers });
  }

  getMessages(chatId: string, teamId: string){
    this.setHeader();
    /*return this.db.collection("teams/6hd6Bdym8CXKW0Sm3hDb/chats/t8qtEbMEcFbflhKlHGsQ/messages").snapshotChanges().pipe(map(mensajes => {
      return mensajes.map(m => {
          const data = m.payload.doc.data() as message;
          data.id = m.payload.doc.id;
          return data;
      })
    }))*/
    return this.http.get(this.url+'chats/messages/6hd6Bdym8CXKW0Sm3hDb/t8qtEbMEcFbflhKlHGsQ', { headers: this.headers });
    //return this.http.get(this.url+'chats/messages/'+teamId+'/'+chatId, { headers: this.headers });
  }

  createMessage(messageInfo){
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'chats/messages/create', JSON.stringify(messageInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    })
  }

  //CALENDAR AND EVENTS METHODS
  
  getEventsOfMonth(teamId, month) {
    this.setHeader();
    return this.http.get(this.url+'teams/events/bymonth/'+ teamId+'/'+month, { headers: this.headers });
  }

  createMatch(matchInfo) { 
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'teams/events/match/create', JSON.stringify(matchInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  createTraining(trainingInfo) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'teams/events/training/create', JSON.stringify(trainingInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  editMatch(matchInfo) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.put(this.url+'teams/events/match/update', JSON.stringify(matchInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  editTraining(trainingInfo) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.put(this.url+'teams/events/training/update', JSON.stringify(trainingInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  deleteEvent(tId, eId) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.delete(this.url+'teams/events/delete/'+ tId + '/' + eId, { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  //Tactics
  getTactics(){
    return this.http.get(this.url+'teams/tactics/download');
  }

}
