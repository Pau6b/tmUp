import { Injectable, resolveForwardRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteAlertService {

  constructor(
    private alertCtrl: AlertController,
    private translateService: TranslateService
  ) { }

  showConfirm(type: string, text: string) {
    return new Promise((resolve, reject) => {
      this.translateService.get('CORE.deleteText').subscribe(
        async value => {
          let alert = await this.alertCtrl.create({
            header: value.delete + type + "?",
            message: value.irreversible + '(' + text + ')' + value.permanent,
            inputs: [
              {
                name: 'ConfirmText',
                type: 'text',
                placeholder: text
              }
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  alert.dismiss().then(() => {resolve(false)});
                }
              },
              {
                text: value.delete,
                handler: (data) => {
                  if( data.ConfirmText == text) {
                    alert.dismiss(true).then(() => {resolve(true)});
                  }
                  else return false;
                }
              }
            ]
          });
          await alert.present();
        })
    });
  }
}
