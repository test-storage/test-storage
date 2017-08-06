export class Testrun {
    _id?: string;
    name: string;
    description?: string;
    projectId: string;
    builds?: Array<string>;
    environments?: Array<string>;
    platforms?: Array<string>;
    testplanId?: string;
    testcaseSuiteId?: string;
    startDate?: string;
    endDate?: string;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
