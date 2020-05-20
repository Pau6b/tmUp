import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { StorageService } from 'src/app/services/storage.service';

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
    private apiProv: apiRestProvider,
    private storage: StorageService,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.files = this.photoService.getFiles('tactics', this.apiProv.getTeamId());
    console.log(this.apiProv.getTeamId());
  }

  doRefresh(event) {
    setTimeout(() => {
      this.files = this.photoService.getFiles('tactics',this.apiProv.getTeamId());
      event.target.complete();
    }, 2000);
  }

  goToaddTactic(){
    this.photoService.selectMedia('tactics', this.apiProv.getTeamId()).finally(()=>{
      setTimeout(() => {}, 10000);
    });
    this.files = this.photoService.getFiles('tactics', this.apiProv.getTeamId());
  }

  deleteFile(file){
    //console.log(file);
    this.storage.deleteFile(file.full);
    setTimeout(() => {
      this.files = this.photoService.getFiles('tactics',this.apiProv.getTeamId());
    }, 500);
  }

  openFile(f){
    this.photoService.openFile(f);
  }

}
