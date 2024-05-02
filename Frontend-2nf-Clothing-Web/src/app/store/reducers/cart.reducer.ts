import { createReducer, on } from "@ngrx/store";
import { CartState } from "../states/cart.state";
import { addToCart, addToCartFail, addToCartSuccess, removeFromCart, removeFromCartFail, removeFromCartSuccess } from "../actions/cart.actions";

export const initialState: CartState ={
    cart: [],
    loading: false,
    added: false,
    deleted: false
}

export const cartReducer = createReducer(
    initialState,

    on(addToCart, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(addToCartSuccess, (state, { cart }) => {
        return {
            ...state,
            loading: false,
            added: true,
            cart
        }
    }),
    on(addToCartFail, (state) => {
        return {
            ...state,
            loading: false,
            added: false
        }
    }),
    on(removeFromCart, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(removeFromCartSuccess, (state, { cart }) => {
        return {
            ...state,
            loading: false,
            deleted: true,
            cart
        }
    }),
    on(removeFromCartFail, (state) => {
        return {
            ...state,
            loading: false,
            deleted: false
        }
    })
)