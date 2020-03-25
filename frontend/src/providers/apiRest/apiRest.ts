import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class apiRestProvider {

    url: string = 'https://us-central1-tmup-908e4.cloudfunctions.net/app/';
    constructor (public http: HttpClient){
        console.log('Hello, Soy el proveedor de la API Rest');
    }

    getTeams(){
        return this.http.get(this.url+'teams');
    }

    createTeam(teamData) {
        console.log(JSON.stringify(teamData));
        return new Promise(resolve => {
            this.http.post(this.url+'teams/create', JSON.stringify(teamData))
            .subscribe(data => {
                resolve(data);
            })
        })
    }
}
