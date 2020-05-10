import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  public statisticsType = "self";
  public sport = "";
  public userName = "";
  public stats;

  constructor(private apiProv: apiRestProvider) { }

  ngOnInit() {
    this.apiProv.getCurrentTeam().subscribe((data: any) => {
      this.sport = data.sport.toLowerCase();
    });

    this.apiProv.getMe().subscribe((data: any) => {
      this.userName = data.userName;
    });

    this.apiProv.getStatistics().subscribe((data: any) => {
      this.stats = data;
      console.log(this.stats);
    });
  }

}
