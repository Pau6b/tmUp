import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-normative',
  templateUrl: './normative.page.html',
  styleUrls: ['./normative.page.scss'],
})
export class NormativePage implements OnInit {

  fileObj: ChooserResult;

  constructor(
    private api: apiRestProvider,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private chooser: Chooser,
    private file: File
    ) { }

  ngOnInit() {
  }

  chooseFile(){
    this.chooser.getFile()
      .then( (value: ChooserResult) => {
        this.fileObj = value;
      },
      (err) => {
        alert(JSON.stringify(err));
        console.log(JSON.stringify(err));
      })
  }
}
