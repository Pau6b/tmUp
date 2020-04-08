import * as express from 'express';
import { sports } from '../Core/Core'
import { GetTeamStatsBySport } from '../Core/Templates/Statistics'
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();


//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            //Check if the params are correct
            let errors: string[] = [];
            let hasErrors: boolean = false;
            if (!jsonContent.hasOwnProperty("teamName")) {
                errors.push("To create a team you must indicate the team name");
                hasErrors = true;
            }
            if (!jsonContent.hasOwnProperty("sport")) {
                errors.push("To create a team you must indicate the sport");
                hasErrors = true;                
            }
            if (!sports.includes(jsonContent.sport)) {
                errors.push("Sport must be one of the following: " + sports.toString());
                hasErrors = true;  
            }
            if (hasErrors) {
                return res.status(400).send(errors);
            }

            //No errors, we proceed to creation
            let id = "invalid";
            await db.collection('teams').add({
                teamName: jsonContent.teamName,
                sport: jsonContent.sport,
                stats: GetTeamStatsBySport(jsonContent.sport)
            }).then((ref:any) => {
                id= ref.id;
            });

            await db.collection('memberships').add({
                teamId: id,
                userId: jsonContent.userId,
                type: "staff"
            })
            return res.status(200).send(id);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});


//Read => Get
app.get('/:teamId', (req, res) => {
    (async () => {
        try {
            const document = db.collection("teams").doc(req.params.teamId);

            let teamExists:boolean = true;
            let teamData = await document.get().then((doc: any) => {
                if(!doc.exists) {
                    teamExists = false;
                }
                else {
                    return doc.data();
                }
            });

            //Check that the user exists
            if (!teamExists) {
                return res.status(400).send("Team with teamid : [" + req.params.teamId + "] does not exist");
            }

            //return correct data
            return res.status(200).send(teamData);
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
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        id: doc.data().id,
                        teamName: doc.data().teamName,
                        sport: doc.data().sport
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
app.put('/:teamId', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            

            if (!jsonContent.hasOwnProperty("teamName")) {
                return res.status(400).send("No teamName specified.");
            }

            let teamExists : boolean = true;
            await db.collection('teams').doc(req.params.teamId).get().then((doc:any) => {
                if(!doc.exists){
                    teamExists = false;
                }
            });

            if (!teamExists) {
                return res.status(400).send("Team with teamid : [" + req.params.teamId + "] does not exist");
            }

            await db.collection('teams').doc(req.params.teamId).update({
                teamName: jsonContent.teamName
            });
            
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

//Delete => Delete
/*
app.delete('/:teamName', (req, res) => {
    (async () => {
        try {
            let teamExists: boolean = true;
            const team = db.collection('teams').doc(req.params.teamName).get().then((doc: any) => {
                if(!doc.exists) {
                    teamExists = false;
                }
            });
            if (!teamExists) {
                return res.status(400).send("teamId is incorrect");
            }
            await team.delete();

            const query = db.collectionGroup('memberships').where('teamId',"==",req.params.teamName);
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
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
*/
module.exports = app;