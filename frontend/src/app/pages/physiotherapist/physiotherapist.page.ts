import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Validators, FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-physiotherapist',
  templateUrl: './physiotherapist.page.html',
  styleUrls: ['./physiotherapist.page.scss'],
})
export class PhysiotherapistPage implements OnInit {

  role = "physio";
  pagina = false
  constructor(
    private iab: InAppBrowser,
    private formBuilder: FormBuilder,
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
    this.role = this.principalPage.role;
    if(this.role == 'physio'){
      //get fisio membership
    }else{
      //get all fisios of team
    }
  }

  redirect(){
    this.iab.create("https://calendly.com/cfarre/online?back=1&month=2020-06")
  }

}
