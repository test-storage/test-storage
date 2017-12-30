import { Connection } from 'mongoose';
import { ProjectSchema } from './schemas/project.schema';

export const projectsProviders = [
  {
    provide: 'ProjectModelToken',
    useFactory: (connection: Connection) => connection.model('Project', ProjectSchema),
    inject: ['DbConnectionToken'],
  },
];
