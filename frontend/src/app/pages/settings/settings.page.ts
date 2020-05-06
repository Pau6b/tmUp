import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/providers/language/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public languages = [];
  public selected = '';

  constructor(private languageService: LanguageService) { }

  public ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected; 
  }

  public select(lng: string) {
    this.languageService.setLanguage(lng);
  }

}
