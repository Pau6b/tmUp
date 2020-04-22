import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { apiRestProvider } from '../../../providers/apiRest/apiRest';
import { load } from 'google-maps';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage implements OnInit {

  teamList;
  me;

  constructor(
  public proveedor:apiRestProvider,
  public navCtrl: NavController,
  public menuCtrl: MenuController,
  public loadCtrl: LoadingController
  ) { 
    this.initialize();
  }

  async initialize() {
    const loading = await this.loadCtrl.create();

    loading.present();
    this.proveedor.getMe()
    .subscribe( (data) => {
      this.me = data;
      console.log(this.me);
    },
    (error) => {
      console.log(error);
    });

    this.proveedor.getUserTeams()
    .subscribe( (data) => { 
      this.teamList = data;
      console.log(this.teamList);
      loading.dismiss();
    },
    (error) => {
      console.log(error);
    });
  }



  ngOnInit() { }

  goToHomePage(team: string){
    this.navCtrl.navigateRoot('main');
  }

  goToaddTeam(){
    this.navCtrl.navigateRoot('add-team');
  }
}
