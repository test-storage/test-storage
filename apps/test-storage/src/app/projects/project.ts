export class Project {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _id?: string;
  name!: string;
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
