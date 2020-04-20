import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  logInForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$')
      ]
    ],
    password: ['', [Validators.required]]
  });

  logInError = false;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  get email() {
    return this.logInForm.get("email");
  }
  get password() {
    return this.logInForm.get("password");
  }

  logIn() {
    this.authService.signIn(this.logInForm.get('email').value, this.logInForm.get('password').value)
    .then(() => {
      this.navCtrl.navigateRoot('normative');
    })
    .catch((error:firebase.FirebaseError) => {
      this.logInError=true;
    });
    
  }
}
