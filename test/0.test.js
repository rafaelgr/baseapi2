/*
 * 0.test.js
 * Previous to all test we have to confirm
 * that we have a database and the correct tables in it
 * -- update base pkg --
*/
process.env.NODE_ENV = "TEST";

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    bpkg = require('asw_basepkg'),
    app = require('../app').app;
var expect = chai.expect;

chai.use(chaiHttp);

describe("Verifiy databases and tables", function(){
    it("should have a database and tables", function(done){
        bpkg.dbCon.verifyDataBase(function(err){
            expect(err).to.be.null;
            done();
        }, true);
    });
});