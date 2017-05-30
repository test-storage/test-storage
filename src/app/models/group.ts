export class Group {
    _id: string;
    name: string;
    description: string;
    enabled: boolean;
    scope: object;
    users: Array<string>;
    created: string;
    updated: string;
    createdBy: string;
    updatedBy: string;
}
