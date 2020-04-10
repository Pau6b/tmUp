"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const admin = require("firebase-admin");
const app = express();
//Create => Post
app.post('/', (req, res) => {
    (async () => {
        try {
            if (req.session.user) {
                return res.status(400).send("LI2");
            }
            const jsonContent = JSON.parse(req.body);
            let uid = "";
            admin.auth().verifyIdToken(jsonContent.token).then((decodedToken) => {
                uid = decodedToken.uid;
            });
            if (uid == "") {
                return res.status(400).send("LI1");
            }
            admin.auth().getUser(uid).then((user) => {
                req.session.user = uid;
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
//# sourceMappingURL=Login.js.map