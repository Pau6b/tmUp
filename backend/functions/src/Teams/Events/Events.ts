
import * as express from 'express';
/*const admin = require("firebase-admin");
const db = admin.firestore();*/
const app = express();
/*
app.get('/monthevents', (req, res) => {
    (async () => {
        try {
            //const jsonContent = JSON.parse(req.body);
            const query = db.collection('teams').doc(req.params.teamId).collection('events');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedData  = {
                        date: doc.data().date,
                    };
                    //if (selectedData == jsonContent.date) {
                        response.push(selectedData);
                    //}
                    
                }
                return response;
            })

            return res.status(200).send(response);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});*/


module.exports = app;