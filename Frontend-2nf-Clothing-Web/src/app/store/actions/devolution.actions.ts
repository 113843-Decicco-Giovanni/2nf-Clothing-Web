import { createAction, props } from "@ngrx/store";
import { DevolutionRequest } from "../../models/devolutions/devolution.request";
import { Devolution } from "../../models/devolutions/devolution";

export const CREATE_DEVOLUTION = '[Devolution] Create Devolution';
export const CREATE_DEVOLUTION_SUCCESS = '[Devolution] Create Devolution Success';
export const CREATE_DEVOLUTION_FAIL = '[Devolution] Create Devolution Fail';

export const UPDATE_DEVOLUTION_STATE = '[Devolution] Update Devolution State';
export const UPDATE_DEVOLUTION_STATE_SUCCESS = '[Devolution] Update Devolution State Success';
export const UPDATE_DEVOLUTION_STATE_FAIL = '[Devolution] Update Devolution State Fail';

export const GET_DEVOLUTIONS = '[Devolution] Get Devolutions';
export const GET_DEVOLUTIONS_SUCCESS = '[Devolution] Get Devolutions Success';
export const GET_DEVOLUTIONS_FAIL = '[Devolution] Get Devolutions Fail';

export const GET_DEVOLUTION_BY_ID = '[Devolution] Get Devolution By Id';
export const GET_DEVOLUTION_BY_SHIPMENT_ID = '[Devolution] Get Devolution By Shipment Id';
export const GET_DEVOLUTION_SUCESS = '[Devolution] Get Devolution Success';
export const GET_DEVOLUTION_FAIL = '[Devolution] Get Devolution Fail';

export const createDevolution = createAction(
    CREATE_DEVOLUTION,
    props<{ devolution: DevolutionRequest }>()    
);
export const createDevolutionSuccess = createAction(
    CREATE_DEVOLUTION_SUCCESS,
    props<{ devolution: Devolution }>()
);
export const createDevolutionFail = createAction(
    CREATE_DEVOLUTION_FAIL
)

export const updateDevolutionState = createAction(
    UPDATE_DEVOLUTION_STATE,
    props<{ devolutionId: number, state: number, detail: string }>()
);
export const updateDevolutionStateSuccess = createAction(
    UPDATE_DEVOLUTION_STATE_SUCCESS,
    props<{ devolution: Devolution }>()
);
export const updateDevolutionStateFail = createAction(
    UPDATE_DEVOLUTION_STATE_FAIL
)

export const getDevolutions = createAction(
    GET_DEVOLUTIONS,
    props<{ state?: number, dni?: number, fechaInicio?: Date, fechaFin?: Date }>()
)
export const getDevolutionsSuccess = createAction(
    GET_DEVOLUTIONS_SUCCESS,
    props<{ devolutions: Devolution[] }>()
);
export const getDevolutionsFail = createAction(
    GET_DEVOLUTIONS_FAIL
)

export const getDevolutionById = createAction(
    GET_DEVOLUTION_BY_ID,
    props<{ id: number }>()
)
export const getDevolutionByShipmentId = createAction(
    GET_DEVOLUTION_BY_SHIPMENT_ID,
    props<{ shipmentId: number }>()
)
export const getDevolutionSuccess = createAction(
    GET_DEVOLUTION_SUCESS,
    props<{ devolution: Devolution }>()
)
export const getDevolutionFail = createAction(
    GET_DEVOLUTION_FAIL
)