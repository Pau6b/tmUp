import { Component, OnInit } from '@angular/core';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-normative',
  templateUrl: './normative.page.html',
  styleUrls: ['./normative.page.scss'],
})
export class NormativePage implements OnInit {
  private url: string = 'gs://tmup-908e4.appspot.com/';
  fileObj: ChooserResult;
  isPDF = 0;

  public constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private chooser: Chooser
    ) { }

  public ngOnInit() {
    //subir file
    let content = "Hello Zip";
    let data = new Blob([content]);
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let applicationZip = new File(arrayOfBlob, "Mock.zip",{ type: 'application/pdf' });
    //-------------------
    const path = "/normativa/prueba3.pdf";
    let ref = this.storage.ref;
    let task = this.storage.upload(path,applicationZip);
    console.log("subido");

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
}
