import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;
  error: any;
  loading: any;
  provider = new firebase.auth.GoogleAuthProvider();
  token;
  user;

  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private router: Router, 
    private platform: Platform,
    public loadingController: LoadingController,
    public authService: AuthService,
    public alertController: AlertController,
    public navCtrl: NavController,
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
  loginGoogle() {
    firebase.auth().signInWithPopup(this.provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      this.token = (<any>result).credential.accessToken;
      console.log(this.token);
      // The signed-in user info.
      this.user = result.user;
      console.log(this.user);
      this.navCtrl.navigateRoot('team-list');
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
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
