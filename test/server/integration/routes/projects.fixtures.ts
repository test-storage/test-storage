import * as faker from 'faker';
import { Project } from '../../../../src/app/models/project';

const fixture: Project = {
    'name': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'enabled': true
};

const changedFixture: Project = {
    'name': faker.commerce.productName(),
    'description': faker.lorem.words(),
    'enabled': false
};
export { fixture, changedFixture };

