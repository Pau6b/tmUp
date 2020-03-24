import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { ActionSheetController, MenuController } from '@ionic/angular';

import { FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {
  
  myPhoto: any;

  sportsLists = ['Futbol', 'Basquet']
  categoriasLists = ['Categoria1']
  roles = ['Fisioterapeuta', 'Jugador']

  segmentModel = "create";

  //create team form
  createTeamForm = this.formBuilder.group({
    teamName: ['', [Validators.required]],
    sport: ['', [Validators.required]],
    categ: ['', [Validators.required]]
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
    categ: [
      { type: 'required', message: 'Categoria es necesaria' }
    ],
    role: [
      { type: 'required', message: 'Rol es necesario'}
    ],
    teamID: [
      { type: 'required', message: 'Código de equipo es  necesario'}
    ]
  }

  constructor(
    public menuCtrl: MenuController,
    private camera: Camera, 
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder
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
  get categ() {
    return this.createTeamForm.get("categ")
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
  }

  //calling api rest to join team
  joinTeam() {
    console.log(this.joinTeamForm.value);
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
