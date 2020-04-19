"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Statistics_1 = require("../../Core/Templates/Statistics");
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();
//-----------------------------------CREATE----------------------------------------------------------------------------------------
//Crear evento partido
app.post('/match/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            let existsTeam = true;
            let teamSport = "";
            const query = db.collection('teams').doc(jsonContent.teamId);
            await query.get().then((querySnapshot) => {
                if (!querySnapshot.exists) {
                    existsTeam = false;
                }
                else {
                    teamSport = querySnapshot.data().sport;
                }
            });
            if (!existsTeam)
                return res.status(400).send("no existe el equipo");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").add({
                type: "match",
                date: jsonContent.date,
                hour: jsonContent.hour,
                rival: jsonContent.rival,
                stats: Statistics_1.GetMatchStatsBySport(teamSport)
            });
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//Crear evento entrenamiento
app.post('/training/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if (!existsTeam)
                return res.status(400).send("no existe el equipo");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").add({
                type: "training",
                date: jsonContent.date,
                hour: jsonContent.hour,
                finalhour: jsonContent.finalhour,
                description: jsonContent.description
            });
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//-----------------------------------------------------READ-------------------------------------------------------------------------------
//Read Events of a day => GET
app.get('/byday/:teamId/:date', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if (!existsTeam)
                return res.status(400).send("no existe el equipo");
            const query = db.collection('teams').doc(req.params.teamId).collection("events");
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                let selectedData;
                for (const doc of docs) {
                    if (doc.data().type === "match") {
                        selectedData = {
                            id: doc.id,
                            date: doc.data().date,
                            type: doc.data().type,
                            hour: doc.data().hour,
                            rival: doc.data().rival
                        };
                    }
                    else {
                        selectedData = {
                            id: doc.id,
                            date: doc.data().date,
                            type: doc.data().type,
                            hour: doc.data().hour,
                            finalhour: doc.data().finalhour,
                            description: doc.data().description
                        };
                    }
                    //if(selectedData.type == "match") selectedData.push({rival: doc.data().rival});
                    console.log(selectedData);
                    if (selectedData.date === req.params.date) {
                        response.push(selectedData);
                    }
                }
                console.log(response);
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
//Read Events of a month => GET
app.get('/bymonth/:teamId/:month', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if (!existsTeam)
                return res.status(400).send("no existe el equipo");
            const query = db.collection('teams').doc(req.params.teamId).collection('events');
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                console.log(req.params.month);
                for (const doc of docs) {
                    const selectedData = doc.data();
                    const newDate = selectedData.date.split('-');
                    if (Buffer.from(newDate[1]).equals(Buffer.from(req.params.month))) {
                        response.push(selectedData);
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
//----------------------------------------------DELETE------------------------------------------------------------------------
//Delete event
app.delete('/delete', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if (!existsTeam)
                return res.status(400).send("no existe el equipo");
            const existeevento = await comprobarEvento(jsonContent);
            if (!existeevento)
                return res.status(400).send("no existe el evento");
            await db.collection('teams').doc(jsonContent.teamId).collection('events').doc(jsonContent.eventId).delete();
            return res.status(200).send("evento eliminado");
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//----------------------------------------------UPDATE-----------------------------------------------------------------
//Update a training
app.put('/training/update', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if (!existsTeam)
                return res.status(400).send("no existe el equipo");
            const existeevento = await comprobarEvento(jsonContent);
            if (!existeevento)
                return res.status(400).send("no existe el evento");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").doc(jsonContent.eventId).set({
                type: "training",
                date: jsonContent.date,
                hour: jsonContent.hour,
                finalhour: jsonContent.finalhour,
                description: jsonContent.description
            });
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//Update a match
app.put('/match/update', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if (!existsTeam)
                return res.status(400).send("no existe el equipo");
            const existeevento = await comprobarEvento(jsonContent);
            if (!existeevento)
                return res.status(400).send("no existe el evento");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").doc(jsonContent.eventId).set({
                type: "match",
                date: jsonContent.date,
                hour: jsonContent.hour,
                rival: jsonContent.rival
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
async function comprobarEvento(jsonContent) {
    let existeevento = false;
    const query = db.collection('teams').doc(jsonContent.teamId).collection('events');
    await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
            if (doc.id === jsonContent.eventId)
                existeevento = true;
        }
    });
    return existeevento;
}
async function comprobarEquipo(jsonContent) {
    let existsTeam = true;
    const query = db.collection('teams').doc(jsonContent.teamId);
    await query.get().then((querySnapshot) => {
        if (!querySnapshot.exists) {
            existsTeam = false;
        }
    });
    return existsTeam;
}
//# sourceMappingURL=Events.js.map