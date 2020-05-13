import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor(
    private file: File,
    private storage: AngularFireStorage) { }


  getFiles(page, teamId){
    const storageRef = firebase.storage().ref(page+'/'+teamId);
    let files = [];
    storageRef.listAll().then(result => {
      result.items.forEach(async ref => {
        files.push({
          name: ref.name,
          full: ref.fullPath,
          url: await ref.getDownloadURL(),
          ref: ref
        });
      });
    },
      (err) => {
        console.log(err);
      }
    );
    return files;
  }
  async uploadFileToStorage(buffer, name, page, teamId, _type){
    let path = '/'+page+'/'+teamId+'/'+name;
    const ref = this.storage.ref;
    let data = new Blob([buffer], {type: _type});
    const task = this.storage.upload(path,data);

    task.percentageChanges().subscribe( changes => {
      //valor del progres bar del html
    })

    
  }
  
  downloadFileFromStorage(){

  }

  createPdf(title: string, content: string, teamId: string){
    let path = "/normatives/"+teamId+'/'+title;
    const ref = this.storage.ref;
    let data = new Blob([content], {type: 'text/plain'});
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    const task = this.storage.upload(path,data);

    task.percentageChanges().subscribe( changes => {
      console.log("percentatge= "+changes);
    })

  }
}
