import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  arrayString: Array<string> = ['Castellano', 'Inglés', 'Catalan'];

  constructor() { }

  ngOnInit() {
  }

}
