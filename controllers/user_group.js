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
    userGroupDb.getById(id, function(err, group){
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(group);
        }
    }, test);
});

module.exports = router;