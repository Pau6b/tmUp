import { Component, OnInit } from '@angular/core';

import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';

import { File } from '@ionic-native/file/ngx';

const MEDIA_FOLDER_NAME = "my_tactics";

@Component({
  selector: 'app-tactics',
  templateUrl: './tactics.page.html',
  styleUrls: ['./tactics.page.scss'],
})
export class TacticsPage implements OnInit {
  
  files = [];

  constructor(
    private router: Router,
    private file: File,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.files = this.photoService.getFiles('tactics', '6hd6Bdym8CXKW0Sm3hDb');
    console.log(this.files);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.files = this.photoService.getFiles('tactics', '6hd6Bdym8CXKW0Sm3hDb');
      event.target.complete();
    }, 2000);
  }

  goToaddTactic(){
    this.photoService.selectMedia('tactics', '6hd6Bdym8CXKW0Sm3hDb');
    setTimeout(() => {}, 2000);
    this.files = this.photoService.getFiles('tactics', '6hd6Bdym8CXKW0Sm3hDb');
  }

  openFile(file){
    this.photoService.openFile(file);
  }

}
