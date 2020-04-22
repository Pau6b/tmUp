import * as express from 'express';
/*const admin = require("firebase-admin");
const db = admin.firestore();*/
const app = express();

//-------------------------------------------------CREATE----------------------------------------------------------------------------------------

//Crear evento partido
app.post('/match/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").add({
                type: "match",
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                rival: jsonContent.rival,
                location: jsonContent.location
            })
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

//Crear evento entrenamiento
app.post('/training/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").add({
                type: "training",
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                description: jsonContent.description,
                location: jsonContent.location
            })
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

//-----------------------------------------------------READ-------------------------------------------------------------------------------

//Read Events of a day => GET
app.get('/byday/:teamId/:date', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const query = db.collection('teams').doc(req.params.teamId).collection("events");
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs = querySnapshot.docs;
                let selectedData;
                for (const doc of docs) {
                    if (doc.data().startTime === req.params.startTime) {
                        if(doc.data.type === "match") selectedData = matchData(doc);
                        else selectedData = trainingData(doc);
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
app.get('/bymonth/:teamId/:month', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const query = db.collection('teams').doc(req.params.teamId).collection('events');
            const response: any = [];
            return new Promise(function(resolve, reject) {
                setTimeout(() => {
                    query.onSnapshot((snapshot: any[]) => {
                        snapshot.forEach(snap => {
                            const event = new Date(snap.data().startTime);

                            if(event.getMonth() ===  parseInt(req.params.month)) {
                                let selectedData;
                                if(snap.data().type === "match") selectedData = matchData(snap);
                                else selectedData = trainingData(snap);
                                response.push(selectedData);
                            }
                        })
                        console.log(response);
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
            console.log(error);             
            return res.status(500).send(error)          
        }     
    })().then().catch(); 
});


//---------------------------------------------------------DELETE------------------------------------------------------------------------

//Delete event
app.delete('/delete/:teamId/:eventId', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const existeevento = await comprobarEvento(req.params);
            if(!existeevento) return res.status(400).send("no existe el evento");
            await db.collection('teams').doc(req.params.teamId).collection('events').doc(req.params.eventId).delete();
            return res.status(200).send("evento eliminado");
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error) 
        }
    })().then().catch();
});

//----------------------------------------------UPDATE-----------------------------------------------------------------

//Update a training
app.put('/training/update', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const existeevento = await comprobarEvento(jsonContent);
            if(!existeevento) return res.status(400).send("no existe el evento");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").doc(jsonContent.eventId).set({
                type: "training",
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                description: jsonContent.description,
                location: jsonContent.location
            })
            return res.status(200).send();
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

//Update a match
app.put('/match/update', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const existeevento = await comprobarEvento(jsonContent);
            if(!existeevento) return res.status(400).send("no existe el evento");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").doc(jsonContent.eventId).set({
                type: "match",
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                rival: jsonContent.rival,
                location: jsonContent.location
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


function matchData(doc: any) {
    let selectedData;
    selectedData = {
        id: doc.id,
        title: doc.data().title,
        startTime: doc.data().startTime,
        endTime: doc.data().endTime,
        allDay: doc.data().allDay,
        type: doc.data().type,
        rival: doc.data().rival,
        location: doc.data().location
    };
    return selectedData;
}

function trainingData(doc: any) {
    let selectedData;
    selectedData = {
        id: doc.id,
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

async function comprobarEvento(jsonContent: any) {
    let existeevento = false;
    const query = db.collection('teams').doc(jsonContent.teamId).collection('events');
    await query.get().then((querySnapshot: any) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
            if (doc.id === jsonContent.eventId)
                existeevento = true;
        }
    });
    return existeevento;
}

module.exports = app;