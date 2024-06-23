import { ShipmentResponse } from "../../models/sales/responses/shipment-response";
import { Shipment } from "../../models/sales/shipment";

export interface ShipmentState {
    shipment: Shipment,
    shipmentResponse: ShipmentResponse | null,
    shipments: ShipmentResponse[],
    loading: boolean
}