
const express = require('express');
const app = express();
//const {Storage} = require('@google-cloud/storage');
//import admin = require("firebase-admin");
//const db = admin.firestore();
//const Multer = require('multer');
//const storage = new Storage();

//const bucket = storage.bucket("tmup-908e4.appspot.com");
/*

app.post('/upload', (req, res) => {
    (async () => {
        try {
            //const storageRef = admin.storage().ref();
            //const tacticsRef = storageRef.child('Tactics');
            bucket.upload("/home/lucas/Descargas/doc");
            return res.status(200).send("fichero subido");
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

*/
module.exports = app;
