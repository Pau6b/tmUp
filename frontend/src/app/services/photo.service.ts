import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  base64Image; 
  myPhoto: any;

  constructor(
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController
    ) { }


  async alertSheetPictureOptions(){
    let actionSheet = await this.actionSheetCtrl.create({
        header: 'Add picture with',
        buttons: [
        {
          text: 'Take picture',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'undo',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
        ]
    });
    await actionSheet.present();
  }

  public takePicture(pictureSource:number){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100,
        correctOrientation: true,
        sourceType:pictureSource
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;

      // Variable to select the last picture taken by the ID
      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  //Camera options
  async cameraOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose file from',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Library',
          handler: () => {
            this.choosePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Camera error:' + err)
    });
  }

  choosePhoto() {
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Camera error:' + err)
    });
    
  }

}
