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

  getAFile(page, Id): Promise<any>{
    const storageRef = firebase.storage().ref(page+'/'+Id);
    return storageRef.listAll();
  }
  getFiles(page, Id){
    const storageRef = firebase.storage().ref(page+'/'+Id);
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

  async uploadFileToStorage(buffer, name, page, Id, _type){
    let path = '/'+page+'/'+Id+'/'+name;
    const ref = this.storage.ref;
    let data = new Blob([buffer], {type: _type});
    const task = this.storage.upload(path,data);

    task.percentageChanges().subscribe( changes => {
      //valor del progres bar del html
    })

    
  }
  
  downloadFileFromStorage(){

  }

  deleteFile(full) {
    const ref = this.storage.ref(full);
    ref.delete();
  }

  deleteTeamFiles(teamId) {
    const normativesPath = "/normatives/"+teamId;
    const tacticsPath = "/tactics/"+teamId;
    const eventsPath = "/events/"+teamId; 
    let ref = this.storage.ref(normativesPath);
    ref.delete();
    ref = this.storage.ref(tacticsPath);
    ref.delete();
    ref = this.storage.ref(eventsPath);
    ref.delete();
    }

    deleteUserFiles(userId) {
      const userPath = "/profile_images/"+userId;
      let ref = this.storage.ref(userPath);
      ref.delete();
    }


    deleteEventFiles(teamId, eventId) {
      const eventsPath = "/events/"+teamId+'/'+eventId;
      let ref = this.storage.ref(eventsPath);
      ref.delete();
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