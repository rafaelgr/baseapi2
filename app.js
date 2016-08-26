/*
 * BASEAPI2
 * Its an api to test some important thigs.
*/
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    moment = require('moment'),
    morgan = require('morgan');

// load default configuration
var cfg = require('./config/config.json');
// to know api version=
var pack = require('./package.json');
// express
var app = express();
// starting express
var app = express();
// to parse body content
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// using cors for cross class
app.use(cors());
// static html server
app.use(express.static(__dirname + "/public"));

// morgan log if we aren't testing
if (process.env.NODE_ENV != "TEST"){
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// mount controllers for routes
var echo = require('./controllers/echo');
var user_group = require('./controllers/user_group');
var user = require('./controllers/user');

// registering routes
app.use('/api/echo', echo);
app.use('/api/user_group', user_group);
app.use('/api/user', user);

// general API to export

var appAPI = {
    app: app,
    init: function (config) {
        // we use default o passed config
        if (config) {
            cfg = config;
        }
        // start listeninig
        app.listen(cfg.apiPort);
        // -- console message
        console.log("-------------------------------------------");
        console.log(" BASEAPI2 ", moment(new Date()).format('DD/MM/YYYYY HH:mm:ss'));
        console.log("-------------------------------------------");
        console.log(' VERSION: ' + pack.version);
        console.log(' PORT: ' + cfg.apiPort);
        console.log("-------------------------------------------");
    }
}

if (process.env.NODE_ENV == "DEV"){
    appAPI.init();
}


module.exports = appAPI;