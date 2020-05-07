import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-stadistics',
  templateUrl: './edit-stadistics.component.html',
  styleUrls: ['./edit-stadistics.component.scss'],
})
export class EditStadisticsComponent implements OnInit {

  @ViewChild('playersList', {static:false}) playersList: any;

  @Input() eventsList;
  @Input() convList;
  @Input() teamSport;

  selectedIndex;
  selectedPlayer;

  constructor() { }

  ngOnInit() {}

  selectPlayer() {
    this.playersList.open();
  }

  onChange() {
    if(this.eventsList[this.selectedIndex].type != "change") {
      this.eventsList[this.selectedIndex].player = this.selectedPlayer;
    }
  }

}
