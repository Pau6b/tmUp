import * as express from 'express';
//import { Stream } from 'stream';
const admin = require("firebase-admin");
//const bucket = admin.storage().bucket();
//const db = admin.firestore();
const app = express();
//const {Storage} = require('@google-cloud/storage');

//const gcs = require('@google-cloud/storage')({keyFilename: "../../../permissions.json"});
// Creates a client
//const storage = new Storage();

/*
const googleStorage = require("@google-cloud/storage");
const Multer = require("multer");


const storage = googleStorage({
    projectId: "tmup-908e4",
    keyFilename: "../../../permissions.json"
  });
  
  const bucket = storage.bucket("tmup-908e4.appspot.com");

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
  });

  var serviceAccount = require("../../../permissions.json");

  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "tmup-908e4.appspot.com"
  });*/
  
  //var bucket = admin.storage().bucket();
  
  //bucket.upload('Local file to upload, e.g. ./local/path/to/file.txt')

app.post('/upload', (req, res) => {
    (async () => {
        try {
            //await uploadFile("./Tactics.ts").catch(console.error);
            //var bucket = admin.storage().bucket();
            //await bucket.uploadFile("./Tactics.ts");
            var storageRef = admin.storage().ref('tactics');
            storageRef.put("./Tactics.ts");
            /*
            const storageRef = admin.storage().ref();
            const tacticsRef = storageRef.child('Tactics');
            tacticsRef.upload("/home/lucas/Descargas/doc");*/
            return res.status(200).send("fichero subido");
        }
        catch(error){
            console.log(error);
            return res.status(500).send(error);
        }

    })().then().catch();
});

module.exports = app;
/*
async function uploadFile(filename: string) {
    await storage.bucket("tactics").upload(filename, {
      gzip: true,
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });

    //console.log(`${filename} uploaded to ${bucketName}.`);
  }*/

