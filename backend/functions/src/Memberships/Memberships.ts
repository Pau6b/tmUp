import * as express from 'express';
<<<<<<< HEAD
=======
import { GetMembershipStatsBySport } from '../Core/Templates/Statistics'
import { GetDefaultPlayerState, playerStates } from '../Core/States'
import { UserRecord } from 'firebase-functions/lib/providers/auth';
>>>>>>> e2ec6fd04bbeb1f4af1a1963aeee7e26dbcbb628
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//Create => Post
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
<<<<<<< HEAD

            const userCollection = await db.collection('users').doc(jsonContent.email);
            const teamCollection = await db.collection('teams').doc(jsonContent.teamId);
                userCollection.collection('memberships').doc(jsonContent.teamId).create({
                    teamId: jsonContent.teamId,
                    role: jsonContent.role
                });
                teamCollection.collection('members').doc(jsonContent.email).create({
                    user: jsonContent.email,
                    role: jsonContent.role
                });
                return res.status(200).send();
=======
            
            //Miramos que esten todos los camps
            let errores: string[] = [];
            let hayErrores: boolean = false;

            if (!jsonContent.hasOwnProperty("teamId")){
                hayErrores = true;
                errores.push("To create a membership you must indicate the teamId");
            }
            if (!jsonContent.hasOwnProperty("userId")){
                hayErrores = true;
                errores.push("To create a membership you must indicate the userId");
            }
            if (!jsonContent.hasOwnProperty("type")){
                hayErrores = true;
                errores.push("To create a membership you must indicate the type of membership");
            }

            if (hayErrores){
                return res.status(400).send(errores);
            }

            //Miramos que el usuario y el equipo sean correctos y no tengan una membership ya☺
            let equipoExiste: boolean = true;
            let usuarioExiste: boolean = true;
            let miembroExiste: boolean = true;
            let teamSport: string ="";
            const team = db.collection('teams').doc(jsonContent.teamId);
            await team.get().then((teamDoc:any) => {
                if (!teamDoc.exists) equipoExiste=false;
                else {
                    teamSport = teamDoc.data().sport;
                }
            })
            const user = db.collection('users').doc(jsonContent.userId);
            await user.get().then((userDoc:any) => {
                if (!userDoc.exists) usuarioExiste=false;
            })
            const membership = db.collection('memberships').where('userId', '==', jsonContent.userId).where('teamId', '==', jsonContent.teamId);
            await membership.get().then((snapshot:any) => {
                if (snapshot.empty) miembroExiste = false;
            })

            errores = [];
            hayErrores = false;

            if (miembroExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] already has a membership in the team: [" + jsonContent.teamId + "]");
            }
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + jsonContent.teamId + "] does not exist");
            }
            if (!usuarioExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] does not exist");
            }

            if (hayErrores){
                return res.status(400).send(errores);
            }

            const membershipData :any = {
                teamId: jsonContent.teamId,
                type: jsonContent.type,
                userId: jsonContent.userId
            }

            if (jsonContent.type === "player") {
                membershipData.stats = GetMembershipStatsBySport(teamSport);
                membershipData.state =  GetDefaultPlayerState();
            }

            //Todo correcto, creamos la membership
            await db.collection('memberships').add(membershipData);
            return res.status(200).send(); 
                
>>>>>>> e2ec6fd04bbeb1f4af1a1963aeee7e26dbcbb628
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

<<<<<<< HEAD
/*
//Read => Get
app.get('/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection("users").doc(req.params.id);
            const user = await document.get();
            const response = user.data();
=======
app.put('/updatePlayerState/:teamId', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            if (jsonContent.state === null) {
                return res.status(400).send("UMS1");
            }
            if (!playerStates.includes(jsonContent.state)) {
                return res.status(400).send("UMS2");
            }
            let email: string = "";
            admin.auth().getUser(req.session!.user).then((user: UserRecord) => {
                    user.email = user.email;
            })

            const query = db.collection('memberships').where('teamId','==',req.params.teamId).where('userId', "==", email);
            let docExists: boolean = false;
            let isPlayer: boolean = true;
            let docid : string = "";
            await query.get().then(async (querySnapshot: any) => {
                for (const doc  of querySnapshot.docs) {
                    docid = doc.id;
                    docExists = true;
                    if (doc.data().type !== "player") {
                        isPlayer = false;
                    }
                }
            });

            if (!docExists) {
                return res.status(400).send("UMS3");
            }

            if(!isPlayer) {
                return res.status(400).send("UMS4");
            }
            
            await db.collection('memberships').doc(docid).update({
                state: jsonContent.state
            })

            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send();
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
                    const selectedItem = doc.data();
                    response.push(selectedItem);
                }
                return response;
            })
>>>>>>> e2ec6fd04bbeb1f4af1a1963aeee7e26dbcbb628

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

<<<<<<< HEAD
            await document.delete();
            
            return res.status(200).send();
=======
                for (const doc of docs) {
                    ++miembros;
                    if(doc.data().type === 'staff') ++staffEnEquipo;
                    if (doc.data().userId === jsonContent.userId) {
                        console.log("entro");
                        console.log(doc.id);
                        id = doc.id;
                        if (doc.data().type === "staff") esStaff = true;
                    }
                    
                }
            })
            

            if (miembros > 1 && staffEnEquipo === 1 && esStaff) return res.status(200).send("eres el ultimo entrenador que queda");
            else {
                console.log(id);
                await db.collection('memberships').doc(id).delete();
                if (miembros === 1) console.log("tendremos que borrar el equipo");
                return res.status(200).send();
                    
            }
       
>>>>>>> e2ec6fd04bbeb1f4af1a1963aeee7e26dbcbb628
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }

    })().then().catch();
});
*/
module.exports = app;