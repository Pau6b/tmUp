import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, Validators} from '@angular/forms';
import { PhotoService } from 'src/app/services/photo.service';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { AppComponent } from 'src/app/app.component';

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

  hasNormative = true;
  f;
  role;

  public constructor(
    private photoService: PhotoService,
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private apiRestProv:  apiRestProvider,
    private principalPage: AppComponent
    ) {}

  public ngOnInit() {
    this.role = this.principalPage.role;
    this.getFile();
  }

  public createPdf(){
    this.storage.createPdf(this.createPdfForm.get('title').value, this.createPdfForm.get('content').value, this.apiRestProv.getTeamId());
  }

  async uploadFile(){
    this.photoService.selectFiles('normatives', this.apiRestProv.getTeamId());
    this.getFile();
  }

  getFile(){
    this.f = this.photoService.getFiles('normatives', this.apiRestProv.getTeamId());
    console.log(this.f);
    if(this.f.forEach.length > 0) this.hasNormative = true;
    else this.hasNormative = false
  }
}
