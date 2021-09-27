export class TestCaseResult {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _id?: string;
  projectId: string;
  testrunId: string;
  testcaseId: string;
  builds?: Array<string>;
  platforms?: Array<string>;
  status?: string;
  notes?: string;
  attachments?: Array<string>;
  created?: Date;
  updated?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export enum TestCaseResultStatus {
  PASSED,
  FAILED,
  UNTESTED,
  BLOCKED
}
