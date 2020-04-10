import * as express from 'express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
const admin = require("firebase-admin");
const app = express();

//Create => Post
app.post('/', (req, res) => {
    (async () => {
        try {
            if (req.session!.user) {
                return res.status(400).send("LI2");
            }
            const jsonContent = JSON.parse(req.body);
            let uid:any = "";
            admin.auth().verifyIdToken(jsonContent.token).then((decodedToken: any) => {
                uid = decodedToken.uid;
            })
            if (uid == "") {
                return res.status(400).send("LI1");
            }
            admin.auth().getUser(uid).then((user: UserRecord) => {
                req.session!.user = uid;
            });
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

module.exports = app;
