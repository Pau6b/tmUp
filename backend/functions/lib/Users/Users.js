"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
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
            req.session["userName"] = jsonContent.userName;
            console.log(req.session["userName"]);
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/me', (req, res) => {
    (async () => {
        try {
            if (req.session.user) {
                return res.status(400).send("UGM1");
            }
            let info = "";
            admin.auth().getUser(req.session.user).then((user) => {
                info = {
                    email: user.email,
                    displayName: user.displayName
                };
            });
            return res.status(200).send(info);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
});
//Read => Get
app.get('/:userEmail', (req, res) => {
    (async () => {
        try {
            const document = db.collection("users").doc(req.params.userEmail);
            let userExists = true;
            const userData = await document.get().then((doc) => {
                if (!doc.exists) {
                    userExists = false;
                    return;
                }
                else {
                    return doc.data();
                }
            });
            if (!userExists) {
                return res.status(400).send("UG1");
            }
            return res.status(200).send(userData);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/:userEmail/teams', (req, res) => {
    (async () => {
        try {
            const userRef = db.collection('users').doc(req.params.userEmail);
            let userExists = true;
            await userRef.get().then((doc) => {
                if (!doc.exists) {
                    userExists = false;
                }
            });
            if (!userExists) {
                return res.status(400).send("The user with email: [" + req.params.userEmail + "] does not exist");
            }
            //User exists, get team ids
            const query = db.collection('memberships').where("userId", "==", req.params.userEmail);
            let teamIds = [];
            await query.get().then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    teamIds.push(element.data().teamId);
                });
            });
            //get team names
            const response = new Set();
            for (const id of teamIds) {
                const teamQuery = db.collection('teams').doc(id);
                await teamQuery.get().then((teamDoc) => {
                    response.add({
                        teamName: teamDoc.data().teamName,
                        sport: teamDoc.data().sport
                    });
                });
            }
            return res.status(200).send(Array.from(response));
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/me/teams', (req, res) => {
    (async () => {
        try {
            if (req.session.user) {
                return res.status(400).send("TMG1");
            }
            let email = "";
            admin.auth().getUser(req.session.user).then((user) => {
                email = user.email;
            });
            //User exists, get team ids
            const query = db.collection('memberships').where("userId", "==", email);
            const teamIds = [];
            await query.get().then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    teamIds.push(element.data().teamId);
                });
            });
            //get team names
            const response = new Set();
            for (const id of teamIds) {
                const teamQuery = db.collection('teams').doc(id);
                await teamQuery.get().then((teamDoc) => {
                    response.add({
                        teamName: teamDoc.data().teamName,
                        teamId: id
                    });
                });
            }
            return res.status(200).send(Array.from(response));
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
            const query = db.collection('users');
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    const selectedItem = {
                        id: doc.data().id,
                        email: doc.data().email,
                        userName: doc.data().userName,
                        memberships: doc.data().memberships
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
// Falta determinar que hay que cambiar
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
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
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
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
module.exports = app;
//# sourceMappingURL=Users.js.map