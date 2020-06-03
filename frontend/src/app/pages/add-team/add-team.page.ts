import { Component, OnInit } from '@angular/core';
import {  MenuController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms'
import { apiRestProvider } from '../../../providers/apiRest/apiRest'
import { PhotoService } from '../../services/photo.service'
import { Router } from '@angular/router';
import { sports, rols } from '../../Core/Arrays';
import { TranslateService } from '@ngx-translate/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  sportsLists = sports;
  roles = rols;

  segmentModel = "create";

  createTeamForm = this.formBuilder.group({
    teamName: ['', [Validators.required]],
    sport: ['', [Validators.required]],
    teamPhoto: ['']
  });

  joinTeamForm = this.formBuilder.group({
    teamId: ['', [Validators.required]],
    userId: [''],
    type: ['', [Validators.required]]
  });


  errorMessages = {
    teamName: [
      { type: 'required', message: 'Nombre equipo es necesario'},
      { type: 'minlength', message: 'Nombre debe tener más de 3 letras'}
    ],
    sport: [
      { type:'required', message: 'Deporte es necesario' }
    ],
    type: [
      { type: 'required', message: 'Rol es necesario'}
    ],
    teamId: [
      { type: 'required', message: 'Código de equipo es necesario'}
    ]
  }

  constructor(
    private apiProv: apiRestProvider,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private photoServ: PhotoService,
    private router: Router,
    private alertCtrl: AlertController,
    private translService: TranslateService,
    private clipboard: Clipboard,
    private principalPage: AppComponent
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  get teamName() {
    return this.createTeamForm.get("teamName");
  }
  get sport() {
    return this.createTeamForm.get("sport");
  }
  get teamPhoto() {
    return this.createTeamForm.get("teamPhoto");
  }
  get type() {
    return this.joinTeamForm.get("type");
  }
  get teamId() {
    return this.joinTeamForm.get("teamId");
  }

  onDone() {
    if(this.segmentModel == "create") {
      let params = this.createTeamForm.value;
      const capitalize =(str:string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
      params.sport = capitalize(params.sport);
      this.apiProv.createTeam(params)
      .then( (data) => {
        let teamID = data;
        this.translService.get('ADD-TEAM.IDInform').subscribe(
          async value => {
            let alert = await this.alertCtrl.create({
              message: value + teamID,
              buttons: [
                {
                  text: 'Copiar',
                  handler: () => {
                    this.clipboard.copy(teamID.toString());
                    return false;
                  }
                },
                {
                  text: 'OK',
                  handler: () => {
                    this.apiProv.setTeam(teamID.toString());
                    this.principalPage.setRole('staff');
                    this.router.navigate(['/main']);
                  }
                }
              ]
            });
            alert.present();
          }
        )
      })
    }
    else {
      this.apiProv.createMembership(this.joinTeamForm.value)
      .then( () => {
        this.apiProv.setTeam(this.joinTeamForm.get('teamId').value);
        this.principalPage.setRole(this.joinTeamForm.get('type').value)
        this.router.navigate(['/main']);
      })
    }

  }

  /*
  cameraOptions() {
    this.photoServ.selectMedia("team_profile_image", )
    .then( (photo) => {
      this.createTeamForm.patchValue({teamPhoto: photo});
    });
  }
  */

}
