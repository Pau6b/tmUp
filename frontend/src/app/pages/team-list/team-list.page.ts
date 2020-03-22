import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

interface Team{
  deporte: string;
  nombre: string;
}


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage implements OnInit {

  teamCollection: AngularFirestoreCollection<Team>;
  teamList = [];

  constructor(private angFir: AngularFirestore ) { }


  ngOnInit() {
    this.teamCollection = this.angFir.collection('equipos');
    console.log(this.teamCollection);
    this.teamList = Array.of(this.teamCollection);

  }

}
