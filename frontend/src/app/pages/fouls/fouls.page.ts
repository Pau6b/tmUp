import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-fouls',
  templateUrl: './fouls.page.html',
  styleUrls: ['./fouls.page.scss'],
})
export class FoulsPage implements OnInit {

  total = [
    {
    "user": "Juanjo",
    "userId": "kdsixzbnvkjafznkvfd",
    "date": "02/01/2020",
    "price": 10,
    "concepto": "concepto de la multa"
    },
    {
      "user": "Ivan",
      "userId": "kdsixzbnvkjafznkvfd",
      "date": "12/01/2020",
      "price": 100,
      "concepto": "concepto de la multa"
    },
    {
      "user": "Carles",
      "userId": "kdsixzbnvkjafznkvfd",
      "date": "20/01/2020",
      "price": 50,
      "concepto": "concepto de la multa"
    },
    {
      "user": "Cena de Cumpleaños",
      "userId": "",
      "date": "28/01/2020",
      "price": -300,
      "concepto": "concepto de la multa"
    },
    {
      "user": "Clara",
      "userId": "kdsixzbnvkjafznkvfd",
      "date": "10/04/2020",
      "price": 5,
      "concepto": "concepto de la multa"
    },
    {
      "user": "Pau",
      "userId": "kdsixzbnvkjafznkvfd",
      "date": "15/04/2020",
      "price": 40,
      "concepto": "concepto de la multa"
    },
    {
      "user": "Daniela",
      "userId": "kdsixzbnvkjafznkvfd",
      "date": "11/05/2020",
      "price": 30,
      "concepto": "concepto de la multa"
    }
  ];
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openModal(f) {
    const myModal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps:{
        userId: f.userId,
        userName: f.user,
        concept: f.concepto,
        date: f.date,
        price: f.price
      }
    });
    return await myModal.present();
  }

  goToAddFoul(){

  }
}
