import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import { CalendarComponent } from 'ionic2-calendar/calendar';
import { LoadingController } from '@ionic/angular';

import { apiRestProvider } from '../../../providers/apiRest/apiRest'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  @ViewChild(CalendarComponent ,{static: false}) myCal: CalendarComponent;

  teamId = 'C0Wytx9JMIKgyIbfGAnC';

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    startingDay: "1",
    queryMode: 'remote'
  };

  selectedDate = new Date();
  currentMonth = this.datePipe.transform(new Date(), 'MMMM yyyy');

  eventSource = [];

  //to know which type of events are
  eventExists(events, type) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (type === 'training' && event.type === 'training') return true;
      else if (type === 'match' && event.type === 'match') return true;
    }
  }

  constructor(
    private router: Router,
    private api: apiRestProvider,
    private loadingCtrl: LoadingController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadMonthEvents(new Date().getMonth());
  }

  private async loadMonthEvents(month) {
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.api.getEventsOfMonth(this.teamId , month)
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
      console.log(this.eventSource);
    },
    (err) => {
      console.log(err.message);
    });
  }

  addEvent() {
    this.router.navigate(['/add-event']);
  }

  onCurrentDateChanged = (ev: Date) => {
    if(this.currentMonth.toString() != this.datePipe.transform(ev, 'MMMM yyyy') ) {
      console.log('events updated');
      
      this.loadMonthEvents(ev.getMonth());
    }
  };

  onViewTitleChanged(title) {
    this.currentMonth = title;
  }

  onEventSelected(event) {
    let navigationExtras: NavigationExtras = {
      state: {
        ev: event
      }
    };
    this.router.navigate(['/event'], navigationExtras);
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
