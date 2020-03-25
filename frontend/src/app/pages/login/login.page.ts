import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public authService: AuthService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.signIn(this.email, this.password).then(() => {
      this.navCtrl.navigateRoot('team-list');
      console.log('he navegado');
    }).catch((error) => {
      console.log(error);
    });
  }

}
