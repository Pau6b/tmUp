import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            await db.collection('teams').doc('/' + jsonContent.teamName + '/')
            .create({
                teamName: jsonContent.teamName,
                category: jsonContent.category,
                sport: jsonContent.sport
            });
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});


//Read => Get
app.get('/:teamName', (req, res) => {
    (async () => {
        try {
            const document = db.collection("teams").doc(req.params.teamName);
            const user = await document.get();
            const response = user.data();

            return res.status(200).send(response);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

//ReadAll => Get
app.get('/', (req, res) => {
    (async () => {
        try {
            const query = db.collection('teams');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        id: doc.data().id,
                        teamName: doc.data().teamName,
                        category: doc.data().category,
                        sport: doc.data().sport
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

    })().then().catch();
});


//Update => Put
app.put('/:teamName', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            const document = db.collection('teams').doc(req.params.teamName);

            await document.update({
                teamName: jsonContent.teamName,
                category: jsonContent.category,
                sport: jsonContent.sport
            });
            

            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

//Delete => Delete
app.delete('/:teamName', (req, res) => {
    (async () => {
        try {
            const document = db.collection('teams').doc(req.params.teamName);

            await document.delete();
            
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

module.exports = app;