import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController
  ) { }


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

}
