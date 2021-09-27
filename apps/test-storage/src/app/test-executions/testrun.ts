export class Testrun {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _id?: string;
  name!: string;
  description?: string;
  projectId!: string;
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

