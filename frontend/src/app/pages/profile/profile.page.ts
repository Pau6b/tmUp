import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

import { ActionSheetController, MenuController } from '@ionic/angular';

import { apiRestProvider } from '../../../providers/apiRest/apiRest';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //inicializacion variables
  myPhoto: any;
  profileInfo;

  ngOnInit() {
    this.proveedor.getProfileInfo()
    .subscribe(
      (data) => { 
        console.log("------------------------");
        console.log(this.profileInfo);
        console.log("------------------------");
        console.log(data);
        console.log("------------------------");
        this.profileInfo = data;
        
      },
      (error) => {console.log(error);}
    );
  }

  //declarar formulario this.profileInfo.displayname this.profileInfo.email
  updateForm = this.formBuilder.group({
    userName: [ 
      "juanjo", [Validators.required, Validators.minLength(3)]
      //this.profileInfo.displayname, [Validators.required, Validators.minLength(3)]
    ],
    email: [
      "juanjo@tmup.com", [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$') ]
      //this.profileInfo.email, [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$') ]
    ]
  });

  public errorMessages = {
    userName: [
      { type: 'required', message: 'Nombre es necesario'},
      { type: 'minlength', message: 'Nombre debe tener más de 3 letras'}
    ],
    email: [
      { type: 'required', message: 'Email es necesario' },
      { type: 'pattern', message: 'Email no válido' }
    ]
  }

  public InputClick: boolean = false;

  
  constructor(
    public formBuilder: FormBuilder,
    public proveedor:apiRestProvider,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public authService: AuthService
  ) { }

  

  //getters for form
  get userName() {
    return this.updateForm.get("userName");
  }
  get email() {
    return this.updateForm.get("email");
  }

  //submit update form
  updateProfileUser() {
    this.proveedor.updateProfileInfo(this.updateForm.get('userName').value, this.updateForm.get('email').value)
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

  onInputClick() {
    if (this.InputClick === false ) {
      this.InputClick = true;
    }
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      message: 'Recibirá un correo electrónico en (correo electronico) para realizar el cambio de contraseña. ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Comfirmar',
          handler: () => {
            this.authService.recover('csanchezflaquer@gmail.com');
            console.log('OK clicked');
          }
        }
      ]
    });
    await alert.present(); 
  }
}
