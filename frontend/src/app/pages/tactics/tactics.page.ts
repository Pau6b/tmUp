import { Component, OnInit } from '@angular/core';
import { storageProvider } from 'src/providers/storage/storage';
import { AngularFireStorageModule } from '@angular/fire/storage'

import { PhotoService } from 'src/app/services/photo.service';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tactics',
  templateUrl: './tactics.page.html',
  styleUrls: ['./tactics.page.scss'],
})
export class TacticsPage implements OnInit {

  img;
  tactics: File;

  constructor(
    private storage: storageProvider,
    private router: Router,
    private photoService: PhotoService,
    private fbstorage: AngularFireStorageModule) { }

  ngOnInit() {
    this.storage.getTactics()
      .subscribe(
        (data) => {
          console.log(data)
        }
      )
  }

  getImages() {

  }

  addImage(img){
    this.router.navigate(["/add-tactic", {img: img}]);
  }

  goToaddTactic(img){
    this.photoService.alertSheetPictureOptions();
  }
  
  seeImage(img){
  }

  openPdf(){

  }
  
  downloadPdf(){
    
  }

}
