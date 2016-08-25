/*
 * ECHO.JS
 * A test for the echo
*/
process.env.NODE_ENV = "TEST";

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app').app;

var should = chai.should();
chai.use(chaiHttp);

describe('Echo', function () {
    it("should return a default echo", function (done) {
        chai.request(app)
            .get('/api/echo')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    })
});