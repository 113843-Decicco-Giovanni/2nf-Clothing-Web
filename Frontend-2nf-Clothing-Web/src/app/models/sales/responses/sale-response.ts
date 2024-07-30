import { Client } from "../../clients/client";
import { SaleDetailResponse } from "./sale-detail-response";

export interface SaleResponse{
    id: number;
    date: Date;
    client: Client;
    details: SaleDetailResponse[];
    // shipment: ShipmentResponse;
    paymentId: number;
    canceled: boolean;
    refoundPending: boolean;
}