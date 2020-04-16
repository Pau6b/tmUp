import * as express from 'express';
//import { UserRecord } from 'firebase-functions/lib/providers/auth';
//const admin = require("firebase-admin");
const app = express();

//Create => Post
app.post('/', (req, res) => {
    (async () => {
        try {
            if (req.session!.user) {
                return res.status(400).send("LI2");
            }
            //const jsonContent = JSON.parse(req.body);
            let uid:any = "5kLQfatPq9gLoJ89SHZwsqOC3lx1";
            /*admin.auth().verifyIdToken(jsonContent.token).then((decodedToken: any) => {
                uid = decodedToken.uid;
            })*/
            if (uid == "") {
                return res.status(400).send("LI1");
            }
            req.session!.user = uid;
            return res.status(200).send(req.session!.user);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

module.exports = app;
