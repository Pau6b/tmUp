"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
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
                userName: jsonContent.userName
            });
            req.session["userName"] = jsonContent.userName;
            //console.log(req.session!["userName"]);
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/me', (req, res) => {
    console.log(req.path);
    (async () => {
        try {
            if (!req.session.user) {
                return res.status(400).send("UGM1");
            }
            let userData = "";
            await admin.auth().getUser(req.session.user).then((user) => {
                userData = {
                    email: user.email,
                    userName: user.displayName
                };
            });
            return res.status(200).send(userData);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    })().then().catch();
});
//Read => Get
app.get('/:userEmail', (req, res) => {
    (async () => {
        try {
            let userExists = true;
            let userData = "";
            await admin.auth().getUserByEmail(req.params.userEmail).then((user) => {
                userData = {
                    email: user.email,
                    userName: user.displayName
                };
            }).catch(() => {
                userExists = false;
            });
            if (!userExists) {
                return res.status(400).send("UG1");
            }
            return res.status(200).send(userData);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/me/teams', (req, res) => {
    (async () => {
        try {
            if (!req.session.user) {
                return res.status(400).send("TMG1");
            }
            let email = "";
            await admin.auth().getUser(req.session.user).then((user) => {
                email = user.email;
            });
            //User exists, get team ids
            const query = db.collection('memberships').where("userId", "==", email);
            const teamIds = [];
            await query.get().then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    teamIds.push(element.data().teamId);
                });
            });
            //get team names
            const response = new Set();
            for (const id of teamIds) {
                const teamQuery = db.collection('teams').doc(id);
                await teamQuery.get().then((teamDoc) => {
                    response.add({
                        teamName: teamDoc.data().teamName,
                        id: teamDoc.id,
                        sport: teamDoc.data().sport
                    });
                });
            }
            return res.status(200).send(Array.from(response));
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
app.get('/:userEmail/teams', (req, res) => {
    (async () => {
        try {
            const userRef = db.collection('users/').doc(req.params.userEmail);
            let userExists = true;
            await userRef.get().then((doc) => {
                if (!doc.exists) {
                    userExists = false;
                }
            });
            if (!userExists) {
                return res.status(400).send("The user with email: [" + req.params.userEmail + "] does not exist");
            }
            //User exists, get team ids
            const query = db.collection('memberships').where("userId", "==", req.params.userEmail);
            let teamIds = [];
            await query.get().then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    teamIds.push(element.data().teamId);
                });
            });
            //get team names
            const response = new Set();
            for (const id of teamIds) {
                const teamQuery = db.collection('teams/').doc(id);
                await teamQuery.get().then((teamDoc) => {
                    response.add({
                        teamName: teamDoc.data().teamName,
                        teamId: id,
                        sport: teamDoc.data().sport
                    });
                });
            }
            return res.status(200).send(Array.from(response));
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
//ReadAll => Get
app.get('/', (req, res) => {
    (async () => {
        try {
            const query = db.collection('users');
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    const selectedItem = {
                        id: doc.data().id,
                        email: doc.data().email,
                        userName: doc.data().userName,
                        memberships: doc.data().memberships
                    };
                    response.push(selectedItem);
                }
                return response;
            });
            return res.status(200).send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
///////////////UPDTATE ALT 1///////////////
app.put('/update', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            let userExists = true;
            await admin.auth().getUserByEmail(jsonContent.email).then((user) => {
                admin.auth().updateUser(user.uid, { displayName: jsonContent.displayName })
                    .then(() => { console.log("Success"); })
                    .catch(() => { console.log("Failure"); });
            }).catch(() => {
                userExists = false;
            });
            if (!userExists) {
                return res.status(400).send("UG1");
            }
            return res.status(200).send();
        }
        catch (error) {
            return res.status(500).send(error);
        }
    })().then().catch();
});
///////////////UPDTATE ALT 1///////////////
// Falta determinar que hay que cambiar
//Update => Put
/*app.put('/:userEmail', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);

            if (!jsonContent.hasOwnProperty("userName")) {
                return res.status(400).send("UU1");
            }

            const document = db.collection('users').doc(req.params.userEmail);

            let userExists : boolean = false;

            await document.get().then((doc : DocumentSnapshot) => {
                userExists = doc.exists;
            });

            if (!userExists) {
                return res.status(400).send("UU2");
            }

            await document.update({
                userName: jsonContent.userName
            }).then();
            

            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error)
        }

    })().then().catch();
});*/
//Delete => Delete
app.delete('/:userEmail', (req, res) => {
    (async () => {
        try {
            let userExists = true;
            await db.collection('users').doc(req.params.userEmail).get().then((doc) => {
                if (!doc.exists) {
                    userExists = false;
                }
            });
            //DELETE FROM AUTH SERVE
            await admin.auth().getUserByEmail(req.params.userEmail).then((user) => {
                admin.auth().deleteUser(user.uid)
                    .then(() => { console.log("Successfully deleted user"); })
                    .catch(() => { console.log("Error deleting user"); });
            }).catch(() => {
                userExists = false;
            });
            //DELETE FROM AUTH SERVE
            if (!userExists) {
                return res.status(400).send("userEmail is incorrect");
            }
            await db.collectionGroup('memberships').where('userId', "==", req.params.userEmail).get().then((querySnapshot) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    db.collection('memberships').doc(doc.id).delete();
                }
                //return response;
            }).catch((error) => {
                console.log(error);
                return error;
            });
            await db.collection('users').doc(req.params.userEmail).delete();
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
/*app.delete('/:userEmail', (req, res) => {
    (async () => {
        try {
            let userExists: boolean = true;
            await db.collection('users').doc(req.params.userEmail).get().then((doc: any) => {
                if(!doc.exists) {
                    userExists = false;
                }
            });
            if (!userExists) {
                return res.status(400).send("userEmail is incorrect");
            }
            //const document = db.collection('users').doc(req.params.userEmail);
            
            //eliminar todas les memberships del usuario
            /*const query = db.collectionGroup('memberships').where('userId',"==",req.params.userEmail);
            const response: any = [];
            if(query != undefined) await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                     doc.delete();
                }
                return response;
            })*/
/*await db.collectionGroup('memberships').where('userId',"==",req.params.userEmail).get().then((querySnapshot: any) => {
    const docs = querySnapshot.docs;
    for (const doc of docs) {
        db.collection('memberships').doc(doc.id).delete();
    }
    //return response;
}).catch((error: any)=>{
    console.log(error);
    return error;
})
//await user.delete();
await db.collection('users').doc(req.params.userEmail).delete();

//DELETE FROM AUTH SERVE
await admin.auth().deleteUser(req.params.userEmail).then(function() {
    console.log('Successfully deleted user');
})
.catch((error: any)=>{
    console.log(error);
    return error;
})
//DELETE FROM AUTH SERVE

return res.status(200).send();
}
catch(error){
console.log(error);
return res.status(500).send(error)
}

})().then().catch();
});*/
module.exports = app;
//# sourceMappingURL=Users.js.map