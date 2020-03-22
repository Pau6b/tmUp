"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*imports*/
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("../permissions.json");
//import * as user from './User/User';
/*end-of-imports*/
/*configuration*/
const app = express();
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tmup-908e4.firebaseio.com"
});
app.use(cors({ origin: true }));
/*end-of-configuration */
//Per correr el development server => npm run serve dins de la carpeta de functions
var user = require('./User/User');
app.use('/users', user);
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map