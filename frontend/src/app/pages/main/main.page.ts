import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  
  welcome;
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
  
  constructor(
    private menuCtrl: MenuController,
    private apiProv: apiRestProvider
  ) { }

  ngOnInit() {
    //call api to get notifications

    if(this.NoticiesArray == null) this.welcome = true;
    else this.welcome = false;
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

}
