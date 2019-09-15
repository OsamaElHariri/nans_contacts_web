export class Contact {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    state = ContactState.Normal
}

export enum ContactState {
    New = "New",
    Normal = "Normal",
    Deleting = "Deleting",
    Deleted = "Deleted",
    Updating = "Updating",
}