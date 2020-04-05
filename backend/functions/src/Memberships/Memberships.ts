import * as express from 'express';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//----------------------CREATE-----------------------------------

app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            let equipo = true;
            let usuario = true;
            let miembro = true;
            const team = db.collection('teams').doc(jsonContent.teamId);
            await team.get().then((t:any) => {
                if (!t.exists) equipo=false;
            })
            const user = db.collection('users').doc(jsonContent.userId);
            await user.get().then((u:any) => {
                if (!u.exists) usuario=false;
            })
            const membership = db.collection('memberships').where('userId', '==', jsonContent.userId).where('teamId', '==', jsonContent.teamId);
            await membership.get().then((snapshot:any) => {
                if (snapshot.empty) miembro = false;
            })
            if (miembro) {
                return res.status(200).send("este usuario ya es miembro de este equipo");
            }
            else if (!equipo && !usuario) {
                return res.status(200).send("no existe nada");
            }
            else if (!equipo) {
                return res.status(200).send("no existe equipo");
            }
            else if (!usuario) {
                return res.status(200).send("no existe usuario");
            }
            else {
                console.log(miembro);
                await db.collection('memberships').add({
                    teamId: jsonContent.teamId,
                    type: jsonContent.type,
                    userId: jsonContent.userId,
                });
                return res.status(200).send();
            }  
                
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

//------------------------READ--------------------------------------
app.get('/getByTeam/:teamId', (req, res) => {
    (async () => {
        try {

            const query = db.collection('memberships').where('teamId','==',req.params.teamId);
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        type: doc.data().type,
                        userId: doc.data().userId
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

app.get('/getByUser/:userId', (req, res) => {
    (async () => {
        try {
            const query = db.collection('memberships').where('userId','==',req.params.userId);
            const response: any = [];

            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem  = {
                        teamId: doc.data().teamId,
                        type: doc.data().type,

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


/*
app.put('/:id', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            const document = db.collection('users').doc(req.params.id);

            await document.update({
                email: jsonContent.email,
            

            return res.status(200).send();db.collection('membership')
            return res.status(500).send(error) 
        }

    })().then().catch();
});
*/
//Delete => Delete
app.delete('/delete', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const comprobarRoles = db.collection('memberships').where('teamId', '==', jsonContent.teamId);
            let staffEnEquipo = 0;
            let miembros = 0;
            let esStaff = false;
            let id;
            await comprobarRoles.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    ++miembros;
                    if(doc.data().type == 'staff') ++staffEnEquipo;
                    if (doc.data().userId == jsonContent.userId) {
                        console.log("entro");
                        console.log(doc.id);
                        id = doc.id;
                        if (doc.data().type == "staff") esStaff = true;
                    }
                    
                }
            })
            

            if (miembros > 1 && staffEnEquipo == 1 && esStaff) return res.status(200).send("eres el ultimo entrenador que queda");
            else {
                console.log(id);
                await db.collection('memberships').doc(id).delete();
                if (miembros == 1) console.log("tendremos que borrar el equipo");
                return res.status(200).send();
                    
            }
       
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});

module.exports = app;