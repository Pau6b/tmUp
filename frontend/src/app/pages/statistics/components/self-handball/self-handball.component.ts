import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-self-handball',
  templateUrl: './self-handball.component.html',
  styleUrls: ['./self-handball.component.scss'],
})
export class SelfHandballComponent implements OnInit {

  @Input() stats;

  constructor() { }

  ngOnInit() {}

}
