import { createAction, props } from "@ngrx/store";
import { Refund } from "../../models/refunds/refund";
import { RefundRequest } from "../../models/refunds/refund.request";

export const CREATE_REFUND = '[Refund] Create Refund';
export const CREATE_REFUND_SUCCESS = '[Refund] Create Refund Success';
export const CREATE_REFUND_FAIL = '[Refund] Create Refund Fail';

export const GET_REFUNDS = '[Refund] Get Refunds';
export const GET_REFUNDS_SUCCESS = '[Refund] Get Refunds Success';
export const GET_REFUNDS_FAIL = '[Refund] Get Refunds Fail';

export const createRefund = createAction(
    CREATE_REFUND,
    props<{ refund: RefundRequest }>()
)
export const createRefundSuccess = createAction(
    CREATE_REFUND_SUCCESS,
    props<{ refund: Refund }>()
)
export const createRefundFail = createAction(
    CREATE_REFUND_FAIL
)

export const getRefunds = createAction(
    GET_REFUNDS,
    props<{ state?: number, clientDoc?: number, fechaInicio?: Date, fechaFin?: Date }>()
)
export const getRefundsSuccess = createAction(
    GET_REFUNDS_SUCCESS,
    props<{ refunds: Refund[] }>()
)
export const getRefundsFail = createAction(
    GET_REFUNDS_FAIL
)