export class Testplan {
    _id?: string;
    name: string;
    description: string;
    projectId: string;
    builds: Array<string>;
    environments: Array<string>;
    platforms: Array<string>;
    testcaseSuiteId: string;
    startDate: Date;
    endDate: Date;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
