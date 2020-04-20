import { Component, OnInit } from '@angular/core';
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public selectedIndex = 0;
  welcome = false;
  NoticiesArray;
  //variable amb totes les noticies
  data = [
    {
        id: 1,
        name: "normativa",
        added: "Lunes 20 de Abril a las 19:00h",
        date: null,
        where: null
    },
    {
        id: 2,
        name: "tacticas",
        added: "Lunes 27 de Abril a las 9:47h",
        date: null,
        where: null
    },
    {
        id: 3,
        name: "entreno",
        added: "Miércoles 2 de Mayo a las 14:09h",
        date: "30 de Mayo 2020",
        where: "Calle Roger de Flor, 204"
    },
    {
        id: 4,
        name: "partido",
        added: "Domingo 7 de Mayo a las 20:57h",
        date: "Domingo 20 de Junio",
        where: "Estadio ..."
    },
    {
        id: 5,
        name: "partido finalizado",
        added: "Domingo 20 de Junio a las 20:57h",
        date: "Domingo 20 de Junio",
        where: null
    },
    {
        id: 6,
        name: "partido",
        added: "Domingo 20 de Junio a las 20:57h",
        date: "Domingo 20 de Junio",
        where: null
    },
    {
        id: 7,
        name: "normativa",
        added: "Domingo 20 de Junio a las 20:57h",
        date: "Domingo 20 de Junio",
        where: null
    },
    {
        id: 8,
        name: "entreno",
        added: "Domingo 20 de Junio a las 20:57h",
        date: "Domingo 20 de Junio",
        where: null
    }];

  constructor() { }

  ngOnInit() {
    //inicialitzar variable global array amb tots els events cridant a la funcio a la api rest qe em mostri totes les noticies
    this.NoticiesArray = this.data;
  }

}
