import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  private teamName: String;
  private sport: String;
  private categ: String;

  private sportsLists = ['Futbol', 'Basquet']
  private categoriasLists = []
  private rolesLists = ['Entrenador', 'Fisioterapeuta' ,'Jugador']

  segmentModel = "create";

  constructor() { }

  ngOnInit() {
  }

}
