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

  const connectionString = `mongodb://${config.get('db.user')}:${config.get('db.password')}@${config.get('db.host')}`;

  await mongoose.connect(connectionString)
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
