"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Core_1 = require("../Core/Core");
const Statistics_1 = require("../Core/Templates/Statistics");
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();
//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            //Check if the params are correct
            if (req.session.user === null) {
                res.status(400).send("T1");
            }
            let email = "";
            await admin.auth().getUser(req.session.user).then((user) => {
                email = user.email;
            });
            let errors = [];
            let hasErrors = false;
            if (!jsonContent.hasOwnProperty("teamName")) {
                errors.push("TC2");
                hasErrors = true;
            }
            if (!jsonContent.hasOwnProperty("sport")) {
                errors.push("TC3");
                hasErrors = true;
            }
            if (!Core_1.sports.includes(jsonContent.sport)) {
                errors.push("TC4");
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
                stats: Statistics_1.GetTeamStatsBySport(jsonContent.sport)
            }).then((ref) => {
                id = ref.id;
            });
            await db.collection('memberships').add({
                teamId: id,
                userId: email,
                type: "staff"
            });
            return res.status(200).send(id);
        }
        catch (error) {
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
            let teamExists = true;
            const teamData = await document.get().then((doc) => {
                if (!doc.exists) {
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
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/:teamId/stadistics', (req, res) => {
    (async () => {
        try {
            const document = db.collection("teams").doc(req.params.teamId);
            let teamExists = true;
            const teamData = await document.get().then((doc) => {
                if (!doc.exists) {
                    teamExists = false;
                    return;
                }
                else {
                    return doc.data().stats;
                }
            });
            //Check that the user exists
            if (!teamExists) {
                return res.status(400).send("TG1");
            }
            //return correct data
            return res.status(200).send(teamData);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/:teamId/ranking', (req, res) => {
    (async () => {
        try {
            const document = db.collection("teams").doc(req.params.teamId);
            let teamExists = true;
            await document.get().then((doc) => {
                if (!doc.exists) {
                    teamExists = false;
                }
                return;
            });
            //Check that the user exists
            if (!teamExists) {
                return res.status(400).send("TG1");
            }
            let teamSport = "";
            const team = await db.collection('teams').doc(req.params.teamId);
            await team.get().then((teamDoc) => {
                teamSport = teamDoc.data().sport;
            });
            let Statistics = {};
            Statistics = Statistics_1.GetMembershipStatsBySport(teamSport);
            let maxscore = Statistics;
            for (const key in maxscore) {
                if (maxscore.hasOwnProperty(key)) {
                    maxscore[key] = {
                        id: 0,
                        points: 0
                    };
                }
            }
            console.log(maxscore);
            //comprovarEstadisticas(Statistics,jsonContent);
            /*let email: string = "";
            await admin.auth().getUser(req.session!.user).then((user: UserRecord) => {
                    user.email = user.email;
            })
            //email = "ivan@email.com"*/
            const query = await db.collection('memberships').where('teamId', '==', req.params.teamId);
            let docExists = false;
            //let stadisticsPlayer;
            await query.get().then(async (querySnapshot) => {
                for (const doc of querySnapshot.docs) {
                    docExists = true;
                    if (doc.data().type === "player") {
                        Statistics = doc.data().stats;
                        console.log(Statistics);
                        for (const key in Statistics) {
                            if (Statistics.hasOwnProperty(key)) {
                                for (const i in maxscore) {
                                    if (maxscore.hasOwnProperty(i)) {
                                        console.log(maxscore[i]);
                                        if ((key === i) && (Statistics[key] > maxscore[i].points)) {
                                            maxscore[i].id = doc.data().userId;
                                            maxscore[i].points = Statistics[key];
                                            console.log("maxscore:");
                                            console.log(maxscore);
                                        } //maxscore[i] += Statistics[key];
                                    }
                                }
                            }
                        }
                    }
                    /*if (doc.data().type !== "player") {
                        isPlayer = false;
                    }*/
                }
            });
            if (!docExists) {
                return res.status(400).send("UMS3");
            }
            //const query = await db.collection('memberships').where('teamId','==',req.params.teamId);
            //const response: any = [];
            //const categoria = req.query.categoria;
            //console.log(categoria);
            //let i = 0;
            /*
                        await query.get().then((querySnapshot: any) => {
                            const docs = querySnapshot.docs;
            
            
                            for (const doc of docs) {
                                //const selectedItem = doc.data();
                                //iterar por todas las estadisticas para rellenar el maxscore.
                                const stats = doc.data().stats;
                                console.log(Object.keys(stats).length);
                                console.log(maxscore.length);
                                let i = 0;
                                for (const key in stats) {
                                    if (stats.hasOwnProperty(key)) {
                                        const element = stats[key];
                                        console.log(key)
                                        console.log(element);
                                        if((doc.data().type === "player") && (stats[key] > maxscore[i].points)) {
                                            //console.log(doc.data().stats.categoria);
                                            maxscore[i].points = stats[key];
                                            maxscore[i].id = doc.data().userId;
                                            console.log(maxscore);
                                        }
                                    }
                                    i++;
                                }
                                /*for (let i = 0; i < Object.keys(stats).length; i++) {
                                    const element = maxscore[i];
                                    console.log(element);
                                    console.log(doc.data().stats[i]);
                                    if((doc.data().type === "player") && (doc.data().stats[i] > maxscore[i].points)) {
                                        //console.log(doc.data().stats.categoria);
                                        maxscore[i].points = doc.data().stats[i];
                                        maxscore[i].id = doc.data().userId;
                                    }
                                    
                                }
            
            
                            }
                            return maxscore;
                        });
            */
            //if(maxscore.points === 0) res.status(400).send("No team stats available for the category: "+ categoria);
            return res.status(200).send(maxscore);
            //return correct data
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//ReadAll => Get
app.get('/', (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams');
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    const selectedItem = {
                        teamName: doc.data().teamName,
                        sport: doc.data().sport,
                        stats: doc.data().stats
                    };
                    response.push(selectedItem);
                }
                return response;
            });
            return res.status(200).send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
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
            await db.collection('teams').doc(req.params.teamId).update({
                teamName: jsonContent.teamName
            });
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//Delete => Delete
app.delete('/:teamId', (req, res) => {
    (async () => {
        try {
            let teamExists = true;
            await db.collection('teams').doc(req.params.teamId).get().then((doc) => {
                if (!doc.exists) {
                    teamExists = false;
                }
            });
            if (!teamExists) {
                return res.status(400).send("teamId is incorrect");
            }
            await db.collection('teams').doc(req.params.teamId).delete();
            //const query = db.collectionGroup('memberships').where('teamId',"==",req.params.teamId);
            //const response: any = [];
            await db.collectionGroup('memberships').where('teamId', "==", req.params.teamId).get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    db.collection('memberships').doc(doc.id).delete();
                }
                //return response;
            }).catch((error) => {
                console.log(error);
                return error;
            });
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
module.exports = app;
//# sourceMappingURL=Teams.js.map