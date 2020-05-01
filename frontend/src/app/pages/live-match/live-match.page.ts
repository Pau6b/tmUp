import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.page.html',
  styleUrls: ['./live-match.page.scss'],
})
export class LiveMatchPage implements OnInit {

  @ViewChild('playersList', {static:false}) playersList: any;

  //testing
  listaConv = [
    {
      name: "Jugador 1"
    },
    {
      name: "Jugador 2"
    },
    {
      name: "Jugador 3"
    },
    {
      name: "Jugador 4"
    },
    {
      name: "Jugador 5"
    },
    {
      name: "Jugador 6"
    },
    {
      name: "Jugador 7"
    },
    {
      name: "Jugador 8"
    },
    {
      name: "Jugador 9"
    },
    {
      name: "Jugador 10"
    }
  ]

  convocadosList = [];

  constructor() {  }

  ngOnInit() {
    setTimeout( () => {
      this.playersList.open();
    }, 500);
  }

}
