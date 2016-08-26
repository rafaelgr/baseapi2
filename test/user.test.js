/*
 * user.test.js
*/

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    bpkg = require('asw_basepkg'),
    app = require('../app').app;
var expect = chai.expect;

describe("User API Test", function () {
    var tId = 0; // test Id
    before(function (done) {
        // prepare some records
        bpkg.dbCon.execSql('prepare_user_test.sql', function (err) {
            expect(err).to.be.null;
            done();
        }, true);
    });
    it("GET should return some users", function (done) {
        chai.request(app)
            .get('/api/user/?test=true')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.a.property("status", 200);
                expect(res).to.have.length;
                done();
            });
    });
    it("POST should create a user", function (done) {
        chai.request(app)
            .post('/api/user/?test=true')
            .send({
                id: 0,
                name: "TestUser",
                login: "login",
                password: "password",
                userGroup: {
                    id: 2,
                    name: "TestUserGroup"
                }
            })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.a.property("body");
                var u = res.body;
                expect(u).to.have.a.property("id");
                tId = u.id;
                done();
            });
    });
    it("GET/id should return the new ceated user", function (done) {
        chai.request(app)
            .get('/api/user/' + tId + '?test=true')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.a.property("status", 200);
                expect(res).to.have.a.property("body");
                var gs = res.body;
                expect(gs).to.have.length(1);
                var t = gs[0];
                var expected = {
                    id: tId,
                    name: "TestUser",
                    login: "login",
                    password: "password",
                    userGroup: {
                        id: 2,
                        name: "TestUserGroup"
                    }
                }
                expect(t).to.deep.equal(expected);
                done();
            });
    });
    it("PUT/id should modify the user with that id", function (done) {
        chai.request(app)
            .put('/api/user/' + tId + '?test=true')
            .send({
                id: tId,
                name: "TestUserChanged",
                login: "login",
                password: "password",
                userGroup: {
                    id: 2,
                    name: "TestUserGroup"
                }
            })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.a.property("body");
                var g = res.body;
                var expected = {
                    id: tId,
                    name: "TestUserChanged",
                    login: "login",
                    password: "password",
                    userGroup: {
                        id: 2,
                        name: "TestUserGroup"
                    }
                }
                expect(g).to.deep.equal(expected);
                done();
            });
    });
    it("DELETE/id should delete the user group with that id", function (done) {
        chai.request(app)
            .delete('/api/user/' + tId + '?test=true')
            .send({
                id: tId
            })
            .end(function (err, res) {
                expect(err).to.be.null;
                // check that record no loger exists
                bpkg.user.getById(tId, function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.length(0);
                    done();
                }, true)
            });
    });
    it("GET/id should return status 404 when user is not found", function (done) {
        chai.request(app)
            .get('/api/user/-1?test=true')
            .end(function (err, res) {
                expect(err).not.to.be.null;
                expect(res).to.have.a.property("status", 404);
                done();
            });
    });    
    after(function (done) {
        // after all delete records
        bpkg.dbCon.execSql('delete_test.sql', function (err) {
            expect(err).to.be.null;
            done();
        }, true);
    });
});

