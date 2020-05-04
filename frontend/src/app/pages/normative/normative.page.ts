import { Component, OnInit } from '@angular/core';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-normative',
  templateUrl: './normative.page.html',
  styleUrls: ['./normative.page.scss'],
})
export class NormativePage implements OnInit {
  fileObj: ChooserResult;
  isPDF = 0;


  public constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private chooser: Chooser
    ) { }

  public ngOnInit() {
    //subir file
    /*let content = "Hello Zip";
    let data = new Blob([content]);
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    //-------------------
    const path = "/normatives/file.pdf";
    const ref = this.storage.ref;
    const task = this.storage.upload(path,data);
    console.log('Image uploaded!');*/
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

  public uploadFile(files: FileList) {
    let results = [];
    if (files && files.length > 0) {
      const file: File = files.item(0);//assuming only one file is uploaded
      console.log('Uplaoded file, Filename:' + file.name + 'Filesize:' + file.size + 'Filetype:' + file.type);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const fileContent: string = reader.result as string;
        console.log('fileContent:' + fileContent);
        const lines: string[] = fileContent.split('\n'); //this depends on your line end character, I'm using \n in general
        //lines is an array of string, such as "Sham went to school", loop over it and process as you like
      };
    }
  }
}
