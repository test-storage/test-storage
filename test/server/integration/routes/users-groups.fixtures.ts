import * as faker from 'faker';

const modelFixture = {
    'name': faker.commerce.department(),
    'description': faker.lorem.words(),
    'enabled': true,
    'scope': {
        'testcases': 'read-only',
        'testsuites': 'read-only'
    },
    'users': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

const modelFixtureEdited = {
    'name': faker.commerce.department(),
    'description': faker.lorem.words(),
    'enabled': false,
    'scope': {
        'testcases': 'read-write',
        'testsuites': 'read-write'
    },
    'users': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};
export { modelFixture, modelFixtureEdited };
