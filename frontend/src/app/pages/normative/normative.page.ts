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
  isPlayer= true;
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

  uploadFile(){
    this.photoService.selectFiles('normatives', this.apiRestProv.getTeamId());
    this.getFile();
  }

  deleteFile(){
    this.storage.deleteFile(this.f.full);
    this.hasNormative = false;
  }

  openFile(){
    this.photoService.openFile(this.f);
  }

  getFile(){
    this.hasNormative = false;
    this.storage.getAFile('normatives', this.apiRestProv.getTeamId()).then(
      result => {
        result.items.forEach(ref => {
          this.f = {
            name: ref.name,
            full: ref.fullPath,
            url: ref.getDownloadURL(),
            ref: ref
          };
          this.hasNormative = true;
        });
        
      }
    );
  }
}
