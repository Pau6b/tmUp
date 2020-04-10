import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-add-tactic',
  templateUrl: './add-tactic.page.html',
  styleUrls: ['./add-tactic.page.scss'],
})
export class AddTacticPage implements OnInit {

  constructor(
    private api: apiRestProvider,
    private navCtrl: NavController,
    private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  goToTactics() {
    this.navCtrl.na("tactics");
  }
}
