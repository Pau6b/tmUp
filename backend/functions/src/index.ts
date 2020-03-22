/*imports*/
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
const serviceAccount = require("../permissions.json");
/*end-of-imports*/

/*configuration*/
const app = express(); 
const admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tmup-908e4.firebaseio.com"
});

app.use( cors( { origin: true } ) );
/*end-of-configuration */

//Per correr el development server => npm run serve dins de la carpeta de functions

/* --- begin of routes --- */

const usersHandler = require('./Users/Users');
app.use('/users', usersHandler);


const teamsHandler = require('./Teams/Teams');
app.use('/teams', teamsHandler);

/* --- end of routes --- */

exports.app = functions.https.onRequest(app);