/*
 * user_group.js
 * handles user group related messages
*/
var express = require('express');
var router = express.Router();
var userGroupDb = require('asw_basepkg').userGroup; // to access mysql db

router.get('/', function (req, res) {
    var test = req.query.test && (req.query.test == 'true');
    userGroupDb.get(function (err, groups) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(groups);
        }
    }, test);
});

router.post('/', function (req, res) {
    var test = req.query.test && (req.query.test == 'true');
    var userGroup = req.body;
    userGroupDb.post(userGroup, function (err, groups) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(groups);
        }
    }, test);
});

router.get('/:id', function(req, res){
    var test = req.query.test && (req.query.test == "true");
    var id = req.params.id;
    userGroupDb.getById(id, function(err, groups){
        if (err) return res.status(500).send(err.message);
        if (groups.length == 0) return res.status(404).send('User group not found');
        res.json(groups);
    }, test);
});

router.put('/:id', function(req, res){
    var test = req.query.test && (req.query.test == "true");
    var id = req.params.id;
    var userGroup = req.body;
    userGroupDb.put(userGroup, function(err, group){
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(group);
        }
    }, test);
});

router.delete('/:id', function(req, res){
    var test = req.query.test && (req.query.test == "true");
    var id = req.params.id;
    var userGroup = req.body;
    userGroupDb.delete(userGroup, function(err, group){
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(group);
        }
    }, test);
});

module.exports = router;