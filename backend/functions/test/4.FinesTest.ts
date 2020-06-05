let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'https://us-central1-tmup-908e4.cloudfunctions.net/app';
var idEquipo = "KJYtKFhNAUVJjAFGpFVb";
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidGVzdCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90bXVwLTkwOGU0IiwiYXVkIjoidG11cC05MDhlNCIsImF1dGhfdGltZSI6MTU5MTA5MDMwNCwidXNlcl9pZCI6Inc3WnNhWlZmRVNRajdjME1rdW5Vd2VBVjR5aDEiLCJzdWIiOiJ3N1pzYVpWZkVTUWo3YzBNa3VuVXdlQVY0eWgxIiwiaWF0IjoxNTkxMDkwMzA0LCJleHAiOjE1OTEwOTM5MDQsImVtYWlsIjoidGVzdEB0bXVwLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRtdXAuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gAC5E4KgvUHkLq4jMCEJmyHX-KNgaDd5YRXdjTvlZFA3qOo_zmgRELb9N-3Qoo4HMfCaTxZc89U_97GoG3Apn_encW4xIDfep09nsLB142z-2mRzmaJP7ticAlpxdlKmmPmhUH8aKlZyQSlITzgQ1CmmYBXKKaiISKDcOzcQy45VL7p1ngJem_KsOo4504IDyPcgHXGN4gUj9nHxhbJFN5MQtM4CAFujVfp__7Fi32ZzUZdtdkXLl5elDfCfwWJGPVGs18uhb4Gdmqe5TV3wokZSJU6BcEEU1_pdTTE-jIdF22r1Oygfm_fKSfuc6FVQx4wl0qHu6lSB1-wXAJeP6g"
describe('Create fine: ',()=>{

    it('Create fine', async() => {
        var fine = {
            "teamId": idEquipo,
            "userId": "test@tmup.com",
            "issue": "Multa1",
            "date": "11/05/15",
            "money": 10
        };
        const response = await chaiT.request(url)
        .post('/memberships/fines/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(fine));
        expect(response).to.have.status(200);

    });
    it('Bad request in Create fine', async() => {
        var fine = {
            "teamId": idEquipo,
            "userId": "test@tmup.com",
            "issue": "Multa1",
            "date": "11/05/15",
            "money": -5
        };
        const response = await chaiT.request(url)
        .post('/memberships/fines/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(fine));
        expect(response).to.have.status(400);
        
    });
});

describe('Get member fines: ',()=>{
    it('Get all member fines', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/fines/membershipFines/')
        .query({userId: "test@tmup.com", teamId: idEquipo})
        .query({fineState: "all"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 1 );

    });
    it('Get paid member fines', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/fines/membershipFines/')
        .query({userId: "test@tmup.com", teamId: idEquipo})
        .query({fineState: "paid"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 0 );

    });
    it('Get noPaid member fines', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/fines/membershipFines/')
        .query({userId: "test@tmup.com", teamId: idEquipo})
        .query({fineState: "all"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 1 );

    });
});

describe('Get teams fines: ',()=>{
    it('Get all team fine', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/fines/teamFines/')
        .query({teamId: idEquipo})
        .query({fineState: "all"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 2 );

    });
    it('Get paid member fine', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/fines/teamFines/')
        .query({teamId: idEquipo})
        .query({fineState: "paid"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 1 );

    });
    it('Get noPaid member fine', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/fines/teamFines/')
        .query({teamId: idEquipo})
        .query({fineState: "noPaid"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 1 );

    });
});
   
   


