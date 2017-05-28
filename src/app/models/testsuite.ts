export class Testsuite {
    _id: number;
    parentId: number;
    projectId: string;
    enabled: boolean;
    name: string;
    description: string;
    testcases: Array<string>;
    created: string;
    updated: string;
    createdBy: string;
    updatedBy: string;
}