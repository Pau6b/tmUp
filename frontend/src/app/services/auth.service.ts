import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  signUpUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      //assign user created to the currentUser
    });
  }

  /* logout function
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
  */

}
