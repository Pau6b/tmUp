import * as express from 'express';
const admin = require("firebase-admin");
//import { UserRecord } from 'firebase-functions/lib/providers/auth';
import {Observable} from 'rxjs';
import { firestore } from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
//import { analytics } from 'firebase-functions';

//import { UserRecord } from 'firebase-functions/lib/providers/auth';

//import {Observable} from 'rxjs';
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            //var today = new Date(jsonContent.date); 
            var today = new Date(); 
            //let userName;
            var timestamp=new Date().getTime();
            var todate= new Date(timestamp).getDate();
            var tomonth= new Date(timestamp).getMonth()+1;
            var toyear= new Date(timestamp).getFullYear();
            var tohour= "0" + new Date(timestamp).getHours();
            var tominutes= "0" + new Date(timestamp).getMinutes();
            var toseconds= "0" + new Date(timestamp).getSeconds();
            var date=todate+'/'+tomonth+'/'+toyear+' '+tohour.substr(-2)+':'+tominutes.substr(-2)+':'+toseconds.substr(-2);
            //let userExists: boolean = true;
            //let userData : any = "";
            /*await admin.auth().getUserByEmail(jsonContent.email).then((user: UserRecord) => {
                userData = {
                    //email: user.email,
                    userName: user.displayName
                }
            }).catch(() => {
                userExists = false;
            });*/
            await db.collection('teams').doc(jsonContent.teamId).collection('messages').add({
                email: jsonContent.email,
                bodyMessage: jsonContent.bodyMessage,
                date: date,
                dateOrd: today
                //userName: userData.userName
            })
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});

app.get('/:teamId', (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams').doc(req.params.teamId).collection('messages').orderBy("dateOrd", "asc");
            query.limit(50); 
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        chatId: doc.data().chatId,
                        email: doc.data().email,
                        userName: doc.data().userName,
                        bodyMessage: doc.data().bodyMessage,
                        date: doc.data().date
                    };
                    response.push(selectedItem);
                }
                return response;
            })

            return res.status(200).send(response);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

app.get("/obs", (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).collection('messages');
            const obs = await queryToObservable(query);
            obs.subscribe(
                (data) => { 
                  console.log(data); 
                });
            return res.status(200).send(obs);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

//ReadAll => GET
app.get('/obs/:teamId', (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams').doc(req.params.teamId).collection('messages');

          let observable = Observable.create((observer: any) => 
            query.onSnapshot(observer)
          );
          observable.subscribe({
            next(value: any) { console.log('value', value); }
          });
/*
            const obs = await queryToObservable(query);
            obs.subscribe(texto => {
                let mensaje = texto;
                console.log(mensaje);
            });
*/
            return res.status(200).send(observable);
            /*const response: any = [];
            return new Promise(function(resolve, reject) {
                setTimeout(() => {
                    query.onSnapshot((snapshot: any[]) => {
                        snapshot.forEach(snap => {
                            const selectedItem  = {
                                chatId: snap.data().chatId,
                                email: snap.data().email,
                                bodyMessage: snap.data().bodyMessage,
                                date: snap.data().date,
                                userName: snap.data().userName,
                                index: snap.data().index
                            };
                            response.push(selectedItem);
                        })
                        console.log(response);;
                        return res.status(200).send(response);
                    })
                    if(true){
                        resolve({msg: "It works", response});
                    }else {
                        reject({});
                    }
                }, 2000);
            })
*/
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

//get anterior messages. 50 anterior messages (getAntMessages)
app.get('/:teamId/:date', (req, res) => {
    (async () => {
        try {
            var limDate = new Date(req.params.date); 
            let query = db.collection('teams').doc(req.params.teamId).collection('messages').where('dateOrd', '<', limDate).orderBy("dateOrd", "asc");
            query.limit(50);
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        chatId: doc.data().chatId,
                        email: doc.data().email,
                        userName: doc.data().userName,
                        bodyMessage: doc.data().bodyMessage,
                        date: doc.data().date
                    };
                    response.push(selectedItem);
                }
                return response;
            })

            return res.status(200).send(response);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

module.exports = app;

function queryToObservable(query: firestore.Query): Observable<DocumentSnapshot[]>{

    let observable = Observable.create(query.onSnapshot.bind(query));
    return observable;
    /*return new Observable(subscriber => {
        const snapUnsub = query.onSnapshot(next => {
            subscriber.next(next.docSnapshots.map(doc => doc.data()));
        });
    });*/
}