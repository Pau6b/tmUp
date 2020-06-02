let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'https://us-central1-tmup-908e4.cloudfunctions.net/app';
var idEquipo = "KJYtKFhNAUVJjAFGpFVb";
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidGVzdCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90bXVwLTkwOGU0IiwiYXVkIjoidG11cC05MDhlNCIsImF1dGhfdGltZSI6MTU5MTA5MDMwNCwidXNlcl9pZCI6Inc3WnNhWlZmRVNRajdjME1rdW5Vd2VBVjR5aDEiLCJzdWIiOiJ3N1pzYVpWZkVTUWo3YzBNa3VuVXdlQVY0eWgxIiwiaWF0IjoxNTkxMDkwMzA0LCJleHAiOjE1OTEwOTM5MDQsImVtYWlsIjoidGVzdEB0bXVwLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRtdXAuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gAC5E4KgvUHkLq4jMCEJmyHX-KNgaDd5YRXdjTvlZFA3qOo_zmgRELb9N-3Qoo4HMfCaTxZc89U_97GoG3Apn_encW4xIDfep09nsLB142z-2mRzmaJP7ticAlpxdlKmmPmhUH8aKlZyQSlITzgQ1CmmYBXKKaiISKDcOzcQy45VL7p1ngJem_KsOo4504IDyPcgHXGN4gUj9nHxhbJFN5MQtM4CAFujVfp__7Fi32ZzUZdtdkXLl5elDfCfwWJGPVGs18uhb4Gdmqe5TV3wokZSJU6BcEEU1_pdTTE-jIdF22r1Oygfm_fKSfuc6FVQx4wl0qHu6lSB1-wXAJeP6g"

describe('Create membership: ',()=>{

    it('Create membership', async() => {
        var team = {
            "teamId": idEquipo,
            "userId": "test@tmup.com",
            "type": "player"
        };
        const response = await chaiT.request(url)
        .post('/memberships/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(team));
        expect(response).to.have.status(200);
            //expect(body).should.include("CM1");

    });
    it('Bad request in Create membership', async() => {
        var team = {
            "teamId": "WoeDNo65VDpLKB818Z0 ",
            "userId": "test@tmup.com",
            "type": "player"
        };
        const response = await chaiT.request(url)
        .post('/memberships/create')
        .set('content-type', 'application/raw')
        .set('authorization', token)
        .send(JSON.stringify(team));
        expect(response).to.have.status(400);
        
            //expect(body).should.include("CM1");

    });
});
   
describe('Get team memberships: ',()=>{ 
    it('Get all members', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/getByTeam/'+idEquipo)
        .query({type: "all"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 2 );

    });
    it('Get team player', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/getByTeam/'+idEquipo)
        .query({type: "player"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 1 );

    });


    it('Get team staff', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/getByTeam/'+idEquipo)
        .query({type: "staff"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 1 );
    });
    it('Get team physio', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/getByTeam/'+idEquipo)
        .query({type: "physio"})
        .set('authorization', token)
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 0 );
    });
});

describe('Get user memberships: ',()=>{ 

    it('Get all user memberships', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/getByUser/test@tmup.com')
        .set('authorization', token)
        expect(response).to.have.status(200);
        //expect(response.body.length).to.equals( 2 );

    });

    it('Get user role', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/type')
        .query({userId: "test@tmup.com",
                teamId: idEquipo})
        .set('authorization', token)
        expect(response).to.have.status(200);

    });

    it('Get player stats', async() => {
        const response = await chaiT.request(url)
        .get('/memberships/getStats/'+idEquipo+'/test@tmup.com')
        //.query({type: "player"})
        .set('authorization', token)
        expect(response).to.have.status(200);

    });

});

