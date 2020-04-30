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

  locationForm = this.formBuilder.group({
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
    name: ['', [Validators.required]]
  });
  
  createMatchForm = this.formBuilder.group({
    teamId: [this.apiProv.getTeamId()],
    type: ['match'],
    title: ['', [Validators.required]],
    rival: ['', [Validators.required]],
    location: this.locationForm,
    startTime: [this.startdate.toISOString(), [Validators.required]],
    endTime: [this.endTime.toISOString(), [Validators.required]],
    allDay: [false]
  });

  createTrainingForm = this.formBuilder.group({
    teamId: [this.apiProv.getTeamId()],
    type:['training'],
    title: ['', [Validators.required]],
    location: this.locationForm,
    startTime: [this.startdate.toISOString(), [Validators.required]],
    endTime: [this.endTime.toISOString(), [Validators.required]],
    allDay: [false],
    description: ['']
  });

  constructor(
    private apiProv: apiRestProvider,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private router: Router
  ) {  }

  ngOnInit() {
  }

  dateChanged(date) {
    this.endTime = new Date(date.detail.value);
    this.endTime.setMinutes(this.endTime.getMinutes()+60);
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

  onCancel() {
    this.router.navigate(['/calendar']);
  }

  onAdd() {
    if (this.segmentModel == "match") {
      this.apiProv.createMatch(this.createMatchForm.value)
      .then( () => {
        this.router.navigate(['/calendar']);
      });
    }
    else {
      this.apiProv.createTraining(this.createTrainingForm.value)
      .then( () => {
        this.router.navigate(['/calendar']);
      });
    }
  }
  
}
