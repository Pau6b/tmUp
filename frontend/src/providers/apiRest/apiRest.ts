import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class apiRestProvider {

    url: string = 'https://us-central1-tmup-908e4.cloudfunctions.net/app/';
    constructor (public http: HttpClient){
        console.log('Hello, Soy el proveedor de la API Rest');
    }

    getTeams(user: String){
        return this.http.get(this.url+'users/'+user+'/teams');
    }
}
