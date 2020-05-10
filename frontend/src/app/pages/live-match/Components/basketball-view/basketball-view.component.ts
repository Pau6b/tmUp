import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-basketball-view',
  templateUrl: './basketball-view.component.html',
  styleUrls: ['./basketball-view.component.scss'],
})
export class BasketballViewComponent implements OnInit {

  @ViewChild('TitularsList', {static:false}) titularsList: any;
  @ViewChild('pointsList', {static:false}) pointsList: any;

  @Input() titulars;
  @Input() running;

  @Output() opponentScored = new EventEmitter<any>();
  @Output() myTeamScored = new EventEmitter<any>();
  @Output() assistPlayer = new EventEmitter<any>();
  @Output() reboundPlayer = new EventEmitter<any>();

  opPoints;
  myTeamPoints;
  pointsValue = [1,2,3];
  selectedPlayer;
  eventType;

  constructor() { }

  ngOnInit() {}

  onChange() {
    if(this.eventType == "assist") {
      this.assistPlayer.emit(this.selectedPlayer);
    }
    else if (this.eventType == "myTeamScored") {
      this.myTeamScored.emit({player: this.selectedPlayer, points: this.myTeamPoints});
    }
    else if (this.eventType == "rebound") {
      this.reboundPlayer.emit(this.selectedPlayer);
    }
  }

  onOpponentPoints() {
    this.opponentScored.emit(this.opPoints);
  }

  assist() {
    if ( this.running ) {
      this.eventType = "assist";
      this.titularsList.open();
    }
  }

  onOpScored() {
    if ( this.running ) {
      this.pointsList.open();
    }
  }

  onePoint() {
    if ( this.running ) {
      this.eventType = "myTeamScored";
      this.myTeamPoints = 1;
      this.titularsList.open();
    }
  }

  twoPoints() {
    if ( this.running ) {
      this.eventType = "myTeamScored";
      this.myTeamPoints = 2;
      this.titularsList.open();
    }
  }

  threePoints() {
    if ( this.running ) {
      this.eventType = "myTeamScored";
      this.myTeamPoints = 3;
      this.titularsList.open();
    }
  }

  rebound() {
    if ( this.running ) {
      this.eventType = "rebound";
      this.titularsList.open();
    }
  }

}
