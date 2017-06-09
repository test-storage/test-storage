import * as faker from 'faker';
import { Testcase } from '../../../../src/app/models/testcase';

const testcaseFixture: Testcase = {
    'testSuiteId': '45069c63096d72f89cbf9205d27c985b',
    'priority': 1,
    'order': 2,
    'preConditions': 'Preconditions 1',
    'title': 'Testcase 1',
    'description': 'Test case description',
    'steps': ['Check that', 'Check this'],
    'testData': ['data1', 'data2'],
    'expected': ['Expected that', 'Expected this'],
    'postConditions': 'Postconditions 1',
    'tags': ['first tag', 'second tag'],
    'estimate': 10,
    'enabled': true,
    'isAutomated': true
}

const editedTestCaseFixture: Testcase = {
    'testSuiteId': '11111c63096d72f89cbf9205d27c985b',
    'priority': 2,
    'order': 3,
    'preConditions': 'Preconditions 1 edited',
    'title': 'Testcase 1 edited',
    'description': 'Test case description edited',
    'steps': ['Check that edited', 'Check this edited'],
    'testData': ['data1 edited', 'data2 edited'],
    'expected': ['Expected that edited', 'Expected this edited'],
    'postConditions': 'Postconditions 1 edited',
    'tags': ['first tag edited', 'second tag edited'],
    'estimate': 15,
    'enabled': true,
    'isAutomated': true,
    'status': 'approved'
};

export { testcaseFixture, editedTestCaseFixture }
