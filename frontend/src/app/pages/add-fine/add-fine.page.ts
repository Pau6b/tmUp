import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-fine',
  templateUrl: './add-fine.page.html',
  styleUrls: ['./add-fine.page.scss'],
})
export class AddFinePage implements OnInit {

  members = [
    {
      "id": "1",
      "name": "Juanjo"
    },
    {
      "id": "2",
      "name": "Pau"
    },
    {
      "id": "3",
      "name": "Ivan"
    },
    {
      "id": "4",
      "name": "Lucas"
    },
    {
      "id": "5",
      "name": "Clara"
    },
    {
      "id": "6",
      "name": "Daniela"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
