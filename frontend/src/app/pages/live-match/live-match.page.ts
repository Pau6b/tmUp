import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.page.html',
  styleUrls: ['./live-match.page.scss'],
})
export class LiveMatchPage implements OnInit {

  @ViewChild('playersList', {static:false}) playersList: any;

  //stopwatch variables
  timeBegan = null;
  timeStopped: any = null;
  stoppedDuration: any = null;
  started = null;
  blankTime = "00:00";
  time = "00:00";

  running = false;
  finishing = false;

  title;
  sport: string;
  localPts = 0;
  visitPts = 0;

  //testing
  listaConv = [
    {
      id: "1",
      name: "Jugador 1"
    },
    {
      id: "2",
      name: "Jugador 2"
    },
    {
      id: "3",
      name: "Jugador 3"
    },
    {
      id: "4",
      name: "Jugador 4"
    },
    {
      id: "5",
      name: "Jugador 5"
    },
    {
      id: "6",
      name: "Jugador 6"
    },
    {
      id: "7",
      name: "Jugador 7"
    }
  ]

  titulars = [];

  stadisticsLog = [];

  constructor(
    private apiProv: apiRestProvider,
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) {  }

  ngOnInit() {
    this.getTeam();
    this.title = this.route.snapshot.paramMap.get('title');
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

  //confirmation for titulars
  async onTitularsSelected() {
    let alert = await this.alertCtrl.create({
      message: 'Has seleccionado ' + this.titulars.length + ' jugadores titulares. ¿Correcto?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.openList();
          }
        },
        {
          text: 'Accept'
        }
      ]
    });
    alert.present();
  }

  //Methods from component's events
  onMyTeamScored(info) {
    let infoEvent = {
      type: "scored",
      points: info.points,
      player: info.player
    }
    this.stadisticsLog.push(infoEvent);
    this.localPts += info.points;
    console.log(this.stadisticsLog);
  }

  onOpponentScored(pnts) {
    this.stadisticsLog.push({type: "opScored", points: pnts});
    this.visitPts+=pnts;
    console.log(this.stadisticsLog);
  }

  onStoppedGoal(info) {
    let infoEvent = {
      type: "stopped",
      player: info.player
    }
    this.stadisticsLog.push(infoEvent);
    console.log(this.stadisticsLog);
  }

  //FOOTBALL

  onRedCard(info) {
    let infoEvent = {
      type: "redCard",
      player: info.player
    }
    this.stadisticsLog.push(infoEvent);
    console.log(this.stadisticsLog);
  }

  onYellowCard(info) {
    let infoEvent = {
      type: "yellowCard",
      player: info.player
    }
    this.stadisticsLog.push(infoEvent);
    console.log(this.stadisticsLog);
  }

  onChangePlayers(info) {
    //no hacer nada si todo son "in"
    if (info.out.length !== 0 ) {
      let infoEvent = {
        type: "change",
        playerIn: info.in[0],
        playerOut: info.out[0]
      }
      this.stadisticsLog.push(infoEvent);
    }
    console.log(this.stadisticsLog);
  }

  //BASKETBALL

  //HANDBALL

  onFinish() {
    this.finishing = true;
  }

  // Stopwatch methods
  start() {
    if(this.running) return;

    if(this.timeBegan === null) {
      this.reset();
      this.timeBegan = new Date();
    }

    if(this.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this.timeStopped);
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }

    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }
  
  stop() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
  }

  reset() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  }

  zeroPrefix(num, digit) {
    let zero = '';
    for(let i = 0; i<digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  clockRunning() {
    let currentTime:any = new Date();
    let timeElapsed:any = new Date( currentTime - this.timeBegan - this.stoppedDuration);
    let hour = timeElapsed.getUTCHours();
    let min = timeElapsed.getUTCMinutes();
    let sec = timeElapsed.getUTCSeconds();
    if(hour!='0') this.time = this.zeroPrefix(hour, 2) + ":";
    else this.time = "";
    this.time = this.time + this.zeroPrefix(min, 2) + ":" + this.zeroPrefix(sec, 2);
  }

}
