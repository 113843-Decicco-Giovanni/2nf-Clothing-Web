export interface ClientRequest {
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
    postalCode: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    newPassword?: string;
}