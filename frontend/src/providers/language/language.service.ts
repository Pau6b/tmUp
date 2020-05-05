import { TranslateService } from '@ngx-translate/core'
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE'; 

@Injectable({
  providedIn: 'root'
})


export class LanguageService {
  public selected = '';

  constructor(private translate: TranslateService, private storage: Storage) { }

  public setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.storage.get(LNG_KEY).then(val =>  {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    })
  }

  public getLanguages() {
    return [
      { text: 'English', value: 'en' },
      { text: 'Català',  value: 'ca' },
      { text: 'Español', value: 'es' }
    ]
  }

  public setLanguage(lng: string) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }

}
