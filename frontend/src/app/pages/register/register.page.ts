import { Component, OnInit } from '@angular/core';

import {NavController, MenuController } from '@ionic/angular';

import { FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { PhotoService } from '../../services/photo.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
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
  
  emailUsed: boolean = false;
  myPhoto: any;

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

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private photoService: PhotoService
    ) { }

  ngOnInit() {
  }

  //disable side menu for this page
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  //getters for form
  get userName() {
    return this.registerForm.get("userName");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }

  //submit register form
  registerUser() {
    this.authService.signUpUser(this.registerForm.get('email').value, this.registerForm.get('password').value)
    .then(() => {
      this.emailUsed = false;
      this.navCtrl.navigateRoot('gettingstarted');
    },
    (error) => {
      this.emailUsed = true;
      console.log(error.message);
    }
    )
  }

  cameraOptions(){
    this.photoService.cameraOptions();
  }
}