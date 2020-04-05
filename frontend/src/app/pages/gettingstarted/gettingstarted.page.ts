import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-gettingstarted',
  templateUrl: './gettingstarted.page.html',
  styleUrls: ['./gettingstarted.page.scss'],
})
export class GettingstartedPage implements OnInit {

  constructor(
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  //disable side menu for this page
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
