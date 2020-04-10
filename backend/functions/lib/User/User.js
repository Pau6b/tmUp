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
            await db.collection('users').doc('/' + jsonContent.id + '/')
                .create({
                email: jsonContent.email,
                userName: jsonContent.userName,
                password: jsonContent.password
            });
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//Read => Get
app.get('/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection("users").doc(req.params.id);
            const user = await document.get();
            const response = user.data();
            return res.status(200).send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//Read => Get
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
                        password: doc.data().password
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
app.put('/:id', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const document = db.collection('users').doc(req.params.id);
            await document.update({
                email: jsonContent.email,
                userName: jsonContent.userName,
                password: jsonContent.password
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
app.delete('/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('users').doc(req.params.id);
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
//# sourceMappingURL=User.js.map