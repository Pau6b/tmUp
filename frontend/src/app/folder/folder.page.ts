import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireModule } from '@angular/fire';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  buttonClick () {
    this.afAuth.auth.createUserWithEmailAndPassword ('ivgasa99@gmail.com','1234567890').then((response) => {
      console.log('He accedido a Firebase!');
    })
    .catch((error) => {
      console.log('Mal',error);
    })
  }

}
