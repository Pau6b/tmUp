import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private router: Router,
    private apiProv: apiRestProvider
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
    .then( (data) => {
      this.apiProv.setUser(data.user.email);
      //xa is the token
      this.apiProv.setToken(data.user.xa);
      this.router.navigate(['/team-list']);
    },
    (error) => {
      this.logInError = true;
    });
  }

  logInWithGoogle() {
    this.authService.loginGoogle();
  }

}
