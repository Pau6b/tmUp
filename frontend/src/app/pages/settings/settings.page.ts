import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/providers/language/language.service';
import { DeleteAlertService } from 'src/app/services/delete-alert.service';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Router } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public languages = [];
  public selected = '';
  team;
  teamID;

  constructor(
    private languageService: LanguageService,
    private deleteAlert: DeleteAlertService,
    private apiProv: apiRestProvider,
    private router: Router,
    private clipboard: Clipboard,
    private storageServ: StorageService
    ) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected; 
    this.apiProv.getCurrentTeam().subscribe((data) => {
      this.team = data;
    });
    this.teamID = this.apiProv.getTeamId();
  }

  public select(lng: string) {
    this.languageService.setLanguage(lng);
  }

  copyID() {
    this.clipboard.copy(this.teamID);
  }

  deleteTeam() {
    this.deleteAlert.showConfirm("team", this.team.teamName).then((res) => {
      if(res) {
        //delete team & redirect to team-list
        this.apiProv.deleteTeam().then(() => {
          this.router.navigate(['team-list']);
        })
      }
    })
  }

}
