import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { CalendarComponent } from 'ionic2-calendar/calendar';
import { LoadingController } from '@ionic/angular';

import { apiRestProvider } from '../../../providers/apiRest/apiRest'
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  @ViewChild(CalendarComponent ,{static: false}) myCal: CalendarComponent;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    startingDay: "1",
    queryMode: 'remote'
  };

  selectedDate = new Date();
  currentMonth = this.datePipe.transform(new Date(), 'MMMM yyyy');
  role;

  eventSource = [];

  constructor(
    private apiProv: apiRestProvider,
    private datePipe: DatePipe,
    private loadingCtrl: LoadingController,
    private router: Router,
    private principalPage: AppComponent
  ) {}

  ngOnInit() {
    this.role = this.principalPage.role;
  }

  ionViewWillEnter() {
    this.loadMonthEvents(new Date().getMonth());
  }

  private async loadMonthEvents(month) {
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.apiProv.getEventsOfMonth( month )
    .subscribe( (events) => {
      this.eventSource = [];
      let tmp: any;
      tmp = events;
      tmp.forEach(element => {
        let aux = {
          id: element.id,
          title: element.title,
          startTime: new Date(element.startTime),
          endTime: new Date(element.endTime),
          allDay: element.allDay,
          type: element.type,
          location: element.location,
          rival: element.rival,
          description: element.description
        }
        this.eventSource.push(aux);
      });
      this.myCal.loadEvents();
      loading.dismiss();
    });
  }

  //to know which type of events are
  eventExists(events, type) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (type === 'training' && event.type === 'training') return true;
      else if (type === 'match' && event.type === 'match') return true;
    }
  }

  addEvent() {
    this.router.navigate(['/add-event']);
  }

  onCurrentDateChanged = (ev: Date) => {
    if(this.currentMonth.toString() != this.datePipe.transform(ev, 'MMMM yyyy') ) {
      this.loadMonthEvents(ev.getMonth());
    }
  };

  onViewTitleChanged(title) {
    this.currentMonth = title;
  }

  onEventSelected(event) {
    this.router.navigate(['/event', event.id]);
  }

  onTimeSelected(ev) {
    this.selectedDate = ev.selectedTime;
  }

  //arrows to previous/next functions
  nextMonth(){
    this.myCal.slideNext();
  }
  
  previousMonth(){
    this.myCal.slidePrev();
  }

}
