import { createAction, props } from "@ngrx/store";
import { Shipment } from "../../models/sales/shipment";
import { ShipmentResponse } from "../../models/sales/responses/shipment-response";
import { ShipmentRequest } from "../../models/sales/shipment-request";

export const CONFIRM_SHIPMENT = '[shipment] Confirm Shipment';
export const CONFIRM_SHIPMENT_SUCCESS = '[shipment] Confirm Shipment Success';

export const LOAD_SHIPMENTS = '[shipment] Load Shipments';
export const LOAD_SHIPMENTS_SUCCESS = '[shipment] Load Shipments Success';
export const LOAD_SHIPMENTS_FAIL = '[shipment] Load Shipments Fail';

export const LOAD_SHIPMENT_BY_ID = '[shipment] Load Shipment By Id';
export const LOAD_SHIPMENT_BY_ID_SUCCESS = '[shipment] Load Shipment By Id Success';
export const LOAD_SHIPMENT_BY_ID_FAIL = '[shipment] Load Shipment By Id Fail';

export const LOAD_SHIPMENT_BY_SALE_ID = '[shipment] Load Shipment By Sale Id';
export const LOAD_SHIPMENT_BY_SALE_ID_SUCCESS = '[shipment] Load Shipment By Sale Id Success';
export const LOAD_SHIPMENT_BY_SALE_ID_FAIL = '[shipment] Load Shipment By Sale Id Fail';

export const PROCESS_SHIPMENT = '[shipment] Process Shipment';
export const PROCESS_SHIPMENT_SUCCESS = '[shipment] Process Shipment Success';
export const PROCESS_SHIPMENT_FAIL = '[shipment] Process Shipment Fail';

export const MODIFY_SHIPMENT = '[shipment] Modify Shipment';
export const MODIFY_SHIPMENT_SUCCESS = '[shipment] Modify Shipment Success';
export const MODIFY_SHIPMENT_FAIL = '[shipment] Modify Shipment Fail';

export const confirmShipment = createAction(
    CONFIRM_SHIPMENT,
    props<{ shipment: Shipment }>()
)
export const confirmShipmentSuccess = createAction(
    CONFIRM_SHIPMENT_SUCCESS,
    props<{ shipment: Shipment }>()
)

export const loadShipments = createAction(
    LOAD_SHIPMENTS,
    props<{ estado: number, fechaInicio?: Date, fechaFin?: Date, clientDoc?: number }>()
)
export const loadShipmentsSuccess = createAction(
    LOAD_SHIPMENTS_SUCCESS,
    props<{ shipments: ShipmentResponse[] }>()
)
export const loadShipmentsFail = createAction(
    LOAD_SHIPMENTS_FAIL
)

export const loadShipmentById = createAction(
    LOAD_SHIPMENT_BY_ID,
    props<{ id: number }>()
)
export const loadShipmentByIdSuccess = createAction(
    LOAD_SHIPMENT_BY_ID_SUCCESS,
    props<{ shipment: ShipmentResponse }>()
)
export const loadShipmentByIdFail = createAction(
    LOAD_SHIPMENT_BY_ID_FAIL
)

export const loadShipmentBySaleId = createAction(
    LOAD_SHIPMENT_BY_SALE_ID,
    props<{ saleId: number }>()
)
export const loadShipmentBySaleIdSuccess = createAction(
    LOAD_SHIPMENT_BY_SALE_ID_SUCCESS,
    props<{ shipmentResponse: ShipmentResponse }>()
)
export const loadShipmentBySaleIdFail = createAction(
    LOAD_SHIPMENT_BY_SALE_ID_FAIL
)

export const processShipment = createAction(
    PROCESS_SHIPMENT,
    props<{ shipmentId: number, service: string, trackingId: number }>()
)
export const processShipmentSuccess = createAction(
    PROCESS_SHIPMENT_SUCCESS,
    props<{ shipmentResponse: ShipmentResponse }>()
)
export const processShipmentFail = createAction(
    PROCESS_SHIPMENT_FAIL
)

export const modifyShipment = createAction(
    MODIFY_SHIPMENT,
    props<{ id: number, shipment: ShipmentRequest }>()
)
export const modifyShipmentSuccess = createAction(
    MODIFY_SHIPMENT_SUCCESS,
    props<{ shipmentResponse: ShipmentResponse }>()
)
export const modifyShipmentFail = createAction(
    MODIFY_SHIPMENT_FAIL
)