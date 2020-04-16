import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-tactics',
  templateUrl: './tactics.page.html',
  styleUrls: ['./tactics.page.scss'],
})
export class TacticsPage implements OnInit {

  constructor(
    private api: apiRestProvider,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private photo: PhotoService) { }

  ngOnInit() {
  }

  goToaddTactic(){
    //this.photo.alertSheetPictureOptions();
    this.navCtrl.navigateForward("add-tactic");
  }

}
