import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { NavController, MenuController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-add-tactic',
  templateUrl: './add-tactic.page.html',
  styleUrls: ['./add-tactic.page.scss'],
})
export class AddTacticPage implements OnInit {

  constructor(
    private api: apiRestProvider,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private photo: PhotoService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  openOptions(){
    this.photo.alertSheetPictureOptions();
  }

}
