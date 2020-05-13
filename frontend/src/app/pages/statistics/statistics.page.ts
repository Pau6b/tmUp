import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  public statisticsType = "self";
  public sport = "";
  public userName = "";
  public userStats;
  public teamStats;
  public playedMatches = "";

  constructor(private apiProv: apiRestProvider,
              private router: Router) { }

  ngOnInit() {
    this.apiProv.getCurrentTeam().subscribe((data: any) => {
      this.sport = data.sport.toLowerCase();
    });

    this.apiProv.getMe().subscribe((data: any) => {
      this.userName = data.userName;
    });

    this.apiProv.getCurrentUserStatistics().subscribe((data: any) => {
      this.userStats = data;
    });

    this.apiProv.getCurrentTeamStatistics().subscribe((data: any) => {
      console.log(data);
      this.teamStats = data;
    })
  }

  public goToRanking() {
    this.router.navigate["ranking"]
  }

  public onPageChanged(value: any) {
    console.log(value);
  }



}
