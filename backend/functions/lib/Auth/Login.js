"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//import { UserRecord } from 'firebase-functions/lib/providers/auth';
const admin = require("firebase-admin");
const app = express();
//Create => Post
app.post('/', (req, res) => {
    (async () => {
        try {
            if (req.session.token) {
                return res.status(400).send("LI2");
            }
<<<<<<< HEAD
            const jsonContent = JSON.parse(req.body);
            //const uid:any = "RVsGf4DOrTbkcvN2mQeoEPYgFoi1";
            let uid = "";
            await admin.auth().verifyIdToken(jsonContent.token).then((decodedToken) => {
                uid = decodedToken.uid;
            });
            if (uid === "") {
=======
            //const jsonContent = JSON.parse(req.body);
            const uid = "RVsGf4DOrTbkcvN2mQeoEPYgFoi1";
            //let uid:any = "";
            /*await admin.auth().verifyIdToken(jsonContent.token).then((decodedToken: any) => {
                uid = decodedToken.uid;
            })*/
            /*if (uid === "") {
>>>>>>> origin/SecondMaster
                return res.status(400).send("LI1");
            }*/
            req.session.user = uid;
            req.session.token = jsonContent.token;
            return res.status(200).send(req.session.user);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
module.exports = app;
//# sourceMappingURL=Login.js.map