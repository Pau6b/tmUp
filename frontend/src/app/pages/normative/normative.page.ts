import { Component, OnInit } from '@angular/core';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-normative',
  templateUrl: './normative.page.html',
  styleUrls: ['./normative.page.scss'],
})
export class NormativePage implements OnInit {

  file: File = new File();
  fileObj: ChooserResult;
  isPDF = 0;
  promise: Promise<string>;

  public constructor(
    private chooser: Chooser
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

  public pdfViewer(){

  }

  async uploadFile(){
      console.log("Entro en uploadFile");
      console.log("dataDirectory: "+ this.file.dataDirectory);
      this.promise = this.file.readAsText(this.file.dataDirectory, "newFile");
      console.log("He creado la promise => "+(await this.promise).toString);
      await this.promise.then(value => {
      console.log(value);
      });
  }
}
