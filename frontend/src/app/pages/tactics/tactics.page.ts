import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-tactics',
  templateUrl: './tactics.page.html',
  styleUrls: ['./tactics.page.scss'],
})
export class TacticsPage implements OnInit {

  constructor(
    private api: apiRestProvider,
    private navCtrl: NavController,
    private menuCtrl: MenuController,) { }

  ngOnInit() {
  }

  goToaddTactic(){
    this.navCtrl.navigateRoot("add-tactic");
  }

}
