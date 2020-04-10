import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { apiRestProvider } from '../../../providers/apiRest/apiRest';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage implements OnInit {

  teamList;

  constructor(
    public proveedor:apiRestProvider,
    public navCtrl: NavController,
    public menuCtrl: MenuController
    ) { 
      this.proveedor.getTeams()
      .subscribe(
        (data) => { this.teamList = data;},
        (error) => {console.log(error);}
      );
    }


  ngOnInit() { }

  goToHomePage(team: string){
    this.navCtrl.navigateRoot('chat');
  }

  goToaddTeam(){
    this.navCtrl.navigateRoot('add-team');
  }
}
