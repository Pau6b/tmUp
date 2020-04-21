import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


interface message {
    id : string
    message : string
    username : string
    createdAt : Date
  }

@Injectable()
export class apiRestProvider {

    url: string = 'https://us-central1-tmup-908e4.cloudfunctions.net/app/';

    constructor (private http: HttpClient, private db: AngularFirestore){
    }

    //LOGIN AND LOGOUT

    setToken( token ) {
            return new Promise(resolve => {
                this.http.post(this.url+'login', JSON.stringify({token: token}) )
                .subscribe( data => {
                    resolve(data);
                })
            })
        }

    logOutBack() {
        return this.http.post(this.url+'/logout', null);
    }

    //USER

    getMe(){
        return this.http.get(this.url+'users/me');
    }

    getProfileInfo() {
        return this.http.get(this.url+'/users/me');
    }

    updateProfileInfo(name, email) {
        
    }

    getUserTeams(){
        return this.http.get(this.url+'users/me/teams');
    }

    //TEAMS

    getTeams(userid){
        return this.http.get(this.url+'memberships/getByUser/'+userid);
    }

    createTeam(teamData) {
        return new Promise(resolve => {
            this.http.post(this.url+'teams/create', JSON.stringify(teamData))
            .subscribe(data => {
                resolve(data);
            })
        })
    }

    createMembership(data) {
        return new Promise(resolve => {
            this.http.post(this.url+'memberships/create', JSON.stringify(data))
            .subscribe(data => {
                resolve(data);
            });
        })
    }

    // CHAT

    createChat(chatInfo){
        return new Promise(resolve => {
            this.http.post(this.url+'chats/create', JSON.stringify(chatInfo))
            .subscribe(data => {
                resolve(data);
            })
        })
    }

    getChat(teamId: string){
        return this.http.get(this.url+'chats/'+teamId);
    }

    getMessages(chatId: string, teamId: string){

        /*return this.db.collection("teams/6hd6Bdym8CXKW0Sm3hDb/chats/t8qtEbMEcFbflhKlHGsQ/messages").snapshotChanges().pipe(map(mensajes => {
            return mensajes.map(m => {
                const data = m.payload.doc.data() as message;
                data.id = m.payload.doc.id;
                return data;
            })
        }))*/
        return this.http.get(this.url+'chats/messages/'+teamId+'/'+chatId);
    }

    createMessage(messageInfo){
        return new Promise(resolve => {
            this.http.post(this.url+'chats/messages/create', JSON.stringify(messageInfo))
            .subscribe(data => {
                resolve(data);
            })
        })
    }

    //CALENDAR AND EVENTS METHODS
    
    getEventsOfMonth(teamId, month) {
        return this.http.get(this.url+'teams/events/bymonth/'+ teamId+'/'+month);
    }

    createMatch(matchInfo) { 
        return new Promise(resolve => {
            this.http.post(this.url+'teams/events/match/create', JSON.stringify(matchInfo))
            .subscribe(data => {
                resolve(data);
            })
        });
    }

    createTraining(trainingInfo) {
        return new Promise(resolve => {
            this.http.post(this.url+'teams/events/training/create', JSON.stringify(trainingInfo))
            .subscribe(data => {
                resolve(data);
            })
        });
    }

    editMatch(matchInfo) {
        return new Promise(resolve => {
            this.http.put(this.url+'teams/events/match/update', JSON.stringify(matchInfo))
            .subscribe(data => {
                resolve(data);
            })
        });
    }

    editTraining(trainingInfo) {
        return new Promise(resolve => {
            this.http.put(this.url+'teams/events/training/update', JSON.stringify(trainingInfo))
            .subscribe(data => {
                resolve(data);
            })
        });
    }

    deleteEvent(tId, eId) {
        return new Promise(resolve => {
            this.http.delete(this.url+'teams/events/delete/'+ tId + '/' + eId)
            .subscribe(data => {
                resolve(data);
            })
        });
    }

}
