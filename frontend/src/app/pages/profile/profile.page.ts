import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

import { apiRestProvider } from '../../../providers/apiRest/apiRest';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';
import { DeleteAlertService } from 'src/app/services/delete-alert.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //inicializacion variables
  myPhoto: any;
  profileInfo;

  public  constructor(
    private formBuilder: FormBuilder,
    private apiProv: apiRestProvider,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private photoServ: PhotoService,
    private deleteAlert: DeleteAlertService,
    private storageServ: StorageService,
    private authServ: AuthService
  ) { }

  public ngOnInit() {
    this.apiProv.getMe()
    .subscribe(
      (data) => { 
        this.profileInfo = data;
        this.updateForm.patchValue({userName: this.profileInfo.userName});
        this.updateForm.patchValue({email: this.profileInfo.email});
        this.updateForm.controls['email'].disable();
      });
  }

  //declarar formulario this.profileInfo.displayname this.profileInfo.email
  updateForm = this.formBuilder.group({
    userName: [ 
      "", [Validators.required, Validators.minLength(3)]
    ],
    email: [
      "", [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$') ]
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

  //getters for form
  get userName() {
    return this.updateForm.get("userName");
  }
  get email() {
    return this.updateForm.get("email");
  }

  //submit update form
  public updateProfileUser() {
    console.log("entra a update");
    console.log(this.updateForm.get('userName').value);
    console.log(this.updateForm.get('email').value);
    this.apiProv.updateProfileInfo(this.updateForm.get('userName').value, this.updateForm.get('email').value)
  }

  //Camera options
  public async cameraOptions() {
    this.photoServ.alertSheetPictureOptions()
    .then( (photo) => {
      this.myPhoto = photo;
    })
  }

  public onInputClick() {
    if (this.InputClick === false ) {
      this.InputClick = true;
    }
  }

  public async presentConfirm() {
    const alert = await this.alertCtrl.create({
      message: 'Recibirá un correo electrónico en ' + this.profileInfo.email + ' para realizar el cambio de contraseña. ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Comfirmar',
          handler: () => {
            this.authService.recover(this.profileInfo.email);
          }
        }
      ]
    });
    await alert.present(); 
  }

  deleteUser() {
    this.deleteAlert.showConfirm("user", this.profileInfo.userName).then((res) => {
      if(res) {
        //delete User, logout, redirect to login
        this.apiProv.deleteUser(this.profileInfo.email).then(() => {
          this.storageServ.deleteUserFiles(this.profileInfo.email);
          this.authServ.logOut();
        })
      }
    })
  }

}
