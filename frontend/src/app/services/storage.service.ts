import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { ChooserResult } from '@ionic-native/chooser/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor(
    private file: File,
    private storage: AngularFireStorage) { }


  uploadFileToStorage(file: ChooserResult, page: string){
    let teamId = "6hd6Bdym8CXKW0Sm3hDb";
    let path = '/'+page+'/'+teamId+'/'+file.name;
    const ref = this.storage.ref;
    let data = this.dataURItoBlob(file.dataURI);
    console.log(data);
    console.log("--------------------------------");
    const task = this.storage.upload(path,data);

    task.percentageChanges().subscribe( changes => {
      //valor del progres bar del html
    })

    
  }
  
  downloadFileFromStorage(){

  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
}

}
