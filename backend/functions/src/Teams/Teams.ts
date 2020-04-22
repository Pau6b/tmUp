import * as express from 'express';
<<<<<<< HEAD
=======
import { sports } from '../Core/Core'
import { GetTeamStatsBySport } from '../Core/Templates/Statistics'
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
>>>>>>> e2ec6fd04bbeb1f4af1a1963aeee7e26dbcbb628
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
<<<<<<< HEAD
            let id: any;
=======
            //Check if the params are correct

            if (req.session!.user === null) {
                res.status(400).send("T1");
            }

            let email: any ="";  
            await admin.auth().getUser(req.session!.user).then((user: UserRecord) => {
                    email = user.email
            });    

            let errors: string[] = [];
            let hasErrors: boolean = false;
            if (!jsonContent.hasOwnProperty("teamName")) {
                errors.push("TC2");
                hasErrors = true;
            }
            if (!jsonContent.hasOwnProperty("sport")) {
                errors.push("TC3");
                hasErrors = true;                
            }
            if (!sports.includes(jsonContent.sport)) {
                errors.push("TC4");
                hasErrors = true;  
            }
            if (hasErrors) {
                return res.status(400).send(errors);
            }

            //No errors, we proceed to creation
            let id = "invalid";
>>>>>>> e2ec6fd04bbeb1f4af1a1963aeee7e26dbcbb628
            await db.collection('teams').add({
                teamName: jsonContent.teamName,
                sport: jsonContent.sport
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


//Read => Get
app.get('/:teamName', (req, res) => {
    (async () => {
        try {
<<<<<<< HEAD
            const document = db.collection("teams").doc(req.params.teamName);
            const user = await document.get();
            const response = user.data();

            return res.status(200).send(response);
=======
            const document = db.collection("teams").doc(req.params.teamId);

            let teamExists:boolean = true;
            const teamData = await document.get().then((doc: DocumentSnapshot) => {
                if(!doc.exists) {
                    teamExists = false;
                    return;
                }
                else {
                    return doc.data();
                }
            });

            //Check that the user exists
            if (!teamExists) {
                return res.status(400).send("TG1");
            }

            //return correct data
            return res.status(200).send(teamData);
>>>>>>> e2ec6fd04bbeb1f4af1a1963aeee7e26dbcbb628
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
            const query = db.collection('teams');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs : DocumentSnapshot[] = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
<<<<<<< HEAD
                        id: doc.data().id,
                        teamName: doc.data().teamName,
                        sport: doc.data().sport
=======
                        teamName: doc.data()!.teamName,
                        sport: doc.data()!.sport
>>>>>>> e2ec6fd04bbeb1f4af1a1963aeee7e26dbcbb628
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
app.put('/:teamName', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            const document = db.collection('teams').doc(req.params.teamName);

            await document.update({
                teamName: jsonContent.teamName,
                sport: jsonContent.sport
            });
            

            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

app.post('/select/:teamId', (req,res) => {
    (async() => {
        try {
            const team = db.collection('teams').doc(req.params.teamId);
            let teamExists: boolean = false;
            await team.get().then( (teamDoc: DocumentSnapshot) => {
                if(teamDoc.exists) {
                    teamExists = true;
                }
            } );
            if (!teamExists) {
                return res.status(400).send("TS1");
            }
            req.session!.selectedTeam = req.params.teamId;
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error) 
        }
    })().then().catch();
});

app.get('/selected', (req,res) => {
    (async() => {
        try{
            if (!req.session!.selectedTeam) {
                return res.status(400).send("TS1");
            }
            const team = db.collection('teams').doc(req.session!.selectedTeam);
            const teamData = await team.get().then( (teamDoc: DocumentSnapshot) => {
                return teamDoc.data();
            } );
            return res.status(200).send(teamData);
        }
        catch(error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});

//Delete => Delete
app.delete('/:teamName', (req, res) => {
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

module.exports = app;