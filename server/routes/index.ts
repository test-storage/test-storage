import * as express from 'express';

import { Auth } from './auth';

import { Attachments } from './v1/attachments';
import { Notifications } from './v1/notifications';
import { Projects } from './v1/projects';
import { Testcases } from './v1/testcases';
import { Testsuites } from './v1/testsuites';
import { Testplans } from './v1/testplans';
import { Testruns } from './v1/testruns';
import { UserGroups } from './v1/users-groups';
import { Users } from './v1/users';
import { UserSettings } from './v1/usersettings';
import { ProjectSettings } from './v1/projectsettings';



class Routes {

    public router: express.Router;
    protected auth: Auth;
    private attachments: Attachments;
    public notifications: Notifications;
    public projects: Projects;
    private testcases: Testcases;
    private testsuites: Testsuites;
    private testplans: Testplans;
    private testruns: Testruns;
    private usergroups: UserGroups;
    private users: Users;
    private usersettings: UserSettings;
    private projectsettings: ProjectSettings;

    constructor() {

        this.router = express.Router();
        this.auth = new Auth();
        this.attachments = new Attachments();
        this.notifications = new Notifications();
        this.projects = new Projects();
        this.testcases = new Testcases();
        this.testsuites = new Testsuites();
        this.testplans = new Testplans();
        this.testruns = new Testruns();
        this.usergroups = new UserGroups();
        this.users = new Users();
        this.usersettings = new UserSettings();
        this.projectsettings = new ProjectSettings();

        // define the API versions
        const API_VERSIONS = { 'Version 1': '/v1' };

        /*
         * Routes that can be accessed by any one
         */
        this.router.post('/login', this.auth.login.bind(this.auth));


        // route to display API versions
        this.router.get('/api', function (req, res) {
            res.json(API_VERSIONS);
        });

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
        this.router.get('/api/v1/projects/:id/testcases', this.testcases.getAllTestcasesByProjectId.bind(this.testcases));
        this.router.get('/api/v1/projects/:id/testsuites', this.testsuites.getAllTestsuitesByProjectId.bind(this.testsuites));
        this.router.get('/api/v1/projects/:id/users', this.users.getAllUsersByProjectId.bind(this.users));
        this.router.post('/api/v1/projects/', this.projects.create.bind(this.projects));
        this.router.put('/api/v1/projects/:id', this.projects.update.bind(this.projects));
        this.router.delete('/api/v1/projects/:id', this.projects.delete.bind(this.projects));

        this.router.get('/api/v1/projects/:id/settings', this.projectsettings.getOne.bind(this.projectsettings));
        this.router.post('/api/v1/projects/:id/settings', this.projectsettings.create.bind(this.projectsettings));
        this.router.put('/api/v1/projects/:id/settings/:settingsId', this.projectsettings.update.bind(this.projectsettings));
        this.router.delete('/api/v1/projects/:id/settings/:settingsId', this.projectsettings.delete.bind(this.projectsettings));

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

        this.router.get('/api/v1/testruns', this.testruns.getAll.bind(this.testruns));
        this.router.get('/api/v1/testruns/:id', this.testruns.getOne.bind(this.testruns));
        this.router.post('/api/v1/testruns/', this.testruns.create.bind(this.testruns));
        this.router.put('/api/v1/testruns/:id', this.testruns.update.bind(this.testruns));
        this.router.delete('/api/v1/testruns/:id', this.testruns.delete.bind(this.testruns));

        this.router.get('/api/v1/users/groups', this.usergroups.getAll.bind(this.usergroups));
        this.router.get('/api/v1/users/groups/:id', this.usergroups.getOne.bind(this.usergroups));
        this.router.post('/api/v1/users/groups/', this.usergroups.create.bind(this.usergroups));
        this.router.put('/api/v1/users/groups/:id', this.usergroups.update.bind(this.usergroups));
        this.router.delete('/api/v1/users/groups/:id', this.usergroups.delete.bind(this.usergroups));

        this.router.get('/api/v1/users', this.users.getAll.bind(this.users));
        this.router.get('/api/v1/users/me', this.users.getUserMe.bind(this.users));
        this.router.get('/api/v1/users/:id', this.users.getOne.bind(this.users));
        this.router.post('/api/v1/users/', this.users.create.bind(this.users));
        this.router.put('/api/v1/users/:id', this.users.update.bind(this.users));
        this.router.delete('/api/v1/users/:id', this.users.delete.bind(this.users));

        this.router.get('/api/v1/users/:id/settings', this.usersettings.getOne.bind(this.usersettings));
        this.router.post('/api/v1/users/:id/settings', this.usersettings.create.bind(this.usersettings));
        this.router.put('/api/v1/users/:id/settings/:settingsId', this.usersettings.update.bind(this.usersettings));
        this.router.delete('/api/v1/users/:id/settings/:settingsId', this.usersettings.delete.bind(this.usersettings));


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
export { Routes };
