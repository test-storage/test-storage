export class User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: string;
  work: {
    title: string;
    phone?: string;
    company?: string;
  };
  social?: {
    github?: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    instagram?: string,
    vk?: string
  }
  userGroups: Array<string>;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}
