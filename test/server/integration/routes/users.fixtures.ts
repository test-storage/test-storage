import * as faker from 'faker';
import { User } from '../../../../src/app/models/user';

const modelFixture: User = {
    'firstName': faker.name.firstName(),
    'lastName': faker.name.lastName(),
    'email': faker.internet.email(),
    'password': faker.internet.password(),
    'title': faker.name.jobTitle(),
    'groups': [faker.random.uuid(), faker.random.uuid()]
};

const modelFixtureEdited: User = {
    'firstName': faker.name.firstName(),
    'lastName': faker.name.lastName(),
    'email': faker.internet.email(),
    'password': faker.internet.password(),
    'title': faker.name.jobTitle(),
    'groups': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

export { modelFixture, modelFixtureEdited }
