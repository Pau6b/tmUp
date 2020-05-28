import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  events = [];
  files = [];
  hasEvents;
  /*public data = [
    {
      category: 'Partido Espanyol vs Barça',
      expanded: true,
      photos: [
        {
          img: 1
        },
        {
          img: 2
        },
        {
          img: 3
        },
        {
          img: 4
        }
      ]
    },
    {
      category: 'Partido Real Madrid vs Espanyol',
      expanded: true,
      photos: [
        {
          img: 1
        },
        {
          img: 2
        },
        {
          img: 3
        },
        {
          img: 4
        }
      ]
    },
    {
    category: 'Partido Espanyol vs Real Madrid',
      expanded: true,
      photos: [
        {
          img: 1
        },
        {
          img: 2
        },
        {
          img: 3
        },
        {
          img: 4
        }
      ]
    }
  ];*/

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private apiProv: apiRestProvider,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.getEvents();
    this.getFiles();
  }

  getEvents() {
    this.apiProv.getEventsOfMonth( new Date().getMonth() )
    .subscribe( (events) => {
      this.events = [];
      let tmp: any;
      tmp = events;
      tmp.forEach(element => {
        let aux = {
          id: element.id,
          category: element.title,
          expanded: true,
          photos: []
        }
        this.events.push(aux);
      });
    });
    if ( this.events.length == 0 ) this.hasEvents = false;
    else this.hasEvents = true;
    console.log(this.events);
  }

  getFiles() {
    for ( let ev of this.events ) {
      var p = this.photoService.getFiles('events', this.apiProv.getTeamId(), ev.id, 'event_images');
      if ( p.length != 0 ) ev.photos = p;
    }
  }

}
