export class TestSuite {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _id?: string;
  parentId!: string;
  projectId!: string;
  enabled?: boolean;
  name!: string;
  description!: string;
  order?: number;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
  children?: any;
}
