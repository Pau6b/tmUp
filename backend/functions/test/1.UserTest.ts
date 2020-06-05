//import { isMainThread } from "worker_threads";

let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'https://us-central1-tmup-908e4.cloudfunctions.net/app';
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidGVzdCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90bXVwLTkwOGU0IiwiYXVkIjoidG11cC05MDhlNCIsImF1dGhfdGltZSI6MTU5MTA5MDMwNCwidXNlcl9pZCI6Inc3WnNhWlZmRVNRajdjME1rdW5Vd2VBVjR5aDEiLCJzdWIiOiJ3N1pzYVpWZkVTUWo3YzBNa3VuVXdlQVY0eWgxIiwiaWF0IjoxNTkxMDkwMzA0LCJleHAiOjE1OTEwOTM5MDQsImVtYWlsIjoidGVzdEB0bXVwLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRtdXAuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gAC5E4KgvUHkLq4jMCEJmyHX-KNgaDd5YRXdjTvlZFA3qOo_zmgRELb9N-3Qoo4HMfCaTxZc89U_97GoG3Apn_encW4xIDfep09nsLB142z-2mRzmaJP7ticAlpxdlKmmPmhUH8aKlZyQSlITzgQ1CmmYBXKKaiISKDcOzcQy45VL7p1ngJem_KsOo4504IDyPcgHXGN4gUj9nHxhbJFN5MQtM4CAFujVfp__7Fi32ZzUZdtdkXLl5elDfCfwWJGPVGs18uhb4Gdmqe5TV3wokZSJU6BcEEU1_pdTTE-jIdF22r1Oygfm_fKSfuc6FVQx4wl0qHu6lSB1-wXAJeP6g"


describe('Get users: ',()=> {

    it('Get all users', async() => {
        const response = await chaiT.request(url)
        .get('/users')
        .set('authorization', token);
        expect(response).to.have.status(200);
        //expect(response.body.length).to.equals( 3 );
        //expect(response.body.userName).equals("b");
            //expect(body).should.include("CM1");

    });
    it('Get existing user info', async() => {
        const response = await chaiT.request(url)
        .get('/users/test@tmup.com')
        .set('authorization', token);
        expect(response).to.have.status(200);
        //expect(response.body.userName).equals("b");
            //expect(body).should.include("CM1");

    });
    it('Get unexisting user info', async() => {
        const response = await chaiT.request(url)
        .get('/users/unexistingUser@tmup.com')
        .set('authorization', token);
        expect(response).to.have.status(400);
    });

    it('Get user teams', async() => {
        const response = await chaiT.request(url)
        .get('/users/test@tmup.com/teams')
        .set('authorization', token);
        expect(response).to.have.status(200);
        //expect(response.body.userName).equals("b");
            //expect(body).should.include("CM1");

    });

});


