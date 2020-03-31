import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            await db.collection('users').doc('/' + jsonContent.email + '/')
            .create({
                email: jsonContent.email,
                userName: jsonContent.userName,
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
app.get('/:userName', (req, res) => {
    (async () => {
        try {
            const document = db.collection("users").doc(req.params.userName);
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

app.get('/:userName/teams', (req, res) => {
    (async () => {
        try {
            const query = db.collection('users/'+req.params.userName+'/memberships');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    
                    const selectedItem  = {
                        teamName: doc.data().teamName,
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

//ReadAll => Get
app.get('/', (req, res) => {
    (async () => {
        try {
            const query = db.collection('users');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    
                    const selectedItem  = {
                        id: doc.data().id,
                        email: doc.data().email,
                        userName: doc.data().userName,
                        memberships: doc.data().memberships
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
app.put('/:userName', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            const document = db.collection('users').doc(req.params.userName);

            await document.update({
                email: jsonContent.email,
                userName: jsonContent.userName,
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
app.delete('/:userName', (req, res) => {
    (async () => {
        try {
            const document = db.collection('users').doc(req.params.userName);

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