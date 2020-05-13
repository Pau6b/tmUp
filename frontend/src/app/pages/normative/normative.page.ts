import { Component, OnInit } from '@angular/core';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, Validators} from '@angular/forms';
import { PhotoService } from 'src/app/services/photo.service';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

@Component({
  selector: 'app-normative',
  templateUrl: './normative.page.html',
  styleUrls: ['./normative.page.scss'],
})
export class NormativePage implements OnInit {

  createPdfForm = this.formBuilder.group({
    title: ['', [Validators.required] ],
    content: ['', [Validators.required] ]
  });

  file;
  hayNormativa:Boolean = false;
  promise: Promise<string>;


  public constructor(
    private chooser: Chooser,
    private formBuilder: FormBuilder,
    private apiProv: apiRestProvider,
    private storage: StorageService,
    private photoService: PhotoService) {}

  public ngOnInit() {
    this.file = this.photoService.getFiles('normative', this.apiProv.getTeamId());
    if (this.file.size) this.hayNormativa = true;
    else this.hayNormativa = false;
  }

  public createPdf(){
    this.storage.createPdf(this.createPdfForm.get('title').value, this.createPdfForm.get('content').value, '6hd6Bdym8CXKW0Sm3hDb');
  }

  async uploadFile(){
      this.promise = this.file.readAsText(this.file.dataDirectory, "newFile");
      await this.promise.then(value => {
        console.log(value);
      });
  }
}
