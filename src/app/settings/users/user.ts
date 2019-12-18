export class User {
  // tslint:disable-next-line: variable-name
  _id?: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  active: string;
  photo?: string;
  avatarColor: number;
  workInfo?: any;
  social?: any;
  role: string;
  userGroups?: Array<string>;
  projects?: Array<string>;
  created?: Date;
  updated?: Date;
  createdBy?: string;
  updatedBy?: string;
}
