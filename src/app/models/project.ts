export class Project {
    _id: string;
    name: string;
    description: string;
    enabled: boolean;
    testcases: Array<string>;
    created: string;
    updated: string;
    createdBy: string;
    updatedBy: string;
}