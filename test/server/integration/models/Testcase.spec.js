var mongoose = require('mongoose');
var should = require('should');
var config = require('config');

var Testcase = require('../../../../server/models/Testcase.js');

describe('Testcase', () => {
  beforeEach((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.get('db.path') + "/" + "test-db")
      .then(() => console.log('MongoDB connection successful'))
      .catch((err) => console.error(err));
    done();
  });

  describe('Given a valid testcase', () => {

    it('should create the testcase', (done) => {
      const testcase = new Testcase(
        {
          title: 'My testcase title'

        });

      testcase.save((err, actual) => {
        actual.title.should.be.equal(testcase.title);

        done();
      });
    });


  });
});