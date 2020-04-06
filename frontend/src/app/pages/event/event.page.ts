import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'

import { LoadingController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  event: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { 
    this.route.queryParams.subscribe(params => {
      this.event = this.router.getCurrentNavigation().extras.state.ev;
    });
  }

  ngOnInit() { 
    this.loadMap();
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
