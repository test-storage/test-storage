export class Notification {
    _id?: string;
    title: string;
    description?: string;
    entity: String; // TODO ENUM
    action: String; // TODO ENUM
    senderId: String;
    recipientId: String;
    read?: Boolean;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
