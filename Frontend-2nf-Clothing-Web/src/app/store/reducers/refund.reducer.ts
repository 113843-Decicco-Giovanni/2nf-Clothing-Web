import { createReducer, on } from "@ngrx/store";
import { RefundState } from "../states/refund.state";
import { createRefund, createRefundFail, createRefundSuccess, getRefunds, getRefundsFail, getRefundsSuccess } from "../actions/refund.actions";

export const initialState: RefundState = {
    refunds: [],
    refund: null,
    loading: false,
    added: false,
    deleted: false
}

export const refundReducer = createReducer(
    initialState,

    on(getRefunds, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getRefundsSuccess, (state, { refunds }) => {
        return {
            ...state,
            loading: false,
            refunds
        }
    }),
    on(getRefundsFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(createRefund, (state) => {
        return {
            ...state,
            loading: true,
            added: false
        }
    }),
    on(createRefundSuccess, (state, { refund }) => {
        return {
            ...state,
            loading: false,
            added: true,
            refund
        }
    }),
    on(createRefundFail, (state) => {
        return {
            ...state,
            loading: false
        }
    })
)