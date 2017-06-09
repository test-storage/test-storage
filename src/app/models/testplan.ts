export class Testplan {
    _id?: string;
    name: string;
    description: string;
    builds: Array<string>;
    environments: Array<string>;
    testruns?: Array<string>;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
