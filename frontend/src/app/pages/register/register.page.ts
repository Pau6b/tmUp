import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private name: String;
  private email: String;
  private psw: String;

  constructor() { }

  ngOnInit() {
  }

}
