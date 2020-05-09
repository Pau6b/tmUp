import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';

import { File, FileEntry } from '@ionic-native/file/ngx';

const MEDIA_FOLDER_NAME = "my_tactics";

@Component({
  selector: 'app-tactics',
  templateUrl: './tactics.page.html',
  styleUrls: ['./tactics.page.scss'],
})
export class TacticsPage implements OnInit {
  
  files = [];

  constructor(
    private api: apiRestProvider,
    private router: Router,
    private file: File,
    private photoService: PhotoService) { }

  ngOnInit() {
    //this.files = this.photoService.getFiles();
  }


  addImage(img){
    this.router.navigate(["/add-tactic", {img: img}]);
  }

  goToaddTactic(){
    this.photoService.selectMedia();
  }
  
  seeImage(){
  }

  openPdf(){

  }
  
  downloadPdf(){
    
  }

}
