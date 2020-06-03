import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
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
    console.log(token);
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

  public getCurrentUserId(): string {
    return this.currentUserId;
  }

  private setHeader() {
    this.headers = new HttpHeaders({ 'Authorization' : this.token });
  }

  //USER

  public getUser(userId) {
    this.setHeader();
    return this.http.get(this.url+'users/'+userId, { headers: this.headers });
  }

  public getMe(){
    this.setHeader();
    return this.http.get(this.url+'users/me', { headers: this.headers });
  }

  public updateProfileInfo(newName, mail) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.put(this.url+'users/update', JSON.stringify({displayName: newName, email: mail}), { headers: this.headers, responseType:'text' })
      .subscribe(data => {
          resolve(data);
        })
      });
    
  }

  public getUserTeams(){
    this.setHeader();
    return this.http.get(this.url+'users/me/teams', { headers: this.headers });
  }

  public deleteUser(email) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.delete(this.url+'users/'+ email , { headers: this.headers, responseType:'text'})
      .subscribe(data => {
          resolve(data);
      })
    });
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
      this.http.post(this.url+'teams/create', JSON.stringify(teamData), { headers: this.headers, responseType: 'text' })
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

  public deleteTeam() {
    this.setHeader;
    return new Promise(resolve => {
      this.http.delete(this.url+'teams/'+ this.currentTeam , { headers: this.headers, responseType:'text'})
      .subscribe(data => {
          resolve(data);
      })
    });
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
      return this.db.collection("teams/"+teamId+"/messages", ref => ref.orderBy("dateOrd", "asc")).snapshotChanges().pipe(map(mensajes => {
        return mensajes.map(m => {
          const data = m.payload.doc.data() as message;
          data.id = m.payload.doc.id;
            return data;
        })
      }));
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
      this.http.delete(this.url+'teams/events/delete/'+ this.currentTeam + '/' + eId, { headers: this.headers, responseType:'text'})
      .subscribe(data => {
          resolve(data);
        })
    });
  }

  public createCall(eventId, listConv) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.put(this.url+'teams/events/match/' + eventId + '/makeCall', JSON.stringify({teamId: this.currentTeam, call: listConv}), { headers: this.headers })
      .subscribe(data => {
          resolve(data);
      })
    });
  }
  
  public getMembers() {
    this.setHeader();
    return new Promise(resolve => {
      this.http.get(this.url+'memberships/getByTeam/' + this.currentTeam, {headers: this.headers, params: {type: 'all'}})
      .subscribe(data => {
          resolve(data);
      })
    });
  }

  //Tactics
  public getTactics(){
    return this.http.get(this.url+'teams/tactics/download');
  }
  
  //News
  public getNextMatch() {
    this.setHeader();
    return new Promise(resolve => {
      this.http.get(this.url+'teams/events/nextevent/match/' + this.currentTeam, {headers: this.headers})
      .subscribe(data => {
          resolve(data);
        })
    });
  }

  public getNextTraining() {
    this.setHeader();
    return new Promise(resolve => {
      this.http.get(this.url+'teams/events/nextevent/training/' + this.currentTeam, {headers: this.headers})
      .subscribe(data => {
        resolve(data);
      })
    });
  }
  
  public getNews() {
    this.setHeader();
    return new Promise(resolve => {
      this.http.get(this.url+'teams/noticies/all/' + this.currentTeam, {headers: this.headers})
      .subscribe(data => {
        resolve(data);
      })
    });
  }
  
  //LIVE-MATCH
  public getCall(eventId) {
    this.setHeader();
    return this.http.get(this.url+'teams/events/'+this.currentTeam+'/match/'+eventId+'/getCall', {headers: this.headers});
  }
  
  public sendStatistics(eventId, statsLog) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.put(this.url+'teams/events/statistics/'+this.currentTeam+'/'+eventId, JSON.stringify(statsLog), { headers: this.headers })
      .subscribe(data => {
        resolve(data);
      })
    });
  }
  
  //Statistics
  public getCurrentUserStatistics() {
    this.setHeader();
    return this.http.get(this.url+"memberships/getStats/"+this.currentTeam+'/'+this.currentUserId, {headers: this.headers});
  }
  
  public getUserStatistics(userId) {
    this.setHeader();
    return this.http.get(this.url+"memberships/getStats/"+this.currentTeam+"/"+userId, {headers: this.headers});
  }

  public getCurrentTeamStatistics() {
    this.setHeader();
    return this.http.get(this.url+"teams/"+this.currentTeam+"/stadistics", {headers: this.headers})
  }
  
  public getCurrentTeamRanking() {
    this.setHeader();
    return this.http.get(this.url+"teams/"+this.currentTeam+"/ranking", { headers: this.headers });
  }
  
  //Fines
  public createFine(fineInfo) {
    this.setHeader();
    console.log(fineInfo)
    return this.http.post(this.url+'memberships/fines/create',JSON.stringify(fineInfo),{headers: this.headers} );
  }
  
  public payFine(fineInfo) {
    this.setHeader();
    fineInfo.teamId = this.currentTeam;
    return new Promise(resolve => {
      this.http.put(this.url+'memberships/fines/payFine', JSON.stringify(fineInfo), {headers: this.headers})
      .subscribe(data => {
        resolve(data);
      })
    });
  }
  public getMemberFines(fineState){
    this.setHeader();
    return this.http.get(this.url+'memberships/fines/membershipFines', {headers: this.headers, params: {
      teamId: this.currentTeam,
      userId: this.currentUserId,
      fineState: fineState
    }});
  }
  
  public getTeamFines(fineState){
    this.setHeader();
    return this.http.get(this.url+'memberships/fines/teamFines', {headers: this.headers, params: {
      teamId: this.currentTeam,
      fineState: fineState
    }});
  }
  public getMemberRegister(){
    this.setHeader();
    return this.http.get(this.url+'memberships/fines/sumMembership', {headers: this.headers, params: {
      teamId: this.currentTeam,
      userId: this.currentUserId
    }});
  }
  public getTeamRegister(){
    this.setHeader();
    return this.http.get(this.url+'memberships/fines/sumTeam', {headers: this.headers, params: {
      teamId: this.currentTeam
    }});
  }
  
  public getUserTeamMemberships(tipo){
    this.setHeader();
    return this.http.get(this.url+"memberships/getByTeam/"+this.currentTeam, {headers: this.headers, params: { 
      type: tipo 
    }});
  }

  public getMembership() {
    this.setHeader();
    return this.http.get(this.url+"memberships/", {
      headers: this.headers, 
      params: {
        userId: this.currentUserId,
        teamId: this.currentTeam
      },
    })
  }

  public async getCurrentUserRole() {
    this.setHeader();
    console.log(this.currentTeam);
    console.log(this.currentUserId);
    return this.http.get(this.url+"memberships/type", {
      headers: this.headers, 
      params: {
        userId: this.currentUserId,
        teamId: this.currentTeam
      },
      responseType: 'text'
    })
  }
  
  //Physiotherapy
  public addURL(url) {
    this.setHeader();
    return new Promise(resolve => {
      this.http.put(this.url+'memberships/updatePhysioUrl', JSON.stringify(url), { headers: this.headers, params: {
        userId: this.currentUserId,
        teamId: this.currentTeam
      } })
      .subscribe(data => {
        resolve(data);
      })
    });
  }
}