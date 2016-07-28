'use strict';
/***************
 * Configuration
 ***************/
var express = require('express'), 
    path = require('path'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    acquire = require('acquire'),
    config = acquire('config'),
    fs = require('fs'),
    concat = require('concat-stream');

var app = express(); // create the express app

// fetch current API version from configuration
var currentAPIVersion = config.api.version;

// view engine setup, default to html
app.set('views', __dirname.replace('/server', '/client'));
app.set('view engine', 'html');

app.use(favicon(__dirname.replace('/server', '/client') + '/assets/images/favicon.ico'));
app.use(compression()); // compress all requests

app.use(bodyParser.json()); // parse application/json
// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// make a public folder for express available
app.use(express.static(__dirname.replace('/server', '/client')));

// activate database and its routes
var api = require('./routes/api');

// set the API routes in express
app.use(config.api.root, api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// activate CORS for server
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
               'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// error handlers
app.set('env', config.app.environment);

// TODO: add bootstrapping capabilities

console.log('Web server listening at: %s', config.api.host + ":" + config.api.port);
// to start app in debug mode use: DEBUG=es_template:* ./bin/www OR nodemon --debug ./bin/www
module.exports = app;