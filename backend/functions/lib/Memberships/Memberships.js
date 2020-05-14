"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Statistics_1 = require("../Core/Templates/Statistics");
const States_1 = require("../Core/States");
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();
//----------------------CREATE-----------------------------------
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            //Miramos que esten todos los camps
            let errores = [];
            let hayErrores = false;
            if (!jsonContent.hasOwnProperty("teamId")) {
                hayErrores = true;
                errores.push("To create a membership you must indicate the teamId");
            }
            if (!jsonContent.hasOwnProperty("userId")) {
                hayErrores = true;
                errores.push("To create a membership you must indicate the userId");
            }
            if (!jsonContent.hasOwnProperty("type")) {
                hayErrores = true;
                errores.push("To create a membership you must indicate the type of membership");
            }
            if (hayErrores) {
                return res.status(400).send(errores);
            }
            //Miramos que el usuario y el equipo sean correctos y no tengan una membership ya☺
            let equipoExiste = true;
            let usuarioExiste = true;
            let miembroExiste = true;
            let teamSport = "";
            const team = db.collection('teams').doc(jsonContent.teamId);
            await team.get().then((teamDoc) => {
                if (!teamDoc.exists)
                    equipoExiste = false;
                else {
                    teamSport = teamDoc.data().sport;
                }
            });
            const user = db.collection('users').doc(jsonContent.userId);
            await user.get().then((userDoc) => {
                if (!userDoc.exists)
                    usuarioExiste = false;
            });
            const membership = db.collection('memberships').where('userId', '==', jsonContent.userId).where('teamId', '==', jsonContent.teamId);
            await membership.get().then((snapshot) => {
                if (snapshot.empty)
                    miembroExiste = false;
            });
            errores = [];
            hayErrores = false;
            if (miembroExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] already has a membership in the team: [" + jsonContent.teamId + "]");
            }
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + jsonContent.teamId + "] does not exist");
            }
            if (!usuarioExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] does not exist");
            }
            if (hayErrores) {
                return res.status(400).send(errores);
            }
            let membershipData = {
                teamId: jsonContent.teamId,
                type: jsonContent.type,
                userId: jsonContent.userId
            };
            if (jsonContent.type === "player") {
                membershipData.stats = Statistics_1.GetMembershipStatsBySport(teamSport);
                membershipData.state = States_1.GetDefaultPlayerState();
            }
            else if (jsonContent.type === "physio") {
                if (!jsonContent.hasOwnProperty("urlPhysio")) {
                    membershipData.urlPhysio = "";
                }
                else {
                    membershipData.urlPhysio = jsonContent.urlPhysio;
                }
            }
            //Todo correcto, creamos la membership
            await db.collection('memberships').add(membershipData);
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.put('/updatePhysioUrl', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            let errores = [];
            let hayErrores = false;
            let equipoExiste = true;
            let usuarioExiste = true;
            let miembroExiste = true;
            const team = db.collection('teams').doc(req.query.teamId);
            await team.get().then((teamDoc) => {
                if (!teamDoc.exists)
                    equipoExiste = false;
            });
            const user = db.collection('users').doc(req.query.userId);
            await user.get().then((userDoc) => {
                if (!userDoc.exists)
                    usuarioExiste = false;
            });
            const membership = db.collection('memberships').where('userId', '==', req.query.userId).where('teamId', '==', req.query.teamId);
            await membership.get().then((snapshot) => {
                if (snapshot.empty)
                    miembroExiste = false;
            });
            if (miembroExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + req.query.userId + "] already has a membership in the team: [" + req.query.teamId + "]");
            }
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + req.query.teamId + "] does not exist");
            }
            if (!usuarioExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + req.query.userId + "] does not exist");
            }
            if (hayErrores) {
                return res.status(400).send(errores);
            }
            await membership.update({
                urlPhysio: jsonContent.urlPhysio
            });
            return res.status(200).send(errores);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.put('/updatePlayerState/:teamId', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            if (jsonContent.state === null) {
                return res.status(400).send("UMS1");
            }
            if (!States_1.playerStates.includes(jsonContent.state)) {
                return res.status(400).send("UMS2");
            }
            const email = "";
            admin.auth().getUser(req.session.user).then((user) => {
                user.email = user.email;
            });
            const query = db.collection('memberships').where('teamId', '==', req.params.teamId).where('userId', "==", email);
            let docExists = false;
            let isPlayer = true;
            let docid = "";
            await query.get().then(async (querySnapshot) => {
                for (const doc of querySnapshot.docs) {
                    docid = doc.id;
                    docExists = true;
                    if (doc.data().type !== "player") {
                        isPlayer = false;
                    }
                }
            });
            if (!docExists) {
                return res.status(400).send("UMS3");
            }
            if (!isPlayer) {
                return res.status(400).send("UMS4");
            }
            await db.collection('memberships').doc(docid).update({
                state: jsonContent.state
            });
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    })().then().catch();
});
app.put('/updatePlayerStatistics/:teamId/:userId', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            //tratar errores
            let errores = [];
            let hayErrores = false;
            let equipoExiste = true;
            let teamSport = "";
            const team = db.collection('teams').doc(req.params.teamId);
            await team.get().then((teamDoc) => {
                if (!teamDoc.exists)
                    equipoExiste = false;
                else {
                    teamSport = teamDoc.data().sport;
                }
            });
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + req.params.teamId + "] does not exist");
            }
            if (hayErrores) {
                return res.status(400).send(errores);
            }
            let Statistics = {};
            Statistics = Statistics_1.GetMembershipStatsBySport(teamSport);
            //comprovarEstadisticas(Statistics,jsonContent);
            /*let email: string = "";
            await admin.auth().getUser(req.session!.user).then((user: UserRecord) => {
                    user.email = user.email;
            })
            //email = "ivan@email.com"*/
            const query = await db.collection('memberships').where('teamId', '==', req.params.teamId).where('userId', "==", req.params.userId);
            let docExists = false;
            let isPlayer = true;
            let docid = "";
            //let stadisticsPlayer;
            await query.get().then(async (querySnapshot) => {
                for (const doc of querySnapshot.docs) {
                    docid = doc.id;
                    docExists = true;
                    Statistics = doc.data().stats;
                    for (const key in jsonContent) {
                        if (jsonContent.hasOwnProperty(key)) {
                            for (const stat in Statistics) {
                                if (Statistics.hasOwnProperty(key)) {
                                    if (key === stat)
                                        Statistics[stat] += jsonContent[key];
                                }
                            }
                        }
                    }
                    if (doc.data().type !== "player") {
                        isPlayer = false;
                    }
                }
            });
            if (!docExists) {
                return res.status(400).send("UMS3");
            }
            if (!isPlayer) {
                return res.status(400).send("UMS4");
            }
            await db.collection('memberships').doc(docid).update({
                stats: Statistics,
            });
            return res.status(200).send(Statistics);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    })().then().catch();
});
//------------------------READ--------------------------------------
app.get('/getByTeam/:teamId', (req, res) => {
    (async () => {
        try {
            let equipoExiste = true;
            const team = db.collection('teams').doc(req.params.teamId);
            await team.get().then((teamDoc) => {
                if (!teamDoc.exists)
                    equipoExiste = false;
            });
            let errores = [];
            let hayErrores = false;
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with this teamId doesn't exists");
            }
            if (hayErrores) {
                return res.status(400).send(errores);
            }
            const query = db.collection('memberships').where('teamId', '==', req.params.teamId);
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    let selectedItem;
                    if (req.query.type === doc.data().type) {
                        if (req.query.type === "physio") {
                            selectedItem = {
                                userId: doc.data().userId,
                                urlPhysio: doc.data().urlPhysio
                            };
                        }
                        else {
                            selectedItem = {
                                userId: doc.data().userId,
                                urlPhysio: doc.data().urlPhysio
                            };
                        }
                        response.push(selectedItem);
                    }
                    else if (req.query.type === "all") {
                        selectedItem = {
                            userId: doc.data().userId,
                            rol: doc.data().rol
                        };
                        response.push(selectedItem);
                    }
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
app.get('/getStats/:teamId/:userId', (req, res) => {
    (async () => {
        try {
            const query = await db.collection('memberships').where('teamId', '==', req.params.teamId).where('userId', "==", req.params.userId);
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    const selectedItem = doc.data();
                    response.push(selectedItem);
                }
                return response;
            });
            return res.status(200).send(response[0].stats);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/getByUser/:userId', (req, res) => {
    (async () => {
        try {
            const query = db.collection('memberships').where('userId', '==', req.params.userId);
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    const selectedItem = doc.data();
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
/*
app.put('/:id', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            const document = db.collection('users').doc(req.params.id);

            await document.update({
                email: jsonContent.email,
            

            return res.status(200).send();db.collection('membership')
            return res.status(500).send(error)
        }

    })().then().catch();
});
*/
//Delete => Delete
app.delete('/delete', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const comprobarRoles = db.collection('memberships').where('teamId', '==', jsonContent.teamId);
            let staffEnEquipo = 0;
            let miembros = 0;
            let esStaff = false;
            let id;
            await comprobarRoles.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    ++miembros;
                    if (doc.data().type === 'staff')
                        ++staffEnEquipo;
                    if (doc.data().userId === jsonContent.userId) {
                        console.log("entro");
                        console.log(doc.id);
                        id = doc.id;
                        if (doc.data().type === "staff")
                            esStaff = true;
                    }
                }
            });
            if (miembros > 1 && staffEnEquipo === 1 && esStaff)
                return res.status(200).send("eres el ultimo entrenador que queda");
            else {
                console.log(id);
                await db.collection('memberships').doc(id).delete();
                if (miembros === 1)
                    console.log("tendremos que borrar el equipo");
                return res.status(200).send();
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
module.exports = app;
//# sourceMappingURL=Memberships.js.map