import * as faker from 'faker';
import { User } from '../../../../src/app/models/user';

const modelFixture: User = {
    'firstName': faker.name.firstName(),
    'lastName': faker.name.lastName(),
    'email': getRandomNumber() + faker.internet.email(),
    'password': faker.internet.password(),
    'work': {
        'title': faker.name.jobTitle(),
        'phone': faker.phone.phoneNumber(),
        'company': faker.company.companyName()
    },
    'social': {
        'skype': faker.internet.userName(),
        'github': faker.internet.url(),
        'facebook': faker.internet.url(),
        'twitter': faker.internet.url(),
        'linkedin': faker.internet.url()
    },
    'userGroups': [faker.random.uuid(), faker.random.uuid()],
    'projects': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

const modelFixtureEdited: User = {
    'firstName': faker.name.firstName(),
    'lastName': faker.name.lastName(),
    'email': getRandomNumber() + faker.internet.email(),
    'password': faker.internet.password(),
    'work': {
        'title': faker.name.jobTitle()
    },
    'social': {
        'skype': faker.internet.userName(),
        'github': faker.internet.url(),
        'facebook': faker.internet.url(),
        'twitter': faker.internet.url(),
        'linkedin': faker.internet.url()
    },
    'userGroups': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()],
    'projects': [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
};

function getRandomNumber() {
    return Math.floor(Math.random() * 100000) + 1;
}

export { modelFixture, modelFixtureEdited };
