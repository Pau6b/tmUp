import * as express from 'express';
const admin = require("firebase-admin");
//import { UserRecord } from 'firebase-functions/lib/providers/auth';
//import 'rxjs/add/observable/of';
//import 'rxjs/add/observable/fromEvent';
//import { object } from 'rxfire/database';
//import {Observable} from 'rxjs';
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            var today = new Date(jsonContent.date); 
            //let userName;
            await db.collection('teams').doc(jsonContent.teamId).collection('chats').doc(jsonContent.chatId).collection('messages').add({
                chatId: jsonContent.chatId,
                email: jsonContent.email,
                bodyMessage: jsonContent.bodyMessage,
                date:jsonContent.date,
                dateOrd: today,
                //userName: jsonContent.userName
            })
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});

app.get('/:teamId/:chatId', (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).collection('messages').orderBy("dateOrd", "asc");
            query.limit(50); 
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        chatId: doc.data().chatId,
                        email: doc.data().email,
                        //userName: doc.data().userName,
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

//get anterior messages. 50 anterior messages (getAntMessages)
app.get('/:teamId/:chatId/:date', (req, res) => {
    (async () => {
        try {
            var limDate = new Date(req.params.date); 
            let query = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).collection('messages').where('dateOrd', '<', limDate).orderBy("dateOrd", "asc");
            query.limit(50);
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        chatId: doc.data().chatId,
                        email: doc.data().email,
                        //userName: doc.data().userName,
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

//ReadAll => GET
/*app.get('/obs/:teamId/:chatId', (req, res) => {
    (async () => {
        try {
            const observable = new Observable(function subscribe(subscriber) {
                const query = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).collection('messages');
                const response: any = [];
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
                    return response;
                })
            })
            /*
            .map((response:Response) => {
             return {type: "success", payload: response.json()}; // <----
            })
            
           observable.subscribe(x => console.log(x));
            return res.status(200).send(observable);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});*/

//ReadAll => GET

/*
getWorkers():Observable<any> {    
  let fn = firebase.database().ref('/workers').on('child_added', (snapshot) => {
        return snapshot.val();
  });

  return Observable.bindCallback(fn) as Observable<any>
}
*/

//ReadAllObservable => GET
/*app.get('/:teamId/:chatId', (req, res) => {
    (async () => {
        try {
            const response: any = [];
            let query = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).collection('messages').orderBy("timestamp", "asc").get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        chatId: doc.data().chatId,
                        email: doc.data().email,
                        bodyMessage: doc.data().bodyMessage,
                        date: doc.data().date,
                        //userName: doc.data().userName,
                        //index: doc.data().index
                    };
                    response.push(selectedItem);
                }
                //return response;
                object(query).subscribe(change => {
                    const { event, snapshot, prevKey } = change;
                    console.log(event, ' will always be value');
                    console.log(prevKey, ' the previous key');
                    console.log(snapshot.val(), ' this is the data');
                    return res.status(200).send(snapshot.val());
                    });
                    return res.status(200).send(response);
          });
            //return object(query);
            /*
            object(ref).subscribe(change => {
            const { event, snapshot, prevKey } = change;
            console.log(event, ' will always be value');
            console.log(prevKey, ' the previous key');
            console.log(snapshot.val(), ' this is the data');
            });
            
            return res.status(200).send(object(query));
            
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});*/

/*
//OBERVABLE: El controlador de instantáneas recibirá una nueva instantánea 
de la consulta cada vez que cambie el resultado de la consulta 
(es decir, cuando se agregue, se quite o se modifique un documento).

let query = db.collection('cities').where('state', '==', 'CA');

let observer = query.onSnapshot(querySnapshot => {
  console.log(`Received query snapshot of size ${querySnapshot.size}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});
*/

/*function streamMessagesSnapshot(messagesVector: any = [], teamId: any, chatId: any) { //DEL OBSERVABLE , FUNCION SIN http    
    db.collection('teams').doc(teamId).collection('chats').doc(chatId).collection('messages').orderBy("date", "desc").onSnapshot(function(querySnapshot: any){
        const response: any = [];
        querySnapshot.forEach(function(doc: { data: () => { (): any; new(): any; chatId: any; email: any; bodyMessage: any; date: any; }; }) {
            const selectedData = {
                chatId: doc.data().chatId,
                email: doc.data().email,
                bodyMessage: doc.data().bodyMessage,
                date: doc.data().date
            }
            response.push(selectedData);
        });
        messagesVector.push(response);
    })
}*/

//observable => GET ALL MESSAGES
/*app.get('/:teamId/:chatId', (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).collection('messages').orderBy("date", "desc");
            const response: any = [];
            return new Promise(function(resolve, reject) {
                setTimeout(() => {
                    query.onSnapshot((querySnapshot: any[]) => {
                        querySnapshot.forEach(snap => {
                            const selectedData = {
                                chatId: snap.data().chatId,
                                email: snap.data().email,
                                bodyMessage: snap.data().bodyMessage,
                                date: snap.data().date
                            }
                            response.push(selectedData);
                        })
                        console.log(response);
                        resolve({msg: "It works", response});
                        return res.status(200).send(response);
                    })
                    if(true){ resolve({msg: "It works", response});}
                    else {reject({});}
                }, 10000);
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }
    })().then().catch();
});*/


/*
//Delete => Delete
app.delete('/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('messages').doc(req.params.id);

            await document.delete();
            
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});
*/
module.exports = app;