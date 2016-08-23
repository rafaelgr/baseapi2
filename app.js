/*
 * BASEAPI2
 * Its an api to test some important thigs.
*/
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    moment = require('moment');

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

// mount controllers for routes
var echo = require('./controllers/echo_controller');

// registering routes
app.use('/api/echo', echo);

// general API to export

var appAPI = {
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
    appAPI.init({
        apiPort: 8887
    });
}


module.exports = appAPI;