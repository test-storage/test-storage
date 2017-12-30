import * as mongoose from 'mongoose';
import * as config from 'config';

const connectionString = `mongodb://${config.get('db.user')}:${config.get('db.password')}@${config.get('db.host')}`;

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<mongoose.Connection> => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(process.env.MONGOLAB_URI || connectionString, {
        useMongoClient: true,
      });
    },
  },
];
