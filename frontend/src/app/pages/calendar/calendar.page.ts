import { Component, OnInit } from '@angular/core';

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
      title: 'match #1',
      startTime: new Date("2020-04-24T10:00:00"),
      endTime: new Date("2020-04-24T11:00:00"),
      type: 'match',
      allDay: false
    },
    {
      title: 'training #1',
      startTime: new Date("2020-04-20T10:00:00"),
      endTime: new Date("2020-04-20T11:00:00"),
      type: 'training',
      allDay: false
    }
    */
  ];

  //style definition for different events
  matchStyle = {
    backgroundColor: 'var(--ion-color-danger)'
  }

  trainingStyle = {
    backgroundColor: 'var(--ion-color-warning)'
  }

  constructor() { }

  ngOnInit() {
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setDate(current.getDate() - 1);
    return date < current;
  };

  onViewTitleChanged(title) {
    //console.log(title);
    this.currentMonth = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
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
