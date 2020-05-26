import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-football-ranking',
  templateUrl: './football-ranking.component.html',
  styleUrls: ['./football-ranking.component.scss'],
})
export class FootballRankingComponent implements OnInit {

  @Input() stats;
  constructor() { }

  ngOnInit() {}

}
