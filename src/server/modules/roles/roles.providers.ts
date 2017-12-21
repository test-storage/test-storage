import { Connection } from 'mongoose';
import { RoleSchema } from './schemas/role.schema';

export const rolesProviders = [
  {
    provide: 'RoleModelToken',
    useFactory: (connection: Connection) => connection.model('Role', RoleSchema),
    inject: ['DbConnectionToken'],
  },
];
