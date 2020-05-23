import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-physiotherapist',
  templateUrl: './physiotherapist.page.html',
  styleUrls: ['./physiotherapist.page.scss'],
})
export class PhysiotherapistPage implements OnInit {

  constructor(
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    window.open('https://www.mundodeportivo.com/', '_system');
  }

}
