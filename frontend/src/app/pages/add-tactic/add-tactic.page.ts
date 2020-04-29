import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { NavController, MenuController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-tactic',
  templateUrl: './add-tactic.page.html',
  styleUrls: ['./add-tactic.page.scss'],
})
export class AddTacticPage implements OnInit {
  image
  constructor(
    private aroute: ActivatedRoute,
    private api: apiRestProvider,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private photo: PhotoService) { }

  ngOnInit() {
    this.image = this.aroute.snapshot.paramMap.get("img");
    console.log(this.image);
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

}
