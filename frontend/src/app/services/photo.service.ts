import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';

import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';
import { Chooser} from '@ionic-native/chooser/ngx';
import { StorageService } from 'src/app/services/storage.service';

import { FilePath } from '@ionic-native/file-path/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  files = [];

  constructor(
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private mediaCapture: MediaCapture,
    private file: File,
    private platform: Platform,
    private chooser: Chooser,
    private storage: StorageService,
    private filePath: FilePath,
    private iab: InAppBrowser
  ) { 
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
  getFiles(page, teamId){
    return this.storage.getFiles(page, teamId);
  }

  async selectMedia(page, teamId) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'What would you like to add?',
      buttons: [
        {
          text: 'Capture Image',
          icon: 'camera',
          handler: () => {
            this.captureImage(page, teamId);
          }
        },
        {
          text: 'Load File',
          icon: 'document',
          handler: () => {
            this.selectFiles(page, teamId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
    return this.getFiles(page, teamId);
  }
 
  captureImage(page, teamId) {
    this.mediaCapture.captureImage().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          //this.storage.uploadFileToStorage(data, 'tactics_picture', page, teamId, 'image/jpg');
          let dirPath = data[0].fullPath;
          //Borramos el nombre del fichero de la uri
          let dirPathSegments = dirPath.split('/');
          dirPathSegments.pop();
          dirPath = dirPathSegments.join('/')
          
          this.file.readAsArrayBuffer(dirPath, data[0].name).then(
            (buffer) => {
              this.storage.uploadFileToStorage(buffer, data[0].name, page, teamId, data[0].type);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  selectFiles(page, teamId) {
    this.chooser.getFile('image/jpg, image/jpeg, application/pdf').then(
      (result) => {
        if(this.platform.is('ios')){
          this.file.resolveLocalFilesystemUrl(result.uri).then(
            (newURL) => {
              let dirPath = newURL.nativeURL;

              //Borramos el nombre del fichero de la uri
              let dirPathSegments = dirPath.split('/');
              dirPathSegments.pop();
              dirPath = dirPathSegments.join('/')
              
              this.file.readAsArrayBuffer(dirPath, newURL.name).then(
                (buffer) => {
                  console.log("Leemos los datos del fichero -> "+buffer);
                  this.storage.uploadFileToStorage(buffer, newURL.name, page, teamId, result.mediaType);
                },
                (err) => {
                  console.log(err);
                }
              );
            }
          )
        } else if(this.platform.is('android')){
          this.filePath.resolveNativePath(result.uri).then(
            (newURL) => {
              let dirPath = newURL;
              //Borramos el nombre del fichero de la uri
              let dirPathSegments = dirPath.split('/');
              dirPathSegments.pop();
              dirPath = dirPathSegments.join('/')
              
              this.file.readAsArrayBuffer(dirPath, result.name).then(
                (buffer) => {
                  this.storage.uploadFileToStorage(buffer, result.name, page, teamId, result.mediaType);
                },
                (err) => {
                  console.log(err);
                }
              );
            }
          )
        }
        
      },
      (err) =>{
        alert(JSON.stringify(err));
      }
    )
  }

  openFile(f) {
    this.iab.create(f.url);
  }
 
  deleteFile(f) {
    
  }
  
}
