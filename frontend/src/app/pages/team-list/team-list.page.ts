import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from '../../../providers/apiRest/apiRest';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage implements OnInit {

  teamList;

  constructor(public proveedor:apiRestProvider) { }


  ngOnInit() { 
    
    this.proveedor.getTeams()
    .subscribe(
      (data) => { this.teamList = data;},
      (error) => {console.log(error);}
    );

  }

}
