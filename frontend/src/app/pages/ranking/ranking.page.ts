import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  public stats;
  public sport;

  constructor(private apiProv: apiRestProvider) { }

  ngOnInit() {
    this.apiProv.getCurrentTeam().subscribe((data: any) => {
      this.sport = data.sport.toLowerCase();
    });

    this.apiProv.getCurrentTeamRanking().subscribe((data: any) => { 
      this.stats = data;
      console.log(data);
      for (let key in this.stats) {
        if (this.stats.hasOwnProperty(key) && this.stats[key].id != 0) {
          this.apiProv.getUser(this.stats[key].id).subscribe((userInfo: any) => {
            console.log(userInfo)
            this.stats[key].userName = userInfo.userName;
          });
        }
        else {

        }
      }    
    });
  }

}
