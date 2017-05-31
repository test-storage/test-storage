import * as faker from 'faker';
import { Project } from '../../../../src/app/models/project';

const fixture: Project = {
    'name': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'enabled': true,
    'testcases': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

const changedFixture: Project = {
    'name': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'enabled': false,
    'testcases': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};
export { fixture, changedFixture };

