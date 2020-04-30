import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

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
    private api: apiRestProvider,
    private router: Router,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.api.getTactics()
      .subscribe(
        (data) => {
          console.log(data)
        }
      )
  }

  addImage(img){
    this.router.navigate(["add-tactic", {img: img}]);
  }

  goToaddTactic(img){
    this.photoService.cameraOptions();
  }
  
  seeImage(img){
  }

  openPdf(){

  }
  
  downloadPdf(){
    
  }

}
