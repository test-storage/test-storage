import * as faker from 'faker';

import { User } from '../../../../src/app/models/user';
import { Social } from '../../../../src/app/models/social.model';
import { WorkInfo } from '../../../../src/app/models/work.model';
import { UserGroup } from '../../../../src/app/models/usergroup';

import { Project } from '../../../../src/app/models/project';
import { Testsuite } from '../../../../src/app/models/testsuite';
import { Testcase } from '../../../../src/app/models/testcase';
import { Testplan } from '../../../../src/app/models/testplan';
import { Testrun } from '../../../../src/app/models/testrun';
import { Notification } from '../../../../src/app/models/notification';
import { Attachment } from '../../../../src/app/models/attachment';

export class MockFactory {

    createUser(): User {
        const user: User = new User();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = this.getRandomNumber() + faker.internet.email();
        user.password = faker.internet.password();
        user.projects = [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()];
        user.workInfo = new WorkInfo();
        user.workInfo.jobTitle = faker.name.jobTitle();
        user.workInfo.phoneNumber = faker.phone.phoneNumber();
        user.workInfo.companyName = faker.company.companyName();
        user.social = new Social();
        user.social.skype = faker.internet.userName();
        user.social.github = faker.internet.userName();
        user.social.facebook = faker.internet.url();
        user.social.twitter = faker.internet.url();
        user.social.linkedin = faker.internet.url();
        user.userGroups = [faker.random.uuid(), faker.random.uuid()];
        return user;
    }

    createProject(): Project {
        const project: Project = new Project();
        project.name = faker.commerce.productName();
        project.description = faker.lorem.words();
        project.enabled = faker.random.boolean();
        return project;
    }


    createTestsuite(): Testsuite {
        const testsuite: Testsuite = new Testsuite();
        testsuite.parentId = null;
        testsuite.projectId = faker.random.uuid();
        testsuite.enabled = faker.random.boolean();
        testsuite.name = faker.commerce.productName();
        testsuite.description = faker.lorem.words();
        return testsuite;
    }

    createTestcase(): Testcase {
        const testcase: Testcase = new Testcase();
        testcase.projectId = faker.random.uuid();
        testcase.testSuiteId = faker.random.uuid();
        testcase.priority = 1;
        testcase.order = 2;
        testcase.preConditions = faker.lorem.words();
        testcase.title = faker.commerce.productName();
        testcase.description = faker.lorem.words();
        testcase.steps = ['Check This', 'Check That'];
        testcase.testData = ['data1', 'data2'];
        testcase.expected = ['Expected This', 'Expected That'];
        testcase.postConditions = faker.lorem.words();
        testcase.tags = ['regression', 'smoke'];
        testcase.estimate = 10;
        testcase.status = 'CREATED';
        testcase.enabled = faker.random.boolean();
        testcase.isAutomated = faker.random.boolean();
        return testcase;
    }

    createAttachment(): Attachment {
        const attachment: Attachment = new Attachment();
        attachment.name = faker.commerce.productName();
        attachment.description = faker.lorem.words();
        return attachment;
    }

    createTestPlan(): Testplan {
        const testplan: Testplan = new Testplan();
        testplan.name = faker.commerce.productName();
        testplan.description = faker.commerce.productAdjective();
        testplan.projectId = faker.random.uuid();
        testplan.builds = ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244', '2.0.0'];
        testplan.environments = ['Dev', 'Stage', 'Production'];
        testplan.platforms = ['iOS'];
        testplan.testcaseSuiteId = faker.random.uuid();
        testplan.startDate = faker.date.recent().toISOString();
        testplan.endDate = faker.date.future().toISOString();
        return testplan;
    }

    createTestRun(): Testrun {
        const testrun: Testrun = new Testrun();
        testrun.name = faker.commerce.productName();
        testrun.description = faker.commerce.productAdjective();
        testrun.projectId = faker.random.uuid();
        testrun.builds = ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244', '2.0.0'];
        testrun.environments = ['Dev', 'Stage', 'Production'];
        testrun.platforms = ['Android'];
        testrun.testcaseSuiteId = faker.random.uuid();
        testrun.startDate = faker.date.recent().toISOString();
        testrun.endDate = faker.date.future().toISOString();
        return testrun;
    }

    createNotification(): Notification {
        const notification: Notification = new Notification();
        notification.title = faker.commerce.productName();
        notification.description = faker.lorem.words();
        notification.entity = 'Test Plan';
        notification.action = 'ASSIGN';
        notification.senderId = faker.random.uuid();
        notification.recipientId = faker.random.uuid();
        return notification;
    }

    createUserGroup(): UserGroup {
        const userGroup: UserGroup = new UserGroup();
        userGroup.name = faker.commerce.department();
        userGroup.description = faker.lorem.words();
        userGroup.enabled = true;
        userGroup.scope = ['testcases:read', 'testsuites:read'];
        return userGroup;
    }


    getRandomNumber() {
        return Math.floor(Math.random() * 100000) + 1;
    }

}

