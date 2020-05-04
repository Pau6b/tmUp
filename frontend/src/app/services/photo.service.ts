import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {
  MediaCapture,
  MediaFile,
  CaptureError
} from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

const MEDIA_FOLDER_NAME = "my_tactics";

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  files = [];

  constructor(
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,

    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private photoViewer: PhotoViewer,
  ) { 
    console.log("Entro en el contructor del servicio")
    let path = this.file.dataDirectory;
    console.log("path => "+path)
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
        () => {
          this.loadFiles();
        },
        (error) => {
          this.file.createDir(path, MEDIA_FOLDER_NAME, false);
        }
      );
  }


  async alertSheetPictureOptions(){
    let actionSheet = await this.actionSheetCtrl.create({
        header: 'Add picture with',
        buttons: [
        {
          text: 'Take picture',
          icon: 'camera',
          handler: () => {
            return this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            return this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'undo',
        }
        ]
    });
    await actionSheet.present();
  }

  private takePicture(pictureSource:number){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100,
        correctOrientation: true,
        sourceType: pictureSource
    })
    .then((imageData) => {
      // imageData is a base64 encoded string
      let base64Image = "data:image/jpeg;base64," + imageData;
      // Variable to select the last picture taken by the ID
      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', base64Image);
      
      return base64Image;
    });
  }

  //-------------------------------------------------------------------------------------
  //                                    PRUEBA
  //-------------------------------------------------------------------------------------
  getFiles(){
    return this.files;
  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
      res => {
        this.files = res;
      },
      err => console.log('error loading files: ', err)
    );
  }

  async selectMedia() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'What would you like to add?',
      buttons: [
        {
          text: 'Capture Image',
          icon: 'camera',
          handler: () => {
            this.captureImage();
          }
        },
        {
          text: 'Load Files',
          icon: 'file',
          handler: () => {
            this.pickFiles();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
 
  pickFiles() {
    this.imagePicker.getPictures({}).then(
      results => {
        for (var i = 0; i < results.length; i++) {
          this.copyFileToLocalDir(results[i]);
        }
      }
    );
 
    // If you get problems on Android, try to ask for Permission first
    // this.imagePicker.requestReadPermission().then(result => {
    //   console.log('requestReadPermission: ', result);
    //   this.selectMultiple();
    // });
  }
 
  captureImage() {
    this.mediaCapture.captureImage().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          this.copyFileToLocalDir(data[0].fullPath);
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  copyFileToLocalDir(fullPath) {
    console.log("-----------------Entro en el copyFile------------------");
    let myPath = fullPath;
    console.log(myPath);
    // Make sure we copy from the right location
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }
    
    const newName = myPath.split('.').pop();

    console.log(newName);

    const name = myPath.substr(myPath.lastIndexOf('/') + 1);

    console.log(name);

    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);

    console.log(copyFrom);

    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

    console.log(copyTo);
 
    this.file.copyFile(copyFrom, name, copyTo, newName).then(
      success => {
        this.loadFiles();
      },
      error => {
        console.log('error: ', error);
      }
    );
    console.log("-----------------Acabo el copyFile------------------");
  }
 
  openFile(f: FileEntry) {
    if (f.name.indexOf('.pdf') > -1 || f.name.indexOf('.doc') > -1) {
      

    } else if (f.name.indexOf('.jpg') > -1 || f.name.indexOf('.jpeg') > -1) {
      // E.g: Use the Photoviewer to present an Image
      this.photoViewer.show(f.nativeURL, 'MY awesome image');
    }else{
      console.log("no se reconoce el tipo de fichero. Recuerde solo ['.doc', '.pdf', '.jpg', '.jpeg']")
    }
  }
 
  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    this.file.removeFile(path, f.name).then(() => {
      this.loadFiles();
    }, err => console.log('error remove: ', err));
  }

  
}
