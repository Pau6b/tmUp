import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, MenuController } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;

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
    public authService: AuthService,
    private google: GooglePlus,
    private platform: Platform,
    public loadingController: LoadingController,
    private router: Router, 
    private fireAuth: AngularFireAuth
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
      this.navCtrl.navigateRoot('team-list');
    })
    .catch((error:firebase.FirebaseError) => {
      this.logInError=true;
    });
    
  }


  loginGoogle() {
    let params;
    if (this.platform.is('android')) {
      params = {
        'webClientId': '489608967542-8quc1uc92o0io6f8j1jgmtnban91r3f8.apps.googleusercontent.com',
        'offline': true
      }
    }
    else {
      params = {}
    }
    this.google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(["/profile"]);
        this.loading.dismiss();
      })


  }
  onLoginError(err) {
    console.log(err);
  }


}
