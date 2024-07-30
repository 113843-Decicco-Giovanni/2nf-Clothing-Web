import { createAction, props } from "@ngrx/store";
import { CartDetail } from "../../models/cart/cartDetail";

export const ADD_TO_CART = '[Cart] Add To Cart';
export const ADD_TO_CART_SUCCESS = '[Cart] Add To Cart Success';
export const ADD_TO_CART_FAIL = '[Cart] Add To Cart Fail';

export const REMOVE_FROM_CART = '[Cart] Remove From Cart';
export const REMOVE_FROM_CART_SUCCESS = '[Cart] Remove From Cart Success';
export const REMOVE_FROM_CART_FAIL = '[Cart] Remove From Cart Fail';

export const SAVE_CART = '[Cart] Save Cart';
export const SAVE_CART_SUCCESS = '[Cart] Save Cart Success';
export const SAVE_CART_FAIL = '[Cart] Save Cart Fail';

export const LOAD_CART = '[Cart] Load Cart';
export const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';
export const LOAD_CART_FAIL = '[Cart] Load Cart Fail';

export const CLEAR_CART = '[Cart] Clear Cart';

export const addToCart = createAction(
    ADD_TO_CART,
    props<{ detail: CartDetail }>()
)
export const addToCartSuccess = createAction(
    ADD_TO_CART_SUCCESS,
    props<{ cart: CartDetail[] }>()
)
export const addToCartFail = createAction(
    ADD_TO_CART_FAIL
)

export const removeFromCart = createAction(
    REMOVE_FROM_CART,
    props<{ detailId: number }>()
)
export const removeFromCartSuccess = createAction(
    REMOVE_FROM_CART_SUCCESS,
    props<{ cart: CartDetail[] }>()
)
export const removeFromCartFail = createAction(
    REMOVE_FROM_CART_FAIL
)

export const clearCart = createAction(
    CLEAR_CART
)