import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { ModalController } from '@ionic/angular';
import { LocationSelectPage } from '../location-select/location-select.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

  event: any;
  evId: any;
  segmentModel: any;
  anySelected = false;
  ListConv: any[];
  numConv = 0;
  convocats = [];

  membersTeam = [
    {
      id: "1",
      name: "Jugador 1",
      isChecked: false
    },
    {
      id: "2",
      name: "Jugador 2",
      isChecked: false
    },
    {
      id: "3",
      name: "Jugador 3",
      isChecked: false
    },
    {
      id: "4",
      name: "Jugador 4",
      isChecked: false
    },
    {
      id: "5",
      name: "Jugador 5",
      isChecked: false
    },
    {
      id: "6",
      name: "Jugador 6",
      isChecked: false
    },
    {
      id: "7",
      name: "Jugador 7",
      isChecked: false
    },
    {
      id: "8",
      name: "Jugador 8",
      isChecked: false
    },
    {
      id: "9",
      name: "Jugador 9",
      isChecked: false
    },
    {
      id: "10",
      name: "Jugador 10",
      isChecked: false
    }
  ];

  locationForm = this.formBuilder.group({
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
    name: ['', [Validators.required]]
  });

  editEventForm = this.formBuilder.group({
    eventId: ['',[Validators.required]],
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
    private apiProv: apiRestProvider,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) { 
    this.route.queryParams.subscribe(params => {
      this.evId = this.router.getCurrentNavigation().extras.state.evId;
      this.event = this.router.getCurrentNavigation().extras.state.ev;
      this.segmentModel = this.router.getCurrentNavigation().extras.state.segmentModel;
      this.ListConv = this.router.getCurrentNavigation().extras.state.listConv;
      this.editEventForm.patchValue({
        eventId: this.evId,
        type: this.event.type,
        title: this.event.title,
        location: this.event.location,
        startTime: this.event.startTime,
        endTime: this.event.endTime,
      });
      if(this.event.type == "match"){
        this.editEventForm.patchValue({rival: this.event.rival});
      }
      else{
        this.editEventForm.patchValue({description: this.event.description});
      }
      if ( this.ListConv != null ) {
        this.anySelected = true;
        for ( let mem of this.membersTeam ) {
          for ( let conv of this.ListConv ) {
            if ( mem.name == conv ) mem.isChecked = true;
          }
        }
      }
    });
  }

  ngOnInit() {
  }

  dateChanged(date) {
    let time = new Date(date.detail.value)
    time.setMinutes(time.getMinutes()+60);
    this.editEventForm.patchValue({endTime: time.toISOString()});
  }

  async launchLocationPage(){
    let modal = await this.modalCtrl.create({
      component: LocationSelectPage
    });
    modal.onDidDismiss().then((location) => {
      this.editEventForm.patchValue(location.data);
    });
    return modal.present();
  }

  deleteEvent() {
    console.log(this.evId);
    this.apiProv.deleteEvent(this.evId)
    .then(() => {
      this.router.navigate(['/calendar']);
    });
  }

  onDone() {
    if(this.event.type == "match") {
      this.apiProv.editMatch(this.editEventForm.value)
      .then(() => {
        this.router.navigate(['/event', this.editEventForm.get('eventId').value]);
      });
    }
    else {
      this.apiProv.editTraining(this.editEventForm.value)
      .then(() => {
        this.router.navigate(['/event', this.editEventForm.get('eventId').value]);
      });
    }
  }

  anySelectedItem() {
    var count = 0;
    for (let member of this.membersTeam) {
      if (member.isChecked) {
        ++count;
        if ( count > 1) this.anySelected = true;
      }
    }
    if ( count == 1 ) this.anySelected = false;
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Jugadores Convocados',
      subHeader: 'Has seleccionado ' + this.numConv + ' jugadores',
      message: 'De acuerdo?',
      buttons: [
        {
          text: 'No',
          role: 'no'
        },
        {
          text: 'Si', 
          handler : () => {
            console.log(this.evId);
            this.apiProv.createCall(this.evId, this.convocats)
            .then(() => {
              this.router.navigate(['/event', this.editEventForm.get('eventId').value]);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  onDoneList() {
    for (let member of this.membersTeam) {
      if (member.isChecked) {
        ++this.numConv;
        this.convocats.push(member.name);
      }
    }
    this.presentAlert();
  }

}
