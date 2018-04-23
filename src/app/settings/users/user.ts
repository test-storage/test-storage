export class User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: string;
  workInfo?: any;
  social?: any;
  userGroups?: Array<string>;
  projects?: Array<string>;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}
