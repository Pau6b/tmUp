import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();


//Create => POST 
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            let errors: string[] = [];
            let hasErrors: boolean = false;
            if (!jsonContent.hasOwnProperty("chatName")) {
                errors.push("To create a chat you must indicate the chatName");
                hasErrors = true;
            }
            if (!jsonContent.hasOwnProperty("teamId")) {
                errors.push("To create a chat you must indicate the teamId of the chat");
                hasErrors = true;         
                return res.status(400).send(errors);    
            }
            let documentRef = db.collection('teams').doc(jsonContent.teamId);
            documentRef.get().then((doc: { exists: any; }) => {
                if (!doc.exists) {
                    return res.status(400).send("To create a chat you must indicate an existing teamId");
                    /*errors.push("To create a chat you must indicate an existing teamId");
                    hasErrors = true;
                    return hasErrors;*/
                }
                else {
                    //return res.status(400).send("ARRIBO QUE SI EXISTEIX teamId");  
                    return hasErrors;
                }
            });
            if (hasErrors) {
                return res.status(400).send(errors);
            }
            let id = "invalid";
            await db.collection('teams').doc(jsonContent.teamId).collection("chats").add({
                teamId: jsonContent.teamId,
                chatName: jsonContent.chatName,
            }).then((ref:any) => {
                id= ref.id;
            });
            return res.status(200).send(id);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

//Read => Get amb detecció d'errors
app.get('/:teamId', (req, res) => {
    (async () => {
        try {
            //mirem si teamId existeix
            let hasErrors: boolean = false;
            let documentRef = db.collection('teams').doc(req.params.teamId);
            //return res.status(400).send("ARRIBO ABANS DE COMPROVAR teamId");
            documentRef.get().then((doc: { exists: any; }) => {
                if (!doc.exists) {
                    return res.status(400).send("teamId does not exist");
                }
                else {
                    return hasErrors;
                }
            });
            //pasem a fer el get si teamId existeix
            const query = db.collection('teams').doc(req.params.teamId).collection('chats');
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                    for (const doc of docs) {
                        const selectedItem  = {
                            teamId: doc.data().teamId,
                            chatName: doc.data().chatName
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

//Update => Put 
app.put('/update/:teamId/:chatId', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            //mirem si teamId existeix
            let hasErrors: boolean = false;
            let documentRef = db.collection('teams').doc(req.params.teamId);
            documentRef.get().then((doc: { exists: any; }) => {
                if (!doc.exists) {
                    return res.status(400).send("teamId does not exist");
                }
                else {
                    return hasErrors;
                }
            });
            //mirem si chatId existeix
            let documentRef2 = db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId);
            documentRef2.get().then((doc: { exists: any; }) => {
                if (!doc.exists) {
                    return res.status(400).send("chatId does not exist");
                }
                else {
                    return hasErrors;
                }
            });
            if (!jsonContent.hasOwnProperty("chatName")) {
                return res.status(400).send("No chatName specified");
            }

            await db.collection('teams').doc(req.params.teamId).collection('chats').doc(req.params.chatId).update({
                chatName: jsonContent.chatName
            });
            
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

////Read => Get
/*app.get('/:teamId', (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams').doc(req.params.teamId).collection('chats');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        teamId: doc.data().teamId,
                        chatName: doc.data().chatName
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
});*/

//Delete => Delete
/*app.delete('/:teamName', (req, res) => {
    (async () => {
        try {
            const document = db.collection('teams').doc(req.params.teamName);

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