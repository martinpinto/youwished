// CouchDB ===========================================
var acquire = require('acquire');
var config = acquire('config');
var nano = require('nano')('http://' + config.database.couchdb.host + ":" + config.database.couchdb.port);
module.exports = nano;