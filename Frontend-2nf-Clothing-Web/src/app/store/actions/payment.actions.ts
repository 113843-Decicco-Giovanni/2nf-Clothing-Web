import { createAction, props } from "@ngrx/store";
import { PaymentStatus } from "../../models/payment-status";

export const GET_PAYMENT_STATUS = '[Payment] Get Payment Status';
export const GET_PAYMENT_STATUS_SUCCESS = '[Payment] Get Payment Status Success';
export const GET_PAYMENT_STATUS_FAIL = '[Payment] Get Payment Status Fail';

export const getPaymentStatus = createAction(
    GET_PAYMENT_STATUS,
    props<{ paymentId: number }>()
)
export const getPaymentStatusSuccess = createAction(
    GET_PAYMENT_STATUS_SUCCESS,
    props<{ paymentStatus: PaymentStatus }>()
)
export const getPaymentStatusFail = createAction(
    GET_PAYMENT_STATUS_FAIL
)