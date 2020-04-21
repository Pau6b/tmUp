import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    private apiProv: apiRestProvider
  ) { }

  signUpUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.afAuth.auth.currentUser.getIdToken(true)
      .then((idToken) => {
        this.apiProv.setToken(idToken) 
        console.log('token setted succesfully!');
      },
      (err) => {
        console.log(err.message);
      });
    });
  }

  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  //login con google
  async loginGoogle() {
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
