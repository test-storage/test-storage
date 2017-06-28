export class Testcase {
    _id?: string;
    key?: string;
    projectId: string;
    testSuiteId: string;
    priority?: number;
    order?: number;
    title: string;
    description?: string;
    preConditions?: string;
    steps?: Array<string>;
    testData?: Array<string>;
    expected?: Array<string>;
    postConditions?: string;
    tags?: Array<string>;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
    enabled: boolean;
    isAutomated: boolean;
    estimate?: number; // TODO string
    status?: string;
}
