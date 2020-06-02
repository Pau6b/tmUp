import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';

import * as Chart from 'chart.js';
import { Router } from '@angular/router';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { AppComponent } from 'src/app/app.component';

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
  segment="total";
  radioButton="team";
  iniciado=false;
  role;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private apiProv: apiRestProvider,
    public loadCtrl: LoadingController,
    private principalPage: AppComponent) 
  {
    
  }

  ngOnInit() {
    this.role = this.principalPage.role;
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
  
  ionViewDidLeave(){
    this.iniciado=false;
  }

  ionViewDidEnter(){
    this.iniciado=true;
    this.refresh();
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
          label: "Grafico Multas",
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

  payFine(f){
    this.apiProv.payFine(f);
    this.refresh();
  }


  refresh(){
    this.segment="total";
    this.radioButton="team";
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
}
