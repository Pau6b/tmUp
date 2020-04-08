import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;
  error: any;

  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private router: Router, 
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

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se ha enviado un mensaje a tu correo electrónico.',
      duration: 10000,
      position: "bottom",
    });
    await toast.present();
  }

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
    .then(function() {
      console.log('Signed out!');
    })
    .catch(function(error) {
      //handle error
      console.log(error.message);
    });
  }
  

}
