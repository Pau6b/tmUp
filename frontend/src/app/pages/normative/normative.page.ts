import { Component, OnInit } from '@angular/core';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, Validators} from '@angular/forms';

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

  file: File = new File();
  fileObj: ChooserResult;
  isPDF = 0;
  promise: Promise<string>;

  public constructor(
    private chooser: Chooser,
    private storage: StorageService,
    private formBuilder: FormBuilder,
    ) {}

  public ngOnInit() {
  }

  public chooseFile(){
    this.chooser.getFile()
      .then( (value: ChooserResult) => {
        this.fileObj = value;
      },
      (err) => {
        alert(JSON.stringify(err));
      })
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
