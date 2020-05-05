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

  @Output() myTeamScored = new EventEmitter<any>();
  @Output() stoppedGoal = new EventEmitter<any>();
  @Output() opponentScored = new EventEmitter<any>();
  @Output() setRedCard = new EventEmitter<any>();
  @Output() setYellowCard = new EventEmitter<any>();

  selectedPlayer;
  eventType;

  constructor() { }

  ngOnInit() {}

  onChange() {
    if(this.eventType == "mytmScored") {
      this.myTeamScored.emit({points: 1, player: this.selectedPlayer});
    }
    else if( this.eventType == "stopGoal") {
      this.stoppedGoal.emit({player: this.selectedPlayer});
    }
    else if( this.eventType == "redCard") {
      this.setRedCard.emit({player: this.selectedPlayer, card: "red"});
    }
    else if( this.eventType == "yellowCard") {
      this.setYellowCard.emit({player: this.selectedPlayer, card: "red"});
    }
    this.eventType = "";
  }

  myTmScored() {
    this.eventType = "mytmScored";
    this.titularsList.open();
  }

  stopGoal() {
    this.eventType = "stopGoal";
    this.titularsList.open();
  }

  opScored() {
    this.opponentScored.emit(1);
  }

  redCard() {
    this.eventType = "redCard";
    this.titularsList.open();
  }

  yellowCard() {
    this.eventType = "yellowCard";
    this.titularsList.open();
  }

  onChangePlayers() {
    this.convList.open();
  }

}
