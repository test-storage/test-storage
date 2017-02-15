var express = require('express');
var router = express.Router();

var auth = require('./auth.js');

var projects = require('./v1/projects.js');
var testcases = require('./v1/testcases.js');
var testsuites = require('./v1/testsuites.js');
var testplans = require('./v1/testplans.js');
var groups = require('./v1/groups.js');
var users = require('./v1/users.js');
var attachments = require('./v1/attachments.js');

// define the API versions
var API_VERSIONS = { 'Version 1': '/v1' };

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);


// route to display API versions
router.get('/api', function (req, res) {
    res.json(API_VERSIONS);
})

/*
 * Routes that can be accessed only by autheticated users
 */

router.get('/api/v1/attachments', attachments.getAll);
router.get('/api/v1/attachments/:id', attachments.getOne);
router.post('/api/v1/attachments', attachments.create);
router.put('/api/v1/attachments/:id', attachments.update);
router.delete('/api/v1/attachments/:id', attachments.delete);

router.get('/api/v1/projects', projects.getAll);
router.get('/api/v1/projects/:id', projects.getOne);
router.post('/api/v1/projects/', projects.create);
router.put('/api/v1/projects/:id', projects.update);
router.delete('/api/v1/projects/:id', projects.delete);

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

router.get('/api/v1/testplans', testplans.getAll);
router.get('/api/v1/testplans/:id', testplans.getOne);
router.post('/api/v1/testplans/', testplans.create);
router.put('/api/v1/testplans/:id', testplans.update);
router.delete('/api/v1/testplans/:id', testplans.delete);

router.get('/api/v1/groups', groups.getAll);
router.get('/api/v1/groups/:id', groups.getOne);
router.get('api/v1/groups/:id/users/', groups.getAllGroupUsers);
router.get('api/v1/groups/:id/users/:userid', groups.getOneGroupUser);
router.post('/api/v1/groups/', groups.create);
router.put('/api/v1/groups/:id', groups.update);
router.delete('/api/v1/groups/:id', groups.delete);

router.get('/api/v1/users', users.getAll);
router.get('/api/v1/users/:id', users.getOne);
router.post('/api/v1/users/', users.create);
router.put('/api/v1/users/:id', users.update);
router.delete('/api/v1/users/:id', users.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', users.getAll);
router.get('/api/v1/admin/users/:id', users.getOne);
router.post('/api/v1/admin/users/', users.create);
router.put('/api/v1/admin/users/:id', users.update);
router.delete('/api/v1/admin/users/:id', users.delete);

module.exports = router;