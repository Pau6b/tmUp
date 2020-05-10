import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'; 

interface message {
  id : string
  message : string
  username : string
  createdAt : Date
}

@Injectable()
export class apiRestProvider { 

  private url: string = 'https://us-central1-tmup-908e4.cloudfunctions.net/app/';
  private headers;
  private token: string;
  private currentTeam: string = "";
  private currentUserId: string = "";

  constructor (
    private http: HttpClient,
    private db: AngularFirestore
  ){ }

  public setToken(token: string) {
    this.token = token;
  }

  public setTeam(team: string){
    this.currentTeam = team;
  }

  public setUser(user:any){
    this.currentUserId = user;
  }

  public getTeamId(): string {
    return this.currentTeam;
  }

  private setHeader() {
    this.headers = new HttpHeaders({ 'Authorization' : this.token });
  }

  //USER

  public getMe(){
    this.setHeader();
    return this.http.get(this.url+'users/me', { headers: this.headers });
  }

  public updateProfileInfo(name, email) {
    this.setHeader();      
  }

  public getUserTeams(){
    this.setHeader();
    return this.http.get(this.url+'users/me/teams', { headers: this.headers });
  }

  //TEAMS

  public getTeams(userid){
    this.setHeader();
    return this.http.get(this.url+'memberships/getByUser/'+userid, { headers: this.headers });
  }

  public getCurrentTeam() {
    this.setHeader();
    return this.http.get(this.url+'teams/'+this.currentTeam, {headers: this.headers});
  }

  public createTeam(teamData) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'teams/create', JSON.stringify(teamData), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    })
  }

  public createMembership(data) {
    this.setHeader();
    data.userId = this.currentUserId;
    return new Promise(resolve => {
      this.http.post(this.url+'memberships/create', JSON.stringify(data), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      });
    })
  }

  // CHAT

  public createChat(chatInfo){
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'chats/create', JSON.stringify(chatInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    })
  }

  public getChat(teamId: string){
    this.setHeader();
    return this.http.get(this.url+'chats/'+teamId, { headers: this.headers });
  }

  public getMessages(teamId: string){
    this.setHeader();
      return this.db.collection("teams/6hd6Bdym8CXKW0Sm3hDb/messages", ref => ref.orderBy("dateOrd", "asc")).snapshotChanges().pipe(map(mensajes => {
        return mensajes.map(m => {
            const data = m.payload.doc.data() as message;
            data.id = m.payload.doc.id;
            return data;
        })
    }));
    //return this.http.get(this.url+'chats/messages/obs6hd6Bdym8CXKW0Sm3hDb/t8qtEbMEcFbflhKlHGsQ', { headers: this.headers });
    //return this.http.get(this.url+'chats/messages/'+teamId+'/'+chatId, { headers: this.headers });
  }

  public createMessage(messageInfo){
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'teams/messages/create', JSON.stringify(messageInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    })
  }

  //CALENDAR AND EVENTS METHODS
  
  public getEventsOfMonth(month) {
    this.setHeader();
    return this.http.get(this.url+'teams/events/bymonth/'+ this.currentTeam +'/'+ month, { headers: this.headers });
  } 

  public getEventById(eId) {
    this.setHeader();
    return this.http.get(this.url+'teams/events/'+ this.currentTeam +'/'+ eId, { headers: this.headers });
  }

  public createMatch(matchInfo) { 
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'teams/events/match/create', JSON.stringify(matchInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  public createTraining(trainingInfo) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'teams/events/training/create', JSON.stringify(trainingInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  public editMatch(matchInfo) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.put(this.url+'teams/events/match/update', JSON.stringify(matchInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  public editTraining(trainingInfo) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.put(this.url+'teams/events/training/update', JSON.stringify(trainingInfo), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  public deleteEvent(eId) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.delete(this.url+'teams/events/delete/'+ this.currentTeam + '/' + eId, { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  //Tactics
  public getTactics(){
    return this.http.get(this.url+'teams/tactics/download');
  }

  //Statistics
  public getStatistics() {
    this.setHeader();
    console.log(this.currentTeam);
    console.log(this.currentUserId);
    let url = this.url+"memberships/getStats/"+this.currentTeam+'/'+this.currentUserId;
    console.log(url);
    return this.http.get(url, {headers: this.headers});
  }

}