import { SaleResponse } from "./sale-response";

export interface ShipmentResponse{
    id: number;
    floor: string;
    appartement: string;
    street: string;
    streetNumber: number;
    city: string;
    state: string;
    postalCode: string;
    shipmentState: string;
    details: string;
    sale: SaleResponse;
    trackingId: number;
    service: string;
}