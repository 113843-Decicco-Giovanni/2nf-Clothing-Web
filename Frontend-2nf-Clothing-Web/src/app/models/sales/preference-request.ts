import { ItemPreference } from "./ItemPreference";

export interface PreferenceRequest {
    clientId: number;
    details: ItemPreference[];
    floor: string;
    appartement: string;
    street: string;
    streetNumber: number;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
    email: string;
    shipmentDetails: string;
}