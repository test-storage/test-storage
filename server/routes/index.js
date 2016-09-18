var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');

var testcases = require('./testcases.js');
var testsuites = require('./testsuites.js');

var usergroups = require('./usergroups.js');
var users = require('./users.js');
var user = require('./users.js');

// TODO add versioning using {api_version} path param
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
 
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