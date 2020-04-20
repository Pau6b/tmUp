import * as express from 'express';
//var bodyParser = require('body-parser');
//import Multer = require('multer');
import fileUpload = require('express-fileupload');
//import { format } from 'util';
import admin = require("firebase-admin");
const {Storage} = require("@google-cloud/storage");
const app = express();
//const fs = require('fs');



const storage = new Storage({keyFilename: "storageKey.json"});

const bucketName = 'normativa';
async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}


import cors = require('cors');
import bodyParser = require('body-parser');
import morgan = require('morgan');

app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


app.post('/upload-avatar', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let avatar = req.files.avatar;
          console.log(avatar);
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          //avatar.mv('./uploads/' + avatar.name);

          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              /*data: {
                  name: avatar.sampleFile,
                  mimetype: avatar.mimetype,
                  size: avatar.size
              }*/
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});


/*
const multer = require('multer');
const storage = multer.memoryStorage();
//const fileUpload = multer({storage});

app.use('/*', fileUpload.single('file'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
*/
//app.use(fileUpload());

//const storage = new Storage();
//const bucketName = "gs://tmup-908e4.appspot.com";

//const storage = new Storage({keyFilename: "../../../permissions.json"});


app.get('/download', (req, res) => {
  (async () => {
      try {
        const jsonContent = JSON.parse(req.body);
        const file = admin.storage().bucket("gs://tmup-908e4.appspot.com").file("tactics/"+jsonContent.teamId+'/'+jsonContent.name);
        return res.status(200).send(file);
      }
      catch(error){
          console.log(error);
          return res.status(500).send(error) 
      }

  })().then().catch();
});
//const upload = multer({ storage: storage })
/*const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});
*/

//const bucket = storage.bucket("gs://tmup-908e4.appspot.com");

/*
app.post('/up', multer.single('filename'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err: any) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

*/


app.post("/upload", function(req, res, next) {
  (async () => {
    //console.log(req.files.photo);
    //console.log(req.file);
    try {
      await createBucket();

      //if(!req.files) res.status(400).send();
      let file = req.files;
      await storage.bucket("gs://tmup-908e4.appspot.com").put(file);
      //await uploadFile(file.path);
      //storageRef.child('Tactics/tactics.pdf').put(file);
      return res.status(200).send(req.files);
    }
    catch(error){
      console.log(error);
      return res.status(500).send(error);
    }
  })().then().catch();
});

/*
app.post('/up2', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

*/
app.delete('/delete', (req, res) => {
  (async () => {
      try {
        const jsonContent = JSON.parse(req.body);
        await admin.storage().bucket("gs://tmup-908e4.appspot.com").file("tactics/"+jsonContent.teamId+'/'+jsonContent.name).delete();
        return res.status(200).send();
      }
      catch(error){
          console.log(error);
          return res.status(500).send(error) 
      }
  })().then().catch();
});



module.exports = app;


