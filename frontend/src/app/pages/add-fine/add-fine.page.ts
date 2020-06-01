import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-fine',
  templateUrl: './add-fine.page.html',
  styleUrls: ['./add-fine.page.scss'],
})
export class AddFinePage implements OnInit {

  role;
  members;

  constructor(
    private formBuilder: FormBuilder,
    private apiProv: apiRestProvider,
    private router: Router) { }

    addFineForm = this.formBuilder.group({
      date: [new Date(), [Validators.required]],
      userId: ['jugador@jugador.com', [Validators.required]],
      money: ['', [Validators.required]],
      issue: ['', [Validators.required]],
      teamId: [this.apiProv.getTeamId()]
    });
    
  ngOnInit() {
    this.apiProv.getMembers().then(
      (data) => {
        this.members = data;
        console.log("---->"+this.members);
      }
    );
  }

  onAdd(){
    this.apiProv.createFine(this.addFineForm.value).subscribe(
      () => {
        this.router.navigate(['fouls']);
      });
  }

}
