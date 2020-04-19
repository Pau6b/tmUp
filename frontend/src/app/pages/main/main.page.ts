import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public selectedIndex = 0;
  welcome = true;
  constructor() { }

  ngOnInit() {
  }

}
