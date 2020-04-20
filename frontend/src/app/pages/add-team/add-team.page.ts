import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { ActionSheetController, MenuController, NavController } from '@ionic/angular';

import { FormBuilder, Validators} from '@angular/forms'

import { apiRestProvider } from '../../../providers/apiRest/apiRest'

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
    teamID: ['', [Validators.required]],
    role: ['', [Validators.required]]
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
    teamID: [
      { type: 'required', message: 'Código de equipo es  necesario'}
    ]
  }

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private camera: Camera, 
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder,
    public api: apiRestProvider
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
  get teamID() {
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
  async cameraOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose image from',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Library',
          handler: () => {
            this.choosePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Camera error:' + err)
    });
  }

  choosePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Camera error:' + err)
    });
  }

}
