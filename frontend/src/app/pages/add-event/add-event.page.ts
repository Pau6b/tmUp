import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'

import { ActivatedRoute, Router } from '@angular/router'

import { FormBuilder, Validators} from '@angular/forms'
import { apiRestProvider } from '../../../providers/apiRest/apiRest'

import { LocationSelectPage } from '../location-select/location-select.page'

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
    public api: apiRestProvider,
    public modalCtrl: ModalController
  ) {  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['calendar']);
  }

  async launchLocationPage(){
    let modal = await this.modalCtrl.create({
      component: LocationSelectPage
    });
    modal.onDidDismiss().then((location) => {
      console.log(location.data);
    });
    return modal.present();    
  }
}
