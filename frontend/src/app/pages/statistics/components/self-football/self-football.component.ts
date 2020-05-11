import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-self-football',
  templateUrl: './self-football.component.html',
  styleUrls: ['./self-football.component.scss'],
})
export class SelfFootballComponent implements OnInit {

  @Input() stats;

  constructor() { }

  ngOnInit() {}

}
