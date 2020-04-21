import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;
  error: any;
  loading: any;

  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private router: Router, 
    private google: GooglePlus,
    private platform: Platform,
    public loadingController: LoadingController,
    public authService: AuthService,
    public alertController: AlertController
  ) { }

  signUpUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      //assign user created to the currentUser
    });
  }

  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  //login con google



//--------------------------------------------------------------------------------------------------------------------------------------------------//


  async doGoogleLogin(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.google.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '489608967542-8quc1uc92o0io6f8j1jgmtnban91r3f8.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(() => {
          this.router.navigate(["/user"]);
      }, (error) => {
        console.log(error);
        if(!this.platform.is('cordova')){
          this.presentAlert();
        }
      })
      loading.dismiss();
    }

  async presentAlert() {
    const alert = await this.alertController.create({
       message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
       buttons: ['OK']
     });

    await alert.present();
  }

  async presentLoading(loading) {
    return await loading.present();
  }





//--------------------------------------------------------------------------------------------------------------------------------------------------------------------//






















  async loginGoogle() {
    let params;
    if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('desktop')  || this.platform.is('cordova')) {
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
        console.log("Entro aqui")
        const { idToken, accessToken } = response
        this.onLoginSuccess(idToken, accessToken);
        console.log("Login amb Google correcte");
      }).catch((error) => {
        console.log("Dona error")
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }

  onLoginSuccess(accessToken, accessSecret) {
    console.log("login success");
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.afAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(["/profile"]);
        this.loading.dismiss();
      })
  }

  onLoginError(err) {
    console.log(err);
  }

  //mensaje para indicar el cambio de contraseña
  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se ha enviado un mensaje a tu correo electrónico.',
      duration: 10000,
      position: "bottom",
    });
    await toast.present();
  }

  //cambiar contraseña function
  recover(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(data => {
        this.showToast();
        this.router.navigateByUrl('/profile');
        console.log(data);
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

   //logout function
  logOut() {
    this.afAuth.auth.signOut()
    .then(data=> {
      this.router.navigateByUrl('/login');
      console.log('Signed out!');
    })
    .catch(function(error) {
      //handle error
      console.log(error.message);
    });
  }
  

}
