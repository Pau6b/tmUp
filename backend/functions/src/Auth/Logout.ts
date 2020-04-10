import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/', (req, res) => {
    (async () => {
        try {
            if (req.session!.user == null) {
                return res.status(400).send("LO1");
            }
            req.session!.user = null;
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});
