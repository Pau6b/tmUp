
import { AngularFireStorage } from 'angularfire2/storage';


export class storageProvider { 

  constructor (
    private storage: AngularFireStorage
  ){ }

  public uploadFile() {
    //crear file a mano
    let content = "Hello Zip";
    let data = new Blob([content]);
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let applicationZip = new File(arrayOfBlob, "Mock.zip",{ type: 'application/zip' });
    //-------------------
    const path = "/prueba"
    let ref = this.storage.ref("hola");
    let task = this.storage.upload(path,applicationZip);
    ref.getDownloadURL();
  }
}