/*
 * user_group.test.js
*/

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    bpkg = require('asw_basepkg'),
    app = require('../app').app;
var expect = chai.expect;

describe("User Group API Test", function () {
    var tId = 0;
    before(function (done) {
        // prepare some records
        bpkg.dbCon.execSql('prepare_user_group_test.sql', function (err) {
            expect(err).to.be.null;
            done();
        }, true);
    });
    it("GET should return some user groups", function (done) {
        chai.request(app)
            .get('/api/user_group/?test=true')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.a.property("status", 200);
                expect(res).to.have.length;
                done();
            });
    });
    it("POST should create a user group", function (done) {
        chai.request(app)
            .post('/api/user_group/?test=true')
            .send({
                id: 0,
                name: "TestUserGroup"
            })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.a.property("body");
                var g = res.body;
                expect(g).to.have.a.property("id");
                tId = g.id;
                done();
            });
    });
    it("GET/id should return the user group with this id ", function (done) {
        chai.request(app)
            .get('/api/user_group/' + tId + '?test=true')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.a.property("status", 200);
                expect(res).to.have.a.property("body");
                var gs = res.body;
                expect(gs).to.have.length(1);
                var t = gs[0];
                var expected = {
                    id: tId,
                    name: "TestUserGroup"
                }
                expect(t).to.deep.equal(expected);
                done();
            });
    });
    it("PUT/id should modify the user group with that id", function (done) {
        chai.request(app)
            .put('/api/user_group/' + tId + '?test=true')
            .send({
                id: tId,
                name: "TestUserGroupX"
            })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.a.property("body");
                var g = res.body;
                var expected = {
                    id: tId,
                    name: "TestUserGroupX"
                }
                expect(g).to.deep.equal(expected);
                done();
            });
    });
    it("DELETE/id should delete the user group with that id", function (done) {
        chai.request(app)
            .delete('/api/user_group/' + tId + '?test=true')
            .send({
                id: tId,
                name: "TestUserGroupX"
            })
            .end(function (err, res) {
                expect(err).to.be.null;
                // check that record no loger exists
                bpkg.userGroup.getById(tId, function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.length(0);
                    done();
                }, true)
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

