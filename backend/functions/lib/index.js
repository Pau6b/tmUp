"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*imports*/
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
/*end-of-imports*/
/*configuration*/
const admin = require("firebase-admin");
const serviceAccount = require("../permissions.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tmup-908e4.firebaseio.com"
});
const db = admin.firestore();
app.use(cors({ origin: true }));
/*end-of-configuration */
//Per correr el development server => npm run serve dins de la carpeta de functions
//Routes
app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello world');
});
//Create => Post
app.post('/users/create', (req, res) => {
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
app.get('/users/:id', (req, res) => {
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
/*
app.get('/users', (req, res) => {
    (async () => {
        try {
            let query = db.collection('users');
            let response: any = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;

                for (let doc of docs) {
                    const selectedItem  = {
                        id: doc.data().id,
                        email: doc.data().email,
                        userName: doc.data().userName,
                        password: doc.data().password
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

    })();
});
*/
//Update => Put
app.put('/users/:id', (req, res) => {
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
app.delete('/users/:id', (req, res) => {
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
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map