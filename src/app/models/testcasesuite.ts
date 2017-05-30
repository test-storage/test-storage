export class Testcasesuite {
    _id?: string;
    parentId: number;
    projectId: string;
    enabled: boolean;
    name: string;
    description: string;
    prerequisites: string;
    environment: string;
    testcases: Array<string>;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
