import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertController } from '@ionic/angular';

import { apiRestProvider } from '../providers/apiRest/apiRest';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  public selectedIndex = 0;
  data;
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

  public team;

  constructor(
    private alertCtrl: AlertController,
    private apiProv: apiRestProvider,
    private auth: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
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
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  public updateTeam() {
    if (this.apiProv.getTeam() != "") {
      this.apiProv.getCurrentTeam().subscribe((data) => {
        this.team = data;
        console.log("ESTOY EN APP COMPONENT");
        console.log(data);
      });
    }
  }

  async presentConfirm() {
    this.data = this.apiProv.getMe();
    const alert = await this.alertCtrl.create({
      message: 'Log out of' +  this.data.name +'?',
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
