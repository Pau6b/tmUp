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
  me;

  constructor(
    public proveedor:apiRestProvider,
    public navCtrl: NavController,
    public menuCtrl: MenuController
    ) { 
      this.proveedor.getMe()
      .subscribe(
        (data) => { this.me = data;
        console.log(this.me);},
        (error) => {console.log(error);}
      );
      console.log("-------------------------")
      this.proveedor.getUserTeams()
      .subscribe(
        (data) => { this.teamList = data;
          console.log(this.teamList);},
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
