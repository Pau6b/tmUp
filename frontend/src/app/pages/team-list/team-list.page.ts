import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
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
    public menuCtrl: MenuController,
    public loadCtrl: LoadingController
    ) { }

  ngOnInit() {
    setTimeout( () => {
      this.initialize();
    }, 1000);
   }

  

  async initialize() {
    const loading = await this.loadCtrl.create();

    loading.present();
    
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

  goToaddTeam(){
    this.router.navigate(['add-team']);
  }

  goToHomePage(team: string){
    this.router.navigate(['main']);
  }

  goTo(page: string){
  }
}