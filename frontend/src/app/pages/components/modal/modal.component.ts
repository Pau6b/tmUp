import { Component, OnInit, NgModule } from '@angular/core';
import { IonicModule, NavParams } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class ModalComponent implements OnInit {

  userName: String;
  date: String;
  userId: String;
  price: number;
  concept: String;

  constructor(public navParams: NavParams) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.userId = this.navParams.get('userId');
    this.userName = this.navParams.get('userName');
    this.concept = this.navParams.get('concept');
    this.price = this.navParams.get('price');
    this.date = this.navParams.get('date');
  }

}
