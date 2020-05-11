import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { LoadingController, AlertController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
declare var google;

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  eventId: string;
  event: any;
  currentLoc: any;
  segmentModel = "info";

  ListConv1: any;
  ListConv = [
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
  ];

  constructor(
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    private route: ActivatedRoute,
    private router: Router,
    private apiProv: apiRestProvider,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { 
  }

  ngOnInit() { 
    this.getEventInfo()
    setTimeout(() => {
      this.loadMap();
    }, 1000);    
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
          loading.dismiss();
        })
        this.apiProv.getCall(this.eventId)
        .subscribe ( (data) => {
          console.log(data);
          if ( data == null ) this.ListConv = null;
          else this.ListConv1 = data;
        });
      }
    });
  }

  editEvent() {
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        evId: this.eventId,
        ev: this.event,
        segmentModel: this.segmentModel,
        listConv: this.ListConv1
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

  loadMap() {
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
      let marker = new google.maps.Marker({
        position: {
          lat: myLatLng.lat,
          lng: myLatLng.lng
        },
        map: map
      });
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Seguro que quieres eliminar la lista de jugadores convocados?',
      buttons: [
        {
          text: 'No',
          role: 'no'
        },
        {
          text: 'Si', 
          handler : () => {
            //cridar api amb la funcio eliminar llista convocats
          }
        }
      ]
    });

    await alert.present();
  }

}
