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

  @Output() opponentScored = new EventEmitter<any>();
  @Output() myTeamScored = new EventEmitter<any>();
  @Output() assistPlayer = new EventEmitter<any>();
  @Output() reboundPlayer = new EventEmitter<any>();

  opPoints;
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
      this.myTeamScored.emit({player: this.selectedPlayer, points: this.opPoints});
    }
    else if (this.eventType == "rebound") {
      this.reboundPlayer.emit(this.selectedPlayer);
    }
  }

  onOpponentPoints() {
    this.opponentScored.emit(this.opPoints);
  }

  assist() {
    this.eventType = "assist";
    this.titularsList.open();
  }

  onOpScored() {
    this.pointsList.open();
  }

  myTmScored() {
    this.eventType = "myTeamScored";
    this.titularsList.open();
  }

  rebound() {
    this.eventType = "rebound";
    this.titularsList.open();
  }

}
