import * as express from 'express';
const router = express.Router();

import { auth } from './auth';

import { projects } from './v1/projects';
import { testcases } from './v1/testcases';
import { testsuites } from './v1/testsuites';
import { testplans } from './v1/testplans';
import { groups } from './v1/groups';
import { users } from './v1/users';
import { attachments } from './v1/attachments';

// define the API versions
const API_VERSIONS = { 'Version 1': '/v1' };

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
// router.get('/api/v1/projects/:id/testsuites/', testsuites.getAllForProject);
// router.get('/api/v1/projects/:id/testsuites/:id', testsuites.getOneForProject);
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

export = router
