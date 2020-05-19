import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Injectable()
export class googleMaps {

  mapElement: any;
  map: any;
  apiKey: string = "AIzaSyCPRa3xT3bI8vWso3zaTEU9nh87dJtnH-k";

  constructor(
    public geolocation: Geolocation
  ) {  }

  init(mapElement: any): Promise<any> {
    this.mapElement = mapElement;
    return this.initMap();
  }

  initMap(): Promise<any> {
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
      });
    });
  }

  addMarker(location) {
    let marker = new google.maps.Marker({
      map: this.mapElement,
      animation: google.maps.animation.DROP,
      position: {
        lat: location.lat,
        lng: location.lng
      }
    });

    let infoWindow = new google.maps.infoWindow({
      content: location.name
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.mapElement, marker);
    })

  }

}