import { Component, OnInit, ViewChild } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.page.html',
  styleUrls: ['./live-match.page.scss'],
})
export class LiveMatchPage implements OnInit {

  @ViewChild('playersList', {static:false}) playersList: any;

  sport: string;

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

  constructor(
    private apiProv: apiRestProvider
  ) {  }

  ngOnInit() {
    this.getTeam();
    setTimeout( () => {
      this.openList();
    }, 500);
  }

  openList() {
    this.playersList.open();
  }

  getTeam() {
    if (this.apiProv.getTeamId() != "") {
      this.apiProv.getCurrentTeam().subscribe((data) => {
        let team: any;
        team = data;
        this.sport = team.sport;
      });
    }
  }

}
