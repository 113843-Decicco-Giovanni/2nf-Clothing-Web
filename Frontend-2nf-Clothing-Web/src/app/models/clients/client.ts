import { User } from "../users/user";

export interface Client {
    id: number;
    name: string;
    secondName?: string;
    surname: string;
    secondSurname?: string;
    docId: number;
    street: string;
    streetNumber: number;
    city: string;
    state: string;
    country: string;
    phone: string;
    postalCode: string;
    user: User;
}