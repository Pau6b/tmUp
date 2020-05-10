import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  statisticsType = "self";
  sport = "";

  constructor(private apiProv: apiRestProvider) { }

  ngOnInit() {
    this.apiProv.getCurrentTeam().subscribe((data: any) => {
      this.sport = data.sport.toLowerCase();
    });

    this.apiProv.getStatistics().subscribe((data: any) => {
      console.log(data);
    });
  }

}
