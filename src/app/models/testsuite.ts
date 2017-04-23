export class Testsuite {
    _id: string;
    parentId: number;
    enabled: boolean;
    name: string;
    description: string;
    prerequisites: string;
    environment: string;
    testcases: Array<string>;
    created: string;
    updated: string;
    createdBy: string;
    updatedBy: string;
}