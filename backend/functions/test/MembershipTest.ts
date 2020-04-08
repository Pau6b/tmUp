let chaiT = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
var should = chaiT.should();


chaiT.use(chaiHttp);

const url = 'http://localhost:5001/tmup-908e4/us-central1/app';


describe('Post users: ',()=>{
    it('get all users', (done) => {
        chaiT.request(url)
        .get('/users/create')
        .send({email:"a@a.com", userName: "a"})
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
});
   
   