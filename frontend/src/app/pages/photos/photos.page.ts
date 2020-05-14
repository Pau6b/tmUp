import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  public data = [
    {
      category: 'Partido Espanyol vs Barça',
      expanded: true,
      photos: [
        {
          img: 1
        },
        {
          img: 2
        },
        {
          img: 3
        },
        {
          img: 4
        }
      ]
    },
    {
      category: 'Partido Real Madrid vs Espanyol',
      expanded: true,
      photos: [
        {
          img: 1
        },
        {
          img: 2
        },
        {
          img: 3
        },
        {
          img: 4
        }
      ]
    },
    {
    category: 'Partido Espanyol vs Real Madrid',
      expanded: true,
      photos: [
        {
          img: 1
        },
        {
          img: 2
        },
        {
          img: 3
        },
        {
          img: 4
        }
      ]
    }
  ];

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor() { }

  ngOnInit() {
  }


}
