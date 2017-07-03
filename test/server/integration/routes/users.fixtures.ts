import * as faker from 'faker';
import { User } from '../../../../src/app/models/user';

const modelFixture: User = {
    'firstName': faker.name.firstName(),
    'lastName': faker.name.lastName(),
    'email': faker.internet.email(),
    'password': faker.internet.password(),
    'work': {
        'title': faker.name.jobTitle(),
        'phone': faker.phone.phoneNumber(),
        'company': faker.company.companyName()
    },
    'social': {
        'github': faker.internet.url(),
        'facebook': faker.internet.url(),
        'twitter': faker.internet.url(),
        'linkedin': faker.internet.url()
    },
    'userGroups': [faker.random.uuid(), faker.random.uuid()]
};

const modelFixtureEdited: User = {
    'firstName': faker.name.firstName(),
    'lastName': faker.name.lastName(),
    'email': faker.internet.email(),
    'password': faker.internet.password(),
    'work': {
        'title': faker.name.jobTitle()
    },
    'social': {
        'github': faker.internet.url(),
        'facebook': faker.internet.url(),
        'twitter': faker.internet.url(),
        'linkedin': faker.internet.url()
    },
    'userGroups': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

export { modelFixture, modelFixtureEdited }
