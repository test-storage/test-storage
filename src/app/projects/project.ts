export class Project {
  _id?: string;
  name: string;
  description: string;
  photo?: string;
  avatarColor: number;
  enabled?: boolean;
  created?: string;
  updated?: string;
  // manager?: string; point to user
  createdBy?: string;
  updatedBy?: string;
}
