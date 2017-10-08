import * as express from 'express';

import { Auth } from './auth';

import {
    Attachments,
    Notifications,
    Projects,
    ProjectSettings,
    Testcases,
    TestcaseSteps,
    Testsuites,
    Testplans,
    Testruns,
    TestResults,
    Users,
    UserGroups,
    UserSettings
} from './v1/index';



export class Routes {

    public router: express.Router;
    protected auth: Auth = new Auth();
    private attachments: Attachments = new Attachments();
    public notifications: Notifications = new Notifications();
    private projects: Projects = new Projects();
    private testcases: Testcases = new Testcases();
    private testcaseSteps: TestcaseSteps = new TestcaseSteps();
    private testsuites: Testsuites = new Testsuites();
    private testplans: Testplans = new Testplans();
    private testruns: Testruns = new Testruns();
    private testresults: TestResults = new TestResults();
    private usergroups: UserGroups = new UserGroups();
    private users: Users = new Users();
    private usersettings: UserSettings = new UserSettings();
    private projectsettings: ProjectSettings = new ProjectSettings();

    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes() {
        /*
         * Routes that can be accessed by any one
         */
        this.router.post('/authentication/login', this.auth.login.bind(this.auth));
        this.router.post('/authentication/refresh', this.auth.refresh.bind(this.auth));


        // route to display API versions
        const API_VERSIONS = { 'Version 1': '/v1' };

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
        this.router.put('/api/v1/projects/:id/settings', this.projectsettings.update.bind(this.projectsettings));
        this.router.delete('/api/v1/projects/:id/settings', this.projectsettings.delete.bind(this.projectsettings));

        this.router.get('/api/v1/testcases', this.testcases.getAll.bind(this.testcases));
        this.router.get('/api/v1/testcases/:id', this.testcases.getOne.bind(this.testcases));
        this.router.post('/api/v1/testcases/', this.testcases.create.bind(this.testcases));
        this.router.put('/api/v1/testcases/:id', this.testcases.update.bind(this.testcases));
        this.router.delete('/api/v1/testcases/:id', this.testcases.delete.bind(this.testcases));

        this.router.get('/api/v1/steps', this.testcaseSteps.getAll.bind(this.testcaseSteps));
        this.router.get('/api/v1/steps/:id', this.testcaseSteps.getOne.bind(this.testcaseSteps));
        this.router.post('/api/v1/steps/', this.testcaseSteps.create.bind(this.testcaseSteps));
        this.router.put('/api/v1/steps/:id', this.testcaseSteps.update.bind(this.testcaseSteps));
        this.router.delete('/api/v1/steps/:id', this.testcaseSteps.delete.bind(this.testcaseSteps));
        this.router.get('/api/v1/testcases/:id/steps', this.testcaseSteps.getAllTestcaseStepsByTestcaseId.bind(this.testcaseSteps));

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

        this.router.get('/api/v1/testresults', this.testresults.getAll.bind(this.testresults));
        this.router.get('/api/v1/testresults/:id', this.testresults.getOne.bind(this.testresults));
        this.router.post('/api/v1/testresults/', this.testresults.create.bind(this.testresults));
        this.router.put('/api/v1/testresults/:id', this.testresults.update.bind(this.testresults));
        this.router.delete('/api/v1/testresults/:id', this.testresults.delete.bind(this.testresults));

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
        this.router.put('/api/v1/users/:id/settings', this.usersettings.update.bind(this.usersettings));
        this.router.delete('/api/v1/users/:id/settings', this.usersettings.delete.bind(this.usersettings));


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
