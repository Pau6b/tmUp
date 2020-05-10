import * as express from 'express';
const admin = require("firebase-admin");
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
const db = admin.firestore();
const app = express();

//Read Noticies of a team => GET
app.get('/all/:teamId', (req, res) => { 
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const query = db.collection('teams').doc(req.params.teamId).collection('noticies').orderBy("dateNoticia", "desc");
            const response: any = [];
            return new Promise(function(resolve, reject) {
                setTimeout(() => {
                    query.onSnapshot((snapshot: any[]) => {
                        snapshot.forEach(snap => {
                            let selectedData;
                            if (snap.data().typeNoticia === "matchAfegit" || snap.data().typeNoticia === "matchDeleted" || snap.data().typeNoticia === "matchUpdated") selectedData = NoticiamatchData(snap);
                            if (snap.data().typeNoticia === "trainingAfegit" || snap.data().typeNoticia === "trainingDeleted" || snap.data().typeNoticia === "trainingUpdated") selectedData = NoticiatrainingData(snap); 
                            if (snap.data().typeNoticia === "tacticaAfegida" || snap.data().typeNoticia === "tacticaDeleted" || snap.data().typeNoticia === "normativaAfegida" || snap.data().typeNoticia === "normativaDeleted") selectedData = NoticiaFitxer(snap);
                            //else if (snap.data().doc.typeNoticia === "estadistiques") selectedData =  NoticiaEstadistiquesData(snap);
                            //...
                            response.push(selectedData);
                        })
                        resolve({msg: "It works", response});
                        return res.status(200).send(response);
                    })
                    if(true){
                        resolve({msg: "It works", response});
                    }else {
                        reject({});
                    }
                }, 2000);
            })
        }         
        catch(error){             
            return res.status(500).send(error)          
        }     
    })().then().catch(); 
});

function NoticiamatchData(doc: any) {
    let selectedData;
    selectedData = {
        id: doc.id,
        dateNoticia: doc.data().dateNoticia,
        typeNoticia: doc.data().typeNoticia,
        title: doc.data().title,
        startTime: doc.data().startTime,
        endTime: doc.data().endTime,
        allDay: doc.data().allDay,
        type: doc.data().type,
        rival: doc.data().rival,
        location: doc.data().location,
        call: doc.data().call
    };
    return selectedData;
}

function NoticiatrainingData(doc: any) {
    let selectedData;
    selectedData = {
        id: doc.data().id,
        dateNoticia: doc.data().dateNoticia,
        typeNoticia: doc.data().typeNoticia,
        title: doc.data().title,
        startTime: doc.data().startTime,
        endTime: doc.data().endTime,
        allDay: doc.data().allDay,
        type: doc.data().type,
        description: doc.data().description,
        location: doc.data().location
    };
    return selectedData;
}

function NoticiaFitxer(doc: any) {
    let selectedData;
    selectedData = {
        id: doc.id,
        dateNoticia: doc.data().dateNoticia,
        typeNoticia: doc.data().typeNoticia,
        nombreFile: doc.data().nombreFile
    };
    return selectedData;
}

async function comprobarEquipo(jsonContent: any) {
    let existsTeam = true;
    const query = db.collection('teams').doc(jsonContent.teamId);
    await query.get().then((querySnapshot: DocumentSnapshot) => {
        if(!querySnapshot.exists) {
            existsTeam = false;
        }
    });
    return existsTeam;
}

//Create Noticies=> POST 
app.post('/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            var dateNoticia = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            await db.collection('teams').doc(jsonContent.teamId).collection('noticies').add({
                typeNoticia: jsonContent.typeNoticia,
                dateNoticia: dateNoticia,
                nombreFile: jsonContent.nombreFile
            })
            return res.status(200).send();
        }
        catch(error){
            return res.status(500).send(error);
        }

    })().then().catch();
});

module.exports = app;