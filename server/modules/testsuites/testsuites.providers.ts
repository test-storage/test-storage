import { Connection } from 'mongoose';
import { TestsuiteSchema } from './schemas/testsuite.schema';

export const testsuitesProviders = [
  {
    provide: 'TestsuiteModelToken',
    useFactory: (connection: Connection) => connection.model('Testsuite', TestsuiteSchema),
    inject: ['DbConnectionToken'],
  },
];
