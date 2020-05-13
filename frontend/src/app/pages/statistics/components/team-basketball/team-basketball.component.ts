import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-team-basketball',
  templateUrl: './team-basketball.component.html',
  styleUrls: ['./team-basketball.component.scss'],
})
export class TeamBasketballComponent implements OnInit {

  @ViewChild('stackCanvas' , {static: false}) stackCanvas;

  public stats: any;
  public stackChart: any;
  show = false;
  public nmatches;
  private won: string;
  private lost: string;
  
  constructor(private apiProv: apiRestProvider, private translate: TranslateService) { }

  ngAfterViewInit() {
    this.apiProv.getCurrentTeamStatistics().subscribe((stats: any) => {
    this.stats = stats;
    this.nmatches = stats.wonMatches + stats.lostMatches;
    var barOptions_stacked = {
      tooltips: {
          enabled: false
      },
      hover :{
          animationDuration:0
      },
      scales: {
          xAxes: [{
            display:false,
              ticks: {
                  beginAtZero:true,
                  fontFamily: "'Open Sans Bold', sans-serif",
                  fontSize:11
              },
              scaleLabel:{
                  display:false
              },
              gridLines: {
                display:false
              },
              tooltips: {
                enabled: false
             },
              stacked: true
          }],
          yAxes: [{
            display:false,
              gridLines: {
                  display:false,
                  color: "#fff",
                  zeroLineColor: "#fff",
                  zeroLineWidth: 0
              },
              ticks: {
                  fontFamily: "'Open Sans Bold', sans-serif",
                  fontSize:11
              },
              scaleLabel:{
                display: false
              },
              tooltips: {
                enabled: false
             },
              stacked: true
          }]
      },
      legend:{
          display:true
      },
      pointLabelFontFamily : "Quadon Extra Bold",
      scaleFontFamily : "Quadon Extra Bold",
      aspectRatio: 2.3
    };
  
    this.stackChart = new Chart(this.stackCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
          labels: [],
          datasets: [{
              label: this.won,
              data: [stats.wonMatches],
              backgroundColor: "rgba(55, 255, 0,1)",
              hoverBackgroundColor: "rgba(45, 245, 0,1)"
          },{
              label: this.lost,
              data: [stats.lostMatches],
              backgroundColor: "rgba(255, 43, 43,1)",
              hoverBackgroundColor: "rgba(245, 33, 33,1)"
          }]
      },
      options: barOptions_stacked
    });
    this.show = true;
    })
  }


  ngOnInit() {
    this.translate.get("CORE.result.won").subscribe((result) => {this.won = result});
    this.translate.get("CORE.result.lost").subscribe((result) => {this.lost = result});
  }

}
