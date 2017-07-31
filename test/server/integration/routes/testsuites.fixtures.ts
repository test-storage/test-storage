import * as faker from 'faker';
import { Testcasesuite } from '../../../../src/app/models/testcasesuite';

const testsuiteFixture: Testcasesuite = {
    'parentId': 0,
    'projectId': faker.random.uuid(),
    'prerequisites': faker.lorem.words(),
    'enabled': true,
    'name': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'environment': 'stage',
    'testcases': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

const editedTestsuiteFixture: Testcasesuite = {
    'parentId': faker.random.number(100),
    'projectId': faker.random.uuid(),
    'prerequisites': faker.lorem.words(),
    'enabled': false,
    'name': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'environment': 'production',
    'testcases': [faker.random.uuid(), faker.random.uuid()]
};

export { testsuiteFixture, editedTestsuiteFixture };
