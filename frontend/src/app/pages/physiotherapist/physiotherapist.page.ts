import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Validators, FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { LoadingController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physiotherapist',
  templateUrl: './physiotherapist.page.html',
  styleUrls: ['./physiotherapist.page.scss'],
})
export class PhysiotherapistPage implements OnInit {

  role;
  pagina = false
  fisios: any = "";
  skelleton = null;
  constructor(
    private iab: InAppBrowser,
    private formBuilder: FormBuilder,
    private apiProv: apiRestProvider,
    public loadCtrl: LoadingController,
    private principalPage: AppComponent,
    private alertController: AlertController,
    private router: Router
  ) { }

  physioForm = this.formBuilder.group({
    urlPhysio: [
      '',
      [
        Validators.required,
        Validators.pattern('www.+[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$')
      ]
    ]
  });

  ngOnInit() {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.initialize();
    }, 5000);
  }

  async initialize() {
    this.role = this.principalPage.role;
    if(this.role == 'physio'){
      this.apiProv.getMembership().subscribe( (data) => { 
        this.fisios = data;
        if (this.fisios.urlPhysio != "") this.pagina = true;
        this.skelleton = true;
      })
    }else{
      this.apiProv.getUserTeamMemberships("physio").subscribe( (data) => { 
        this.fisios = data;
        this.fisios.forEach(element => {
          this.apiProv.getUser(element.userId).subscribe((data) => {
            element['userName'] = data['userName'];
          })
        });
        this.skelleton = true;
      })
    }
    
  }

  redirect(fisio){
    if (fisio.urlPhysio != "") this.iab.create("https://"+fisio.urlPhysio)
    else{
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No tiene web',
      message: 'La pagina web para solicitar hora aun no esta configurada.',
      buttons: ['OK']
    });

    await alert.present();
  }

  addInfo(){
    this.apiProv.addURL(this.physioForm.value)
    this.fisios.urlPhysio = this.physioForm.value.urlPhysio
  }

  redirectToRegister(){
    this.iab.create("https://calendly.com/signup")
  }
}
