let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'http://localhost:5001/tmup-908e4/us-central1/app';


describe('Create user: ',()=> {
    it('Create user', async() => {
        var user = {
            "email": "juanjo@tmup.com",
            "userName": "b"
        };
        const response = await chaiT.request(url)
        .post('/users/create')
        .set('content-type', 'application/raw')
        .send(JSON.stringify(user));
        expect(response).to.have.status(200);
            //expect(body).should.include("CM1");

    }).timeout(5000);
    it('Create user to delete', async() => {
        var user = {
            "email": "delete@a.com",
            "userName": "b"
        };
        const response = await chaiT.request(url)
        .post('/users/create')
        .set('content-type', 'application/raw')
        .send(JSON.stringify(user));
        expect(response).to.have.status(200);
            //expect(body).should.include("CM1");

    }).timeout(5000);
    it('Create existing user', async() => {
        var user = {
            "email": "juanjo@tmup.com",
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

describe('Delete user: ',()=> {
    it('Delete user info', async() => {
        const response = await chaiT.request(url)
        .delete('/users/delete@a.com');
        expect(response).to.have.status(200);
            //expect(body).should.include("CM1");
    });
});

describe('Get user: ',()=> {
    it('Get existing user info', async() => {
        const response = await chaiT.request(url)
        .get('/users/juanjo@tmup.com');
        expect(response).to.have.status(200);
        //expect(response.body.userName).equals("b");
            //expect(body).should.include("CM1");

    });
    it('Get unexisting user info', async() => {
        const response = await chaiT.request(url)
        .get('/users/delete@a.com');
        expect(response).to.have.status(400);

    });
});
