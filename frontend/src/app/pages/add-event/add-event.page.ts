import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'

import { Router } from '@angular/router'

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
  locationForm = this.formBuilder.group({
    lat: [null, [Validators.required]],
    lng: [null, [Validators.required]],
    name: ['', [Validators.required]]
  });
  
  createMatchForm = this.formBuilder.group({
    type: ['match'],
    rivalTeam: ['', [Validators.required]],
    location: this.locationForm,
    startsMatch: [this.startdate.toISOString(), [Validators.required]],
    endsMatch: [this.endTime.toISOString(), [Validators.required]],
    allDay: [false]
  });

  createTrainingForm = this.formBuilder.group({
    type:['training'],
    location: this.locationForm,
    startTime: [this.startdate.toISOString(), [Validators.required]],
    endTime: [this.endTime.toISOString(), [Validators.required]],
    allDay: [false],
    description: ['']
  });

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public api: apiRestProvider,
    public modalCtrl: ModalController
  ) {  }

  ngOnInit() {
  }

  async launchLocationPage(){
    let modal = await this.modalCtrl.create({
      component: LocationSelectPage
    });
    //get latitude, longitud and name of location
    modal.onDidDismiss().then((location) => {
      console.log(location.data);
      this.createMatchForm.patchValue(location.data);
    });
    return modal.present();
  }

  onAdd() {
    //mirar si es match o training y llamar API
    console.log(this.createMatchForm.value);
  }
  
}
