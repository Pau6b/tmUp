import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { not } from '@angular/compiler/src/output/output_ast';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  providers: [DatePipe]
})
export class MainPage implements OnInit {

  welcome = false;
  noticies;

  public WelcomeMsgs = [
    {
      url: '/calendar',
      title: '',
      description: '',
      image: 'calendar-banner.jpg'
    },
    {
      url: '/chat',
      title: '',
      description: '',
      image: 'chat-online.png'
    },
    {
      url: '/tactics',
      title: '',
      description: '',
      image: 'tacticas-banner.jpg'
    },
    {
      url: '/main', /*cambiar a estadisticas*/
      title: '',
      description: '',
      image: 'triangle.png'
    }
  ];
  
  
  public Reminders = [
    {
      id: '',
      title: '',
      day: ''
    },
    {
      id: '',
      title: '',
      day: ''
    }
  ];


  public News = [];

  constructor(
    private menuCtrl: MenuController,
    private apiProv: apiRestProvider,
    private router: Router,
    private loadCtrl: LoadingController,
    private translateService: TranslateService,
    private datePipe: DatePipe
  ) {
  }

  async WelcomeMessages() {
    this.translateService.get('MAIN').subscribe(
      async value => {        
        this.WelcomeMsgs[0].title = value.title_calendar;
        this.WelcomeMsgs[0].description = value.description_calendar;
        this.WelcomeMsgs[1].title = value.title_chat;
        this.WelcomeMsgs[1].description = value.description_chat;
        this.WelcomeMsgs[2].title = value.title_tactics;
        this.WelcomeMsgs[2].description = value.description_tactics;
        this.WelcomeMsgs[3].title = value.title_stadistics;
        this.WelcomeMsgs[3].description = value.description_stadistics;
      }
    );
  }

  ngOnInit() {
    //call api to get notifications
    this.getWelcome();
    this.getReminders();
    this.getNoticies();
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  onEventSelected(event_id) {
    this.router.navigate(['/event', event_id]);
  }

  getWelcome() {
    this.welcome = false;
    this.WelcomeMessages();
  }

  async getReminders() {
    this.translateService.get('MAIN').subscribe(
      async value => {
        let val1 = value.title_next_match;
        let val2 = value.title_next_training;
        const loading = await this.loadCtrl.create();
        loading.present();
        this.apiProv.getNextMatch().then( (data) => {
          this.Reminders[0].title = val1;
          if ( data[0].length == 0 ) this.Reminders[0].day = null;
          else {
            this.Reminders[0].id = data[0].id;
            this.Reminders[0].day = data[0].startTime;
          }
        })
        this.apiProv.getNextTraining().then( (data) => {
          this.Reminders[1].title = val2;
          if ( data[0].length == 0 ) this.Reminders[1].day = null;
          else {
            this.Reminders[1].id = data[0].id;
            this.Reminders[1].day = data[0].startTime;
          }
        })
        loading.dismiss();
      }
    );
  }

  getNoticies() {
    this.translateService.get('MAIN').subscribe(
      async value => {
        var val1 = value.matchAdded;
        var val2 = value.machDeleted;
        var val3 = value.matchUpdated;
        var val4 = value.trainingAdded;
        var val5 = value.trainingDeleted;
        var val6 = value.tacticaAdded;
        var val7 = value.tacticaDeleted;
        var val8 = value.normativaAdded;
        var val9 = value.normativaDeleted;
        var val10 = value.at;
        var val11 = value.location;
        var val12 = value.rival;


        this.apiProv.getNews().then( (data) => {
          this.noticies = data;
          if ( this.noticies.length == 0 ) this.noticies = null;
          else {
            for ( let not of this.noticies ) {
              if ( not.typeNoticia === 'matchAfegit' ) {
                var dia = this.datePipe.transform(not.startTime, 'dd-MM');
                var hora = this.datePipe.transform(not.startTime, 'HH:mm');
                var x = {
                  type: 'calendar',
                  icon: 'calendar',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val1 + dia + val10 + hora + val11 + not.location.name + val12 + not.rival,
                  url: '/calendar'
                }
                this.News.push(x);
              }
              else if ( not.typeNoticia === 'matchDeleted' ) {
                var dia = this.datePipe.transform(not.startTime, 'dd-MM');
                var hora = this.datePipe.transform(not.startTime, 'HH:mm');
                var x = {
                  type: 'calendar',
                  icon: 'calendar',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val2 + dia + val10 + hora + val11 + not.location.name + val12 + not.rival,
                  url: '/calendar'
                }
                this.News.push(x);
              }
              else if ( not.typeNoticia === 'matchUpdated' ) {
                var dia = this.datePipe.transform(not.startTime, 'dd-MM');
                var hora = this.datePipe.transform(not.startTime, 'HH:mm');
                var x = {
                  type: 'calendar',
                  icon: 'calendar',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val3 + dia + val10 + hora + val11 + not.location.name + val12 + not.rival,
                  url: '/calendar'
                }
                this.News.push(x);
              }
              else if ( not.typeNoticia === 'trainingAfegit' ) {
                var dia = this.datePipe.transform(not.startTime, 'dd-MM');
                var hora = this.datePipe.transform(not.startTime, 'HH:mm');
                var x = {
                  type: 'calendar',
                  icon: 'calendar',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val4 + dia + val10 + hora + val11 + not.location.name,
                  url: '/calendar'
                }
                this.News.push(x);
              }
              else if ( not.typeNoticia === 'trainingDeleted' ) {
                var dia = this.datePipe.transform(not.startTime, 'dd-MM');
                var hora = this.datePipe.transform(not.startTime, 'HH:mm');
                var x = {
                  type: 'calendar',
                  icon: 'calendar',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val5 + dia + val10 + hora + val11 + not.location.name,
                  url: '/calendar'
                }
                this.News.push(x);
              }
              else if ( not.typeNoticia === 'tacticaAfegida' ) {
                var x = {
                  type: 'tactics',
                  icon: 'easel',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val6 + not.nombreFile + "",
                  url: '/tactics'
                }
                this.News.push(x);
              }
              else if ( not.typeNoticia === 'tacticaDeleted' ) {
                var x = {
                  type: 'tactics',
                  icon: 'easel',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val7 + not.nombreFile + "",
                  url: '/tactics'
                }
                this.News.push(x);
              }
              else if ( not.typeNoticia === 'normativaAfegida' ) {
                var x = {
                  type: 'normativa',
                  icon: 'document-text',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val8 + not.nombreFile + "",
                  url: '/normative'
                }
                this.News.push(x);
              }
              else if ( not.typeNoticia === 'normativaDeleted' ) {
                var x = {
                  type: 'normativa',
                  icon: 'document-text',
                  date: not.dateNoticia,
                  title: not.title,
                  information: val9 + not.nombreFile + "",
                  url: '/normative'
                }
                this.News.push(x);
              }
            }
          }
        })
      }
    );    
  }
  
}
