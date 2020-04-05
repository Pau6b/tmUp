import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            await db.collection('teams').doc(jsonContent.teamId).collection("events").add({
                type: jsonContent.type,
                date: jsonContent.date
            });
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

//Read Events of a day => GET
app.get('/:teamId:date', (req, res) => {
    (async () => {
        try { 
            //const jsonContent = JSON.parse(req.body);
            const query = db.collection('teams').doc(req.params.teamId).collection('events');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    //let day = doc.data().date;
                    const selectedData  = {
                        date: doc.data().date,
                    };
                    if (selectedData.date.equals(req.params.date)) {
                        response.push(selectedData); 
                    } 
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
});

//Read Events of a month => GET
app.get('/:teamId:month', (req, res) => {
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
                    const newDate = selectedData.date.split('/');
                    const month = newDate[1];
                    if (month.equals(req.params.month)) {
                        response.push(selectedData); 
                    } 
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
});
module.exports = app;