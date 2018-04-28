export class TestCase {
  _id?: string;
  key?: string;
  projectId: string;
  testSuiteId: string;
  priority?: Priority;
  order?: number;
  title: string;
  description?: string;
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
  expectedResult: string;
}
