export class TestSuite {
  // tslint:disable-next-line: variable-name
  _id?: string;
  parentId: string;
  projectId: string;
  enabled?: boolean;
  name: string;
  description: string;
  order?: number;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
  children?: any;
}
