import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor (
    private http: HttpClient,
  ){ }

  public setToken(token: string) {
    this.token = token;
  }

  public setTeam(team: string){
    this.currentTeam = team;
  }

  public getTeam(): string {
    return this.currentTeam;
  }

  private setHeader() {
    this.headers = new HttpHeaders({ 'Authorization' : this.token });
  }

  //USER

  public getMe(){
    this.setHeader();
    console.log(this.headers);
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

  public getMessages(chatId: string, teamId: string){
    this.setHeader();
    return this.http.get(this.url+'chats/messages/6hd6Bdym8CXKW0Sm3hDb/t8qtEbMEcFbflhKlHGsQ', { headers: this.headers });
    //return this.http.get(this.url+'chats/messages/'+teamId+'/'+chatId, { headers: this.headers });
  }

  public createMessage(messageInfo){
    this.setHeader();
    return new Promise(resolve => {
      this.http.post(this.url+'chats/messages/create', JSON.stringify(messageInfo), { headers: this.headers })
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

}