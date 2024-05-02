import { createSelector } from "@ngrx/store";
import { CartState } from "../states/cart.state";

export const selectCartFeature = (state: any) => state.cart;

export const selectCart = createSelector(
    selectCartFeature,
    (state: CartState) => state.cart
)
export const selectCartAdded = createSelector(
    selectCartFeature,
    (state: CartState) => state.added
)
export const selectCartDeleted = createSelector(
    selectCartFeature,
    (state: CartState) => state.deleted
)
export const selectCartLoading = createSelector(
    selectCartFeature,
    (state: CartState) => state.loading
)
export const selectCartAmount = createSelector(
    selectCartFeature,
    (state: CartState) => state.cart.length
)