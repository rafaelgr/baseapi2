/*
 * user.js
 * handles user group related messages
*/
var express = require('express');
var router = express.Router();
var userDb = require('asw_basepkg').user; // to access mysql db

router.get('/', function (req, res) {
    var test = req.query.test && (req.query.test == 'true');
    userDb.get(function (err, users) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(users);
        }
    }, test);
});

router.post('/', function (req, res) {
    var test = req.query.test && (req.query.test == 'true');
    var user = req.body;
    userDb.post(user, function (err, users) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(users);
        }
    }, test);
});

router.get('/:id', function(req, res){
    var test = req.query.test && (req.query.test == "true");
    var id = req.params.id;
    userDb.getById(id, function(err, group){
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(group);
        }
    }, test);
});

router.put('/:id', function(req, res){
    var test = req.query.test && (req.query.test == "true");
    var id = req.params.id;
    var user = req.body;
    userDb.put(user, function(err, user){
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(user);
        }
    }, test);
});

router.delete('/:id', function(req, res){
    var test = req.query.test && (req.query.test == "true");
    var id = req.params.id;
    var user = req.body;
    userDb.delete(user, function(err, group){
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(group);
        }
    }, test);
});

module.exports = router;