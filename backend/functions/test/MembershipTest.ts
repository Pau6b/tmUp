let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'http://localhost:5001/tmup-908e4/us-central1/app';


describe('Create memberships: ',()=>{
  

    it('Create team', async() => {
        var team = {
            "userId": "a@a.com",
            "teamName": "fcb",
            "sport": "football"
        };
        const response = await chaiT.request(url)
        .post('/teams/create')
        .set('content-type', 'application/raw')
        .send(JSON.stringify(team));
        expect(response).to.have.status(200);
            //expect(body).should.include("CM1");

    });
    /*it('Create existing membership', async() => {
        var memb = {
            "userId": "a@a.com",
            "teamId": "a",
            "sport": "Football"
        };
        const response = await chaiT.request(url)
        .post('/memberships/create')
        .set('content-type','application/raw')
        .send(JSON.stringify(memb));
        console.log(response);
        expect(response).to.have.status(400);

    });*/
});
   
   