export class UserGroup {
    _id?: string;
    name: string;
    description: string;
    enabled?: boolean;
    scope: Array<string>;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
