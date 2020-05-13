import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-self-basketball',
  templateUrl: './self-basketball.component.html',
  styleUrls: ['./self-basketball.component.scss'],
})
export class SelfBasketballComponent implements OnInit {

  @Input() stats;

  constructor() { }

  ngOnInit() {}

}
