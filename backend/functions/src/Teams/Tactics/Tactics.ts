import * as express from 'express';
const admin = require("firebase-admin");
//const {Storage} = require("@google-cloud/storage");
//const firebase = require("firebase");
const app = express();
const fs = require('fs');


app.post("/upload", (req, res) => {
  (async () => {
    try {
      //const storage = new Storage();
      const file = fs.readFile("/home/lucas/Escritorio/examen_Lucas_Pinilla/exam_doc.txt");
      await admin.storage("gs://tmup-908e4.appspot.com").bucket().upload(file);
      //const storageRef = admin.storage().ref();
      //const file = fs.readFile("/home/lucas/Escritorio/examen_Lucas_Pinilla/exam_doc.pdf");
      //storageRef.child('Tactics/tactics.pdf').put(file);
      return res.status(200).send();
    }
    catch(error){
      console.log(error);
      return res.status(500).send(error);
    }
  })().then().catch();
});

app.delete('/delete', (req, res) => {
  (async () => {
      try {
        const bucket = await admin.storage().bucket("gs://tmup-908e4.appspot.com/exam_doc.txt");
        const file = bucket.file("exam_doc.txt");
        file.delete().then().catch();
        return res.status(200).send();
      }
      catch(error){
          console.log(error);
          return res.status(500).send(error) 
      }
  })().then().catch();
});


module.exports = app;

