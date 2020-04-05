import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'

import { FormBuilder, Validators} from '@angular/forms'
import { apiRestProvider } from '../../../providers/apiRest/apiRest'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  segmentModel = 'match';
  startdate = new Date();
  endTime = new Date(new Date().setMinutes(this.startdate.getMinutes()+60));

  //create match form group
  createMatchForm = this.formBuilder.group({
    type: ['match'],
    rivalTeam: ['', [Validators.required]],
    location: ['', [Validators.required]],
    startsMatch: [this.startdate.toISOString()],
    endsMatch: [this.endTime.toISOString()],
    allDay: false
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public api: apiRestProvider
  ) {  }

  ngOnInit() {
  }

}
