import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor(
    private transfer: FileTransfer, 
    private file: File,
    private storage: AngularFireStorage) { }

    fileTransfer: FileTransferObject = this.transfer.create();

  uploadFileToStorage(file: File, page: string){
    let teamId = "6hd6Bdym8CXKW0Sm3hDb";
    let path = '/'+page+'/'+teamId+'/'+file.getFile.name;
    const ref = this.storage.ref;
    const task = this.storage.upload(path,file);

    task.percentageChanges().subscribe( changes => {
      //valor del progres bar del html
    })

    
  }
  
  downloadFileFromStorage(){

  }

  uploadFileFromSystem(path: string){
    this.fileTransfer.upload('<file path>', '<api endpoint>')
   .then((data) => {
     console.log(data);
     return data;
   }, (err) => {
     // error
   })
  }


}
