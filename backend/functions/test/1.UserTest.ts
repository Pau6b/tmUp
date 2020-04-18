let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'http://localhost:5001/tmup-908e4/us-central1/app';


describe('Create user: ',()=> {
    it('Create user', async() => {
        var user = {
            "email": "a@a.com",
            "userName": "b"
        };
        const response = await chaiT.request(url)
        .post('/users/create')
        .set('content-type', 'application/raw')
        .send(JSON.stringify(user));
        expect(response).to.have.status(200);
            //expect(body).should.include("CM1");

    });
    it('Create existing user', async() => {
        var user = {
            "email": "a@a.com",
            "userName": "b"
        };
        const response = await chaiT.request(url)
        .post('/users/create')
        .set('content-type', 'application/raw')
        .send(JSON.stringify(user));
        expect(response).to.have.status(500);
            //expect(body).should.include("CM1");

    });
});

describe('Get user: ',()=> {
    it('Get user info', async() => {
        var user = {
            "email": "a@a.com",
            "userName": "b"
        };
        const response = await chaiT.request(url)
        .post('/users/create')
        .set('content-type', 'application/raw')
        .send(JSON.stringify(user));
        expect(response).to.have.status(200);
            //expect(body).should.include("CM1");

    });
});
