import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'

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
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      this.event = this.router.getCurrentNavigation().extras.state.ev;
    });
  }

  ngOnInit() { 
    this.loadMap();
  }

  editEvent() {
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        ev: this.event
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
    this.iab.create('https://www.google.com/maps/dir/?api=1&origin='+currentLatLng.currLat+
      ','+currentLatLng.currLng+'&destination='+this.event.location.latitude+','+this.event.location.longitude);
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = {
      lat: this.event.location.latitude,
      lng: this.event.location.longitude
    };
    const mapEle: HTMLElement = document.getElementById('map');
    const map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
    .addListenerOnce(map, 'idle', () => {
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
