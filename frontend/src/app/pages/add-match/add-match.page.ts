import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import { FormBuilder, Validators} from '@angular/forms'
import { apiRestProvider } from '../../../providers/apiRest/apiRest'

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.page.html',
  styleUrls: ['./add-match.page.scss'],
})
export class AddMatchPage implements OnInit {

  segmentModel = 'match';
  startdate = new Date();
  endTime = new Date (new Date().setMinutes(this.startdate.getMinutes()+60));

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
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public api: apiRestProvider
  ) {  }

  ngOnInit() {
  }

}
