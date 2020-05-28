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
  ListConv: any;

  hasInform = false;
  f;
  files = [];

  constructor(
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    private route: ActivatedRoute,
    private router: Router,
    private apiProv: apiRestProvider,
    private loadCtrl: LoadingController,
    private photoService: PhotoService,
    private maps: googleMaps,
    //private photoViewer: PhotoViewer,
<<<<<<< HEAD
    private navCtrl: NavController,
    private storage: StorageService
=======
>>>>>>> 267bc55f096e1e54d40ae8c8d65f5651f1be9c9a
  ) { 
  }

  ngOnInit() { 
    this.getEventInfo();
  }

  onInfoSegment() {
    if(this.event.location.name!="") {
      this.loadMap();
<<<<<<< HEAD
    }, 1000);
    this.getFile();
    this.files = this.photoService.getFiles('events', this.apiProv.getTeamId(), this.eventId, 'event_images');    
=======
    }
  }

  onCallSegment() {
    this.getEventCall();
>>>>>>> 267bc55f096e1e54d40ae8c8d65f5651f1be9c9a
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
      this.ListConv = data;
      if ( this.ListConv.length == 0) this.ListConv = null;
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
    this.photoService.selectFiles('events', this.apiProv.getTeamId(), this.eventId, 'rivalInform');
    this.getFile();
  }

  getFile() {
    this.f = this.photoService.getFiles('events', this.apiProv.getTeamId(), this.eventId, 'rivalInform');
    console.log(this.f);
    if(this.f.length > 0) this.hasInform = true;
    else this.hasInform = true;
  }

  deleteFile(file) {
    this.storage.deleteFile(file.full);
    setTimeout(() => {
      this.files = this.photoService.getFiles('events',this.apiProv.getTeamId(), this.eventId, 'rivalInform');
    }, 500);
  }

  //EVENT IMAGES

  addEventImage(){
    this.photoService.selectMedia('events', this.apiProv.getTeamId(), this.eventId, 'event_images').finally(()=>{
      setTimeout(() => {}, 10000);
    });
    this.files = this.photoService.getFiles('events', this.apiProv.getTeamId(), this.eventId, 'event_images');
  }


}
