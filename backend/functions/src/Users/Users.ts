import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            await db.collection('users').doc('/' + jsonContent.email + '/')
            .create({
                email: jsonContent.email,
                userName: jsonContent.userName,
            });
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});


//Read => Get
app.get('/:userEmail', (req, res) => {
    (async () => {
        try {
            const document = db.collection("users").doc(req.params.userEmail);
            let userExists: boolean = true;
            const userData = await document.get().then((doc: any) => {
                if (!doc.exists) {
                    userExists = false;
                }
                else {
                    return doc.data();
                }
            });

            if (!userExists) {
                return res.status(400).send("The user with email: [" + req.params.userEmail + "] does not exist");
            }

            return res.status(200).send(userData);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

app.get('/:userEmail/teams', (req, res) => {
    (async () => {
        try {

            let userRef = db.collection('users').doc(req.params.userEmail);

            let userExists : boolean = true;
            await userRef.get().then((doc:any) => {
                if (!doc.exists) {
                    userExists = false;
                }
            })

            if (!userExists) {
                return res.status(400).send("The user with email: [" + req.params.userEmail + "] does not exist");
            }

            //User exists, get team ids
            const query = db.collection('memberships').where("userId", "==", req.params.userEmail );
            let teamIds: string[] = [];
            
            await query.get().then((querySnapshot: any) => {
                querySnapshot.forEach((element:any) => {
                    teamIds.push(element.data().teamId);
                });
            });
            
            //get team names
            let response: Set<string> = new Set();
            for (const id of teamIds) {
                const teamQuery = db.collection('teams').doc(id);
                await teamQuery.get().then((teamDoc:any) => {
                        response.add(teamDoc.data().teamName);
                   });
            }
            return res.status(200).send(Array.from(response));
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

//ReadAll => Get
app.get('/', (req, res) => {
    (async () => {
        try {
            const query = db.collection('users');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    
                    const selectedItem  = {
                        id: doc.data().id,
                        email: doc.data().email,
                        userName: doc.data().userName,
                        memberships: doc.data().memberships
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
app.put('/:userEmail', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            if (!jsonContent.hasOwnProperty("userName")) {
                return res.status(400).send("You must indicate the new user name");
            }

            const document = db.collection('users').doc(req.params.userEmail);

            await document.update({
                userName: jsonContent.userName
            }).then();
            

            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

//Delete => Delete
app.delete('/:userEmail', (req, res) => {
    (async () => {
        try {
            const document = db.collection('users').doc(req.params.userEmail);

            await document.delete();
            
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

module.exports = app;