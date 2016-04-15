/************
 * API Routes
 ************/
/**
 * This rounter handler manages all routes incoming from the web browser to the API.
 */
var express = require('express');
var router = express.Router();
var acquire = require('acquire');
var config = acquire('config');

// localhost
var localhost = config.database.localhost;

// CouchDB information
// docs: https://github.com/dscape/nano
var couchdb = acquire('couchdb');
var databases = config.database.couchdb.databases;
var wishesDB = databases[0];

// wish model
var wishModel = acquire('models');

/**
 *  Test route
 *  sends HTTP status 200 to show server is working OK.
 *  @return an HTTP status 200
 */
router.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', localhost);
    res.status(200).send('API up and ready');
});

var WISH_PATH = '/wish/';

///////////////////////////////// WISHES /////////////////////////////////
// always make sure couchdb is running in the background

// get all wishes
router.get(WISH_PATH + 'all', function (req, res) {
    console.log('[server] calling GET ' + WISH_PATH + 'all path');
    res.header('Access-Control-Allow-Origin', localhost);
    
    var db = couchdb.db.use(wishesDB);
    db.list({ 'include_docs': true }, function (error, body) {
        var results = [];
        console.log(body);
        if (body !== 'undefined') {
            for (var i = 0; i < body.total_rows; i++) {
                var row = body.rows[i];
                var id = row.id;
                console.log(row);
                results.push(wishModel.createWishFromBody(row.doc));
            }
        }
        res.status(200).send(results);
    });
});

/* Sample Code
var db       = require('nano')('http://localhost:5984/my_db')
  , per_page = 10
  , params   = {include_docs: true, limit: per_page, descending: true}
  ;

db.list(params, function(error,body,headers) {
  console.log(body);
});
*/

// get wish by id
router.get(WISH_PATH + ':id', function (req, res) {
    console.log('[server] calling GET ' + WISH_PATH + ':id path');
    res.header('Access-Control-Allow-Origin', localhost);
    
    var id = req.params.id;
    
    var db = couchdb.db.use(wishesDB);
    db.get(id, function (error, body, headers) {
        var wish = wishModel.createWishFromBody(body); // map body to wish schema
    
        res.status(200).send(wish);
    }); // send 404 when not found
});

// post new wish
router.post(WISH_PATH, function (req, res) {
    console.log('[server] calling POST ' + WISH_PATH + ' path');
    res.header('Access-Control-Allow-Origin', localhost);
    
    if (req.params !== 'undefined') {
        var wish = WishModel.createWishFromBody(req.params);
        
        if (wish.title === 'undefined' || wish.author === 'undefined') {
            // 403 bad request, if missing info, like title or author
            res.status(403).send({ error: 'missing mandatory title or author', status: 'forbidden', code: 403 });
        }
    
        var db = couchdb.db.use(wishesDB);
        db.insert(wish, function (error, body) {
            if (!err) {
                res.status(201).send({ documentId: id, status: 'inserted', code: 201 });    
            } else {
                // 500 bad request, if missing info, like title
                res.status(500).send({ error: err, status: 'internal error', code: 500});
            }
        });    
    } else { // 404 req params were empty
        res.status(404).send({ documentId: -1, status: 'not found', code: 404 });
    }
});

// delete wish by ID
router.delete(WISH_PATH + ':id', function (req, res) {
    console.log('[server] calling DELETE ' + WISH_PATH + ' path');
    res.header('Access-Control-Allow-Origin', localhost);
    
    var id = req.params.id;
    
    if (id === 'undefined') {
        // 403 bad request, if missing info, like ID or wrong ID
        res.status(403).send({ error: 'missing mandatory id', status: 'forbidden', code: '403'});
    }
    
    var db = couchdb.db.use(wishesDB);
    db.get(id, function (error, body, headers) {
        var revisionId = body.rev;
        db.destroy(id, revisionId, function (error, body) {
            if (!err) {
                res.status(200).send({ documentId: id, status: 'deleted', code: 200 });
            } else {
                res.status(404).send({ documentId: id, status: 'not found', code: 404 });
            }
        });
       
       res.status(200).send(wish);
    });
});


module.exports = router;
