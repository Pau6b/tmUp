
import * as express from 'express';
//import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            
            //Miramos que esten todos los camps
            let errores: string[] = [];
            let hayErrores: boolean = false;

            
            if (!jsonContent.hasOwnProperty("userId")){
                hayErrores = true;
                errores.push("To create a membership you must indicate the userId");
            }
            if (!jsonContent.hasOwnProperty("teamId")){
                hayErrores = true;
                errores.push("To create a membership you must indicate the teamId");
            }
            if (!jsonContent.hasOwnProperty("issue")){
                hayErrores = true;
                errores.push("To create a fine you must indicate the issue");
            }
            if (!jsonContent.hasOwnProperty("money")){
                hayErrores = true;
                errores.push("To create a fine you must indicate the money");
            }
            if (!jsonContent.hasOwnProperty("date")){
                hayErrores = true;
                errores.push("To create a fine you must indicate the date");
            }
            

            if (hayErrores){
                return res.status(400).send(errores);
            }

            let equipoExiste: boolean = true;
            let usuarioExiste: boolean = true;
            let miembroExiste: boolean = true;
            const team = db.collection('teams').doc(jsonContent.teamId);
            await team.get().then((teamDoc:any) => {
                if (!teamDoc.exists) equipoExiste=false;
            })
            const user = db.collection('users').doc(jsonContent.userId);
            await user.get().then((userDoc:any) => {
                if (!userDoc.exists) usuarioExiste=false;
            })
            const membership = db.collection('memberships').where('userId', '==', jsonContent.userId).where('teamId', '==', jsonContent.teamId);
            let idMembership = "undefined";
            await membership.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    idMembership = doc.id;
                }
            })
            if (idMembership === "undefined") miembroExiste = false;
            errores = [];
            hayErrores = false;

            if (!miembroExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] is not member of the team: [" + jsonContent.teamId + "]");
            }
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + jsonContent.teamId + "] does not exist");
            }
            if (!usuarioExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] does not exist");
            }
            if (jsonContent.money <= 0) {
                hayErrores = true;
                errores.push("The money of the fine cannot be less or equal than 0");
            }
            if (hayErrores){
                return res.status(400).send(errores);
            }
            await db.collection('memberships').doc(idMembership).collection("fines").add(
                {
                    issue: jsonContent.issue,
                    money: jsonContent.money,
                    isPaid: false,
                    date: jsonContent.date
                }
            );

            return res.status(200).send(); 


        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

app.get('/membershipFines', (req, res) => {
    (async () => {
        try {
            let errores: string[] = [];
            let hayErrores: boolean = false;

            let equipoExiste: boolean = true;
            let usuarioExiste: boolean = true;
            let miembroExiste: boolean = true;
            const team = db.collection('teams').doc(req.query.teamId);
            await team.get().then((teamDoc:any) => {
                if (!teamDoc.exists) equipoExiste=false;
            })
            const user = db.collection('users').doc(req.query.userId);
            await user.get().then((userDoc:any) => {
                if (!userDoc.exists) usuarioExiste=false;
            })
            const membership = db.collection('memberships').where('userId', '==', req.query.userId).where('teamId', '==', req.query.teamId);
            let idMembership = "undefined";
            await membership.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    idMembership = doc.id;
                }
            })
            if (idMembership === "undefined") miembroExiste = false;

            if (!miembroExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + req.query.userId + "] is not member of the team: [" + req.query.teamId + "]");
            }
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + req.query.teamId + "] does not exist");
            }
            if (!usuarioExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + req.query.userId + "] does not exist");
            }
            if (hayErrores){
                return res.status(400).send(errores);
            }
            const fines = db.collection('memberships').doc(idMembership).collection("fines");
            const response: any = [];
            await fines.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    const selectedItem  = {
                        fineId: doc.id,
                        issue: doc.data().issue,
                        money: doc.data().money,
                        isPaid:  doc.data().isPaid,
                        date: doc.data().date
                    };
                    if (req.query.fineState === "paid" && selectedItem.isPaid) response.push(selectedItem);
                    else if (req.query.fineState === "noPaid" && !selectedItem.isPaid) response.push(selectedItem);
                    else if (req.query.fineState === "all") response.push(selectedItem);
                    
                }
                return response;
            })
            return res.status(200).send(response); 
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

app.get('/teamFines', (req, res) => {
    (async () => {
        try {
            let errores: string[] = [];
            let hayErrores: boolean = false;

            let equipoExiste: boolean = true;
            const team = db.collection('teams').doc(req.query.teamId);
            await team.get().then((teamDoc:any) => {
                if (!teamDoc.exists) equipoExiste=false;
            })
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + req.query.teamId + "] does not exist");
            }
            if (hayErrores){
                return res.status(400).send(errores);
            }
            const response: any = [];
            const members: any = [];
            const teamMemberships = db.collection('memberships').where('teamId', '==', req.query.teamId);
            await teamMemberships.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    const info = {
                        userId: doc.data().userId,
                        membershipId: doc.id
                    }
                   members.push(info);
                }
                return response;
            })

            for (const member of members) {
                const membership = db.collection('memberships').doc(member.membershipId).collection("fines");
                await membership.get().then((finesSnapshot: any) => {
                    const fines  = finesSnapshot.docs;
                    for (const fine of fines) {
                        const selectedItem  = {
                            fineId: fine.id,
                            userId: member.userId,
                            issue: fine.data().issue,
                            money: fine.data().money,
                            isPaid:  fine.data().isPaid,
                            date: fine.data().date
                        };
                        if (req.query.fineState === "paid" && selectedItem.isPaid) response.push(selectedItem);
                        else if (req.query.fineState === "noPaid" && !selectedItem.isPaid) response.push(selectedItem);
                        else if (req.query.fineState === "all") response.push(selectedItem);
                    }
                    return response;
                })
            }
              

            return res.status(200).send(response);      

        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

app.get('/sumMembership', (req, res) => {
    (async () => {
        try {
            let errores: string[] = [];
            let hayErrores: boolean = false;

            let equipoExiste: boolean = true;
            let usuarioExiste: boolean = true;
            let miembroExiste: boolean = true;
            const team = db.collection('teams').doc(req.query.teamId);
            await team.get().then((teamDoc:any) => {
                if (!teamDoc.exists) equipoExiste=false;
            })
            const user = db.collection('users').doc(req.query.userId);
            await user.get().then((userDoc:any) => {
                if (!userDoc.exists) usuarioExiste=false;
            })
            const membership = db.collection('memberships').where('userId', '==', req.query.userId).where('teamId', '==', req.query.teamId);
            let idMembership = "undefined";
            await membership.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    idMembership = doc.id;
                }
            })
            if (idMembership === "undefined") miembroExiste = false;

            if (!miembroExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + req.query.userId + "] is not member of the team: [" + req.query.teamId + "]");
            }
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + req.query.teamId + "] does not exist");
            }
            if (!usuarioExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + req.query.userId + "] does not exist");
            }
            if (hayErrores){
                return res.status(400).send(errores);
            }
            const fines = db.collection('memberships').doc(idMembership).collection("fines");
            let precios = {
                total: 0,
                pending: 0,
                paid: 0
            }
            await fines.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    precios.total += doc.data().money;
                    if (doc.data().isPaid) precios.paid += doc.data().money;
                    else if (!doc.data().isPaid) precios.pending += doc.data().money;

                }
                return precios;
            })
            return res.status(200).send(precios);
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

app.get('/sumTeam', (req, res) => {
    (async () => {
        try {
            let errores: string[] = [];
            let hayErrores: boolean = false;

            let equipoExiste: boolean = true;
            const team = db.collection('teams').doc(req.query.teamId);
            await team.get().then((teamDoc:any) => {
                if (!teamDoc.exists) equipoExiste=false;
            })
            if (!equipoExiste) {
                hayErrores = true;
                errores.push("The team with id : [" + req.query.teamId + "] does not exist");
            }
            if (hayErrores){
                return res.status(400).send(errores);
            }
            const response: any = [];
            const members: any = [];
            const teamMemberships = db.collection('memberships').where('teamId', '==', req.query.teamId);
            await teamMemberships.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    const info = {
                        userId: doc.data().userId,
                        membershipId: doc.id
                    }
                   members.push(info);
                }
                return response;
            })
            let precios  = {
                total: 0,
                pending: 0,
                paid: 0,
                
            };
            for (const member of members) {
                const membership = db.collection('memberships').doc(member.membershipId).collection("fines");
                await membership.get().then((finesSnapshot: any) => {
                    const fines  = finesSnapshot.docs;
                    for (const fine of fines) {
                        precios.total += fine.data().money;
                        if (fine.data().isPaid) precios.paid += fine.data().money;
                        else if (!fine.data().isPaid) precios.pending += fine.data().money;
                    }
                })
            }
              

            return res.status(200).send(precios);      

        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

app.put('/payFine', (req, res) => {
    (async () => {
        try {

            const jsonContent = JSON.parse(req.body);
            
            //Miramos que esten todos los camps
            let errores: string[] = [];
            let hayErrores: boolean = false;

            
            if (!jsonContent.hasOwnProperty("userId")){
                hayErrores = true;
                errores.push("To pay a fine you must indicate the userId");
            }
            if (!jsonContent.hasOwnProperty("teamId")){
                hayErrores = true;
                errores.push("To pay a fine you must indicate the teamId");
            }
            if (!jsonContent.hasOwnProperty("fineId")){
                hayErrores = true;
                errores.push("To pay a fine you must indicate the fineId");
            }

            if (hayErrores){
                return res.status(400).send(errores);
            }

            let equipoExiste: boolean = true;
            let usuarioExiste: boolean = true;
            let miembroExiste: boolean = true;
            let fineExiste: boolean = true;
            const team = db.collection('teams').doc(jsonContent.teamId);
            await team.get().then((teamDoc:any) => {
                if (!teamDoc.exists) equipoExiste=false;
            })
            const user = db.collection('users').doc(jsonContent.userId);
            await user.get().then((userDoc:any) => {
                if (!userDoc.exists) usuarioExiste=false;
            })
            const membership = db.collection('memberships').where('userId', '==', jsonContent.userId).where('teamId', '==', jsonContent.teamId);
            let idMembership = "undefined";
            await membership.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                for (const doc of docs) {
                    idMembership = doc.id;
                }
            })
            if (idMembership === "undefined") miembroExiste = false;

            errores = [];
            hayErrores = false;

            if (!miembroExiste) {
                hayErrores = true;
                errores.push("The user with email: [" + jsonContent.userId + "] is not member of the team: [" + jsonContent.teamId + "]");
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
            const fine = db.collection('memberships').doc(idMembership).collection("fines").doc(jsonContent.fineId);
            await fine.get().then((fDoc:any) => {
                if (!fDoc.exists) fineExiste=false;
            })
            if (!fineExiste) {
                hayErrores = true;
                errores.push("The fine with id: [" + jsonContent.fineId + "] does not exist");
            }
            if (hayErrores){
                return res.status(400).send(errores);
            }
            
            await fine.update({
                isPaid: true
            })

            return res.status(200).send(); 
            
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});
module.exports = app;
