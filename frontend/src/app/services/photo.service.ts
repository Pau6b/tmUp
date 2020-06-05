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

  //-------------------------------------------------------------------------------------
  //                                    PRUEBA
  //-------------------------------------------------------------------------------------
  getFiles(page, Id){
    return this.storage.getFiles(page, Id);
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
          text: 'Load Image',
          icon: 'image',
          handler: () => {
            this.selectFiles(page, teamId, "image/jpg, image/jpeg");
          }
        },
        {
          text: 'Load File',
          icon: 'document',
          handler: () => {
            this.selectFiles(page, teamId, "application/pdf, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document");
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
            }
          );
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  selectFiles(page, teamId, type) {
    this.chooser.getFile(type).then(
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
                  this.storage.uploadFileToStorage(buffer, newURL.name, page, teamId, result.mediaType);
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
    if(this.platform.is('ios')) this.iab.create(f.url);
    else{
      window.open(encodeURI("https://firebasestorage.googleapis.com/v0/b/tmup-908e4.appspot.com/o/normatives%2FBlfT4WQIvjC9wPRqlt2k%2FRG%201314.pdf"), "_system", "location=yes,enableViewportScale=yes");
    }
  }
  
}