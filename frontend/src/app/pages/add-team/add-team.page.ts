import { Component, OnInit } from '@angular/core';

import {  MenuController, NavController } from '@ionic/angular';

import { FormBuilder, Validators} from '@angular/forms'

import { apiRestProvider } from '../../../providers/apiRest/apiRest'
import { PhotoService } from '../../services/photo.service'

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {
  
  myPhoto: any;

  sportsLists = ['Football', 'Basketball', 'Handball','Baseball']
  roles = ['Fisioterapeuta', 'Jugador']

  segmentModel = "create";

  //create team form
  createTeamForm = this.formBuilder.group({
    teamName: ['', [Validators.required]],
    sport: ['', [Validators.required]]
  });

  //join team form
  joinTeamForm = this.formBuilder.group({
    teamId: ['', [Validators.required]],
    userId: [''],
    role: ['']
  });


  public errorMessages = {
    teamName: [
      { type: 'required', message: 'Nombre equipo es necesario'},
      { type: 'minlength', message: 'Nombre debe tener más de 3 letras'}
    ],
    sport: [
      { type:'required', message: 'Deporte es necesario' }
    ],
    role: [
      { type: 'required', message: 'Rol es necesario'}
    ],
    teamId: [
      { type: 'required', message: 'Código de equipo es  necesario'}
    ]
  }

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public api: apiRestProvider,
    public photoServ: PhotoService
    ) { }

  ngOnInit() {
  }

  //disable side menu for this page
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  //getters
  get teamName() {
    return this.createTeamForm.get("teamName")
  }
  get sport() {
    return this.createTeamForm.get("sport")
  }
  get role() {
    return this.createTeamForm.get("role")
  }
  get teamId() {
    return this.joinTeamForm.get("teamID")
  }

  //calling api rest to create team
  createTeam() {
    console.log(this.createTeamForm.value);
    this.api.createTeam(this.createTeamForm.value)
    .then( () => {
      //team created      
      console.log('team created succesfully.');
      this.navCtrl.navigateRoot("team-list");
    },
    (error) => {
      //handle error
      console.log(error.message);
      this.navCtrl.navigateRoot("team-list");
    });
  }

  //calling api rest to join team
  joinTeam() {
    console.log(this.joinTeamForm.value);
    this.api.createMembership(this.joinTeamForm.value)
    .then( () => {
      console.log("user added to team");
    },
    (error) => {
      console.log(error.message);
    });
  }

  //camera options
  cameraOptions() {
    this.photoServ.alertSheetPictureOptions();
  }

}
