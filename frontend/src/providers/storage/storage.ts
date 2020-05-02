import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class storageProvider { 
  constructor (
  ){ }

  public getTactics() {
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
  }
}