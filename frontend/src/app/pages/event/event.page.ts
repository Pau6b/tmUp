import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  event: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      this.event = this.router.getCurrentNavigation().extras.state.ev;
    });
  }

  ngOnInit() { }

}
