import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { LoadingController} from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { File } from '@ionic-native/file/ngx';

//import { PhotoViewer } from '@ionic-native/photo-viewer';
import { StorageService } from 'src/app/services/storage.service';

declare var google;
import { PhotoService } from '../../../app/services/photo.service';
import { googleMaps } from '../../../providers/googleMaps/google-maps';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  @ViewChild('map', {static: true}) mapElement: ElementRef;

  eventId: string;
  event: any;
  currentLoc: any;
  segmentModel = "info";

  hasInform = false;
  f;
  files = [];
  file_name = "Rival1";
  ListConv: any = [];
  img;
  file: File = new File();
  promise: Promise<string>; 
  isPlayer;

  constructor(
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    private route: ActivatedRoute,
    private router: Router,
    private apiProv: apiRestProvider,
    private loadCtrl: LoadingController,
    private photoService: PhotoService,
    private maps: googleMaps,
    private principalPage: AppComponent,
    private storage: StorageService
    //private photoViewer: PhotoViewer,
  ) { 
  }

  ngOnInit() { 
    //call to apiRest to know if user is player on current Team
    if(this.principalPage.role == 'player') this.isPlayer = true;
    else this.isPlayer = false;
    this.getEventInfo();
    this.getFile();
    var path = 'events/' + this.apiProv.getTeamId() + '/' + this.eventId;
    this.files = this.storage.getFiles(path, 'event_images');
  }

  onInfoSegment() {
    if(this.event.location.name!="") {
      this.loadMap();
    }
  }

  onCallSegment() {
    this.getEventCall();
  }

  async getEventInfo() {
    const loading = await this.loadCtrl.create();
    loading.present();
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      if(this.eventId) {
        this.apiProv.getEventById(this.eventId)
        .subscribe( (data) => {
          this.event = data;
          if(this.event.location.name!="") {
            this.loadMap();
          }
        })
        this.getEventCall();
        loading.dismiss();
      }
    });
  }

  getEventCall() {
    this.apiProv.getCall(this.eventId)
    .subscribe ( (data) => {
      let tmp: any;
      tmp = data;
      tmp.forEach((element: any) => {
        this.apiProv.getUser(element).subscribe( (info: any) => {
          let player = {
            id: element,
            name: info.userName
          }
          this.ListConv.push(player);
        })
      });
    });
  }

  editEvent() {
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        evId: this.eventId,
        ev: this.event,
        segmentModel: this.segmentModel,
        listConv: this.ListConv
      }
    };
    this.router.navigate(['/edit-event'], navigationExtras);
  }

  async GoogleDirections() {
    let currentLoc = await this.geolocation.getCurrentPosition();
    let currentLatLng = {
      currLat: currentLoc.coords.latitude,
      currLng: currentLoc.coords.longitude
    };
    let browser = this.iab.create('https://www.google.com/maps/dir/?api=1&origin='+currentLatLng.currLat+
      ','+currentLatLng.currLng+'&destination='+this.event.location.latitude+','+this.event.location.longitude);
    browser.show();
  }

  loadMap() {
    let myLatLng = {
      lat: this.event.location.latitude,
      lng: this.event.location.longitude
    };
    let mapEl: HTMLElement = document.getElementById('map');
    this.maps.initMap(mapEl, myLatLng);

  }

  //INFORME RIVAL

  async uploadFile() {
    var path = 'events/' + this.apiProv.getTeamId() + '/' + this.eventId;
    this.photoService.selectMedia(path, 'informeRival');
    this.getFile();
  }

  getFile() {
    var path = 'events/' + this.apiProv.getTeamId() + '/' + this.eventId;
    this.f = this.storage.getFiles(path, 'informeRival');
    console.log(this.f);
    if(this.f.length > 0) this.hasInform = true;
    else this.hasInform = true;
  }


  deleteFile(file) {
    this.storage.deleteFile(file.full);
    setTimeout(() => {
      var path = 'events/' + this.apiProv.getTeamId() + '/' + this.eventId;
      this.f = this.storage.getFiles(path, 'informeRival');
    }, 500);
  }

  updateFile() {
    this.photoService.selectFiles('informeRival', this.apiProv.getTeamId(), "application/pdf, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    this.getFile();
  }

  //EVENT IMAGES

  addEventImage(){
    var path = 'events/' + this.apiProv.getTeamId() + '/' + this.eventId;
    this.photoService.selectMedia(path, 'event_images').finally(()=>{
      setTimeout(() => {}, 10000);
    });
    this.files = this.storage.getFiles(path, 'event_images');
  }


}
