import { Component, OnInit } from '@angular/core';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { ActivatedRoute} from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-add-tactic',
  templateUrl: './add-tactic.page.html',
  styleUrls: ['./add-tactic.page.scss'],
})
export class AddTacticPage implements OnInit {
  image
  
  constructor(
    private api: apiRestProvider,
    private aroute: ActivatedRoute,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.image = this.aroute.snapshot.paramMap.get("img");
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

}
