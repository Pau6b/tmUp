let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'http://localhost:5001/tmup-908e4/us-central1/app';
var idEquipo = null;

describe('Create teams: ',()=>{

    it('Create team', async() => {
        var team = {
            "userId": "b@a.com",
            "teamName": "fcb",
            "sport": "football"
        };
        const response = await chaiT.request(url)
        .post('/teams/create')
        .set('content-type', 'application/raw')
        .send(JSON.stringify(team));
        expect(response).to.have.status(200);
        console.log(response.text);
        idEquipo = response.text;
            //expect(body).should.include("CM1");

    });
    it('Bad request in Create team', async() => {
        var team = {
            "userd": "b@a.com",
            "teamame": "fcb",
            "sprt": "football"
        };
        const response = await chaiT.request(url)
        .post('/teams/create')
        .set('content-type', 'application/raw')
        .send(JSON.stringify(team));
        expect(response).to.have.status(400);
        expect(response.body).to.have.lengthOf(3);
            //expect(body).should.include("CM1");

    });
});
   
describe('Get teams: ',()=>{ 
    it('Get existing team', async() => {
        console.log(idEquipo);
        const response = await chaiT.request(url)
        .get('/teams/'+idEquipo)
        expect(response).to.have.status(200);

    });
    it('Get unexisting team', async() => {
        const response = await chaiT.request(url)
        .get('/teams/aaa')
        expect(response).to.have.status(400);

    });
});