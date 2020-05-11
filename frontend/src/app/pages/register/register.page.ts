import { Component, OnInit } from '@angular/core';

import {NavController, MenuController, AlertController } from '@ionic/angular';

import { FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../../services/auth.service'
import { PhotoService } from '../../services/photo.service'
import { Router } from '@angular/router';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  emailUsed: boolean = false;
  myPhoto: any;

  public constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public photoService: PhotoService,
    private alertCtrl: AlertController,
    private router: Router,
    private apiProv: apiRestProvider
    ) { }
 
  //declarar formulario
  registerForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$')
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public errorMessages = {
    userName: [
      { type: 'required', message: 'Nombre es necesario'},
      { type: 'minlength', message: 'Nombre debe tener más de 3 letras'}
    ],
    email: [
      { type: 'required', message: 'Email es necesario' },
      { type: 'pattern', message: 'Email no válido' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es necesaria' },
      { type: 'minlength', message: 'Contraseña debe tener más de 6 carácteres' }
    ]
  }

  public ngOnInit() {
  }

  //disable side menu for this page
  public ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  //getters for form
  public get userName() {
    return this.registerForm.get("userName");
  }
  public get email() {
    return this.registerForm.get("email");
  }
  public get password() {
    return this.registerForm.get("password");
  }

  //submit register form
  public registerUser() {
    this.authService.signUpUser(this.registerForm.value)
    .then((user) => {
      user.user.updateProfile({
        displayName: this.registerForm.get('userName')
      });
      this.emailUsed = false;
      this.apiProv.setUser(user.user.email);
      //xa is the token
      this.apiProv.setToken(user.user.xa);
      this.presentAlert('¡Felicidades!', 'Para disfrutar de las ventajas de tmUp, valida tu cuenta con el correo que te hemos enviado y crea o únete a un equipo.')
    },
    (error) => {
      this.emailUsed = true;
    });
  }
  
  public cameraOptions() {
    this.photoService.alertSheetPictureOptions();
  }

  public async presentAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [{
        text: 'Continuar',
        handler: () => {
          this.router.navigate(['/add-team']);
        }
      }]
    });
    await alert.present();
  }

}