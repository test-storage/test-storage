import * as chai from 'chai';
const expect = chai.expect;

import { connectToMockDB } from '../../db-helper';

import { Testcase } from '../../../../server/models/Testcase';


beforeEach((done) => {
  connectToMockDB();
  done();
});


describe('Testcase Model', () => {

  describe('Given a valid testcase', () => {

    it('should create the testcase', (done) => {

      const testcase = new Testcase(
        {
          title: 'My testcase title'
        });

      testcase.save((err, actual) => {
        expect(actual.title).to.be.equal(testcase.title);

        done();
      });
    });
  });
});
