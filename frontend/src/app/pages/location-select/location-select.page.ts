import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';

import { NavController, Platform, ModalController } from '@ionic/angular'

import { googleMaps } from '../../../providers/googleMaps/google-maps'
declare var google;

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.page.html',
  styleUrls: ['./location-select.page.scss'],
})
export class LocationSelectPage implements OnInit {

  @ViewChild('map', {static: true}) mapElement: ElementRef;
  @ViewChild('pleaseConnect', {static: true}) pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;  

  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public maps: googleMaps,
    public platform: Platform,
    public modalCtrl: ModalController
  ) {
    this.searchDisabled = true;
    this.saveDisabled = true;
  }

  ngOnInit() {
    this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;
    }); 
  }

  selectPlace(place) {
    this.places = [];
    let location = {
      lat: null,
      lng: null,
      name: place.name
    };
    this.placesService.getDetails({placeId: place.place_id}, (details) => {
      this.zone.run(() => {
        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;
        this.maps.map.setCenter({lat: location.lat, lng: location.lng}); 
        this.location = location;
      });
    });
  }

  searchPlace() {
    this.saveDisabled = true;
    if(this.query.length > 0) {
      let config = {
        types: ['geocode'],
        input: this.query
      }
      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
        if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
          this.places = [];
          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }
      });
    } else {
      this.places = [];
    }
  }

  onDone() {
    this.modalCtrl.dismiss({location: this.location});
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
