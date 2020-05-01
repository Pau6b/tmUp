import { Injectable } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';

@Injectable()
export class storageProvider { 

  constructor (
    private fbstorage: AngularFireStorageModule
  ){ }

  getTactics() {
  }
}