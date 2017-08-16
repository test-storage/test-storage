export class Project {
    _id?: string;
    name: string;
    description: string;
    enabled?: boolean;
    created?: string;
    updated?: string;
    // manager?: string; point to user
    createdBy?: string;
    updatedBy?: string;
}
