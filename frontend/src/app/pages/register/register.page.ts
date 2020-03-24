import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { ActionSheetController } from '@ionic/angular';

import { FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  //declarar formulario
  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$')
      ]
    ],
    psw: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  myPhoto: any;

  public errorMessages = {
    name: [
      { type: 'required', message: 'Nombre es necesario'},
      { type: 'minlength', message: 'Nombre debe tener más de 3 letras'}
    ],
    email: [
      { type: 'required', message: 'Email es necesario' },
      { type: 'pattern', message: 'Email no válido' }
    ],
    psw: [
      { type: 'required', message: 'Contraseña es necesaria' },
      { type: 'minlength', message: 'Contraseña debe tener más de 6 carácteres' }
    ]
  }

  constructor(
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit() {
  }

  //getters for form
  get name() {
    return this.registerForm.get("name");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get psw() {
    return this.registerForm.get("psw");
  }

  //submit register form
  registerUser() {
    console.log(this.registerForm.value);
  }


  //Camera options
  async cameraOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose image from',
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