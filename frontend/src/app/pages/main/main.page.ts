import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  welcome = false;
  public WelcomeMsgs = [
    {
      url: '/calendar',
      title: 'Añade y consulta eventos en tu calendario',
      description: 'Crea un calendario con los partidos y entrenamientos de la temporada.',
      image: 'calendar-banner.jpg'
    },
    {
      url: '/chat',
      title: 'Chatea con tu equipo',
      description: 'Chatea con tu entrenador y compañeros de equipo para una mejor comunicacion.',
      image: 'chat-online.png'
    },
    {
      url: '/tactics',
      title: 'Tacticas equipo',
      description: 'Estate informado de las tacticas de tu equipo.',
      image: 'tacticas-banner.jpg'
    },
    {
      url: '/main', /*cambiar a estadisticas*/
      title: 'Estadisticas de tu equipo y personales',
      description: 'Consulta las estadisticas de tu equipo y personales.',
      image: 'triangle.png'
    }
  ];
  
  public Reminders = [
    {
      id: '',
      title: 'Próximo Partido:',
      day: ''
    },
    {
      id: '',
      title: 'Próximo Entrenamiento:',
      day: ''
    }
  ];


  public News = [
    {
      type: 'calendar',
      icon: 'calendar',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'tactics',
      icon: 'easel',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'tactics',
      icon: 'easel',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'normativa',
      icon: 'document-text',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'stadistics',
      icon: 'bar-chart',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'stadistics',
      icon: 'bar-chart',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'calendar',
      icon: 'calendar',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'tactics',
      icon: 'easel',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'normativa',
      icon: 'document-text',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'calendar',
      icon: 'calendar',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'tactics',
      icon: 'easel',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },
    {
      type: 'stadstics',
      icon: 'bar-chart',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    },{
      type: 'calendar',
      icon: 'calendar',
      date: '2020-05-03T16:40:42',
      title: 'Titol',
      information: "S'ha afegit un nou partit el dia 25/05 a les 8:00h",
      url: ''
    }
  ];


  constructor(
    private menuCtrl: MenuController,
    private apiProv: apiRestProvider,
    private router: Router,
    private loadCtrl: LoadingController
  ) {
    this.welcome = false;
  }

  ngOnInit() {
    //call api to get notifications
    this.getWelcome();
    this.getReminders();
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  onEventSelected(event_id) {
    this.router.navigate(['/event', event_id]);
  }

  getWelcome() {
    this.welcome = false;
  }

  async getReminders() {
    const loading = await this.loadCtrl.create();
    loading.present();
    this.apiProv.getNextMatch().then( (data) => {
      if ( data[0].length == 0 ) this.Reminders[0].day = null;
      else {
        this.Reminders[0].id = data[0].id;
        this.Reminders[0].day = data[0].startTime;
      }
    })
    this.apiProv.getNextTraining().then( (data) => {
      if ( data[0].length == 0 ) this.Reminders[1].day = null;
      else {
        this.Reminders[1].id = data[0].id;
        this.Reminders[1].day = data[0].startTime;
      }
    })
    loading.dismiss();
  }
  
}
