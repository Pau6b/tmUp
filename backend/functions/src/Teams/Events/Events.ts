import * as express from 'express';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { GetMembershipStatsBySport, GetMatchStatsBySport } from '../../Core/Templates/Statistics';
//import { GetMatchStatsBySport } from "../../Core/Templates/Statistics"
//import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
const admin = require("firebase-admin");
const db = admin.firestore();
const app = express();

//-------------------------------------------------CREATE----------------------------------------------------------------------------------------

//Crear evento partido
app.post('/match/create', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            let teamSport: string ="";
            const team = db.collection('teams').doc(jsonContent.teamId);
            await team.get().then((teamDoc:any) => {
                    teamSport = teamDoc.data().sport;
            })
            var dateNoticia = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            const stadistics = GetMatchStatsBySport(teamSport);
            await db.collection('teams').doc(jsonContent.teamId).collection("events").add({
                type: "match",
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                rival: jsonContent.rival,
                location: jsonContent.location,
                stats: stadistics,
                call: []
            })
            await db.collection('teams').doc(jsonContent.teamId).collection('noticies').add({
                typeNoticia: "matchAfegit",
                dateNoticia: dateNoticia,
                ///general de match
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                rival: jsonContent.rival,
                location: jsonContent.location,
                call: []
            })
            return res.status(200).send();
        }
        catch(error){
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
            var dateNoticia = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            await db.collection('teams').doc(jsonContent.teamId).collection("events").add({
                type: "training",
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                description: jsonContent.description,
                location: jsonContent.location
            })
            await db.collection('teams').doc(jsonContent.teamId).collection('noticies').add({
                typeNoticia: "trainingAfegit",
                dateNoticia: dateNoticia,
                ///general de training
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
            return res.status(500).send(error);
        }

    })().then().catch();
});

//-----------------------------------------------------READ-------------------------------------------------------------------------------
/*
//Read Events of a day => GET
app.get('/byday/:teamId/:date', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const query = db.collection('teams').doc(req.params.teamId).collection("events");
            const response: any = [];
            await query.get().then((querySnapshot: any) => {
                const docs: DocumentSnapshot[] = querySnapshot.docs;
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
            return res.status(500).send(error) 
        }
    })().then().catch();
});
*/

app.get('/:teamId/:eventId', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            let existeevento = true;
            const eventData = await db.collection('teams').doc(req.params.teamId).collection('events').doc(req.params.eventId).get().then((doc: DocumentSnapshot)=> {
                if(!doc.exists) {
                    existeevento = false;
                    return;
                }else {
                    return doc.data();
                }
            });
            //Check that the event exists
            if (!existeevento) {
                return res.status(400).send("no existe evento");
            }
            //return correct data
            return res.status(200).send(eventData);

            
        }         
        catch(error){             
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


//----------------------------------------------------------NEXT MATCH AND TRAINING-----------------------------------------------------------
//Read Next Match=> GET
app.get('/nextevent/match/:teamId', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("nOO existe el equipo");
            const query = db.collection('teams').doc(req.params.teamId).collection('events');
            const response: any = [];
            let selectedData: any = [];
            let d1 = new Date();
            let dateAct = d1.getTime();
            let boolPrimero = 1;
            let dateProx = d1.getTime();
            return new Promise(function(resolve, reject) {
                setTimeout(() => {
                    query.onSnapshot((snapshot: any[]) => {
                        snapshot.forEach(snap => {
                            const d2 = new Date(snap.data().startTime);
                                if(snap.data().type === "match"){
                                    if (boolPrimero == 1) {
                                        dateProx = d2.getTime(); 
                                        selectedData = matchData(snap);
                                        boolPrimero = 0;
                                    }
                                    else {
                                        if(dateAct < d2.getTime() && dateProx >= d2.getTime() ) { 
                                                dateProx = d2.getTime(); 
                                                selectedData = matchData(snap);
                                        }
                                    } 
                                }
                        })
                        response.push(selectedData);
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

//Read Next Training=> GET
app.get('/nextevent/training/:teamId', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const query = db.collection('teams').doc(req.params.teamId).collection('events');
            const response: any = [];
            let selectedData: any = [];
            let d1 = new Date();
            let dateAct = d1.getTime();
            let boolPrimero = 1;
            let dateProx = d1.getTime();
            return new Promise(function(resolve, reject) {
                setTimeout(() => {
                    query.onSnapshot((snapshot: any[]) => {
                        snapshot.forEach(snap => {
                            const d2 = new Date(snap.data().startTime);
                                if(snap.data().type === "training"){
                                    if (boolPrimero == 1) {
                                        dateProx = d2.getTime(); 
                                        selectedData = trainingData(snap);
                                        boolPrimero = 0;
                                    }
                                    else {
                                        if(dateAct < d2.getTime() && dateProx >= d2.getTime() ) { 
                                                dateProx = d2.getTime(); 
                                                selectedData = trainingData(snap);
                                        }
                                    } 
                                }
                        })
                        response.push(selectedData);
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
//--------------------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------DELETE------------------------------------------------------------------------

//Delete event
app.delete('/delete/:teamId/:eventId', (req, res) => {
    (async () => {
        try {
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const existeevento = await comprobarEvento(req.params);
            if(!existeevento) return res.status(400).send("no existe el evento");
            var dateNoticia = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            const eventData = await db.collection('teams').doc(req.params.teamId).collection('events').doc(req.params.eventId).get().then((doc: DocumentSnapshot)=> {
                return doc.data();   
            });
            if (eventData.type == "match") {
                await db.collection('teams').doc(req.params.teamId).collection('noticies').add({
                    typeNoticia: "matchDeleted",
                    dateNoticia: dateNoticia,
                    ///general de match
                    title: eventData.title,
                    startTime: eventData.startTime,
                    endTime: eventData.endTime,
                    allDay: eventData.allDay,
                    rival: eventData.rival,
                    location: eventData.location,
                    call:  eventData.call
                })
            }
            else {
                await db.collection('teams').doc(req.params.teamId).collection('noticies').add({
                    typeNoticia: "trainingDeleted",
                    dateNoticia: dateNoticia,
                    ///general de training
                    title: eventData.title,
                    startTime: eventData.startTime,
                    endTime: eventData.endTime,
                    allDay: eventData.allDay,
                    description: eventData.description,
                    location: eventData.location
                })
            }
            await db.collection('teams').doc(req.params.teamId).collection('events').doc(req.params.eventId).delete();
            return res.status(200).send("evento eliminado");
        }
        catch(error){
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
            var dateNoticia = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            await db.collection('teams').doc(jsonContent.teamId).collection("events").doc(jsonContent.eventId).set({
                type: "training",
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                description: jsonContent.description,
                location: jsonContent.location
            })
            await db.collection('teams').doc(jsonContent.teamId).collection('noticies').add({
                typeNoticia: "trainingUpdated",
                dateNoticia: dateNoticia,
                ///general de training
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
            var dateNoticia = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            await db.collection('teams').doc(jsonContent.teamId).collection("events").doc(jsonContent.eventId).set({
                type: "match",
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                rival: jsonContent.rival,
                location: jsonContent.location,
                call: []
            })
            await db.collection('teams').doc(jsonContent.teamId).collection('noticies').add({
                typeNoticia: "matchUpdated",
                dateNoticia: dateNoticia, 
                ///general de match
                title: jsonContent.title,
                startTime: jsonContent.startTime,
                endTime: jsonContent.endTime,
                allDay: jsonContent.allDay,
                rival: jsonContent.rival,
                location: jsonContent.location,
                call: []
            })
            return res.status(200).send();
        }
        catch(error){
            return res.status(500).send(error);
        }

    })().then().catch();
});

//CONVOCADOS----------------------------------------

app.put('/match/:id/makeCall',(req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(jsonContent);
            if(!existsTeam) return res.status(400).send("TNE");
            let existeevento = false;
            const query = db.collection('teams').doc(jsonContent.teamId).collection('events');
            await query.get().then((querySnapshot: any) => {
                const docs: DocumentSnapshot[] = querySnapshot.docs;
                for (const doc of docs) {
                    if (doc.id === req.params.id)
                        existeevento = true;
                }
            });
            if (!existeevento) return res.status(404).send("ENE");
            console.log("ya todo existe");
            await db.collection('teams').doc(jsonContent.teamId).collection("events").doc(req.params.id).update({
                call: jsonContent.call
            })
            return res.status(200).send();

        }
        catch(error) {
            return res.status(500).send(error);
        }
    })().then().catch();
});

app.get('/:teamId/match/:eventId/getCall',(req, res) => {
    (async () => {
        try {
            console.log(req.params.teamId);
            console.log(req.params.eventId);
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("TNE");
            let existeevento = true;
            const eventData = await db.collection('teams').doc(req.params.teamId).collection('events').doc(req.params.eventId).get().then((doc: DocumentSnapshot)=> {
                if(!doc.exists) {
                    existeevento = false;
                    return;
                }else {
                    return doc.data();
                }
            });
            //Check that the event exists
            if (!existeevento) {
                return res.status(400).send("ENE");
            }
            //return correct data
            if (eventData.call === []) return res.status(400).send("NC");
            return res.status(200).send(eventData.call);

            
        }         
        catch(error){             
            return res.status(500).send(error)          
        }     
    })().then().catch();
});



//ESTADISTICAS--------------------------------------------------------------------------------------------------


app.put('/statistics/:teamId/:eventId', (req, res) => {
    (async () => {
        try {
            const jsonContent = JSON.parse(req.body);
            const existsTeam = await comprobarEquipo(req.params);
            if(!existsTeam) return res.status(400).send("no existe el equipo");
            const existeevento = await comprobarEvento(req.params);
            if(!existeevento) return res.status(400).send("no existe el evento");
            //tratar errores
            let teamSport: string ="";
            let teamStadistics: any = {}
            const team = await db.collection('teams').doc(req.params.teamId);
            await team.get().then((teamDoc:any) => {
                    teamSport = teamDoc.data().sport;
                    teamStadistics = teamDoc.data().stats;
            })
            let playerStatistics: any = {}
            playerStatistics = GetMembershipStatsBySport(teamSport);
            console.log(playerStatistics);
            let matchStadistics: any = {}
            matchStadistics = GetMatchStatsBySport(teamSport);
            console.log(teamStadistics);
            for (const key in jsonContent) {
                if (jsonContent.hasOwnProperty(key)) {
                    console.log(jsonContent[key].type);
                    if(jsonContent[key].type != ("goalsReceived" || "pointsReceived"))await updatePlayerStats(req.params.teamId, jsonContent[key].player.id, jsonContent[key].type);
                    for (const stat in matchStadistics) {
                        if (matchStadistics.hasOwnProperty(stat)) {
                            if(jsonContent[key].type === stat) {
                                //mirar si tiene points y sumar points o sino sumar 1
                                if(matchStadistics[stat] === ("goalsScored" || "goalsReceived" || "pointsScored" || "pointsReceived")) matchStadistics[stat] += jsonContent[key].points;
                                else matchStadistics[stat] += 1;
                            }
                        }
                    }
                    for (const stat in teamStadistics) {
                        if (teamStadistics.hasOwnProperty(stat)) {
                            if(jsonContent[key].type === stat){
                                if(teamStadistics[stat] === ("goalsScored" || "goalsReceived" || "pointsScored" || "pointsReceived")) teamStadistics[stat] += jsonContent[key].points;
                                else teamStadistics[stat] += 1;
                            } //teamStadistics[stat] += 1;                            
                        }
                    }                    
                }
            }
            if(teamSport != "Basketball") {
                if(matchStadistics["goalsScored"] > matchStadistics["goalsReceived"]) teamStadistics["wonMatches"] +=1;
                else if(matchStadistics["goalsScored"] < matchStadistics["goalsReceived"]) teamStadistics["lostMatches"] +=1;
                else teamStadistics["drawedMatches"] += 1;
            }else {
                if(matchStadistics["pointsScored"] > matchStadistics["pointsReceived"]) teamStadistics["wonMatches"] +=1;
                else if(matchStadistics["pointsScored"] < matchStadistics["pointsReceived"]) teamStadistics["lostMatches"] +=1;
                else teamStadistics["drawedMatches"] += 1;
            }
            console.log(matchStadistics);
            console.log(teamStadistics);

            await db.collection('teams').doc(req.params.teamId).collection('events').doc(req.params.eventId).update({
                stats: matchStadistics,
                //state: jsonContent.state
            })
            await db.collection('teams').doc(req.params.teamId).update({
                stats: teamStadistics
            })

            //updateTeamStats(req.params.teamId, teamStatistics);
            //desde team actualizar sus estadisticas cogiendo las del partido.

            //comprovarEstadisticas(Statistics,jsonContent);

            /*let email: string = "";
            await admin.auth().getUser(req.session!.user).then((user: UserRecord) => {
                    user.email = user.email;
            })
            //email = "ivan@email.com"*/
            /*const query = await db.collection('memberships').where('teamId','==',req.params.teamId).where('userId', "==", req.params.userId);
            let docExists: boolean = false;
            let isPlayer: boolean = true;
            let docid : string = "";
            //let stadisticsPlayer;
            await query.get().then(async (querySnapshot: any) => {
                for (const doc  of querySnapshot.docs) {
                    docid = doc.id;
                    docExists = true;
                    playerStatistics = doc.data().stats;
                    for (const key in jsonContent) {
                        if (jsonContent.hasOwnProperty(key)) {
                            for (const stat in playerStatistics) {
                                if (playerStatistics.hasOwnProperty(key)) {
                                    if(key === stat) playerStatistics[stat] += jsonContent[key];
                                }
                            }
                            
                        }
                    }
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
                stats: Statistics,
                //state: jsonContent.state
            })*/
            return res.status(200).send(matchStadistics);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send();
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
        location: doc.data().location,
        call: doc.data().call,
        stats: doc.data().stats
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
        const docs: DocumentSnapshot[] = querySnapshot.docs;
        for (const doc of docs) {
            if (doc.id === jsonContent.eventId)
                existeevento = true;
        }
    });
    return existeevento;
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

async function updatePlayerStats(teamId: string, userId: string, stat: any) {

    let Statistics: any = {}
    const query = await db.collection('memberships').where('teamId','==',teamId).where('userId', "==", userId);
    let docExists: boolean = false;
    let isPlayer: boolean = true;
    let docid : string = "";
    //let stadisticsPlayer;
    await query.get().then(async (querySnapshot: any) => {
        for (const doc  of querySnapshot.docs) {
            docid = doc.id;
            docExists = true;
            Statistics = doc.data().stats;
            //for (const key in stats) {
              //  if (jsonContent.hasOwnProperty(key)) {
                    for (const key in Statistics) {
                        if (Statistics.hasOwnProperty(key)) {
                            if(key === stat) Statistics[key] += 1;
                        }
                    }
                    
                //}
            //}
            if (doc.data().type !== "player") {
                isPlayer = false;
            }
        }
    });

    if (!docExists) {
        return //res.status(400).send("UMS3");
    }

    if(!isPlayer) {
        return //res.status(400).send("UMS4");
    }
    console.log("Stats of player: "+ userId);
    console.log(Statistics);
    await db.collection('memberships').doc(docid).update({
        stats: Statistics,
        //state: jsonContent.state
    })
}
