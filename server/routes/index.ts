import * as express from 'express';

import { Auth } from './auth';

import { Attachments } from './v1/attachments';
import { Notifications } from './v1/notifications';
import { Projects } from './v1/projects';
import { Testcases } from './v1/testcases';
import { Testsuites } from './v1/testsuites';
import { Testplans } from './v1/testplans';
import { Groups } from './v1/groups';
import { Users } from './v1/users';



class Routes {

    public router: express.Router;
    protected auth: Auth;
    private attachments: Attachments;
    public notifications: Notifications;
    public projects: Projects;
    private testcases: Testcases;
    private testsuites: Testsuites;
    private testplans: Testplans;
    private groups: Groups;
    private users: Users;

    constructor() {

        this.router = express.Router();
        this.auth = new Auth();
        this.attachments = new Attachments();
        this.notifications = new Notifications();
        this.projects = new Projects();
        this.testcases = new Testcases();
        this.testsuites = new Testsuites();
        this.testplans = new Testplans();
        this.groups = new Groups();
        this.users = new Users();

        // define the API versions
        const API_VERSIONS = { 'Version 1': '/v1' };

        /*
         * Routes that can be accessed by any one
         */
        this.router.post('/login', this.auth.login.bind(this.auth));


        // route to display API versions
        this.router.get('/api', function (req, res) {
            res.json(API_VERSIONS);
        })

        /*
         * Routes that can be accessed only by autheticated users
         */

        this.router.get('/api/v1/attachments', this.attachments.getAll.bind(this.attachments));
        this.router.get('/api/v1/attachments/:id', this.attachments.getOne.bind(this.attachments));
        this.router.post('/api/v1/attachments', this.attachments.create.bind(this.attachments));
        this.router.put('/api/v1/attachments/:id', this.attachments.update.bind(this.attachments));
        this.router.delete('/api/v1/attachments/:id', this.attachments.delete.bind(this.attachments));

        this.router.get('/api/v1/notifications', this.notifications.getAll.bind(this.notifications));
        this.router.get('/api/v1/notifications/:id', this.notifications.getOne.bind(this.notifications));
        this.router.post('/api/v1/notifications', this.notifications.create.bind(this.notifications));
        this.router.put('/api/v1/notifications/:id', this.notifications.update.bind(this.notifications));
        this.router.delete('/api/v1/notifications/:id', this.notifications.delete.bind(this.notifications));

        this.router.get('/api/v1/projects', this.projects.getAll.bind(this.projects));
        this.router.get('/api/v1/projects/:id', this.projects.getOne.bind(this.projects));
        // this.router.get('/api/v1/projects/:id/testsuites/', testsuites.getAllForProject);
        // this.router.get('/api/v1/projects/:id/testsuites/:id', testsuites.getOneForProject);
        this.router.post('/api/v1/projects/', this.projects.create.bind(this.projects));
        this.router.put('/api/v1/projects/:id', this.projects.update.bind(this.projects));
        this.router.delete('/api/v1/projects/:id', this.projects.delete.bind(this.projects));

        this.router.get('/api/v1/testcases', this.testcases.getAll.bind(this.testcases));
        this.router.get('/api/v1/testcases/:id', this.testcases.getOne.bind(this.testcases));
        this.router.post('/api/v1/testcases/', this.testcases.create.bind(this.testcases));
        this.router.put('/api/v1/testcases/:id', this.testcases.update.bind(this.testcases));
        this.router.delete('/api/v1/testcases/:id', this.testcases.delete.bind(this.testcases));

        this.router.get('/api/v1/testsuites', this.testsuites.getAll.bind(this.testsuites));
        this.router.get('/api/v1/testsuites/:id', this.testsuites.getOne.bind(this.testsuites));
        this.router.post('/api/v1/testsuites/', this.testsuites.create.bind(this.testsuites));
        this.router.put('/api/v1/testsuites/:id', this.testsuites.update.bind(this.testsuites));
        this.router.delete('/api/v1/testsuites/:id', this.testsuites.delete.bind(this.testsuites));

        this.router.get('/api/v1/testplans', this.testplans.getAll.bind(this.testplans));
        this.router.get('/api/v1/testplans/:id', this.testplans.getOne.bind(this.testplans));
        this.router.post('/api/v1/testplans/', this.testplans.create.bind(this.testplans));
        this.router.put('/api/v1/testplans/:id', this.testplans.update.bind(this.testplans));
        this.router.delete('/api/v1/testplans/:id', this.testplans.delete.bind(this.testplans));

        this.router.get('/api/v1/groups', this.groups.getAll.bind(this.groups));
        this.router.get('/api/v1/groups/:id', this.groups.getOne.bind(this.groups));
        this.router.post('/api/v1/groups/', this.groups.create.bind(this.groups));
        this.router.put('/api/v1/groups/:id', this.groups.update.bind(this.groups));
        this.router.delete('/api/v1/groups/:id', this.groups.delete.bind(this.groups));

        this.router.get('/api/v1/users', this.users.getAll.bind(this.users));
        this.router.get('/api/v1/users/:id', this.users.getOne.bind(this.users));
        this.router.post('/api/v1/users/', this.users.create.bind(this.users));
        this.router.put('/api/v1/users/:id', this.users.update.bind(this.users));
        this.router.delete('/api/v1/users/:id', this.users.delete.bind(this.users));

        /*
         * Routes that can be accessed only by authenticated & authorized users
         */
        this.router.get('/api/v1/admin/users', this.users.getAll.bind(this.users));
        this.router.get('/api/v1/admin/users/:id', this.users.getOne.bind(this.users));
        this.router.post('/api/v1/admin/users/', this.users.create.bind(this.users));
        this.router.put('/api/v1/admin/users/:id', this.users.update.bind(this.users));
        this.router.delete('/api/v1/admin/users/:id', this.users.delete.bind(this.users));
    }
}
export { Routes }
