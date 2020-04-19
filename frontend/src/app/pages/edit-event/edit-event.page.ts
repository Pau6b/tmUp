import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { ModalController } from '@ionic/angular';
import { LocationSelectPage } from '../location-select/location-select.page';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

  event: any;

  locationForm = this.formBuilder.group({
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
    name: ['', [Validators.required]]
  });

  editEventForm = this.formBuilder.group({
    id: ['',[Validators.required]],
    type: ['',[Validators.required]],
    title: ['',[Validators.required]],
    location: this.locationForm,
    startTime: ['',[Validators.required]],
    endTime: ['',[Validators.required]],
    allDay: [false],
    rival: [''],
    description: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public api: apiRestProvider,
    public modalCtrl: ModalController
  ) { 
    this.route.queryParams.subscribe(params => {
      this.event = this.router.getCurrentNavigation().extras.state.ev;
      this.editEventForm.patchValue({
        id: this.event.id,
        type: this.event.type,
        title: this.event.title,
        location: this.event.location,
        startTime: this.event.startTime.toISOString(),
        endTime: this.event.endTime.toISOString(),
      });
      if(this.event.type == "match"){
        this.editEventForm.patchValue({rival: this.event.rival});
      }
      else{
        this.editEventForm.patchValue({description: this.event.description});
      }
    });
   }

  ngOnInit() {
  }

  dateChanged(date) {
    let time = new Date(date.detail.value)
    time.setMinutes(time.getMinutes()+60);
    //update form values
    this.editEventForm.patchValue({endTime: time.toISOString()});
  }

  async launchLocationPage(){
    let modal = await this.modalCtrl.create({
      component: LocationSelectPage
    });
    //get latitude, longitud and name of location
    modal.onDidDismiss().then((location) => {
      this.editEventForm.patchValue(location.data);
    });
    return modal.present();
  }

  deleteEvent() {
    //call api to delete event
  }

  onCancel() {
    this.router.navigate(['/calendar']);
  }

  onDone() {
    //call api to modify event
    console.log(this.editEventForm.value);
  }

}
