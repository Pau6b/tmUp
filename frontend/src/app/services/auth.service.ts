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

  /*user parameters {
    email: string,
    displayName: string
  }*/
  currentUser: any;
  token: any;
  currentTeam: null;

  error: any;
  loading: any;
  provider = new firebase.auth.GoogleAuthProvider();
  user;

  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private router: Router, 
    private platform: Platform,
    public loadingController: LoadingController
  ) { 
    //to test login
    if(this.afAuth.authState != null) this.logOut();

    //observable of Firebase Authentication
    this.afAuth.auth.onAuthStateChanged( (user) => {
      if(user) {
        this.currentUser = user;
          console.log(user.email + ' logged');
        this.afAuth.auth.currentUser.getIdToken(true)
        .then( (idtoken) => {
          this.token = idtoken.toString();
          console.log(this.token);
          console.log('token setted');
          //this.router.navigate(['team-list']);
        },
        (err) => {
          console.log('error setting token ' + err.message);
        })
      } else {
        this.currentUser = null;
        console.log('no user logged');
      }
    }) 
  }

  signUpUser(data): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
    .then( (user) => {
      if (user) {
        user.user.updateProfile({
          displayName: data.userName
        });
      }
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
      this.router.navigate(['team-list']);
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
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
  

}
