import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-football-view',
  templateUrl: './football-view.component.html',
  styleUrls: ['./football-view.component.scss'],
})
export class FootballViewComponent implements OnInit {

  @ViewChild('ConvList', {static:false}) convList: any;
  @ViewChild('TitularsList', {static:false}) titularsList: any;

  @Input() listaConv;
  @Input() titulars;

  @Output() localScored = new EventEmitter<any>();
  @Output() visitorScored = new EventEmitter<any>();

  selectedPlayer;
  eventType;

  constructor() { }

  ngOnInit() {}

  onChange() {
    if(this.eventType == "lclScored") {
      this.localScored.emit({points: 1, player: this.selectedPlayer});
    }
    this.eventType = "";
  }

  lclScored() {
    this.eventType="lclScored"
    this.titularsList.open();
  }

  vstScored() {
    this.visitorScored.emit(1);
  }

  onChangePlayers() {
    this.convList.open();
  }

}
