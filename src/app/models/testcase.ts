export class Testcase {
    _id: string;
    key: string;
    parentId: number;
    priority: number;
    order: number;
    title: string;
    description: string;
    prerequisites: string;
    steps: Array<string>;
    expected: Array<string>;
    tags: Array<string>;
    created: string;
    updated: string;
    createdBy: string;
    updatedBy: string;
    enabled: boolean;
    isAutomated: boolean;
    estimate: number;
    status: string;
    childId: number;
}