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
  @Input() running;
  antTitulars = [];

  @Output() myTeamScored = new EventEmitter<any>();
  @Output() stoppedGoal = new EventEmitter<any>();
  @Output() opponentScored = new EventEmitter<any>();
  @Output() setRedCard = new EventEmitter<any>();
  @Output() setYellowCard = new EventEmitter<any>();
  @Output() changePlayers = new EventEmitter<any>();

  selectedPlayer;
  eventType;

  constructor() { }

  ngOnInit() { }

  onChange() {
    if(this.selectedPlayer != null ) {
      if(this.eventType == "mytmScored") {
        this.myTeamScored.emit({points: 1, player: this.selectedPlayer});
      }
      else if( this.eventType == "stopGoal") {
        this.stoppedGoal.emit(this.selectedPlayer);
      }
      else if( this.eventType == "redCard") {
        this.setRedCard.emit({player: this.selectedPlayer, card: "red"});
      }
      else if( this.eventType == "yellowCard") {
        this.setYellowCard.emit({player: this.selectedPlayer, card: "yellow"});
      }
      else if( this.eventType = "changePlayers" ) {
        let outPlayer = this.antTitulars.filter(item => this.titulars.indexOf(item)<0);
        let inPlayer = this.titulars.filter(item => this.antTitulars.indexOf(item)<0);
        this.changePlayers.emit({in: inPlayer, out: outPlayer});
      }
      this.eventType = "";
    }
  }

  myTmScored() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "mytmScored";
      this.titularsList.open();
    }
  }

  stopGoal() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "stopGoal";
      this.titularsList.open();
    }
  }

  opScored() {
    if ( this.running ) {
      this.opponentScored.emit(1);
    }
  }

  redCard() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "redCard";
      this.titularsList.open();
    }
  }

  yellowCard() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "yellowCard";
      this.titularsList.open();
    }
  }

  onChangePlayers() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.antTitulars = this.titulars;
      this.eventType = "changePlayers";
      this.convList.open();
    }
  }

}
