import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';

import * as Chart from 'chart.js';
import { Router } from '@angular/router';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-fouls',
  templateUrl: './fouls.page.html',
  styleUrls: ['./fouls.page.scss'],
})
export class FoulsPage implements OnInit {

  /*total = [
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
  ];*/
  @ViewChild('doughnutCanvas', {static: false}) doughnutCanvas;
  
  doughnutChart: any;
  colorsArray: any;
  totalPrice: number;
  total;
  register;
  paids;
  noPaids;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private apiProv: apiRestProvider) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.total = this.apiProv.getFines(this.apiProv.getTeamId(), 'all');
    this.paids = this.apiProv.getFines(this.apiProv.getTeamId(), 'paid');
    this.noPaids = this.apiProv.getFines(this.apiProv.getTeamId(), 'noPaid');
    this.register = this.apiProv.getRegister(this.apiProv.getTeamId());
    this.createSemicircleChart();
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
    this.router.navigate(['add-fine']);

  }
  createSemicircleChart(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Pagadas", "Pendientes"],
        datasets: [{
          labels: ["Pagadas", "Pendientes"],
          data: [this.register.paid, this.register.pendig],
          backgroundColor: ['rgba(51, 204, 51, 0.7)','rgba(255, 99, 133, 0.7)'], // array should have same number of elements as number of dataset
          hoverBackgroundColor: ['rgba(51, 204, 51, 1)','rgba(255, 99, 133, 1)'],// array should have same number of elements as number of dataset
          borderWidth: 1,
          borderColor: 'rgb(52, 62, 141)'
        }]
      },
      options: {
        plugins: {
          datalabels: {
            color: '#ffffff',
            formatter: (value) => {
              return value + '€'
            }
          }   
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        responsive: true,
        legend: { 
          display: true,
          position: 'top',
          align: 'center',
          labels: {
            fontColor: '#ffffff'
          }
        },
        animation: { animateScale: true, animateRotate: true }
      }
    });
    
  }

  radioGroupChange(event){
    
  }
}
