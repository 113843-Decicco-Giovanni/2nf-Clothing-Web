import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { ShipmentState } from "../states/shipment.state";

export const selectShipmentFeature = (state: AppState) => state.shipment;

export const selectShipment = createSelector(
    selectShipmentFeature,
    (state: ShipmentState) => state.shipment
)

export const selectShipments = createSelector(
    selectShipmentFeature,
    (state: ShipmentState) => state.shipments
)

export const selectShipmentLoading = createSelector(
    selectShipmentFeature,
    (state: ShipmentState) => state.loading
)

export const selectShipmentResponse = createSelector(
    selectShipmentFeature,
    (state: ShipmentState) => state.shipmentResponse
)