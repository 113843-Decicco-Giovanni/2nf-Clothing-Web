import { createReducer, on } from "@ngrx/store";
import { PaymentState } from "../states/payment.state";
import { getPaymentStatus, getPaymentStatusSuccess } from "../actions/payment.actions";

export const initialState : PaymentState = {
    paymentStatus: {
        id: 0,
        status: ''
    }
}

export const paymentReducer = createReducer(
    initialState,

    on(getPaymentStatus, (state) => {
        return {
            ...state
        }
    }),
    on(getPaymentStatusSuccess, (state, { paymentStatus }) => {
        return {
            ...state,
            paymentStatus
        }
    })
)