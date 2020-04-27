
import * as express from 'express';
import bodyParser = require('body-parser');
//import Multer = require('multer');
import admin = require("firebase-admin");
//const {Storage} = require('@google-cloud/storage');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//const storage = new Storage();

app.get('/download', (req, res) => {
  (async () => {
      try {
        const jsonContent = JSON.parse(req.body);
        const file = admin.storage().bucket("gs://tmup-908e4.appspot.com").file(jsonContent.name);
        return res.status(200).send(file);
      }
      catch(error){
          console.log(error);
          return res.status(500).send(error) 
      }

  })().then().catch();
});
/*const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});*/

app.post("/upload", function(req, res) {
  (async () => {
    try {
      const jsonContent = JSON.parse(req.body);
      await admin.storage().bucket("gs://tmup-908e4.appspot.com").upload(jsonContent.path);
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
        const jsonContent = JSON.parse(req.body);
        await admin.storage().bucket("gs://tmup-908e4.appspot.com").file(jsonContent.name).delete();
        return res.status(200).send();
      }
      catch(error){
          console.log(error);
          return res.status(500).send(error) 
      }
  })().then().catch();
});



module.exports = app;


