let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'https://us-central1-tmup-908e4.cloudfunctions.net/app';

var idEquipo = null;
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidGVzdCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90bXVwLTkwOGU0IiwiYXVkIjoidG11cC05MDhlNCIsImF1dGhfdGltZSI6MTU5MTA5MDMwNCwidXNlcl9pZCI6Inc3WnNhWlZmRVNRajdjME1rdW5Vd2VBVjR5aDEiLCJzdWIiOiJ3N1pzYVpWZkVTUWo3YzBNa3VuVXdlQVY0eWgxIiwiaWF0IjoxNTkxMDkwMzA0LCJleHAiOjE1OTEwOTM5MDQsImVtYWlsIjoidGVzdEB0bXVwLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRtdXAuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gAC5E4KgvUHkLq4jMCEJmyHX-KNgaDd5YRXdjTvlZFA3qOo_zmgRELb9N-3Qoo4HMfCaTxZc89U_97GoG3Apn_encW4xIDfep09nsLB142z-2mRzmaJP7ticAlpxdlKmmPmhUH8aKlZyQSlITzgQ1CmmYBXKKaiISKDcOzcQy45VL7p1ngJem_KsOo4504IDyPcgHXGN4gUj9nHxhbJFN5MQtM4CAFujVfp__7Fi32ZzUZdtdkXLl5elDfCfwWJGPVGs18uhb4Gdmqe5TV3wokZSJU6BcEEU1_pdTTE-jIdF22r1Oygfm_fKSfuc6FVQx4wl0qHu6lSB1-wXAJeP6g"

describe('Create teams: ',()=>{

    it('Create team', async() => {
        var team = {
            "teamName": "fcb",
            "sport": "Football"
        };
        const response = await chaiT.request(url)
        .post('/teams/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(team));
        expect(response).to.have.status(200);
        idEquipo = response.text;
            //expect(body).should.include("CM1");

    });
    it('Bad request in Create team', async() => {
        var team = {
            "teamame": "fcb",
            "sprt": "football"
        };
        const response = await chaiT.request(url)
        .post('/teams/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(team));
        expect(response).to.have.status(400);
        
            //expect(body).should.include("CM1");

    });
});
   
describe('Get teams: ',()=>{ 
    it('Get existing team', async() => {
        const response = await chaiT.request(url)
        .get('/teams/'+idEquipo)
        .set('authorization', token)
        expect(response).to.have.status(200);

    });
    it('Get unexisting team', async() => {
        const response = await chaiT.request(url)
        .get('/teams/aaa')
        .set('authorization', token)
        expect(response).to.have.status(400);

    });
    it('Get all teams', async() => {
        const response = await chaiT.request(url)
        .get('/teams')
        .set('authorization', token)
        expect(response).to.have.status(200);
        //expect(response.body.length).to.equals( 5 );

    });

    it('Get one team', async() => {
        const response = await chaiT.request(url)
        .get('/teams/'+idEquipo)
        .set('authorization', token)
        expect(response).to.have.status(200);

    });

    it('Get stats of the team teams', async() => {
        const response = await chaiT.request(url)
        .get('/teams/'+idEquipo+'/stadistics')
        .set('authorization', token)
        expect(response).to.have.status(200);

    });

    it('Get ranking stats of the team teams', async() => {
        const response = await chaiT.request(url)
        .get('/teams/'+idEquipo+'/ranking')
        .set('authorization', token)
        expect(response).to.have.status(200);

    });
});

describe('Update teams: ',()=>{ 
    it('Update existing team', async() => {
        var team = {
            "teamName": "levante"
        };
        const response = await chaiT.request(url)
        .put('/teams/'+idEquipo)
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(team));
        expect(response).to.have.status(200);

    });
    
});