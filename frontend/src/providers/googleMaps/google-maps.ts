import { Injectable } from '@angular/core';
declare var google;

@Injectable()
export class googleMaps {

  mapElement: any;
  map: any;

  constructor( ) {  }

  initMap(mapEle, location): Promise<any> {
    return new Promise((resolve) => {
      this.mapElement = mapEle;
      let myLatLng = {
        lat: location.lat, 
        lng: location.lng
      };
      this.map = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 15
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.addMarker(myLatLng);
        mapEle.classList.add('show-map');
      });
      resolve(true);
    });
  }

  addMarker(location) {
    new google.maps.Marker({
      map: this.map,
      position: {
        lat: location.lat,
        lng: location.lng
      }
    });

  }

}