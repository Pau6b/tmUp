import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { ModalController } from '@ionic/angular';
import { LocationSelectPage } from '../location-select/location-select.page';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DeleteAlertService } from 'src/app/services/delete-alert.service';
import { StorageService } from 'src/app/services/storage.service';

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
  membershipTeam = [];

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
    private alertCtrl: AlertController,
    private translateService: TranslateService,
    private deleteAlert: DeleteAlertService,
    private storageServ: StorageService
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
    });
  }

  ngOnInit() {
    this.listPlayers();
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

  async deleteEvent() {
    this.deleteAlert.showConfirm(this.event.type, this.event.title).then((res) => {
      if(res) {
        if(this.event.type == 'match') {
          let teamId = this.apiProv.getTeamId();
          this.storageServ.deleteEventFiles(teamId, this.evId);
        }
        this.apiProv.deleteEvent(this.evId)
        .then(() => {
          this.router.navigate(['/calendar']);
        });
        
      }
    });
    
  }

  onDone() {
    if(this.event.type == "match") {
      this.apiProv.editMatch(this.editEventForm.value)
      .then(() => {
        this.router.navigate(['/event', this.evId]);
      });
    }
    else {
      this.apiProv.editTraining(this.editEventForm.value)
      .then(() => {
        this.router.navigate(['/event', this.evId]);
      });
    }
  }

  anySelectedItem() {
    var count = 0;
    for (let member of this.membershipTeam) {
      if (member.isChecked) {
        ++count;
        if ( count > 1) this.anySelected = true;
      }
    }
    if ( count == 1 ) this.anySelected = false;
  }

  async presentAlert() {
    this.translateService.get('EDIT-EVENT').subscribe(
      async value => {
        let val1 = value.called_players;
        let val2 = value.selected;
        let val3 = value.players;
        let val4 = value.confirmation;
        const alert = await this.alertCtrl.create({
          header: val1,
          subHeader: val2 + this.numConv + val3,
          message: val4,
          buttons: [
            {
              text: 'Cancel',
              role: 'no'
            },
            {
              text: 'Accept', 
              handler : () => {
                this.apiProv.createCall(this.evId, this.convocats)
                .then(() => {
                  this.router.navigate(['/event', this.evId]);
                });
              }
            }
          ]
        });
        await alert.present();
      }
    )
  }

  onDoneList() {
    for (let member of this.membershipTeam) {
      if (member.isChecked) {
        ++this.numConv;
        this.convocats.push(member.id);
      }
    }
    this.presentAlert();
  }

  getMembersTeam() {
    this.apiProv.getMembers()
      .then((data) => {
      let tmp: any = data;
        tmp.forEach(element => {
          if(element.type == 'player') {
            this.apiProv.getUser(element.userId).subscribe((info: any) => {
              let player = {
                id: element.userId,
                name: info.userName,
                isChecked: false
              }
              this.membershipTeam.push(player);
            })
          }
        });
    }); 
  }

  listPlayers() {
    this.getMembersTeam();
    if ( this.membershipTeam.length != 0 ) {
      if ( this.ListConv.length != 0 ) {
        this.anySelected = true;
        for ( let mem of this.membershipTeam ) {
          for ( let conv of this.ListConv ) {
            if ( mem.name == conv ) mem.isChecked = true;
          }
        }
      }
    }
  }

}
