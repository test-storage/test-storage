export class TestcaseStep {
    _id?: string;
    testcaseId: string;
    order: number;
    action: string;
    testData: string;
    expected: string;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
    enabled?: boolean;
    executionType?: string;
}
