import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
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
      } else {
        this.currentUser = null;
      }
    }) 
  }

  signUpUser(data): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
  }

  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  //login con google
  loginGoogle() {
    firebase.auth().signInWithPopup(this.provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token: any = result.user.getIdToken();
      this.apiProv.setToken(token);
      this.apiProv.setUser(result.user.email);
      // if new user save display name
      if(result.additionalUserInfo.isNewUser) {
        result.user.updateProfile({
          displayName: result.user.displayName
        })
      }
      
      //xa is the token
      // The signed-in user info.
      this.currentUser = result.user;
      this.router.navigate(['/team-list']);
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
    this.apiProv.setToken("");
    this.router.navigateByUrl('/login');
  }
  

}
