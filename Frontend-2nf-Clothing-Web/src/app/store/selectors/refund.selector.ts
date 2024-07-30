import { createSelector } from "@ngrx/store"

export const selectRefundFeature = (state: any) => state.refund

export const selectRefunds = createSelector(
    selectRefundFeature,
    (state: any) => state.refunds
)
export const selectRefund = createSelector(
    selectRefundFeature,
    (state: any) => state.refund
)
export const selectRefundsLoading = createSelector(
    selectRefundFeature,
    (state: any) => state.loading
)
export const selectRefundAdded = createSelector(
    selectRefundFeature,
    (state: any) => state.added
)
export const selectRefundDeleted = createSelector(
    selectRefundFeature,
    (state: any) => state.deleted
)