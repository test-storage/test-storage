import { Connection } from 'mongoose';
import { TestcaseSchema } from './schemas/testcase.schema';

export const testcasesProviders = [
  {
    provide: 'TestcaseModelToken',
    useFactory: (connection: Connection) => connection.model('Testcase', TestcaseSchema),
    inject: ['DbConnectionToken'],
  },
];
