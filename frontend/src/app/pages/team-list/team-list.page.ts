import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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
    private apiProv: apiRestProvider,
    private router: Router,
    private appComponent: AppComponent,
    ) { }

  ngOnInit() {
    
   }
  
  ionViewWillEnter(){
    setTimeout( () => {
      this.initialize();
    }, 100);
  }
   
  async initialize() {
    this.apiProv.getUserTeams()
    .subscribe( (data) => { 
      this.teamList = data;
    },
    (error) => {
      this.teamList = [];
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

  logOut() {
    this.appComponent.presentConfirm();
  }

  deleteMembership(team: any) {
    this.apiProv.deleteMembership(team.id).then(() => {
      this.initialize();
    })
  }

}