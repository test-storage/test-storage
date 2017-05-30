var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
mongoose.Promise = global.Promise;
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

var faker = require('faker');
var suitename = '';

var should = require('should');
var config = require('config');

var Testsuite = require('../../../../server/models/Testsuite.js');

beforeEach(function (done) {
    mockgoose.prepareStorage().then(function () {
        mongoose.connect(config.get('db.path') + '/' + 'test-db')
            .then(() => console.log('MongoDB connection successful'))
            .catch((err) => console.error(err));
        done();
    });
});

// describe('Testsuite', () => {
/*
beforeEach((done) => {

    mockgoose.prepareStorage().then(function () {
        mongoose.connect(config.get('db.path') + "/" + "test-db", function (err) {
            suitename = faker.commerce.product();
            console.log("suitename: " + suitename);
            done(err);
        });


    });

    // mockgoose.reset();
    /*
    mongoose.Promise = global.Promise;
    mongoose.connect(config.get('db.path') + "/" + "test-db")
        .then(() => console.log('MongoDB connection successful'))
        .catch((err) => console.error(err));
        */
/*  done();
});*/

describe('Given a valid testsuite', () => {

    it('should create the testsuite', (done) => {

        const testsuite = new Testsuite(
            {
                name: 'suitename'
            });

        testsuite.save((err, actual) => {
            if (err) console.log("err:" + err)
            actual.name.should.be.equal(testsuite.name);

            done();
        });
    });


});
    /*
        afterEach((done) => {
            mongoose.connection.close();
            done();
        });
        */
// });