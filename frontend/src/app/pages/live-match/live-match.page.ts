import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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

  eventId;
  title;
  sport: string;
  localPts = 0;
  visitPts = 0;

  listaConv = [];
  titulars = [];

  stadisticsLog = [];

  constructor(
    private apiProv: apiRestProvider,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router,
    private translateServie: TranslateService
  ) {  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getTeam();
    this.getCalledPlayers();
    this.title = this.route.snapshot.paramMap.get('title');
  }

  openList() {
    this.playersList.open();
  }

  getTeam() {
    this.apiProv.getCurrentTeam().subscribe((data) => {
      let team: any;
      team = data;
      this.sport = team.sport;
    });
  }

  getCalledPlayers() {
    this.apiProv.getCall(this.eventId).subscribe( (data) => {
      let tmp: any;
      tmp = data;
      tmp.forEach(element => {
        this.apiProv.getUser(element).subscribe( (info: any) => {
          let player = {
            id: element,
            name: info.userName
          }
          this.listaConv.push(player);
        })
      });
      this.openList();
    })
  }

  //confirmation for titulars
  async onTitularsSelected() {
    this.translateServie.get('LIVE-MATCH.selecting').subscribe(
      async value => {
        let selMess1 = value.selected1;
        let selMess2 = value.selected2;
        let alert = await this.alertCtrl.create({
          message: selMess1 + this.titulars.length + selMess2,
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
    )
  }

  onFinish() {
    this.finishing = true;
  }

  onDone() {
    this.translateServie.get('LIVE-MATCH.doneConfirm').subscribe(
      value => {
        let confirmMess = value;
        this.apiProv.sendStatistics(this.eventId, this.stadisticsLog)
        .then( async () => {
          let alert = await this.alertCtrl.create({
            message: confirmMess,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel'
              },
              {
                text: 'OK',
                handler: () => {
                  this.router.navigate(['/main']);
                }
              }
            ]
          })
          alert.present();
        });
      }
    )
  }

  //Methods from component's events
  onMyTeamScored(info) {
    let typeEvent;
    if(this.sport == "Football" || this.sport == "Handball") typeEvent = "goalsScored";
    else if(this.sport == "Basketball") {
      if(info.points == 2) typeEvent = "twoPointsShots";
      else if(info.points == 3) typeEvent = "threePointsShots";
      else typeEvent = "pointsScored"
    }
    let infoEvent = {
      type: typeEvent,
      points: info.points,
      player: info.player
    }
    this.stadisticsLog.push(infoEvent);
    this.localPts += info.points;
  }

  onOpponentScored(pnts) {
    let typeEvent;
    if(this.sport == "Football" || this.sport == "Handball") typeEvent = "goalsReceived";
    else typeEvent = "pointsReceived"
    this.stadisticsLog.push({type: typeEvent, points: pnts});
    this.visitPts+=pnts;
  }

  onStoppedGoal(player) {
    let infoEvent = {
      type: "stops",
      player: player
    }
    this.stadisticsLog.push(infoEvent);
  }

  //FOOTBALL

  onRedCard(info) {
    let infoEvent = {
      type: "redCards",
      player: info.player
    }
    this.stadisticsLog.push(infoEvent);
  }

  onYellowCard(info) {
    let infoEvent = {
      type: "yellowCards",
      player: info.player
    }
    this.stadisticsLog.push(infoEvent);
  }

  onChangePlayers(info) {
    if (info.out.length !== 0 ) {
      let infoEvent = {
        type: "changes",
        playerIn: info.in[0],
        playerOut: info.out[0]
      }
      this.stadisticsLog.push(infoEvent);
    }
  }

  //BASKETBALL

  onAssist(player) {
    let infoEvent = {
      type: "assists",
      player: player
    }
    this.stadisticsLog.push(infoEvent);
  }

  onRebound(player) {
    let infoEvent = {
      type: "rebounds",
      player: player
    }
    this.stadisticsLog.push(infoEvent);
  }

  //HANDBALL

  onLostBall(player) {
    let infoEvent = {
      type: "lostBalls",
      player: player
    }
    this.stadisticsLog.push(infoEvent);
  }

  onSevenMeters(player) {
    let infoEvent = {
      type: "sevenMeters",
      player: player
    }
    this.stadisticsLog.push(infoEvent);
  }

  onTwoMinutes(player) {
    let infoEvent = {
      type: "twoMinutes",
      player: player
    }
    this.stadisticsLog.push(infoEvent);
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
