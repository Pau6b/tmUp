import * as express from 'express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
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
                userName: jsonContent.userName
            });
            req.session!["userName"] = jsonContent.userName;
            console.log(req.session!["userName"]);
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

app.get('/me', (req, res) => {
    console.log(req.path);
    (async() => {
        try{
            if(!req.session!.user) {
                return res.status(400).send("UGM1");
            }
            let userData : any = "";
            await admin.auth().getUser(req.session!.user).then((user: UserRecord) => {
                userData = {
                    email: user.email,
                    userName: user.displayName
                }
            });

            return res.status(200).send(userData);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    })().then().catch()
});


//Read => Get
app.get('/:userEmail', (req, res) => {
    (async () => {
        try {
            let userExists: boolean = true;

            let userData : any = "";
            await admin.auth().getUserByEmail(req.params.userEmail).then((user: UserRecord) => {
                userData = {
                    email: user.email,
                    userName: user.displayName
                }
            }).catch(() => {
                userExists = false;
            });

            if (!userExists) {
                return res.status(400).send("UG1");
            }

            return res.status(200).send(userData);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

app.get('/me/teams', (req, res) => {
    (async () => {
        try {
            if(!req.session!.user) {
                return res.status(400).send("TMG1");
            }
            let email: any ="";  
            await admin.auth().getUser(req.session!.user).then((user: UserRecord) => {
                    email = user.email
            });            

            //User exists, get team ids
            const query = db.collection('memberships').where("userId", "==", email );
            const teamIds: string[] = [];
            
            await query.get().then((querySnapshot: any) => {
                querySnapshot.forEach((element:DocumentSnapshot) => {
                    teamIds.push(element.data()!.teamId);
                });
            });
            
            //get team names
            const response: Set<any> = new Set();
            for (const id of teamIds) {
                const teamQuery = db.collection('teams').doc(id);
                await teamQuery.get().then((teamDoc:DocumentSnapshot) => {
                        response.add({
                            teamName: teamDoc.data()!.teamName,
                            id: teamDoc.id,
                            sport: teamDoc.data()!.sport
                        });
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

app.get('/:userEmail/teams', (req, res) => {
    (async () => {
        try {

            const userRef = db.collection('users/').doc(req.params.userEmail);

            let userExists : boolean = true;
            await userRef.get().then((doc: DocumentSnapshot) => {
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
            const response: Set<any> = new Set();
            for (const id of teamIds) {
                const teamQuery = db.collection('teams/').doc(id);
                await teamQuery.get().then((teamDoc: DocumentSnapshot) => {
                        response.add({
                            teamName: teamDoc.data()!.teamName,
                            teamId: id,
                            sport: teamDoc.data()!.sport
                        });
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


// Falta determinar que hay que cambiar
//Update => Put
app.put('/:userEmail', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            if (!jsonContent.hasOwnProperty("userName")) {
                return res.status(400).send("UU1");
            }

            const document = db.collection('users').doc(req.params.userEmail);

            let userExists : boolean = false;

            await document.get().then((doc : DocumentSnapshot) => {
                userExists = doc.exists;
            });

            if (!userExists) {
                return res.status(400).send("UU2");
            }

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
            let userExists: boolean = true;
            const user = db.collection('users').doc(req.params.userEmail).get().then((doc: any) => {
                if(!doc.exists) {
                    userExists = false;
                }
            });
            if (!userExists) {
                return res.status(400).send("userEmail is incorrect");
            }
            //const document = db.collection('users').doc(req.params.userEmail);
            await user.delete();
            //eliminar totes les memberships del usuari
            const query = db.collectionGroup('memberships').where('userId',"==",req.params.userEmail);
            const response: any = [];
            if(query != undefined) await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                     doc.delete();
                }
                return response;
            })
            
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

module.exports = app;