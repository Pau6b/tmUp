
import { AngularFireStorage } from 'angularfire2/storage';


export class storageProvider { 

  constructor (
    private storage: AngularFireStorage
  ){ }

  /*public getTactics() {
    console.log("entro");
      var st = firebase.storage().ref();
      var listRef = st.child('tactics');
      // Find all the prefixes and items.
      listRef.listAll().then(function(res) {
        res.prefixes.forEach(function(folderRef) {
          console.log(folderRef);
        });
        res.items.forEach(function(itemRef) {
          console.log(itemRef);
        });
      }).catch(function(error) {
        console.log("error al descargar files");
      });
  }*/

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
    ref.getDownloadURL().subscribe((URL) => {
      console.log(URL);
    });
    console.log("subido");
  }
}