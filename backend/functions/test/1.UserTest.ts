let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'https://us-central1-tmup-908e4.cloudfunctions.net/app';
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1YzlhZWJlMjM0ZGE2MDE2YmQ3Yjk0OTE2OGI4Y2Q1YjRlYzllZWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidGVzdCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90bXVwLTkwOGU0IiwiYXVkIjoidG11cC05MDhlNCIsImF1dGhfdGltZSI6MTU4OTk3NDg2NCwidXNlcl9pZCI6Inc3WnNhWlZmRVNRajdjME1rdW5Vd2VBVjR5aDEiLCJzdWIiOiJ3N1pzYVpWZkVTUWo3YzBNa3VuVXdlQVY0eWgxIiwiaWF0IjoxNTg5OTc0ODY0LCJleHAiOjE1ODk5Nzg0NjQsImVtYWlsIjoidGVzdEB0bXVwLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRtdXAuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.PDdNivByl-AHSxFbv0r02AFF89-_8TqSU6N4MFv7BbkFtg7zQRz2j2dipJ0JwQpZD67Eiy8zjq2rFc6hNI2WIZ5-B4ALEj9e_bkayzoPx0dJp1I43qzsT-6fDtX5Z-Olw1q3QIBMBc0swlAm8vlrWCr9n1a7472nKcgJCfPqb3ion5f3KmoTTYIZ8rrjeyvmqx_TbvbnKCTLh06J_ynzndHf3KSdXmaKZVE64LrLEtvn-RawKte8g8lbeudrjf1ZRXt5T5Xm6U8tKX-ibY04pdXfqo9BZD37qbla-2ef_HpD1vJhQ1EVwxEihxb1u_QJxowmNLaif1YZ_2b37RLhuQ"


describe('Get users: ',()=> {

    it('Get all users', async() => {
        const response = await chaiT.request(url)
        .get('/users')
        .set('authorization', token);
        expect(response).to.have.status(200);
        expect(response.body.length).to.equals( 3 );
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
});
