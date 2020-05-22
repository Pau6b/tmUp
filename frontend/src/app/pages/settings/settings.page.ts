import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/providers/language/language.service';
import { DeleteAlertService } from 'src/app/services/delete-alert.service';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public languages = [];
  public selected = '';
  team;

  constructor(
    private languageService: LanguageService,
    private deleteAlert: DeleteAlertService,
    private apiProv: apiRestProvider
    ) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected; 
    this.apiProv.getCurrentTeam().subscribe((data) => {
      this.team = data;
    })
  }

  public select(lng: string) {
    this.languageService.setLanguage(lng);
  }

  deleteTeam() {
    this.deleteAlert.showConfirm("team", this.team.teamName).then((res) => {
      if(res) {
        //delete team & redirect to team-list
        console.log("eliminando");
      }
    })
  }

}
