export class Testcase {
    _id?: string;
    key?: string;
    testSuiteId: string;
    priority?: number;
    order?: number;
    title: string;
    description?: string;
    prerequisites?: string;
    steps?: Array<string>;
    expected?: Array<string>;
    tags?: Array<string>;
    created?: string;
    updated?: string;
    createdBy: string;
    updatedBy: string;
    enabled: boolean;
    isAutomated: boolean;
    estimate?: number; // TODO string
    status: string;
}
