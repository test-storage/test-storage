export class Testrun {
  _id?: string;
  name: string;
  description?: string;
  projectId: string;
  builds?: Array<string>;
  environments?: Array<string>;
  platforms?: Array<string>;
  testcases?: Array<TestCaseExecution>;
  status?: string;
  archieved?: boolean;
  startDate?: string;
  endDate?: string;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}

export class TestCaseExecution {
  id?: string;
  status?: TestCaseStatus;
}

export enum TestCaseStatus {
  PASSED,
  FAILED,
  UNTESTED,
  BLOCKED
}
