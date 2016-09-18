var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');

var testcases = require('./v1/testcases.js');
var testsuites = require('./v1/testsuites.js');
var usergroups = require('./v1/usergroups.js');
var users = require('./v1/users.js');
var user = require('./v1/users.js');

// define the API versions
var API_VERSIONS = {'Pre-Production': '/v0', 'Version 1': '/v1'};
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);


// route to display API versions
router.get('/api', function(req, res) {
    res.json(API_VERSIONS);
})

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/testcases', testcases.getAll);
router.get('/api/v1/testcases/:id', testcases.getOne);
router.post('/api/v1/testcases/', testcases.create);
router.put('/api/v1/testcases/:id', testcases.update);
router.delete('/api/v1/testcases/:id', testcases.delete);

router.get('/api/v1/testsuites', testsuites.getAll);
router.get('/api/v1/testsuites/:id', testsuites.getOne);
router.post('/api/v1/testsuites/', testsuites.create);
router.put('/api/v1/testsuites/:id', testsuites.update);
router.delete('/api/v1/testsuites/:id', testsuites.delete);

router.get('/api/v1/usergroups', usergroups.getAll);
router.get('/api/v1/usergroups/:id', usergroups.getOne);
router.post('/api/v1/usergroups/', usergroups.create);
router.put('/api/v1/usergroups/:id', usergroups.update);
router.delete('/api/v1/usergroups/:id', usergroups.delete);

router.get('/api/v1/users', users.getAll);
router.get('/api/v1/users/:id', users.getOne);
router.post('/api/v1/users/', users.create);
router.put('/api/v1/users/:id', users.update);
router.delete('/api/v1/users/:id', users.delete);
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
 
module.exports = router;