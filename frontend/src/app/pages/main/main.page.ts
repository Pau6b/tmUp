import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  
  welcome = false;
  hora = '2020-05-03T16:40:42';
  NoticiesArray;
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
      id: 'fWwcDX1BwHJmpzwgCGNK',
      title: 'Próximo Partido:',
      day: '2020-05-03T16:40:42',
      hour: '2020-05-03T16:40:42'
    },
    {
      id: 'fWwcDX1BwHJmpzwgCGNK',
      title: 'Próximo Entrenamiento:',
      day: '2020-05-03T16:40:42',
      hour: '2020-05-03T16:40:42'
    }
  ];


  constructor(
    private menuCtrl: MenuController,
    private apiProv: apiRestProvider,
    private router: Router
  ) { }

  ngOnInit() {
    //call api to get notifications
    this.welcome = false;
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  onEventSelected(event_id) {
    this.router.navigate(['/event', event_id]);
  }
  

}
