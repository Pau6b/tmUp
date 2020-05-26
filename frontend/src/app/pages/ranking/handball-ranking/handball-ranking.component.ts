import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-handball-ranking',
  templateUrl: './handball-ranking.component.html',
  styleUrls: ['./handball-ranking.component.scss'],
})
export class HandballRankingComponent implements OnInit {

  @Input() stats;
  constructor() { }

  ngOnInit() {}

}
