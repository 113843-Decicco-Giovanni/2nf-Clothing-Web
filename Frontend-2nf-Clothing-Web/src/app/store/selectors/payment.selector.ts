import { createSelector } from "@ngrx/store"
import { PaymentState } from "../states/payment.state"

export const selectPaymentFeature = (state: any) => state.payment

export const selectPaymentStatus = createSelector(
    selectPaymentFeature,
    (state: PaymentState) => state.paymentStatus
)