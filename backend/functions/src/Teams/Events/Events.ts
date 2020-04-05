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
                date: jsonContent.date,
                hour: jsonContent.hour,
                rival: jsonContent.rival
            })
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

//Read Events of a day => GET
app.get('/byday/:teamId/:date', (req, res) => {
    (async () => {
        try {
            //const jsonContent = JSON.parse(req.body);
            const query = db.collection('teams').doc(req.params.teamId).collection("events");
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedData  = {
                        date: doc.data().date,
                        type: doc.data().type,
                        hour: doc.data().hour,
                        rival: doc.data().rival
                    };
                    console.log(selectedData);
                    if (selectedData.date == req.params.date) {
                        response.push(selectedData); 
                    } 
                    //response.push(selectedData);
                }
                console.log(response);
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
app.get('/bymonth/:teamId/:month', (req, res) => {
    (async () => {
        try { 
            //const jsonContent = JSON.parse(req.body);
            const query = db.collection('teams').doc(req.params.teamId).collection('events');
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                console.log(req.params.month);

                for (const doc of docs) {
                    const selectedData  = {
                        date: doc.data().date,
                        type: doc.data().type
                    };
                    const newDate = selectedData.date.split('-');
                    if (Buffer.from(newDate[1]).equals(Buffer.from(req.params.month))) {
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