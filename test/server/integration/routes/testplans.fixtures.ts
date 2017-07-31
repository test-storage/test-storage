import * as faker from 'faker';
import { Testplan } from '../../../../src/app/models/testplan';

const testplanFixture: Testplan = {
    'name': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'builds': ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244'],
    'environments': ['Stage', 'Production'],
    'testruns': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

const editedTestplanFixture: Testplan = {
    'name': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'builds': ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244', '2.0.0'],
    'environments': ['Dev', 'Stage', 'Production'],
    'testruns': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

export { testplanFixture, editedTestplanFixture };
