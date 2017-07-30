import * as faker from 'faker';
import { Notification } from '../../../../src/app/models/notification';

const fixture: Notification = {
    'title': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'entity': 'Test Plan',
    'action': 'ASSIGN',
    'senderId': faker.random.uuid(),
    'recipientId': faker.random.uuid()
};

const changedFixture: Notification = {
    'title': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'entity': 'Test Case',
    'action': 'ASSIGN',
    'senderId': faker.random.uuid(),
    'recipientId': faker.random.uuid()
};

export { fixture, changedFixture };

