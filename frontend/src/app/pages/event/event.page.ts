import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { LoadingController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  event: any;
  currentLoc: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private iab: InAppBrowser
  ) { 
    this.route.queryParams.subscribe(params => {
      this.event = this.router.getCurrentNavigation().extras.state.ev;
    });
  }

  ngOnInit() { 
    this.loadMap();
  }

  async GoogleDirections() {
    let currentLoc = await this.geolocation.getCurrentPosition();
    let currentLatLng = {
      currLat: currentLoc.coords.latitude,
      currLng: currentLoc.coords.longitude
    };
    this.iab.create('https://www.google.com/maps/dir/?api=1&origin='+currentLatLng.currLat+
      ','+currentLatLng.currLng+'&destination='+this.event.location.lat+','+this.event.location.lng);
  }

  async loadMap() {
    //loading circle
    const loading = await this.loadingCtrl.create();
    loading.present();
    //get the location
    const myLatLng = {
      lat: this.event.location.lat,
      lng: this.event.location.lng
    };
    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    const map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
    .addListenerOnce(map, 'idle', () => {
      // map loaded, we don't need the loading circle anymore
      loading.dismiss();
      const marker = new google.maps.Marker({
        position: {
          lat: myLatLng.lat,
          lng: myLatLng.lng
        },
        map: map
      });
    });
  }

}
