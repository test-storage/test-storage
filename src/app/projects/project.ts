export class Project {
  // tslint:disable-next-line: variable-name
  _id?: string;
  name: string;
  description?: string;
  photo?: string;
  avatarColor?: number;
  enabled?: boolean;
  created?: Date;
  updated?: Date;
  // manager?: string; point to user
  createdBy?: string;
  updatedBy?: string;
}
