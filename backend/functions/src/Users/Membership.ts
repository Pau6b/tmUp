import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            const userCollection = await db.collection('users').doc(jsonContent.userName);
            const teamCollection = await db.collection('teams').doc(jsonContent.teamName);
            userCollection.collection('memberships').doc(jsonContent.teamName).create({
                teamName: jsonContent.teamName,
                role: jsonContent.role
            });
            teamCollection.collection('members').doc(jsonContent.userName).create({
                userName: jsonContent.userName,
                role: jsonContent.role
            });
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

/*
//Read => Get
app.get('/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection("users").doc(req.params.id);
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
            const query = db.collection('users');
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        id: doc.data().id,
                        email: doc.data().email,
                        userName: doc.data().userName
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
app.put('/:id', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            const document = db.collection('users').doc(req.params.id);

            await document.update({
                email: jsonContent.email,
                userName: jsonContent.userName,
                password: jsonContent.password
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
app.delete('/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('users').doc(req.params.id);

            await document.delete();
            
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});
*/
module.exports = app;