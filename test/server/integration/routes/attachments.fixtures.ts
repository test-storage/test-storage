import * as faker from 'faker';
import { Attachment } from '../../../../src/app/models/attachment';

const modelFixture = {
    'name': 'Dummy attachment',
    'description': 'Dummy attachment file'
};

const modelFixtureEdited = {
    'name': 'Dummy attachment edited',
    'description': 'Dummy attachment file edited',
};

export { modelFixture, modelFixtureEdited };
