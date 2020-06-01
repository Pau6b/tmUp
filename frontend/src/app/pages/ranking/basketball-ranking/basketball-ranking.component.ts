import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basketball-ranking',
  templateUrl: './basketball-ranking.component.html',
  styleUrls: ['./basketball-ranking.component.scss'],
})
export class BasketballRankingComponent implements OnInit {

  @Input() stats;
  constructor() { }

  ngOnInit() {}

}
