import { createReducer, on } from "@ngrx/store";
import { ShipmentState } from "../states/shipment.state";
import { cancelShipment, cancelShipmentFail, cancelShipmentSuccess, confirmShipment, confirmShipmentSuccess, loadShipmentById, loadShipmentByIdSuccess, loadShipmentBySaleId, loadShipmentBySaleIdSuccess, loadShipments, loadShipmentsFail, loadShipmentsSuccess, processShipment, processShipmentSuccess } from "../actions/shipment.actions";
import { loadSaleById } from "../actions/sale.actions";

export const initialState : ShipmentState = {
    shipment: {
        floor : '',
        appartement : '',
        street : '',
        streetNumber : 0,
        city : '',
        state : '',
        country : '',
        postalCode : '',
        phone : '',
        email : '',
        details : ''
    },
    shipmentResponse: null,
    shipments: [],
    loading: false
}

export const shipmentReducer = createReducer(
    initialState,

    on(confirmShipment, (state) => {
        return {
            ...state
        }
    }),
    on(confirmShipmentSuccess, (state, { shipment }) => {
        return {
            ...state,
            shipment
        }
    }),
    on(loadShipments, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadShipmentsSuccess, (state, { shipments }) => {
        return {
            ...state,
            shipments,
            loading: false
        }
    }),
    on(loadShipmentsFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(loadShipmentById, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadShipmentByIdSuccess, (state, { shipment }) => {
        return {
            ...state,
            loading: false,
            shipmentResponse: shipment
        }
    }),
    on(loadShipmentsFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(processShipment, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(processShipmentSuccess, (state, { shipmentResponse }) => {
        return {
            ...state,
            loading: false,
            shipmentResponse
        }
    }),
    on(loadShipmentBySaleId, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadShipmentBySaleIdSuccess, (state, { shipmentResponse }) => {
        return {
            ...state,
            loading: false,
            shipmentResponse
        }
    }),
    on(loadShipmentsFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(cancelShipment, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(cancelShipmentSuccess, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(cancelShipmentFail, (state) => {
        return {
            ...state,
            loading: false
        }
    })
)