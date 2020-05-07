"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            //Miramos que esten todos los camps
            let errores = [];
            let hayErrores = false;
            if (!jsonContent.hasOwnProperty("userId")) {
                hayErrores = true;
                errores.push("To create a membership you must indicate the userId");
            }
            if (!jsonContent.hasOwnProperty("teamId")) {
                hayErrores = true;
                errores.push("To create a membership you must indicate the teamId");
            }
            if (!jsonContent.hasOwnProperty("issue")) {
                hayErrores = true;
                errores.push("To create a fine you must indicate the issue");
            }
            if (!jsonContent.hasOwnProperty("money")) {
                hayErrores = true;
                errores.push("To create a fine you must indicate the money");
            }
            if (hayErrores) {
                return res.status(400).send(errores);
            }
            let equipoExiste = true;
            let usuarioExiste = true;
            let miembroExiste = true;
            const team = db.collection('teams').doc(jsonContent.teamId);
            await team.get().then((teamDoc) => {
                if (!teamDoc.exists)
                    equipoExiste = false;
            });
            const user = db.collection('users').doc(jsonContent.userId);
            await user.get().then((userDoc) => {
                if (!userDoc.exists)
                    usuarioExiste = false;
            });
            const membership = db.collection('memberships').where('userId', '==', jsonContent.userId).where('teamId', '==', jsonContent.teamId);
            const idMembership = await membership.get().then((doc) => {
                if (!doc.exists) {
                    miembroExiste = false;
                    return;
                }
                else
                    return doc.id;
            });
            errores = [];
            hayErrores = false;
            if (miembroExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] is not member of the team: [" + jsonContent.teamId + "]");
            }
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + jsonContent.teamId + "] does not exist");
            }
            if (!usuarioExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] does not exist");
            }
            if (jsonContent.money <= 0) {
                hayErrores = true;
                errores.push("The money of the fine cannot be less or equal than 0");
            }
            if (hayErrores) {
                return res.status(400).send(errores);
            }
            console.log(idMembership);
            await db.collection('memberships').doc(idMembership).collection("fines").add({
                issue: jsonContent.issue,
                money: jsonContent.money,
                isPaid: false
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
//# sourceMappingURL=Fines.js.map