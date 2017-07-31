import * as chai from 'chai';
const expect = chai.expect;
import * as faker from 'faker';

import { connectToMockDB } from '../../db-helper';



import { Testsuite } from '../../../../server/models/Testsuite';


beforeEach(function (done) {
    connectToMockDB();
    done();
});


describe('Testsuite Model', () => {

    describe('Given a valid testsuite', () => {

        it('should create the testsuite', (done) => {

            const testsuite = new Testsuite(
                {
                    name: faker.commerce.product()
                });

            testsuite.save((err, actual) => {
                expect(actual.name).to.be.equal(testsuite.name);

                done();
            });
        });

    });

});
