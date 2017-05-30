export class User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title?: string;
  groups: Array<string>;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}
