"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*imports*/
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const serviceAccount = require("../permissions.json");
/*end-of-imports*/
/*configuration*/
const app = express();
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tmup-908e4.firebaseio.com",
    storageBucket: "gs://tmup-908e4.appspot.com"
});
app.use(cors({ origin: true }));
app.use(expressSession({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*end-of-configuration */
//Per correr el development server => npm run serve dins de la carpeta de functions
/* --- before all requests --- */
/*
app.use((req, res, next) => {
  const token
            await document.update({
                email: jsonContent.email,
                userName: jsonCon= req.headers.token;
  admin.auth.verifyIdToken(token)
  .then((payload : any) => {
    next(payload);
  })
  .catch((error: any) =>{
    res.status(401).send("Unauthorized");
  } );
});
*/
/* --- end of before all requests --- */
/* --- begin of routes --- */
const usersHandler = require('./Users/Users');
app.use('/users', usersHandler);
const teamsHandler = require('./Teams/Teams');
app.use('/teams', teamsHandler);
const eventsHandler = require('./Teams/Events/Events');
app.use('/:teamId/events', eventsHandler);
const photosHandler = require('./Teams/Events/Photos/Photos');
app.use('/teams/events/photos', photosHandler);
const rivalAnalysisHandler = require('./Teams/Events/RivalAnalysis/RivalAnalysis');
app.use('/teams/events/rivalAnalysis', rivalAnalysisHandler);
const normativesHandler = require('./Teams/Normatives/Normatives');
app.use('/teams/normatives', normativesHandler);
const tacticsHandler = require('./Teams/Tactics/Tactics');
app.use('/teams/tactics', tacticsHandler);
const membershipsHandler = require('./Memberships/Memberships');
app.use('/memberships', membershipsHandler);
const finesHandler = require('./Memberships/Fines/Fines');
app.use('/memberships/fines', finesHandler);
app.use(cors({ origin: true }));
app.use(expressSession({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* --- end of routes --- */
exports.app = functions.https.onRequest(app);
const db = admin.firestore();
exports.onUserCreate = functions.auth.user().onCreate((user) => {
    (async () => {
        try {
            await db.collection('users').doc('/' + user.email + '/')
                .create({
                email: user.email,
            });
        }
        catch (error) {
            console.log(error);
        }
    })().then().catch();
});
/*
exports.onUserDelete = functions.auth.user().onDelete((user) => {

});
*/
//# sourceMappingURL=index.js.map