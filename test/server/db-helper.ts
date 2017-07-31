import * as config from 'config';
import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose: Mockgoose = new Mockgoose(mongoose);
mongoose.Promise = global.Promise;

/**
 * Database connection helper.
 *
 */

async function connectToDB() {

  const connectionString = config.get('db.scheme') +
    config.get('db.user') + ':' + config.get('db.password') + '@' +
    config.get('db.host') + '/' + config.get('db.name');

  const connectionOptions = {
    useMongoClient: true
  };

  await mongoose.connect(connectionString, connectionOptions)
    .then(() => console.log('MongoDB connection successful'))
    .catch((err) => console.error(err));

}

async function connectToMockDB() {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://foobar/baz');
    mongoose.connection.on('connected', () => {
      console.log('db connection is now open');
    });
  });
}

export { connectToDB, connectToMockDB };
