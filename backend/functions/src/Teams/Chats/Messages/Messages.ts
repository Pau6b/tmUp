import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            let lengthCollMessages = 0;
            let index = lengthCollMessages;
            //FALTA CONTROL D'ERROR DE LA QUERY DE LA SIZE PQ NO LI ASSIGNEM 1 AL INDEX DEL NOU MESSAGE
            await db.collection('teams').doc(jsonContent.teamId).collection('chats').doc(jsonContent.chatId).collection('messages').get().then((snap: { size: any; }) => {
                lengthCollMessages = snap.size 
                index = lengthCollMessages + 1;
             });
            await db.collection('teams').doc(jsonContent.teamId).collection('chats').doc(jsonContent.chatId).collection('messages').add({
                chatId: jsonContent.chatId,
                email: jsonContent.email,
                bodyMessage: jsonContent.bodyMessage,
                date:jsonContent.date,
                index: index
            })
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});

//ReadAll => GET
app.get('/:teamId/:chatId', (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).collection('messages').orderBy("index", "desc");
            query.limit(50); 
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        chatId: doc.data().chatId,
                        email: doc.data().email,
                        bodyMessage: doc.data().bodyMessage,
                        date: doc.data().date,
                        index: doc.data().index
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
app.get('/:teamId/:chatId/:messageIndex', (req, res) => {
    (async () => {
        try {
            const messageIndexInt = parseInt(req.params.messageIndex);
            let query = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).collection('messages').where('index', '>', messageIndexInt).orderBy("index", "desc");
            //query.orderBy("date", "desc"); //we get in order by date
            //where('population', '>', 2500000)
            query.limit(50);//last 50 messages from the index passed 
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        chatId: doc.data().chatId,
                        email: doc.data().email,
                        bodyMessage: doc.data().bodyMessage,
                        date: doc.data().date,
                        index: doc.data().index
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