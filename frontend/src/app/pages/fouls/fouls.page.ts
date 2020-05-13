import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
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

  @ViewChild('doughnutCanvas', {static: false}) doughnutCanvas;
  
  doughnutChart: any;
  colorsArray: any;
  total;
  register: any;
  paids;
  noPaids;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private apiProv: apiRestProvider,
    public loadCtrl: LoadingController) 
  {
    
  }

  ngOnInit() {
    setTimeout( () => {
      this.initialize();
    }, 1000);
    this.register = this.apiProv.getTeamRegister().subscribe(
      (value) => {
        this.register = value;
        this.createSemicircleChart();
      }
    );
  }

  async initialize(){
    const loading = await this.loadCtrl.create();

    loading.present();
    this.apiProv.getTeamFines('all').subscribe(
      (data) => {
        this.total = data;
        loading.dismiss();
      }
    );
    this.apiProv.getTeamFines('paid').subscribe(
      (data) => {
        this.paids = data;
      }
    );
    this.apiProv.getTeamFines('noPaid').subscribe(
      (data) => {
        this.noPaids = data;
      }
    );
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
          data: [this.register.paid, this.register.pending],
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
