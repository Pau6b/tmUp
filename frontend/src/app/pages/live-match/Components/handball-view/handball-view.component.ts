import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-handball-view',
  templateUrl: './handball-view.component.html',
  styleUrls: ['./handball-view.component.scss'],
})
export class HandballViewComponent implements OnInit {

  @ViewChild('TitularsList', {static:false}) titularsList: any;

  @Input() titulars;
  @Input() running;

  @Output() myTeamScored = new EventEmitter<any>();
  @Output() stoppedGoal = new EventEmitter<any>();
  @Output() opponentScored = new EventEmitter<any>();
  @Output() lostBall = new EventEmitter<any>();
  @Output() sevenMeters = new EventEmitter<any>();
  @Output() twoMinutes = new EventEmitter<any>();

  selectedPlayer;
  eventType;

  constructor() { }

  ngOnInit() {}

  onChange() {
    if(this.selectedPlayer != null ) {
      if(this.eventType == "mytmScored") {
        this.myTeamScored.emit({points: 1, player: this.selectedPlayer});
      }
      else if( this.eventType == "stopped") {
        this.stoppedGoal.emit( this.selectedPlayer);
      }
      else if( this.eventType == "lostBall") {
        this.lostBall.emit(this.selectedPlayer);
      }
      else if( this.eventType == "7m") {
        this.sevenMeters.emit(this.selectedPlayer);
      }
      else if( this.eventType = "2min") {
        this.twoMinutes.emit(this.selectedPlayer);
      }
      this.eventType = "";
    }
  }

  onMyTeamScored() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "mytmScored";
      this.titularsList.open();
    }
  }

  onStopped () {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "stopped";
      this.titularsList.open();
    }
  }

  onOpScored() {
    if ( this.running ) {
      this.opponentScored.emit(1);
    }
  }

  onLostBall() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "lostBall";
      this.titularsList.open();
    }
  }
  
  onSevenM() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "7m";
      this.titularsList.open();
    }
  }

  onTwoMin() {
    if ( this.running ) {
      this.selectedPlayer = null;
      this.eventType = "2min";
      this.titularsList.open();
    }
  }

}
