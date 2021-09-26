export class TestCase {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _id?: string;
  key?: string;
  projectId!: string;
  testSuiteId!: string;
  priority?: Priority;
  order?: number;
  title!: string;
  description?: string;
  type?: TestCaseType;
  preConditions?: string;
  steps?: Array<TestCaseStep>;
  postConditions?: string;
  tags?: Array<string>;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
  enabled?: boolean;
  isAutomated?: boolean;
  estimate?: number; // TODO string
  status?: string;
}

export enum Priority {
  BLOCKER,
  CRITICAL,
  MAJOR,
  MINOR,
  TRIVIAL
}

export class TestCaseStep {
  stepAction?: string;
  testData?: string;
  expectedResult?: string;
}

export enum TestCaseType {
  POSITIVE,
  NEGATIVE
}
