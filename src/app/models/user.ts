import { Social } from './social.model';
import { WorkInfo } from './work.model';

export class User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: string;
  workInfo?: WorkInfo;
  social?: Social;
  userGroups?: Array<string>;
  projects?: Array<string>;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}
