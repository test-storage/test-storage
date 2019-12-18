export class Testrun {
  // tslint:disable-next-line: variable-name
  _id?: string;
  name: string;
  description?: string;
  projectId: string;
  builds?: Array<string>;
  environments?: Array<string>;
  platforms?: Array<string>;
  testcases?: Array<string>;
  status?: string;
  progress?: number;
  archieved?: boolean;
  startDate?: string;
  endDate?: string;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}

