import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import { apiRestProvider } from '../../../providers/apiRest/apiRest'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    startingDay: "1"
  };

  selectedDate = new Date();
  currentMonth = new Date().getMonth();
  startTime = new Date();
  endTime = new Date();

  eventSource: any;

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
    private api: apiRestProvider
  ) { }

  ngOnInit() {
    this.api.getEventsOfMonth(this.currentMonth)
    .subscribe( (data) => {
      this.eventSource = data;
      console.log(this.eventSource);
    },
    (err) => {
      console.log(err.message);
    });
  }

  addEvent() {
    /*to pass the selectedDate to AddEvent Page
    let navigationExtras: NavigationExtras = {
      state: {
        selectedDay: this.selectedDate
      }
    };*/
    this.router.navigate(['/add-event']);
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setDate(current.getDate() - 1);
    return date < current;
  };

  onViewTitleChanged(title) {
    this.currentMonth = title;
    /*get events of the month
    this.api.getEventsOfMonth(this.currentMonth)
    .subscribe( (data) => {
      this.eventSource = data;
      console.log(this.eventSource);
    },
    (err) => {
      console.log(err.message);
    });
    */
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
    var mySwiper = document.querySelector('.swiper-container')['swiper'];
    mySwiper.slideNext();
  }
  
  previousMonth(){
    var mySwiper = document.querySelector('.swiper-container')['swiper'];
    mySwiper.slidePrev();
  }

}
