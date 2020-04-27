import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { apiRestProvider } from '../../../providers/apiRest/apiRest';
import { Router } from '@angular/router';

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
    public router: Router,
    public menuCtrl: MenuController
    ) { 
      
    }

  ngOnInit() {
      console.log("-------------------------")
      this.proveedor.getUserTeams()
      .subscribe(
        (data) => { this.teamList = data;},
        (error) => {console.log(error);}
      );
   }

  goToHomePage(team: string){
    this.router.navigate(['main']);
  }

  goToaddTeam(){
    this.router.navigate(['add-team']);
  }

  goTo(page: string){
  }
}
