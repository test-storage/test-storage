export class User {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _id?: string;
  email!: string;
  password!: string;
  confirmPassword?: string;
  firstName!: string;
  lastName!: string;
  active!: string;
  photo?: string;
  avatarColor!: number;
  workInfo?: any;
  social?: any;
  role!: string;
  userGroups?: Array<string>;
  projects?: Array<string>;
  created?: Date;
  updated?: Date;
  createdBy?: string;
  updatedBy?: string;
}
