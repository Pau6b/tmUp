import * as express from 'express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            let uid:any = "";
            let error : any = "";
            admin.auth().verifyIdToken(jsonContent.token).then((decodedToken: any) => {
                uid = decodedToken.uid;
            }).catch((tokenError : any) => {
                error = tokenError
            });
            if (uid == "") {
                return res.status(400).send(error);
            }
            admin.auth().getUser(uid).then((user: UserRecord) => {
                req.session!.userUid = uid;
                req.session!.userEmail = user.email;
            });
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});
