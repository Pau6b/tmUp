let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'https://us-central1-tmup-908e4.cloudfunctions.net/app';

var idEquipo = null;
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1YzlhZWJlMjM0ZGE2MDE2YmQ3Yjk0OTE2OGI4Y2Q1YjRlYzllZWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidGVzdCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90bXVwLTkwOGU0IiwiYXVkIjoidG11cC05MDhlNCIsImF1dGhfdGltZSI6MTU4OTk3NjM2MywidXNlcl9pZCI6Inc3WnNhWlZmRVNRajdjME1rdW5Vd2VBVjR5aDEiLCJzdWIiOiJ3N1pzYVpWZkVTUWo3YzBNa3VuVXdlQVY0eWgxIiwiaWF0IjoxNTg5OTc2MzYzLCJleHAiOjE1ODk5Nzk5NjMsImVtYWlsIjoidGVzdEB0bXVwLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRtdXAuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.p17LO2231Pg_iKlOHs5dFhEkVVttjDOzLd7xDv1nfjF4wSnk72iMxB-EQi1-TYML0vc0qctVhjyPPAyEcnX1wFXwqCPgADZdWgNIR_OAs8EstMe6M3bb8-Q_StRma9F5ZoG8AuVQYEiz7UO-sCoXzwi2klFdx7s-mNb9XQjU0DvnrSI5OH2spG_0PVxrEi9E_7ifjQS1T09Tlup-cXZmLvPAK2DqtZBKX7EgAYSWdDI5ACrx33HbGue19SO_f261_HdTFlkq_YVm6kqz3_OG1muRbNm5eyL1CkSElLis9e4vKcI0tNM_ZBCdBnp3uqNDK-GWIqAPPNgnHR1zV3DDOQ"

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
        expect(response.body.length).to.equals( 5 );

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