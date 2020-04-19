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

  teamId = 'C0Wytx9JMIKgyIbfGAnC';

  segmentModel = 'match';
  startdate = new Date();
  endTime = new Date(new Date().setMinutes(this.startdate.getMinutes()+60));

  //create match form group
  locationForm = this.formBuilder.group({
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
    name: ['', [Validators.required]]
  });
  
  createMatchForm = this.formBuilder.group({
    teamId: [this.teamId],
    type: ['match'],
    title: ['', [Validators.required]],
    rival: ['', [Validators.required]],
    location: this.locationForm,
    startTime: [this.startdate.toISOString(), [Validators.required]],
    endTime: [this.endTime.toISOString(), [Validators.required]],
    allDay: [false]
  });

  createTrainingForm = this.formBuilder.group({
    teamId: [this.teamId],
    type:['training'],
    title: ['', [Validators.required]],
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

  dateChanged(date) {
    this.endTime = new Date(date.detail.value);
    this.endTime.setMinutes(this.endTime.getMinutes()+60);
    //update form values
    if(this.segmentModel === "match") {
      this.createMatchForm.patchValue({endTime: this.endTime.toISOString()});
    }
    else {
      this.createTrainingForm.patchValue({endTime: this.endTime.toISOString()});
    }
  }

  async launchLocationPage(){
    let modal = await this.modalCtrl.create({
      component: LocationSelectPage
    });
    //get latitude, longitud and name of location
    modal.onDidDismiss().then((location) => {
      if(this.segmentModel === "match") {
        this.createMatchForm.patchValue(location.data);
      }
      else {
        this.createTrainingForm.patchValue(location.data);
      }
    });
    return modal.present();
  }

  onAdd() {
    if (this.segmentModel == "match") {
      console.log(this.createMatchForm.value);
      this.api.createMatch(this.createMatchForm.value)
      .then( () => {
        //navigate to calendar
        this.router.navigate(['/calendar']);
      },
      (err) => {
        console.log(err.message);
      });
    }
    else {
      console.log(this.createTrainingForm.value);
      this.api.createTraining(this.createTrainingForm.value)
      .then( () => {
        //navigate to calendar
        this.router.navigate(['/calendar']);
      },
      (err) => {
        console.log(err.message);
      });
    }
  }
  
}
