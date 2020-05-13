import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-team-football',
  templateUrl: './team-football.component.html',
  styleUrls: ['./team-football.component.scss'],
})
export class TeamFootballComponent implements OnInit {

  @ViewChild('stackCanvas' , {static: false}) stackCanvas;
  @Input() stats;

  constructor() { }

  ngOnInit() {
    this.stackCanvas = new Chart(this.stackCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
          datasets: [{
              data: [this.stats.wonMatches],
              backgroundColor: "rgba(63,103,126,1)",
              hoverBackgroundColor: "rgba(50,90,100,1)"
          },{
              data: [this.stats.drawedMatches],
              backgroundColor: "rgba(163,103,126,1)",
              hoverBackgroundColor: "rgba(140,85,100,1)"
          },{
              data: [this.stats.lostMatches],
              backgroundColor: "rgba(63,203,226,1)",
              hoverBackgroundColor: "rgba(46,185,235,1)"
          }]
      },
    });
  }

}
