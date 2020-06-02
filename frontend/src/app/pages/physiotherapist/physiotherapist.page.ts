import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Validators, FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { LoadingController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-physiotherapist',
  templateUrl: './physiotherapist.page.html',
  styleUrls: ['./physiotherapist.page.scss'],
})
export class PhysiotherapistPage implements OnInit {

  role = "physio";
  pagina = false
  fisios;
  constructor(
    private iab: InAppBrowser,
    private formBuilder: FormBuilder,
    private apiProv: apiRestProvider,
    public loadCtrl: LoadingController,
    private principalPage: AppComponent
  ) { }

  physioForm = this.formBuilder.group({
    url: [
      '',
      [
        Validators.required,
        Validators.pattern('www.+[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$')
      ]
    ]
  });

  ngOnInit() {
    setTimeout( () => {
      this.initialize();
    }, 1000);
    
  }

  async initialize() {
    const loading = await this.loadCtrl.create();
    loading.present();
    this.role = this.principalPage.role;
    if(this.role == 'physio'){
      this.apiProv.getMembership().subscribe( (data) => { 
        console.log(data);
        this.fisios = data;
        if (this.fisios.urlPhysio != "") this.pagina = true;
      })
      loading.dismiss();
    }else{
      this.apiProv.getUserTeamMemberships("physio").subscribe( (data) => { 
        this.fisios = data;
        console.log(this.fisios[0].urlPhysio);
      })
      loading.dismiss();
    }
  }

  redirect(fisio){
    if (fisio.urlPhysio != "") this.iab.create(fisio.urlPhysio)
  }

}
