//import { isMainThread } from "worker_threads";

let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'https://us-central1-tmup-908e4.cloudfunctions.net/app';

var idEquipo = "KJYtKFhNAUVJjAFGpFVb";
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidGVzdCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90bXVwLTkwOGU0IiwiYXVkIjoidG11cC05MDhlNCIsImF1dGhfdGltZSI6MTU5MTA5MDMwNCwidXNlcl9pZCI6Inc3WnNhWlZmRVNRajdjME1rdW5Vd2VBVjR5aDEiLCJzdWIiOiJ3N1pzYVpWZkVTUWo3YzBNa3VuVXdlQVY0eWgxIiwiaWF0IjoxNTkxMDkwMzA0LCJleHAiOjE1OTEwOTM5MDQsImVtYWlsIjoidGVzdEB0bXVwLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRtdXAuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gAC5E4KgvUHkLq4jMCEJmyHX-KNgaDd5YRXdjTvlZFA3qOo_zmgRELb9N-3Qoo4HMfCaTxZc89U_97GoG3Apn_encW4xIDfep09nsLB142z-2mRzmaJP7ticAlpxdlKmmPmhUH8aKlZyQSlITzgQ1CmmYBXKKaiISKDcOzcQy45VL7p1ngJem_KsOo4504IDyPcgHXGN4gUj9nHxhbJFN5MQtM4CAFujVfp__7Fi32ZzUZdtdkXLl5elDfCfwWJGPVGs18uhb4Gdmqe5TV3wokZSJU6BcEEU1_pdTTE-jIdF22r1Oygfm_fKSfuc6FVQx4wl0qHu6lSB1-wXAJeP6g"

describe('Create match: ',()=>{

    it('Create match', async() => {
        var event = {
            "teamId": idEquipo,
            "title": "Partido para eliminar",
            "startTime": "Wed Apr 29 2020 19:11:16",
            "endTime": "Wed Apr 29 2020 21:11:16",
            "allDay": "false",
            "rival": "Barça",
            "location": {
                "name": "Camp Nou",
                "latitude": "41.3887901",
                "longitude": "2.1589899"
                }
            }
        const response = await chaiT.request(url)
        .post('/teams/events/match/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(event));
        expect(response).to.have.status(200);
        //idEquipo = response.text;
            //expect(body).should.include("CM1");

    });
    it('Bad request in Create match', async() => {
        var event = {
            "teamId": "xxxxxxxxxxxxxxx",
            "title": "Partido para eliminar",
            "startTime": "Wed Apr 29 2020 19:11:16",
            "endTime": "Wed Apr 29 2020 21:11:16",
            "allDay": "false",
            "rival": "Barça",
            "location": {
                "name": "Camp Nou",
                "latitude": "41.3887901",
                "longitude": "2.1589899"
                }
            }
        const response = await chaiT.request(url)
        .post('/teams/events/match/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(event));
        expect(response).to.have.status(400);
        
            //expect(body).should.include("CM1");

    });
});

describe('Create training: ',()=>{

    it('Create training', async() => {
        var event = {
            "teamId": idEquipo,
            "title": "Entrenamiento mañana",
            "startTime": "Wed Apr 29 2020 19:11:16",
            "endTime": "Wed Apr 29 2020 21:11:16",
            "allDay": "false",
            "description": "Entrenamiento Fisico",
            "location": {
                "name": "Camp Nou",
                "latitude": "41.3887901",
                "longitude": "2.1589899"
                }
            }
        const response = await chaiT.request(url)
        .post('/teams/events/training/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(event));
        expect(response).to.have.status(200);
        idEquipo = response.text;
            //expect(body).should.include("CM1");

    });
    it('Bad request in Create training', async() => {
        var event = {
            "teamId": "xxxxxxxxxxxxxxxxx",
            "title": "Entrenamiento mañana",
            "startTime": "Wed Apr 29 2020 19:11:16",
            "endTime": "Wed Apr 29 2020 21:11:16",
            "allDay": "false",
            "description": "Entrenamiento Fisico",
            "location": {
                "name": "Camp Nou",
                "latitude": "41.3887901",
                "longitude": "2.1589899"
                }
            }
        const response = await chaiT.request(url)
        .post('/teams/events/match/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(event));
        expect(response).to.have.status(400);
        
            //expect(body).should.include("CM1");

    });
});
   
describe('Delete event: ', ()=> {

    it('Delete unnexisting event', async() => {
        const response = await chaiT.request(url)
        .delete('/teams/events/delete/'+idEquipo+'/899999999')
        .set('authorization', token)
        expect(response).to.have.status(400);
    });
});