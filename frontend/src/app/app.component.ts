import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: 'main',
      icon: 'home'
    },
    {
      title: 'Normativa',
      url: 'normative',
      icon: 'document-text'
    },
    {
      title: 'Tacticas',
      url: 'tactics',
      icon: 'easel'
    },
    {
      title: 'Estadísticas',
      url: '',
      icon: 'bar-chart'
    },
    {
      title: 'Chat',
      url: 'chat',
      icon: 'chatbubble-ellipses'
    },
    {
      title: 'Calendario',
      url: 'calendar',
      icon: 'calendar'
    },
    {
      title: 'Fisioterapeuta',
      url: '',
      icon: 'medkit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public auth: AuthService,
    public alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      message: 'Log out of (nombre usuario)?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Log Out',
          handler: () => {
            this.auth.logOut();
            console.log('LogOut clicked');
          }
        }
      ]
    });
    await alert.present(); 
  }  
}
