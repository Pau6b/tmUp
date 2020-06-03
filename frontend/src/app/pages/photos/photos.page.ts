import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { PhotoService } from 'src/app/services/photo.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  events = [];
  files = [];
  hasEvents;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private apiProv: apiRestProvider,
    private storage: StorageService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    setTimeout( () => {
      this.getEvents();
    }, 1000);
  }

  async getEvents() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.apiProv.getEventsOfMonth( new Date().getMonth() )
    .subscribe( (events) => {
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
      if ( this.events.length == 0 ) this.hasEvents = false;
      else this.hasEvents = true;
      for ( let ev of this.events ) {
        var path = "events/" + this.apiProv.getTeamId() + "/" + ev.id;
        var p = this.storage.getFiles(path, 'event_images');
        ev.photos = p;
        p.forEach(pp => {
          ev.photos.push(pp.url);
        }) 
      }
      loading.dismiss();
    });
    
  }


}
