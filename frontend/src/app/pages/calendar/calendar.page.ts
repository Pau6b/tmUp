import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

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

  eventSource = [
    /* testing
    {
      type: 'match',
      title: 'match #2',
      location: {
        lat: -34.9011,
        lng: -56.1645
      },
      startTime: new Date("2020-04-24T10:00:00"),
      endTime: new Date("2020-04-24T11:00:00"),
      allDay: false
    },
    {
      type: 'training',
      title: 'training #1',
      location: {
        lat: -34.9011,
        lng: -56.1645
      },
      startTime: new Date("2020-04-20T10:00:00"),
      endTime: new Date("2020-04-20T11:00:00"),
      allDay: false
    },
    {
      type: 'match',
      title: 'match #1',
      location: {
        lat: -34.9011,
        lng: -56.1645
      },
      startTime: new Date("2020-04-20T18:00:00"),
      endTime: new Date("2020-04-20T19:00:00"),
      allDay: false
    }
    */
  ];

  //to know which type of events are
  eventExists(events, type) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (type === 'training' && event.type === 'training') return true;
      else if (type === 'match' && event.type === 'match') return true;
    }
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  addEvent() {
    //to pass the selectedDate to AddEvent Page
    let navigationExtras: NavigationExtras = {
      state: {
        selectedDay: this.selectedDate
      }
    };
    this.router.navigate(['/add-event'], navigationExtras);
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setDate(current.getDate() - 1);
    return date < current;
  };

  onViewTitleChanged(title) {
    this.currentMonth = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    let navigationExtras: NavigationExtras = {
      state: {
        ev: event
      }
    };
    this.router.navigate(['/event'], navigationExtras);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
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
