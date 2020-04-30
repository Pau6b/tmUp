import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { apiRestProvider } from '../../providers/apiRest/apiRest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;

  error: any;
  loading: any;
  provider = new firebase.auth.GoogleAuthProvider();
  user;

  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private router: Router, 
    public loadingController: LoadingController,
    private apiProv: apiRestProvider
  ) { 
    //to test login
    if(this.afAuth.authState != null) this.logOut();

    //observable of Firebase Authentication
    this.afAuth.auth.onAuthStateChanged( (user) => {
      if(user) {
        this.currentUser = user;
        this.afAuth.auth.currentUser.getIdToken(true)
        .then( (idtoken) => {
          apiProv.setToken(idtoken.toString());
          console.log(idtoken.toString);
        },
        (err) => {
          console.log('error setting token ' + err.message);
        })
      } else {
        this.currentUser = null;
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
      let token = (<any>result).credential.accessToken;
      this.apiProv.setToken(token);
      console.log(token);
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
      })
      .catch(err => {
        this.error = err.message;
      });
  }

   //logout function
  logOut() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
  

}
