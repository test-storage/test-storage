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
    skype?: string,
    github?: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    instagram?: string,
    vk?: string
  };
  userGroups?: Array<string>;
  projects?: Array<string>;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}
