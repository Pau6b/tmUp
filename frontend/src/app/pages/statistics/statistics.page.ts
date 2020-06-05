import { Component, OnInit, ViewChild } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TeamFootballComponent } from './components/team-football/team-football.component';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  public statisticsType = "";
  public sport = "";
  public userName = "";
  public userStats;
  public teamStats;
  public playedMatches = "";
  public selected = "";
  public teamPlayers = [];
  public teamPlayersKeys = [];
  public selectedUser;
  public role;

  @ViewChild('TeamFootball', {static: false}) footballChild:TeamFootballComponent;

  constructor(private apiProv: apiRestProvider,
              private router: Router,
              private principalPage: AppComponent,
              public loadCtrl: LoadingController) { }

  ngOnInit() {
    this.Init();
  }

  async Init() {
    const loading = await this.loadCtrl.create();
    loading.present();
    let loading2;
    if (this.principalPage.role == "player") {
      loading2 = await this.loadCtrl.create();
      loading2.present();
    }
    if (this.principalPage.role == "staff") this.statisticsType = "team";
    else this.statisticsType = "self";
    this.apiProv.getCurrentTeam().subscribe((data: any) => {
      this.sport = data.sport.toLowerCase();
    });

    this.apiProv.getMe().subscribe((data: any) => {
      this.userName = data.userName;
      if (this.principalPage.role == "player") {
        this.apiProv.getUserStatistics(data.email).subscribe((stats) => {
          this.userStats = stats;
          loading2.dismiss();
        })
      }
    });
    this.apiProv.getUserTeamMemberships("player").subscribe((data:any) => {
      for (let i = 0; i < data.length; ++i) {
        this.apiProv.getUser(data[i].userId).subscribe((userData:any) => {
          this.teamPlayers[userData.userName] = userData.email;
          this.teamPlayersKeys.push(userData.userName);
        });
      }
      loading.dismiss();
    });
  }

  public goToRanking() {
    this.router.navigate(["ranking"]);
  }

  public onPlayerChanged() {
    this.apiProv.getUserStatistics(this.teamPlayers[this.selectedUser]).subscribe((stats) => {
      this.userStats = stats;
    })
  }


}
