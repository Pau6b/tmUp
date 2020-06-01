import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { apiRestProvider } from '../../../providers/apiRest/apiRest';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage implements OnInit {

  teamList;
  me;

  constructor(
    public apiProv: apiRestProvider,
    public router: Router,
    public menuCtrl: MenuController,
    public loadCtrl: LoadingController,
    public appComponent: AppComponent
    ) { }

  ngOnInit() {
    setTimeout( () => {
      this.initialize();
    }, 1000);
   }
   
  async initialize() {
    const loading = await this.loadCtrl.create();

    loading.present();
    
    this.apiProv.getUserTeams()
    .subscribe( (data) => { 
      console.log(data);
      this.teamList = data;
      loading.dismiss();
    });
  }

  goToaddTeam(){
    this.router.navigate(['add-team']);
  }

  async goToHomePage(team: any){
    this.apiProv.setTeam(team.id);
    (await this.apiProv.getCurrentUserRole()).subscribe((role) => {
      this.appComponent.setRole(role);
      this.appComponent.updateTeam();
      this.router.navigate(['/main']);
    })
  }

}